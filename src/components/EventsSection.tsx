import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import { weddingData } from '../data/weddingData';
import { SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

export const EventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>('.event-card'));

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        const nextCard = cards[idx + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 75%',
              end: 'top 18%',
              scrub: true,
            },
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="relative overflow-clip px-5 py-24 sm:py-28">
      <SpinningMandala className="-left-24 bottom-8 w-52 sm:w-72" />
      <img
        src={assets.mandalaGold}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-24 top-10 w-72 opacity-25 animate-float-slow"
      />

      <div className="mx-auto max-w-5xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">The celebrations</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Order of events</h2>
        </RevealOnScroll>

        <div className="relative mt-14 pb-[2vh]">
          {weddingData.events.map((event, idx) => (
            <div
              key={event.name}
              className="event-card sticky top-[14vh] mb-[8vh] origin-top will-change-transform"
              style={{ zIndex: idx + 1 }}
            >
              <article className="paper-card relative mx-auto min-h-[44vh] max-w-3xl overflow-hidden px-6 py-10 text-center sm:min-h-[48vh] sm:px-14 sm:py-14">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-2xl font-semibold text-gold-deep sm:text-3xl">
                    0{idx + 1}
                  </span>
                  <span className="h-3 w-px bg-gold/40" />
                  <p className="eyebrow !tracking-[0.25em]">{event.day}</p>
                </div>
                <h3 className="mx-auto mt-6 max-w-xl px-2 font-display text-2xl min-[420px]:text-3xl sm:text-5xl leading-tight break-words">
                  {event.name}
                </h3>
                <div className="rule-gold mx-auto mt-7 w-28" />
                <p className="mt-7 font-title text-xl sm:text-2xl">{event.time}</p>
                <p className="mt-2 text-sm text-muted-foreground">{event.place}</p>
                <p className="mx-auto mt-7 max-w-md px-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {event.note}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
