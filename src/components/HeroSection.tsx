import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { assets } from "../data/assets";
import { weddingData } from "../data/weddingData";
import { playAudio } from "../lib/audio";

const paperCards = [
  { x: -320, y: 180,  r: -24, w: 120, h: 158 },
  { x: 300,  y: 220,  r: 18,  w: 96,  h: 126 },
  { x: -190, y: -160, r: 32,  w: 84,  h: 110 },
  { x: 230,  y: -140, r: -30, w: 108, h: 142 },
  { x: -400, y: -40,  r: 12,  w: 76,  h: 100 },
  { x: 420,  y: 40,   r: -14, w: 88,  h: 116 },
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  const [opened,   setOpened]    = useState(false);
  const [started,  setStarted]   = useState(false);
  const [videoOver,setVideoOver] = useState(false);
  const [fading,   setFading]    = useState(false);

  /* ── Seek to first frame on mount so background shows video still ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onLoad = () => { vid.currentTime = 0.001; };
    vid.addEventListener("loadedmetadata", onLoad);
    return () => vid.removeEventListener("loadedmetadata", onLoad);
  }, []);

  /* ── When started, play the video ── */
  useEffect(() => {
    if (started && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [started]);

  /* ── Lock scroll until invitation revealed ── */
  useEffect(() => {
    const docEl = document.documentElement;
    if (opened) {
      document.body.classList.remove("doors-locked");
      docEl.classList.remove("doors-locked");
      return;
    }
    window.scrollTo(0, 0);
    document.body.classList.add("doors-locked");
    docEl.classList.add("doors-locked");

    const prevent   = (e: Event) => e.preventDefault();
    const handleKey = (e: KeyboardEvent) => {
      if (["Space","ArrowUp","ArrowDown","PageUp","PageDown","Home","End"].includes(e.code))
        e.preventDefault();
    };
    window.addEventListener("wheel",     prevent,   { passive: false });
    window.addEventListener("touchmove", prevent,   { passive: false });
    window.addEventListener("keydown",   handleKey, { passive: false });

    return () => {
      document.body.classList.remove("doors-locked");
      docEl.classList.remove("doors-locked");
      window.removeEventListener("wheel",     prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown",   handleKey);
    };
  }, [opened]);

  /* ── GSAP invite-card reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setOpened(true),
      });

      tl.fromTo(".temple",
          { scale: 1.18, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: prefersReduced ? 0.4 : 1.8, ease: "power2.out" },
          0
        )
        .fromTo(".paper",
          { autoAlpha: 0, x: 0, y: 60, scale: 0.4, rotate: 0 },
          {
            autoAlpha: 1,
            x: (i) => paperCards[i].x,
            y: (i) => paperCards[i].y,
            scale: 1,
            rotate: (i) => paperCards[i].r,
            duration: prefersReduced ? 0.4 : 1.6,
            ease: "power2.out",
            stagger: 0.07,
          },
          prefersReduced ? 0 : 0.4
        )
        .fromTo(".invite-card",
          { autoAlpha: 0, y: 140, scale: 0.62, rotateX: 42 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: prefersReduced ? 0.4 : 1.5, ease: "power4.out" },
          prefersReduced ? 0 : 0.6
        )
        .fromTo(".invite-line",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=0.8"
        );

      tlRef.current = tl;
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Video ends or user skips ── */
  const handleVideoEnd = useCallback(() => {
    if (videoOver) return;
    setFading(true);
    setTimeout(() => {
      setVideoOver(true);
      playAudio();
      tlRef.current?.play();
    }, 650);
  }, [videoOver]);

  return (
    <section
      ref={sectionRef}
      className={`${
        opened ? "relative" : "fixed inset-0 z-[100]"
      } flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background`}
    >
      {/* Keyframes for mandala spin */}
      <style>{`
        @keyframes mandalaSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Temple Backdrop */}
      <img
        src={assets.temple}
        alt="Temple gopuram archway"
        className="temple pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-0 blur-[1px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/54" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[var(--gradient-veil)]" />

      {/* Floating Paper Cards */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {paperCards.map((card, i) => (
          <div
            key={i}
            className="paper absolute opacity-0 shadow-[var(--shadow-card)]"
            style={{ width: `${card.w}px`, height: `${card.h}px` }}
          >
            <div className="h-full w-full border border-gold/40 bg-paper">
              <div className="m-2 h-full border border-gold/25 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Invitation Card */}
      <div className="relative z-20 w-full px-5 [perspective:1400px]">
        <div className="invite-card mx-auto max-w-xl opacity-0">
          <div className="paper-card arch-top relative px-6 py-12 text-center sm:px-12 sm:py-16">
            <img
              src={assets.mandalaGold}
              alt=""
              aria-hidden="true"
              width="1024"
              height="1024"
              className="pointer-events-none absolute -top-16 left-1/2 w-28 -translate-x-1/2 opacity-60 sm:-top-20 sm:w-36"
            />
            <p className="invite-line eyebrow mt-6">{weddingData.dateShort}</p>
            <h1 className="invite-line mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl leading-[1.05] break-words">
              <span className="text-gold-foil animate-foil">{weddingData.bride}</span>
              <span className="mx-1.5 font-title text-xl align-middle text-maroon sm:text-3xl">&amp;</span>
              <span className="text-gold-foil animate-foil">{weddingData.groom}</span>
            </h1>
            <div className="invite-line rule-gold mx-auto mt-8 w-2/3" />
            <p className="invite-line mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {weddingData.invitationLine}
            </p>
            <p className="invite-line mt-8 font-title text-lg tracking-wide">{weddingData.dateLabel}</p>
            <p className="invite-line mt-1 text-sm text-muted-foreground">
              {weddingData.muhurtham} · {weddingData.venue}, {weddingData.city}
            </p>
            <a
              href="#rsvp"
              className="invite-line mt-9 inline-flex items-center gap-2 border border-gold/60 bg-transparent px-6 py-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold-deep transition-colors hover:bg-gold/10"
            >
              RSVP Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Intro Overlay ── */}
      {!videoOver && (
        <div
          className="fixed inset-0 z-[200] overflow-hidden bg-black transition-opacity duration-700"
          style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
        >
          {/* Instant First-Frame Poster (renders 0ms without waiting for video decoding) */}
          <img
            src="/client-images/intro-poster.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
          />

          {/* Video — with poster attribute for seamless native playback */}
          <video
            ref={videoRef}
            src={weddingData.introVideo || "/client-images/intro.mp4"}
            poster="/client-images/intro-poster.jpg"
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ transform: "translateZ(0)", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          />

          {/* Card overlay on top of frozen first frame — disappears on tap */}
          {!started && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] px-4">
              <div className="paper-card arch-top relative flex flex-col items-center px-6 py-9 text-center sm:px-14 sm:py-14 w-[76%] max-w-[285px] sm:max-w-sm">
                {/* Mandala: spins centered above card */}
                <div className="pointer-events-none absolute -top-11 sm:-top-14 left-1/2 -translate-x-1/2">
                  <img
                    src={assets.mandalaGold}
                    alt=""
                    aria-hidden="true"
                    className="w-20 sm:w-28"
                    style={{ animation: "mandalaSpin 14s linear infinite" }}
                  />
                </div>

                {/* Date */}
                <p className="eyebrow mt-5 sm:mt-6 text-[0.6rem] sm:text-[0.62rem]">{weddingData.dateShort}</p>

                {/* Names */}
                <h2 className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-x-1.5 font-display text-2xl min-[360px]:text-3xl sm:text-5xl leading-tight">
                  <span className="text-gold-foil animate-foil">{weddingData.bride}</span>
                  <span className="font-title text-base sm:text-lg text-maroon sm:text-2xl">&amp;</span>
                  <span className="text-gold-foil animate-foil">{weddingData.groom}</span>
                </h2>

                {/* Divider */}
                <div className="rule-gold mx-auto my-5 sm:my-7 w-24 sm:w-32 opacity-70" />

                {/* Tap to begin */}
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  aria-label="Tap to open the invitation"
                  className="group relative overflow-hidden rounded-full border border-gold/60 bg-transparent px-7 py-3 sm:px-9 sm:py-3.5 transition-all hover:border-gold hover:bg-gold/10 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative font-title text-[0.68rem] sm:text-[0.7rem] uppercase tracking-[0.34em] sm:tracking-[0.38em] text-gold-deep">
                    Open Invitation
                  </span>
                </button>

                <p className="mt-4 sm:mt-5 text-[0.55rem] sm:text-[0.58rem] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-foreground">
                  Music will play softly
                </p>
              </div>
            </div>
          )}

          {/* Skip button — only after video starts */}
          {started && (
            <button
              type="button"
              onClick={handleVideoEnd}
              aria-label="Skip intro"
              className="absolute bottom-6 right-5 z-20 rounded-full border border-gold/50 bg-black/60 px-5 py-2.5 font-title text-[0.68rem] uppercase tracking-[0.25em] text-paper backdrop-blur-md transition-colors hover:bg-black/80 sm:bottom-10 sm:right-10"
            >
              Skip intro
            </button>
          )}
        </div>
      )}
    </section>
  );
};
