import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCameraContext } from "../scene/CameraContext";

export default function IntroOverlay() {
  const { introComplete, setIntroComplete, goToStop } = useCameraContext();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);

  useEffect(() => {
    if (introComplete) return;

    const tl = gsap.timeline();
    tl.fromTo(
      topRef.current,
      { y: "-100%" },
      { y: "0%", duration: 1, ease: "power3.out" }
    ).fromTo(
      bottomRef.current,
      { y: "100%" },
      { y: "0%", duration: 1, ease: "power3.out" },
      "<"
    ).fromTo(
      btnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "+=0.3"
    );
  }, [introComplete]);

  const handleEnter = () => {
    if (entered.current) return;
    entered.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        goToStop("hero");
      },
    });

    tl.to([topRef.current, bottomRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }).to(
      btnRef.current,
      { opacity: 0, duration: 0.3 },
      "<"
    );
  };

  if (introComplete) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        pointerEvents: "auto",
      }}
    >
      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "8vh",
          background: "#000",
        }}
      />
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "8vh",
          background: "#000",
        }}
      />
      <button
        ref={btnRef}
        onClick={handleEnter}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "12px 40px",
          background: "#d25233",
          color: "#fae6a3",
          border: "2px solid #f1bb18",
          borderRadius: 4,
          cursor: "pointer",
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0,
        }}
      >
        Enter
      </button>
    </div>
  );
}
