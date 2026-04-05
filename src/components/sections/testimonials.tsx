"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Star, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ── Five Stars (lucide) ─────────────────────────────────────────────────── */

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

/* ── Text Testimonial Data (consulting-style cards) ──────────────────────── */

interface TextTestimonial {
  quote: string;
  badge: string;
  author: string;
  role: string;
  avatar: string;
}

const textTestimonials: TextTestimonial[] = [
  {
    quote:
      'Consistently came up with out of the <strong>box design solutions</strong> and took ownership of them end to end. Designs implemented have had <strong>positive impact on user experience and bottom line growth.</strong>',
    badge: "+67% conversions",
    author: "Arthur Andreasyan",
    role: "Founder, Puffy",
    avatar: "/images/consulting/testimonials/arthur-andreasyan.png",
  },
  {
    quote:
      "I've worked with Surinder for nearly a decade, and he's become both a trusted friend and the <strong>most talented UI/UX engineer</strong> on my team. He consistently delivers on time often ahead of schedule and his <strong>professionalism is unmatched</strong>. Surinder led the design for our Medellín launch, producing exceptional user experiences that took the product to market in record time.",
    badge: "Launched in 3 months",
    author: "Carlos Arias",
    role: "Founder, Medellin",
    avatar: "/images/consulting/testimonials/carlos-arias.png",
  },
  {
    quote:
      "While Surinder is a very talented designer, what I appreciate most about him professionally is his <strong>tenacity and dependability.</strong> If he says he will do something, there's no question that it will get done.",
    badge: "+30% conversions",
    author: "Avin Kline",
    role: "CEO, Lucyd",
    avatar: "/images/consulting/testimonials/avin-kline.png",
  },
];

/* ── Video Testimonial Data (from bootcamp graduates) ──────────────────── */

interface VideoTestimonial {
  name: string;
  role: string;
  company: string;
  src: string;
  zoom?: boolean;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Phulvinder Singh",
    role: "Design Lead",
    company: "Ikokas Technologies",
    src: "/videos/testimonials/phulvinder-singh.mp4",
  },
  {
    name: "Ritul Chatterjee",
    role: "Sr. UI/UX Designer",
    company: "Grazitti Interactive",
    src: "/videos/testimonials/ritul-chatterjee.mp4",
  },
  {
    name: "Ashish Khurana",
    role: "Sr. UI/UX Designer",
    company: "India",
    src: "/videos/testimonials/ashish-khurana.mp4",
    zoom: true,
  },
  {
    name: "Priyanka Gill",
    role: "Sr. UI/UX Designer",
    company: "India",
    src: "/videos/testimonials/priyanka-gill.mp4",
  },
];

/* ── Text Testimonial Card (consulting-style) ────────────────────────────── */

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
        <Image
          src={testimonial.avatar}
          alt={testimonial.author}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full flex-shrink-0 object-cover"
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
  isActive,
  onActivate,
}: {
  testimonial: VideoTestimonial;
  isActive: boolean;
  onActivate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMuted = !isActive;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isActive;
    }
  }, [isActive]);

  const handleClick = () => {
    onActivate();
    if (!isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className="relative flex-shrink-0 snap-start rounded-[24px] overflow-hidden cursor-pointer group bg-neutral-900"
      style={{ aspectRatio: "267/422" }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={testimonial.src}
        autoPlay
        muted
        loop
        playsInline
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          testimonial.zoom && "scale-[1.4]"
        )}
      />

      {/* Volume icon */}
      <div
        className={cn(
          "absolute top-4 right-4 z-20 transition-opacity duration-300",
          isMuted ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-white" />
          ) : (
            <Volume2 className="h-4 w-4 text-white" />
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[5] pointer-events-none" />

      {/* Card info */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pointer-events-none">
        <p className="text-base font-bold text-white leading-tight">
          {testimonial.name}
        </p>
        <p className="text-sm text-white/80 mt-0.5">
          {testimonial.role} @ {testimonial.company}
        </p>
      </div>
    </div>
  );
}

/* ── Floating Hearts ───────────────────────────────────────────────────── */

const heartPath = "M27.6491 1.57407C23.4031 -1.03039 19.6973 0.0191798 17.4711 1.69102C16.5583 2.37652 16.1019 2.71926 15.8333 2.71926C15.5648 2.71926 15.1084 2.37652 14.1956 1.69102C11.9694 0.0191798 8.26355 -1.03039 4.01761 1.57407C-1.55472 4.99215 -2.81561 16.2685 10.0376 25.782C12.4857 27.594 13.7098 28.5 15.8333 28.5C17.9569 28.5 19.1809 27.594 21.6291 25.782C34.4823 16.2685 33.2214 4.99215 27.6491 1.57407Z";

function FloatingHearts() {
  return (
    <div className="relative size-16 mb-2" aria-hidden="true">
      <motion.svg
        className="absolute top-0 left-0 size-10 text-destructive opacity-20 rotate-[-20deg]"
        viewBox="0 0 32 29"
        fill="currentColor"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={heartPath} />
      </motion.svg>
      <motion.svg
        className="absolute bottom-0 right-0 size-10 text-destructive"
        viewBox="0 0 32 29"
        fill="currentColor"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <path d={heartPath} />
      </motion.svg>
    </div>
  );
}

/* ── Scroll Dots (mobile) ──────────────────────────────────────────────── */

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

/* ── Header Avatars ────────────────────────────────────────────────────── */

const VIDEO_AVATARS = [
  "/images/avatars/video-avatar-1.png",
  "/images/avatars/video-avatar-2.png",
  "/images/avatars/video-avatar-3.png",
];

/* ══════════════════════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════════════════════ */

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
    <section id="testimonials" className="w-full scroll-mt-[64px]">
      {/* ── Text Testimonials (consulting-style cards) ── */}
      <div className="py-16 md:py-20 bg-[hsl(var(--bg-primary-50))]">
        <div className="container-default">
          {/* Section header */}
          <div className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16 px-6 md:px-4 max-w-[900px] mx-auto">
            {/* Stacked avatars */}
            <div className="flex items-center -space-x-4 mb-1">
              {VIDEO_AVATARS.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="ProUX community member"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-[hsl(var(--bg-primary-50))] object-cover"
                  style={{ zIndex: 3 - i }}
                />
              ))}
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]" />
              <span className="text-sm font-medium text-muted-foreground">
                Rated 5 stars by 300+ clients
              </span>
            </div>

            <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.15] tracking-tight">
              Trusted by Founders Worldwide
            </h2>
            <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl leading-relaxed">
              See how AI-First UX translated into measurable gains for SaaS &amp; eCommerce teams.
            </p>
          </div>

          {/* 3-column grid of testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {textTestimonials.map((t) => (
              <TextTestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Video Testimonials (full-width, consulting layout) ── */}
      <div className="bg-[hsl(var(--bg-primary-50))] pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container-default">
          {/* Video heading with floating hearts */}
          <div className="flex flex-col items-center mb-10">
            <FloatingHearts />
            <h3 className="text-2xl md:text-[32px] font-bold text-foreground leading-[1.2] tracking-tight max-w-2xl text-center px-4 md:px-0">
              Unscripted Clips From Designers Who Leveled Up
            </h3>
          </div>

          {/* Video grid — carousel on mobile, 4-col grid on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-3 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:snap-none md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {videoTestimonials.map((v) => (
              <div key={v.name} className="w-[52vw] flex-shrink-0 snap-start md:w-auto">
                <VideoTestimonialCard
                  testimonial={v}
                  isActive={activeVideo === v.name}
                  onActivate={() => setActiveVideo(activeVideo === v.name ? null : v.name)}
                />
              </div>
            ))}
          </div>
          <ScrollDots
            count={videoTestimonials.length}
            activeIndex={activeVideoIndex}
          />
        </div>
      </div>
    </section>
  );
}
