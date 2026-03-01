"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* Mini ProUX logo mark (just the icon, no wordmark) */
function ProUXMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 34 22"
    >
      <path
        d="M22.3151 0C21.473 7.89874 15.5786 10.8088 10.9473 10.8088V21.6176C27.3674 21.6176 33.2618 7.06729 33.2618 0H22.3151Z"
        fill="#B55331"
      />
      <path d="M10.9468 0H0V10.8088H10.9468V0Z" fill="#B55331" />
    </svg>
  );
}

export default function ProductSecondaryNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight > docHeight - 400;

      setVisible(scrollY > winHeight && !nearBottom);

      // Determine active section
      const sections = ["features", "pricing", "faq"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Floating pill nav — mobile + desktop */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 rounded-full px-3 py-2 md:px-8 md:py-3 transition-all duration-300 animate-fade-in"
      >
        <Link href="/" className="mr-2 md:mr-4 flex-shrink-0">
          <ProUXMark className="h-5 w-auto" />
        </Link>

        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-[11px] md:text-[13px] font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors ${
                isActive
                  ? "bg-[#F0EEE4] text-[#1a2130]"
                  : "text-[#4A5568] hover:bg-[#F0EEE4] hover:text-[#1a2130]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Sticky bottom CTA bar — mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#dfdbc9] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 transition-all duration-500 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="https://app.proux.design/Auth"
          className="btn-shine flex items-center justify-center w-full rounded-[12px] bg-primary h-[56px] text-[14px] font-bold uppercase tracking-[1px] text-white shadow-lg transition-all hover:brightness-110"
        >
          Start Free
        </Link>
      </div>
    </>
  );
}
