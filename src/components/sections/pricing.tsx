"use client";

import React, { useState, useRef, createContext, useContext } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

/* ══════════════════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════════════════ */

interface FeatureItem {
  label: React.ReactNode;
  tooltip: string;
}

interface FeatureGroup {
  category: string;
  items: FeatureItem[];
}

interface PricingTier {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  price: string;
  billing: string;
  buttonLabel: string;
  buttonVariant: "outline" | "filled" | "outline-light";
  features: FeatureGroup[];
  expandableFeatures?: FeatureGroup[];
  badge?: React.ReactNode;
  showGuarantee?: boolean;
  bottomBadge?: React.ReactNode;
  isDark?: boolean;
  hasToggle?: boolean;
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTEXT (for tooltip theme awareness)
   ══════════════════════════════════════════════════════════════════════════ */

const CardThemeContext = createContext<{
  isDark: boolean;
  containerRef: React.RefObject<HTMLDivElement | null> | null;
}>({ isDark: false, containerRef: null });

/* ══════════════════════════════════════════════════════════════════════════
   INLINE SVG ICONS
   ══════════════════════════════════════════════════════════════════════════ */

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path
          d="M11.998 22.001C17.498 22.001 21.998 17.501 21.998 12.001C21.998 6.50098 17.498 2.00098 11.998 2.00098C6.49805 2.00098 1.99805 6.50098 1.99805 12.001C1.99805 17.501 6.49805 22.001 11.998 22.001Z"
          fill="#47AB19"
        />
        <path
          d="M7.75195 11.9999L10.582 14.8299L16.252 9.16992"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function ExplorerIcon() {
  return (
    <div className="relative shrink-0 size-8">
      <div className="absolute inset-[12.5%]">
        <div className="absolute inset-[-3.14%]">
          <svg className="block size-full" fill="none" viewBox="0 0 26 26">
            <path
              d="M5.54949 12.6504C12.313 0.0447091 20.7348 -0.100652 24.1003 1.40238C25.6033 4.76784 25.4579 13.1896 12.8522 19.9532C12.7215 19.2017 11.9945 17.233 10.1321 15.3706C8.26964 13.5082 6.301 12.7811 5.54949 12.6504Z"
              stroke="hsl(var(--foreground))"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M14.5495 19.3531C17.0008 20.5531 17.2625 22.7049 17.6021 24.7531C17.6021 24.7531 22.7363 20.9577 19.4522 15.7531"
              stroke="hsl(var(--foreground))"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M6.14996 11.0557C4.94995 8.60433 2.79821 8.34261 0.750006 8.00303C0.750006 8.00303 4.54534 2.86884 9.74997 6.15298"
              stroke="hsl(var(--foreground))"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M4.77412 16.6348C4.09168 17.3173 2.93152 19.2964 3.75045 21.7532C6.20726 22.5721 8.18635 21.4119 8.8688 20.7295"
              stroke="hsl(var(--primary))"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M19.8177 8.01988C19.8177 6.73122 18.773 5.68655 17.4844 5.68655C16.1957 5.68655 15.151 6.73122 15.151 8.01988C15.151 9.30855 16.1957 10.3532 17.4844 10.3532C18.773 10.3532 19.8177 9.30855 19.8177 8.01988Z"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProIcon() {
  return (
    <div className="relative shrink-0 size-8">
      <div className="absolute inset-[8.33%_12.5%]">
        <div className="absolute inset-[-2.81%_-3.12%]">
          <svg className="block size-full" fill="none" viewBox="0 0 26 29">
            <path
              d="M1.44074 11.8243C0.92332 10.3923 0.664612 9.67635 0.774928 9.21753C0.895589 8.71569 1.25247 8.32446 1.70865 8.19394C2.12572 8.07462 2.77452 8.36298 4.07211 8.9397C5.21986 9.44981 5.79373 9.70487 6.33291 9.69068C6.92657 9.67505 7.49766 9.43698 7.95195 9.01574C8.36455 8.63316 8.64129 8.0235 9.19479 6.80418L10.4146 4.117C11.4335 1.87233 11.943 0.75 12.7498 0.75C13.5566 0.75 14.0661 1.87233 15.085 4.117L16.3048 6.80418C16.8583 8.0235 17.1351 8.63316 17.5477 9.01574C18.002 9.43698 18.5731 9.67505 19.1667 9.69068C19.7059 9.70487 20.2798 9.44981 21.4275 8.9397C22.7251 8.36298 23.3739 8.07462 23.791 8.19394C24.2472 8.32446 24.604 8.71569 24.7247 9.21753C24.835 9.67635 24.5763 10.3923 24.0589 11.8243L21.8349 17.9796C20.8835 20.6126 20.4078 21.9292 19.4123 22.6729C18.4168 23.4167 17.1304 23.4167 14.5575 23.4167H10.9421C8.36927 23.4167 7.08284 23.4167 6.08735 22.6729C5.09186 21.9292 4.61617 20.6126 3.66478 17.9796L1.44074 11.8243Z"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
            <path
              d="M12.7498 16.75H12.7618"
              stroke="hsl(var(--foreground))"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M6.08315 27.4167H19.4165"
              stroke="hsl(var(--primary))"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon({ color = "hsl(var(--annotation-green-600))" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[8.33%_12.5%]">
        <div className="absolute inset-[-3.75%_-4.16%]">
          <svg className="block size-full" fill="none" viewBox="0 0 20 22">
            <path
              d="M9.74706 0.75C6.89759 0.75 5.04999 2.76899 2.86491 3.5049C1.97644 3.80413 1.53221 3.95374 1.35243 4.16465C1.17264 4.37556 1.12 4.68375 1.01471 5.30013C-0.111986 11.896 2.35066 17.994 8.22378 20.3675C8.85481 20.6225 9.17033 20.75 9.75017 20.75C10.33 20.75 10.6455 20.6225 11.2765 20.3675C17.1492 17.9939 19.6095 11.896 18.4825 5.30013C18.3772 4.68364 18.3245 4.3754 18.1447 4.16449C17.9649 3.95358 17.5207 3.80405 16.6323 3.50499C14.4463 2.76915 12.5966 0.75 9.74706 0.75Z"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AwardIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[8.33%_18.75%]">
        <div className="absolute inset-[-5%_-13.33%_0_-13.33%]">
          <svg className="block size-full" fill="none" viewBox="0 0 19 21">
            <path
              d="M8.76358 18.7761L6.49008 20.0205C4.95397 20.8614 4.18592 21.2818 3.74365 20.793C3.30139 20.3043 3.51669 19.2731 3.94731 17.2107L4.61752 14.0008H14.3825L15.0527 17.2107C15.4833 19.2731 15.6986 20.3043 15.2563 20.793C14.8141 21.2818 14.046 20.8614 12.5099 20.0205L10.2364 18.7761C9.87339 18.5774 9.69186 18.478 9.5 18.478C9.30814 18.478 9.12662 18.5774 8.76358 18.7761Z"
              fill="hsl(var(--annotation-yellow-600))"
            />
            <g filter="url(#award_shadow)">
              <path
                d="M2 8.5C2 12.6421 5.35786 16 9.5 16C13.6421 16 17 12.6421 17 8.5C17 4.35786 13.6421 1 9.5 1C5.35786 1 2 4.35786 2 8.5Z"
                fill="hsl(var(--annotation-yellow-600))"
              />
            </g>
            <path
              d="M6.5 9.16744C6.5 9.16744 7.25 9.16744 8 10.5008C8 10.5008 10.3824 7.16744 12.5 6.50078"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="19"
                id="award_shadow"
                width="19"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  mode="normal"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayerIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path
          d="M6.19131 18.5C5.97274 18.5 5.77951 18.358 5.71417 18.1495L2.64966 8.36676C2.49101 7.86032 3.12663 7.48815 3.49064 7.87434L7.32164 11.9387C7.56395 12.1958 7.98919 12.1274 8.13858 11.8072L11.5522 4.49202C11.7334 4.10379 12.287 4.10831 12.4618 4.49945L15.6087 11.541C15.7502 11.8577 16.1634 11.9376 16.4128 11.6964L20.5881 7.65835C20.9606 7.29809 21.5678 7.67271 21.4128 8.16723L18.2858 18.1495C18.2205 18.358 18.0273 18.5 17.8087 18.5H6.19131Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="transition-transform duration-200"
      style={{ transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)" }}
    >
      <svg className="block w-[7px] h-3" fill="none" viewBox="0 0 7 12">
        <path
          d="M4.455 5.7276L0 1.2726L1.2726 0L7.0002 5.7276L1.2726 11.4552L0 10.1826L4.455 5.7276Z"
          className="fill-primary"
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RESPONSIVE TOOLTIP (Desktop: tooltip · Mobile: drawer)
   ══════════════════════════════════════════════════════════════════════════ */

function ResponsiveTooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, containerRef } = useContext(CardThemeContext);

  return (
    <>
      {/* Desktop tooltip */}
      <div className="hidden md:block w-full">
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            side="top"
            className={`${
              isDark
                ? "bg-[hsl(var(--sidebar))] text-foreground border-0"
                : "bg-foreground text-primary-foreground border-0"
            } max-w-[260px] px-4 py-3 text-sm break-words`}
            collisionBoundary={
              containerRef?.current ? [containerRef.current] : undefined
            }
            collisionPadding={16}
          >
            <p className="font-normal leading-snug">{content}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* Mobile drawer */}
      <div className="md:hidden w-full">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex justify-between items-center pb-0">
                <DrawerTitle className="font-bold text-foreground">
                  Detail
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  Feature details
                </DrawerDescription>
                <DrawerClose asChild>
                  <button type="button" aria-label="Close" className="p-2 rounded-full transition-colors text-foreground">
                    <X className="size-5" />
                  </button>
                </DrawerClose>
              </DrawerHeader>
              <div className="p-4 pt-2 pb-8 text-foreground">{content}</div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURE ROW
   ══════════════════════════════════════════════════════════════════════════ */

function FeatureRow({
  feature,
  isDark,
}: {
  feature: FeatureItem;
  isDark?: boolean;
}) {
  const textColor = isDark
    ? "hsl(var(--primary-foreground))"
    : "hsl(var(--foreground))";
  const dashColor = isDark
    ? "hsl(var(--sidebar))"
    : "hsl(var(--accent))";

  return (
    <ResponsiveTooltip content={feature.tooltip}>
      <div className="flex gap-3 items-start w-full cursor-default">
        <CheckIcon />
        <div
          className="grow text-sm font-normal leading-5 tracking-[-0.084px]"
          style={{
            color: textColor,
            textDecoration: "underline",
            textDecorationStyle: "dashed",
            textDecorationColor: dashColor,
            textUnderlineOffset: "3px",
            textDecorationThickness: "1px",
          }}
        >
          {feature.label}
        </div>
      </div>
    </ResponsiveTooltip>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════════ */

function CategoryLabel({
  label,
  isDark,
}: {
  label: string;
  isDark?: boolean;
}) {
  return (
    <p
      className="text-sm font-bold leading-5 tracking-[-0.154px]"
      style={{
        color: isDark
          ? "hsl(var(--sidebar-border))"
          : "hsl(var(--accent))",
      }}
    >
      {label}
    </p>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <span className="font-medium tracking-[-0.154px]">{children}</span>;
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING DATA
   ══════════════════════════════════════════════════════════════════════════ */

const tiers: PricingTier[] = [
  /* ── Explorer (Free) ── */
  {
    icon: <ExplorerIcon />,
    name: "Explorer",
    tagline: "Perfect for designers just getting started with AI.",
    price: "$0/forever",
    billing: "No CC required",
    buttonLabel: "Start Free",
    buttonVariant: "outline",
    features: [
      {
        category: "AI Workflow Superpowers",
        items: [
          {
            label: (
              <>
                Enhance up to <B>3 prompts</B> with our AI-tuned model
              </>
            ),
            tooltip:
              "Our AI prompt enhancer rewrites your design prompts for better results. Free plan includes 3 enhanced prompts so you can try it out before committing.",
          },
          {
            label: (
              <>
                Scan <B>1 design</B> and get an actionable improvement report
              </>
            ),
            tooltip:
              "Submit any URL or design file and get a scored UX audit with prioritized fixes. Your free scan includes feedback across usability, content clarity, and conversion potential.",
          },
        ],
      },
      {
        category: "Research Vault",
        items: [
          {
            label:
              "Limited access to our curated UX guidelines & global principles",
            tooltip:
              "Browse a subset of our 350+ research-backed UX principles and page-specific guidelines. Enough to see the depth of the library before unlocking the full collection.",
          },
          {
            label:
              "Limited access to real product UX insights (& examples)",
            tooltip:
              "Preview scored UX breakdowns of real products showing what works and why. Limited to a rotating selection so you can see the quality of analysis we provide.",
          },
        ],
      },
      {
        category: "Execution & Organization",
        items: [
          {
            label: "Save a small personal library of your favorites",
            tooltip:
              "Bookmark up to 10 guidelines, principles, or insights to build a personal reference library you can return to anytime.",
          },
          {
            label: "Track progress on a personalized dashboard",
            tooltip:
              "Your dashboard shows scan history, saved items, and learning progress so you can pick up where you left off.",
          },
        ],
      },
    ],
  },

  /* ── Pro (with monthly/yearly toggle) ── */
  {
    icon: <ProIcon />,
    name: "Pro",
    tagline:
      "For designers who want to master AI and ship world\u2011class products fast.",
    price: "$99/mo",
    billing: "",
    buttonLabel: "Upgrade to Pro",
    buttonVariant: "filled",
    showGuarantee: true,
    hasToggle: true,
    badge: (
      <div
        className="absolute flex gap-1.5 items-center justify-center px-4 py-[5px] left-1/2 -translate-x-1/2 top-[-17px] whitespace-nowrap"
        style={{
          backgroundImage:
            "linear-gradient(102.56deg, rgb(221, 160, 62) 19.306%, rgb(212, 147, 26) 118.95%)",
          borderRadius: "calc(var(--radius) + 2px)",
        }}
      >
        <LayerIcon />
        <span
          className="text-xs font-semibold leading-5 tracking-wide uppercase"
          style={{ color: "hsl(var(--sidebar))" }}
        >
          MOST POPULAR
        </span>
      </div>
    ),
    features: [
      {
        category: "AI Workflow Superpowers",
        items: [
          {
            label: (
              <>
                <B>Enhance unlimited prompts</B> with our AI-tuned model
              </>
            ),
            tooltip:
              "No caps. Rewrite every prompt through our AI model fine-tuned on UX best practices. Better prompts \u2192 better AI output \u2192 better designs, every single time.",
          },
          {
            label: (
              <>
                <B>Run unlimited design scans</B> – instant reports &
                actionable fixes
              </>
            ),
            tooltip:
              "Scan any URL or design file as many times as you want. Each scan delivers a scored report with prioritized UX, UI, content, and CRO improvements you can act on immediately.",
          },
          {
            label: (
              <>
                Generate concepts up to <B>10× faster with AI assistance</B>
              </>
            ),
            tooltip:
              "Use our AI specialists to generate wireframes, user flows, copy alternatives, and UX rationale in minutes instead of hours. Design faster without sacrificing quality.",
          },
        ],
      },
      {
        category: "Research Vault",
        items: [
          {
            label: (
              <>
                <B>Full access</B> to our{" "}
                <B>UX guideline & global principles</B> library
              </>
            ),
            tooltip:
              "Unlock all 350+ research-backed principles and page-specific checklists. Filter by goal (conversion, retention, engagement) and apply proven patterns to any design.",
          },
          {
            label: (
              <>
                <B>Full access</B> to our product{" "}
                <B>UX insight database</B> (real apps, real results)
              </>
            ),
            tooltip:
              "Explore our complete library of scored product analyses with expert annotations. See exactly why designs succeed or fail, and apply those lessons to your own work.",
          },
        ],
      },
    ],
    expandableFeatures: [
      {
        category: "Execution & Organization",
        items: [
          {
            label: "Save a small personal library of your favorites",
            tooltip:
              "Bookmark unlimited guidelines, principles, or insights to build your personal reference library.",
          },
          {
            label: "Track progress on a personalized dashboard",
            tooltip:
              "Your dashboard shows scan history, saved items, and learning progress so you can pick up where you left off.",
          },
        ],
      },
    ],
  },

];

/* ══════════════════════════════════════════════════════════════════════════
   PRICING CARD
   ══════════════════════════════════════════════════════════════════════════ */

function PricingCard({
  tier,
  order,
}: {
  tier: PricingTier;
  order: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = tier.isDark ?? false;

  /* Grid row template — every card uses the same rows so content aligns
     Row 1: icon          (56px)
     Row 2: name          (auto)
     Row 3: tagline       (48px)
     Row 4: toggle/badge  (40px)
     Row 5: price area    (110px)
     Row 6: CTA button    (56px)
     Row 7: guarantee     (28px)
     Row 8: divider       (1px via border)
     Row 9+: features     (auto)
  */
  const gridRows = "56px auto 48px 40px 110px 56px 28px";

  return (
    <CardThemeContext.Provider
      value={{ isDark, containerRef }}
    >
      <div
        ref={containerRef}
        className={`w-full max-w-none md:max-w-[326px] relative rounded-[calc(var(--radius)+6px)] ${order}`}
        style={{
          backgroundColor: isDark
            ? "#111620"
            : "hsl(var(--bg-primary-100))",
          padding: "32px 32px 32px",
        }}
      >
        {/* Badge (MOST POPULAR) — positioned above card */}
        {tier.badge}

        {/* ── Grid header — every row is a fixed height ── */}
        <div
          className="hidden md:grid items-center justify-items-center w-full gap-y-3 pb-6"
          style={{
            gridTemplateRows: gridRows,
            borderBottom: `1px solid ${isDark ? "#2f415f" : "#dfdbc9"}`,
          }}
        >
          {/* Row 1: Icon */}
          <div className="inline-grid leading-[0] place-items-start relative">
            <div
              className="[grid-area:1/1] size-14 rounded-[calc(var(--radius)+10px)]"
              style={{
                backgroundColor: "hsl(var(--sidebar-border))",
                opacity: isDark ? 0.1 : 0.4,
              }}
            />
            <div className="[grid-area:1/1] ml-3 mt-3">{tier.icon}</div>
          </div>

          {/* Row 2: Name */}
          <p
            className="text-[24px] font-extrabold text-center w-full leading-[32px] tracking-[-0.24px]"
            style={{
              fontFamily: "var(--font-family-display)",
              color: isDark ? "hsl(var(--sidebar))" : "#1A2130",
            }}
          >
            {tier.name}
          </p>

          {/* Row 3: Tagline */}
          <p
            className={`text-sm font-medium text-center w-full max-w-[263px] leading-5 tracking-[-0.154px] ${
              isDark ? "text-primary-foreground" : "text-[#1A2130]"
            }`}
          >
            {tier.tagline}
          </p>

          {/* Row 4: Toggle / "Pay once" badge */}
          {tier.hasToggle ? (
            <div className="flex items-center bg-[#e8e4d9] rounded-full p-1 w-fit">
              <button
                onClick={() => setIsYearly(false)}
                className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                  !isYearly
                    ? "bg-white text-[#1A2130] shadow-sm"
                    : "text-[#4A5568] hover:text-[#1A2130]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isYearly
                    ? "bg-white text-[#1A2130] shadow-sm"
                    : "text-[#4A5568] hover:text-[#1A2130]"
                }`}
              >
                Yearly
              </button>
            </div>
          ) : isDark ? (
            <div className="flex gap-1.5 items-center justify-center w-full">
              <AwardIcon />
              <p className="text-sm font-medium text-primary-foreground leading-5 tracking-[-0.154px]">
                Pay once. Own it forever.
              </p>
            </div>
          ) : (
            <div />
          )}

          {/* Row 5: Price area */}
          <div className="flex flex-col items-center justify-center w-full">
            {tier.hasToggle ? (
              <>
                <p className="text-[16px] font-medium text-[#8a8a8a] line-through leading-5">
                  {isYearly ? "$1,788/yr" : "$149/mo"}
                </p>
                <p
                  className="text-[32px] font-extrabold text-center w-full leading-[40px] tracking-[-0.32px] text-[#1A2130]"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  {isYearly ? "$890/yr" : "$99/mo"}
                </p>
                <p className={`text-[13px] font-medium leading-5 ${isYearly ? "text-muted-foreground" : "invisible"}`}>
                  Just $74/mo
                </p>
                <div className="flex items-center gap-1.5 bg-[#e6ebdc] rounded-full border border-[#47ab19] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#47ab19] flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#47ab19] whitespace-nowrap">
                    {isYearly ? "Save 50%" : "Save 33%"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <p
                  className={`text-[32px] font-extrabold text-center w-full leading-[40px] tracking-[-0.32px] ${
                    isDark ? "text-primary-foreground" : "text-[#1A2130]"
                  }`}
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  {tier.price}
                </p>
                {tier.billing && (
                  <p
                    className={`text-sm font-medium text-center w-full leading-5 tracking-[-0.084px] mt-1 ${
                      isDark ? "text-primary-foreground" : "text-[#1A2130]"
                    }`}
                  >
                    {tier.billing}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Row 6: CTA Button */}
          <div className="w-full">
            {tier.buttonVariant === "filled" && (
              <Link
                href="https://app.proux.design/Auth"
                className="h-[56px] w-full flex items-center justify-center bg-primary rounded-[calc(var(--radius)+8px)] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 btn-shine"
              >
                <span className="text-sm font-bold text-primary-foreground uppercase tracking-[0.84px]">
                  {tier.buttonLabel}
                </span>
              </Link>
            )}
            {tier.buttonVariant === "outline" && (
              <Link
                href="https://app.proux.design/Auth"
                className="h-[56px] w-full flex items-center justify-center border-2 border-primary rounded-[calc(var(--radius)+8px)] bg-transparent hover:bg-primary shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-primary group-hover:text-primary-foreground uppercase tracking-[0.84px] transition-colors">
                  {tier.buttonLabel}
                </span>
              </Link>
            )}
            {tier.buttonVariant === "outline-light" && (
              <Link
                href="https://app.proux.design/Auth"
                className="h-[56px] w-full flex items-center justify-center border-2 border-primary-foreground rounded-[calc(var(--radius)+8px)] bg-transparent hover:bg-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-primary-foreground group-hover:text-foreground uppercase tracking-[0.84px] transition-colors">
                  {tier.buttonLabel}
                </span>
              </Link>
            )}
          </div>

          {/* Row 7: Guarantee */}
          {tier.showGuarantee ? (
            <div className="flex gap-2 items-center">
              <ShieldIcon
                color={isDark ? "hsl(var(--sidebar-border))" : "hsl(var(--annotation-green-600))"}
              />
              <p className={`text-sm font-medium leading-5 tracking-[-0.084px] ${isDark ? "text-primary-foreground" : "text-[#1A2130]"}`}>
                5-Day Money-Back Guarantee
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* ── Mobile header (flex, no alignment needed) ── */}
        <div className="flex md:hidden flex-col gap-4 items-center w-full pb-6"
          style={{ borderBottom: `1px solid ${isDark ? "#2f415f" : "#dfdbc9"}` }}
        >
          <div className="inline-grid leading-[0] place-items-start relative">
            <div className="[grid-area:1/1] size-14 rounded-[calc(var(--radius)+10px)]" style={{ backgroundColor: "hsl(var(--sidebar-border))", opacity: isDark ? 0.1 : 0.4 }} />
            <div className="[grid-area:1/1] ml-3 mt-3">{tier.icon}</div>
          </div>
          <p className="text-[24px] font-extrabold text-center w-full leading-[32px] tracking-[-0.24px]" style={{ fontFamily: "var(--font-family-display)", color: isDark ? "hsl(var(--sidebar))" : "#1A2130" }}>{tier.name}</p>
          <p className={`text-sm font-medium text-center w-full max-w-[263px] leading-5 ${isDark ? "text-primary-foreground" : "text-[#1A2130]"}`}>{tier.tagline}</p>
          {isDark && (
            <div className="flex gap-1.5 items-center justify-center w-full">
              <AwardIcon />
              <p className="text-sm font-medium text-primary-foreground leading-5">Pay once. Own it forever.</p>
            </div>
          )}
          {tier.hasToggle && (
            <div className="flex items-center bg-[#e8e4d9] rounded-full p-1 w-fit">
              <button onClick={() => setIsYearly(false)} className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${!isYearly ? "bg-white text-[#1A2130] shadow-sm" : "text-[#4A5568]"}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${isYearly ? "bg-white text-[#1A2130] shadow-sm" : "text-[#4A5568]"}`}>Yearly</button>
            </div>
          )}
          {tier.hasToggle ? (
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="text-[16px] font-medium text-[#8a8a8a] line-through">{isYearly ? "$1,788/yr" : "$149/mo"}</p>
              <p className="text-[32px] font-extrabold text-center text-[#1A2130]" style={{ fontFamily: "var(--font-family-display)" }}>{isYearly ? "$890/yr" : "$99/mo"}</p>
              {isYearly && <p className="text-[13px] font-medium text-muted-foreground">Just $74/mo</p>}
              <div className="flex items-center gap-1.5 bg-[#e6ebdc] rounded-full border border-[#47ab19] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#47ab19]" />
                <span className="text-xs font-semibold text-[#47ab19]">{isYearly ? "Save 50%" : "Save 33%"}</span>
              </div>
            </div>
          ) : (
            <>
              <p className={`text-[32px] font-extrabold text-center w-full ${isDark ? "text-primary-foreground" : "text-[#1A2130]"}`} style={{ fontFamily: "var(--font-family-display)" }}>{tier.price}</p>
              {tier.billing && <p className={`text-sm font-medium text-center ${isDark ? "text-primary-foreground" : "text-[#1A2130]"}`}>{tier.billing}</p>}
            </>
          )}
          {tier.buttonVariant === "filled" && <Link href="https://app.proux.design/Auth" className="h-[56px] w-full flex items-center justify-center bg-primary rounded-[calc(var(--radius)+8px)] shadow-md btn-shine"><span className="text-sm font-bold text-primary-foreground uppercase tracking-[0.84px]">{tier.buttonLabel}</span></Link>}
          {tier.buttonVariant === "outline" && <Link href="https://app.proux.design/Auth" className="h-[56px] w-full flex items-center justify-center border-2 border-primary rounded-[calc(var(--radius)+8px)] group"><span className="text-sm font-bold text-primary group-hover:text-primary-foreground uppercase tracking-[0.84px]">{tier.buttonLabel}</span></Link>}
          {tier.buttonVariant === "outline-light" && <Link href="https://app.proux.design/Auth" className="h-[56px] w-full flex items-center justify-center border-2 border-primary-foreground rounded-[calc(var(--radius)+8px)] group"><span className="text-sm font-bold text-primary-foreground group-hover:text-foreground uppercase tracking-[0.84px]">{tier.buttonLabel}</span></Link>}
          {tier.showGuarantee && (
            <div className="flex gap-2 items-center">
              <ShieldIcon color={isDark ? "hsl(var(--sidebar-border))" : "hsl(var(--annotation-green-600))"} />
              <p className={`text-sm font-medium ${isDark ? "text-primary-foreground" : "text-[#1A2130]"}`}>5-Day Money-Back Guarantee</p>
            </div>
          )}
        </div>

        {/* ── Feature list ── */}
        <div className="flex flex-col gap-4 w-full pt-8">
          {tier.features.map((group, gi) => (
            <React.Fragment key={gi}>
              <CategoryLabel label={group.category} isDark={isDark} />
              {group.items.map((item, fi) => (
                <FeatureRow key={fi} feature={item} isDark={isDark} />
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* ── Expandable features (Pro card) ── */}
        {tier.expandableFeatures && (
          <div className="flex flex-col gap-4 w-full mt-4">
            <div
              className="flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setExpanded(!expanded)}
            >
              <p className="text-sm font-medium text-primary leading-5 tracking-[-0.154px]">
                See all features
              </p>
              <ChevronIcon isOpen={expanded} />
            </div>
            {expanded && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
                {tier.expandableFeatures.map((group, gi) => (
                  <React.Fragment key={gi}>
                    <CategoryLabel
                      label={group.category}
                      isDark={isDark}
                    />
                    {group.items.map((item, fi) => (
                      <FeatureRow
                        key={fi}
                        feature={item}
                        isDark={isDark}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom badge (Lifetime) ── */}
        {tier.bottomBadge && <div className="mt-6 w-full">{tier.bottomBadge}</div>}
      </div>
    </CardThemeContext.Provider>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING SECTION (default export)
   ══════════════════════════════════════════════════════════════════════════ */

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-16 md:py-20 scroll-mt-[64px] bg-card"
    >
      <div className="container-default">
        {/* Section header */}
        <div className="flex flex-col items-center gap-4 text-center mb-12 px-4 md:px-0 max-w-[900px] mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.15] tracking-tight">
            Design with{" "}
            <span className="whitespace-nowrap">AI-Powered</span> Confidence
          </h2>
          <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl leading-relaxed">
            Stop guessing. Start shipping. Make brilliant design decisions with 350+ proven guidelines and AI tools — in minutes, not days.
          </p>
        </div>

        {/* Pricing cards */}
        <TooltipProvider delayDuration={200}>
          <div className="flex flex-col md:flex-row gap-5 items-stretch justify-center w-full flex-wrap">
            <PricingCard tier={tiers[0]} order="order-2 md:order-1" />
            <PricingCard tier={tiers[1]} order="order-1 md:order-2" />
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
