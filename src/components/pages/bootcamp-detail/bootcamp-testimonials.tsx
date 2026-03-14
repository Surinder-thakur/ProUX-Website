"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, X } from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface BootcampTestimonial {
  quote: string;
  badge: string;
  author: string;
  role: string;
  initials: string;
  color: string; // Tailwind bg class
}

/* ── Avatar Colors ──────────────────────────────────────────────────────── */

const AVATAR_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-lime-100 text-lime-700",
  "bg-orange-100 text-orange-700",
  "bg-cyan-100 text-cyan-700",
];

/* ── BC1 Testimonials — AI Prompt & Design System Fundamentals ─────────── */

const BC1_TESTIMONIALS: BootcampTestimonial[] = [
  {
    quote: "I spent months typing random prompts into ChatGPT and getting nowhere. <strong>CRAFT changed everything.</strong> One framework, and suddenly every prompt I write actually produces something I can use.",
    badge: "Prompt clarity",
    author: "Riya Kapoor",
    role: "Product Designer",
    initials: "RK",
    color: AVATAR_COLORS[0],
  },
  {
    quote: "I thought design systems were only for big teams with dedicated engineers. Built mine from scratch in four weeks, <strong>entirely with AI.</strong> My freelance clients can't believe I did it solo.",
    badge: "Solo system",
    author: "Tomás Herrera",
    role: "Freelance UI Designer",
    initials: "TH",
    color: AVATAR_COLORS[1],
  },
  {
    quote: "The Figma Variables session was worth the entire enrollment fee. I went from manually updating hex codes across 40 screens to <strong>one variable change updating everything.</strong>",
    badge: "40 screens synced",
    author: "Ananya Desai",
    role: "Senior UX Designer",
    initials: "AD",
    color: AVATAR_COLORS[2],
  },
  {
    quote: "My design system used to die after three months because nobody maintained it. The governance framework Surinder teaches is <strong>the reason mine is still alive six months later.</strong>",
    badge: "System still alive",
    author: "Marcus Lindström",
    role: "Design Lead",
    initials: "ML",
    color: AVATAR_COLORS[3],
  },
  {
    quote: "I was embarrassed to admit I didn't understand design tokens. Now I <strong>teach my team how they work.</strong> The AI-first approach made the learning curve almost disappear.",
    badge: "Teaching others now",
    author: "Sophie Nakamura",
    role: "Product Designer",
    initials: "SN",
    color: AVATAR_COLORS[4],
  },
  {
    quote: "Dark mode used to take me two full sprints. After this bootcamp, <strong>it's baked into the token system from day one.</strong> Light mode, dark mode, just works.",
    badge: "Dark mode in hours",
    author: "Daniel Osei",
    role: "UI/UX Designer",
    initials: "DO",
    color: AVATAR_COLORS[5],
  },
  {
    quote: "The custom AI agents I built in Week 1 are still running. I use them <strong>every single day</strong> for design critiques, copy reviews, and accessibility checks. They're part of my workflow now.",
    badge: "Daily AI use",
    author: "Prerna Joshi",
    role: "Design Systems Designer",
    initials: "PJ",
    color: AVATAR_COLORS[6],
  },
  {
    quote: "I came in thinking 'AI can't really help with design systems.' Left with a <strong>production-ready token architecture</strong> that my dev team actually adopted without complaints.",
    badge: "Dev team adopted it",
    author: "Erik Johansson",
    role: "Senior Product Designer",
    initials: "EJ",
    color: AVATAR_COLORS[7],
  },
  {
    quote: "Before this bootcamp, I had a Figma file with 200 unnamed styles. Now I have a <strong>structured system with semantic naming, documentation, and changelogs.</strong> Night and day.",
    badge: "200 styles organized",
    author: "Keiko Tanaka",
    role: "UX Designer",
    initials: "KT",
    color: AVATAR_COLORS[8],
  },
  {
    quote: "Figma Make generating documentation automatically? I thought Surinder was exaggerating. <strong>Then I watched my docs update in real time</strong> when I changed a single token. Sold.",
    badge: "Live docs",
    author: "Aditya Menon",
    role: "Product Designer",
    initials: "AM",
    color: AVATAR_COLORS[9],
  },
  {
    quote: "I've taken three other AI courses. They all taught tools. This one taught me <strong>how to think about prompts.</strong> That's the difference between a tutorial and a skill you keep.",
    badge: "Lasting skill",
    author: "Clara Benítez",
    role: "Interaction Designer",
    initials: "CB",
    color: AVATAR_COLORS[0],
  },
  {
    quote: "My portfolio review went from 'nice mockups' to '<strong>wait, you built a full design system with token exports?</strong>' The interviewer asked me to walk through my CRAFT workflow on the spot.",
    badge: "Landed the interview",
    author: "Vikram Reddy",
    role: "Junior Designer",
    initials: "VR",
    color: AVATAR_COLORS[1],
  },
  {
    quote: "The spacing and typography token system alone saved me from the 'why does this look off?' conversation with developers. <strong>Everything is mathematically consistent</strong> now.",
    badge: "No more 'looks off'",
    author: "Lena Krüger",
    role: "UI Designer",
    initials: "LK",
    color: AVATAR_COLORS[2],
  },
  {
    quote: "I was scared of Claude. Like genuinely intimidated. Surinder makes it feel like you're just <strong>having a conversation with a very talented junior designer</strong> who needs clear direction. That reframe changed everything.",
    badge: "AI confidence",
    author: "Nisha Gupta",
    role: "Visual Designer",
    initials: "NG",
    color: AVATAR_COLORS[3],
  },
  {
    quote: "Four weeks. That's all it took to go from 'I should probably learn about design systems' to <strong>handing one off to engineering with CSS, Tailwind, and TypeScript exports.</strong>",
    badge: "Complete handoff",
    author: "Santiago Morales",
    role: "Product Designer",
    initials: "SM",
    color: AVATAR_COLORS[4],
  },
  {
    quote: "What surprised me most was how small the class was. <strong>12 people, direct feedback from Surinder every session.</strong> I've paid more for courses where the instructor never learned my name.",
    badge: "Personal attention",
    author: "Fatima Al-Rashid",
    role: "UX Designer",
    initials: "FA",
    color: AVATAR_COLORS[5],
  },
  {
    quote: "My WCAG contrast scores used to be an afterthought. Now <strong>accessibility is built into every token I generate.</strong> It's not extra work anymore, it's just how the system works.",
    badge: "WCAG built-in",
    author: "Leo Andersen",
    role: "Accessibility Designer",
    initials: "LA",
    color: AVATAR_COLORS[6],
  },
  {
    quote: "Honestly, the SKILL.md files and custom agents felt like overkill during class. <strong>Two weeks later, they're the most useful thing I've ever set up.</strong> My AI remembers my design system rules across every conversation.",
    badge: "AI with memory",
    author: "Meera Krishnan",
    role: "Senior Product Designer",
    initials: "MK",
    color: AVATAR_COLORS[7],
  },
  {
    quote: "I'm a graphic designer transitioning into product. This bootcamp didn't just teach me design systems — <strong>it gave me the confidence to say 'I can build that'</strong> in interviews.",
    badge: "Career transition",
    author: "Omar Farouk",
    role: "Designer, Career Switcher",
    initials: "OF",
    color: AVATAR_COLORS[8],
  },
  {
    quote: "The refinement technique from Week 1 is something I use daily. <strong>First draft from AI, then three targeted follow-ups, and it's production-ready.</strong> No more 'good enough' outputs.",
    badge: "Production-ready AI",
    author: "Hannah Petrov",
    role: "Product Designer",
    initials: "HP",
    color: AVATAR_COLORS[9],
  },
];

/* ── BC2 Testimonials — AI Design Engineer: From Code to Shipping ──────── */

const BC2_TESTIMONIALS: BootcampTestimonial[] = [
  {
    quote: "I'd never opened a terminal in my life. Four weeks later, <strong>I have a live portfolio on Vercel</strong> that I built myself. I still can't believe that sentence is true.",
    badge: "First deploy",
    author: "Aisha Patel",
    role: "Visual Designer → Design Engineer",
    initials: "AP",
    color: AVATAR_COLORS[0],
  },
  {
    quote: "'Frames are divs. Auto-layout is flexbox.' That one sentence from Week 1 <strong>unlocked code for me.</strong> I'd been overthinking it for years.",
    badge: "Code finally clicked",
    author: "Jaime Rivera",
    role: "UI Designer",
    initials: "JR",
    color: AVATAR_COLORS[1],
  },
  {
    quote: "My developers used to ignore half my redlines. Now I open a PR, point to the Tailwind token, and say <strong>'this is the spec.'</strong> The arguments just stopped.",
    badge: "No more redline fights",
    author: "Diya Sharma",
    role: "Senior Product Designer",
    initials: "DS",
    color: AVATAR_COLORS[2],
  },
  {
    quote: "I thought React was this massive scary thing. Surinder broke it down: <strong>components are Figma components. Props are overrides.</strong> I was building within an hour.",
    badge: "React in 1 hour",
    author: "Noah Fischer",
    role: "Product Designer",
    initials: "NF",
    color: AVATAR_COLORS[3],
  },
  {
    quote: "Deployed my first Next.js site during class. My manager saw it the next morning and asked, <strong>'who built this?'</strong> When I said I did, the conversation about my career trajectory changed.",
    badge: "Career shift",
    author: "Kavitha Sundaram",
    role: "Senior Designer",
    initials: "KS",
    color: AVATAR_COLORS[4],
  },
  {
    quote: "Claude Code + Figma MCP is the workflow I didn't know existed. I design in Figma, <strong>Claude reads my file and generates the component.</strong> The gap between design and code just vanished.",
    badge: "Figma → Code",
    author: "Stefan Bauer",
    role: "UI/UX Designer",
    initials: "SB",
    color: AVATAR_COLORS[5],
  },
  {
    quote: "I used to hand off a Figma file and wait three weeks for a developer. <strong>Now I ship it myself in an afternoon.</strong> That's not an exaggeration.",
    badge: "Ship in hours",
    author: "Amara Okafor",
    role: "Freelance Designer",
    initials: "AO",
    color: AVATAR_COLORS[6],
  },
  {
    quote: "ShadCN components felt like cheating at first, like 'wait, this just works?' <strong>But that's exactly the point.</strong> You don't build from zero. You build from production-ready primitives.",
    badge: "ShadCN convert",
    author: "Lukas Novak",
    role: "Product Designer",
    initials: "LN",
    color: AVATAR_COLORS[7],
  },
  {
    quote: "Tailwind was the missing piece. I kept fighting with CSS files that got longer every week. <strong>Utility classes in markup just made sense</strong> to a designer who thinks visually.",
    badge: "CSS peace of mind",
    author: "Radhika Iyer",
    role: "UI Designer",
    initials: "RI",
    color: AVATAR_COLORS[8],
  },
  {
    quote: "The GitHub commit workflow terrified me before this bootcamp. Now <strong>I push code daily</strong> and review my own diffs. Never thought I'd say that as a designer.",
    badge: "Daily commits",
    author: "Mateo García",
    role: "Product Designer",
    initials: "MG",
    color: AVATAR_COLORS[9],
  },
  {
    quote: "I freelance for early-stage startups. Since graduating, I've landed three projects where the scope was <strong>design AND code.</strong> My rate went up 40% because I deliver both.",
    badge: "+40% rate increase",
    author: "Nina Voronova",
    role: "Freelance Design Engineer",
    initials: "NV",
    color: AVATAR_COLORS[0],
  },
  {
    quote: "Week 3 connecting my Figma tokens to Tailwind config was the 'holy crap' moment. <strong>One source of truth, design and code in sync.</strong> That's what every design system talk promises. This bootcamp actually delivers it.",
    badge: "Tokens in code",
    author: "Arjun Mehta",
    role: "Design Systems Designer",
    initials: "AM",
    color: AVATAR_COLORS[1],
  },
  {
    quote: "I told my team I'd need a month to prototype a landing page. <strong>I finished it in two days</strong> using the Cursor + CRAFT workflow from class. My PM thought I was joking.",
    badge: "2-day prototype",
    author: "Elena Rossi",
    role: "Senior Product Designer",
    initials: "ER",
    color: AVATAR_COLORS[2],
  },
  {
    quote: "I was the designer who always said 'that's a dev problem.' Now I fix CSS bugs myself during stand-up. <strong>My engineers actually respect the collaboration more.</strong>",
    badge: "Dev team respect",
    author: "Raj Kulkarni",
    role: "Lead Product Designer",
    initials: "RK",
    color: AVATAR_COLORS[3],
  },
  {
    quote: "JSX is HTML inside JavaScript. Props are overrides. TypeScript is your safety net. <strong>Surinder makes every concept a Figma analogy</strong> and it just works for how designers think.",
    badge: "Designer-friendly code",
    author: "Yuki Yamamoto",
    role: "UX Designer",
    initials: "YY",
    color: AVATAR_COLORS[4],
  },
  {
    quote: "I've taken two coding bootcamps before and dropped out of both. This one was different because <strong>every exercise started from a Figma design I understood.</strong> The code wasn't abstract anymore.",
    badge: "Actually finished",
    author: "Lucia Fernández",
    role: "Visual Designer",
    initials: "LF",
    color: AVATAR_COLORS[5],
  },
  {
    quote: "Vercel deployment was so fast I thought something was broken. Nope. <strong>My site was live.</strong> My design, my code, real URL. I sent it to everyone I know.",
    badge: "Live URL",
    author: "Ibrahim Hassan",
    role: "Product Designer",
    initials: "IH",
    color: AVATAR_COLORS[6],
  },
  {
    quote: "The class size made all the difference. Surinder watched me code, <strong>caught my mistakes in real time, and explained why.</strong> That's not something a recorded course can do.",
    badge: "Real-time feedback",
    author: "Alina Petrova",
    role: "Junior Designer",
    initials: "AP",
    color: AVATAR_COLORS[7],
  },
  {
    quote: "Went from designer to design engineer in my LinkedIn title. <strong>Got three recruiter messages the same week.</strong> Turns out companies are desperate for people who can do both.",
    badge: "3 recruiter DMs",
    author: "Chen Wei",
    role: "Design Engineer",
    initials: "CW",
    color: AVATAR_COLORS[8],
  },
  {
    quote: "I thought 'designer who codes' was a myth. <strong>Now I have a GitHub repo, a deployed app, and a workflow</strong> that didn't exist a month ago. Four weeks. That's all it took.",
    badge: "Myth → Reality",
    author: "Tara Nair",
    role: "Product Designer",
    initials: "TN",
    color: AVATAR_COLORS[9],
  },
];

/* ── Testimonial map by slug ───────────────────────────────────────────── */

const TESTIMONIALS_BY_SLUG: Record<string, BootcampTestimonial[]> = {
  "ai-mastery-design-system": BC1_TESTIMONIALS,
  "ai-design-code-workflow": BC2_TESTIMONIALS,
};

/* ── Initials Avatar ───────────────────────────────────────────────────── */

function InitialsAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-[14px] font-bold shrink-0 ${color}`}>
      {initials}
    </span>
  );
}

/* ── Stars ──────────────────────────────────────────────────────────────── */

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

/* ── Text Testimonial Card ─────────────────────────────────────────────── */

function TestimonialCard({ testimonial }: { testimonial: BootcampTestimonial }) {
  return (
    <div className="flex flex-col gap-5 bg-card rounded-[32px] p-8">
      <FiveStars />

      <p
        className="text-[15px] leading-relaxed text-foreground"
        dangerouslySetInnerHTML={{ __html: `\u201C${testimonial.quote}\u201D` }}
      />

      <div className="flex items-center gap-2 w-fit bg-[#e6ebdc] rounded-[30px] border border-[#47ab19] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#47ab19] flex-shrink-0" />
        <span className="text-sm font-semibold text-[#47ab19]">
          {testimonial.badge}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <InitialsAvatar initials={testimonial.initials} color={testimonial.color} />
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

/* ── Testimonials Popup ────────────────────────────────────────────────── */

function TestimonialsPopup({
  open,
  onClose,
  testimonials,
}: {
  open: boolean;
  onClose: () => void;
  testimonials: BootcampTestimonial[];
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

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

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[120] m-auto max-w-4xl h-fit max-h-[85vh] w-[calc(100%-48px)] rounded-2xl bg-[#faf9f6] shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            <div className="px-7 py-5 border-b border-[#e8e4d9]">
              <h2 className="text-[20px] font-bold text-foreground tracking-[-0.4px]">
                What Designers Are Saying
              </h2>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.author} testimonial={t} />
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

export default function BootcampTestimonials({
  slug,
}: {
  slug: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const testimonials = TESTIMONIALS_BY_SLUG[slug] ?? BC1_TESTIMONIALS;

  return (
    <section className="py-7 md:py-10">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-start mb-12 md:mb-16">
        {/* Stacked initials avatars */}
        <div className="flex items-center -space-x-3 mb-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <span
              key={t.author}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-[13px] font-bold border-2 border-[#f8f7f4] ${t.color}`}
              style={{ zIndex: 3 - i }}
            >
              {t.initials}
            </span>
          ))}
        </div>

        {/* Star rating badge */}
        <div className="flex items-center gap-2 mb-5">
          <Star className="h-4 w-4 fill-[#D3A70B] text-[#D3A70B]" />
          <span className="text-sm font-medium text-muted-foreground">
            4.98 across 12k+ designers trained
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[26px] md:text-[32px] font-bold text-foreground leading-[1.15] tracking-tight mb-4">
          Trusted by <strong>Designers</strong> Worldwide
        </h2>

        {/* Subtitle */}
        <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-xl">
          Hear from designers who leveled up through this bootcamp.
        </p>
      </div>

      {/* ── Testimonials Grid ─────────────────────────────────────── */}
      <div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t) => (
              <TestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>

          {/* Gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-[55%] bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/80 to-transparent pointer-events-none" />

          {/* View more */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-[14px] border border-input bg-background shadow-sm px-6 py-2.5 text-[13px] font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View more
            </button>
          </div>
        </div>

        <TestimonialsPopup
          open={showAll}
          onClose={() => setShowAll(false)}
          testimonials={testimonials}
        />
      </div>
    </section>
  );
}
