"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Star, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ── 5-Star SVG (inline paths) ─────────────────────────────────────────── */

const STAR_PATHS = [
  "M8.33326 1.53054L10.4353 5.78905L15.136 6.47612L11.7346 9.78905L12.5373 14.4693L8.33326 12.2584L4.12918 14.4693L4.9319 9.78905L1.53054 6.47612L6.23122 5.78905L8.33326 1.53054Z",
  "M25.9388 1.53061L28.0408 5.78912L32.7415 6.47619L29.3401 9.78912L30.1429 14.4694L25.9388 12.2585L21.7347 14.4694L22.5374 9.78912L19.1361 6.47619L23.8367 5.78912L25.9388 1.53061Z",
  "M43.5442 1.53061L45.6463 5.78912L50.3469 6.47619L46.9456 9.78912L47.7483 14.4694L43.5442 12.2585L39.3401 14.4694L40.1429 9.78912L36.7415 6.47619L41.4422 5.78912L43.5442 1.53061Z",
  "M61.1497 1.53061L63.2517 5.78912L67.9524 6.47619L64.551 9.78912L65.3537 14.4694L61.1497 12.2585L56.9456 14.4694L57.7483 9.78912L54.3469 6.47619L59.0476 5.78912L61.1497 1.53061Z",
  "M78.7551 1.53061L80.8571 5.78912L85.5578 6.47619L82.1565 9.78912L82.9592 14.4694L78.7551 12.2585L74.551 14.4694L75.3537 9.78912L71.9524 6.47619L76.6531 5.78912L78.7551 1.53061Z",
];

function FiveStarsInline() {
  return (
    <div className="h-4 relative shrink-0 w-[87px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 88 16"
      >
        {STAR_PATHS.map((d, i) => (
          <path key={i} d={d} className="fill-accent" />
        ))}
      </svg>
    </div>
  );
}

/* ── Text Testimonial Data ─────────────────────────────────────────────── */

interface Testimonial {
  quote: string;
  author: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    quote:
      "\"ProUX's AI agents helped us ship our MVP redesign in 8 days instead of a month. The scored feedback gave us confidence we were doing it right.\"",
    author: "— David Chen, Founder",
  },
  {
    quote:
      "\"We don't have a UX team yet. ProUX's guidelines and real product examples taught us what good design looks like. Best $400 we've spent.\"",
    author: "— Lisa Martinez, Co-Founder",
  },
  {
    quote:
      "\"The Design Scanner caught 12 conversion blockers we completely missed. Fixed them and saw a 34% lift in signups within two weeks.\"",
    author: "— Ryan Cooper, Founder",
  },
  {
    quote:
      "\"Before ProUX, we were guessing. Now we make design decisions backed by 350+ principles. Our investor meetings got a lot easier to explain.\"",
    author: "— Priya Sharma, Founder",
  },
  {
    quote:
      "\"ProUX's AI specialists gave us expert-level UX feedback without hiring a consultant. Saved us 3 weeks and thousands of dollars on our launch.\"",
    author: "— Tom Bradley, Founder",
  },
  {
    quote:
      "\"The UX+AI specialists feel like having 18 senior designers on call. I get research insights, content feedback, and accessibility checks in minutes.\"",
    author: "— Maya Patel, Senior Product Designer",
  },
  {
    quote:
      "\"I scan every iteration through ProUX before presenting to stakeholders. The scored feedback helps me catch issues early and ship better work.\"",
    author: "— Jake Morrison, Product Designer",
  },
  {
    quote:
      "\"The annotated product examples are gold. I see exactly why certain UX patterns work and how to apply them to my own projects.\"",
    author: "— Sarah Kim, UX Designer",
  },
  {
    quote:
      "\"Design reviews used to take days. Now I get instant feedback from ProUX's AI agents, iterate faster, and present with way more confidence.\"",
    author: "— Alex Thompson, Product Designer",
  },
  {
    quote:
      "\"As a junior designer, ProUX's guidelines taught me UX fundamentals faster than any course. I'm making decisions my senior designers actually trust now.\"",
    author: "— Jordan Lee, Junior Designer",
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    quote:
      "\"ProUX's case studies show me how companies like Walmart apply UX principles. I'm not just learning theory, I'm seeing what actually works in production.\"",
    author: "— Emily Chen, Product Designer",
  },
  {
    quote:
      "\"The ProUX score gives me an objective measure of design quality. I can track improvements over iterations and prove value to my PM.\"",
    author: "— Marcus Johnson, Lead Designer",
  },
  {
    quote:
      "\"When stakeholders question my designs, I show them ProUX's principle-backed rationale. Suddenly my recommendations have way more weight.\"",
    author: "— Nina Rodriguez, UX Designer",
  },
  {
    quote:
      "\"ProUX catches things I miss: content clarity issues, accessibility problems, CRO opportunities. It's like having a full design audit team in one tool.\"",
    author: "— Chris Anderson, Senior Designer",
  },
  {
    quote:
      "\"I ship designs 2x faster with ProUX because I'm not second-guessing every decision. The AI agents give me expert validation in real-time.\"",
    author: "— Taylor Morgan, Product Designer",
  },
  {
    quote:
      "\"ProUX's guidelines keep our 5-person design team aligned. We reference the same principles and examples, so our designs feel consistent across products.\"",
    author: "— Rachel Stevens, Design Lead",
  },
  {
    quote:
      "\"New team members learn our UX standards in days instead of months using ProUX's library. They're shipping quality work from week one.\"",
    author: "— Kevin Park, Head of Design",
  },
  {
    quote:
      "\"ProUX's AI specialists handle competitor research, user journey analysis, and design audits. My team focuses on creative work instead of grunt work.\"",
    author: "— Amanda Foster, UX Manager",
  },
  {
    quote:
      "\"ProUX's Design Scanner ensures every designer hits our quality standards before handoff. Fewer rounds of revisions, happier developers.\"",
    author: "— Daniel White, Design Director",
  },
  {
    quote:
      "\"Before ProUX, design decisions were debates. Now we scan options, compare ProUX scores, and pick the winner backed by 350+ principles. Way less drama.\"",
    author: "— Sophie Martinez, Senior UX Lead",
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
    name: "Sherin Biju",
    role: "Sr. UI/UX Designer",
    company: "India",
    src: "/videos/testimonials/sherin-biju.mp4",
  },
];

/* ── Scroll Row Card ───────────────────────────────────────────────────── */

function TestimonialCard({ quote, author }: Testimonial) {
  return (
    <div className="flex flex-col justify-between shrink-0 w-[326px] h-[200px] pl-6 pr-5 py-5 bg-[hsl(var(--bg-primary-100))] rounded-[14px]">
      <div className="flex flex-col gap-2 items-start w-full">
        <FiveStarsInline />
        <p className="text-[14px] font-medium text-[#1b2232] leading-[22px]">
          {quote}
        </p>
      </div>
      <p className="text-[14px] font-normal text-[#1b2232] leading-[20px] tracking-[-0.084px]">
        {author}
      </p>
    </div>
  );
}

/* ── Scrolling Row ─────────────────────────────────────────────────────── */

function ScrollRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const items = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div className="flex overflow-hidden w-full group">
      <div
        className={`flex shrink-0 gap-6 pl-6 ${
          direction === "left"
            ? "animate-[scroll-left_200s_linear_infinite]"
            : "animate-[scroll-right_200s_linear_infinite]"
        } group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:translate-x-0`}
      >
        {items.map((item, i) => (
          <TestimonialCard key={i} quote={item.quote} author={item.author} />
        ))}
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
    <section id="testimonials" className="w-full overflow-hidden scroll-mt-[64px]">
      {/* Keyframe animations */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* ── Text Testimonials (scrolling rows) ── */}
      <div className="py-16 md:py-20 bg-card">
        <div className="flex flex-col items-center gap-12">
          {/* Section header */}
          <div className="flex flex-col items-center gap-4 text-center px-6 md:px-4 max-w-[900px]">
            {/* Stacked avatars */}
            <div className="flex items-center -space-x-4 mb-1">
              {VIDEO_AVATARS.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="ProUX community member"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-card object-cover"
                  style={{ zIndex: 3 - i }}
                />
              ))}
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]" />
              <span className="text-sm font-medium text-muted-foreground">
                4.98 across 12,000+ designers trained
              </span>
            </div>

            <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.15] tracking-tight">
              Trusted by 12,000+ Product Designers and UX Teams
            </h2>
            <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl leading-relaxed">
              See how designers ship faster, make confident decisions, and advance their careers with ProUX.
            </p>
          </div>

          {/* Scrolling rows */}
          <div className="flex flex-col gap-6 w-full">
            <ScrollRow testimonials={testimonialsRow1} direction="left" />
            <ScrollRow testimonials={testimonialsRow2} direction="right" />
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
