import { useCameraContext } from "../scene/CameraContext";

const ITEMS = ["hero", "about", "projects", "contact"] as const;

/* Nation color vibes — subtle */
const nationColors: Record<string, string> = {
  hero: "#c83020",
  about: "#c9a448",
  projects: "#4a8fbf",
  contact: "#d4693b",
};

export default function Nav() {
  const { currentStop, goToStop, introComplete } = useCameraContext();

  if (!introComplete) return null;

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Top bar (curtain rod) */}
      <div style={{
        width: "calc(100% + 24px)",
        height: 4,
        background: "linear-gradient(90deg, #2a1a10, #5c3a22, #8a5a34, #5c3a22, #2a1a10)",
        borderRadius: "0 0 2px 2px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }} />

      {/* Noren panels */}
      <div style={{ display: "flex", gap: 3 }}>
        {ITEMS.map((stop) => {
          const active = currentStop === stop;
          const color = nationColors[stop];
          return (
            <button
              key={stop}
              onClick={() => goToStop(stop)}
              style={{
                padding: "14px 20px 18px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: active
                  ? `linear-gradient(180deg, ${color}dd, ${color}88)`
                  : "linear-gradient(180deg, rgba(20,14,10,0.92), rgba(20,14,10,0.75))",
                color: active ? "#fff" : "rgba(255, 255, 255, 0.5)",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                boxShadow: active
                  ? `0 4px 16px ${color}33, inset 0 -2px 6px rgba(0,0,0,0.3)`
                  : "0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 6px rgba(0,0,0,0.2)",
                transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                position: "relative",
                minWidth: 80,
                /* Fabric bottom edge */
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
              }}
            >
              {stop}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
