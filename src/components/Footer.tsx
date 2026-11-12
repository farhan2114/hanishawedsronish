import React from 'react';
import { weddingConfig, weddingData } from '../wedding.config';

export const Footer: React.FC = () => {
  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(`${weddingData.venue} ${weddingData.city}`)}`;

  return (
    <footer className="border-t border-gold/30 px-5 py-16 text-center">
      <p className="font-display text-3xl min-[380px]:text-4xl text-gold-foil animate-foil break-words">
        {weddingData.bride} &amp; {weddingData.groom}
      </p>
      <p className="mt-4 text-sm text-muted-foreground break-words px-2">
        {weddingData.dateLabel} · {weddingData.venue}, {weddingData.city}
      </p>
      <a
        className="mt-8 inline-block border border-gold/60 px-7 py-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold-deep transition-colors hover:bg-gold/10"
        href={mapsSearchUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open venue in maps
      </a>
    </footer>
  );
};
