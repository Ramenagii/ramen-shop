import { useEffect, useRef, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useCameraContext } from "./CameraContext";

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { assetsLoaded } = useCameraContext();
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const minPassed = useRef(false);
  const triggered = useRef(false);
  const assetsRef = useRef(false);
  assetsRef.current = assetsLoaded;

  const doFade = () => {
    if (triggered.current) return;
    triggered.current = true;
    setFading(true);
    setTimeout(() => setShow(false), 400);
  };

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

  if (!show) return null;

  return (
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
        gap: 12,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        style={{ width: 160, height: 160 }}
      />
    </div>
  );
}
