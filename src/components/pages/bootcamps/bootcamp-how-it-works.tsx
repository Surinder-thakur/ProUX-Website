import { LayoutGrid, CalendarCheck, GraduationCap, Rocket } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/bootcamps";

const STEP_ICONS = [LayoutGrid, CalendarCheck, GraduationCap, Rocket];

export default function BootcampHowItWorks() {
  return (
    <section className="bg-[#242424] py-[80px] md:py-[100px] text-white">
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center w-full mb-14">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#99825d]">
            How It Works
          </p>
          <h2 className="font-extrabold text-[28px] md:text-[36px] leading-[34px] md:leading-[44px] tracking-[-0.4px] text-white max-w-[824px]">
            Four Steps to Get Started
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[24px] tracking-[-0.27px] text-[#B0B0B0] max-w-[480px] font-normal">
            Pick a bootcamp, choose your time zone, and learn live with a
            small cohort of designers.
          </p>
        </div>

        {/* Steps — horizontal row on desktop */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center w-full">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={step.step}
                className="flex flex-col gap-3 items-center text-center w-full max-w-[260px]"
              >
                {/* Icon */}
                <Icon className="h-10 w-10 text-[#99825d]" strokeWidth={1.4} />

                {/* Title */}
                <p className="text-[20px] md:text-[22px] font-bold leading-[28px] tracking-[-0.16px] text-white">
                  {step.title}
                </p>

                {/* Step label */}
                <p className="text-[13px] font-semibold leading-[18px] tracking-[-0.1px] text-white/40">
                  Step {String(step.step).padStart(2, "0")}
                </p>

                {/* Description */}
                <p className="text-[13px] font-normal leading-[19px] tracking-[-0.1px] text-[#B0B0B0] text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Horizontal divider */}
        <div className="w-full max-w-[1008px] my-12 hidden md:block">
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
        <div className="my-10 md:hidden" />

        {/* CTA */}
        <div className="flex flex-col gap-3 items-center text-center w-full max-w-[464px]">
          <div className="text-center">
            <p className="text-[18px] leading-[28px] tracking-[-0.27px] text-white font-bold mb-1">
              Ready to become a design engineer?
            </p>
            <p className="text-[15px] leading-[22px] tracking-[-0.15px] text-[#B0B0B0] font-normal">
              Start with any bootcamp. No prerequisites required.
            </p>
          </div>
          <a
            href="#modules"
            className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#B9573D] px-6 py-4 text-[15px] font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-[#a04a32] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-1"
          >
            Explore Bootcamps
          </a>
        </div>
      </div>
    </section>
  );
}
