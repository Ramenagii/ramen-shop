import { useCameraContext } from "../scene/CameraContext";

const ITEMS = ["hero", "about"];

export default function Nav() {
  const { currentStop, goToStop } = useCameraContext();

  return (
    <nav
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        gap: 12,
      }}
    >
      {ITEMS.map((stop) => (
        <button
          key={stop}
          onClick={() => goToStop(stop)}
          style={{
            padding: "8px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background:
              currentStop === stop
                ? "#d4693b"
                : "rgba(255, 255, 255, 0.08)",
            color:
              currentStop === stop
                ? "#fff"
                : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(4px)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          {stop}
        </button>
      ))}
    </nav>
  );
}
