import { useEffect, useRef, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useCameraContext } from "./CameraContext";

const keyframes = `
@keyframes starPop {
  0% { transform: scale(0) rotate(-30deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(10deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes sparkle {
  0% { transform: translate(0, 0) scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
`;

const sparkles = [
  { tx: -40, ty: -50, delay: 0 },
  { tx: 50, ty: -40, delay: 0.1 },
  { tx: -30, ty: 50, delay: 0.2 },
  { tx: 45, ty: 45, delay: 0.05 },
  { tx: 0, ty: -60, delay: 0.15 },
  { tx: -50, ty: 10, delay: 0.25 },
];

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const { assetsLoaded } = useCameraContext();
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const minPassed = useRef(false);
  const triggered = useRef(false);
  const assetsRef = useRef(false);
  assetsRef.current = assetsLoaded;

  const doFade = () => {
    if (triggered.current) return;
    triggered.current = true;
    setDone(true);
    setTimeout(() => {
      setFading(true);
      setTimeout(() => setShow(false), 500);
    }, 700);
  };

  useEffect(() => {
    if (!progressDotRef.current) return;
    progressDotRef.current.style.width = `${progress}%`;
  }, [progress]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      minPassed.current = true;
      if (assetsRef.current) doFade();
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (assetsLoaded && minPassed.current) doFade();
  }, [assetsLoaded]);

  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2 + Math.random() * 4, 99));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: "#241c16",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: fading ? "none" : "auto",
        }}
      >
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          style={{ width: 160, height: 160 }}
        />

        {done && (
          <div style={{ position: "relative", width: 0, height: 0 }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                fontSize: 32,
                color: "#f1bb18",
                animation: "starPop 0.6s ease-out forwards",
                textShadow: "0 0 20px rgba(241,187,24,0.8), 0 0 60px rgba(210,82,51,0.4)",
              }}
            >
              ★
            </span>
            {sparkles.map((s, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: "translate(-50%, -50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#fae6a3",
                  boxShadow: "0 0 6px #f1bb18",
                  animation: `sparkle 0.6s ease-out ${s.delay}s forwards`,
                  "--tx": `${s.tx}px`,
                  "--ty": `${s.ty}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <div
          style={{
            width: 200,
            height: 10,
            background: "#353535",
            borderRadius: 999,
            overflow: "hidden",
            border: "1px solid rgba(241, 187, 24, 0.3)",
          }}
        >
          <div
            ref={progressDotRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #d25233, #f1bb18)",
              borderRadius: 999,
              transition: "width 0.3s ease-out",
              boxShadow: "0 0 8px rgba(241, 187, 24, 0.5)",
            }}
          />
        </div>
      </div>
    </>
  );
}
