import { useRef, useState, useEffect } from "react";
import { useCameraContext } from "../scene/CameraContext";

/* Poof sound */
const poofAudio = typeof window !== "undefined" ? new Audio("/audio/poof.mp3") : null;
if (poofAudio) { poofAudio.volume = 0.4; poofAudio.preload = "auto"; }
function playPoof() { if (!poofAudio) return; poofAudio.currentTime = 0; poofAudio.play().catch(() => {}); }

export default function ContactScroll({ visible }: { visible: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState<"info" | "form">("info");
  const switching = useRef(false);

  useEffect(() => {
    if (visible) { setTimeout(() => setIsOpen(true), 120); }
    else { setIsOpen(false); }
  }, [visible]);

  const switchSide = (next: "info" | "form") => {
    if (next === side || switching.current) return;
    switching.current = true;
    playPoof();
    setIsOpen(false);
    setTimeout(() => {
      setSide(next);
      setTimeout(() => { setIsOpen(true); switching.current = false; }, 100);
    }, 950);
  };

  if (!visible && !isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      pointerEvents: visible ? "auto" : "none",
      opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
      padding: 16,
    }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        <button onClick={() => switchSide("info")} style={tabBtn(side === "info")}>📜 Info</button>
        <button onClick={() => switchSide("form")} style={tabBtn(side === "form")}>✉ Message</button>
      </div>

      {/* Scroll */}
      <div style={{ position: "relative", width: "min(92vw, 820px)", height: "clamp(280px, 50vh, 380px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Left roller */}
        <Roller side="left" />

        {/* Parchment */}
        <div style={{
          position: "relative",
          height: "clamp(230px, 42vh, 320px)",
          width: isOpen ? "min(78vw, 700px)" : "0px",
          background: `linear-gradient(180deg, rgba(0,0,0,0.1), transparent 10%, transparent 90%, rgba(0,0,0,0.15)),
            linear-gradient(90deg, #8a6a3a 0%, #d9bd8c 3%, #c7a56e 50%, #d9bd8c 97%, #8a6a3a 100%)`,
          borderRadius: 3,
          boxShadow: "inset 0 0 30px rgba(120,80,30,0.35), 0 10px 30px rgba(0,0,0,0.55)",
          transition: "width 0.9s cubic-bezier(.65,0,.35,1)",
          overflow: "hidden", zIndex: 2,
        }}>
          {/* Grain */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, mixBlendMode: "multiply", backgroundImage: "repeating-linear-gradient(90deg, rgba(120,86,40,0.05) 0px, transparent 2px, transparent 4px), repeating-linear-gradient(0deg, rgba(90,60,25,0.05) 0px, transparent 3px, transparent 6px)" }} />
          {/* Creases */}
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent 0px, transparent 38px, rgba(90,60,20,0.1) 39px, transparent 41px)", opacity: isOpen ? 1 : 0, transition: "opacity 1s ease 0.5s" }} />
          {/* Content clip */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            clipPath: isOpen ? "inset(0 3% 0 3%)" : "inset(0 50% 0 50%)",
            transition: "clip-path 1s cubic-bezier(.5,0,.3,1) 0.25s",
            padding: "12px clamp(16px, 3vw, 36px)",
          }}>
            <div style={{
              opacity: isOpen ? 1 : 0, transform: isOpen ? "scale(1)" : "scale(0.85)",
              transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
              width: "100%", maxWidth: 480,
            }}>
              {side === "info" ? <InfoSide /> : <FormSide />}
            </div>
          </div>
        </div>

        {/* Right roller */}
        <Roller side="right" />

        {/* Cord */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: isOpen ? "translate(-50%,-50%) scale(0.5) rotate(35deg)" : "translate(-50%,-50%)",
          width: 48, height: 48, zIndex: 5, pointerEvents: "none",
          opacity: isOpen ? 0 : 1,
          transition: "opacity 0.4s ease, transform 0.5s ease",
        }}>
          <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 35 C 8 15, 62 15, 62 35 C 62 55, 8 55, 8 35 Z" fill="none" stroke="#4c1216" strokeWidth="7" strokeLinecap="round"/>
            <path d="M8 35 C 8 15, 62 15, 62 35 C 62 55, 8 55, 8 35 Z" fill="none" stroke="#7a1f24" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="35" cy="35" r="9" fill="#7a1f24" stroke="#3a0d10" strokeWidth="2"/>
            <circle cx="35" cy="35" r="3.5" fill="#c9a468"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Roller component */
function Roller({ side }: { side: "left" | "right" }) {
  return (
    <div style={{
      position: "relative",
      width: "clamp(32px, 4vw, 40px)",
      height: "clamp(280px, 50vh, 380px)",
      borderRadius: 16, zIndex: 3, flexShrink: 0,
      background: "linear-gradient(90deg, #331f10 0%, #5c3a22 18%, #8a5a34 46%, #5c3a22 74%, #331f10 100%)",
      boxShadow: "0 8px 22px rgba(0,0,0,0.6), inset -3px 0 6px rgba(0,0,0,0.4), inset 3px 0 6px rgba(255,220,170,0.12)",
    }}>
      {/* Gold end caps */}
      <div style={{ position: "absolute", left: -3, right: -3, top: -7, height: 14, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 35%, #b8863b, #331f10 70%)", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: -3, right: -3, bottom: -7, height: 14, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 35%, #b8863b, #331f10 70%)", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />
    </div>
  );
}

/* Tab button style */
function tabBtn(active: boolean): React.CSSProperties {
  return {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "clamp(9px, 1vw, 11px)",
    letterSpacing: "0.12em", textTransform: "uppercase",
    padding: "6px 16px", borderRadius: 3, cursor: "pointer",
    border: active ? "1px solid #c9a468" : "1px solid rgba(201,164,104,0.2)",
    background: active ? "linear-gradient(180deg, #3a281a, #1c130c)" : "transparent",
    color: active ? "#e9dcc2" : "rgba(201,164,104,0.4)",
    fontWeight: active ? 700 : 400,
    boxShadow: active ? "0 4px 14px rgba(0,0,0,0.5)" : "none",
  };
}

/* Info side */
function InfoSide() {
  const links = [
    { label: "GitHub", value: "github.com/ramenagii", href: "https://github.com/ramenagii" },
    { label: "Email", value: "justinlorenzo@email.com", href: "mailto:justinlorenzo@email.com" },
    { label: "LinkedIn", value: "Justin Lorenzo", href: "https://linkedin.com" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 900, color: "#2a1810" }}>召喚の契約書</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c", marginBottom: 6 }}>Summoning Contract</div>
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", padding: "6px 10px", borderRadius: 3, border: "1px solid rgba(107,76,59,0.15)", background: "rgba(245,225,190,0.4)" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c" }}>{l.label}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2a1810", marginTop: 1 }}>{l.value}</div>
        </a>
      ))}
    </div>
  );
}

/* Form side */
function FormSide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 900, color: "#2a1810" }}>伝書の術</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c", marginBottom: 4 }}>Send a Message</div>
      <form onSubmit={(e) => { e.preventDefault(); alert("Scroll sent! 📜"); }} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <input type="text" placeholder="Name" required style={inputCSS} />
          <input type="email" placeholder="Email" required style={inputCSS} />
        </div>
        <textarea placeholder="Message..." rows={2} required style={{ ...inputCSS, resize: "none", minHeight: 44 }} />
        <button type="submit" style={{ alignSelf: "flex-start", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 14px", background: "#3a281a", color: "#e9dcc2", border: "1px solid #c9a468", borderRadius: 3, cursor: "pointer" }}>✦ Send</button>
      </form>
    </div>
  );
}

const inputCSS: React.CSSProperties = {
  flex: "1 1 110px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
  padding: "6px 9px", background: "rgba(245,230,200,0.5)",
  border: "1px solid rgba(107,76,59,0.15)", borderRadius: 3, color: "#2a1810", outline: "none",
};
