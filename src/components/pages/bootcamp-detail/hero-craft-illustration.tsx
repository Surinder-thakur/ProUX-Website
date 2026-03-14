"use client";

/**
 * V4 — "Craft": Code-rendered AI Design System workflow illustration.
 * Prompt → JSON Tokens → Primitives/Semantics → Component Preview
 * All built with HTML/CSS — resolution-independent, crisp at any size.
 */
export default function HeroCraftIllustration() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Gradient orbs — atmosphere ── */}
      <div className="absolute top-[10%] left-[40%] w-[500px] h-[400px] rounded-full opacity-[0.12] blur-[120px] bg-[#1770E6]" />
      <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[350px] rounded-full opacity-[0.10] blur-[100px] bg-[#C2612C]" />
      <div className="absolute top-[40%] right-[25%] w-[350px] h-[300px] rounded-full opacity-[0.08] blur-[110px] bg-[#6338CC]" />

      {/* ── SVG connector lines ── */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Prompt → JSON */}
        <line x1="32%" y1="28%" x2="42%" y2="18%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 4" />
        {/* JSON → Primitives */}
        <line x1="52%" y1="48%" x2="38%" y2="60%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 4" />
        {/* JSON → Semantics */}
        <line x1="58%" y1="48%" x2="68%" y2="60%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 4" />
        {/* Semantics → Preview */}
        <line x1="76%" y1="62%" x2="82%" y2="30%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 4" />
        {/* Prompt → sparkle */}
        <line x1="30%" y1="32%" x2="36%" y2="35%" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5 4" />
      </svg>

      {/* ════════════════════════════════════
          LEFT ZONE — AI Prompt Input
         ════════════════════════════════════ */}
      <div className="absolute top-[22%] left-[6%] md:left-[8%] max-w-[320px] hidden md:block">
        {/* Prompt bar */}
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl px-4 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#1770E6] text-[14px]">+</span>
            <span className="text-white/50 text-[12px] font-mono">Generate a design token system...</span>
            <span className="ml-auto text-[#1770E6] text-[14px]">+</span>
          </div>
        </div>
        {/* Claude badge */}
        <div className="mt-3 flex items-center gap-2 ml-2">
          <span className="text-[#F5C87A] text-[10px]">✦</span>
          <span className="text-white/30 text-[10px] font-medium tracking-wide">Claude Opus 4</span>
        </div>
      </div>

      {/* Sparkle connector */}
      <div className="absolute top-[33%] left-[34%] hidden lg:flex items-center gap-1">
        <span className="text-[#F5C87A] text-[16px] animate-pulse">✦</span>
        <span className="text-white/20 text-[9px] uppercase tracking-[0.15em] font-medium">AI Agent</span>
      </div>

      {/* ════════════════════════════════════
          CENTER ZONE — JSON Code Block
         ════════════════════════════════════ */}
      <div className="absolute top-[12%] left-[38%] md:left-[40%] max-w-[300px] hidden md:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-4 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white/30 text-[10px]">&lt;/&gt;</span>
              <span className="text-white/60 text-[11px] font-semibold tracking-wide">JSON</span>
            </div>
            <span className="text-white/20 text-[12px]">⧉</span>
          </div>
          {/* Code */}
          <pre className="text-[11px] leading-[1.7] font-mono">
            <span className="text-white/40">{"{"}</span>{"\n"}
            {"  "}<span className="text-[#7EB8F7]">&quot;color&quot;</span><span className="text-white/40">: {"{"}</span>{"\n"}
            {"    "}<span className="text-[#7EB8F7]">&quot;primary&quot;</span><span className="text-white/40">: {"{"}</span>{"\n"}
            {"      "}<span className="text-[#D4A0F5]">&quot;$type&quot;</span><span className="text-white/40">: </span><span className="text-[#98D89C]">&quot;color&quot;</span><span className="text-white/40">,</span>{"\n"}
            {"      "}<span className="text-[#F5C87A]">&quot;$value&quot;</span><span className="text-white/40">: </span><span className="text-[#98D89C]">&quot;#1770E6&quot;</span>{"\n"}
            {"    "}<span className="text-white/40">{"}"}</span>{"\n"}
            {"  "}<span className="text-white/40">{"}"}</span>{"\n"}
            <span className="text-white/40">{"}"}</span>
          </pre>
        </div>
      </div>

      {/* ── Token Layer Cards ── */}
      {/* LAYER 1 label */}
      <span className="absolute top-[52%] left-[28%] text-white/15 text-[9px] uppercase tracking-[0.2em] font-medium hidden lg:block">
        Layer 1
      </span>
      {/* Primitives card */}
      <div className="absolute top-[55%] left-[24%] md:left-[26%] max-w-[200px] hidden md:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-3.5 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.15em] font-semibold mb-2.5">Primitives</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { color: "#1770E6", label: "color-blue-500" },
              { color: "#6D6D6D", label: "color-gray-900" },
              { color: "#D97706", label: "color-amber-300" },
              { color: "#22C55E", label: "color-green-400" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-1 bg-white/[0.04] rounded-full px-2 py-0.5">
                <span className="w-[6px] h-[6px] rounded-full" style={{ background: t.color }} />
                <span className="text-white/45 text-[8px] font-mono">{t.label}</span>
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="text-white/20 text-[8px] font-mono bg-white/[0.03] rounded px-1.5 py-0.5">radius-sm · 4px</span>
            <span className="text-white/20 text-[8px] font-mono bg-white/[0.03] rounded px-1.5 py-0.5">space-md · 16px</span>
          </div>
        </div>
      </div>

      {/* RESOLVES TO tag */}
      <div className="absolute top-[66%] left-[48%] hidden lg:block">
        <span className="bg-[#1770E6]/20 text-[#7EB8F7] text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded">
          Resolves to
        </span>
      </div>

      {/* Figma icon */}
      <div className="absolute top-[72%] left-[46%] hidden lg:flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
          </svg>
        </div>
        <span className="text-white/20 text-[9px] font-semibold uppercase tracking-[0.15em]">Figma Variables</span>
      </div>

      {/* LAYER 2 label */}
      <span className="absolute top-[52%] right-[24%] text-white/15 text-[9px] uppercase tracking-[0.2em] font-medium hidden lg:block">
        Layer 2
      </span>
      {/* Semantics card */}
      <div className="absolute top-[55%] right-[14%] md:right-[16%] max-w-[210px] hidden md:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl p-3.5 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.15em] font-semibold mb-2.5">Semantics</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { color: "#1770E6", label: "color-bg brand" },
              { color: "#D97706", label: "color-text-primary" },
              { color: "#6D6D6D", label: "color-border-subtle" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-1 bg-white/[0.04] rounded-full px-2 py-0.5">
                <span className="w-[6px] h-[6px] rounded-full" style={{ background: t.color }} />
                <span className="text-white/45 text-[8px] font-mono">{t.label}</span>
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="text-white/20 text-[8px] font-mono bg-white/[0.03] rounded px-1.5 py-0.5">radius-button</span>
            <span className="text-white/20 text-[8px] font-mono bg-white/[0.03] rounded px-1.5 py-0.5">space-card-padding</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT ZONE — Component Preview
         ════════════════════════════════════ */}
      <div className="absolute top-[14%] right-[4%] md:right-[6%] w-[220px] hidden lg:block">
        <div className="bg-[#161922] border border-white/[0.07] rounded-xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
          {/* Browser dots */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#28C840]" />
            <span className="ml-auto text-white/20 text-[9px] font-medium">Component Preview</span>
          </div>
          {/* Mini UI */}
          <div className="p-4">
            <p className="text-white/25 text-[9px] uppercase tracking-[0.12em] font-medium">Caption</p>
            <p className="text-white/80 text-[16px] font-bold mt-0.5">Headline</p>
            <p className="text-white/40 text-[11px] mt-0.5">Subhead</p>
            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              <span className="bg-[#1770E6] text-white text-[9px] font-semibold px-3 py-1.5 rounded-md">Get Started</span>
              <span className="border border-white/15 text-white/50 text-[9px] font-semibold px-3 py-1.5 rounded-md">Learn More</span>
            </div>
            {/* Color swatches */}
            <div className="flex gap-1.5 mt-3">
              {["#1770E6", "#1a1a1a", "#D97706", "#22C55E", "#6338CC", "#D4A0F5"].map((c) => (
                <span key={c} className="w-5 h-5 rounded" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
        {/* Floating label */}
        <span className="inline-block mt-2 ml-auto text-white/15 text-[8px] font-mono bg-white/[0.03] rounded px-2 py-0.5 float-right">
          corner-radius-full
        </span>
      </div>

      {/* ── Floating label chips — scattered ── */}
      <span className="absolute top-[8%] left-[34%] text-white/15 text-[8px] font-mono hidden lg:block">font-style-italic</span>
      <span className="absolute bottom-[28%] right-[38%] text-white/12 text-[8px] font-mono hidden lg:block">color-primary</span>
      <span className="absolute top-[46%] right-[8%] text-white/10 text-[8px] font-mono hidden lg:block">#1770E6</span>

      {/* ── Figma Variables bottom bar ── */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/[0.04] rounded-full px-3 py-1 border border-[#1770E6]/20">
          <span className="w-[8px] h-[8px] rounded-full bg-[#1770E6]" />
          <span className="text-white/50 text-[9px] font-medium">color-bg</span>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] rounded-full px-3 py-1 border border-[#1770E6]/20">
          <span className="w-[8px] h-[8px] rounded-full bg-[#4A9AF5]" />
          <span className="text-white/50 text-[9px] font-medium">color-text</span>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] rounded-full px-3 py-1 border border-[#1770E6]/20">
          <span className="w-[8px] h-[8px] rounded-full bg-[#6338CC]" />
          <span className="text-white/50 text-[9px] font-medium">border</span>
        </div>
      </div>
    </div>
  );
}
