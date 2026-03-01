import type { Course } from "@/lib/types/database";
import type { CourseSyllabus } from "@/lib/types/training";

export interface CourseWithSyllabus extends Omit<Course, "syllabus"> {
  syllabus: CourseSyllabus;
  learning_outcomes: string[];
  format: "bootcamp" | "recorded";
}

/* ═══════════════════════════════════════════════════════════════════════════
   LIVE BOOTCAMPS — cohort-based, measured in weeks
   ═══════════════════════════════════════════════════════════════════════════ */

export const bootcamps: CourseWithSyllabus[] = [
  {
    id: "b1",
    title: "AI-First UX Design",
    slug: "ai-first-ux-design-fundamentals",
    description:
      "Integrate AI into every stage of UX — from research and ideation to prototyping and handoff.",
    long_description:
      "This beginner-friendly bootcamp is your gateway to AI-powered UX design. You'll learn how to leverage tools like ChatGPT, Midjourney, and Figma AI to accelerate your design workflow, generate user personas, synthesize research data, and create rapid prototypes. By the end, you'll have a complete AI-enhanced design project in your portfolio.",
    duration: "4 weeks",
    level: "beginner",
    price: 499,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "bootcamp",
    learning_outcomes: [
      "Integrate AI tools into your daily UX design workflow",
      "Generate user personas and journey maps with AI assistance",
      "Use AI for rapid ideation and concept generation",
      "Create AI-powered prototypes in Figma",
      "Conduct AI-assisted usability analysis",
      "Build a portfolio-ready AI-enhanced design project",
    ],
    syllabus: [
      {
        title: "Introduction to AI-First Design",
        lessons: [
          { title: "The AI-First Design Mindset", duration: "25 min", type: "video" },
          { title: "AI Tools Landscape for UX Designers", duration: "30 min", type: "video" },
          { title: "Setting Up Your AI Toolkit", duration: "20 min", type: "reading" },
          { title: "Your First AI-Assisted Design Task", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "AI-Powered Research & Discovery",
        lessons: [
          { title: "AI for User Research Synthesis", duration: "35 min", type: "video" },
          { title: "Generating Personas with AI", duration: "30 min", type: "video" },
          { title: "AI-Assisted Competitive Analysis", duration: "25 min", type: "reading" },
          { title: "Build an AI Research Toolkit", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "Ideation & Prototyping with AI",
        lessons: [
          { title: "AI-Driven Ideation Techniques", duration: "30 min", type: "video" },
          { title: "Prompt Engineering for Design", duration: "35 min", type: "video" },
          { title: "Rapid Prototyping with Figma AI", duration: "40 min", type: "video" },
          { title: "Create an AI-Enhanced Prototype", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Testing & Portfolio Project",
        lessons: [
          { title: "AI-Assisted Usability Testing", duration: "30 min", type: "video" },
          { title: "Analyzing Test Results with AI", duration: "25 min", type: "video" },
          { title: "Ethics in AI-Driven Design", duration: "20 min", type: "reading" },
          { title: "Capstone: Complete AI Design Project", duration: "120 min", type: "project" },
        ],
      },
    ],
  },
  {
    id: "b2",
    title: "Advanced UX Research with AI",
    slug: "advanced-ux-research-with-ai",
    description:
      "Master AI-enhanced research — automated coding, sentiment analysis, predictive modeling, and large-scale synthesis.",
    long_description:
      "Take your UX research skills to the next level with AI-powered methodologies. This advanced bootcamp covers automated qualitative coding, AI-driven sentiment analysis, predictive user behavior modeling, and large-scale data synthesis. You'll work with real datasets and learn to deliver research insights 10x faster.",
    duration: "6 weeks",
    level: "advanced",
    price: 799,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "bootcamp",
    learning_outcomes: [
      "Automate qualitative research coding and affinity mapping",
      "Apply AI-driven sentiment analysis to user feedback",
      "Build predictive models for user behavior",
      "Synthesize large-scale research data with AI",
      "Create compelling research presentations with AI tools",
      "Design and run AI-enhanced usability studies",
      "Validate AI-generated insights with statistical rigor",
      "Develop a scalable AI research operations framework",
    ],
    syllabus: [
      {
        title: "Foundations of AI-Enhanced Research",
        lessons: [
          { title: "AI Research Landscape & Ethics", duration: "30 min", type: "video" },
          { title: "Setting Up an AI Research Environment", duration: "25 min", type: "video" },
          { title: "Data Quality & Bias in AI Research", duration: "35 min", type: "reading" },
          { title: "Benchmark Your Current Research Workflow", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Automated Qualitative Analysis",
        lessons: [
          { title: "AI-Powered Interview Transcription & Coding", duration: "40 min", type: "video" },
          { title: "Automated Affinity Mapping", duration: "35 min", type: "video" },
          { title: "Theme Extraction with LLMs", duration: "30 min", type: "video" },
          { title: "Analyze a Real Interview Dataset", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Sentiment Analysis & NLP",
        lessons: [
          { title: "Sentiment Analysis Fundamentals", duration: "35 min", type: "video" },
          { title: "Analyzing App Reviews at Scale", duration: "30 min", type: "video" },
          { title: "NLP for Survey Open-Ends", duration: "25 min", type: "reading" },
          { title: "Build a Sentiment Dashboard", duration: "75 min", type: "project" },
        ],
      },
      {
        title: "Predictive User Behavior",
        lessons: [
          { title: "Introduction to Predictive Modeling for UX", duration: "40 min", type: "video" },
          { title: "Churn Prediction & User Segmentation", duration: "35 min", type: "video" },
          { title: "A/B Test Analysis with AI", duration: "30 min", type: "exercise" },
          { title: "Build a Prediction Model", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Large-Scale Data Synthesis",
        lessons: [
          { title: "Synthesizing Cross-Study Insights", duration: "35 min", type: "video" },
          { title: "AI-Powered Research Repositories", duration: "30 min", type: "video" },
          { title: "Automated Reporting & Storytelling", duration: "25 min", type: "reading" },
          { title: "Create a Research Insights Report", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "Research Ops & Capstone",
        lessons: [
          { title: "Scaling AI Research Operations", duration: "30 min", type: "video" },
          { title: "Building Your Research Playbook", duration: "25 min", type: "reading" },
          { title: "Presenting AI Research to Stakeholders", duration: "30 min", type: "video" },
          { title: "Capstone: End-to-End AI Research Project", duration: "120 min", type: "project" },
        ],
      },
    ],
  },
  {
    id: "b3",
    title: "AI Design Systems",
    slug: "design-systems-for-enterprise",
    description:
      "Build scalable, AI-ready design systems that unify teams and accelerate design-to-development workflows.",
    long_description:
      "Learn to architect enterprise-grade design systems that scale across teams and products. This bootcamp covers component architecture, token systems, documentation, governance, and the emerging role of AI in design system management. You'll build a production-ready design system from scratch.",
    duration: "8 weeks",
    level: "intermediate",
    price: 699,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "bootcamp",
    learning_outcomes: [
      "Architect scalable component libraries with Figma",
      "Implement design tokens for multi-brand systems",
      "Create comprehensive documentation and usage guidelines",
      "Establish governance and contribution workflows",
      "Integrate AI-powered design system tooling",
      "Bridge design-to-development handoff gaps",
      "Measure design system adoption and ROI",
    ],
    syllabus: [
      {
        title: "Design System Strategy",
        lessons: [
          { title: "What Makes a Great Design System", duration: "30 min", type: "video" },
          { title: "Auditing Your Existing UI", duration: "35 min", type: "video" },
          { title: "Stakeholder Alignment & Roadmapping", duration: "25 min", type: "reading" },
          { title: "Audit an Existing Product UI", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "Design Tokens & Foundations",
        lessons: [
          { title: "Color, Typography & Spacing Tokens", duration: "40 min", type: "video" },
          { title: "Multi-Brand Token Architecture", duration: "35 min", type: "video" },
          { title: "Token Tooling: Style Dictionary & Beyond", duration: "30 min", type: "reading" },
          { title: "Build a Token System", duration: "75 min", type: "project" },
        ],
      },
      {
        title: "Component Architecture",
        lessons: [
          { title: "Atomic Design in Practice", duration: "30 min", type: "video" },
          { title: "Building Flexible Components in Figma", duration: "45 min", type: "video" },
          { title: "Variants, States & Responsive Behavior", duration: "35 min", type: "video" },
          { title: "Build a Component Library (Part 1)", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Advanced Components & Patterns",
        lessons: [
          { title: "Complex Components: Tables, Forms, Navigation", duration: "40 min", type: "video" },
          { title: "Layout Patterns & Compositions", duration: "30 min", type: "video" },
          { title: "Accessibility in Design Systems", duration: "35 min", type: "reading" },
          { title: "Build a Component Library (Part 2)", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Documentation & Governance",
        lessons: [
          { title: "Writing Effective Component Documentation", duration: "30 min", type: "video" },
          { title: "Storybook Setup & Configuration", duration: "35 min", type: "video" },
          { title: "Governance Models & Contribution Guides", duration: "25 min", type: "reading" },
          { title: "Document Your Component Library", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "AI in Design Systems",
        lessons: [
          { title: "AI-Powered Component Generation", duration: "35 min", type: "video" },
          { title: "Automated Consistency Checking", duration: "30 min", type: "video" },
          { title: "AI-Assisted Documentation", duration: "25 min", type: "exercise" },
          { title: "Build an AI-Enhanced Workflow", duration: "60 min", type: "project" },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   RECORDED COURSES — self-paced, measured in hours
   ═══════════════════════════════════════════════════════════════════════════ */

export const recordedCourses: CourseWithSyllabus[] = [
  {
    id: "r1",
    title: "Prompt Engineering for Designers",
    slug: "prompt-engineering-for-designers",
    description:
      "Write prompts that actually work — for copy, images, prototypes, and user research.",
    long_description:
      "Master the art and science of communicating with AI models. This course teaches UX designers how to write effective prompts for design tasks — generating copy, creating visual concepts, building prototypes, synthesizing research, and automating repetitive workflows. You'll build a personal prompt library you can use every day.",
    duration: "6 hours",
    level: "beginner",
    price: 99,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "recorded",
    learning_outcomes: [
      "Understand how LLMs interpret and respond to prompts",
      "Write structured prompts for UX research synthesis",
      "Generate UI copy and microcopy with AI",
      "Create image prompts for design explorations",
      "Build a reusable prompt library for daily design tasks",
      "Chain prompts for complex multi-step workflows",
    ],
    syllabus: [
      {
        title: "How AI Models Think",
        lessons: [
          { title: "Understanding LLMs for Designers", duration: "20 min", type: "video" },
          { title: "Anatomy of an Effective Prompt", duration: "25 min", type: "video" },
          { title: "Common Prompt Pitfalls", duration: "15 min", type: "reading" },
        ],
      },
      {
        title: "Prompting for Design Tasks",
        lessons: [
          { title: "Copy & Microcopy Generation", duration: "30 min", type: "video" },
          { title: "Visual Concept Prompts (Midjourney, DALL-E)", duration: "35 min", type: "video" },
          { title: "Research Synthesis Prompts", duration: "25 min", type: "video" },
          { title: "Build Your Prompt Library", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Advanced Techniques",
        lessons: [
          { title: "Chain-of-Thought Prompting", duration: "20 min", type: "video" },
          { title: "Role-Based Prompting for Personas", duration: "25 min", type: "video" },
          { title: "Multi-Step Workflow Automation", duration: "30 min", type: "project" },
        ],
      },
    ],
  },
  {
    id: "r2",
    title: "AI-Powered UX Auditing",
    slug: "ai-powered-ux-auditing",
    description:
      "Run faster, more thorough UX audits using AI to identify usability issues and generate recommendations.",
    long_description:
      "Learn to conduct comprehensive UX audits in a fraction of the time. This course teaches you how to use AI tools to systematically evaluate interfaces, identify usability issues based on established heuristics, prioritize findings by impact, and generate actionable recommendations for stakeholders.",
    duration: "8 hours",
    level: "intermediate",
    price: 149,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "recorded",
    learning_outcomes: [
      "Conduct heuristic evaluations with AI assistance",
      "Automate screenshot-based UI analysis",
      "Prioritize usability issues by business impact",
      "Generate stakeholder-ready audit reports with AI",
      "Compare before/after designs quantitatively",
    ],
    syllabus: [
      {
        title: "Foundations of UX Auditing",
        lessons: [
          { title: "Heuristic Evaluation Refresher", duration: "20 min", type: "video" },
          { title: "Setting Up an AI Audit Workflow", duration: "30 min", type: "video" },
          { title: "Choosing the Right AI Tools", duration: "15 min", type: "reading" },
        ],
      },
      {
        title: "AI-Assisted Analysis",
        lessons: [
          { title: "Screenshot-Based UI Analysis", duration: "35 min", type: "video" },
          { title: "Automated Heuristic Scoring", duration: "30 min", type: "video" },
          { title: "Accessibility Checking with AI", duration: "25 min", type: "video" },
          { title: "Run a Full AI-Assisted Audit", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Reporting & Recommendations",
        lessons: [
          { title: "Prioritization Frameworks", duration: "20 min", type: "video" },
          { title: "AI-Generated Audit Reports", duration: "30 min", type: "video" },
          { title: "Presenting Findings to Stakeholders", duration: "25 min", type: "video" },
        ],
      },
    ],
  },
  {
    id: "r3",
    title: "Figma AI Masterclass",
    slug: "figma-ai-masterclass",
    description:
      "Go deep on Figma's AI features and third-party plugins to 10x your design speed.",
    long_description:
      "Figma is evolving fast with AI-native features. This masterclass covers everything from Figma's built-in AI capabilities to the best third-party AI plugins for layout generation, auto-documentation, component suggestions, and design-to-code workflows. You'll learn to build faster than ever.",
    duration: "5 hours",
    level: "beginner",
    price: 79,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "recorded",
    learning_outcomes: [
      "Use Figma's native AI features for layout and content",
      "Set up the best AI plugins for your workflow",
      "Auto-generate responsive variants with AI",
      "Streamline design-to-code handoff using AI",
      "Create documentation automatically from your designs",
    ],
    syllabus: [
      {
        title: "Figma AI Essentials",
        lessons: [
          { title: "Figma's Built-In AI Features Tour", duration: "25 min", type: "video" },
          { title: "AI-Powered Auto Layout", duration: "30 min", type: "video" },
          { title: "Content Generation in Figma", duration: "20 min", type: "video" },
        ],
      },
      {
        title: "Essential AI Plugins",
        lessons: [
          { title: "Top 10 AI Plugins for Figma", duration: "25 min", type: "video" },
          { title: "Layout Generation Plugins", duration: "30 min", type: "video" },
          { title: "Design-to-Code with AI", duration: "35 min", type: "video" },
          { title: "Build a Complete Page with AI Tools", duration: "45 min", type: "project" },
        ],
      },
    ],
  },
  {
    id: "r4",
    title: "AI for Design Presentations",
    slug: "ai-for-design-presentations",
    description:
      "Use AI to craft compelling case studies, pitch decks, and stakeholder presentations.",
    long_description:
      "Your designs are only as good as how you present them. Learn to use AI to build persuasive case studies, generate data visualizations, write compelling narratives, and create polished presentation decks that win stakeholder buy-in every time.",
    duration: "4 hours",
    level: "beginner",
    price: 69,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "recorded",
    learning_outcomes: [
      "Structure design case studies with AI assistance",
      "Generate data visualizations for UX metrics",
      "Write compelling design narratives with AI",
      "Build polished presentation decks faster",
    ],
    syllabus: [
      {
        title: "Case Study Craft",
        lessons: [
          { title: "Anatomy of a Great Case Study", duration: "20 min", type: "video" },
          { title: "AI-Powered Narrative Writing", duration: "25 min", type: "video" },
          { title: "Data Visualization with AI", duration: "30 min", type: "video" },
        ],
      },
      {
        title: "Presentation Mastery",
        lessons: [
          { title: "Stakeholder Deck Structure", duration: "20 min", type: "video" },
          { title: "AI Tools for Slide Design", duration: "25 min", type: "video" },
          { title: "Build a Portfolio Case Study", duration: "60 min", type: "project" },
        ],
      },
    ],
  },
  {
    id: "r5",
    title: "Inclusive Design with AI",
    slug: "inclusive-design-with-ai",
    description:
      "Leverage AI for accessibility auditing, inclusive research, and WCAG 2.2 compliance.",
    long_description:
      "Accessibility isn't optional — it's a competitive advantage. This course covers WCAG 2.2 compliance, inclusive research methodologies, assistive technology testing, and AI-powered accessibility auditing. You'll learn to embed accessibility into your design process from day one.",
    duration: "7 hours",
    level: "intermediate",
    price: 129,
    image_url: null,
    instructor: "Surinder Thakur",
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    format: "recorded",
    learning_outcomes: [
      "Apply WCAG 2.2 guidelines to real-world designs",
      "Conduct inclusive user research with diverse participants",
      "Test designs with assistive technologies",
      "Use AI tools for automated accessibility auditing",
      "Create accessible component patterns and documentation",
      "Advocate for accessibility within your organization",
    ],
    syllabus: [
      {
        title: "Foundations of Inclusive Design",
        lessons: [
          { title: "Why Accessibility Matters", duration: "25 min", type: "video" },
          { title: "WCAG 2.2 Overview", duration: "35 min", type: "reading" },
          { title: "Audit a Website for Accessibility", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "AI-Powered Accessibility Testing",
        lessons: [
          { title: "Color, Contrast & Visual Design", duration: "30 min", type: "video" },
          { title: "AI Accessibility Auditing Tools", duration: "30 min", type: "video" },
          { title: "Screen Reader & Keyboard Testing", duration: "35 min", type: "video" },
          { title: "Conduct a Full Accessibility Audit", duration: "90 min", type: "project" },
        ],
      },
      {
        title: "Inclusive Research",
        lessons: [
          { title: "Recruiting Diverse Participants", duration: "25 min", type: "video" },
          { title: "Running Inclusive Usability Studies", duration: "30 min", type: "video" },
          { title: "Building an Accessibility Culture", duration: "20 min", type: "reading" },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ALL COURSES (for sitemap, detail pages, etc.)
   ═══════════════════════════════════════════════════════════════════════════ */

export const courses: CourseWithSyllabus[] = [...bootcamps, ...recordedCourses];

export function getCourseBySlug(slug: string): CourseWithSyllabus | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getRelatedCourses(
  currentSlug: string,
  limit = 3
): CourseWithSyllabus[] {
  return courses.filter((c) => c.slug !== currentSlug).slice(0, limit);
}

export function getCourseStats(course: CourseWithSyllabus) {
  let videoMinutes = 0;
  let exerciseCount = 0;
  let readingCount = 0;

  for (const mod of course.syllabus) {
    for (const lesson of mod.lessons) {
      const mins = parseInt(lesson.duration);
      if (lesson.type === "video") videoMinutes += mins;
      if (lesson.type === "exercise" || lesson.type === "project")
        exerciseCount++;
      if (lesson.type === "reading") readingCount++;
    }
  }

  return {
    modules: course.syllabus.length,
    videoHours: Math.round(videoMinutes / 60),
    exercises: exerciseCount,
    resources: readingCount,
  };
}
