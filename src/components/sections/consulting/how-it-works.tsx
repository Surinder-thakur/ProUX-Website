import { BarChart3, Target, Clock } from "lucide-react";

const steps = [
  {
    icon: BarChart3,
    title: "Rapid Kickoff",
    days: "Day 1 (1 day)",
    description:
      "We map your business goals, user needs, & technical limitations to define clear success metrics and project scope.",
  },
  {
    icon: Target,
    title: "Goal Alignment",
    days: "Day 4-6 (3 days)",
    description:
      "We build user personas, map journey flows, and audit competitors to uncover conversion blockers and UX gaps.",
  },
  {
    icon: Clock,
    title: "UX Strategy",
    days: "Day 8-10 (3 days)",
    description:
      "Based on the mapped persona and journey, we optimise & prepare the MVP flow for testing ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#242424] py-[120px] text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[32px] font-extrabold leading-tight text-white md:text-[40px]">
            From Concept to Launch in 10 Days
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[18px] text-[#eaedf4]">
            We&apos;ve streamlined our process to deliver high-impact results
            without the usual agency bloat.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-[40px] md:flex-row md:items-start md:justify-center">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex max-w-[360px] flex-1 flex-col items-center text-center"
            >
              {/* Icon container */}
              <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center">
                <step.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="text-[32px] font-bold leading-tight text-white">
                {step.title}
              </h3>

              {/* Days */}
              <p className="mt-2 text-[18px] font-bold text-white">
                {step.days}
              </p>

              {/* Description */}
              <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#eaedf4]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal divider */}
        <div className="hidden md:block">
          <svg
            className="my-16 w-full"
            height="1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="#333333"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Spacer for mobile (replaces the hidden divider) */}
        <div className="my-16 md:hidden" />

        {/* CTA */}
        <div className="flex flex-col items-center text-center">
          <p className="text-[18px] font-bold text-white">
            Ready to refine your product UX?
          </p>
          <p className="mt-2 text-[16px] text-white">
            100% money back guaranteed if not satisfied with mapped journeys.
          </p>
          <a
            href="#consultation"
            className="mt-8 inline-flex w-full max-w-[464px] items-center justify-center rounded-xl px-8 py-4 text-[16px] font-semibold uppercase tracking-widest text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--proux-copper))" }}
          >
            Book UX Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
