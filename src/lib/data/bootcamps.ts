// Bootcamp Data & Types

export interface CurriculumPart {
  title: string;
  duration: string;
  description?: string;
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
  razorpayId?: string;
}

export interface PricingTiers {
  earlyBird: PricingTierData;
  standard: PricingTierData;
  lastCall: { price: number; priceInr: number; razorpayId?: string }; // full price, no deadline (uses startDateISO)
}

export interface BootcampModule {
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  heroTag: string;
  heroHeadline: string;
  heroSubheadline: string;
  classCount: number;
  hoursLive: number;
  story: string;
  gradient: string;
  image: string;
  certificateImage?: string;
  startDate: string; // Display string e.g. "Apr 1"
  startDateISO: string; // ISO date "2026-04-01"
  upcoming?: boolean;
  trackA?: { day: string; time: string };
  trackB?: { day: string; time: string };
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
  razorpayId?: string;
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
      razorpayId: earlyBird.razorpayId,
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
      razorpayId: standard.razorpayId,
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
      razorpayId: lastCall.razorpayId,
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
    razorpayId: lastCall.razorpayId,
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

export const BUNDLE_RAZORPAY_ID = "pl_SQdL0RlDQ2qr31";
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
      "1 class/week for 4 weeks. 90-min live sessions + 2-3 hours homework.",
  },
  {
    step: 4,
    title: "Ship & Certify",
    description:
      "Walk away with real deliverables and a Certificate of Completion.",
  },
];

export const QUICK_FACTS = [
  "4 live classes, 90 min each",
  "6 hours total instruction",
  "12 students per track",
  "Certificate of Completion",
];

export const BUNDLE_HOURS = 18;

// ── Module Data ─────────────────────────────────────────────────────────

const modules: BootcampModule[] = [
  {
    slug: "ai-mastery-design-system",
    title: "AI Prompts & Design System Foundations",
    tagline:
      "Master prompt frameworks. Build a production-ready design system in Figma. A single source of truth that every developer, every AI tool, and every team member can understand.",
    badge: "Best for Getting Started",
    heroTag: "No AI experience? That's exactly why you're here.",
    heroHeadline: "AI Won't Replace You.\nA Designer Who Masters It Will.",
    heroSubheadline: "4 live classes. One prompt framework. Stop experimenting. Start shipping.",
    classCount: 4,
    hoursLive: 6,
    gradient: "from-[hsl(var(--gold-200))] to-[hsl(var(--gold-100))]",
    image: "/images/bc1.jpg",
    certificateImage: "/images/certificate.jpg",
    startDate: "Apr 6",
    startDateISO: "2026-04-06",
    trackA: { day: "Mondays", time: "8:00 \u2013 9:30 PM IST" },
    pricingTiers: {
      earlyBird: { price: 245, priceInr: 20300, deadline: "2026-03-23T23:59:59", razorpayId: "pl_SQNWPdh5L4Gf5w" },
      standard: { price: 295, priceInr: 24500, deadline: "2026-04-02T23:59:59", razorpayId: "pl_SQczj7yp64OuZ0" },
      lastCall: { price: 395, priceInr: 32800, razorpayId: "pl_SQd2e6AqkjdZon" },
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
        title: "Master AI Prompting for Design",
        description:
          "Learn CRAFT, the one framework behind every prompt in this bootcamp. Then go deeper with specialist frameworks for research, critique, and iteration. By the end of Week 1, you\u2019re not guessing what to type into AI. You know exactly how to structure a prompt and refine the output until it\u2019s production-ready.",
      },
      {
        number: "02",
        title: "Build a Complete Token System with AI",
        description:
          "Generate color palettes, type scales, spacing systems, and shadow tokens, all with WCAG contrast and full dark mode support baked in from the start. Your AI agents do the heavy lifting. You make the design decisions.",
      },
      {
        number: "03",
        title: "Bring Tokens into Figma as Live Variables",
        description:
          "Take everything AI generated and import it into Figma as native Variables with a single workflow. Then connect to Figma Make to generate live documentation that updates itself. Change a token, the docs follow. No more stale handoff files.",
      },
      {
        number: "04",
        title: "Generate Production Components and Ship",
        description:
          "Describe a component. Figma Make builds it using your Variables. Button, Card, Input, each one faster than the last. Assemble them into a real page, test light and dark mode, and hand the whole system off with tokens exported as CSS, Tailwind, and TypeScript.",
      },
    ],
    audience: [
      {
        number: 1,
        role: "UX/Product Designer",
        description:
          "You use AI daily but get inconsistent results. You want a repeatable prompt system, not random experiments.",
      },
      {
        number: 2,
        role: "Design System Creator",
        description:
          "You want to build a structured Figma design system that AI tools like Claude Code and MCP can actually read and use.",
      },
      {
        number: 3,
        role: "Future AI Design Engineer",
        description:
          "You're a solid designer ready to add prompt engineering, custom agents, and AI workflows to your skillset.",
      },
    ],
    curriculum: [
      {
        week: 1,
        classNumber: 1,
        title: "Master AI as a Design Skill",
        parts: [
          {
            title: "The AI Shift + Why Prompting Is a Design Skill",
            duration: "30 min",
            description: "The tools changed. You\u2019ll see exactly what a well-structured prompt produces versus a vague one, and why the gap between the two is the biggest career advantage a designer can have right now.",
          },
          {
            title: "The CRAFT Framework + Prompting Frameworks That Work",
            duration: "30 min",
            description: "Context, Role, Artifact, Feel, Tech. One framework for every prompt you\u2019ll write in this bootcamp. You\u2019ll also learn when CRAFT isn\u2019t the best fit and which specialist frameworks to reach for instead.",
          },
          {
            title: "Your AI Workspace: Claude Projects & Custom Agents",
            duration: "30 min",
            description: "Set up a Claude Project that remembers your design system rules across every conversation. Build custom agents tailored to your workflow and learn a refinement technique that turns rough AI output into production-ready results. Week 2 goes fast because you did this.",
          },
        ],
      },
      {
        week: 2,
        classNumber: 2,
        title: "Build Your Complete Token System",
        parts: [
          {
            title: "Color Tokens: From Brand Brief to Dark Mode",
            duration: "30 min",
            description: "Primitives, semantics, status colors, and a complete light-to-dark mapping with WCAG contrast baked into every prompt. Your agents generate, audit, and refine until the output is clean. This is where the system starts to feel real.",
          },
          {
            title: "Typography, Spacing & Shadows",
            duration: "30 min",
            description: "Your type scale, unified spacing system, and shadow tokens, all generated with the same pipeline. By the end of this class you have four complete token categories and dark mode support ready for Figma.",
          },
          {
            title: "From AI Output to Live Figma Variables",
            duration: "30 min",
            description: "Take your AI-generated tokens and bring them into Figma as native Variables with a single import workflow. Color, typography, spacing, shadows, light mode and dark mode. Change one value and every token that references it updates instantly.",
          },
        ],
      },
      {
        week: 3,
        classNumber: 3,
        title: "Live Documentation & Governance",
        parts: [
          {
            title: "Generate Live Documentation with Figma Make",
            duration: "45 min",
            description: "Publish your Variables, connect to Figma Make, and generate documentation for every token category. Update a token and the docs update automatically. No more stale wikis or PDFs that are wrong by Tuesday.",
          },
          {
            title: "Governance, Changelogs & a System That Stays Alive",
            duration: "45 min",
            description: "The difference between a design system that thrives and one that dies in six months? One page of governance rules. Build contribution workflows, deprecation timelines, and changelogs that your AI agents validate before anything ships.",
          },
        ],
      },
      {
        week: 4,
        classNumber: 4,
        title: "Components, Pages & a Ready-to-Use System",
        parts: [
          {
            title: "Generate Production Components with Figma Make",
            duration: "30 min",
            description: "Describe a Button. Figma Make builds it using your Variables. Every variant, every state, every token binding. Then Card. Then Input. Each one faster than the last. Accessibility and dark mode come free because they\u2019re already in your tokens.",
          },
          {
            title: "Build a Real Page: Your System\u2019s Moment of Truth",
            duration: "30 min",
            description: "Compose your components into a complete web page. Light mode, dark mode, no manual overrides. If it works in both modes, your design system is production-ready. This is the moment everything clicks.",
          },
          {
            title: "Developer Handover & Showcase",
            duration: "30 min",
            description: "Tokens exported as CSS, Tailwind, and TypeScript. A complete handover package: prompt library, custom agents, full token architecture, production components, real pages, and live documentation. A single source of truth that every developer and AI tool can read. Four weeks ago it started with \u201Ccreate a color palette.\u201D Now it\u2019s a system built to scale.",
          },
        ],
      },
    ],
    deliverables: [
      "CRAFT Prompt Framework + Custom AI Agents",
      "Complete Token System (color, type, spacing, shadows + dark mode)",
      "Production Figma Design System with Live Variables",
      "Live Documentation via Figma Make",
      "Production Components + Developer Handover (CSS, Tailwind, TypeScript)",
    ],
    faqs: [
      {
        question: "Do I need any coding or technical experience?",
        answer:
          "Not at all. This bootcamp runs entirely inside Figma and Claude. No terminal, no code editor, no command line. If you\u2019ve designed in Figma before, you\u2019re ready.",
      },
      {
        question: "What tools do I need before starting?",
        answer:
          "A Figma account and a Claude Pro subscription. That\u2019s it. We cover everything else in Session 01.",
      },
      {
        question: "Do I need to know about design systems already?",
        answer:
          "No. We start from first principles. Whether you\u2019ve never built a design system or you\u2019ve maintained one for years, the AI-first approach we teach is different from anything you\u2019ve done before.",
      },
      {
        question: "What\u2019s the class size and format?",
        answer:
          "Capped at 12 students. Sessions run every Monday at 8:00 PM IST, starting April 6th. Each session is 90 to 120 minutes, live and interactive. You build alongside the group, present your work, and get real-time feedback. This is not a webinar.",
      },
      {
        question: "What if I miss a live session?",
        answer:
          "Sessions are not recorded, but you\u2019ll receive the full session materials, presentation decks, and detailed content documents after every class. These cover everything discussed and are designed for you to follow along on your own. That said, live attendance is where the real learning happens.",
      },
      {
        question: "What will I actually walk away with?",
        answer:
          "A complete, working design system that you built yourself from scratch using AI. Not a template. Not a starter file. Something you understand inside and out because you made every decision along the way.",
      },
      {
        question: "Do I need to take Bootcamp 2 after this?",
        answer:
          "No. Bootcamp 1 is fully standalone. Your design system is complete and handover-ready by the end of Week 4. Bootcamp 2 starts Wednesday, April 8th if you want to take that system into code and ship a live product, but it\u2019s entirely optional.",
      },
    ],
  },
  {
    slug: "ai-design-code-workflow",
    title: "AI Design Engineer: From Code to Shipping",
    tagline: "Get comfortable with code so you can design, build, and ship real products. Deploy a real application in 4 weeks.",
    badge: "Design-to-Code",
    heroTag: "Bridge the Gap — Design to Production",
    heroHeadline: "Stop Handing Off.\nStart Shipping.",
    heroSubheadline: "In 6 live hours, learn how to turn Figma designs into production-ready code using AI — no developer required.",
    classCount: 4,
    hoursLive: 6,
    gradient: "from-[hsl(var(--brown-100))] to-[hsl(var(--gold-100))]",
    image: "/images/bc2.jpg",
    certificateImage: "/images/certificate-b2.jpg",
    startDate: "Apr 8",
    startDateISO: "2026-04-08",
    trackA: { day: "Wednesdays", time: "8:00 \u2013 9:30 PM IST" },
    pricingTiers: {
      earlyBird: { price: 245, priceInr: 20300, deadline: "2026-03-25T23:59:59", razorpayId: "pl_SQdEczsOcM3m7L" },
      standard: { price: 295, priceInr: 24500, deadline: "2026-04-04T23:59:59", razorpayId: "pl_SQd1WALX4aOBDS" },
      lastCall: { price: 395, priceInr: 32800, razorpayId: "pl_SQd3mor0KhVh9O" },
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
        title: "Write Code Through a Designer\u2019s Eyes",
        description:
          "Frames are divs. Auto-layout is flexbox. Fill and hug are width rules. You already know more code than you think. Start with HTML and CSS, map every concept back to Figma, and use your prompting skills from Bootcamp 1 to generate accurate code on your first try.",
      },
      {
        number: "02",
        title: "Think and Build in React Components",
        description:
          "Learn why components exist in code the same way they exist in Figma: one source, every instance updates. Build your first React components from your own designs, pass data into them, and use AI to generate and refine entire interfaces from a prompt.",
      },
      {
        number: "03",
        title: "Connect Your Design System to Production Code",
        description:
          "Your Figma Variables become real code. Customize Tailwind to match your tokens, then use Claude Code and Figma MCP to run the workflow real teams use: design to code to browser, with the gap between the two completely gone.",
      },
      {
        number: "04",
        title: "Deploy a Live Application",
        description:
          "Scaffold a real project with Next.js and ShadCN. Build your first live web page using everything from the past three weeks: React components, Tailwind tokens, and your Bootcamp 1 design system. Deploy to Vercel and share the link. Four weeks ago you\u2019d never written code. Now you have a live URL.",
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
        title: "Your First Lines of Code",
        parts: [
          {
            title: "Environment Setup: Cursor, GitHub & Your First Commit",
            duration: "30 min",
            description: "Install Cursor, create your GitHub repo, and push your first commit, all in one session. By the end you have a working development environment and the confidence to navigate it on your own.",
          },
          {
            title: "HTML & CSS Through a Designer\u2019s Eyes",
            duration: "30 min",
            description: "Frames are divs. Auto-layout is flexbox. Fill and hug are width rules. You already know more code than you think. Write a real page layout from scratch, then use DevTools to see how every site you\u2019ve admired is built the same way.",
          },
          {
            title: "AI-Assisted Coding: Bootcamp 1 Meets Code",
            duration: "30 min",
            description: "Your prompting skills work in code too, but the rules are different. Learn how coding prompts differ from design prompts, and use CRAFT inside Cursor to generate accurate code on your first try. This is where \u201Cdesigner who can prompt\u201D becomes \u201Cdesigner who can build.\u201D",
          },
        ],
      },
      {
        week: 2,
        classNumber: 6,
        title: "Think in Components",
        parts: [
          {
            title: "Why Components Exist (And Why Copy-Pasting Doesn\u2019t)",
            duration: "30 min",
            description: "One nav bar. Twelve pages. Then the logo changes. Components solve this the same way Figma components do: one source, every instance updates. Same concept you already know, new syntax.",
          },
          {
            title: "JSX, Props & Your First React Component",
            duration: "30 min",
            description: "JSX is HTML inside JavaScript. Props are overrides on a Figma instance. Build your first React component from a Figma design, pass data into it, and watch it render. You\u2019ll also get a gentle intro to TypeScript, just enough to understand why types matter and how they keep components accessible and predictable.",
          },
          {
            title: "Dynamic Interfaces: Lists, Conditions & AI Generation",
            duration: "30 min",
            description: "Render a list from real data. Show and hide elements based on state. Then use Cursor to generate and refine entire components from a prompt. By the end of this class you\u2019re not hand-coding every line. You\u2019re directing AI to build what you describe, using the same UI primitives production teams rely on.",
          },
        ],
      },
      {
        week: 3,
        classNumber: 7,
        title: "Design Tokens Meet Production Code",
        parts: [
          {
            title: "From Hard-Coded CSS to Design Tokens",
            duration: "30 min",
            description: "Hard-coded colors drift. Hard-coded spacing breaks. The token fundamentals you built in Bootcamp 1 fix both. One definition, used everywhere. See how your Figma Variables map directly to code, creating a shared language between design and development.",
          },
          {
            title: "Tailwind CSS: Your Tokens in Production",
            duration: "30 min",
            description: "Style directly in your markup. No separate stylesheets, no naming wars. Customize Tailwind\u2019s config to match your design system tokens, build responsive layouts with mobile-first breakpoints, and write accessible, utility-first CSS the way modern teams ship.",
          },
          {
            title: "Claude Code, Figma MCP & the Round-Trip Workflow",
            duration: "30 min",
            description: "Meet Claude Code, AI in your terminal. Connect it to your Figma file with MCP, and run the workflow real teams use: Figma design to Claude Code to styled component to review in browser. The gap between design and code disappears.",
          },
        ],
      },
      {
        week: 4,
        classNumber: 8,
        title: "Build & Ship",
        parts: [
          {
            title: "Next.js + ShadCN: Scaffold a Real Application",
            duration: "30 min",
            description: "Scaffold a Next.js project from scratch. Install ShadCN, the production-ready UI primitives you\u2019ve been building toward since Week 2. Set up pages, routing, and project structure. This isn\u2019t a tutorial. It\u2019s the foundation for the application you\u2019re about to deploy.",
          },
          {
            title: "Build Your First Live Web Page",
            duration: "30 min",
            description: "A personal portfolio or a single-page SaaS landing page. You pick. Your design, your rules. React components, Tailwind tokens, ShadCN primitives, and your Bootcamp 1 design system all working together. Cursor and Claude Code side by side, shipping faster than you thought possible.",
          },
          {
            title: "Deploy to Vercel & Lightning Showcase",
            duration: "30 min",
            description: "From local project to live URL in under ten minutes. Deploy to Vercel and share the link. Four weeks ago you\u2019d never written a line of code. Now you have a deployed application, a GitHub repo, and a workflow that didn\u2019t exist a month ago. You\u2019re a designer who ships.",
          },
        ],
      },
    ],
    deliverables: [
      "Deployed Web Application (live Vercel URL)",
      "GitHub Repository with React + Tailwind + ShadCN",
      "Design System Tokens Integrated in Tailwind Config",
      "Claude Code + Figma MCP Round-Trip Workflow",
    ],
    faqs: [
      {
        question: "Do I need to complete Bootcamp 1 first?",
        answer:
          "Strongly recommended. Bootcamp 2 builds directly on the prompting skills and design system you create in Bootcamp 1. If you already have strong prompt engineering fundamentals and a token-based design system in Figma, you can start here, but most students benefit from doing both in order.",
      },
      {
        question: "I\u2019ve never written a line of code. Can I still do this?",
        answer:
          "That\u2019s exactly who this bootcamp is for. Session 01 starts with installing your code editor and pushing your first commit. Session 02 maps Figma concepts you already know to their code equivalents. You\u2019re not starting from zero. You\u2019re starting from Figma.",
      },
      {
        question: "What tools do I need?",
        answer:
          "Cursor (free), a GitHub account (free), and a Vercel account (free). We set up everything together in Session 01. If you completed Bootcamp 1, you already have Claude and Figma ready.",
      },
      {
        question: "What\u2019s the class size and format?",
        answer:
          "Capped at 12 students. Sessions run every Wednesday at 8:00 PM IST, starting April 8th. Each session is 90 to 120 minutes, live and interactive. You write real code during class, share your screen, and get feedback on your work. This is hands-on from day one.",
      },
      {
        question: "What if I miss a live session?",
        answer:
          "Sessions are not recorded, but you\u2019ll receive the full session materials, presentation decks, and detailed content documents after every class. These cover all the code, concepts, and steps discussed. However, this bootcamp is especially hands-on, so live attendance matters even more here.",
      },
      {
        question: "Will I actually ship something live?",
        answer:
          "Yes. By Session 12, your project is deployed to a real URL that anyone can visit. You pick what you build, a portfolio site or a landing page, and you ship it yourself. Not a demo. A real, live product.",
      },
      {
        question: "Do I need to know React, Tailwind, or Next.js before starting?",
        answer:
          "No. We teach each one at the exact moment you need it. React in Week 2, Tailwind in Week 3, Next.js in Week 4. Every tool is introduced through a designer\u2019s lens, not a developer bootcamp curriculum.",
      },
    ],
  },
  {
    slug: "ai-ux-strategic-thinking",
    title: "AI UX Strategic Thinking",
    tagline:
      "Validate every design decision from research to proof.",
    badge: "No Coding Skills Needed",
    heroTag: "For Designers Who Think Strategically",
    heroHeadline: "Stop Designing on Instinct.\nStart Proving Impact.",
    heroSubheadline: "In 6 live hours, master AI-powered research sprints that turn gut feelings into validated design decisions.",
    classCount: 4,
    hoursLive: 6,
    gradient: "from-[hsl(var(--blue-100))] to-[hsl(var(--gold-100))]",
    image: "/images/bc3.jpg",
    certificateImage: "/images/certificate-b3.jpg",
    startDate: "Upcoming",
    startDateISO: "2026-05-06",
    upcoming: true,
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
