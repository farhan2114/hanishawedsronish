import React from 'react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const GratitudeSection: React.FC = () => {
  const { couple, gratitude, invitation } = weddingConfig;

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <SpinningMandala reverse className="-left-24 bottom-4 w-56 sm:w-80" />
      <Ornament variant="gold" className="-left-10 top-10 w-36 rotate-6 sm:w-52" />
      <Ornament variant="gold" className="-right-8 bottom-10 w-32 -rotate-12 sm:w-48" />

      <RevealOnScroll className="relative mx-auto max-w-4xl">
        <div className="paper-card relative overflow-hidden px-6 py-14 text-center sm:px-16 sm:py-20">
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -left-16 -top-10 w-64 opacity-[0.13] sm:w-80"
          />
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -bottom-16 -right-14 w-64 rotate-180 opacity-[0.13] sm:w-80"
          />
          <span className="pointer-events-none absolute inset-4 border border-gold/30" />

          <div className="relative">
            <img
              src={assets.kalash}
              alt="Traditional ceremonial kalash with mango leaves and coconut"
              loading="lazy"
              className="mx-auto w-20 sm:w-24"
            />
            <p className="eyebrow mt-7">{gratitude.eyebrow}</p>
            <h2 className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl leading-[1.05] break-words">
              <span className="text-gold-foil animate-foil">{couple.bride}</span>
              <span className="mx-1.5 align-middle font-title text-xl text-maroon sm:text-3xl">&amp;</span>
              <span className="text-gold-foil animate-foil">{couple.groom}</span>
            </h2>
            <p className="mt-7 font-title text-sm uppercase tracking-[0.32em] text-maroon sm:text-base">
              {gratitude.heading}
            </p>
            <img
              src={assets.lotusDivider}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="mx-auto mt-6 w-full max-w-sm opacity-90"
            />
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {gratitude.message}
            </p>
            <img
              src={assets.coupleNamaste}
              alt="Illustration of greeting with folded hands"
              loading="lazy"
              className="mx-auto mt-10 w-48 sm:w-60"
            />
            <p className="mx-auto max-w-md px-2 font-title text-[0.68rem] min-[400px]:text-xs uppercase leading-relaxed tracking-[0.12em] sm:tracking-[0.22em] text-gold-deep sm:text-[0.8rem] whitespace-pre-line break-words">
              {invitation.familyLine}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] text-muted-foreground break-words px-2">
              {couple.hashtag}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
