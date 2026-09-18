import React from 'react';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const GallerySection: React.FC = () => {
  const { gallery } = weddingConfig;

  return (
    <section id="gallery" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <SpinningMandala reverse className="-right-20 top-1/3 w-48 sm:w-64" />
      <Ornament className="-left-10 top-16 w-40 rotate-12 sm:w-56" />
      <Ornament variant="small" className="-right-6 bottom-10 w-28 -rotate-12 sm:w-40" />
      <Ornament variant="gold" className="right-4 top-6 w-24 rotate-6 sm:w-36" />

      <div className="relative mx-auto max-w-5xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">Moments</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Our gallery</h2>
          <div className="rule-gold mx-auto mt-8 w-32" />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {gallery[0] && (
            <div className="sm:row-span-2">
              <figure className="group relative h-full overflow-hidden border border-gold/30 bg-muted">
                <img
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-3 border border-paper/25" />
              </figure>
            </div>
          )}
          {gallery[1] && (
            <div>
              <figure className="group relative h-full overflow-hidden border border-gold/30 bg-muted">
                <img
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-3 border border-paper/25" />
              </figure>
            </div>
          )}
          {gallery[2] && (
            <div>
              <figure className="group relative h-full overflow-hidden border border-gold/30 bg-muted">
                <img
                  src={gallery[2].src}
                  alt={gallery[2].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-3 border border-paper/25" />
              </figure>
            </div>
          )}
          {gallery[3] && (
            <div className="sm:col-span-2">
              <figure className="group relative h-full overflow-hidden border border-gold/30 bg-muted">
                <img
                  src={gallery[3].src}
                  alt={gallery[3].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-3 border border-paper/25" />
              </figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
