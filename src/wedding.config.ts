/**
 * =======================================================================
 * WEDDING INVITATION CLIENT CONFIGURATION FILE
 * =======================================================================
 * 
 * Simply update the values in this file for your new client!
 * All names, dates, parents, events, venue, and images across the ENTIRE
 * website will update automatically.
 * 
 * To replace images, either:
 *  1. Put your new images into `public/client-images/` with the same names:
 *     - bride.jpg
 *     - groom.jpg
 *     - gallery-1.jpg, gallery-2.jpg, gallery-3.jpg, gallery-4.jpg
 *     - story-1.jpg, story-2.jpg, story-3.jpg, story-4.jpg
 *     - banner.jpg
 *     - music.mp3 (optional audio)
 * 
 *  2. OR change the image file paths below to point to any image in `public/`.
 * =======================================================================
 */

export const weddingConfig = {
  // -------------------------------------------------------------
  // 1. COUPLE & PARENTS INFORMATION
  // -------------------------------------------------------------
  couple: {
    bride: 'Hanisha',
    groom: 'Ronish',
    hashtag: '#HanishaWedsRonish',

    brideRole: 'The bride',
    brideParentsNote: 'Daughter of Mr. Pidikiti Venkatesulu & Mrs. Pidikiti Pushpalatha, Guntakal.',
    bridePhoto: '/client-images/bride.jpg',
    bridePhotoAlt: 'Hanisha, the bride',

    groomRole: 'The groom',
    groomParentsNote: 'Son of Mr. Gottipati Venkata Rao & Mrs. Gottipati Hymavathi, Guntur.',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Ronish, the groom',
  },

  // -------------------------------------------------------------
  // 2. DATES & CEREMONY TIME
  // -------------------------------------------------------------
  date: {
    label: 'Saturday, 28 November 2026',
    short: '28 . 11 . 2026',
    muhurtham: 'Muhurtham at 5:07 PM CST',
  },

  // -------------------------------------------------------------
  // 3. INVITATION MESSAGE & FAMILY HOSTS
  // -------------------------------------------------------------
  invitation: {
    sanskritMantra: 'Om Sri Ganeshaya Namaha',
    invitationLine: 'With the blessings of our families, we invite you to share in the joy of our wedding.',
    familyLine: `Mr. & Mrs. Pidikiti • Mr. & Mrs. Gottipati
warmly invite you to celebrate
the union of two hearts`,
    introVideo: '/client-images/intro.mp4',
    doorsButtonText: 'Tap to open the doors',
    doorsSubText: 'Music will play softly',
  },

  // -------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS
  // -------------------------------------------------------------
  venue: {
    name: 'Ranch Retreat, Irahs Farm',
    city: 'Van Alstyne, Texas, USA',
    cityName: 'Van Alstyne', // Displayed in "Join us in [City]"
    description: 'Follow the golden path to Ranch Retreat, Irahs Farm, where our families will be waiting to welcome you.',
    
    // Google Maps direct search link (opened when user clicks "Open in maps")
    mapsSearchUrl: 'https://maps.app.goo.gl/3sBB4THXXaL5fcxy5',
    
    // Google Maps interactive iframe embed link
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.468233305497!2d-96.472065!3d33.411035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c77007e77c93d%3A0x42445225ea2a1d16!2sRanch%20Retreat!5e0!3m2!1sen!2sin!4v1789674653503!5m2!1sen!2sin',
  },

  // -------------------------------------------------------------
  // 5. ORDER OF EVENTS (CELEBRATIONS)
  // -------------------------------------------------------------
  events: [
    {
      name: 'Sangeet',
      day: 'Thursday, 26 Nov',
      time: '7:00 PM CST',
      place: 'Ranch Retreat, Irahs Farm',
      note: 'Music and a lot of dancing',
    },
    {
      name: 'Haldi',
      day: 'Friday, 27 Nov',
      time: '10:00 AM CST',
      place: 'Irahs Farm House',
      note: 'Henna, haldi and a lot of laughter',
    },
    {
      name: 'Pellikoduku & Pellikuthuru',
      day: 'Friday, 27 Nov',
      time: '7:00 PM CST',
      place: 'Irahs Farm House',
      note: 'The wedding custom ceremonies for the bride and groom',
    },
    {
      name: 'Wedding Ceremony',
      day: 'Saturday, 28 Nov',
      time: '5:07 PM CST',
      place: 'Ranch Retreat, Irahs Farm',
      note: 'Wedding ceremony and celebrations',
    },
  ],

  // -------------------------------------------------------------
  // 6. OUR STORY (MILESTONES)
  // -------------------------------------------------------------
  story: [
    {
      year: '2019',
      title: 'A crowded train',
      text: 'One shared seat from Chennai to Madurai, and a conversation that never really ended.',
      image: '/client-images/story-1.jpg',
      alt: 'Two cups of coffee beside a train window',
    },
    {
      year: '2022',
      title: 'Two cities',
      text: 'Long calls, longer letters, and a promise to meet halfway every single month.',
      image: '/client-images/story-2.jpg',
      alt: 'Handwritten letters tied with a maroon ribbon',
    },
    {
      year: '2026',
      title: 'The question',
      text: 'Asked on a terrace under jasmine lights, answered before the sentence finished.',
      image: '/client-images/story-3.jpg',
      alt: 'A jasmine-decorated terrace at dusk',
    },
    {
      year: '2027',
      title: 'The wedding',
      text: 'Two families, one mandapam, and everyone we love in the same room.',
      image: '/client-images/story-4.jpg',
      alt: 'Traditional wedding details',
    },
  ],

  // -------------------------------------------------------------
  // 7. OUR GALLERY (4 PHOTOS)
  // -------------------------------------------------------------
  gallery: [
    {
      src: '/client-images/gallery-1.jpg',
      alt: 'The couple walking through a temple corridor',
    },
    {
      src: '/client-images/gallery-2.jpg',
      alt: 'The couple laughing together',
    },
    {
      src: '/client-images/gallery-3.jpg',
      alt: 'Hands with mehndi holding a jasmine garland',
    },
    {
      src: '/client-images/gallery-4.jpg',
      alt: 'The couple under a flower-decorated mandapam at dusk',
    },
  ],

  // -------------------------------------------------------------
  // 8. PARALLAX BANNER (MIDDLE QUOTE & IMAGE)
  // -------------------------------------------------------------
  banner: {
    quote: 'Two families, one thread, and a morning we’ll remember for the rest of our lives.',
    image: '/client-images/banner.jpg',
    alt: 'The couple exchanging jasmine flowers',
  },

  // -------------------------------------------------------------
  // 9. GRATITUDE SECTION (CLOSING NOTE)
  // -------------------------------------------------------------
  gratitude: {
    eyebrow: 'With gratitude from both families',
    heading: 'Thank you for blessing us',
    message: 'Your presence, prayers and affection make this beginning complete. We invite you once again to join us at Ranch Retreat, Irahs Farm, Van Alstyne, Texas on Saturday, 28 November 2026.',
  },

  // -------------------------------------------------------------
  // 10. BACKGROUND AUDIO
  // -------------------------------------------------------------
  audio: {
    src: '/client-images/music.mp3',
    volume: 0.45,
  },
};

// Backwards-compatible export for existing components
export const weddingData = {
  bride: weddingConfig.couple.bride,
  groom: weddingConfig.couple.groom,
  hashtag: weddingConfig.couple.hashtag,
  dateLabel: weddingConfig.date.label,
  dateShort: weddingConfig.date.short,
  muhurtham: weddingConfig.date.muhurtham,
  venue: weddingConfig.venue.name,
  city: weddingConfig.venue.city,
  cityName: weddingConfig.venue.cityName,
  invitationLine: weddingConfig.invitation.invitationLine,
  familyLine: weddingConfig.invitation.familyLine,
  introVideo: weddingConfig.invitation.introVideo,
  events: weddingConfig.events,
  story: weddingConfig.story,
};
