"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface Feature {
  title: React.ReactNode;
  description: string;
  checks: string[];
  image: string;
  imageAlt: string;
  mobileImage: string;
  testimonial: Testimonial;
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const features: Feature[] = [
  {
    title: (
      <>
        AI-Powered <br className="lg:hidden" /> Design Scanner
      </>
    ),
    description:
      "Get instant UX scores with prioritized issues and actionable fixes mapped to 350+ expert guidelines.",
    checks: [
      "Audit any URL or design file in minutes",
      "Get scored feedback across UX, UI, content, and CRO",
      "Get continuous contextual feedback on iterations",
    ],
    image: "/images/scanner-desktop.png",
    imageAlt: "AI-Powered Design Scanner Interface",
    mobileImage: "/images/scanner-mobile.png",
    testimonial: {
      quote:
        "The Design Scanner found 8 conversion blockers we didn't see. Fixed them before launch and our signup rate jumped 34%. Worth every penny.",
      name: "Lisa Martinez",
      role: "Founder, ShopLocal",
      image: "/images/testimonial-lisa.jpg",
    },
  },
  {
    title: (
      <>
        AI-First <br className="lg:hidden" /> UX Specialists
      </>
    ),
    description:
      "Access AI specialists trained by certified UX professionals to support every stage of your design process.",
    checks: [
      "Work faster with AI agents specialized for each design stage",
      "Expanding library with new specialists added continuously",
    ],
    image: "/images/specialists-desktop.png",
    imageAlt: "AI specialists assisting with design tasks",
    mobileImage: "/images/specialists-mobile.png",
    testimonial: {
      quote:
        "I used to wait 3 days for design feedback. Now I get expert input from multiple specialists in minutes. Shipping features 5x faster now.",
      name: "Jordan Lee",
      role: "Junior Designer, SaaS Startup",
      image: "/images/testimonial-jordan.jpg",
    },
  },
  {
    title: (
      <>
        UX Principles &amp; <br className="lg:hidden" /> Psychology
      </>
    ),
    description:
      "Learn from 350+ proven principles with real product examples showing exactly when and how to apply them.",
    checks: [
      "Filter by goal: conversion, retention, engagement, and more",
      "See annotated product examples with expert implementation notes",
    ],
    image: "/images/principles-desktop.png",
    imageAlt: "UX principles and psychology concepts",
    mobileImage: "/images/principles-mobile.png",
    testimonial: {
      quote:
        "I learned more in 2 weeks with ProUX than in 6 months of YouTube tutorials. Seeing real examples next to principles makes everything click.",
      name: "Nina Rodriguez",
      role: "Junior Designer, Retail Platform",
      image: "/images/testimonial-nina.jpg",
    },
  },
  {
    title: (
      <>
        Curated Guidelines <br className="lg:hidden" /> Library
      </>
    ),
    description:
      "Access step-by-step implementation checklists and page-specific guidelines for every design type and industry.",
    checks: [
      "Guidelines tailored to each page type and user journey",
      "Continuously updated library with new guidelines and patterns",
    ],
    image: "/images/guidelines-desktop.png",
    imageAlt: "Library of design guidelines and checklists",
    mobileImage: "/images/guidelines-mobile.png",
    testimonial: {
      quote:
        "The page-specific guidelines cut my design time in half. I don't second-guess anymore, just follow the checklist and ship with confidence.",
      name: "Priya Sharma",
      role: "Product Designer, FinTech",
      image: "/images/testimonial-priya.jpg",
    },
  },
  {
    title: (
      <>
        Real Product <br className="lg:hidden" /> Analysis Library
      </>
    ),
    description:
      "Learn from scored examples of real product pages showing what works, what doesn't, and how to fix common UX issues.",
    checks: [
      "See real products scored against ProUX principles and guidelines",
      "Understand why designs succeed or fail with expert annotations",
    ],
    image: "/images/analysis-desktop.png",
    imageAlt: "Analysis of real product pages and UX scoring",
    mobileImage: "/images/analysis-mobile.png",
    testimonial: {
      quote:
        "The scored breakdowns are brutal and honest. Finally, someone showing what actually works vs what just looks pretty. My conversion rates prove it.",
      name: "Tom Bradley",
      role: "Founder, EventSpace",
      image: "/images/testimonial-tom.jpg",
    },
  },
  {
    title: (
      <>
        Real-World <br className="lg:hidden" /> UX Insight Database
      </>
    ),
    description:
      "Explore real product designs with expert analysis of UX decisions, business impact, and key takeaways for designers.",
    checks: [
      "See why companies made specific UX decisions and the reasoning behind them",
      "Learn how design choices impact both business goals and user experience",
    ],
    image: "/images/insights-desktop.png",
    imageAlt: "Database of real-world UX insights and business impacts",
    mobileImage: "/images/insights-mobile.png",
    testimonial: {
      quote:
        "I pitched a navigation change using the Walmart case study from ProUX. Got exec buy-in in 10 minutes. Real company examples make selling ideas so much easier.",
      name: "Kevin Park",
      role: "Head of Design, Growth Startup",
      image: "/images/testimonial-kevin.jpg",
    },
  },
];

/* ── Feature Card ───────────────────────────────────────────────────────── */

function FeatureCard({
  feature,
  index,
  className,
}: {
  feature: Feature;
  index: number;
  className?: string;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-[hsl(var(--bg-primary-100))] rounded-[24px] overflow-hidden ${className || ""}`}
    >
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center p-5 md:p-8 lg:p-[40px] gap-5 lg:gap-16 h-full`}
      >
        {/* Text column */}
        <div className="flex flex-col items-start text-left w-full lg:w-[38%] space-y-6 lg:space-y-8 flex-grow">
          <div className="space-y-2 lg:space-y-4">
            <h3 className="text-[20px] md:text-2xl lg:text-[28px] font-bold text-foreground leading-[1.1] tracking-tight">
              {feature.title}
            </h3>
            <p className="text-base md:text-lg font-medium text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 lg:space-y-4 w-full">
            {feature.checks.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#47AB19] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span className="text-sm md:text-base font-medium text-secondary">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="w-full mt-2 p-6 bg-background rounded-[24px] border border-[hsl(var(--border-primary-200))]">
            <p className="text-[15px] font-medium text-foreground leading-relaxed mb-6">
              &ldquo;{feature.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={feature.testimonial.image}
                alt={feature.testimonial.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover object-top shrink-0"
              />
              <div>
                <p className="text-[15px] font-bold text-foreground">
                  {feature.testimonial.name}
                </p>
                <p className="text-[13px] font-medium text-muted-foreground">
                  {feature.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile image */}
        <div className="w-[calc(100%+40px)] -mx-5 -mb-5 md:w-[calc(100%+64px)] md:-mx-8 md:-mb-8 lg:hidden block">
          <Image
            src={feature.mobileImage}
            alt={`${feature.imageAlt} Mobile`}
            width={680}
            height={480}
            className="w-full h-auto block"
          />
        </div>

        {/* Desktop image */}
        <div className="w-full lg:w-[62%] h-[300px] md:h-[400px] lg:h-[540px] relative hidden lg:flex items-center justify-center shrink-0">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            className="object-cover object-left-top rounded-xl"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────────────────────── */

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;
    const children = container.children;
    let closestIndex = 0;
    let minDistance = Number.MAX_VALUE;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  };

  return (
    <section
      id="features"
      className="w-full max-w-[1100px] mx-auto px-4 lg:px-0 py-16 scroll-mt-[56px] md:scroll-mt-[24px]"
    >
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight"
        >
          Everything You Need <br /> for Smarter UX Decisions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl leading-relaxed"
        >
          AI specialists, Design Scanner, 350+ expert principles, and real
          product insights — all in one platform.
        </motion.p>
      </div>

      {/* Cards: horizontal scroll on mobile, vertical stack on desktop */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 lg:gap-8 px-4 lg:px-0 pb-8 lg:pb-0 -mx-4 lg:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            index={index}
            className="w-[85vw] max-w-[340px] lg:w-full lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink"
          />
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="flex justify-center gap-2 lg:hidden mt-2">
        {features.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-foreground" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
