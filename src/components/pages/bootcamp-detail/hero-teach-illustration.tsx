"use client";

import Image from "next/image";

/**
 * V5 — "Teach": Instructor-focused variant.
 * Left side reserved for instructor photo with warm glow.
 * Right side shows the technical workflow (JSON → Tokens → Figma).
 */
export default function HeroTeachIllustration() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Gradient orbs — atmosphere ── */}
      {/* Warm glow behind instructor zone */}
      <div className="absolute top-[20%] left-[15%] w-[400px] h-[450px] rounded-full opacity-[0.10] blur-[120px] bg-[#C2612C]" />
      {/* Blue glow behind code area */}
      <div className="absolute top-[15%] right-[20%] w-[450px] h-[350px] rounded-full opacity-[0.12] blur-[110px] bg-[#1770E6]" />
      {/* Purple accent */}
      <div className="absolute bottom-[30%] right-[30%] w-[300px] h-[250px] rounded-full opacity-[0.06] blur-[100px] bg-[#6338CC]" />

      {/* ── SVG connector lines ── */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Prompt → sparkle */}
        <line x1="42%" y1="20%" x2="48%" y2="25%" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="5 4" />
        {/* Sparkle → JSON */}
        <line x1="52%" y1="25%" x2="58%" y2="15%" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="5 4" />
        {/* JSON → Primitives */}
        <line x1="65%" y1="42%" x2="56%" y2="55%" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="5 4" />
        {/* JSON → Semantics */}
        <line x1="72%" y1="42%" x2="80%" y2="55%" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="5 4" />
        {/* Figma connector */}
        <line x1="68%" y1="68%" x2="68%" y2="75%" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5 4" />
      </svg>

      {/* ════════════════════════════════════
          LEFT ZONE — Instructor area
         ════════════════════════════════════ */}

      {/* Instructor photo */}
      <div className="absolute top-[10%] left-[5%] md:left-[8%] w-[280px] md:w-[320px] hidden md:block">
        <div className="relative">
          {/* Warm backlight ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#C2612C]/20 via-transparent to-[#1770E6]/10 blur-[30px]" />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
            <Image
              src="/images/surinder-profile.jpg"
              alt="Instructor"
              width={640}
              height={640}
              className="w-full h-auto opacity-60 grayscale-[30%]"
            />
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1018] via-transparent to-transparent" />
            {/* Left fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1018]/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Claude badge — above instructor */}
      <div className="absolute top-[7%] left-[10%] hidden lg:flex items-center gap-1.5">
        <span className="text-[#F5C87A] text-[10px]">✦</span>
        <span className="text-white/25 text-[9px] font-medium tracking-wide">Claude Opus 4</span>
      </div>

      {/* Prompt bar — floating above-right of instructor */}
      <div className="absolute top-[14%] left-[30%] md:left-[32%] max-w-[280px] hidden lg:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl px-4 py-2.5 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2">
            <span className="text-[#1770E6] text-[12px]">+</span>
            <span className="text-white/45 text-[11px] font-mono">Generate a design token system...</span>
          </div>
        </div>
      </div>

      {/* Sparkle — AI Agent */}
      <div className="absolute top-[23%] left-[48%] hidden lg:flex items-center gap-1.5">
        <span className="text-[#F5C87A] text-[14px] animate-pulse">✦</span>
        <span className="text-white/20 text-[8px] uppercase tracking-[0.15em] font-medium">AI Agent</span>
      </div>

      {/* ════════════════════════════════════
          RIGHT ZONE — Technical workflow
         ════════════════════════════════════ */}

      {/* JSON Code Block */}
      <div className="absolute top-[10%] right-[6%] md:right-[8%] w-[250px] hidden md:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-3.5 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-white/25 text-[9px]">&lt;/&gt;</span>
              <span className="text-white/50 text-[10px] font-semibold">tokens.json</span>
            </div>
            <span className="text-white/15 text-[10px]">⧉</span>
          </div>
          <pre className="text-[10px] leading-[1.65] font-mono">
            <span className="text-white/35">{"{"}</span>{"\n"}
            {"  "}<span className="text-[#7EB8F7]">&quot;color&quot;</span><span className="text-white/35">: {"{"}</span>{"\n"}
            {"    "}<span className="text-[#7EB8F7]">&quot;primary&quot;</span><span className="text-white/35">: {"{"}</span>{"\n"}
            {"      "}<span className="text-[#D4A0F5]">&quot;$type&quot;</span><span className="text-white/35">: </span><span className="text-[#98D89C]">&quot;color&quot;</span><span className="text-white/35">,</span>{"\n"}
            {"      "}<span className="text-[#F5C87A]">&quot;$value&quot;</span><span className="text-white/35">: </span><span className="text-[#98D89C]">&quot;#1770E6&quot;</span>{"\n"}
            {"    "}<span className="text-white/35">{"}"}</span>{"\n"}
            {"  "}<span className="text-white/35">{"}"}</span>{"\n"}
            <span className="text-white/35">{"}"}</span>
          </pre>
        </div>
      </div>

      {/* Primitives card */}
      <div className="absolute top-[52%] right-[38%] md:right-[40%] max-w-[180px] hidden lg:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-3 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <p className="text-white/30 text-[8px] uppercase tracking-[0.15em] font-semibold mb-2">Primitives</p>
          <div className="flex flex-wrap gap-1">
            {[
              { color: "#1770E6", label: "color-blue-500" },
              { color: "#6D6D6D", label: "color-gray-900" },
              { color: "#D97706", label: "color-amber-300" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-1 bg-white/[0.04] rounded-full px-1.5 py-0.5">
                <span className="w-[5px] h-[5px] rounded-full" style={{ background: t.color }} />
                <span className="text-white/40 text-[7px] font-mono">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Semantics card */}
      <div className="absolute top-[52%] right-[8%] md:right-[10%] max-w-[180px] hidden lg:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-3 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <p className="text-white/30 text-[8px] uppercase tracking-[0.15em] font-semibold mb-2">Semantics</p>
          <div className="flex flex-wrap gap-1">
            {[
              { color: "#1770E6", label: "color-bg brand" },
              { color: "#D97706", label: "color-text-primary" },
              { color: "#6D6D6D", label: "color-border-subtle" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-1 bg-white/[0.04] rounded-full px-1.5 py-0.5">
                <span className="w-[5px] h-[5px] rounded-full" style={{ background: t.color }} />
                <span className="text-white/40 text-[7px] font-mono">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Figma icon + label */}
      <div className="absolute top-[72%] right-[28%] hidden lg:flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-white/[0.05] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
          </svg>
        </div>
        <span className="text-white/18 text-[8px] font-semibold uppercase tracking-[0.15em]">Figma Variables</span>
      </div>

      {/* ── Floating labels ── */}
      <span className="absolute bottom-[25%] right-[12%] text-white/12 text-[8px] font-mono hidden lg:block">corner-radius-full</span>
      <span className="absolute top-[45%] right-[25%] text-white/10 text-[8px] font-mono hidden lg:block">color-primary</span>
      <span className="absolute bottom-[30%] right-[45%] text-white/08 text-[8px] font-mono hidden lg:block">#1770E6</span>
    </div>
  );
}
