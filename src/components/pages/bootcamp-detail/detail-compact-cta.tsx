"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import RazorpayButton from "./razorpay-button";
import {
  QUICK_FACTS,
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  BUNDLE_RAZORPAY_ID,
  getAllTiersInfo,
  type BootcampModule,
  type TierInfo,
  type LearningOutcome,
} from "@/lib/data/bootcamps";
import { useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";
import BundlePopup from "./bundle-popup";

/* ── Countdown (duplicated from detail-sidebar — sidebar is frozen) ──── */

function useCountdown(deadline: Date | null) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) { setText(""); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setText(d >= 1 ? `${d}d ${h}h left` : `${h}h ${m}m left`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  return text;
}

function formatDeadlineShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Green Filled Checkmark ──────────────────────────────────────────── */

function GreenCheck() {
  return (
    <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-emerald-600 shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/* ── Pricing Tier Tooltip ────────────────────────────────────────────── */

function TierCheckIcon({ status }: { status: TierInfo["status"] }) {
  if (status === "active") {
    return (
      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (status === "ended") {
    return (
      <svg className="w-3.5 h-3.5 text-[#aaa] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return <span className="w-3.5 h-3.5 shrink-0 rounded-[3px] border-[1.5px] border-[#ccc]" />;
}

function PricingTierTooltip({ tiers }: { tiers: TierInfo[] }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border border-[#B0B0B0] text-[9px] font-bold text-[#888] hover:text-foreground hover:border-foreground/40 transition-colors leading-none"
        aria-label="View pricing tiers"
      >
        ?
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full right-0 mt-2 w-[260px] rounded-xl bg-white border border-[#e8e4d9] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4"
        >
          <div className="absolute -top-[6px] right-4 w-3 h-3 rotate-45 bg-white border-l border-t border-[#e8e4d9]" />

          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555] mb-3">
            Price goes up the longer you wait
          </p>

          <div className="space-y-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex items-start gap-2.5 ${t.status === "ended" ? "opacity-50" : ""}`}
              >
                <div className="mt-0.5">
                  <TierCheckIcon status={t.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={`text-[12px] font-semibold ${
                      t.status === "active" ? "text-foreground" :
                      t.status === "ended" ? "line-through text-[#888]" : "text-[#555]"
                    }`}>
                      {t.label}
                    </span>
                    <span className="text-[12px] text-[#555]">${t.price}</span>
                    {t.discount > 0 && t.status !== "ended" && (
                      <span className="text-[11px] font-semibold text-emerald-600">
                        ({t.discount}% off)
                      </span>
                    )}
                    {t.status === "ended" && (
                      <span className="text-[11px] text-[#888]">(ended)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#888] mt-0.5">{t.dateRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

/* ── Instructor Testimonials ──────────────────────────────────────────── */

const INSTRUCTOR_TESTIMONIALS = [
  {
    quote: "Consistently came up with out of the box design solutions. Designs implemented have had positive impact on user experience and bottom line growth.",
    author: "Arthur Andreasyan",
    role: "Founder, Puffy",
    avatar: "/images/consulting/testimonials/arthur-andreasyan.png",
  },
  {
    quote: "The most talented UI/UX engineer on my team. He consistently delivers on time, often ahead of schedule, and his professionalism is unmatched.",
    author: "Carlos Arias",
    role: "Founder, Medellin",
    avatar: "/images/consulting/testimonials/carlos-arias.png",
  },
  {
    quote: "What I appreciate most about him professionally is his tenacity and dependability. If he says he will do something, there's no question it will get done.",
    author: "Avin Kline",
    role: "CEO, Lucyd",
    avatar: "/images/consulting/testimonials/avin-kline.png",
  },
];

function InstructorTestimonialCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % INSTRUCTOR_TESTIMONIALS.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const t = INSTRUCTOR_TESTIMONIALS[active];

  return (
    <div className="rounded-xl bg-[hsl(var(--gold-50))] border border-[#ece9d8] p-5">
      <svg className="w-6 h-6 text-primary/30 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>
      <p className="text-[14px] text-foreground leading-relaxed mb-4 italic">
        {t.quote}
      </p>
      <div className="flex items-center gap-3">
        <Image src={t.avatar} alt={t.author} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-[13px] font-bold text-foreground leading-tight">{t.author}</p>
          <p className="text-[12px] text-[#555]">{t.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        {INSTRUCTOR_TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-4 bg-primary" : "w-1.5 bg-primary/25"
            }`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Outcomes Accordion ──────────────────────────────────────────────── */

function OutcomeAccordion({ outcomes }: { outcomes: LearningOutcome[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-0 border border-[#dfdbc9] rounded-lg overflow-hidden">
      {outcomes.map((outcome, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={outcome.number} className={i > 0 ? "border-t border-[#dfdbc9]" : ""}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-2 px-4 py-[14px] text-left hover:bg-[hsl(var(--gold-50))] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-emerald-600 flex items-center justify-center">
                  <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[13px] font-semibold text-foreground truncate">
                  {outcome.title}
                </span>
              </div>
              <svg
                className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-3">
                <p className="text-[12px] text-[#555] leading-relaxed pl-[26px]">
                  {outcome.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Compact CTA Sidebar ──────────────────────────────────────────────── */

export default function DetailCompactCta({
  module: mod,
  variant = "bootcamp",
}: {
  module: BootcampModule;
  variant?: "bootcamp" | "workshop";
}) {
  const [bundleAdded, setBundleAdded] = useState(false);
  const [bundlePopupOpen, setBundlePopupOpen] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tier = useActiveTier(mod);
  const tiers = getAllTiersInfo(mod);
  const countdown = useCountdown(tier.deadline);

  const dotColor =
    tier.dotColor === "emerald" ? "bg-emerald-500" :
    tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500";

  /* ── Show only after scrolling past the first fold + fade out near bottom ── */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const column = el.parentElement;

    const onScroll = () => {
      // Show as soon as user starts scrolling (any scroll > 50px)
      if (window.scrollY > 50 && !hasAppeared) {
        setHasAppeared(true);
      }

      // Fade out when column bottom is near viewport top
      if (column) {
        const rect = column.getBoundingClientRect();
        setIsNearBottom(rect.bottom < 600);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasAppeared]);

  return (
    <>
      <div
        ref={sentinelRef}
        className="sticky top-[100px] z-[100] lg:pl-6 pt-10 transition-opacity duration-500"
        style={{ opacity: isNearBottom ? 0 : undefined, pointerEvents: isNearBottom ? "none" : undefined }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-2xl border border-[#e8e4d9] bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5"
        >

          {/* ── Price block ──────────────────────────────────────── */}
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[28px] font-extrabold text-foreground leading-none">
                {bundleAdded ? `$${BUNDLE_PRICE_USD}` : `$${tier.price}`}
              </span>
              <span className="text-[14px] text-[#888] line-through">
                {bundleAdded ? `$${BUNDLE_ORIGINAL_USD}` : `$${tier.fullPrice}`}
              </span>
              {!bundleAdded && tier.discount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  {tier.discount}% OFF
                </span>
              )}
              {bundleAdded && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  Save ${BUNDLE_SAVINGS_USD}
                </span>
              )}
            </div>

            {/* Urgency: tier label + countdown */}
            {!bundleAdded && tier.deadline && countdown && (
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-[12px] font-semibold text-foreground">
                  {tier.label}
                </span>
                <span className="text-[12px] text-[#555]">
                  ends {formatDeadlineShort(tier.deadline)}
                </span>
                <span className="text-[12px] text-[#555]">&middot;</span>
                <span className="text-[12px] font-semibold text-foreground">
                  {countdown}
                </span>
                <PricingTierTooltip tiers={tiers} />
              </div>
            )}

            {bundleAdded && (
              <p className="text-[12px] text-[#555] mt-2">
                All 3 Bootcamps &middot; 12 Classes &middot; 18 Hours
              </p>
            )}
          </div>

          {/* ── Schedule ──────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5 rounded-lg border border-[#dfdbc9] px-3 py-2.5">
            <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <div>
              <p className="text-[13px] font-semibold text-foreground">
                Starts {mod.startDate}, 2026
              </p>
              <p className="text-[11px] text-[#555]">
                {mod.trackA?.day ?? "Mondays"} &middot; {mod.trackA?.time ?? "8:00 \u2013 9:30 PM IST"}
              </p>
            </div>
          </div>

          {/* ── CTA button ──────────────────────────────────────── */}
          <RazorpayButton label="Enroll Now" price={bundleAdded ? BUNDLE_PRICE_USD : tier.price} buttonId={bundleAdded ? BUNDLE_RAZORPAY_ID : tier.razorpayId!} />

          {/* ── Bootcamp/Bundle Includes (not shown for workshop) ── */}
          {variant !== "workshop" && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-3">
              {bundleAdded ? "Bundle Includes" : "Bootcamp Includes"}
            </p>
            <div className="space-y-2.5">
              {(bundleAdded
                ? ["12 live classes, 90 min each", "18 hours total instruction", "12 students per track", "3 Certificates of Completion"]
                : QUICK_FACTS
              ).map((fact) => (
                <div key={fact} className="flex items-center gap-2.5">
                  <GreenCheck />
                  <span className="text-[13px] text-[#555]">{fact}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* ── What You'll Learn (workshop only) ─────────────────── */}
          {variant === "workshop" && mod.outcomes && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-3">
                What You&apos;ll Learn
              </p>
              <OutcomeAccordion outcomes={mod.outcomes} />
            </div>
          )}

          {/* ── Instructor Testimonials (workshop only) ────────────── */}
          {variant === "workshop" && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-3">
                What Clients Say About Your Instructor
              </p>
              <InstructorTestimonialCarousel />
            </div>
          )}

          {/* ── Bundle upsell (bootcamp only) ─────────────────────── */}
          {variant !== "workshop" && (
          <div className={`!mt-[24px] rounded-xl border p-4 transition-all ${
            bundleAdded
              ? "border-emerald-300 bg-emerald-50"
              : "border-emerald-200 bg-emerald-50/60"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-bold text-foreground mb-0.5">
                  {bundleAdded ? "Full Bundle Added" : "Save with the Full Bundle"}
                </p>
                <p className="text-[12px] text-[#555] mb-2">
                  All 3 Bootcamps &middot; 12 Classes &middot; 18 Hours
                </p>
              </div>
              <button
                onClick={() => setBundleAdded(!bundleAdded)}
                className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  bundleAdded ? "bg-emerald-500" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={bundleAdded}
                aria-label="Add full bundle"
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  bundleAdded ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[16px] font-extrabold text-foreground">${BUNDLE_PRICE_USD}</span>
              <span className="text-[13px] text-[#888] line-through">${BUNDLE_ORIGINAL_USD}</span>
              <span className="text-[12px] font-semibold text-emerald-600">Save ${BUNDLE_SAVINGS_USD}</span>
            </div>
            <button
              onClick={() => setBundlePopupOpen(true)}
              className="text-[13px] font-semibold text-emerald-600 hover:underline"
            >
              View all bootcamps
            </button>
          </div>
          )}

        </motion.div>
      </div>

      <BundlePopup open={bundlePopupOpen} onClose={() => setBundlePopupOpen(false)} />
    </>
  );
}
