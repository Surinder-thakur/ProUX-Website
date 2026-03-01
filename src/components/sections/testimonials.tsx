import React from "react";

/* ── 5-Star SVG (inline paths) ─────────────────────────────────────────── */

const STAR_PATHS = [
  "M8.33326 1.53054L10.4353 5.78905L15.136 6.47612L11.7346 9.78905L12.5373 14.4693L8.33326 12.2584L4.12918 14.4693L4.9319 9.78905L1.53054 6.47612L6.23122 5.78905L8.33326 1.53054Z",
  "M25.9388 1.53061L28.0408 5.78912L32.7415 6.47619L29.3401 9.78912L30.1429 14.4694L25.9388 12.2585L21.7347 14.4694L22.5374 9.78912L19.1361 6.47619L23.8367 5.78912L25.9388 1.53061Z",
  "M43.5442 1.53061L45.6463 5.78912L50.3469 6.47619L46.9456 9.78912L47.7483 14.4694L43.5442 12.2585L39.3401 14.4694L40.1429 9.78912L36.7415 6.47619L41.4422 5.78912L43.5442 1.53061Z",
  "M61.1497 1.53061L63.2517 5.78912L67.9524 6.47619L64.551 9.78912L65.3537 14.4694L61.1497 12.2585L56.9456 14.4694L57.7483 9.78912L54.3469 6.47619L59.0476 5.78912L61.1497 1.53061Z",
  "M78.7551 1.53061L80.8571 5.78912L85.5578 6.47619L82.1565 9.78912L82.9592 14.4694L78.7551 12.2585L74.551 14.4694L75.3537 9.78912L71.9524 6.47619L76.6531 5.78912L78.7551 1.53061Z",
];

function FiveStars() {
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

/* ── Testimonial Data ──────────────────────────────────────────────────── */

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

/* ── Testimonial Card ──────────────────────────────────────────────────── */

function TestimonialCard({ quote, author }: Testimonial) {
  return (
    <div className="flex flex-col justify-between shrink-0 w-[326px] h-[200px] pl-6 pr-5 py-5 bg-[hsl(var(--bg-primary-100))] rounded-[14px]">
      <div className="flex flex-col gap-2 items-start w-full">
        <FiveStars />
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

/* ── Main Section ──────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 w-full overflow-hidden bg-card">
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

      <div className="flex flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex flex-col items-center gap-4 text-center px-6 md:px-4 max-w-[900px]">
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
    </section>
  );
}
