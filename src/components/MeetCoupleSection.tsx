import React from 'react';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

interface PersonCardProps {
  name: string;
  role: string;
  note: string;
  src: string;
  alt: string;
  delay?: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, role, note, src, alt, delay = 0 }) => {
  return (
    <RevealOnScroll delay={delay}>
      <figure className="mx-auto max-w-sm text-center">
        <div className="relative mx-auto aspect-[4/5] overflow-hidden border border-gold/40 bg-muted shadow-[var(--shadow-card)]">
          <img src={src} alt={alt} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute inset-3 border border-paper/30" />
        </div>
        <figcaption>
          <p className="mt-7 font-title text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep">{role}</p>
          <h3 className="mt-3 font-display text-4xl">{name}</h3>
          <div className="rule-gold mx-auto mt-5 w-20" />
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{note}</p>
        </figcaption>
      </figure>
    </RevealOnScroll>
  );
};

export const MeetCoupleSection: React.FC = () => {
  const { couple } = weddingConfig;

  return (
    <section id="couple" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <SpinningMandala className="-right-24 bottom-10 w-56 sm:w-72" />
      <Ornament className="-left-8 top-10 w-36 sm:w-52" />
      <Ornament variant="small" className="right-2 top-1/3 w-24 rotate-45 sm:w-32" />

      <div className="relative mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">Together with their families</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Meet the couple</h2>
          <div className="rule-gold mx-auto mt-8 w-32" />
        </RevealOnScroll>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-10">
          <PersonCard
            name={couple.bride}
            role={couple.brideRole}
            note={couple.brideParentsNote}
            src={couple.bridePhoto}
            alt={couple.bridePhotoAlt}
            delay={0.1}
          />
          <PersonCard
            name={couple.groom}
            role={couple.groomRole}
            note={couple.groomParentsNote}
            src={couple.groomPhoto}
            alt={couple.groomPhotoAlt}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};
