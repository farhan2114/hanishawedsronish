import React from 'react';
import { MapPin } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

export const VenueSection: React.FC = () => {
  const { venue, secondaryVenue, date } = weddingConfig;
  const cityName = venue.cityName || venue.city.split(',')[0].trim();
  const secondaryCityName = secondaryVenue?.cityName || secondaryVenue?.city.split(',')[0].trim() || 'Irahs Farm';

  return (
    <section id="venue" className="relative overflow-hidden bg-maroon px-5 py-24 text-paper sm:py-36">
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 select-none">
        <img
          src={assets.mandalaMaroon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="animate-spin-soft h-full w-full object-contain opacity-15"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Main Venue */}
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <RevealOnScroll>
          <p className="eyebrow text-gold">The way to the wedding</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Join us in {cityName}</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/75">
            {venue.description}
          </p>
          <div className="mt-8 border-l border-gold/50 pl-5">
            <p className="font-title text-lg">{venue.name}</p>
            <p className="mt-1 text-sm text-paper/70">{venue.city}</p>
          </div>
          <a
            href={venue.mapsSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 border border-gold/70 px-6 py-3 text-xs uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold/10"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Open in maps
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden border border-gold/35 bg-paper/5">
            <iframe
              title={`Map to ${venue.name}`}
              src={venue.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
            <span className="pointer-events-none absolute inset-3 border border-gold/30" />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-paper/60">
            {venue.city} · {date.short}
          </p>
        </RevealOnScroll>
      </div>

      {/* Secondary Venue - Irahs Farm */}
      {secondaryVenue && (
        <>
          <div className="relative mx-auto my-20 flex max-w-2xl items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="font-serif text-sm tracking-widest text-gold/60">✦ ✦ ✦</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <RevealOnScroll>
              <p className="eyebrow text-gold">Haldi & Pre-Wedding Celebrations</p>
              <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                Join us at {secondaryCityName}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/75">
                {secondaryVenue.description}
              </p>
              <div className="mt-8 border-l border-gold/50 pl-5">
                <p className="font-title text-lg">{secondaryVenue.name}</p>
                <p className="mt-1 text-sm text-paper/70">{secondaryVenue.city}</p>
              </div>
              <a
                href={secondaryVenue.mapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-3 border border-gold/70 px-6 py-3 text-xs uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold/10"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Open in maps
              </a>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden border border-gold/35 bg-paper/5">
                <iframe
                  title={`Map to ${secondaryVenue.name}`}
                  src={secondaryVenue.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                />
                <span className="pointer-events-none absolute inset-3 border border-gold/30" />
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-paper/60">
                {secondaryVenue.city} · 27 . 11 . 2026
              </p>
            </RevealOnScroll>
          </div>
        </>
      )}

      <img
        src={assets.lotusDivider}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none mx-auto mt-20 w-full max-w-xl opacity-80"
      />
    </section>
  );
};
