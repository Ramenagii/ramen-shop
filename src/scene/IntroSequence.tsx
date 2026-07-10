import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useCameraContext } from "./CameraContext";
import { useIntroProgress } from "./ProgressContext";

const keyframes = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes swing {
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -50%) rotate(1.5deg); }
  75% { transform: translate(-50%, -50%) rotate(-1.5deg); }
}
`;

export default function IntroSequence() {
  const { introComplete, setIntroComplete, goToStop } = useCameraContext();
  const { progress } = useIntroProgress();

  const titleRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"loading" | "letterbox">("loading");
  const transitioning = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const audioStarted = useRef(false);

  /* ── Phase 2: letterbox ── */
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const entered = useRef(false);

  /* ── Audio: play on first user interaction, fade volume in ── */
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) return;

    audio.volume = 0;
    audio.currentTime = 0;
    audio.play().then(() => {
      audioStarted.current = true;
      gsap.to(audio, { volume: 0.5, duration: 4, ease: "power2.in" });
    }).catch((err) => {
      console.warn("[Audio] play failed:", err.name, err.message);
    });
  }, []);

  /* Attach a single persistent listener that keeps trying until audio plays */
  useEffect(() => {
    startAudio();

    const handler = () => { startAudio(); };
    document.addEventListener("click", handler, true);
    document.addEventListener("keydown", handler, true);
    document.addEventListener("touchstart", handler, true);
    document.addEventListener("pointerdown", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("keydown", handler, true);
      document.removeEventListener("touchstart", handler, true);
      document.removeEventListener("pointerdown", handler, true);
    };
  }, [startAudio]);

  /* ── 3D progress: show PRESS ENTER once fully loaded + minimum time ── */
  const [progressDone, setProgressDone] = useState(false);
  const [timeDone, setTimeDone] = useState(false);

  useEffect(() => {
    if (progress >= 100) setProgressDone(true);
  }, [progress]);

  useEffect(() => {
    const timer = setTimeout(() => setTimeDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progressDone && timeDone && !transitioning.current) {
      transitioning.current = true;
      setReady(true);
    }
  }, [progressDone, timeDone]);

  /* ── Keyboard listeners ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (phase === "loading" && ready) handleTitleClick();
        else if (phase === "letterbox" && !entered.current) handleSkip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  /* ── Phase 1 → Phase 2: fade title card, start letterbox ── */
  const handleTitleClick = useCallback(() => {
    if (phase !== "loading") return;
    if (!ready) return;

    startAudio();

    const el = titleRef.current;
    if (!el) return;

    gsap.to(el, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setPhase("letterbox");
        gsap.set(el, { display: "none" });
      },
    });
  }, [phase, ready, startAudio]);

  /* ── Phase 2: GSAP letterbox animation (just slides in, no auto-advance) ── */
  useEffect(() => {
    if (phase !== "letterbox") return;

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.fromTo(topRef.current, { y: "-100%" }, { y: "0%", duration: 1, ease: "power3.out" })
      .fromTo(bottomRef.current, { y: "100%" }, { y: "0%", duration: 1, ease: "power3.out" }, "<")
      .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.3")
      .fromTo(skipRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.2");
  }, [phase, setIntroComplete, goToStop]);

  /* ── Fade out audio ── */
  const fadeOutAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.to(audio, {
      volume: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        audio.pause();
        audio.currentTime = 0;
      },
    });
  }, []);

  /* ── Phase 2: handle Enter click ── */
  const handleEnter = () => {
    if (entered.current) return;
    entered.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        fadeOutAudio();
        setIntroComplete(true);
        goToStop("hero");
      },
    });

    tl.to([topRef.current, bottomRef.current], { opacity: 0, duration: 0.4, ease: "power2.inOut" })
      .to(btnRef.current, { opacity: 0, duration: 0.3 }, "<")
      .to(skipRef.current, { opacity: 0, duration: 0.3 }, "<");
  };

  /* ── Phase 2: skip button ── */
  const handleSkip = useCallback(() => {
    if (entered.current) return;
    entered.current = true;

    fadeOutAudio();
    setIntroComplete(true);
    goToStop("hero");

    if (tlRef.current) {
      tlRef.current.kill();
    }

    gsap.set([topRef.current, bottomRef.current, btnRef.current, skipRef.current], { opacity: 0 });
  }, [setIntroComplete, goToStop, fadeOutAudio]);

  if (introComplete) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, pointerEvents: "auto" }}>
      <style>{keyframes}</style>

      {/* Audio element — autoplay, loops during intro */}
      <audio ref={audioRef} src="/audio/wind-akeboshi.mp3" loop preload="auto" />

      {/* ── Phase 1: title card (pure HTML, no 3D) ── */}
      {phase === "loading" && (
        <div
          ref={titleRef}
          onClick={handleTitleClick}
          style={{
            position: "absolute", inset: 0,
            background: "#0a0604",
            display: "flex", flexDirection: "row",
            alignItems: "stretch",
            cursor: ready ? "pointer" : "default",
            userSelect: "none",
            overflow: "hidden",
          }}
        >
          {/* Dark vignette overlay */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 65% 50%, rgba(80, 20, 10, 0.3) 0%, rgba(0,0,0,0.8) 100%)", pointerEvents: "none", zIndex: 1 }} />

          {/* Left side: text content */}
          <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", flex: "1 1 50%", padding: "0 60px" }}>
            {/* Small subtitle */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(200, 80, 40, 0.8)",
                marginBottom: 12,
              }}
            >
              Welcome to
            </div>

            {/* Main title — bold stacked */}
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                fontFamily: "'Noto Serif JP', serif",
                color: "#fff",
                lineHeight: 1.0,
                textShadow: "0 0 60px rgba(200, 50, 30, 0.4)",
              }}
            >
              ラーメン
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                fontFamily: "'Noto Serif JP', serif",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: 4,
                letterSpacing: "0.08em",
              }}
            >
              RAMEN SHOP
            </div>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "rgba(250, 200, 150, 0.5)",
                marginTop: 24,
                letterSpacing: "0.08em",
                lineHeight: 1.6,
              }}
            >
              Justin Lorenzo · Developer Portfolio
            </div>

            {/* Progress bar or PRESS ENTER */}
            <div style={{ marginTop: 36 }}>
              {ready ? (
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#c83020",
                    animation: "blink 1.5s ease-in-out infinite",
                  }}
                >
                  PRESS ENTER
                </span>
              ) : (
                <div style={{ width: 200, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #c83020, #ff6040)", borderRadius: 999, transition: "width 0.3s ease-out", boxShadow: "0 0 8px rgba(200,50,30,0.5)" }} />
                </div>
              )}
            </div>
          </div>

          {/* Right side: profile photo — full height like Madara in the reference */}
          <div style={{ position: "relative", zIndex: 2, flex: "1 1 50%", overflow: "hidden" }}>
            <img
              src="/images/pfp.png"
              alt="Justin Lorenzo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "contrast(1.15) saturate(0.7) brightness(0.8)",
                opacity: 0.9,
              }}
            />
            {/* Gradient fade from left to blend with text side */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, #0a0604 0%, transparent 40%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background: "linear-gradient(to top, #0a0604 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Red glow overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, rgba(200, 30, 20, 0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Music credit — bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: 60,
              zIndex: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              color: "rgba(250, 200, 150, 0.35)",
            }}
          >
            ♪ "Wind" by Akeboshi · Naruto ED1
          </div>

          {/* Handle credit — bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              right: 60,
              zIndex: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "lowercase",
              color: "rgba(250, 230, 163, 0.3)",
            }}
          >
            ramenagii
          </div>
        </div>
      )}

      {/* ── Phase 2: letterbox + Wooden Sign Enter ── */}
      {phase === "letterbox" && (
        <>
          <div ref={topRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8vh", background: "#000" }} />
          <div ref={bottomRef} style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "8vh", background: "#000" }} />

          {/* Wooden sign button */}
          <div
            ref={btnRef}
            onClick={handleEnter}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              cursor: "pointer", opacity: 0,
              animation: "swing 4s ease-in-out infinite",
              transformOrigin: "top center",
            }}
          >
            {/* Rope/chain holding the sign */}
            <div style={{
              width: 2, height: 28,
              background: "linear-gradient(180deg, rgba(139,94,60,0.2), #8b5e3c, #6b3e26)",
              borderRadius: 1,
            }} />

            {/* The wooden board */}
            <div style={{
              position: "relative",
              padding: "20px 28px",
              background: "linear-gradient(180deg, #5c3a22 0%, #3d2816 40%, #2a1a10 100%)",
              borderRadius: 6,
              border: "2px solid #1a0f08",
              boxShadow: `
                0 8px 24px rgba(0,0,0,0.6),
                0 2px 8px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,200,150,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.3)
              `,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              /* Wood grain texture */
              backgroundImage: `
                linear-gradient(180deg, #5c3a22 0%, #3d2816 40%, #2a1a10 100%),
                repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(0,0,0,0.04) 6px, transparent 8px)
              `,
            }}>
              {/* Inner border (carved edge look) */}
              <div style={{
                position: "absolute", inset: 4,
                border: "1px solid rgba(139,94,60,0.15)",
                borderRadius: 3,
                pointerEvents: "none",
              }} />

              {/* Main kanji */}
              <div style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#f5e6c8",
                textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 20px rgba(200,100,40,0.15)",
                lineHeight: 1,
              }}>
                営業中
              </div>

              {/* Subtitle */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(201,164,104,0.6)",
              }}>
                open
              </div>

              {/* Warm glow behind */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 120, height: 80,
                background: "radial-gradient(ellipse, rgba(255,140,40,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
                animation: "pulse 3s ease-in-out infinite",
              }} />
            </div>

            {/* Bottom rope knot */}
            <div style={{
              width: 6, height: 6,
              background: "#6b3e26",
              borderRadius: "50%",
              marginTop: -1,
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }} />
          </div>

          <button
            ref={skipRef}
            onClick={handleSkip}
            style={{
              position: "absolute", bottom: 24, right: 24,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(250, 230, 163, 0.4)",
              opacity: 0,
            }}
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}
