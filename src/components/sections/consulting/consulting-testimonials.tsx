"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Star Row ──────────────────────────────────────────────────────────── */

function FiveStars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]"
        />
      ))}
    </div>
  );
}

/* ── Types ──────────────────────────────────────────────────────────────── */

interface TextTestimonial {
  quote: string;
  badge: string;
  author: string;
  role: string;
  avatarBg: string;
}

interface VideoTestimonial {
  name: string;
  company: string;
  role: string;
  country: string;
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const textTestimonials: TextTestimonial[] = [
  {
    quote:
      'Consistently came up with out of the <strong>box design solutions</strong> and took ownership of them end to end. Designs implemented have had <strong>positive impact on user experience and bottom line growth.</strong>',
    badge: "+67% conversions",
    author: "Arthur Andreasyan",
    role: "Founder, Puffy",
    avatarBg: "bg-[#99825d]",
  },
  {
    quote:
      "I've worked with Surinder for nearly a decade, and he's become both a trusted friend and the <strong>most talented UI/UX engineer</strong> on my team. He consistently delivers on time often ahead of schedule and his <strong>professionalism is unmatched</strong>. Surinder led the design for our Medellín launch, producing exceptional user experiences that took the product to market in record time.",
    badge: "Launched in 3 months",
    author: "Carlos Arias",
    role: "Founder, Medellin",
    avatarBg: "bg-[hsl(var(--text-primary-600))]",
  },
  {
    quote:
      "While Surinder is a very talented designer, what I appreciate most about him professionally is his <strong>tenacity and dependability.</strong> If he says he will do something, there's no question that it will get done.",
    badge: "+30% conversions",
    author: "Avin Kline",
    role: "CEO, Lucyd",
    avatarBg: "bg-[#B55331]",
  },
];

const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Avin Kline",
    company: "E SCALE",
    role: "Founder.",
    country: "USA",
  },
  {
    name: "José Navarro",
    company: "Barefoot Media",
    role: "Founder.",
    country: "Australia",
  },
  {
    name: "Sheila Raper",
    company: "AJElite Homes",
    role: "MD.",
    country: "USA",
  },
  {
    name: "Uli Schönleber",
    company: "Ooliv",
    role: "Founder.",
    country: "Germany",
  },
];

/* ── Floating Heart ────────────────────────────────────────────────────── */

function FloatingHeart({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  return (
    <motion.span
      className="absolute bottom-0 text-red-400 pointer-events-none select-none"
      style={{ left: `${x}%`, fontSize: size }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -30, -60, -90],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeOut",
      }}
      aria-hidden="true"
    >
      &#10084;
    </motion.span>
  );
}

/* ── Text Testimonial Card ─────────────────────────────────────────────── */

function TextTestimonialCard({ testimonial }: { testimonial: TextTestimonial }) {
  return (
    <div className="flex flex-col gap-5 bg-card rounded-[32px] p-8">
      {/* Stars */}
      <FiveStars />

      {/* Quote */}
      <p
        className="text-[15px] leading-relaxed text-foreground"
        dangerouslySetInnerHTML={{ __html: `\u201C${testimonial.quote}\u201D` }}
      />

      {/* Result badge */}
      <div className="flex items-center gap-2 w-fit bg-[#e6ebdc] rounded-[30px] border border-[#47ab19] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#47ab19] flex-shrink-0" />
        <span className="text-sm font-semibold text-[#47ab19]">
          {testimonial.badge}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex-shrink-0",
            testimonial.avatarBg
          )}
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.author}
          </p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Video Testimonial Card ────────────────────────────────────────────── */

function VideoTestimonialCard({
  testimonial,
}: {
  testimonial: VideoTestimonial;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 snap-start rounded-[24px] overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "267/422" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-[#2a2a2a]" />

      {/* Play icon overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
          <Play className="h-6 w-6 fill-foreground text-foreground ml-0.5" />
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[5]" />

      {/* Card info */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <p className="text-base font-bold text-white leading-tight">
          {testimonial.name}
        </p>
        <p className="text-sm text-white/80 mt-0.5">
          {testimonial.company}, {testimonial.role}
        </p>
        <p className="text-xs text-white/60 mt-1">{testimonial.country}</p>
      </div>
    </div>
  );
}

/* ── Scroll Indicators (dots) ──────────────────────────────────────────── */

function ScrollDots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 md:hidden mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 w-2 rounded-full transition-colors duration-200",
            i === activeIndex
              ? "bg-foreground"
              : "bg-[hsl(var(--border-primary-200))]"
          )}
        />
      ))}
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */

export default function ConsultingTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / videoTestimonials.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveVideoIndex(Math.min(index, videoTestimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="bg-[hsl(var(--bg-primary-50))] pt-[80px] pb-0">
      <div className="container-default">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Stacked avatars */}
          <div className="flex items-center -space-x-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-[#99825d] border-2 border-[hsl(var(--bg-primary-50))] z-[3]" />
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--text-primary-600))] border-2 border-[hsl(var(--bg-primary-50))] z-[2]" />
            <div className="h-10 w-10 rounded-full bg-[#B55331] border-2 border-[hsl(var(--bg-primary-50))] z-[1]" />
          </div>

          {/* Star rating badge */}
          <div className="flex items-center gap-2 mb-5">
            <Star className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]" />
            <span className="text-sm font-medium text-muted-foreground">
              Rated 5 stars by 300+ clients
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground leading-[1.15] tracking-tight mb-4">
            Trusted by Founders Worldwide
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            See how AI-First UX translated into measurable gains for SaaS &amp;
            eCommerce teams.
          </p>
        </div>

        {/* ── Text Testimonials Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {textTestimonials.map((t) => (
            <TextTestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>

        {/* ── Video Testimonials ─────────────────────────────────────── */}
        <div className="pb-12 md:pb-16">
          {/* Video heading with floating hearts */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-foreground text-center leading-snug">
              Unscripted Clips From the People Who Signed the Checks
            </h3>
            <div className="relative h-8 w-8 flex-shrink-0">
              <FloatingHeart delay={0} x={20} size={16} />
              <FloatingHeart delay={1} x={50} size={14} />
              <FloatingHeart delay={2} x={70} size={12} />
            </div>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-5">
            {videoTestimonials.map((v) => (
              <VideoTestimonialCard key={v.name} testimonial={v} />
            ))}
          </div>

          {/* Mobile: horizontal scroll with snap */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {videoTestimonials.map((v) => (
                <div key={v.name} className="w-[75vw] flex-shrink-0">
                  <VideoTestimonialCard testimonial={v} />
                </div>
              ))}
            </div>
            <ScrollDots
              count={videoTestimonials.length}
              activeIndex={activeVideoIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
