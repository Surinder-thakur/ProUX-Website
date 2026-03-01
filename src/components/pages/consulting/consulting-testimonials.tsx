"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Star, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

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
  avatar: string;
}

interface VideoTestimonial {
  name: string;
  company: string;
  role: string;
  country: string;
  playbackId: string;
  thumbnail: string;
}

/* ── Data ──────────────────────────────────────────────────────────────── */

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

const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Avin Kline",
    company: "E SCALE",
    role: "Founder.",
    country: "USA",
    playbackId: "tiHdYo75dWes1VQVTu9cKTH7847OYE4L9ym3ZQrzR74",
    thumbnail:
      "https://image.mux.com/tiHdYo75dWes1VQVTu9cKTH7847OYE4L9ym3ZQrzR74/thumbnail.jpg?width=534&height=844&fit_mode=smartcrop",
  },
  {
    name: "José Navarro",
    company: "Barefoot Media",
    role: "Founder.",
    country: "Australia",
    playbackId: "MrJhG4G7EZeEpwgFZ2jvePX00WEb00MMEyufGnU4qn6jA",
    thumbnail:
      "https://image.mux.com/MrJhG4G7EZeEpwgFZ2jvePX00WEb00MMEyufGnU4qn6jA/thumbnail.jpg?width=534&height=844&fit_mode=smartcrop",
  },
  {
    name: "Sheila Raper",
    company: "AJElite Homes",
    role: "MD.",
    country: "USA",
    playbackId: "cHXw1rpS02oMIuHrWQbXo00KEzQOUwBtntX02wqwnmgGPk",
    thumbnail: "/images/consulting/testimonials/sheila-raper.jpg",
  },
  {
    name: "Uli Schönleber",
    company: "Ooliv",
    role: "Founder.",
    country: "Germany",
    playbackId: "zPouJKbggQnYr02ysA00AFAKRkciXA93Prerd00XOcAG9s",
    thumbnail: "/images/consulting/testimonials/uli-schonleber.jpg",
  },
];

/* ── Heart Animation (matches live site) ───────────────────────────────── */

const heartPath = "M27.6491 1.57407C23.4031 -1.03039 19.6973 0.0191798 17.4711 1.69102C16.5583 2.37652 16.1019 2.71926 15.8333 2.71926C15.5648 2.71926 15.1084 2.37652 14.1956 1.69102C11.9694 0.0191798 8.26355 -1.03039 4.01761 1.57407C-1.55472 4.99215 -2.81561 16.2685 10.0376 25.782C12.4857 27.594 13.7098 28.5 15.8333 28.5C17.9569 28.5 19.1809 27.594 21.6291 25.782C34.4823 16.2685 33.2214 4.99215 27.6491 1.57407Z";

function FloatingHearts() {
  return (
    <div className="relative size-16 mb-2" aria-hidden="true">
      {/* Heart 1 — ghost/faded, rotated */}
      <motion.svg
        className="absolute top-0 left-0 size-10 text-destructive opacity-20 rotate-[-20deg]"
        viewBox="0 0 32 29"
        fill="currentColor"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={heartPath} />
      </motion.svg>
      {/* Heart 2 — solid, full opacity */}
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
}: {
  testimonial: VideoTestimonial;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = () => {
    const player = containerRef.current?.querySelector("mux-player") as
      | (HTMLElement & { muted: boolean })
      | null;
    if (player) {
      player.muted = !player.muted;
      setIsMuted(player.muted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 snap-start rounded-[24px] overflow-hidden cursor-pointer group bg-neutral-900"
      style={{ aspectRatio: "267/422" }}
      onClick={handleToggleMute}
    >
      {/* Mux Video Player — always playing muted by default */}
      <MuxPlayer
        playbackId={testimonial.playbackId}
        autoPlay="muted"
        loop
        streamType="on-demand"
        preload="auto"
        style={
          {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            "--media-object-fit": "cover",
            "--media-object-position": "center",
            "--controls": "none",
          } as Record<string, string>
        }
      />

      {/* Volume icon — visible on hover when muted, always when unmuted */}
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

/* ── Header avatars ────────────────────────────────────────────────────── */

const headerAvatars = [
  { src: "/images/consulting/testimonials/avatar-1.png", alt: "Satisfied ProUX client" },
  { src: "/images/consulting/testimonials/avatar-2.png", alt: "ProUX consulting client" },
  { src: "/images/consulting/testimonials/avatar-3.png", alt: "ProUX design client" },
];

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
            {headerAvatars.map((avatar, i) => (
              <Image
                key={i}
                src={avatar.src}
                alt={avatar.alt}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-[hsl(var(--bg-primary-50))] object-cover"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </div>

          {/* Star rating badge */}
          <div className="flex items-center gap-2 mb-5">
            <Star className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]" />
            <span className="text-sm font-medium text-muted-foreground">
              Rated 5 stars by 300+ clients
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground leading-[1.15] tracking-tight mb-4 px-4 md:px-0">
            Trusted by Founders Worldwide
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed px-4 md:px-0">
            See how AI-First UX translated into measurable gains for SaaS &amp; eCommerce teams.
          </p>
        </div>

        {/* ── Text Testimonials Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-16 md:mb-20">
          {textTestimonials.map((t) => (
            <TextTestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>

        {/* ── Video Testimonials ─────────────────────────────────────── */}
        <div className="pb-12 md:pb-16">
          {/* Video heading with floating hearts above */}
          <div className="flex flex-col items-center mb-10">
            <FloatingHearts />
            <h3 className="text-2xl md:text-[32px] font-bold text-foreground text-center leading-[1.2] tracking-tight max-w-2xl px-4 md:px-0">
              Unscripted Clips From the People Who Signed the Checks
            </h3>
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
