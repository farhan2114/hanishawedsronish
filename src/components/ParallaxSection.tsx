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
        { yPercent: -6, scale: 1.15 },
        {
          yPercent: 6,
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
    <div ref={containerRef} className="relative h-[62vh] min-h-[440px] overflow-hidden bg-[#24080e] sm:h-[75vh]">
      <img
        src={banner.image}
        alt={banner.alt}
        loading="lazy"
        width={1200}
        height={1500}
        className="parallax-img absolute -top-[12%] left-0 h-[125%] w-full object-cover object-[72%_20%] sm:object-center will-change-transform"
      />
      {/* Dynamic gradient overlay: on mobile, rises from the bottom so the couple stays visible on top and text is crystal clear */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#24080e] via-[#24080e]/40 to-transparent sm:bg-[color-mix(in_oklab,var(--maroon)_28%,transparent)]" />
      <div className="absolute inset-0 flex items-end justify-center px-6 pb-10 sm:items-center sm:pb-0">
        <p className="max-w-2xl text-center font-display text-2xl leading-relaxed text-paper sm:text-5xl">
          {banner.quote}
        </p>
      </div>
    </div>
  );
};
