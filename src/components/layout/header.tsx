"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* =============================================================================
 * DESIGNERS: Navigation Configuration
 * =============================================================================
 * Update this array to change navigation links site-wide.
 * The active link for "Product" uses href "/" (homepage).
 * Sub-navigation (Features, Pricing, FAQ) appears below on the homepage.
 * ========================================================================== */
const navigation = [
  { label: "Product", href: "/" },
  { label: "UX Consulting", href: "/ux-consulting" },
  { label: "AI-First UX Training", href: "/training" },
  { label: "Free Articles", href: "/free-articles" },
];

/* DESIGNERS: ProUX Logo SVG — replace with updated brand mark if needed */
function ProUXLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 132 22"
    >
      <g clipPath="url(#clip0_2007_1606)">
        {/* DESIGNERS: Mark color — currently copper #B55331 */}
        <path
          d="M22.3151 0C21.473 7.89874 15.5786 10.8088 10.9473 10.8088V21.6176C27.3674 21.6176 33.2618 7.06729 33.2618 0H22.3151Z"
          fill="#B55331"
        />
        <path d="M10.9468 0H0V10.8088H10.9468V0Z" fill="#B55331" />
        {/* DESIGNERS: "Pro" text color — currently navy #1A2130 */}
        <path
          d="M39.9531 21.6936V0.0529785H49.0373C50.6837 0.0529785 52.1047 0.36998 53.3001 1.00398C54.5028 1.63094 55.4298 2.50797 56.0812 3.63509C56.7326 4.75516 57.0583 6.05839 57.0583 7.54477C57.0583 9.0382 56.7255 10.3449 56.0597 11.465C55.4012 12.578 54.4598 13.441 53.2357 14.0539C52.0116 14.6667 50.5584 14.9732 48.8762 14.9732H43.2711V10.8521H47.8883C48.6901 10.8521 49.3594 10.7148 49.8963 10.44C50.4403 10.1653 50.8519 9.78139 51.1311 9.28828C51.4103 8.78812 51.5499 8.20695 51.5499 7.54477C51.5499 6.87555 51.4103 6.2979 51.1311 5.81183C50.8519 5.31872 50.4403 4.93832 49.8963 4.67063C49.3522 4.40294 48.6829 4.26909 47.8883 4.26909H45.2683V21.6936H39.9531Z"
          fill="#1A2130"
        />
        <path
          d="M59.6787 21.6936V5.46313H64.7791V8.42181H64.9509C65.2515 7.35105 65.7419 6.55502 66.422 6.03373C67.102 5.5054 67.893 5.24123 68.795 5.24123C69.0384 5.24123 69.2889 5.25884 69.5466 5.29406C69.8043 5.32224 70.0442 5.36803 70.2661 5.43143V9.92228C70.0155 9.83774 69.6862 9.77082 69.2782 9.72151C68.8773 9.6722 68.5194 9.64754 68.2044 9.64754C67.5816 9.64754 67.0197 9.78491 66.5186 10.0596C66.0247 10.3273 65.6345 10.7042 65.3482 11.1903C65.069 11.6693 64.9294 12.2329 64.9294 12.881V21.6936H59.6787Z"
          fill="#1A2130"
        />
        <path
          d="M79.2485 22C77.5161 22 76.0272 21.6513 74.7816 20.9539C73.5432 20.2495 72.5875 19.2703 71.9146 18.0164C71.2489 16.7554 70.916 15.2937 70.916 13.6312C70.916 11.9617 71.2489 10.4999 71.9146 9.24601C72.5875 7.98505 73.5432 7.00587 74.7816 6.30847C76.0272 5.60402 77.5161 5.2518 79.2485 5.2518C80.9808 5.2518 82.4662 5.60402 83.7046 6.30847C84.9502 7.00587 85.9059 7.98505 86.5716 9.24601C87.2445 10.4999 87.581 11.9617 87.581 13.6312C87.581 15.2937 87.2445 16.7554 86.5716 18.0164C85.9059 19.2703 84.9502 20.2495 83.7046 20.9539C82.4662 21.6513 80.9808 22 79.2485 22ZM79.2807 18.1009C79.9106 18.1009 80.444 17.9107 80.8806 17.5303C81.3173 17.1499 81.6502 16.6216 81.8792 15.9453C82.1155 15.269 82.2336 14.4871 82.2336 13.5995C82.2336 12.6978 82.1155 11.9088 81.8792 11.2325C81.6502 10.5563 81.3173 10.0279 80.8806 9.64754C80.444 9.26714 79.9106 9.07694 79.2807 9.07694C78.6293 9.07694 78.0781 9.26714 77.6271 9.64754C77.1833 10.0279 76.8432 10.5563 76.607 11.2325C76.3779 11.9088 76.2634 12.6978 76.2634 13.5995C76.2634 14.4871 76.3779 15.269 76.607 15.9453C76.8432 16.6216 77.1833 17.1499 77.6271 17.5303C78.0781 17.9107 78.6293 18.1009 79.2807 18.1009Z"
          fill="#1A2130"
        />
        {/* DESIGNERS: "UX" text color — currently copper #B55331 */}
        <path
          d="M103.575 0.0529785H108.879V14.0116C108.879 15.6248 108.489 17.0301 107.709 18.2277C106.928 19.4182 105.84 20.341 104.444 20.9962C103.048 21.6443 101.427 21.9683 99.5801 21.9683C97.7117 21.9683 96.0796 21.6443 94.6837 20.9962C93.2878 20.341 92.2033 19.4182 91.4301 18.2277C90.657 17.0301 90.2705 15.6248 90.2705 14.0116V0.0529785H95.5857V13.5572C95.5857 14.3039 95.7503 14.9696 96.0796 15.5543C96.416 16.139 96.8849 16.5969 97.4862 16.928C98.0875 17.2591 98.7855 17.4246 99.5801 17.4246C100.375 17.4246 101.069 17.2591 101.663 16.928C102.265 16.5969 102.733 16.139 103.07 15.5543C103.406 14.9696 103.575 14.3039 103.575 13.5572V0.0529785Z"
          fill="#B55331"
        />
        <path
          d="M117.59 0.0529785L121.606 6.88963H121.778L125.837 0.0529785H131.785L125.149 10.8733L132 21.6936H125.901L121.778 14.783H121.606L117.483 21.6936H111.426L118.245 10.8733L111.598 0.0529785H117.59Z"
          fill="#B55331"
        />
      </g>
      <defs>
        <clipPath id="clip0_2007_1606">
          <rect fill="white" height="22" width="132" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* DESIGNERS: Sticky header — adjust height via h-[72px], bg via bg classes
       The header becomes slightly more opaque/bordered on scroll */
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm border-b border-border" : ""
      }`}
    >
      <div className="container-default flex h-[72px] items-center justify-between">
        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link href="/" className="flex-shrink-0">
          <ProUXLogo className="h-5 w-auto sm:h-6" />
        </Link>

        {/* ── Desktop Navigation ─────────────────────────────────── */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTA Buttons ────────────────────────────────── */}
        {/* DESIGNERS: Change button styles here. "LOG IN" is ghost, "START FREE TRIAL" is solid dark */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="https://app.proux.design/Auth"
            className="text-sm font-bold text-foreground hover:text-foreground/80 transition-colors"
          >
            LOG IN
          </Link>
          <Button
            asChild
            className="rounded-full bg-proux-navy px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2a3347]"
            style={{ backgroundColor: "hsl(var(--proux-navy))" }}
          >
            <Link href="https://app.proux.design/Auth">START FREE TRIAL</Link>
          </Button>
        </div>

        {/* ── Mobile Menu ────────────────────────────────────────── */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[360px]">
            <nav className="flex flex-col gap-6 pt-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t pt-6">
                <Button variant="outline" asChild className="rounded-full">
                  <Link href="https://app.proux.design/Auth" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-foreground text-white hover:bg-foreground/90"
                >
                  <Link href="https://app.proux.design/Auth" onClick={() => setIsOpen(false)}>
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
