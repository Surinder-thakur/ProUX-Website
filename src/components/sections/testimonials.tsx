/* =============================================================================
 * TESTIMONIALS MARQUEE SECTION
 * =============================================================================
 * DESIGNERS: Infinite scrolling testimonial cards. Customize:
 * - Section heading & subheading
 * - Testimonial cards (quote, name, role, avatar, rating)
 * - Scroll speed (via CSS animation duration in globals.css)
 * - Number of visible rows (currently 2 rows)
 * ========================================================================== */

import Image from "next/image";

/* DESIGNERS: Testimonial data. Add or remove testimonials as needed.
 * The marquee duplicates items automatically for seamless infinite scroll. */
const testimonials = [
  {
    id: 1,
    quote:
      "ProUX transformed our design process. The AI Scanner alone saved us 20+ hours per sprint on design reviews.",
    name: "Lisa Chen",
    role: "Lead Product Designer",
    company: "Shopify",
    avatar: "/images/testimonial-lisa.jpg",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The UX principles library is like having a senior mentor available 24/7. Our junior designers ramped up in half the time.",
    name: "Jordan Rivera",
    role: "UX Manager",
    company: "Stripe",
    avatar: "/images/testimonial-jordan.jpg",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Finally, a tool that bridges the gap between design theory and practice. The real product analyses are incredibly valuable.",
    name: "Nina Patel",
    role: "Senior Designer",
    company: "Airbnb",
    avatar: "/images/testimonial-nina.jpg",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "ProUX helped us make data-driven design decisions from day one. Our conversion rates improved by 34% in just two months.",
    name: "Priya Sharma",
    role: "Design Lead",
    company: "Microsoft",
    avatar: "/images/testimonial-priya.jpg",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "The AI specialists feature is a game-changer. It's like having expert consultants for every industry vertical we work with.",
    name: "Tom Wilson",
    role: "Product Designer",
    company: "Netflix",
    avatar: "/images/testimonial-tom.jpg",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "Best investment our design team has made. The guidelines library alone is worth 10x the subscription price.",
    name: "Kevin Park",
    role: "Head of UX",
    company: "Figma",
    avatar: "/images/testimonial-kevin.jpg",
    rating: 5,
  },
];

/* Star rating component */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* Single testimonial card */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="w-[340px] flex-shrink-0 rounded-xl border border-border bg-white p-6 shadow-sm sm:w-[380px]">
      <Stars count={testimonial.rating} />
      <p className="mb-5 mt-4 text-sm leading-relaxed text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-proux-navy">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-proux-warm overflow-hidden">
      <div className="container-default mb-12 text-center">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <p className="label-caps mb-4 text-proux-copper">Testimonials</p>
        <h2 className="heading-1 text-proux-navy">
          Trusted by 12,000+ Product Designers and UX Teams
        </h2>
      </div>

      {/* ── DESIGNERS: Marquee row 1 (scrolls left) ─────────────────── */}
      <div className="mb-6 flex gap-6 overflow-hidden">
        <div className="animate-marquee flex gap-6">
          {/* Original set */}
          {testimonials.map((t) => (
            <TestimonialCard key={`row1-${t.id}`} testimonial={t} />
          ))}
          {/* Duplicate set for seamless loop */}
          {testimonials.map((t) => (
            <TestimonialCard key={`row1-dup-${t.id}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* ── DESIGNERS: Marquee row 2 (scrolls right / reverse) ──────── */}
      <div className="flex gap-6 overflow-hidden">
        <div className="animate-marquee-reverse flex gap-6">
          {/* Original set (reversed order for variety) */}
          {[...testimonials].reverse().map((t) => (
            <TestimonialCard key={`row2-${t.id}`} testimonial={t} />
          ))}
          {/* Duplicate set for seamless loop */}
          {[...testimonials].reverse().map((t) => (
            <TestimonialCard key={`row2-dup-${t.id}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
