import { useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";
import { DotLottie } from "@lottiefiles/dotlottie-web";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          style={{ width: 160, height: 160 }}
        />
        <div
          style={{
            color: "#f1bb18",
            fontFamily: "system-ui, sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.05em",
          }}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}
