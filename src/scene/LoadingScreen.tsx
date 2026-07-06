import { useEffect, useRef, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dismissed, setDismissed] = useState(false);

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

  if (dismissed) return null;

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
        gap: 24,
      }}
    >
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        style={{ width: 160, height: 160 }}
      />
      <button
        onClick={() => setDismissed(true)}
        style={{
          padding: "10px 40px",
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
        }}
      >
        Enter
      </button>
    </div>
  );
}
