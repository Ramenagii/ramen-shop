import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useCameraContext } from "../scene/CameraContext";
import ContactScroll from "./ContactScroll";

/* ─── CLONE SOUND ON TAB SWITCH ─── */
const cloneSfx = typeof window !== "undefined" ? new Audio("/audio/clone%20sound.mp3") : null;
if (cloneSfx) {
  cloneSfx.volume = 0.4;
  cloneSfx.preload = "auto";
}

function playClone() {
  if (!cloneSfx) return;
  cloneSfx.currentTime = 0;
  cloneSfx.play().catch(() => {});
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

/* ─── MAIN EXPORT ─── */
export default function SectionOverlays() {
  const { currentStop, introComplete } = useCameraContext();
  const prevStop = useRef(currentStop);

  // Play poof sound on section change
  useEffect(() => {
    if (!introComplete) return;
    if (currentStop !== prevStop.current) {
      playClone();
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
