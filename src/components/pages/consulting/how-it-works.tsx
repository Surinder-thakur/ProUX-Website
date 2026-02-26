import { Rocket, Target, LayoutGrid } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Rocket,
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
    icon: LayoutGrid,
    title: "UX Strategy",
    days: "Day 8-10 (3 days)",
    description:
      "Based on the mapped persona and journey, we optimise & prepare the MVP flow for testing ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#242424] py-[120px] text-white">
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-[24px] items-center text-center w-full mb-16">
          <h2 className="font-extrabold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] tracking-[-0.4px] text-white max-w-[824px]">
            From Concept to Launch in 10 Days
          </h2>
          <p className="text-[18px] leading-[24px] tracking-[-0.27px] text-[#eaedf4] max-w-[518px] font-normal">
            We&apos;ve streamlined our process to deliver high-impact results
            without the usual agency bloat.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center w-full">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 items-center text-center w-full max-w-[320px]"
            >
              {/* Icon */}
              <step.icon className="h-12 w-12 text-white" strokeWidth={1.4} />

              {/* Title + Days */}
              <div className="flex flex-col items-center text-white w-full">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.16px]">
                  {step.title}
                </p>
                <p className="text-[18px] font-semibold leading-[24px] tracking-[-0.27px]">
                  {step.days}
                </p>
              </div>

              {/* Description */}
              <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.154px] text-[#eaedf4] text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal divider */}
        <div className="w-full max-w-[1008px] my-16 hidden md:block">
          <svg
            className="w-full"
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

        {/* Spacer for mobile */}
        <div className="my-16 md:hidden" />

        {/* CTA */}
        <div className="flex flex-col gap-3 items-center text-center w-full max-w-[464px]">
          <div className="text-[18px] leading-[30px] tracking-[-0.27px] text-[#eaedf4]">
            <p className="font-bold mb-0">
              Ready to refine your product UX?
            </p>
            <p className="font-normal">
              100% money back guaranteed if not satisfied with mapped journeys.
            </p>
          </div>
          <Link
            href="#consultation"
            className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#B9573D] px-6 py-4 text-[16px] font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-[#a04a32] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Book UX Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
