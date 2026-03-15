"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Volume2, VolumeX, X } from "lucide-react";
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
  {
    quote:
      "The bootcamp completely <strong>transformed how I approach design systems.</strong> I went from struggling with Figma auto-layout to building production-ready components in under a week.",
    badge: "Career switch",
    author: "Maya Rodriguez",
    role: "Product Designer, Stripe",
    avatar: "/images/consulting/testimonials/avatar-1.png",
  },
  {
    quote:
      "Before this bootcamp I was a graphic designer with <strong>zero product experience.</strong> Now I'm leading the design for a Series A startup. The <strong>AI-first workflow</strong> alone was worth every penny.",
    badge: "Landed dream role",
    author: "James Okonkwo",
    role: "Lead Designer, Fintech Startup",
    avatar: "/images/consulting/testimonials/avatar-2.png",
  },
  {
    quote:
      "Surinder doesn't just teach design — he teaches you to <strong>think like an engineer.</strong> My developers actually enjoy working with my handoffs now. The bootcamp gave me a <strong>completely new skillset.</strong>",
    badge: "10x faster handoffs",
    author: "Priya Sharma",
    role: "Senior UX Designer",
    avatar: "/images/consulting/testimonials/avatar-3.png",
  },
  {
    quote:
      "I was skeptical about an online bootcamp, but the <strong>live sessions and real-world projects</strong> made all the difference. I shipped a full SaaS redesign as my capstone and <strong>got hired the next month.</strong>",
    badge: "Hired in 30 days",
    author: "Lucas Fernández",
    role: "UI/UX Designer, Agency",
    avatar: "/images/consulting/testimonials/avatar-1.png",
  },
  {
    quote:
      "The AI design tools module was a <strong>game-changer.</strong> I now prototype 3x faster and my conversion-focused designs have driven <strong>measurable revenue growth</strong> for every client since graduating.",
    badge: "+3x output speed",
    author: "Sarah Chen",
    role: "Freelance Product Designer",
    avatar: "/images/consulting/testimonials/avatar-2.png",
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
  isActive,
  onActivate,
}: {
  testimonial: VideoTestimonial;
  isActive: boolean;
  onActivate: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMuted = !isActive;

  useEffect(() => {
    const player = containerRef.current?.querySelector("mux-player") as
      | (HTMLElement & { muted: boolean })
      | null;
    if (player) {
      player.muted = !isActive;
    }
  }, [isActive]);

  const handleClick = () => {
    if (isActive) {
      onActivate();
    } else {
      onActivate();
      const player = containerRef.current?.querySelector("mux-player") as
        | (HTMLElement & { paused?: boolean; play?: () => Promise<void> })
        | null;
      if (player && player.paused && player.play) {
        player.play().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 snap-start rounded-[24px] overflow-hidden cursor-pointer group bg-neutral-900"
      style={{ aspectRatio: "267/422" }}
      onClick={handleClick}
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

/* ── Testimonials Popup ────────────────────────────────────────────────── */

function TestimonialsPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed z-[121] top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[120] m-auto max-w-4xl h-fit max-h-[85vh] w-[calc(100%-48px)] rounded-2xl bg-[#faf9f6] shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-7 py-5 border-b border-[#e8e4d9]">
              <h2 className="text-[20px] font-bold text-foreground tracking-[-0.4px]">
                What Designers Are Saying
              </h2>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {textTestimonials.map((t) => (
                  <TextTestimonialCard key={t.author} testimonial={t} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */

export default function ConsultingTestimonials({
  contained = false,
}: {
  contained?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
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
    <section className={contained ? "py-7 md:py-10" : "bg-[hsl(var(--bg-primary-50))] pt-[80px] pb-0"}>
      <div className={contained ? "" : "container-default"}>
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={`flex flex-col mb-12 md:mb-16 ${
          contained ? "items-start" : "items-center text-center"
        }`}>
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
              {contained
                ? "4.98 across 12k+ designers trained"
                : "Rated 5 stars by 300+ clients"}
            </span>
          </div>

          {/* Heading */}
          <h2 className={`font-bold text-foreground leading-[1.15] tracking-tight mb-4 px-4 md:px-0 ${
            contained ? "text-[26px] md:text-[32px]" : "text-[32px] md:text-[40px]"
          }`}>
            {contained
              ? <>Trusted by <strong>Designers</strong> Worldwide</>
              : "Trusted by Founders Worldwide"}
          </h2>

          {/* Subtitle */}
          <p className={`text-muted-foreground leading-relaxed px-4 md:px-0 ${
            contained ? "text-[15px] md:text-base max-w-xl" : "text-lg md:text-xl max-w-2xl"
          }`}>
            {contained
              ? "Hear from designers who leveled up through our bootcamps."
              : <>See how AI-First UX translated into measurable gains for SaaS &amp; eCommerce teams.</>}
          </p>
        </div>

        {/* ── Text Testimonials Grid ─────────────────────────────────── */}
        {contained ? (
          <div>
            {/* True masonry via CSS columns — no row gaps */}
            <div className="relative">
              <div className="columns-1 md:columns-2 gap-6 [&>div]:mb-6 [&>div]:break-inside-avoid">
                {textTestimonials.slice(0, 4).map((t) => (
                  <TextTestimonialCard key={t.author} testimonial={t} />
                ))}
              </div>

              {/* Gradient fade over the bottom cards */}
              <div className="absolute bottom-0 inset-x-0 h-[55%] bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/80 to-transparent pointer-events-none" />

              {/* "View more" button */}
              <div className="absolute bottom-6 inset-x-0 flex justify-center">
                <button
                  onClick={() => setShowAllTestimonials(true)}
                  className="rounded-[14px] border border-input bg-background shadow-sm px-6 py-2.5 text-[13px] font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  View more
                </button>
              </div>
            </div>

            <TestimonialsPopup
              open={showAllTestimonials}
              onClose={() => setShowAllTestimonials(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-16 md:mb-20">
            {textTestimonials.slice(0, 3).map((t) => (
              <TextTestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>
        )}

        {/* ── Video Testimonials ─────────────────────────────────────── */}
        <div className={contained ? "" : "pb-12 md:pb-16"}>
          {/* Video heading (hearts only on full-width) */}
          <div className={`flex flex-col mb-10 ${contained ? "items-start" : "items-center"}`}>
            {!contained && <FloatingHearts />}
            <h3 className={`font-bold text-foreground leading-[1.2] tracking-tight px-4 md:px-0 ${
              contained ? "text-xl md:text-[26px] max-w-lg" : "text-2xl md:text-[32px] max-w-2xl text-center"
            }`}>
              Unscripted Clips From the People Who Signed the Checks
            </h3>
          </div>

          <div
            ref={scrollRef}
            className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:gap-5 md:overflow-visible md:snap-none md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
              contained ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-4"
            }`}
          >
            {videoTestimonials.map((v) => (
              <div key={v.name} className="w-[75vw] flex-shrink-0 snap-start md:w-auto">
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
