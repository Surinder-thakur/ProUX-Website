// Bootcamp Data & Types

export interface CurriculumPart {
  title: string;
  duration: string;
}

export interface CurriculumWeek {
  week: number;
  classNumber: number;
  title: string;
  parts: CurriculumPart[];
  homework?: string;
  deliverable?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LearningOutcome {
  number: string;
  title: string;
  description: string;
}

export interface AudiencePersona {
  number: number;
  role: string;
  description: string;
}

export interface PricingTierData {
  price: number;
  priceInr: number;
  deadline: string; // ISO date "2026-03-20T23:59:59"
}

export interface PricingTiers {
  earlyBird: PricingTierData;
  standard: PricingTierData;
  lastCall: { price: number; priceInr: number }; // full price, no deadline (uses startDateISO)
}

export interface BootcampModule {
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  classCount: number;
  hoursLive: number;
  story: string;
  gradient: string;
  image: string;
  startDate: string; // Display string e.g. "Apr 1"
  startDateISO: string; // ISO date "2026-04-01"
  pricingTiers: PricingTiers;
  walkAwayWith: string;
  idealFor: string;
  outcomes: LearningOutcome[];
  audience: AudiencePersona[];
  curriculum: CurriculumWeek[];
  deliverables: string[];
  faqs: FaqEntry[];
}

// ── Pricing Tier Utilities ──────────────────────────────────────────────

export type TierName = "earlyBird" | "standard" | "lastCall" | "closed";

export interface ActiveTier {
  name: TierName;
  label: string;
  price: number;
  priceInr: number;
  fullPrice: number;
  discount: number; // percentage off full price
  deadline: Date | null;
  dotColor: "emerald" | "amber" | "red";
}

export function getActiveTier(mod: BootcampModule): ActiveTier {
  const now = new Date();
  const { earlyBird, standard, lastCall } = mod.pricingTiers;
  const fullPrice = lastCall.price;
  const startDate = new Date(mod.startDateISO);

  const earlyEnd = new Date(earlyBird.deadline);
  if (now <= earlyEnd) {
    return {
      name: "earlyBird",
      label: "Early Bird",
      price: earlyBird.price,
      priceInr: earlyBird.priceInr,
      fullPrice,
      discount: Math.round(((fullPrice - earlyBird.price) / fullPrice) * 100),
      deadline: earlyEnd,
      dotColor: "emerald",
    };
  }

  const standardEnd = new Date(standard.deadline);
  if (now <= standardEnd) {
    return {
      name: "standard",
      label: "Standard Enrollment",
      price: standard.price,
      priceInr: standard.priceInr,
      fullPrice,
      discount: Math.round(((fullPrice - standard.price) / fullPrice) * 100),
      deadline: standardEnd,
      dotColor: "amber",
    };
  }

  if (now <= startDate) {
    return {
      name: "lastCall",
      label: "Last Call",
      price: fullPrice,
      priceInr: lastCall.priceInr,
      fullPrice,
      discount: 0,
      deadline: startDate,
      dotColor: "red",
    };
  }

  return {
    name: "closed",
    label: "Enrollment Closed",
    price: fullPrice,
    priceInr: lastCall.priceInr,
    fullPrice,
    discount: 0,
    deadline: null,
    dotColor: "red",
  };
}

export type TierStatus = "active" | "upcoming" | "ended";

export interface TierInfo {
  name: TierName;
  label: string;
  price: number;
  discount: number;
  dateRange: string; // e.g. "Ends Mar 20" or "Mar 21 – Mar 30"
  status: TierStatus;
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function getAllTiersInfo(mod: BootcampModule): TierInfo[] {
  const now = new Date();
  const { earlyBird, standard, lastCall } = mod.pricingTiers;
  const fullPrice = lastCall.price;

  const earlyEnd = new Date(earlyBird.deadline);
  const standardEnd = new Date(standard.deadline);

  const earlyStatus: TierStatus = now <= earlyEnd ? "active" : "ended";
  const standardStatus: TierStatus =
    now <= earlyEnd ? "upcoming" : now <= standardEnd ? "active" : "ended";
  const lastCallStatus: TierStatus =
    now <= standardEnd ? "upcoming" : "active";

  return [
    {
      name: "earlyBird",
      label: "Early Bird",
      price: earlyBird.price,
      discount: Math.round(((fullPrice - earlyBird.price) / fullPrice) * 100),
      dateRange: `Ends ${formatShortDate(earlyEnd)}`,
      status: earlyStatus,
    },
    {
      name: "standard",
      label: "Standard",
      price: standard.price,
      discount: Math.round(((fullPrice - standard.price) / fullPrice) * 100),
      dateRange: `${formatShortDate(addDays(earlyEnd, 1))} \u2013 ${formatShortDate(standardEnd)}`,
      status: standardStatus,
    },
    {
      name: "lastCall",
      label: "Last Call",
      price: fullPrice,
      discount: 0,
      dateRange: "Final 72 hours",
      status: lastCallStatus,
    },
  ];
}

// ── Constants ───────────────────────────────────────────────────────────

export const BUNDLE_PRICE_USD = 699;
export const BUNDLE_PRICE_INR = 57900;
export const BUNDLE_ORIGINAL_USD = 1185; // 3 x $395
export const BUNDLE_SAVINGS_USD = 486; // 1185 - 699

export const TRUST_STATS = [
  { value: "12", label: "Classes" },
  { value: "12", label: "Hours Live" },
  { value: "12", label: "Per Cohort" },
  { value: "2", label: "Time Zones (US & EU)" },
];

export const INSTRUCTOR = {
  name: "Surinder Thakur",
  title: "NN/g Certified UX Consultant",
  credentials: ["proux.design", "surinder.design"],
  quoteShort:
    "Tool knowledge expires every 6 months. Methodology compounds forever.",
  quoteLong:
    "Most AI courses teach tools. This bootcamp teaches a methodology. Tool knowledge expires every 6 months. Methodology compounds forever.",
};

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose Bootcamp",
    description: "Each bootcamp is standalone. Take one or all three.",
  },
  {
    step: 2,
    title: "Pick Your Track",
    description:
      "Track A: India/Asia/Europe evenings. Track B: Americas evenings.",
  },
  {
    step: 3,
    title: "Learn Weekly",
    description:
      "1 class/week for 4 weeks. 60-min live sessions + 2-3 hours homework.",
  },
  {
    step: 4,
    title: "Ship & Certify",
    description:
      "Walk away with real deliverables and a Certificate of Completion.",
  },
];

export const QUICK_FACTS = [
  "4 live classes, 60 min each",
  "4 hours total instruction",
  "Capped at 12 students per track",
  "Rolling monthly enrollment",
  "Certificate of Completion",
];

// ── Module Data ─────────────────────────────────────────────────────────

const modules: BootcampModule[] = [
  {
    slug: "ai-mastery-design-system",
    title: "AI Mastery + Design System",
    tagline:
      "Build a design system that AI tools actually understand.",
    badge: "Best for Getting Started",
    classCount: 4,
    hoursLive: 4,
    gradient: "from-[hsl(var(--gold-200))] to-[hsl(var(--gold-100))]",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&q=80",
    startDate: "Apr 1",
    startDateISO: "2026-04-01",
    pricingTiers: {
      earlyBird: { price: 245, priceInr: 20300, deadline: "2026-03-12T23:59:59" },
      standard: { price: 295, priceInr: 24500, deadline: "2026-03-28T23:59:59" },
      lastCall: { price: 395, priceInr: 32800 },
    },
    story:
      "You've been using ChatGPT for a year. You type vague prompts, get vague outputs, and conclude AI is overhyped. But you've seen others get stunning results. The difference isn't the AI, it's the human. This module makes you the human who gets stunning results.",
    walkAwayWith:
      "Prompt mastery, custom AI agents, SKILL.md files, and a production-ready AI-readable Figma design system.",
    idealFor:
      "Any designer frustrated by mediocre AI outputs. Designers who want a structured design system.",
    outcomes: [
      {
        number: "01",
        title: "Master the Prompt Framework",
        description:
          "Learn our 5-part prompt structure (Role, Task, Context, Constraints, Format) that turns Claude from a toy into a strategic partner. Build multi-step prompt chains and negative prompts.",
      },
      {
        number: "02",
        title: "Build Custom AI Agents",
        description:
          "Create pre-configured Claude personas like a UX Research Analyst or a Design Critic, each with specific expertise and methodology. Chain agents for end-to-end workflows.",
      },
      {
        number: "03",
        title: "Create SKILL.md Files",
        description:
          "Encode your exact process, standards, and best practices into structured documents that teach AI your methodology. SKILL.md + Agent + Project = an AI that works like you.",
      },
      {
        number: "04",
        title: "Build an AI-Readable Figma Design System",
        description:
          "Structure design tokens, Auto Layout components, and naming conventions so Claude Code, MCP, and any AI tool can read your components directly.",
      },
    ],
    audience: [
      {
        number: 1,
        role: "Frustrated AI User",
        description:
          "Designers frustrated by mediocre AI outputs who want to level up.",
      },
      {
        number: 2,
        role: "Design System Builder",
        description:
          "Anyone who wants a structured, AI-readable design system.",
      },
      {
        number: 3,
        role: "Design Engineer",
        description:
          "Design engineers building an AI-powered workflow from scratch.",
      },
    ],
    curriculum: [
      {
        week: 1,
        classNumber: 1,
        title: "Prompt Structures & the Prompt Framework",
        parts: [
          {
            title: "The Design Engineer Landscape + Why Claude",
            duration: "20 min",
          },
          {
            title:
              "The Prompt Framework: Role, Task, Context, Constraints, Format",
            duration: "40 min",
          },
          {
            title: "Claude Projects: Persistent AI Workspaces",
            duration: "30 min",
          },
        ],
        homework:
          "Rebuild 3 past prompts using the framework. Set up Claude Project.",
      },
      {
        week: 2,
        classNumber: 2,
        title: "Custom Agents & SKILL.md Files",
        parts: [
          {
            title: "Custom Agents: Building Your AI Workforce",
            duration: "40 min",
          },
          {
            title: "SKILL.md Files: Teaching AI Your Methodology",
            duration: "35 min",
          },
        ],
        homework: "Complete 4 custom agents + 2 SKILL.md files.",
      },
      {
        week: 3,
        classNumber: 3,
        title: "AI Design System in Figma",
        parts: [
          {
            title: "Building an AI-Powered Design System",
            duration: "40 min",
          },
          {
            title: "Claude-Powered Design System Audit",
            duration: "30 min",
          },
          { title: "Token Architecture Workshop", duration: "20 min" },
        ],
        homework:
          "Complete Figma design system. Pass 10-point health checklist.",
      },
      {
        week: 4,
        classNumber: 4,
        title: "Design System Polish, Showcase & Wrap",
        parts: [
          {
            title:
              "Advanced Design System Patterns: responsive tokens, dark mode",
            duration: "30 min",
          },
          {
            title: "Lightning Showcase: every student presents",
            duration: "40 min",
          },
          { title: "Module Wrap + Expert Feedback", duration: "20 min" },
        ],
      },
    ],
    deliverables: [
      "Prompt Portfolio (prompts, chains, negative prompts)",
      "4 Custom Claude Agents",
      "2+ SKILL.md Files",
      "AI-Readable Figma Design System + Audit Report",
      "Design System Readiness Report (10-point score)",
    ],
    faqs: [
      {
        question: "Do I need to take all 3 modules?",
        answer:
          "No. Each module is standalone. All three together are a career transformation, but each works independently.",
      },
      {
        question: "What tools do I need?",
        answer:
          "A Claude Pro account and Figma. That's it, no coding required for this module.",
      },
      {
        question: "What's the class size?",
        answer:
          "Cohorts are capped at 12 students per track. Every student presents and gets feedback.",
      },
      {
        question: "What time zone options are available?",
        answer:
          "Two parallel tracks: Track A for India/Asia/Europe evenings, Track B for Americas evenings. Choose at enrollment.",
      },
      {
        question: "What if I miss a class?",
        answer:
          "All classes are recorded and shared within 24 hours. You can catch up asynchronously, but live attendance is strongly recommended for the interactive exercises.",
      },
    ],
  },
  {
    slug: "ai-design-code-workflow",
    title: "AI Design-Code Workflow",
    tagline: "Ship your designs to production without a developer.",
    badge: "Design-to-Code",
    classCount: 4,
    hoursLive: 4,
    gradient: "from-[hsl(var(--brown-100))] to-[hsl(var(--gold-100))]",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80",
    startDate: "Apr 3",
    startDateISO: "2026-04-03",
    pricingTiers: {
      earlyBird: { price: 245, priceInr: 20300, deadline: "2026-03-14T23:59:59" },
      standard: { price: 295, priceInr: 24500, deadline: "2026-03-30T23:59:59" },
      lastCall: { price: 395, priceInr: 32800 },
    },
    story:
      "You've designed beautiful interfaces that sit in Figma forever, waiting for a developer who never comes. Or worse, they ship something that looks nothing like your design. This module gives you the power to ship your own designs as real, deployed websites.",
    walkAwayWith:
      "A live deployed website on Vercel. Your Figma design with a real URL, design system merged into code.",
    idealFor:
      "Designers tired of the developer bottleneck. Freelancers who want to deliver code, not just mockups.",
    outcomes: [
      {
        number: "01",
        title: "Set Up Your Dev Environment",
        description:
          "GitHub, Claude Code, VS Code, Cursor: the complete stack. Scaffold a Next.js + Tailwind + shadcn/ui project with a single AI instruction.",
      },
      {
        number: "02",
        title: "Master the Figma-to-Code Workflow",
        description:
          "The Describe-Build-Read-Refine loop. Drag Figma screenshots into Claude Code, describe design intent, get working code, refine with precise feedback.",
      },
      {
        number: "03",
        title: "Build Real Interfaces with Tailwind + shadcn/ui",
        description:
          "CSS mental models for designers. Claude Code for scaffolding, Cursor for refinement. The iteration rhythm: Figma to Claude Code to Browser to Cursor, repeat.",
      },
      {
        number: "04",
        title: "Deploy, Configure CLAUDE.md + MCP, and Merge Your Design System",
        description:
          "Deploy on Vercel. Write CLAUDE.md for project memory. Connect Figma via MCP. Merge design tokens into Tailwind config. Achieve design-code parity.",
      },
    ],
    audience: [
      {
        number: 1,
        role: "Bottlenecked Designer",
        description:
          "Designers tired of waiting for developers to ship their work.",
      },
      {
        number: 2,
        role: "Full-Stack Freelancer",
        description:
          "Freelancers who want to deliver code, not just mockups.",
      },
      {
        number: 3,
        role: "Independent Shipper",
        description:
          "Design engineers who want to ship independently without a dev team.",
      },
    ],
    curriculum: [
      {
        week: 1,
        classNumber: 5,
        title: "Setup: GitHub, Claude Code & Your First Build",
        parts: [
          { title: "Your Development Environment", duration: "20 min" },
          {
            title: "Claude Code: Your AI Engineering Partner",
            duration: "30 min",
          },
          {
            title: "Figma-to-Code: The Core Workflow",
            duration: "40 min",
          },
        ],
        homework:
          "Build your portfolio landing page. Push to GitHub.",
      },
      {
        week: 2,
        classNumber: 6,
        title: "Cursor + Tailwind + shadcn/ui",
        parts: [
          {
            title: "CSS Mental Models for Designers",
            duration: "20 min",
          },
          {
            title: "Cursor: The AI Code Editor for Designers",
            duration: "20 min",
          },
          {
            title: "Component Building with shadcn/ui",
            duration: "35 min",
          },
        ],
        homework: "Build 2+ full pages. Push to GitHub.",
      },
      {
        week: 3,
        classNumber: 7,
        title: "Deployment, CLAUDE.md, MCP & Design System Merge",
        parts: [
          { title: "Deploying to Vercel", duration: "15 min" },
          {
            title: "CLAUDE.md: Project Memory",
            duration: "25 min",
          },
          {
            title: "MCP + Design System Merge",
            duration: "50 min",
          },
        ],
        homework:
          "Complete design system merge. Deploy final version.",
      },
      {
        week: 4,
        classNumber: 8,
        title: "Responsive Design, Dark Mode & Production Polish",
        parts: [
          {
            title: "Responsive Design for Designers",
            duration: "35 min",
          },
          {
            title: "Dark Mode & Visual Polish",
            duration: "30 min",
          },
          {
            title: "Code Literacy, Debugging & Final Deploy",
            duration: "25 min",
          },
        ],
        deliverable:
          "Live URL + GitHub repo + CLAUDE.md + merged design system.",
      },
    ],
    deliverables: [
      "Deployed Portfolio Website (live Vercel URL)",
      "GitHub Repository + CLAUDE.md Configuration",
      "Merged Design System (Figma to Code via MCP)",
      "Responsive + Dark Mode Production Build",
    ],
    faqs: [
      {
        question: "Do I need coding experience?",
        answer:
          "No. This module is designed for designers with zero coding experience. You'll use AI tools to write and manage code. The module teaches you the workflow, not programming.",
      },
      {
        question: "What if I only take this module standalone?",
        answer:
          "A free Starter Pack is included: a 15-min video covering the essentials from Module 1 so you can hit the ground running.",
      },
      {
        question: "What tools do I need?",
        answer:
          "Claude Pro account, Figma, Node.js, GitHub account, VS Code, and Cursor. We provide setup guides for everything.",
      },
      {
        question: "What's the class size?",
        answer:
          "Cohorts are capped at 12 students per track. Every student presents and gets feedback.",
      },
      {
        question: "What time zone options are available?",
        answer:
          "Two parallel tracks: Track A for India/Asia/Europe evenings, Track B for Americas evenings. Choose at enrollment.",
      },
    ],
  },
  {
    slug: "ai-ux-strategic-thinking",
    title: "AI UX Strategic Thinking",
    tagline:
      "Validate every design decision from research to proof.",
    badge: "No Coding Skills Needed",
    classCount: 4,
    hoursLive: 4,
    gradient: "from-[hsl(var(--blue-100))] to-[hsl(var(--gold-100))]",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop&q=80",
    startDate: "May 6",
    startDateISO: "2026-05-06",
    pricingTiers: {
      earlyBird: { price: 245, priceInr: 20300, deadline: "2026-03-16T23:59:59" },
      standard: { price: 295, priceInr: 24500, deadline: "2026-05-02T23:59:59" },
      lastCall: { price: 395, priceInr: 32800 },
    },
    story:
      "You've designed beautiful experiences, but when leadership asks 'how do you know this works?' you freeze. This module gives you the methodology to prove impact with evidence, not opinions. AI-powered research sprints, testable hypotheses, and validation cycles.",
    walkAwayWith:
      "A complete research-to-validation cycle: competitive analysis, testable hypotheses, user testing results, and iteration evidence.",
    idealFor:
      "Designers who want to prove business impact. Researchers who want AI-powered workflows. No code skills required.",
    outcomes: [
      {
        number: "01",
        title: "Run AI-Powered Research Sprints",
        description:
          "Complete a 5-activity research sprint in 60 minutes: market scan, competitor deep-dive, pattern analysis, gap identification, opportunity mapping.",
      },
      {
        number: "02",
        title: "Build Competitive Briefs, Personas & Journey Maps",
        description:
          "Run complete competitive audits. Generate rich behavioral personas. Map emotional peaks, pain points, and opportunity moments, all AI-assisted.",
      },
      {
        number: "03",
        title: "Form and Stress-Test Hypotheses",
        description:
          "Transform research findings into testable hypotheses using the framework: If we [decision], then [behavior] will [outcome], because [evidence]. Use Claude to poke holes in your own logic.",
      },
      {
        number: "04",
        title: "Validate with Real Users and Iterate with Evidence",
        description:
          "Test on deployed prototypes or Figma prototypes. 5 users, 3 tasks, 15 minutes each. Document every iteration from problem to hypothesis to evidence to decision to outcome.",
      },
    ],
    audience: [
      {
        number: 1,
        role: "Impact-Driven Designer",
        description:
          "Designers who want to prove business impact with evidence, not opinions.",
      },
      {
        number: 2,
        role: "Senior Design Engineer",
        description:
          "Senior designers interviewing for design engineer roles who need strategic depth.",
      },
      {
        number: 3,
        role: "UX Researcher",
        description:
          "UX Researchers who want AI-powered workflows for faster, deeper insights.",
      },
    ],
    curriculum: [
      {
        week: 1,
        classNumber: 9,
        title: "AI Research Sprints: Competitive Analysis & Findings",
        parts: [
          {
            title: "The ProUX Research Sprint Framework",
            duration: "25 min",
          },
          {
            title: "AI-Powered Competitive Analysis: Live Demo",
            duration: "35 min",
          },
          {
            title: "User Research & Persona Generation",
            duration: "30 min",
          },
        ],
        homework:
          "Complete research sprint. Competitive brief + 2 personas + journey map.",
      },
      {
        week: 2,
        classNumber: 10,
        title: "Audit Reports, Hypotheses & Research Synthesis",
        parts: [
          {
            title: "Running AI-Powered Design Audits",
            duration: "30 min",
          },
          {
            title: "From Findings to Testable Hypotheses",
            duration: "35 min",
          },
          {
            title: "Research Synthesis & Test Planning",
            duration: "25 min",
          },
        ],
        homework:
          "Finalize research package. Prepare test prototype. Write test script.",
      },
      {
        week: 3,
        classNumber: 11,
        title: "User Testing on Hypotheses + Iteration",
        parts: [
          {
            title: "Testing Hypotheses with Prototypes",
            duration: "35 min",
          },
          {
            title: "The Iteration Sprint: Fix, Refine, Validate",
            duration: "40 min",
          },
          { title: "Prepare Your Showcase", duration: "15 min" },
        ],
        homework:
          "Complete Design Decision Brief. Finalize deliverables.",
      },
      {
        week: 4,
        classNumber: 12,
        title: "Final Showcase + Graduation",
        parts: [
          {
            title: "Student Presentations: 3-min lightning demos",
            duration: "50 min",
          },
          {
            title: "Expert Feedback + Career Positioning",
            duration: "25 min",
          },
          { title: "Graduation & Community", duration: "15 min" },
        ],
        deliverable:
          "Complete research-to-validation portfolio package.",
      },
    ],
    deliverables: [
      "Competitive Findings Brief + 2 Personas + Journey Map",
      "UX Audit Report + Hypothesis Registry (3+ hypotheses)",
      "User Testing Results + Design Decision Brief",
    ],
    faqs: [
      {
        question: "Do I need coding skills?",
        answer:
          "No. This module focuses on research, strategy, and validation. No code required. You can use Figma prototypes or any deployed prototype for testing.",
      },
      {
        question: "What if I only take this module standalone?",
        answer:
          "A free Starter Pack is included: a 15-min video covering the essentials from earlier modules so you have the context you need.",
      },
      {
        question: "What tools do I need?",
        answer:
          "A Claude Pro account and Figma (or a deployed prototype for user testing). No other tools required.",
      },
      {
        question: "What's the class size?",
        answer:
          "Cohorts are capped at 12 students per track. Every student presents and gets feedback.",
      },
      {
        question: "What time zone options are available?",
        answer:
          "Two parallel tracks: Track A for India/Asia/Europe evenings, Track B for Americas evenings. Choose at enrollment.",
      },
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────

export function getAllBootcamps(): BootcampModule[] {
  return modules;
}

export function getBootcampBySlug(slug: string): BootcampModule | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getAllBootcampSlugs(): string[] {
  return modules.map((m) => m.slug);
}
