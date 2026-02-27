"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface PromptTool {
  step: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const promptTools: PromptTool[] = [
  {
    step: 1,
    title: "Magic Wand",
    description:
      "Automatically transform rough prompts into expert-level queries that get you better AI responses.",
    image: "/images/ai-magic-wand.png",
    alt: "Magic Wand — prompt transformation tool",
  },
  {
    step: 2,
    title: "Compare LLM Models",
    description:
      "Run the same prompt across different AI models and compare results side-by-side to find the best answer.",
    image: "/images/ai-compare-llm.png",
    alt: "Compare LLM Models — side-by-side AI comparison",
  },
  {
    step: 3,
    title: "Generate Consensus",
    description:
      "Get responses from multiple AI models at once, then see a combined summary with the best insights from each.",
    image: "/images/ai-consensus.png",
    alt: "Generate Consensus — multi-model summary tool",
  },
];

/* ── Check Icon ────────────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="#47AB19" />
      <path
        d="M6.5 10L9 12.5L13.5 8"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Arrow Icon ────────────────────────────────────────────────────────── */

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Prompt Tool Card ──────────────────────────────────────────────────── */

function PromptToolCard({ tool }: { tool: PromptTool }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: tool.step * 0.1, ease: "easeOut" }}
      className="w-full max-w-[380px] transition-all duration-300 rounded-2xl border border-transparent hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] bg-card p-6"
    >
      {/* Image area */}
      <div className="relative w-full h-[240px] overflow-hidden flex items-center justify-center">
        <Image
          src={tool.image}
          alt={tool.alt}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-contain"
        />
      </div>

      {/* Content — centered */}
      <div className="pt-4 flex flex-col gap-2 text-center">
        <h3
          className="text-lg font-bold text-foreground"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {tool.step}. {tool.title}
        </h3>
        <p className="text-sm font-normal text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Shine Keyframes ───────────────────────────────────────────────────── */

const shineKeyframes = `
  @keyframes cta-button-shine {
    0%   { transform: translateX(-150%) skewX(-20deg); }
    30%  { transform: translateX(150%) skewX(-20deg); }
    100% { transform: translateX(150%) skewX(-20deg); }
  }
`;

/* ── Main Section ──────────────────────────────────────────────────────── */

export default function AiToolsSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-[hsl(var(--bg-primary-50))]">
      <style dangerouslySetInnerHTML={{ __html: shineKeyframes }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* ── Eyebrow ── */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-accent uppercase tracking-[0.84px] mb-4"
        >
          Built-In AI Prompt Tools
        </motion.span>

        {/* ── Headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-[32px] md:text-[40px] font-extrabold text-foreground mb-5"
          style={{
            fontFamily: "var(--font-family-display)",
            lineHeight: 1.15,
            letterSpacing: "-0.4px",
          }}
        >
          Get Better Results from
          <br />
          AI Tools
        </motion.h2>

        {/* ── Subhead ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-normal text-muted-foreground max-w-[790px] mb-10 leading-relaxed"
          style={{ letterSpacing: "-0.27px" }}
        >
          Built-in tools to optimize your prompts, compare multiple AI models,
          and generate the best possible outputs — all in one place.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Link
            href="https://app.proux.design/Auth"
            className="group relative overflow-hidden flex items-center justify-center gap-2 w-[260px] h-16 bg-primary text-primary-foreground font-bold text-base uppercase tracking-[0.84px] rounded-[calc(var(--radius)+8px)] shadow-[0_4px_14px_rgba(181,83,49,0.25)] hover:shadow-[0_8px_24px_rgba(181,83,49,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Shine sweep */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              style={{ animation: "cta-button-shine 3s infinite linear" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <ArrowRight />
            </span>
          </Link>
        </motion.div>

        {/* ── Reassurance badges ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6"
        >
          {["Free forever plan", "No credit card required", "Cancel anytime"].map(
            (text) => (
              <div key={text} className="flex items-center gap-1.5">
                <CheckIcon />
                <span className="text-[13px] font-medium text-muted-foreground">
                  {text}
                </span>
              </div>
            )
          )}
        </motion.div>

        {/* ── Prompt Tool Cards ── */}
        <div className="mt-16 w-full flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 md:gap-8">
          {promptTools.map((tool) => (
            <PromptToolCard key={tool.step} tool={tool} />
          ))}
        </div>

        {/* ── Bottom summary ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-sm font-normal text-muted-foreground"
        >
          All prompt tools are included with every Pro plan. $384/year ($32/month).
        </motion.p>
      </div>
    </section>
  );
}
