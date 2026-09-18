import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../wedding.config';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { banner } = weddingConfig;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.parallax-img',
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[58vh] overflow-hidden bg-[#24080e] sm:h-[75vh]">
      <img
        src={banner.image}
        alt={banner.alt}
        loading="lazy"
        width={1200}
        height={1500}
        className="parallax-img absolute -top-[15%] left-0 h-[130%] w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--maroon)_28%,transparent)]" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="max-w-2xl text-center font-display text-3xl leading-snug text-paper sm:text-5xl">
          {banner.quote}
        </p>
      </div>
    </div>
  );
};
