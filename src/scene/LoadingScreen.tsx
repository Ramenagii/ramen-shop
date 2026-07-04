import { Html, useProgress } from "@react-three/drei";

export default function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          color: "#d4693b",
          fontFamily: "system-ui, sans-serif",
          fontSize: "1.25rem",
          letterSpacing: "0.05em",
        }}
      >
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
