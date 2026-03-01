import React from "react";
import Link from "next/link";

/* ── Inline SVG Icons ──────────────────────────────────────────────────── */

function IconWrapper({
  children,
  viewBox = "0 0 42 42",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <div className="relative shrink-0 size-[48px] mb-3">
      <div className="absolute inset-[8.33%]">
        <div className="absolute inset-[-2.5%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox={viewBox}
          >
            {children}
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconAiBrain() {
  return (
    <div className="relative shrink-0 size-[48px] mb-3">
      <div className="absolute inset-[8.33%_10.42%]">
        <div className="absolute inset-[-2.14%_-2.26%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 46.3333 48.6667"
          >
            <path
              d="M12.6667 6.83333C8.80067 6.83333 5.66667 9.96734 5.66667 13.8333C5.66667 15.1602 6.03585 16.4009 6.67709 17.4582C3.44362 18.0766 1 20.9196 1 24.3333C1 27.7471 3.44362 30.59 6.67709 31.2085M12.6667 6.83333C12.6667 3.61167 15.2783 1 18.5 1C21.7217 1 24.3333 3.61167 24.3333 6.83333V10.3333M12.6667 6.83333C12.6667 8.74179 13.5831 10.4362 15 11.5004M6.67709 31.2085C6.03585 32.2658 5.66667 33.5065 5.66667 34.8333C5.66667 38.6993 8.80067 41.8333 12.6667 41.8333C12.6667 45.055 15.2783 47.6667 18.5 47.6667C21.7217 47.6667 24.3333 45.055 24.3333 41.8333V38.3333M6.67709 31.2085C7.50879 29.8372 8.79817 28.7743 10.3333 28.2316"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M36 17.3331H31.3333C29.1334 17.3331 28.0335 17.3331 27.3501 18.0165C26.6667 18.6999 26.6667 19.7999 26.6667 21.9998V26.6664C26.6667 28.8663 26.6667 29.9663 27.3501 30.6497C28.0335 31.3331 29.1334 31.3331 31.3333 31.3331H36C38.1999 31.3331 39.2998 31.3331 39.9832 30.6497C40.6667 29.9663 40.6667 28.8663 40.6667 26.6664V21.9998C40.6667 19.7999 40.6667 18.6999 39.9832 18.0165C39.2998 17.3331 38.1999 17.3331 36 17.3331Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M30.1667 31.3331V35.9998M37.1667 31.3331V35.9998M30.1667 12.6664V17.3331M37.1667 12.6664V17.3331M26.6667 20.8331H22M26.6667 27.8331H22M45.3333 20.8331H40.6667M45.3333 27.8331H40.6667"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconElements() {
  return (
    <IconWrapper>
      <g clipPath="url(#clip_elements)">
        <path
          d="M8.39908 20.8203C20.2352 -1.23971 34.9734 -1.49409 40.8629 1.13622C43.4933 7.02577 43.2389 21.7639 21.1789 33.6001C20.9501 32.2849 19.6778 28.8398 16.4186 25.5806C13.1594 22.3213 9.71423 21.049 8.39908 20.8203Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M9.4499 18.0295C7.3499 13.7396 3.58434 13.2816 -1.23978e-05 12.6873C-1.23978e-05 12.6873 6.64183 3.70252 15.7499 9.44977"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M33.3685 12.7168C33.3685 10.4617 31.5403 8.6335 29.2851 8.6335C27.03 8.6335 25.2018 10.4617 25.2018 12.7168C25.2018 14.972 27.03 16.8002 29.2851 16.8002C31.5403 16.8002 33.3685 14.972 33.3685 12.7168Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M7.04219 27.793C5.84791 28.9873 3.81763 32.4507 5.25077 36.7501C9.55018 38.1832 13.0136 36.153 14.2079 34.9587"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M24.1491 32.55C28.4389 34.65 28.8969 38.4156 29.4912 41.9999C29.4912 41.9999 38.476 35.3581 32.7288 26.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip_elements">
          <rect fill="white" height="42" width="42" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

function IconTime() {
  return (
    <IconWrapper>
      <path
        d="M21 13V21L24 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M36.0909 29.9068C39.3636 31.6741 41 32.5578 41 34C41 35.4422 39.3636 36.3259 36.0909 38.0932L33.8622 39.2967C31.3488 40.654 30.0921 41.3327 29.4879 40.8393C28.008 39.6308 30.3135 36.5123 30.8807 35.4075C31.4555 34.2879 31.4451 33.6918 30.8807 32.5925C30.3135 31.4877 28.008 28.3692 29.4879 27.1607C30.0921 26.6673 31.3488 27.346 33.8622 28.7033L36.0909 29.9068Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M23.0522 40.896C22.3775 40.9648 21.6929 41 21 41C9.9543 41 1 32.0457 1 21C1 9.9543 9.9543 1 21 1C32.0457 1 41 9.9543 41 21C41 22.3699 40.8623 23.7076 40.5999 25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </IconWrapper>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

interface StatItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: <IconAiBrain />,
    title: "From Order Taker",
    subtitle: "to Decision Maker",
    description:
      "Pro members use AI-backed insights to confidently lead design decisions and advance their careers as strategic leaders.",
  },
  {
    icon: <IconElements />,
    title: "3x Faster",
    subtitle: "Strategic Decisions",
    description:
      "Ship prototype drafts in 5 days instead of 14 by leading with data-backed guidelines and AI powered workflows.",
  },
  {
    icon: <IconTime />,
    title: "6 Hours Saved",
    subtitle: "Every Week",
    description:
      "Automate design analysis and iteration feedback, freeing 6 hours weekly to focus on strategy, roadmapping, and shipping faster.",
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function CallToActionSection() {
  return (
    <section className="w-full bg-[#2B2B2B] text-white py-16 md:py-[64px]">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto gap-10 md:gap-16 px-4 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center max-w-4xl">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-white leading-[1.2] tracking-tight px-4 md:px-0">
            Stop executing. Start leading with AI.
          </h2>
          <p className="text-lg font-normal text-white/90 leading-relaxed">
            What Pro members achieve in their first 60 days.
          </p>
        </div>

        {/* Stats grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start justify-center w-full">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 items-center text-center w-full max-w-[320px] text-white"
            >
              {stat.icon}

              <div className="flex flex-col items-center w-full">
                <p className="text-[32px] font-bold leading-[40px] tracking-tight w-full">
                  {stat.title}
                </p>
                <p className="text-lg font-bold leading-6 w-full">
                  {stat.subtitle}
                </p>
              </div>

              <p className="text-sm font-medium text-white/60 leading-5 px-4 md:px-0">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="flex flex-col gap-6 items-center w-full max-w-[464px] px-4">
          {/* Divider */}
          <div className="h-px w-full bg-white/15 mb-4" />

          {/* CTA copy */}
          <div className="flex flex-col gap-1 text-center">
            <p className="text-2xl font-bold text-white/[0.93] leading-[30px] tracking-tight">
              Ready to lead with AI?
            </p>
            <p className="text-lg font-normal text-white/[0.93] leading-[30px]">
              Go Pro: $384/year (just $32/month). 5-day money-back guarantee.
            </p>
          </div>

          {/* CTA button */}
          <Link
            href="https://app.proux.design/Auth"
            className="w-full h-[56px] flex items-center justify-center bg-primary rounded-[14px] shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300 btn-shine"
          >
            <span className="text-sm font-bold text-white uppercase tracking-[0.84px]">
              UPGRADE TO PRO
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
