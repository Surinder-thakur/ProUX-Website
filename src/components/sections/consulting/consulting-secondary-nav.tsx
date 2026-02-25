"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ROI Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing-section" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Consultation", href: "#consultation" },
];

export default function ConsultingSecondaryNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position in case the page is already scrolled
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
      {/* Logo - scrolls to top on click */}
      <button
        onClick={handleLogoClick}
        className="mr-2 md:mr-4 flex-shrink-0 cursor-pointer"
        aria-label="Scroll to top"
      >
        <Image
          src="/images/proux-logo.svg"
          alt="ProUX"
          width={80}
          height={14}
          className="h-3.5 w-auto md:h-4"
          priority
        />
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
              "text-[11px] md:text-[14px] font-medium",
              "transition-colors duration-200",
              isActive
                ? "bg-[hsl(var(--bg-primary-100))] text-foreground"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
