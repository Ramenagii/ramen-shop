import { useRef, useEffect, useState } from "react";
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

/* ─── HERO SECTION — curtain rises on the same stage as the intro ─── */
function HeroSection({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      if (hintRef.current) {
        gsap.fromTo(hintRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 });
      }
    } else {
      gsap.to(ref.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
      if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [visible]);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight * 1.1, behavior: "smooth" });
  };

  return (
    <>
      <style>{`@keyframes heroBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>

      {/* Title lockup — left side, mirrors the intro card that just faded out */}
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "42vw",
          minWidth: 360,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 60px",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {/* Welcome label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(200, 80, 40, 0.8)",
          marginBottom: 12,
        }}>
          いらっしゃいませ
        </div>

        {/* Main title — same lockup as the intro, now over the live scene */}
        <div style={{
          fontSize: "clamp(48px, 7vw, 80px)",
          fontWeight: 900,
          fontFamily: "'Noto Serif JP', serif",
          color: "#fff",
          lineHeight: 1.0,
          textShadow: "0 0 60px rgba(200, 50, 30, 0.4)",
        }}>
          ラーメン
        </div>
        <div style={{
          fontSize: "clamp(20px, 2.6vw, 32px)",
          fontWeight: 700,
          fontFamily: "'Noto Serif JP', serif",
          color: "rgba(255, 255, 255, 0.85)",
          marginTop: 4,
          letterSpacing: "0.08em",
        }}>
          RAMEN SHOP
        </div>

        {/* Name + title */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: "rgba(250, 200, 150, 0.5)",
          marginTop: 24,
          letterSpacing: "0.08em",
          lineHeight: 1.6,
        }}>
          Justin Lorenzo · Full-Stack Developer · Manila
        </div>
      </div>

      {/* Scroll hint — floats bottom-center over the scene */}
      <button
        ref={hintRef}
        onClick={scrollToNext}
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          pointerEvents: visible ? "auto" : "none",
          opacity: 0,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#c83020",
          boxShadow: "0 0 12px rgba(200, 50, 30, 0.8)",
          animation: "heroBlink 1.5s ease-in-out infinite",
        }} />
        <div style={{
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(250, 200, 150, 0.5)",
        }}>
          scroll to enter the village ↓
        </div>
      </button>
    </>
  );
}

/* ─── ABOUT SECTION ─── */
const aboutSkills = [
  // Frontend
  { name: "React", icon: "react" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Vite", icon: "vite" },
  { name: "Framer Motion", icon: "framer" },
  { name: "GSAP", icon: "gsap" },
  { name: "Three.js", icon: "threejs" },
  { name: "D3.js", icon: "d3" },
  // Backend
  { name: "Python", icon: "python" },
  { name: "Node.js", icon: "nodejs" },
  { name: "PHP", icon: "php" },
  { name: "Laravel", icon: "laravel" },
  // Database
  { name: "SQLite", icon: "sqlite" },
  { name: "MySQL", icon: "mysql" },
  { name: "Supabase", icon: "supabase" },
  // Tools
  { name: "Next.js", icon: "nextjs" },
  { name: "Docker", icon: "docker" },
];

function AboutSection({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ years: 0, projects: 0 });

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      gsap.fromTo(ref.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
      const obj = { years: 0, projects: 0 };
      gsap.to(obj, {
        years: 3, projects: 14,
        duration: 1.2, ease: "power3.out", delay: 0.4,
        onUpdate: () => setCounters({ years: Math.round(obj.years), projects: Math.round(obj.projects) }),
      });
    } else {
      gsap.to(ref.current, { opacity: 0, x: -40, duration: 0.4, ease: "power2.in" });
      setCounters({ years: 0, projects: 0 });
    }
  }, [visible]);

  // Smooth scroll with lerp
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const state = { target: 0, current: 0, raf: 0 as unknown as ReturnType<typeof requestAnimationFrame> };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.target = Math.max(0, Math.min(el.scrollHeight - el.clientHeight, state.target + e.deltaY));
      if (!state.raf) {
        const tick = () => {
          state.current += (state.target - state.current) * 0.12;
          if (Math.abs(state.current - state.target) < 0.5) state.current = state.target;
          el.scrollTop = Math.round(state.current);
          state.raf = state.current !== state.target ? requestAnimationFrame(tick) : 0;
        };
        state.raf = requestAnimationFrame(tick);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (state.raf) cancelAnimationFrame(state.raf);
    };
  }, []);

  const journey = [
    { year: "2026", title: "B.S. Computer Engineering", sub: "Polytechnic University of the Philippines", accent: true },
    { year: "2025", title: "CliqueHa Information Services OPC", sub: "Platform work · GoHighLevel · AutoCAD support", accent: false },
    { year: "2025", title: "Pharmacy POS System", sub: "EljonPharmacy — React + Supabase", accent: false },
    { year: "2024", title: "DSA Case Studies App", sub: "React + Framer Motion + D3.js + Three.js", accent: false },
    { year: "2023", title: "Started Coding", sub: "Self-taught · React · JavaScript", accent: false },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "45vw",
        minWidth: 440,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        padding: "0 60px",
        pointerEvents: visible ? "auto" : "none",
        opacity: 0,
      }}
    >
      <div style={{
        background: "rgba(12, 8, 6, 0.94)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(160, 120, 80, 0.12)",
        borderRadius: 16,
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}>
        <style>{`@keyframes techMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.about-scroll::-webkit-scrollbar{display:none}`}</style>

        {/* Watermark */}
        <div style={{
          position: "absolute", top: -10, right: -10,
          fontSize: 160, fontFamily: "'Noto Serif JP', serif", fontWeight: 900,
          color: "rgba(180, 120, 80, 0.04)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>
          忍
        </div>

        {/* Accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, #c9a468, #a67c52, transparent)",
        }} />

        {/* Scrollable content */}
        <div ref={scrollRef} className="about-scroll" style={{
          overflowY: "auto", maxHeight: 520,
          scrollbarWidth: "none", msOverflowStyle: "none",
          padding: "40px 44px",
        }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
            color: "#c9a468", marginBottom: 14,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            ── About
          </div>
          <h2 style={{
            fontFamily: "'Noto Serif JP', serif", fontSize: 26, fontWeight: 900,
            color: "#f5f0eb", margin: "0 0 2px 0", lineHeight: 1.1,
          }}>
            Justin Lorenzo
          </h2>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(210, 180, 140, 0.75)", marginBottom: 16,
          }}>
            Computer Engineering Student · San Jose del Monte, PH
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            lineHeight: 1.9, color: "rgba(245, 240, 230, 0.8)",
            margin: "0 0 16px 0",
          }}>
            CpE student at PUP who builds useful, readable interfaces and
            student tools. Worked with React, Python, Tailwind, and Socket.IO
            across full-stack projects, data visualizations, and real-time
            apps. Experience includes CliqueHa Information Services OPC.
          </p>
          <div style={{ display: "flex", gap: 28, marginBottom: 20 }}>
            {[
              { v: counters.years, l: "Years", s: "+" },
              { v: counters.projects, l: "Projects", s: "+" },
              { v: "∞", l: "Ramen", s: "" },
            ].map(s => (
              <div key={s.l}>
                <div style={{
                  fontFamily: "'Noto Serif JP', serif", fontSize: 22,
                  fontWeight: 900, color: "#d4a050",
                }}>
                  {s.v}{s.s}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "rgba(210, 180, 140, 0.6)", marginTop: 2,
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(160, 120, 80, 0.15), transparent)",
            marginBottom: 18,
          }} />

          <div style={{
            fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
            color: "#c9a468", marginBottom: 14,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            ── Journey
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {journey.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{
                  width: 2, flexShrink: 0, borderRadius: 2,
                  background: item.accent
                    ? "linear-gradient(180deg, #c9a468, rgba(201, 164, 104, 0.15))"
                    : "rgba(200, 160, 120, 0.1)",
                }} />
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "rgba(210, 180, 140, 0.65)", marginBottom: 2,
                  }}>
                    {item.year}
                  </div>
                  <div style={{
                    fontFamily: "'Noto Serif JP', serif", fontSize: 13,
                    fontWeight: 700, color: "#f5f0eb", marginBottom: 1,
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    color: "rgba(245, 240, 230, 0.65)",
                  }}>
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(160, 120, 80, 0.15), transparent)",
        }} />

        {/* Auto-scrolling Tech Stack */}
        <div style={{ padding: "16px 44px 22px" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
            letterSpacing: "0.5em", textTransform: "uppercase",
            color: "rgba(210, 180, 140, 0.55)", marginBottom: 12,
          }}>
            ── Tech Stack
          </div>
          <div style={{
            overflow: "hidden",
            maskImage: "linear-gradient(90deg, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%)",
          }}>
            <div className="tech-marquee-track" style={{
              display: "flex", gap: 28, width: "fit-content",
              animation: "techMarquee 30s linear infinite",
            }}>
              {[...aboutSkills, ...aboutSkills].map((s, i) => (
                <img
                  key={i}
                  src={`https://skillicons.dev/icons?i=${s.icon}&theme=dark`}
                  alt={s.name}
                  width={24}
                  height={24}
                  style={{ display: "block", flexShrink: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS SECTION — Storm 4-style mission cards, ramen-shop themed ─── */
interface ProjectCard {
  kanji: string;
  title: string;
  jpTitle: string;
  rank: "S" | "A" | "B" | "C";
  desc: string;
  stats: { label: string; jp: string; value: number }[];
  tech: string[];
  url: string;
  screenshot?: string;
  status: "Live" | "WIP" | "Planned";
}

const projects: ProjectCard[] = [
  {
    kanji: "麺",
    title: "Ramen Shop",
    jpTitle: "ラーメン屋",
    rank: "S",
    desc: "3D interactive portfolio with scroll-driven camera rig, cinematic intro, and immersive ramen-shop scene built on R3F.",
    stats: [
      { label: "Frontend", jp: "前", value: 95 },
      { label: "3D / R3F", jp: "立", value: 90 },
      { label: "Motion", jp: "動", value: 92 },
      { label: "DevOps", jp: "運", value: 40 },
    ],
    tech: ["R3F", "Three.js", "GSAP", "TypeScript"],
    url: "https://github.com/Ramenagii/ramen-shop",
    screenshot: "/images/portfolio-projects/portfolio.png",
    status: "Live",
  },
  {
    kanji: "工",
    title: "AI Website Factory",
    jpTitle: "製造工場",
    rank: "S",
    desc: "Automated AI website production pipeline — analyzes sites and generates project manifests end-to-end.",
    stats: [
      { label: "Frontend", jp: "前", value: 82 },
      { label: "Backend", jp: "裏", value: 88 },
      { label: "AI", jp: "知", value: 90 },
      { label: "DevOps", jp: "運", value: 75 },
    ],
    tech: ["Next.js", "Supabase", "AI", "Vercel"],
    url: "https://github.com/Ramenagii/ai-website-factory",
    screenshot: "/images/portfolio-projects/ai-website-factory.png",
    status: "Live",
  },
  {
    kanji: "任",
    title: "TaskFlow",
    jpTitle: "任務管理",
    rank: "A",
    desc: "Kanban project manager on Laravel 12 + Livewire 3, containerized with Docker Compose, Spatie roles, and GitHub Actions CI.",
    stats: [
      { label: "Frontend", jp: "前", value: 80 },
      { label: "Backend", jp: "裏", value: 92 },
      { label: "3D / R3F", jp: "立", value: 8 },
      { label: "DevOps", jp: "運", value: 95 },
    ],
    tech: ["Laravel", "Livewire", "Docker", "MySQL"],
    url: "https://github.com/Ramenagii/laravel-docker",
    screenshot: "/images/portfolio-projects/laravel-docker.png",
    status: "Live",
  },
  {
    kanji: "学",
    title: "Reviewer Study Hub",
    jpTitle: "学習拠点",
    rank: "A",
    desc: "Local-first study hub with notes, flashcards, quizzes, progress tracking, and Cloudflare Worker AI support.",
    stats: [
      { label: "Frontend", jp: "前", value: 88 },
      { label: "Backend", jp: "裏", value: 70 },
      { label: "AI", jp: "知", value: 72 },
      { label: "DevOps", jp: "運", value: 60 },
    ],
    tech: ["React", "TypeScript", "Cloudflare", "AI"],
    url: "https://github.com/Ramenagii/reviewer-study-hub",
    screenshot: "/images/portfolio-projects/reviewer-study-hub.png",
    status: "Live",
  },
  {
    kanji: "薬",
    title: "EljonPharmacy",
    jpTitle: "薬局店舗",
    rank: "A",
    desc: "React pharmacy storefront with Supabase-backed sales recording, reporting, and point-of-sale flow.",
    stats: [
      { label: "Frontend", jp: "前", value: 85 },
      { label: "Backend", jp: "裏", value: 78 },
      { label: "3D / R3F", jp: "立", value: 5 },
      { label: "DevOps", jp: "運", value: 55 },
    ],
    tech: ["React", "Supabase", "Tailwind", "Vite"],
    url: "https://github.com/Ramenagii/EljonPharmacy",
    screenshot: "/images/portfolio-projects/eljon-pharmacy.png",
    status: "Live",
  },
  {
    kanji: "列",
    title: "BenchFlow Queue",
    jpTitle: "修理行列",
    rank: "B",
    desc: "Queue, triage, and repair workflow software for small service businesses and community fix days.",
    stats: [
      { label: "Frontend", jp: "前", value: 78 },
      { label: "Backend", jp: "裏", value: 75 },
      { label: "3D / R3F", jp: "立", value: 5 },
      { label: "DevOps", jp: "運", value: 50 },
    ],
    tech: ["React", "JavaScript"],
    url: "https://github.com/Ramenagii/benchflow-queue",
    screenshot: "/images/portfolio-projects/benchflow-queue.png",
    status: "Live",
  },
  {
    kanji: "力",
    title: "MoR Power Dashboard",
    jpTitle: "電力管理",
    rank: "B",
    desc: "Minimalist thesis defense dashboard for a context-aware power management extension.",
    stats: [
      { label: "Frontend", jp: "前", value: 80 },
      { label: "Backend", jp: "裏", value: 65 },
      { label: "IoT", jp: "器", value: 82 },
      { label: "DevOps", jp: "運", value: 45 },
    ],
    tech: ["React", "TypeScript", "Vite", "IoT"],
    url: "https://github.com/Ramenagii/mor-power-management-dashboard",
    screenshot: "/images/portfolio-projects/mor-power-dashboard.png",
    status: "Live",
  },
  {
    kanji: "家",
    title: "Chore Allowance Ledger",
    jpTitle: "家計台帳",
    rank: "B",
    desc: "Local-first chore chart, allowance ledger, reward store, and fairness dashboard for families.",
    stats: [
      { label: "Frontend", jp: "前", value: 84 },
      { label: "Backend", jp: "裏", value: 68 },
      { label: "3D / R3F", jp: "立", value: 5 },
      { label: "DevOps", jp: "運", value: 50 },
    ],
    tech: ["React", "TypeScript", "Local-first", "Vite"],
    url: "https://github.com/Ramenagii/chore-allowance-ledger",
    screenshot: "/images/portfolio-projects/chore-allowance-ledger.png",
    status: "Live",
  },
  {
    kanji: "遠",
    title: "Mobile Codex Controller",
    jpTitle: "遠隔操作",
    rank: "C",
    desc: "Phone-friendly local controller for sending prompts and actions to Codex through a secure Node.js bridge.",
    stats: [
      { label: "Frontend", jp: "前", value: 70 },
      { label: "Backend", jp: "裏", value: 78 },
      { label: "Mobile", jp: "携", value: 85 },
      { label: "DevOps", jp: "運", value: 60 },
    ],
    tech: ["Node.js", "Mobile", "Bridge", "PowerShell"],
    url: "https://github.com/Ramenagii/mobile-codex-controller",
    status: "WIP",
  },
  {
    kanji: "算",
    title: "DSA-7Cases Study",
    jpTitle: "算法研究",
    rank: "C",
    desc: "React/Vite case-study app for data structures and algorithms coursework — seven structured cases.",
    stats: [
      { label: "Frontend", jp: "前", value: 76 },
      { label: "Algo", jp: "算", value: 88 },
      { label: "3D / R3F", jp: "立", value: 5 },
      { label: "DevOps", jp: "運", value: 35 },
    ],
    tech: ["React", "Vite", "Tailwind", "DSA"],
    url: "https://github.com/Ramenagii/DSA-7Cases-Study",
    screenshot: "/images/portfolio-projects/dsa-7cases-study.png",
    status: "Live",
  },
];

const rankColors: Record<string, { glow: string; seal: string; text: string }> = {
  S: { glow: "rgba(200, 50, 30, 0.5)", seal: "#c83020", text: "#ff6040" },
  A: { glow: "rgba(201, 164, 72, 0.45)", seal: "#c9a448", text: "#e9c46a" },
  B: { glow: "rgba(74, 143, 191, 0.4)", seal: "#4a8fbf", text: "#6bb0e0" },
  C: { glow: "rgba(150, 150, 150, 0.3)", seal: "#8a8a8a", text: "#b0b0b0" },
};

function StatBar({ stat, delay }: { stat: { label: string; jp: string; value: number }; delay: number }) {
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!fillRef.current) return;
    gsap.fromTo(fillRef.current, { width: "0%" }, { width: `${stat.value}%`, duration: 1, ease: "power3.out", delay });
  }, [delay, stat.value]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
      {/* Kanji label */}
      <div style={{
        fontFamily: "'Noto Serif JP', serif",
        fontSize: 11,
        fontWeight: 700,
        color: "rgba(250, 200, 150, 0.5)",
        width: 14,
        textAlign: "center",
        flexShrink: 0,
      }}>
        {stat.jp}
      </div>
      {/* Bar track */}
      <div style={{
        flex: 1,
        height: 6,
        background: "rgba(255, 255, 255, 0.06)",
        borderRadius: 999,
        overflow: "hidden",
        position: "relative",
      }}>
        <div ref={fillRef} style={{
          height: "100%",
          background: "linear-gradient(90deg, #c83020, #ff6040)",
          borderRadius: 999,
          boxShadow: "0 0 8px rgba(200, 50, 30, 0.6)",
          width: "0%",
        }} />
      </div>
      {/* Value */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: "rgba(250, 200, 150, 0.45)",
        width: 26,
        textAlign: "right",
        flexShrink: 0,
      }}>
        {stat.value}
      </div>
    </div>
  );
}

function MissionCard({ p, index }: { p: ProjectCard; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rc = rankColors[p.rank];

  return (
    <a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "relative",
        flex: "0 0 240px",
        width: 240,
        minHeight: 420,
        textDecoration: "none",
        background: "rgba(10, 6, 4, 0.94)",
        backdropFilter: "blur(14px)",
        border: `1px solid ${rc.glow}`,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
        boxShadow: `0 8px 30px rgba(0,0,0,0.5), inset 0 0 20px ${rc.glow.replace("0.5", "0.08").replace("0.45", "0.08").replace("0.4", "0.06")}`,
        transition: "transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 44px rgba(0,0,0,0.6), 0 0 30px ${rc.glow}, inset 0 0 20px ${rc.glow}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.5), inset 0 0 20px ${rc.glow.replace("0.5", "0.08").replace("0.45", "0.08").replace("0.4", "0.06")}`; }}
    >
      {/* ── PORTRAIT AREA — screenshot or kanji watermark + rank seal ── */}
      <div style={{
        position: "relative",
        height: 170,
        background: p.screenshot
          ? `radial-gradient(ellipse at 50% 40%, ${rc.glow.replace("0.5", "0.18").replace("0.45", "0.15").replace("0.4", "0.12")} 0%, rgba(10,6,4,0.6) 70%)`
          : `radial-gradient(ellipse at 50% 40%, ${rc.glow.replace("0.5", "0.18").replace("0.45", "0.15").replace("0.4", "0.12")} 0%, rgba(10,6,4,0.6) 70%)`,
        borderBottom: `1px solid ${rc.glow.replace("0.5", "0.2").replace("0.45", "0.2").replace("0.4", "0.15")}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Screenshot */}
        {p.screenshot && (
          <img
            src={p.screenshot}
            alt={p.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
            }}
          />
        )}

        {/* Giant kanji "character portrait" — watermark over screenshot */}
        <div style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 110,
          fontWeight: 900,
          color: rc.text,
          opacity: p.screenshot ? 0.35 : 0.12,
          lineHeight: 1,
          textShadow: `0 0 40px ${rc.glow}`,
          userSelect: "none",
          pointerEvents: "none",
        }}>
          {p.kanji}
        </div>

        {/* Rank seal — wax stamp, top-right corner */}
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: `radial-gradient(circle at 38% 35%, ${rc.seal}, ${rc.seal}cc 60%, ${rc.seal}88)`,
          border: `2px solid ${rc.seal}`,
          boxShadow: `0 0 14px ${rc.glow}, inset 0 -2px 4px rgba(0,0,0,0.4)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 18,
          fontWeight: 900,
          color: "#fff",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}>
          {p.rank}
        </div>

        {/* Mission number — top-left */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "rgba(250, 200, 150, 0.4)",
        }}>
          №{String(index + 1).padStart(2, "0")}
        </div>

        {/* Status dot — bottom-left of portrait */}
        <div style={{
          position: "absolute",
          bottom: 10,
          left: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: p.status === "Live" ? "#4ade80" : p.status === "WIP" ? "#f1bb18" : "#8a8a8a",
            boxShadow: p.status === "Live" ? "0 0 8px #4ade80" : "none",
          }} />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(250, 200, 150, 0.5)",
          }}>
            {p.status}
          </div>
        </div>
      </div>

      {/* ── INFO PANEL ── */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* JP title */}
        <div style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 11,
          fontWeight: 700,
          color: rc.text,
          opacity: 0.7,
          letterSpacing: "0.1em",
          marginBottom: 2,
        }}>
          {p.jpTitle}
        </div>
        {/* EN title */}
        <h3 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 19,
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 10px 0",
          lineHeight: 1.1,
        }}>
          {p.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          lineHeight: 1.7,
          color: "rgba(255, 240, 220, 0.45)",
          margin: "0 0 14px 0",
          flex: 1,
        }}>
          {p.desc}
        </p>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${rc.glow.replace("0.5", "0.3").replace("0.45", "0.3").replace("0.4", "0.25")}, transparent)`,
          marginBottom: 12,
        }} />

        {/* Stat bars */}
        <div style={{ marginBottom: 12 }}>
          {p.stats.map((s, i) => <StatBar key={s.label} stat={s} delay={0.3 + index * 0.1 + i * 0.1} />)}
        </div>

        {/* Tech — "chakra nature" pills */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              letterSpacing: "0.1em",
              color: rc.text,
              opacity: 0.7,
              background: `${rc.seal}15`,
              border: `1px solid ${rc.seal}40`,
              borderRadius: 3,
              padding: "3px 7px",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom hover hint */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "6px 0",
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: rc.text,
        opacity: 0,
        background: `${rc.seal}20`,
        transition: "opacity 0.3s",
      }}
      ref={(el) => {
        if (ref.current && el) {
          ref.current.addEventListener("mouseenter", () => { el.style.opacity = "1"; });
          ref.current.addEventListener("mouseleave", () => { el.style.opacity = "0"; });
        }
      }}
      >
        ↗ view mission
      </div>
    </a>
  );
}

function ProjectsSection({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Drag-to-scroll state */
  const drag = useRef<{ active: boolean; startX: number; startLeft: number; moved: boolean }>({ active: false, startX: 0, startLeft: 0, moved: false });
  const lastState = useRef({ atStart: true, atEnd: false });

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      if (scrollerRef.current) {
        const cards = scrollerRef.current.children;
        gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.2 });
      }
    } else {
      gsap.to(ref.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [visible]);

  /* ── Single scroll listener: updates progress bar + arrows, zero React re-renders ── */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const s = el.scrollLeft;
      const pct = max > 0 ? s / max : 0;
      if (progressFillRef.current) progressFillRef.current.style.width = `${pct * 100}%`;
      if (counterRef.current) counterRef.current.textContent = `${Math.min(Math.round(pct * (projects.length - 1)) + 1, projects.length)} / ${projects.length}`;
      const isStart = s <= 2;
      const isEnd = s >= max - 2;
      const ls = lastState.current;
      if (ls.atStart !== isStart) { setAtStart(isStart); ls.atStart = isStart; }
      if (ls.atEnd !== isEnd) { setAtEnd(isEnd); ls.atEnd = isEnd; }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Non-passive wheel: INSTANT 1:1 scroll, hands off to page at the edges ── */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const s = el.scrollLeft;
      const canRight = s < max - 2;
      const canLeft = s > 2;
      /* Only hijack the wheel while there's room in the dragged direction */
      if (e.deltaY > 0 && canRight) {
        el.scrollLeft = Math.min(max, s + e.deltaY);
        e.preventDefault();
      } else if (e.deltaY < 0 && canLeft) {
        el.scrollLeft = Math.max(0, s + e.deltaY);
        e.preventDefault();
      }
      /* Otherwise let the wheel bubble → page scrolls to next stop */
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  /* Arrows — native smooth scroll, one card width */
  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 264, behavior: "smooth" });
  };

  /* ── Drag-to-scroll: direct 1:1, no easing ── */
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (el) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

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
        padding: "40px 0 50px",
        pointerEvents: visible ? "auto" : "none",
        opacity: 0,
        perspective: 1200,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "#c83020",
          marginBottom: 8,
        }}>
          ── 任務 ──
        </div>
        <h2 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: "clamp(32px, 4vw, 44px)",
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
          {projects.length} missions · drag or use arrows to browse
        </div>
      </div>

      {/* Scroller row with parchment-roller arrows */}
      <div style={{ position: "relative", width: "100%", maxWidth: 1100, display: "flex", alignItems: "center" }}>
        <ScrollArrow dir="left" disabled={atStart} onClick={() => scrollByCards(-1)} />

        {/* Horizontal scroller */}
        <div
          ref={scrollerRef}
          className="mission-scroller"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            display: "flex",
            gap: 18,
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollSnapType: "x proximity",
            padding: "8px 24px 14px",
            cursor: "grab",
            width: "100%",
            maskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)",
          }}
        >
          {projects.map((p, i) => <MissionCard key={p.title} p={p} index={i} />)}
        </div>

        <ScrollArrow dir="right" disabled={atEnd} onClick={() => scrollByCards(1)} />
      </div>

      {/* Progress track — parchment-gold fill, DOM-driven (no re-renders) */}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 220,
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          overflow: "hidden",
          position: "relative",
        }}>
          <div ref={progressFillRef} style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, #8b5e3c, #c9a468)",
            borderRadius: 999,
            boxShadow: "0 0 6px rgba(201,164,104,0.4)",
          }} />
        </div>
        <div ref={counterRef} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(201, 164, 104, 0.5)",
        }}>
          1 / {projects.length}
        </div>
      </div>
    </div>
  );
}

/* ── Parchment-roller arrow — matches ContactScroll's Roller aesthetic ── */
function ScrollArrow({ dir, disabled, onClick }: { dir: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous missions" : "Next missions"}
      style={{
        flexShrink: 0,
        position: "relative",
        width: 34,
        height: 72,
        border: "none",
        padding: 0,
        margin: "0 8px",
        cursor: disabled ? "default" : "pointer",
        background: "linear-gradient(90deg, #331f10 0%, #5c3a22 30%, #8a5a34 50%, #5c3a22 70%, #331f10 100%)",
        borderRadius: 8,
        opacity: disabled ? 0.3 : 1,
        boxShadow: disabled ? "none" : "0 6px 18px rgba(0,0,0,0.6), inset -2px 0 5px rgba(0,0,0,0.4), inset 2px 0 5px rgba(255,220,170,0.12)",
        transition: "opacity 0.25s, box-shadow 0.25s, transform 0.18s",
      }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.7), inset -2px 0 5px rgba(0,0,0,0.4), inset 2px 0 5px rgba(255,220,170,0.2), 0 0 16px rgba(201,164,104,0.25)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = disabled ? "none" : "0 6px 18px rgba(0,0,0,0.6), inset -2px 0 5px rgba(0,0,0,0.4), inset 2px 0 5px rgba(255,220,170,0.12)"; }}
    >
      {/* Gold cap — top */}
      <div style={{
        position: "absolute", top: -5, left: -2, right: -2, height: 10,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 35%, #b8863b, #331f10 70%)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
      }} />
      {/* Gold cap — bottom */}
      <div style={{
        position: "absolute", bottom: -5, left: -2, right: -2, height: 10,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 35%, #b8863b, #331f10 70%)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
      }} />
      {/* Gold chevron glyph */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 16, fontWeight: 700,
        color: disabled ? "rgba(201,164,104,0.3)" : "#c9a468",
        textShadow: disabled ? "none" : "0 0 8px rgba(201,164,104,0.5)",
        userSelect: "none",
      }}>
        {dir === "left" ? "◂" : "▸"}
      </div>
    </button>
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
      <HeroSection visible={currentStop === "hero"} />
      <AboutSection visible={currentStop === "about"} />
      <ProjectsSection visible={currentStop === "projects"} />
      <ContactScroll visible={currentStop === "contact"} />
    </>
  );
}
