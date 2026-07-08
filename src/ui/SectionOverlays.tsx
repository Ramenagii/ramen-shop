import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useCameraContext } from "../scene/CameraContext";
import ContactScroll from "./ContactScroll";

/* ─── POOF SOUND ON TAB SWITCH ─── */
const poofAudio = typeof window !== "undefined" ? new Audio("/audio/poof.mp3") : null;
if (poofAudio) {
  poofAudio.volume = 0.4;
  poofAudio.preload = "auto";
}

function playPoof() {
  if (!poofAudio) return;
  poofAudio.currentTime = 0;
  poofAudio.play().catch(() => {});
}

/* ─── ABOUT SECTION ─── */
function AboutSection({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      gsap.fromTo(ref.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
    } else {
      gsap.to(ref.current, { opacity: 0, x: -40, duration: 0.4, ease: "power2.in" });
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "45vw",
        minWidth: 400,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        padding: "0 60px",
        pointerEvents: visible ? "auto" : "none",
        opacity: 0,
      }}
    >
      <div style={{
        background: "rgba(10, 6, 4, 0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(200, 50, 30, 0.12)",
        borderRadius: 16,
        padding: "48px 52px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative kanji watermark */}
        <div style={{
          position: "absolute",
          top: -20,
          right: -10,
          fontSize: 180,
          fontFamily: "'Noto Serif JP', serif",
          fontWeight: 900,
          color: "rgba(200, 50, 30, 0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}>
          忍
        </div>

        {/* Top accent line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #c83020, #ff6040, transparent)",
        }} />

        {/* Section label */}
        <div style={{
          fontSize: 10,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 8,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          ── About
        </div>

        {/* Profile pic + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(200, 80, 40, 0.3)",
            flexShrink: 0,
          }}>
            <img src="/images/pfp.png" alt="Justin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h2 style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              lineHeight: 1.1,
            }}>
              Justin Lorenzo
            </h2>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(250, 180, 120, 0.6)",
              marginTop: 4,
            }}>
              Full-Stack Developer
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          lineHeight: 2,
          color: "rgba(255, 240, 220, 0.6)",
          margin: "0 0 24px 0",
        }}>
          A passionate developer from Manila, Philippines crafting immersive 
          web experiences. PUP student by day, building creative projects by 
          night. I work at the intersection of code and design — making things 
          that feel alive.
        </p>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg, rgba(200, 80, 40, 0.3), transparent)",
          margin: "0 0 20px 0",
        }} />

        {/* Stats row */}
        <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
          {[
            { value: "3+", label: "Years Coding" },
            { value: "10+", label: "Projects" },
            { value: "∞", label: "Ramen Eaten" },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: 24,
                fontWeight: 900,
                color: "#c83020",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(250, 200, 150, 0.4)",
                marginTop: 2,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(250, 200, 150, 0.35)",
          marginBottom: 10,
        }}>
          Jutsu (Skills)
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["React", "Three.js", "TypeScript", "GSAP", "Node.js", "Figma", "Next.js", "TailwindCSS"].map(skill => (
            <span key={skill} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "rgba(255, 220, 180, 0.6)",
              background: "rgba(200, 50, 30, 0.08)",
              border: "1px solid rgba(200, 80, 40, 0.15)",
              borderRadius: 4,
              padding: "5px 12px",
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS SECTION ─── */
const projects = [
  {
    title: "Ramen Shop",
    desc: "3D interactive portfolio with scroll-driven camera system, cinematic intro sequence, and immersive scene navigation.",
    tech: ["R3F", "GSAP", "Three.js", "TypeScript"],
    status: "Live",
  },
  {
    title: "Project Two",
    desc: "Coming soon — another creative experiment pushing the boundaries of web interactivity.",
    tech: ["React", "Next.js", "Prisma"],
    status: "WIP",
  },
  {
    title: "Project Three",
    desc: "Coming soon — exploring new territories in design and development.",
    tech: ["Vue", "TailwindCSS", "Supabase"],
    status: "Planned",
  },
];

function ProjectsSection({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !cardsRef.current) return;
    if (visible) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      // Stagger cards
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", delay: 0.2 });
    } else {
      gsap.to(ref.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        pointerEvents: visible ? "auto" : "none",
        opacity: 0,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 8,
        }}>
          ── Projects ──
        </div>
        <h2 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 48,
          fontWeight: 900,
          color: "#fff",
          margin: 0,
          textShadow: "0 0 40px rgba(200, 50, 30, 0.2)",
        }}>
          作品集
        </h2>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "rgba(250, 200, 150, 0.4)",
          marginTop: 8,
          letterSpacing: "0.1em",
        }}>
          Missions completed & in progress
        </div>
      </div>

      {/* Cards grid */}
      <div ref={cardsRef} style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", maxWidth: 1000 }}>
        {projects.map((p, i) => (
          <div key={i} style={{
            flex: "1 1 280px",
            maxWidth: 320,
            background: "rgba(10, 6, 4, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200, 50, 30, 0.1)",
            borderRadius: 14,
            padding: "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Top accent */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "60%",
              height: 3,
              background: `linear-gradient(90deg, #c83020, transparent)`,
            }} />

            {/* Big number watermark */}
            <div style={{
              position: "absolute",
              top: 8,
              right: 16,
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "'Noto Serif JP', serif",
              color: "rgba(200, 50, 30, 0.06)",
              lineHeight: 1,
              pointerEvents: "none",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Status badge */}
            <div style={{
              display: "inline-block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: p.status === "Live" ? "#4ade80" : p.status === "WIP" ? "#f1bb18" : "rgba(250,200,150,0.4)",
              border: `1px solid ${p.status === "Live" ? "rgba(74,222,128,0.3)" : p.status === "WIP" ? "rgba(241,187,24,0.3)" : "rgba(200,80,40,0.15)"}`,
              borderRadius: 3,
              padding: "3px 8px",
              marginBottom: 16,
            }}>
              {p.status}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 10px 0",
            }}>
              {p.title}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              lineHeight: 1.8,
              color: "rgba(255, 240, 220, 0.5)",
              margin: "0 0 20px 0",
            }}>
              {p.desc}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "rgba(250, 180, 120, 0.5)",
                  background: "rgba(200, 50, 30, 0.06)",
                  border: "1px solid rgba(200, 80, 40, 0.12)",
                  borderRadius: 3,
                  padding: "3px 8px",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT SECTION — NARUTO SUMMONING SCROLL (dual-sided: info + form) ─── */
function ContactSection({ visible }: { visible: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRollerRef = useRef<HTMLDivElement>(null);
  const rightRollerRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState<"info" | "form">("info");
  const switching = useRef(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const openScroll = () => {
    if (!scrollRef.current || !wrapperRef.current) return;
    gsap.set(scrollRef.current, { opacity: 1 });
    gsap.fromTo(wrapperRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.out" }
    );
  };

  const closeScroll = (): Promise<void> => new Promise((resolve) => {
    if (!wrapperRef.current) { resolve(); return; }
    gsap.to(wrapperRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in", onComplete: resolve });
  });

  useEffect(() => {
    if (!scrollRef.current) return;
    if (visible) { openScroll(); }
    else { gsap.to(scrollRef.current, { opacity: 0, duration: 0.25 }); }
  }, [visible]);

  const switchSide = async (next: "info" | "form") => {
    if (next === side || switching.current) return;
    switching.current = true;
    playPoof();
    await closeScroll();
    setSide(next);
    requestAnimationFrame(() => { openScroll(); switching.current = false; });
  };

  return (
    <div ref={scrollRef} style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: visible ? "auto" : "none", opacity: 0, padding: "16px",
    }}>
      <div ref={wrapperRef} style={{ display: "flex", alignItems: "stretch", maxWidth: 660, width: "min(90vw, 660px)", transformOrigin: "center center", willChange: "transform" }}>
        {/* LEFT ROLLER */}
        <div ref={leftRollerRef} style={{
          width: "clamp(36px, 5vw, 50px)", background: "#3d5c4a",
          borderRadius: "50% 0 0 50%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", position: "relative",
          zIndex: 2, flexShrink: 0, boxShadow: "3px 0 10px rgba(0,0,0,0.4)",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "11%", background: "#6b3e26", borderRadius: "50% 0 0 0" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "11%", background: "#6b3e26", borderRadius: "0 0 0 50%" }} />
          <div style={{ position: "absolute", top: "11%", left: 3, right: 3, height: 2, background: "#c9a84c" }} />
          <div style={{ position: "absolute", top: "calc(11% + 3px)", left: 3, right: 3, height: 2, background: "#c83020" }} />
          <div style={{ position: "absolute", bottom: "11%", left: 3, right: 3, height: 2, background: "#c9a84c" }} />
          <div style={{ position: "absolute", bottom: "calc(11% + 3px)", left: 3, right: 3, height: 2, background: "#c83020" }} />
          <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: "#1a1a1a", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: "#1a1a1a", borderRadius: "50%" }} />
          <div style={{ writingMode: "vertical-rl", fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(11px, 1.3vw, 15px)", fontWeight: 900, color: "#f5e6c8", textShadow: "1px 1px 2px rgba(0,0,0,0.7)", letterSpacing: "0.3em" }}>連絡</div>
        </div>

        {/* SCROLL BODY */}
        <div ref={contentRef} style={{
          overflow: "hidden", background: "#c8b88a", position: "relative",
          minHeight: "clamp(320px, 45vh, 420px)", display: "flex", flexDirection: "column",
          width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transformOrigin: "center center", willChange: "transform",
        }}>
          {/* TOP BORDER + TABS */}
          <div style={{ minHeight: 32, background: "#3d5c4a", display: "flex", alignItems: "flex-end", padding: "0 10px", gap: 2, borderBottom: "2px solid #2a4436" }}>
            <button onClick={() => switchSide("info")} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px, 1vw, 10px)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", border: "none", borderRadius: "3px 3px 0 0", cursor: "pointer", background: side === "info" ? "#f5ecd4" : "transparent", color: side === "info" ? "#2a1810" : "rgba(245,230,200,0.5)", fontWeight: side === "info" ? 700 : 400 }}>📜 Info</button>
            <button onClick={() => switchSide("form")} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px, 1vw, 10px)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", border: "none", borderRadius: "3px 3px 0 0", cursor: "pointer", background: side === "form" ? "#f5ecd4" : "transparent", color: side === "form" ? "#2a1810" : "rgba(245,230,200,0.5)", fontWeight: side === "form" ? 700 : 400 }}>✉ Message</button>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, paddingBottom: 5 }}>
              {["🐸", "〰", "🐸", "〰", "🐸"].map((e, i) => <span key={i} style={{ fontSize: 10, opacity: 0.7 }}>{e}</span>)}
            </div>
          </div>

          {/* PARCHMENT */}
          <div style={{ flex: 1, margin: "0 8px", background: "#f5ecd4", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(16px, 2.5vw, 28px) clamp(16px, 3vw, 32px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.02, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 20px)" }} />
            {side === "info" ? <ScrollInfoSide /> : <ScrollFormSide />}
          </div>

          {/* BOTTOM BORDER */}
          <div style={{ minHeight: 32, background: "#3d5c4a", display: "flex", alignItems: "center", justifyContent: "space-evenly", padding: "0 12px", borderTop: "2px solid #2a4436" }}>
            {["🐸", "〰", "🐸", "〰", "🐸", "〰", "🐸"].map((e, i) => <span key={i} style={{ fontSize: 11, opacity: 0.7 }}>{e}</span>)}
          </div>

          {/* Right edge kanji */}
          <div style={{ position: "absolute", right: 12, top: 38, bottom: 38, writingMode: "vertical-rl", fontFamily: "'Noto Serif JP', serif", fontSize: 10, fontWeight: 700, color: "rgba(42,24,16,0.1)", letterSpacing: "0.3em", display: "flex", alignItems: "center", pointerEvents: "none" }}>史上最強口寄せ忍蝦募契約書</div>
        </div>

        {/* RIGHT ROLLER */}
        <div ref={rightRollerRef} style={{
          width: "clamp(36px, 5vw, 50px)", background: "#3d5c4a",
          borderRadius: "0 50% 50% 0", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", position: "relative",
          zIndex: 2, flexShrink: 0, boxShadow: "-3px 0 10px rgba(0,0,0,0.4)",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "11%", background: "#6b3e26", borderRadius: "0 50% 0 0" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "11%", background: "#6b3e26", borderRadius: "0 0 50% 0" }} />
          <div style={{ position: "absolute", top: "11%", left: 3, right: 3, height: 2, background: "#c9a84c" }} />
          <div style={{ position: "absolute", top: "calc(11% + 3px)", left: 3, right: 3, height: 2, background: "#c83020" }} />
          <div style={{ position: "absolute", bottom: "11%", left: 3, right: 3, height: 2, background: "#c9a84c" }} />
          <div style={{ position: "absolute", bottom: "calc(11% + 3px)", left: 3, right: 3, height: 2, background: "#c83020" }} />
          <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: "#1a1a1a", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: "#1a1a1a", borderRadius: "50%" }} />
          <div style={{ writingMode: "vertical-rl", fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(11px, 1.3vw, 15px)", fontWeight: 900, color: "#f5e6c8", textShadow: "1px 1px 2px rgba(0,0,0,0.7)", letterSpacing: "0.3em" }}>契約</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Info side of the scroll ─── */
function ScrollInfoSide() {
  return (
    <>
      <div data-scroll-item style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 900, color: "#2a1810", marginBottom: 4 }}>召喚の契約書</div>
      <div data-scroll-item style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px, 1vw, 10px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c", marginBottom: 18 }}>Summoning Contract — My Info</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "GitHub", value: "github.com/ramenagii", href: "https://github.com/ramenagii", icon: "⟁" },
          { label: "Email", value: "justinlorenzo@email.com", href: "mailto:justinlorenzo@email.com", icon: "✉" },
          { label: "LinkedIn", value: "Justin Lorenzo", href: "https://linkedin.com", icon: "◈" },
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" data-scroll-item style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "8px 12px", borderRadius: 5, border: "1px solid rgba(107,76,59,0.15)", background: "rgba(245,225,190,0.4)" }}>
            <span style={{ fontSize: 14, color: "#6b4c3b" }}>{link.icon}</span>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c" }}>{link.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2a1810", marginTop: 1 }}>{link.value}</div>
            </div>
          </a>
        ))}
      </div>
      <div data-scroll-item style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, border: "2px solid #c83020", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Serif JP', serif", fontSize: 10, fontWeight: 900, color: "#c83020", transform: "rotate(-5deg)" }}>忍</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#8b5e3c", letterSpacing: "0.1em" }}>Signed by ramenagii · 2025</div>
      </div>
    </>
  );
}

/* ─── Form side of the scroll ─── */
function ScrollFormSide() {
  return (
    <>
      <div data-scroll-item style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 900, color: "#2a1810", marginBottom: 4 }}>伝書の術</div>
      <div data-scroll-item style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px, 1vw, 10px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5e3c", marginBottom: 18 }}>Message Jutsu — Send Me a Scroll</div>
      <form data-scroll-item onSubmit={(e) => { e.preventDefault(); alert("Scroll sent! 📜"); }} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input type="text" placeholder="Your Name" required style={scrollInput} />
          <input type="email" placeholder="Your Email" required style={scrollInput} />
        </div>
        <input type="text" placeholder="Subject" style={scrollInput} />
        <textarea placeholder="Write your message here..." rows={3} required style={{ ...scrollInput, resize: "vertical", minHeight: 60 }} />
        <button type="submit" style={{ alignSelf: "flex-start", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "8px 18px", background: "#3d5c4a", color: "#f5ecd4", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>✦ Send Scroll</button>
      </form>
      <div data-scroll-item style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, border: "2px solid #c83020", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Serif JP', serif", fontSize: 10, fontWeight: 900, color: "#c83020", transform: "rotate(-5deg)" }}>忍</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#8b5e3c", letterSpacing: "0.1em" }}>Awaiting your response...</div>
      </div>
    </>
  );
}

const scrollInput: React.CSSProperties = {
  flex: "1 1 120px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
  padding: "8px 11px", background: "rgba(245,230,200,0.5)",
  border: "1px solid rgba(107,76,59,0.18)", borderRadius: 4, color: "#2a1810", outline: "none",
};

/* ─── MAIN EXPORT ─── */
export default function SectionOverlays() {
  const { currentStop, introComplete } = useCameraContext();
  const prevStop = useRef(currentStop);

  // Play poof sound on section change
  useEffect(() => {
    if (!introComplete) return;
    if (currentStop !== prevStop.current) {
      playPoof();
      prevStop.current = currentStop;
    }
  }, [currentStop, introComplete]);

  if (!introComplete) return null;

  return (
    <>
      <AboutSection visible={currentStop === "about"} />
      <ProjectsSection visible={currentStop === "projects"} />
      <ContactScroll visible={currentStop === "contact"} />
    </>
  );
}
