"use client";

import { useState } from "react";
import Image from "next/image";

/* ── Portfolio items (from Figma Consulting 3.0) ─────────────────────── */

const portfolioItems = [
  { src: "/images/consulting/portfolio/learning-dashboard.jpg", label: "Learning Dashboard", type: "desktop" as const },
  { src: "/images/consulting/portfolio/online-learning-app.jpg", label: "Online Learning App", type: "mobile" as const },
  { src: "/images/consulting/portfolio/live-streaming.jpg", label: "Live Streaming Screen", type: "mobile" as const },
  { src: "/images/consulting/portfolio/subscription-screen.jpg", label: "Subscription Screen", type: "mobile" as const },
  { src: "/images/consulting/portfolio/product-detail.jpg", label: "Product Detail Page", type: "desktop" as const },
  { src: "/images/consulting/portfolio/products-page.jpg", label: "Products Page", type: "desktop" as const },
  { src: "/images/consulting/portfolio/product-detail-2.jpg", label: "Product Detail Page", type: "desktop" as const },
  { src: "/images/consulting/portfolio/product-features.jpg", label: "Product Features Page", type: "desktop" as const },
  { src: "/images/consulting/portfolio/product-layer-details.jpg", label: "Product Layer Details", type: "desktop" as const },
  { src: "/images/consulting/portfolio/product-features-section.jpg", label: "Product Features Section", type: "desktop" as const },
  { src: "/images/consulting/portfolio/property-finder-homepage.jpg", label: "Property Finder Homepage", type: "desktop" as const },
  { src: "/images/consulting/portfolio/property-finder-screen.jpg", label: "Property Finder Screen", type: "desktop" as const },
  { src: "/images/consulting/portfolio/property-finder-app.jpg", label: "Property Finder App", type: "mobile" as const },
  { src: "/images/consulting/portfolio/property-detail-page.jpg", label: "Property Detail Page", type: "mobile" as const },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function RealResults() {
  const [isPaused, setIsPaused] = useState(false);

  const portfolioCards = portfolioItems.map((item, i) => (
    <div key={i} className="flex flex-col gap-4 shrink-0">
      <div
        className={`relative overflow-hidden rounded-[32px] pointer-events-none h-[470px] ${
          item.type === "mobile" ? "w-[220px]" : "w-[690px]"
        }`}
      >
        <Image
          src={item.src}
          alt={item.label}
          width={item.type === "mobile" ? 750 : 1140}
          height={item.type === "mobile" ? 1624 : 779}
          className="block w-full h-full object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-[-0.5px] rounded-[32.5px] border border-[#e9e9e9] shadow-[0px_4px_24px_0px_rgba(213,199,155,0.24)]"
        />
      </div>
      <p className="text-[15px] font-medium text-[#464646]">{item.label}</p>
    </div>
  ));

  return (
    <section className="bg-[#F8F7F4] overflow-hidden pb-8 lg:pb-12">
      {/* Description text (moved from hero) */}
      <div className="container-default pt-8 lg:pt-12 pb-8">
        <p className="text-lg md:text-xl leading-relaxed font-normal text-[rgb(113,128,150)] max-w-3xl text-center lg:text-left px-2 md:px-0">
          We help e-commerce and SaaS companies strategize (UX), design (UI), and optimize conversions (CRO) using AI-powered audits and validated prototypes.
        </p>
      </div>

      {/* Portfolio marquee */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex items-center gap-6 w-max animate-marquee cursor-grab active:cursor-grabbing pb-[100px]"
          style={{
            animationDuration: "100s",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* First set */}
          <div className="flex items-center gap-6 pl-10">
            {portfolioCards}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-6">
            {portfolioCards}
          </div>
        </div>
      </div>
    </section>
  );
}
