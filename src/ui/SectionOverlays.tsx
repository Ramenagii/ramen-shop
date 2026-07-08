import { useCameraContext } from "../scene/CameraContext";

const sectionStyles: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  transition: "opacity 0.6s ease",
  fontFamily: "'JetBrains Mono', monospace",
};

const panelStyles: React.CSSProperties = {
  background: "rgba(10, 6, 4, 0.88)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(200, 50, 30, 0.15)",
  borderRadius: 12,
  padding: "40px 48px",
  pointerEvents: "auto",
  maxWidth: 520,
};

/* ─── ABOUT SECTION ─── */
function AboutSection() {
  return (
    <div style={{ ...sectionStyles, justifyContent: "flex-start", padding: "0 80px" }}>
      <div style={panelStyles}>
        {/* Section label */}
        <div style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 16,
        }}>
          About
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 36,
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 8px 0",
          lineHeight: 1.1,
          textShadow: "0 0 30px rgba(200, 50, 30, 0.2)",
        }}>
          Justin Lorenzo
        </h2>

        {/* Role */}
        <div style={{
          fontSize: 13,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(250, 180, 120, 0.7)",
          marginBottom: 24,
        }}>
          Developer · Designer · Creator
        </div>

        {/* Bio */}
        <p style={{
          fontSize: 13,
          lineHeight: 1.8,
          color: "rgba(255, 240, 220, 0.6)",
          margin: 0,
        }}>
          A passionate developer crafting immersive web experiences. 
          PUP student by day, code ninja by night. Building at the 
          intersection of design and technology — where every pixel 
          tells a story.
        </p>

        {/* Divider */}
        <div style={{
          width: 40,
          height: 2,
          background: "linear-gradient(90deg, #c83020, transparent)",
          margin: "24px 0",
        }} />

        {/* Skills tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["React", "Three.js", "TypeScript", "GSAP", "Node.js", "Figma"].map(skill => (
            <span key={skill} style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(250, 200, 150, 0.5)",
              border: "1px solid rgba(200, 80, 40, 0.2)",
              borderRadius: 4,
              padding: "4px 10px",
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
    desc: "3D interactive portfolio with scroll-driven camera",
    tech: "R3F · GSAP · Three.js",
    accent: "#c83020",
  },
  {
    title: "Project Two",
    desc: "Coming soon — another creative build",
    tech: "React · TypeScript",
    accent: "#ff6040",
  },
  {
    title: "Project Three",
    desc: "Coming soon — more experiments",
    tech: "Next.js · Tailwind",
    accent: "#e84830",
  },
];

function ProjectsSection() {
  return (
    <div style={{ ...sectionStyles, justifyContent: "center", padding: "0 60px" }}>
      <div style={{ maxWidth: 800, width: "100%" }}>
        {/* Section label */}
        <div style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 12,
          pointerEvents: "auto",
        }}>
          Projects
        </div>

        <h2 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 32,
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 32px 0",
          textShadow: "0 0 30px rgba(200, 50, 30, 0.2)",
          pointerEvents: "auto",
        }}>
          作品集
        </h2>

        {/* Project cards — horizontal row */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", pointerEvents: "auto" }}>
          {projects.map((p, i) => (
            <div key={i} style={{
              flex: "1 1 220px",
              background: "rgba(10, 6, 4, 0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(200, 50, 30, 0.12)",
              borderRadius: 10,
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s, transform 0.3s",
            }}>
              {/* Top accent bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${p.accent}, transparent)`,
              }} />

              {/* Number */}
              <div style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "'Noto Serif JP', serif",
                color: "rgba(200, 50, 30, 0.1)",
                position: "absolute",
                top: 12,
                right: 16,
                lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 8px 0",
                fontFamily: "'Noto Serif JP', serif",
              }}>
                {p.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 11,
                lineHeight: 1.6,
                color: "rgba(255, 240, 220, 0.5)",
                margin: "0 0 16px 0",
              }}>
                {p.desc}
              </p>

              {/* Tech */}
              <div style={{
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(250, 180, 120, 0.4)",
              }}>
                {p.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT SECTION ─── */
function ContactSection() {
  return (
    <div style={{ ...sectionStyles, justifyContent: "flex-end", padding: "0 80px" }}>
      <div style={{ ...panelStyles, textAlign: "center" as const, maxWidth: 440 }}>
        {/* Section label */}
        <div style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 16,
        }}>
          Contact
        </div>

        <h2 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 32,
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 8px 0",
          textShadow: "0 0 30px rgba(200, 50, 30, 0.2)",
        }}>
          連絡先
        </h2>

        <p style={{
          fontSize: 12,
          lineHeight: 1.7,
          color: "rgba(255, 240, 220, 0.5)",
          margin: "0 0 28px 0",
        }}>
          Got a project in mind? Let's build something together.
        </p>

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          {[
            { label: "GitHub", href: "https://github.com/ramenagii" },
            { label: "Email", href: "mailto:justinlorenzo@email.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250, 180, 120, 0.7)",
                textDecoration: "none",
                padding: "10px 28px",
                border: "1px solid rgba(200, 80, 40, 0.25)",
                borderRadius: 6,
                width: "100%",
                maxWidth: 240,
                transition: "border-color 0.3s, color 0.3s, background 0.3s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: 40,
          height: 2,
          background: "linear-gradient(90deg, transparent, #c83020, transparent)",
          margin: "28px auto 0",
        }} />

        <div style={{
          marginTop: 16,
          fontSize: 9,
          letterSpacing: "0.15em",
          color: "rgba(250, 230, 163, 0.25)",
          textTransform: "lowercase",
        }}>
          ramenagii · 2025
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function SectionOverlays() {
  const { currentStop, introComplete } = useCameraContext();

  if (!introComplete) return null;

  return (
    <>
      <div style={{ ...sectionStyles, opacity: currentStop === "about" ? 1 : 0, pointerEvents: currentStop === "about" ? "auto" : "none" }}>
        <AboutSection />
      </div>
      <div style={{ ...sectionStyles, opacity: currentStop === "projects" ? 1 : 0, pointerEvents: currentStop === "projects" ? "auto" : "none" }}>
        <ProjectsSection />
      </div>
      <div style={{ ...sectionStyles, opacity: currentStop === "contact" ? 1 : 0, pointerEvents: currentStop === "contact" ? "auto" : "none" }}>
        <ContactSection />
      </div>
    </>
  );
}
