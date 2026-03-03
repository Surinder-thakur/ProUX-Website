import { HOW_IT_WORKS_STEPS } from "@/lib/data/bootcamps";

/* ── Custom Step Icons (from Figma) ─────────────────────────────────────── */

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="11.67" height="11.67" rx="1.67" />
      <rect x="23.33" y="5" width="11.67" height="11.67" rx="1.67" />
      <rect x="5" y="23.33" width="11.67" height="11.67" rx="1.67" />
      <rect x="23.33" y="23.33" width="11.67" height="11.67" rx="1.67" />
    </svg>
  );
}

function TrackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="30.67" height="11.67" rx="1.67" strokeWidth="2" />
      <rect x="5" y="23.33" width="11.67" height="11.67" rx="1.67" strokeWidth="2" />
      <path d="M25 28.5L27.67 31.5L33 25.5" strokeWidth="2.33" />
    </svg>
  );
}

function LicenseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor">
      <path d="M4.167 20C4.167 12.536 4.167 8.804 6.486 6.485C8.804 4.167 12.536 4.167 20 4.167C27.464 4.167 31.196 4.167 33.515 6.485C35.834 8.804 35.834 12.536 35.834 20C35.834 27.464 35.834 31.196 33.515 33.515C31.196 35.833 27.464 35.833 20 35.833C12.536 35.833 8.804 35.833 6.486 33.515C4.167 31.196 4.167 27.464 4.167 20Z" strokeWidth="2" />
      <path d="M4.167 15L35.834 15" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11.667 10H11.682" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.333 10H18.348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="21" y="22" width="7" height="7" rx="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 15.876C15.454 0.119 25.981-0.063 30.188 1.816C32.067 6.023 31.885 16.55 16.128 25.004C15.964 24.065 15.056 21.604 12.728 19.276C10.4 16.948 7.939 16.039 7 15.876Z" />
      <path d="M18.249 24.254C21.314 25.754 21.641 28.444 22.065 31.004C22.065 31.004 28.483 26.26 24.378 19.754" />
      <path d="M7.75 13.882C6.25 10.818 3.56 10.491 1 10.067C1 10.067 5.744 3.649 12.25 7.754" />
      <path d="M6.03 20.856C5.177 21.709 3.727 24.183 4.751 27.254C7.822 28.278 10.295 26.828 11.149 25.975" />
      <circle cx="21.918" cy="10.088" r="2.917" />
    </svg>
  );
}

const STEP_ICONS = [GridIcon, TrackIcon, LicenseIcon, RocketIcon];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function BootcampHowItWorks() {
  return (
    <section aria-label="How It Works" className="bg-[#242424] py-[80px] md:py-[100px] text-white">
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center w-full mb-14">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#99825d]">
            How It Works
          </p>
          <h3 className="font-bold text-[22px] md:text-[26px] leading-[28px] md:leading-[34px] tracking-[-0.3px] text-white max-w-[680px]">
            Pick a bootcamp, choose your time zone,
            and learn live with a small cohort of designers.
          </h3>
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
                <Icon className="h-10 w-10 text-white" />

                {/* Title */}
                <p className="text-[20px] md:text-[22px] font-bold leading-[28px] tracking-[-0.16px] text-white">
                  {step.title}
                </p>

                {/* Step label */}
                <p className="text-[13px] font-semibold leading-[18px] tracking-[-0.1px] text-[#99825d]">
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
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="#333333"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="6 4"
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
