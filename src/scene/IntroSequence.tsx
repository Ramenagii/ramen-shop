import { useEffect, useRef, useState, useCallback } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { gsap } from "gsap";
import { useCameraContext } from "./CameraContext";
import { useIntroProgress } from "./ProgressContext";

const keyframes = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 12px rgba(241, 187, 24, 0.3); }
  50% { transform: translate(-50%, -50%) scale(1.03); box-shadow: 0 0 24px rgba(241, 187, 24, 0.6); }
  100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 12px rgba(241, 187, 24, 0.3); }
}
`;

export default function IntroSequence() {
  const { introComplete, setIntroComplete, goToStop } = useCameraContext();

  /* ── Phase 1: title card ── */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { progress } = useIntroProgress();
  const [progressDone, setProgressDone] = useState(false);
  const [timeDone, setTimeDone] = useState(false);
  const [ready, setReady] = useState(false); /* waiting for user input */
  const [phase, setPhase] = useState<"loading" | "letterbox">("loading");
  const transitioning = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);

  /* ── Phase 2: letterbox ── */
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const entered = useRef(false);

  /* ── Watch loading progress ── */
  useEffect(() => {
    if (progress >= 100) setProgressDone(true);
  }, [progress]);

  /* ── Minimum timer ── */
  useEffect(() => {
    const timer = setTimeout(() => setTimeDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* ── When both conditions met, set ready (show PRESS ENTER) ── */
  useEffect(() => {
    if (progressDone && timeDone && !transitioning.current) {
      transitioning.current = true;
      setReady(true);
    }
  }, [progressDone, timeDone]);

  /* ── Init dotlottie ── */
  useEffect(() => {
    if (!canvasRef.current) return;
    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      src: "/models/Ramen%20noodles.lottie",
      autoplay: true,
      loop: true,
    });
    return () => dotLottie.destroy();
  }, []);

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
  }, [phase, ready]);

  /* ── Phase 2: GSAP letterbox animation ── */
  useEffect(() => {
    if (phase !== "letterbox") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        goToStop("hero");
      },
    });
    tlRef.current = tl;

    tl.fromTo(topRef.current, { y: "-100%" }, { y: "0%", duration: 1, ease: "power3.out" })
      .fromTo(bottomRef.current, { y: "100%" }, { y: "0%", duration: 1, ease: "power3.out" }, "<")
      .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.3")
      .fromTo(skipRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.2");
  }, [phase, setIntroComplete, goToStop]);

  /* ── Phase 2: handle Enter click ── */
  const handleEnter = () => {
    if (entered.current) return;
    entered.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
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

    /* Immediately complete the camera transition */
    setIntroComplete(true);
    goToStop("hero");

    /* Also kill the letterbox animation instantly */
    if (tlRef.current) {
      tlRef.current.kill();
    }

    gsap.set([topRef.current, bottomRef.current, btnRef.current, skipRef.current], { opacity: 0 });
  }, [setIntroComplete, goToStop]);

  if (introComplete) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, pointerEvents: "auto" }}>
      <style>{keyframes}</style>

      {/* ── Phase 1: title card ── */}
      {phase === "loading" && (
        <div
          ref={titleRef}
          onClick={handleTitleClick}
          style={{
            position: "absolute", inset: 0,
            background: "#241c16",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: ready ? "pointer" : "default",
            userSelect: "none",
          }}
        >
          {/* Ambient lottie background */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3, pointerEvents: "none" }}>
            <canvas ref={canvasRef} width={360} height={360} style={{ width: 360, height: 360 }} />
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              fontFamily: "'Noto Serif JP', serif",
              background: "linear-gradient(135deg, #d25233, #f1bb18)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              position: "relative",
              zIndex: 1,
            }}
          >
            ラーメン
          </div>

          {/* Progress bar (during loading) or PRESS ENTER (when ready) */}
          <div style={{ marginTop: 40, position: "relative", zIndex: 1 }}>
            {ready ? (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#f1bb18",
                  animation: "blink 1.5s ease-in-out infinite",
                }}
              >
                PRESS ENTER
              </span>
            ) : (
              <div style={{ width: 240, height: 10, background: "#353535", borderRadius: 999, overflow: "hidden", border: "1px solid rgba(241,187,24,0.3)" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #d25233, #f1bb18)", borderRadius: 999, transition: "width 0.3s ease-out", boxShadow: "0 0 8px rgba(241,187,24,0.5)" }} />
              </div>
            )}
          </div>

          {/* Credit */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "lowercase",
              color: "rgba(250, 230, 163, 0.5)",
            }}
          >
            ramenagii
          </div>
        </div>
      )}

      {/* ── Phase 2: letterbox + Enter ── */}
      {phase === "letterbox" && (
        <>
          <div ref={topRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8vh", background: "#000" }} />
          <div ref={bottomRef} style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "8vh", background: "#000" }} />
          <button
            ref={btnRef}
            onClick={handleEnter}
            style={{
              position: "absolute", top: "50%", left: "50%",
              padding: "12px 40px",
              background: "linear-gradient(135deg, #d25233, #f1bb18)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              opacity: 0,
              animation: "pulse 2.5s ease-in-out infinite",
            }}
          >
            Enter
          </button>
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
