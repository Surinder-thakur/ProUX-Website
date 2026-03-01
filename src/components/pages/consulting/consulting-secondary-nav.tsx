"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ROI Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Consultation", href: "#consultation" },
];

export default function ConsultingSecondaryNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll-based visibility (hide near bottom)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight > docHeight - 400;

      setIsVisible(scrollY > winHeight && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
      }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  return (
    <>
      {/* Floating pill nav — top */}
      <nav
        aria-label="Consulting page navigation"
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[100]",
          "flex items-center gap-1",
          "bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 rounded-full",
          "px-3 py-2 md:px-6 md:py-3",
          "transition-all duration-500 ease-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        {/* Logo icon - scrolls to top on click */}
        <button
          onClick={handleLogoClick}
          className="mr-2 md:mr-4 flex-shrink-0 cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-auto" fill="none" viewBox="0 0 34 22">
            <path d="M22.3151 0C21.473 7.89874 15.5786 10.8088 10.9473 10.8088V21.6176C27.3674 21.6176 33.2618 7.06729 33.2618 0H22.3151Z" fill="#B55331" />
            <path d="M10.9468 0H0V10.8088H10.9468V0Z" fill="#B55331" />
          </svg>
        </button>

        {/* Nav links */}
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 md:px-4 md:py-2",
                "text-[11px] md:text-[13px] font-medium",
                "transition-colors duration-200",
                isActive
                  ? "bg-[#F0EEE4] text-[#1a2130]"
                  : "text-[#4A5568] hover:bg-[#F0EEE4] hover:text-[#1a2130]"
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Sticky bottom CTA bar — mobile */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[100] lg:hidden",
          "bg-white/95 backdrop-blur-xl border-t border-[#dfdbc9] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
          "px-4 py-3",
          "transition-all duration-500 ease-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <a
          href="#consultation"
          onClick={(e) => handleNavClick(e, "#consultation")}
          className="btn-shine flex items-center justify-center w-full rounded-[12px] bg-primary h-[56px] text-[14px] font-bold uppercase tracking-[1px] text-white shadow-lg transition-all hover:brightness-110"
        >
          Book UX Consultation
        </a>
      </div>
    </>
  );
}
