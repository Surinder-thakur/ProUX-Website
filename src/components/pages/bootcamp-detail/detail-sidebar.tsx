"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  getAllTiersInfo,
  type BootcampModule,
  type LearningOutcome,
  type TierInfo,
} from "@/lib/data/bootcamps";
import { useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";
import BundlePopup from "./bundle-popup";
import RazorpayButton from "./razorpay-button";

/* ── Countdown ───────────────────────────────────────────────────────── */

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
        className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full border border-[#B0B0B0] text-[10px] font-bold text-[#888] hover:text-foreground hover:border-foreground/40 transition-colors leading-none"
        aria-label="View pricing tiers"
      >
        ?
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] rounded-xl bg-white border border-[#e8e4d9] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4"
        >
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-[#e8e4d9]" />

          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#555] mb-3">
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
                    <span className={`text-[13px] font-semibold ${
                      t.status === "active" ? "text-foreground" :
                      t.status === "ended" ? "line-through text-[#888]" : "text-[#555]"
                    }`}>
                      {t.label}
                    </span>
                    <span className="text-[13px] text-[#555]">${t.price}</span>
                    {t.discount > 0 && t.status !== "ended" && (
                      <span className="text-[12px] font-semibold text-emerald-600">
                        ({t.discount}% off)
                      </span>
                    )}
                    {t.status === "ended" && (
                      <span className="text-[12px] text-[#888]">(ended)</span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#888] mt-0.5">{t.dateRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

/* ── Testimonials ────────────────────────────────────────────────────── */

const TESTIMONIALS = [
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

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
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

  const t = TESTIMONIALS[active];

  return (
    <div className="rounded-xl bg-[hsl(var(--gold-50))] border border-[#ece9d8] p-5">
      <svg className="w-6 h-6 text-primary/30 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>
      <p className="text-[14px] text-foreground leading-relaxed mb-4 italic">
        {t.quote}
      </p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-[13px] font-bold text-foreground leading-tight">{t.author}</p>
          <p className="text-[12px] text-[#555]">{t.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        {TESTIMONIALS.map((_, i) => (
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
              className="w-full flex items-center justify-between gap-2 px-4 py-[18px] text-left hover:bg-[hsl(var(--gold-50))] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-emerald-600 flex items-center justify-center">
                  <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[14px] font-semibold text-foreground truncate">
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
                <p className="text-[13px] text-[#555] leading-relaxed pl-[26px]">
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

/* ── Sidebar — Hybrid C + urgency from A + badge from B ──────────────── */

export default function DetailSidebar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B">("A");
  const [bundleAdded, setBundleAdded] = useState(false);
  const [bundlePopupOpen, setBundlePopupOpen] = useState(false);
  const tier = useActiveTier(mod);
  const tiers = getAllTiersInfo(mod);
  const scrollRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(tier.deadline);

  /* ── Priority scroll: sidebar scrolls first, then page ─────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const atTop = scrollTop <= 0;

      // Scrolling down — if sidebar hasn't reached bottom, consume the event
      if (e.deltaY > 0 && !atBottom) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
      // Scrolling up — if sidebar hasn't reached top, consume the event
      else if (e.deltaY < 0 && !atTop) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
      // Otherwise: sidebar is at its boundary, let the page scroll naturally
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <div ref={scrollRef} className="sticky top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto">
        <div className="p-8 space-y-7">

          {/* ── Instructor — editorial, trust-first ──────────────────── */}
          <div className="flex items-center gap-4">
            <img
              src="/images/surinder-profile.jpg"
              alt="Surinder Thakur"
              className="w-[56px] h-[56px] rounded-full object-cover border-[3px] border-primary/25"
            />
            <div>
              <p className="text-[15px] font-bold text-foreground">Surinder Thakur</p>
              <p className="text-[13px] text-[#555]">AI-First UX Consultant &middot; NN/g Certified</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-foreground">4.98</span>
                <span className="text-[12px] text-[#888]">across 12k+ designers trained</span>
              </div>
            </div>
          </div>

          {/* ── Title + tagline ──────────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2">Live Bootcamp</p>
            <h3 className="text-[20px] font-extrabold text-foreground tracking-[-0.4px] leading-tight mb-2">
              {mod.title}
            </h3>
            <p className="text-[14px] text-[#555] leading-relaxed">{mod.tagline}</p>
          </div>

          {/* ── Price card — with urgency countdown (from A) + badge (from B) ── */}
          <div className="bg-[hsl(var(--gold-50))] rounded-xl px-5 py-4">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-[28px] font-extrabold text-foreground leading-none">${tier.price}</span>
              <span className="text-[15px] text-[#888] line-through">${tier.fullPrice}</span>
              {tier.discount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[12px] font-bold text-emerald-700 uppercase tracking-wide">
                  {tier.discount}% OFF
                </span>
              )}
            </div>

            {/* Urgency: tier label + deadline + countdown + tooltip */}
            {tier.deadline && countdown && (
              <div className="flex items-center gap-2 mt-2.5">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  tier.dotColor === "emerald" ? "bg-emerald-500" :
                  tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500"
                }`} />
                <span className="text-[13px] font-semibold text-foreground">
                  {tier.label}
                </span>
                <span className="text-[13px] text-[#555]">
                  ends {formatDeadlineShort(tier.deadline)}
                </span>
                <span className="text-[13px] text-[#555]">&middot;</span>
                <span className="text-[13px] font-semibold text-foreground">
                  {countdown}
                </span>
                <PricingTierTooltip tiers={tiers} />
              </div>
            )}

            <p className="text-[13px] text-[#555] mt-2">
              Cohort starts {mod.startDate}, 2026
            </p>
          </div>

          {/* ── Track Selector ───────────────────────────────────────── */}
          <div>
            <p className="text-[14px] font-semibold text-foreground mb-3">Choose Your Track</p>
            <div className="grid grid-cols-2 gap-2.5">
              {(["A", "B"] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                    selectedTrack === track
                      ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                      : "border-[#dfdbc9] hover:border-[#b8b0a0]"
                  }`}
                >
                  <p className="text-[14px] font-bold text-foreground">Track {track}</p>
                  <p className="text-[13px] text-[#555] mt-0.5">
                    {track === "A" ? "Mon \u00b7 7:30 \u2013 9:00 PM IST" : "Thu \u00b7 2:30 \u2013 4:00 PM IST"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <RazorpayButton label="Enroll Now" price={tier.price} />

          {/* ── What You'll Learn ────────────────────────────────────── */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-widest text-[#888] mb-3">
              What You&apos;ll Learn
            </p>
            <OutcomeAccordion outcomes={mod.outcomes} />
          </div>

          {/* ── Bundle upsell — 32px separation from primary CTA zone ── */}
          <div className={`!mt-[32px] rounded-xl border p-4 transition-all ${
            bundleAdded
              ? "border-emerald-300 bg-emerald-50"
              : "border-emerald-200 bg-emerald-50/60"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-bold text-foreground mb-0.5">
                  {bundleAdded ? "Full Bundle Added" : "Save with the Full Bundle"}
                </p>
                <p className="text-[13px] text-[#555] mb-2">
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
              <span className="text-[18px] font-extrabold text-foreground">${BUNDLE_PRICE_USD}</span>
              <span className="text-[14px] text-[#888] line-through">${BUNDLE_ORIGINAL_USD}</span>
              <span className="text-[13px] font-semibold text-emerald-600">Save ${BUNDLE_SAVINGS_USD}</span>
            </div>
            <button
              onClick={() => setBundlePopupOpen(true)}
              className="text-[14px] font-semibold text-emerald-600 hover:underline"
            >
              View all bootcamps
            </button>
          </div>

          {/* ── Testimonial carousel ─────────────────────────────────── */}
          <TestimonialCarousel />
        </div>
      </div>

      <BundlePopup open={bundlePopupOpen} onClose={() => setBundlePopupOpen(false)} />
    </>
  );
}
