"use client";

import { useState, useEffect, useRef } from "react";

/* ── Custom icons from Figma Make build ──────────────────────────────── */

function SoftwareLicenseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 34 34">
      <path
        d="M1 16.8333C1 9.36943 1 5.63748 3.31874 3.31874C5.63748 1 9.36943 1 16.8333 1C24.2972 1 28.0292 1 30.3479 3.31874C32.6667 5.63748 32.6667 9.36943 32.6667 16.8333C32.6667 24.2972 32.6667 28.0292 30.3479 30.3479C28.0292 32.6667 24.2972 32.6667 16.8333 32.6667C9.36943 32.6667 5.63748 32.6667 3.31874 30.3479C1 28.0292 1 24.2972 1 16.8333Z"
        stroke="#1A2130"
        strokeWidth="2"
      />
      <path
        d="M1 11.8334L32.6667 11.8334"
        stroke="#1A2130"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M8.49968 6.83337H8.51465"
        stroke="#1A2130"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M15.1657 6.83337H15.1807"
        stroke="#1A2130"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M10.1667 18.5L12.2109 20.262C13.0703 21.0027 13.5 21.3731 13.5 21.8333C13.5 22.2936 13.0703 22.6639 12.2109 23.4047L10.1667 25.1667"
        stroke="#964A34"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M16.833 25.1667H23.4997"
        stroke="#964A34"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function AiChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 32 37">
      <path
        d="M15.2519 29.5038C14.1366 22.1439 8.3599 16.3672 1 15.2519C8.3599 14.1366 14.1366 8.3599 15.2519 1C16.3672 8.3599 22.1439 14.1366 29.5038 15.2519C22.1439 16.3672 16.3672 22.1439 15.2519 29.5038Z"
        stroke="#1A2130"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M25.3111 36C24.8973 33.2688 22.7536 31.1252 20.0225 30.7113C22.7536 30.2974 24.8973 28.1538 25.3111 25.4226C25.725 28.1538 27.8687 30.2974 30.5998 30.7113C27.8687 31.1252 25.725 33.2688 25.3111 36Z"
        stroke="#B55331"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function AiLearningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 33 31">
      <path
        d="M16 21L16 29"
        stroke="#1A2130"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M7.16987 2.44401C4.54624 1.94268 3.23443 1.69202 2.11722 2.65278C1 3.61354 1 5.17368 1 8.29396L1 19.5077C1 22.3608 1 23.7873 1.71703 24.6779C2.43406 25.5686 4.01266 25.8702 7.16987 26.4735C9.98431 27.0113 12.1808 27.8682 13.7707 28.7292C15.335 29.5764 16.1172 30 16.5 30C16.8828 30 17.665 29.5764 19.2293 28.7292C20.8192 27.8682 23.0157 27.0113 25.8301 26.4735C28.9873 25.8702 30.566 25.5686 31.283 24.6779C32 23.7873 32 22.3608 32 19.5077L32 8.29396C32 5.17368 32 3.61354 30.8828 2.65278C29.7656 1.69202 28.4538 1.94268 25.8301 2.44401"
        stroke="#1A2130"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12.4393 12.5607L13.1465 11.8536L13.1465 11.8536L12.4393 12.5607ZM20.5607 12.5607L19.8536 11.8536L19.8536 11.8536L20.5607 12.5607ZM20.5607 4.43934L19.8536 5.14645L19.8536 5.14645L20.5607 4.43934ZM15.25 13C15.25 12.4477 14.8023 12 14.25 12C13.6977 12 13.25 12.4477 13.25 13L14.25 13L15.25 13ZM13.25 16C13.25 16.5523 13.6977 17 14.25 17C14.8023 17 15.25 16.5523 15.25 16L14.25 16L13.25 16ZM19.75 13C19.75 12.4477 19.3023 12 18.75 12C18.1977 12 17.75 12.4477 17.75 13L18.75 13L19.75 13ZM17.75 16C17.75 16.5523 18.1977 17 18.75 17C19.3023 17 19.75 16.5523 19.75 16L18.75 16L17.75 16ZM15.25 1C15.25 0.447715 14.8023 0 14.25 0C13.6977 0 13.25 0.447715 13.25 1L14.25 1L15.25 1ZM13.25 4C13.25 4.55228 13.6977 5 14.25 5C14.8023 5 15.25 4.55228 15.25 4L14.25 4L13.25 4ZM19.75 1C19.75 0.447715 19.3023 0 18.75 0C18.1977 0 17.75 0.447715 17.75 1L18.75 1L19.75 1ZM17.75 4C17.75 4.55228 18.1977 5 18.75 5C19.3023 5 19.75 4.55228 19.75 4L18.75 4L17.75 4ZM12 7.25C12.5523 7.25 13 6.80228 13 6.25C13 5.69772 12.5523 5.25 12 5.25L12 6.25L12 7.25ZM9 5.25C8.44772 5.25 8 5.69771 8 6.25C8 6.80228 8.44772 7.25 9 7.25L9 6.25L9 5.25ZM12 11.75C12.5523 11.75 13 11.3023 13 10.75C13 10.1977 12.5523 9.75 12 9.75L12 10.75L12 11.75ZM9 9.75C8.44772 9.75 8 10.1977 8 10.75C8 11.3023 8.44772 11.75 9 11.75L9 10.75L9 9.75ZM24 7.25C24.5523 7.25 25 6.80229 25 6.25C25 5.69772 24.5523 5.25 24 5.25L24 6.25L24 7.25ZM21 5.25C20.4477 5.25 20 5.69772 20 6.25C20 6.80229 20.4477 7.25 21 7.25L21 6.25L21 5.25ZM24 11.75C24.5523 11.75 25 11.3023 25 10.75C25 10.1977 24.5523 9.75 24 9.75L24 10.75L24 11.75ZM21 9.75C20.4477 9.75 20 10.1977 20 10.75C20 11.3023 20.4477 11.75 21 11.75L21 10.75L21 9.75ZM15 4L15 5L18 5L18 4L18 3L15 3L15 4ZM21 7L20 7L20 10L21 10L22 10L22 7L21 7ZM18 13L18 12L15 12L15 13L15 14L18 14L18 13ZM12 10L13 10L13 7L12 7L11 7L11 10L12 10ZM15 13L15 12C14.2646 12 13.8137 11.9979 13.4873 11.954C13.1898 11.914 13.1494 11.8565 13.1465 11.8536L12.4393 12.5607L11.7322 13.2678C12.1687 13.7042 12.7015 13.8663 13.2208 13.9362C13.7114 14.0021 14.3212 14 15 14L15 13ZM12 10L11 10C11 10.6788 10.9979 11.2886 11.0638 11.7792C11.1337 12.2985 11.2958 12.8313 11.7322 13.2678L12.4393 12.5607L13.1465 11.8536C13.1435 11.8507 13.086 11.8102 13.046 11.5127C13.0021 11.1863 13 10.7354 13 10L12 10ZM21 10L20 10C20 10.7354 19.9979 11.1863 19.954 11.5127C19.914 11.8102 19.8565 11.8507 19.8536 11.8536L20.5607 12.5607L21.2678 13.2678C21.7042 12.8313 21.8663 12.2985 21.9362 11.7792C22.0021 11.2886 22 10.6788 22 10L21 10ZM18 13L18 14C18.6788 14 19.2886 14.0021 19.7792 13.9362C20.2985 13.8663 20.8313 13.7042 21.2678 13.2678L20.5607 12.5607L19.8536 11.8536C19.8507 11.8565 19.8102 11.914 19.5127 11.954C19.1863 11.9979 18.7354 12 18 12L18 13ZM18 4L18 5C18.7354 5 19.1863 5.00212 19.5127 5.046C19.8102 5.08601 19.8507 5.14355 19.8536 5.14645L20.5607 4.43934L21.2678 3.73223C20.8313 3.29579 20.2985 3.13366 19.7792 3.06383C19.2886 2.99788 18.6788 3 18 3L18 4ZM21 7L22 7C22 6.32116 22.0021 5.71144 21.9362 5.22084C21.8663 4.70149 21.7042 4.16867 21.2678 3.73223L20.5607 4.43934L19.8536 5.14645C19.8565 5.14935 19.914 5.18976 19.954 5.48734C19.9979 5.81369 20 6.26462 20 7L21 7ZM15 4L15 3C14.3212 3 13.7114 2.99788 13.2208 3.06383C12.7015 3.13366 12.1687 3.29579 11.7322 3.73223L12.4393 4.43934L13.1465 5.14645C13.1494 5.14355 13.1898 5.08601 13.4873 5.046C13.8137 5.00212 14.2646 5 15 5L15 4ZM12 7L13 7C13 6.26462 13.0021 5.81369 13.046 5.48734C13.086 5.18976 13.1436 5.14935 13.1465 5.14645L12.4393 4.43934L11.7322 3.73223C11.2958 4.16867 11.1337 4.70149 11.0638 5.22084C10.9979 5.71144 11 6.32116 11 7L12 7ZM14.25 13L13.25 13L13.25 16L14.25 16L15.25 16L15.25 13L14.25 13ZM18.75 13L17.75 13L17.75 16L18.75 16L19.75 16L19.75 13L18.75 13ZM14.25 1L13.25 1L13.25 4L14.25 4L15.25 4L15.25 1L14.25 1ZM18.75 1L17.75 1L17.75 4L18.75 4L19.75 4L19.75 1L18.75 1ZM12 6.25L12 5.25L9 5.25L9 6.25L9 7.25L12 7.25L12 6.25ZM12 10.75L12 9.75L9 9.75L9 10.75L9 11.75L12 11.75L12 10.75ZM24 6.25L24 5.25L21 5.25L21 6.25L21 7.25L24 7.25L24 6.25ZM24 10.75L24 9.75L21 9.75L21 10.75L21 11.75L24 11.75L24 10.75Z"
        fill="#B55331"
      />
    </svg>
  );
}

function AiBrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 36 36">
      <path
        d="M9.33333 5.16687C6.57191 5.16687 4.33333 7.40545 4.33333 10.1669C4.33333 11.1146 4.59703 12.0008 5.05506 12.756C2.74545 13.1978 1 15.2285 1 17.6669C1 20.1052 2.74545 22.1359 5.05506 22.5777M9.33333 5.16687C9.33333 2.86568 11.1988 1.0002 13.5 1.0002C15.8012 1.0002 17.6667 2.86568 17.6667 5.16687V30.1669C17.6667 32.4681 15.8012 34.3335 13.5 34.3335C11.1988 34.3335 9.33333 32.4681 9.33333 30.1669C6.57191 30.1669 4.33333 27.9283 4.33333 25.1669C4.33333 24.2191 4.59703 23.3329 5.05506 22.5777M9.33333 5.16687C9.33333 6.53005 9.98796 7.74034 11 8.50051M5.05506 22.5777C5.64914 21.5982 6.57012 20.839 7.66667 20.4514"
        stroke="#B55331"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M26.0007 30.1667C28.7621 30.1667 31.0007 27.9281 31.0007 25.1667C31.0007 24.2189 30.737 23.3327 30.2789 22.5775C32.5885 22.1357 34.334 20.105 34.334 17.6667C34.334 15.2283 32.5885 13.1976 30.2789 12.7558M26.0007 30.1667C26.0007 32.4679 24.1352 34.3333 21.834 34.3333C19.5328 34.3333 17.6673 32.4679 17.6673 30.1667L17.6673 5.16667C17.6673 2.86548 19.5328 1 21.834 1C24.1352 1 26.0007 2.86548 26.0007 5.16667C28.7621 5.16667 31.0007 7.40524 31.0007 10.1667C31.0007 11.1144 30.737 12.0006 30.2789 12.7558M26.0007 30.1667C26.0007 28.8035 25.346 27.5932 24.334 26.833M30.2789 12.7558C29.6848 13.7354 28.7639 14.4946 27.6673 14.8822"
        stroke="#1A2130"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const valuePropItems = [
  {
    icon: SoftwareLicenseIcon,
    line1: "AI-First UX Specialists for",
    line2: "Every Stage of Design",
  },
  {
    icon: AiChatIcon,
    line1: "Design Scanner with",
    line2: "Instant Scored Recommendations",
  },
  {
    icon: AiLearningIcon,
    line1: "350+ UX/UI/CRO",
    line2: "Principles & Insights",
  },
  {
    icon: AiBrainIcon,
    line1: "Built & Trained by",
    line2: "Certified UX Professionals",
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function StatsBar() {
  const inFlowRef = useRef<HTMLDivElement>(null);
  const [showFixed, setShowFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!inFlowRef.current) return;
      const rect = inFlowRef.current.getBoundingClientRect();
      // Hide fixed bar the instant the in-flow bar's bottom reaches viewport bottom.
      // At that moment both bars are at the exact same visual position — no flash.
      setShowFixed(rect.bottom > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const barInner = (
    <div className="relative w-full bg-white lg:bg-gradient-to-b lg:from-white/80 lg:to-white/95 lg:backdrop-blur-xl lg:supports-[backdrop-filter]:bg-white/60 border-t border-[#99825d]/30 lg:shadow-[0_-8px_30px_rgba(0,0,0,0.04)] lg:transition-colors lg:duration-300 after:hidden lg:after:block after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#99825d]/10 after:to-white/20 after:pointer-events-none">
      <div className="max-w-[1200px] mx-auto lg:px-[24px] py-[28px] px-[16px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:flex lg:flex-row lg:flex-nowrap lg:gap-x-0 lg:gap-y-0 items-start lg:items-center justify-between w-full">
          {valuePropItems.map((item, index) => (
            <div key={item.line1} className="contents">
              {index > 0 && (
                <div className="hidden lg:block h-10 w-px bg-gray-200 shrink-0 mx-6" />
              )}
              <div className="flex flex-col lg:flex-row items-center gap-2.5 lg:gap-3 shrink min-w-0 text-center lg:text-left">
                <div className="w-8 h-8 lg:w-11 lg:h-11 shrink-0 flex items-center justify-center text-[#99825d] bg-[#99825d]/5 rounded-full lg:bg-transparent lg:rounded-none">
                  <item.icon className="w-full h-full" />
                </div>
                <span className="text-[12px] lg:text-[13px] font-bold text-[#1a2130] leading-tight tracking-wide max-w-full lg:max-w-none">
                  {item.line1}
                  <br className="hidden lg:block" />
                  {" "}{item.line2}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Fixed bar at bottom — desktop only; hidden on mobile */}
      <div
        className={`hidden lg:block fixed bottom-0 left-0 right-0 z-50 ${
          showFixed ? "" : "invisible pointer-events-none"
        }`}
      >
        {barInner}
      </div>

      {/* In-flow bar — scrolls naturally with the page */}
      <div ref={inFlowRef} className="relative z-40">
        {barInner}
      </div>
    </>
  );
}
