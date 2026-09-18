# 💍 Client Customization Guide — Wedding Invitation

Everything in this project has been organized so you can customize it for any client in under **5 minutes** without touching any complex code.

There are only **TWO places** you ever need to touch:
1. 📝 **`src/wedding.config.ts`** — Contains all text, names, parents, dates, events, venue, and Google Maps links.
2. 🖼️ **`public/client-images/`** — Place all client photos and audio here.

---

## 📁 1. How to Replace Images & Music

Open the folder:
```
public/client-images/
```

Simply replace the files with your new client's images using the exact same filenames:

| File Name | Where it appears on the website | Recommended Size / Orientation |
| :--- | :--- | :--- |
| **`bride.jpg`** | "Meet the couple" Bride portrait card | Vertical / Portrait (4:5 ratio) |
| **`groom.jpg`** | "Meet the couple" Groom portrait card | Vertical / Portrait (4:5 ratio) |
| **`gallery-1.jpg`** | Our Gallery (Top Left Tall Photo) | Vertical / Portrait |
| **`gallery-2.jpg`** | Our Gallery (Top Right Photo) | Landscape or Square |
| **`gallery-3.jpg`** | Our Gallery (Middle Right Photo) | Landscape or Square |
| **`gallery-4.jpg`** | Our Gallery (Bottom Wide Photo) | Horizontal / Widescreen |
| **`story-1.jpg`** | Story Timeline #1 (e.g. 2019) | Landscape (4:3 ratio) |
| **`story-2.jpg`** | Story Timeline #2 (e.g. 2022) | Landscape (4:3 ratio) |
| **`story-3.jpg`** | Story Timeline #3 (e.g. 2026) | Landscape (4:3 ratio) |
| **`story-4.jpg`** | Story Timeline #4 (e.g. 2027) | Landscape (4:3 ratio) |
| **`banner.jpg`** | Parallax Quote Banner in the middle | High-res Landscape |
| **`social-thumbnail.jpg`** | WhatsApp / iMessage / Social Share link preview | 16:9 Landscape (e.g. 1920x1080 or 1200x630) |
| **`music.mp3`** | Soft background ambient audio | MP3 audio track |

*(Tip: If your client's files have different extensions or names like `photo.png`, you can simply update the file path inside `src/wedding.config.ts`)*

---

## 📝 2. How to Change Names, Dates, Parents & Google Maps

Open:
```
src/wedding.config.ts
```

You will see clean, well-commented sections:

### A. Couple & Parents Names
```ts
couple: {
  bride: 'Aarthi',
  groom: 'Nikhil',
  hashtag: '#AarthiWedsNikhil',

  brideRole: 'The bride',
  brideParentsNote: 'Daughter of Mr. & Mrs. Raghavan, Madurai.',

  groomRole: 'The groom',
  groomParentsNote: 'Son of Mr. & Mrs. Sundaram, Chennai.',
}
```

### B. Dates & Muhurtham
```ts
date: {
  label: 'Sunday, 14 February 2027',
  short: '14 . 02 . 2027',
  muhurtham: 'Muhurtham at 9:45 AM',
}
```

### C. Family Hosts & Welcoming Note
```ts
invitation: {
  sanskritMantra: 'Om Sri Ganeshaya Namaha', // Can be any blessing or quote
  invitationLine: 'With the blessings of our families, we invite you to share in the joy of our wedding.',
  familyLine: `Mr. & Mrs. Raghavan • Mr. & Mrs. Sundaram
warmly invite you to celebrate
the union of two hearts`,
}
```

### D. Venue & Google Maps Location
To set the client's venue and Google Map:
1. Search the client's venue on Google Maps (e.g. "Taj Connemara, Chennai").
2. Click **Share** → **Copy link** for `mapsSearchUrl`.
3. In Google Maps, click **Share** → **Embed a map** → copy the `src="..."` URL for `mapsEmbedUrl`.

```ts
venue: {
  name: 'Sri Kalyana Mandapam',
  city: 'Madurai, Tamil Nadu',
  cityName: 'Madurai', // Shows in "Join us in Madurai"
  description: 'Follow the golden path to Sri Kalyana Mandapam, where our families will be waiting to welcome you.',
  
  // Direct link when clicking "Open in maps"
  mapsSearchUrl: 'https://www.google.com/maps/search/Sri%20Kalyana%20Mandapam%20Madurai%2C%20Tamil%20Nadu',
  
  // Interactive embedded iframe
  mapsEmbedUrl: 'https://www.google.com/maps?q=Sri%20Kalyana%20Mandapam%20Madurai%2C%20Tamil%20Nadu&output=embed',
}
```

### E. Events (Celebrations)
You can add, edit, or remove any event:
```ts
events: [
  {
    name: 'Nichayathartham',
    day: 'Friday, 12 Feb',
    time: '6:00 PM',
    place: 'Family Home, Madurai',
    note: 'Engagement, followed by dinner',
  },
  // Add as many events as needed!
]
```

### F. Our Story (Milestones)
```ts
story: [
  {
    year: '2019',
    title: 'A crowded train',
    text: 'One shared seat from Chennai to Madurai, and a conversation that never really ended.',
    image: '/client-images/story-1.jpg',
    alt: 'Train journey',
  },
]
```

---

## 🚀 3. How to Test Changes Locally

In your terminal or PowerShell:
```powershell
cd C:\Users\sohai\.gemini\antigravity\scratch\vows-on-canvas
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to preview your client's customized invitation in real-time.

---

## 🌐 4. How to Publish / Push Changes to Vercel

Once you have edited the names or replaced images, here is how to publish the changes to your live site:

### Option A: If you linked Vercel to GitHub (Recommended)
Run these 3 commands in your terminal:
```powershell
git add .
git commit -m "Update wedding details for new client"
git push
```
Vercel will detect the push and automatically deploy the new version live in ~30 seconds!

### Option B: If you deploy directly using Vercel CLI
Run:
```powershell
npx vercel --prod
```
It will upload your changes and deploy immediately.
