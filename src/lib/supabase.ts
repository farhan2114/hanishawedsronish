import { createClient } from '@supabase/supabase-js';

export interface BlessingItem {
  id: string;
  name: string;
  city: string | null;
  message: string;
  created_at?: string;
}

const SUPABASE_URL = 'https://lyukxpzpcjedvrkwrcur.supabase.co';
const SUPABASE_KEY = 'sb_publishable_7USKYo1sBAT7p3_kqWdrqg_RCxNm3yd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

import { weddingConfig } from '../wedding.config';

export const GOOGLE_SHEET_WEBHOOK_URL =
  weddingConfig.rsvp?.googleSheetWebhookUrl ||
  'https://script.google.com/macros/s/AKfycbwLV_52cSrJPWpsMfFJrY4xZ-3iCV8WPR5612i-v9qB_koaaX1u6QfOU3tq5fDLq1b-Mg/exec';

export interface RsvpPayload {
  name: string;
  email: string;
  guest_count: number;
  attending_events: string;
  declined_events: string;
  sangeet?: "Yes" | "No";
  haldi?: "Yes" | "No";
  pellikoduku?: "Yes" | "No";
  wedding?: "Yes" | "No";
  note: string;
  is_update?: boolean;
  original_name?: string;
  original_email?: string;
}

export async function saveRsvpToSupabase(payload: RsvpPayload): Promise<{ success: boolean; error?: string }> {
  try {
    if (payload.is_update) {
      const searchEmail = payload.original_email || payload.email;
      const { data: existingRows } = await supabase
        .from('rsvps')
        .select('id')
        .eq('email', searchEmail)
        .limit(1);

      if (existingRows && existingRows.length > 0) {
        const { error: updateError } = await supabase
          .from('rsvps')
          .update({
            name: payload.name,
            email: payload.email,
            guest_count: payload.guest_count,
            attending_events: payload.attending_events,
            declined_events: payload.declined_events,
            note: payload.note,
          })
          .eq('id', existingRows[0].id);

        if (!updateError) {
          return { success: true };
        }
      }
    }

    const { error } = await supabase.from('rsvps').insert([{
      name: payload.name,
      email: payload.email,
      guest_count: payload.guest_count,
      attending_events: payload.attending_events,
      declined_events: payload.declined_events,
      note: payload.note,
    }]);
    if (error) {
      console.warn('Supabase RSVP insert error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.warn('Supabase RSVP exception:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

export async function saveRsvpToGoogleSheet(payload: RsvpPayload): Promise<void> {
  try {
    const formattedTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: formattedTimestamp,
        is_update: !!payload.is_update,
        original_email: payload.original_email || payload.email || '',
        original_name: payload.original_name || payload.name || '',
        name: payload.name,
        email: payload.email,
        contact: payload.email,
        guest_count: payload.guest_count,
        total_guests: payload.guest_count,
        sangeet: payload.sangeet || 'No',
        haldi: payload.haldi || 'No',
        pellikoduku: payload.pellikoduku || 'No',
        wedding: payload.wedding || 'No',
        attending_events: payload.attending_events,
        declined_events: payload.declined_events,
        note: payload.note || '-',
        warm_wishes: payload.note || '-',
      }),
    });
  } catch (err) {
    console.warn('Google Sheet RSVP sync failed:', err);
  }
}

export async function saveRsvp(payload: RsvpPayload): Promise<{ success: boolean; error?: string }> {
  const [supabaseRes] = await Promise.allSettled([
    saveRsvpToSupabase(payload),
    saveRsvpToGoogleSheet(payload),
  ]);

  if (supabaseRes.status === 'fulfilled' && !supabaseRes.value.success) {
    return { success: false, error: supabaseRes.value.error };
  }
  return { success: true };
}

const FALLBACK_KEY = 'vows_blessings_cache';

const defaultSeedBlessings: BlessingItem[] = [
  {
    id: 'seed-1',
    name: 'Karthik & Divya',
    city: 'Chennai',
    message: 'Wishing you both a lifetime of laughter, harmony and endless love together!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Lakshmi Auntie',
    city: 'Madurai',
    message: 'Wishing Hanisha and Ronish a lifetime of love, joy, and togetherness. Congratulations!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Siddharth Raman',
    city: 'Bengaluru',
    message: 'From the train rides to the mandapam, so happy to see this journey unfold. Heartiest congratulations!',
    created_at: new Date().toISOString(),
  },
];

export async function fetchBlessings(): Promise<BlessingItem[]> {
  try {
    const { data, error } = await supabase
      .from('blessings')
      .select('id, name, city, message, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;
    if (data && data.length > 0) {
      try {
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(data));
      } catch (_) {}
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, checking local cache:', err);
  }

  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}

  return defaultSeedBlessings;
}

export async function addBlessing(name: string, city: string | null, message: string): Promise<void> {
  const newBlessing: BlessingItem = {
    id: 'local-' + Date.now(),
    name: name.trim(),
    city: city ? city.trim() : null,
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase
      .from('blessings')
      .insert({ name: newBlessing.name, city: newBlessing.city, message: newBlessing.message });
    if (error) throw error;
  } catch (err) {
    console.warn('Supabase insert failed, persisting locally:', err);
  }

  // Always update local cache
  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    const list: BlessingItem[] = cached ? JSON.parse(cached) : [...defaultSeedBlessings];
    list.unshift(newBlessing);
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(list));
  } catch (_) {}
}
