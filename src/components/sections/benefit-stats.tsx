import React from "react";

/* ── Inline SVG Icons (from Figma Make — viewBox 0 0 42 42) ──────────── */

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 size-[36px] md:size-[48px] mb-3 md:mb-5">
      <div className="absolute inset-[8.33%]">
        <div className="absolute inset-[-2.5%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 42 42"
          >
            {children}
          </svg>
        </div>
      </div>
    </div>
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

function IconTarget() {
  return (
    <IconWrapper>
      <path
        d="M31 21.0001C31 26.523 26.5228 31.0001 21 31.0001C15.4772 31.0001 11 26.523 11 21.0001C11 15.4773 15.4772 11.0001 21 11.0001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M25 1.4002C23.7076 1.13785 22.3699 1.00012 21 1.00012C9.9543 1.00012 1 9.95443 1 21.0001C1 32.0458 9.9543 41.0001 21 41.0001C32.0457 41.0001 41 32.0458 41 21.0001C41 19.6303 40.8623 18.2926 40.5999 17.0001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M20.2929 20.293C19.9024 20.6835 19.9024 21.3167 20.2929 21.7072C20.6834 22.0978 21.3166 22.0978 21.7071 21.7072L21 21.0001L20.2929 20.293ZM36.3818 5.61836L35.4142 5.87082C35.5055 6.22106 35.7791 6.49458 36.1293 6.58596L36.3818 5.61836ZM35.349 1.66027L34.3814 1.91273L34.3814 1.91273L35.349 1.66027ZM33.5961 1.38024L34.3032 2.08735L34.3032 2.08735L33.5961 1.38024ZM31.2973 3.67901L30.5902 2.9719L30.5902 2.9719L31.2973 3.67901ZM29.5563 9.30271L28.5887 9.55517L28.5887 9.55517L29.5563 9.30271ZM40.3399 6.65108L40.0874 7.61869L40.0874 7.61869L40.3399 6.65108ZM40.6199 8.40405L39.9128 7.69694L39.9128 7.69694L40.6199 8.40405ZM38.3211 10.7028L39.0282 11.4099L39.0282 11.4099L38.3211 10.7028ZM32.6974 12.4438L32.445 13.4115L32.445 13.4115L32.6974 12.4438ZM30.2063 11.7939L29.4992 11.0868L20.2929 20.293L21 21.0001L21.7071 21.7072L30.9134 12.501L30.2063 11.7939ZM36.3818 5.61836L37.3494 5.36589L36.3166 1.4078L35.349 1.66027L34.3814 1.91273L35.4142 5.87082L36.3818 5.61836ZM33.5961 1.38024L32.889 0.673137L30.5902 2.9719L31.2973 3.67901L32.0044 4.38612L34.3032 2.08735L33.5961 1.38024ZM29.5563 9.30271L28.5887 9.55517L29.2387 12.0463L30.2063 11.7939L31.1739 11.5414L30.5239 9.05024L29.5563 9.30271ZM36.3818 5.61836L36.1293 6.58596L40.0874 7.61869L40.3399 6.65108L40.5923 5.68347L36.6342 4.65075L36.3818 5.61836ZM40.6199 8.40405L39.9128 7.69694L37.614 9.99571L38.3211 10.7028L39.0282 11.4099L41.327 9.11115L40.6199 8.40405ZM32.6974 12.4438L32.9499 11.4762L30.4587 10.8263L30.2063 11.7939L29.9538 12.7615L32.445 13.4115L32.6974 12.4438ZM38.3211 10.7028L37.614 9.99571C36.2662 11.3435 34.443 11.8658 32.9499 11.4762L32.6974 12.4438L32.445 13.4115C34.7262 14.0067 37.2572 13.1809 39.0282 11.4099L38.3211 10.7028ZM40.3399 6.65108L40.0874 7.61869C40.0874 7.61869 40.0868 7.61852 40.0856 7.61812C40.0844 7.61771 40.0827 7.61708 40.0806 7.61618C40.0762 7.61434 40.0706 7.61156 40.0642 7.60759C40.0508 7.59933 40.0376 7.58823 40.0264 7.57523C40.0033 7.5486 39.9997 7.52808 39.9997 7.52825C40 7.52985 40.0064 7.6033 39.9128 7.69694L40.6199 8.40405L41.327 9.11115C41.8455 8.59269 42.0823 7.8863 41.9747 7.21276C41.864 6.52024 41.3816 5.88942 40.5923 5.68347L40.3399 6.65108ZM31.2973 3.67901L30.5902 2.9719C28.8192 4.74293 27.9935 7.27394 28.5887 9.55517L29.5563 9.30271L30.5239 9.05024C30.1343 7.55714 30.6566 5.73391 32.0044 4.38612L31.2973 3.67901ZM35.349 1.66027L36.3166 1.4078C36.1107 0.618489 35.4799 0.136078 34.7874 0.0254533C34.1138 -0.0821387 33.4074 0.154674 32.889 0.673137L33.5961 1.38024L34.3032 2.08735C34.3968 1.99371 34.4703 2.00016 34.4719 2.00041C34.472 2.00044 34.4515 1.99681 34.4249 1.97374C34.4119 1.96248 34.4008 1.94931 34.3925 1.93593C34.3886 1.9295 34.3858 1.92389 34.3839 1.91956C34.383 1.91744 34.3824 1.91575 34.382 1.91455C34.3816 1.91336 34.3814 1.91273 34.3814 1.91273L35.349 1.66027Z"
        fill="currentColor"
      />
    </IconWrapper>
  );
}

function IconChart() {
  return (
    <IconWrapper>
      <path
        d="M29 3.76923V1M36.2612 5.72737L38.2162 3.76923M38.2351 13H41"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M41 21C41 32.0457 32.0457 41 21 41C9.9543 41 1 32.0457 1 21C1 9.9543 9.9543 1 21 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M21 12C20.4477 12 20 12.4477 20 13C20 13.5523 20.4477 14 21 14V13V12ZM28 20.9408C28 21.493 28.4477 21.9408 29 21.9408C29.5523 21.9408 30 21.493 30 20.9408H29H28ZM21 13V14H25V13V12H21V13ZM29 16.9704H28V20.9408H29H30V16.9704H29ZM25 13V14C25.9709 14 26.5992 14.0021 27.0623 14.0639C27.4974 14.122 27.6339 14.2159 27.7097 14.2912L28.4142 13.5814L29.1187 12.8717C28.6087 12.3655 27.981 12.1688 27.3268 12.0815C26.7007 11.9979 25.9147 12 25 12V13ZM29 16.9704H30C30 16.063 30.0022 15.2812 29.9177 14.6579C29.8293 14.005 29.6297 13.3789 29.1187 12.8717L28.4142 13.5814L27.7097 14.2912C27.7846 14.3654 27.8778 14.498 27.9358 14.9263C27.9978 15.3842 28 16.0061 28 16.9704H29ZM28.4142 13.5814L27.66 12.9248C21.8312 19.6196 15.1898 22.3358 10.0084 23.3862C7.41386 23.9122 5.18496 24.0201 3.61051 23.9972C2.82377 23.9857 2.20198 23.9416 1.78156 23.9012C1.57141 23.881 1.41174 23.8616 1.30712 23.8478C1.25482 23.8409 1.21629 23.8354 1.19212 23.8317C1.18003 23.8299 1.17153 23.8286 1.16669 23.8279C1.16428 23.8275 1.16277 23.8272 1.16219 23.8271C1.16191 23.8271 1.16185 23.8271 1.16202 23.8271C1.16211 23.8271 1.16241 23.8272 1.16246 23.8272C1.16282 23.8273 1.16324 23.8273 1 24.8139C0.83676 25.8005 0.837299 25.8006 0.837896 25.8007C0.838174 25.8007 0.838832 25.8008 0.839388 25.8009C0.840501 25.8011 0.841849 25.8013 0.843432 25.8016C0.846599 25.8021 0.850705 25.8028 0.855741 25.8035C0.865813 25.8051 0.879607 25.8073 0.897052 25.8099C0.931939 25.8151 0.981433 25.8222 1.04496 25.8306C1.17199 25.8474 1.35521 25.8694 1.58997 25.892C2.05939 25.9372 2.73559 25.9846 3.58143 25.997C5.27215 26.0215 7.6468 25.9056 10.4058 25.3463C15.9315 24.2262 22.9972 21.3262 29.1684 14.2381L28.4142 13.5814Z"
        fill="currentColor"
      />
    </IconWrapper>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  extraInfo: React.ReactNode;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: <IconTime />,
    title: "Design 80% Faster",
    subtitle: "with AI Agents",
    extraInfo: (
      <>
        Instant feedback
        <br />
        at every stage
      </>
    ),
    description:
      "Get UX analysis in seconds instead of waiting days for design reviews. Our AI specialists provide immediate, actionable insights so you can iterate faster and ship sooner.",
  },
  {
    icon: <IconTarget />,
    title: "Improve Design",
    subtitle: "Quality by 50% with AI Feedbacks",
    extraInfo: (
      <>
        Catch more UX/UI/CRO issues
        <br />
        before launch
      </>
    ),
    description:
      "Our AI specialists identify 50% more usability problems than manual reviews alone. Get comprehensive feedback across UX, UI, content, accessibility, and CRO.",
  },
  {
    icon: <IconChart />,
    title: "Boost Conversions",
    subtitle: "with Proven Principles",
    extraInfo: (
      <>
        Backed by 350+
        <br />
        guidelines &amp; insights
      </>
    ),
    description:
      "Every recommendation is grounded in universal UX/UI/CRO principles and human psychology research. Apply battle-tested patterns that top companies use.",
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function BenefitStatsSection() {
  return (
    <section className="relative w-full bg-[#242424] text-white">
      <div className="container-default py-16 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 lg:gap-12 justify-items-center">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Icon — fixed height for row alignment */}
              <div className="h-[52px] md:h-[68px] flex items-end justify-center text-white">
                {item.icon}
              </div>

              {/* Title — fixed height for row alignment */}
              <div className="h-auto md:h-[48px] flex items-center justify-center">
                <h3 className="text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-white tracking-tight leading-tight whitespace-nowrap">
                  {item.title}
                </h3>
              </div>

              {/* Subtitle — fixed height, single line */}
              <div className="h-auto md:h-[32px] flex items-center justify-center mb-2 md:mb-4">
                <p className="text-[15px] md:text-[16px] font-medium text-[#E7E7E7]/80 whitespace-nowrap">
                  {item.subtitle}
                </p>
              </div>

              {/* Extra Info Pill — fixed height for alignment */}
              <div className="h-auto md:h-[60px] flex items-center justify-center mb-2 md:mb-5">
                <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-[#4F4F4F] bg-[#4F4F4F]/20">
                  <p className="text-[13px] font-medium text-[#E7E7E7]/85 text-center leading-snug">
                    {item.extraInfo}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="hidden md:block text-[14px] leading-relaxed text-[#B0B0B0] max-w-[340px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
