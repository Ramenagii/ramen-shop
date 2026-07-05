import { useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";
import lottie from "lottie-web";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/ramen-noodles.json",
    });
    return () => anim.destroy();
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
        <div ref={containerRef} style={{ width: 160, height: 160 }} />
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
