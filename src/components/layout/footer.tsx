import Link from "next/link";
import { Separator } from "@/components/ui/separator";

/* =============================================================================
 * DESIGNERS: Footer Configuration
 * =============================================================================
 * Update link arrays, contact info, and social links below.
 * Footer matches the live ProUX design with 4-column layout.
 * ========================================================================== */

/* DESIGNERS: ProUX Footer Logo SVG — larger version with full wordmark */
function ProUXLogoFooter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 459 77"
      role="img"
      aria-label="ProUX Logo"
    >
      <g clipPath="url(#clip0_footer_logo)">
        <path
          d="M77.5956 0C74.6674 27.4661 54.1709 37.5851 38.0666 37.5851V75.1703C95.1638 75.1703 115.66 24.5749 115.66 0H77.5956Z"
          fill="#B55331"
        />
        <path d="M38.065 0H0V37.5851H38.065V0Z" fill="#B55331" />
        <path
          d="M138.928 75.4337V0.183372H170.516C176.241 0.183372 181.182 1.28567 185.339 3.49026C189.521 5.67037 192.745 8.72005 195.01 12.6394C197.275 16.5341 198.407 21.0658 198.407 26.2344C198.407 31.4274 197.25 35.9712 194.935 39.8661C192.645 43.7363 189.372 46.7372 185.115 48.8684C180.859 50.9993 175.805 52.0651 169.956 52.0651H150.465V37.7349H166.521C169.309 37.7349 171.636 37.2574 173.503 36.3019C175.395 35.3467 176.826 34.0117 177.797 32.297C178.768 30.5578 179.253 28.537 179.253 26.2344C179.253 23.9073 178.768 21.8987 177.797 20.2085C176.826 18.4938 175.395 17.171 173.503 16.2402C171.611 15.3094 169.284 14.8439 166.521 14.8439H157.41V75.4337H138.928Z"
          fill="#1A2130"
        />
        <path
          d="M207.52 75.435V18.9972H225.255V29.2853H225.852C226.898 25.562 228.603 22.794 230.968 20.9813C233.332 19.1442 236.083 18.2256 239.219 18.2256C240.066 18.2256 240.937 18.2868 241.833 18.4093C242.729 18.5073 243.563 18.6665 244.335 18.887V34.5029C243.463 34.2089 242.318 33.9762 240.9 33.8047C239.506 33.6333 238.261 33.5475 237.166 33.5475C235 33.5475 233.046 34.0252 231.304 34.9804C229.586 35.9112 228.229 37.2218 227.234 38.9121C226.263 40.5777 225.778 42.5375 225.778 44.7911V75.435H207.52Z"
          fill="#1A2130"
        />
        <path
          d="M275.569 76.5008C269.545 76.5008 264.368 75.2882 260.036 72.8632C255.73 70.4138 252.407 67.0088 250.067 62.6487C247.752 58.2638 246.595 53.1811 246.595 47.4002C246.595 41.5948 247.752 36.5118 250.067 32.1517C252.407 27.767 255.73 24.3621 260.036 21.937C264.368 19.4875 269.545 18.2627 275.569 18.2627C281.593 18.2627 286.758 19.4875 291.064 21.937C295.395 24.3621 298.719 27.767 301.033 32.1517C303.373 36.5118 304.543 41.5948 304.543 47.4002C304.543 53.1811 303.373 58.2638 301.033 62.6487C298.719 67.0088 295.395 70.4138 291.064 72.8632C286.758 75.2882 281.593 76.5008 275.569 76.5008ZM275.681 62.9425C277.871 62.9425 279.726 62.2811 281.244 60.9584C282.763 59.6356 283.92 57.7986 284.717 55.4469C285.538 53.0952 285.949 50.3764 285.949 47.2899C285.949 44.1545 285.538 41.4109 284.717 39.0592C283.92 36.7079 282.763 34.8705 281.244 33.5479C279.726 32.2251 277.871 31.5637 275.681 31.5637C273.416 31.5637 271.499 32.2251 269.931 33.5479C268.388 34.8705 267.205 36.7079 266.384 39.0592C265.587 41.4109 265.189 44.1545 265.189 47.2899C265.189 50.3764 265.587 53.0952 266.384 55.4469C267.205 57.7986 268.388 59.6356 269.931 60.9584C271.499 62.2811 273.416 62.9425 275.681 62.9425Z"
          fill="#1A2130"
        />
        <path
          d="M360.159 0.18457H378.602V48.7225C378.602 54.332 377.246 59.2186 374.534 63.383C371.818 67.5227 368.035 70.7316 363.181 73.0099C358.326 75.2635 352.69 76.3901 346.268 76.3901C339.771 76.3901 334.095 75.2635 329.241 73.0099C324.387 70.7316 320.616 67.5227 317.928 63.383C315.239 59.2186 313.896 54.332 313.896 48.7225V0.18457H332.378V47.1424C332.378 49.7389 332.95 52.0537 334.095 54.0869C335.265 56.1201 336.896 57.7123 338.986 58.8636C341.077 60.0149 343.504 60.5904 346.268 60.5904C349.032 60.5904 351.445 60.0149 353.51 58.8636C355.604 57.7123 357.231 56.1201 358.403 54.0869C359.571 52.0537 360.159 49.7389 360.159 47.1424V0.18457Z"
          fill="#B55331"
        />
        <path
          d="M408.893 0.18457L422.858 23.9575H423.456L437.57 0.18457H458.253L435.178 37.8098L459 75.4349H437.793L423.456 51.4049H422.858L408.521 75.4349H387.459L411.171 37.8098L388.057 0.18457H408.893Z"
          fill="#B55331"
        />
      </g>
      <defs>
        <clipPath id="clip0_footer_logo">
          <rect fill="white" height="76.5" width="459" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* DESIGNERS: Social icons — add/remove social platforms here */
function LinkedInIcon() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerNav = {
  navigation: {
    title: "NAVIGATION",
    links: [
      { label: "Product Overview", href: "/" },
      { label: "UX Consultancy", href: "/ux-consulting" },
      { label: "AI-First UX Training", href: "/training" },
      { label: "Free Articles", href: "/free-articles" },
    ],
  },
  company: {
    title: "COMPANY",
    links: [
      { label: "About Founder", href: "https://www.surinder.design" },
      { label: "ProUX Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Sign In", href: "https://app.proux.design/Auth" },
      { label: "Register", href: "https://app.proux.design/Auth" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container-default section-padding">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand Column ─────────────────────────────────────── */}
          <div className="space-y-6">
            <Link href="/">
              <ProUXLogoFooter className="h-8 w-auto" />
            </Link>
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">
                Invest in ProUX today,
              </p>
              <p className="text-base font-semibold text-foreground">
                save on costly fixes tomorrow.
              </p>
            </div>
            <p className="body-small">
              Founded by{" "}
              <Link
                href="https://www.surinder.design"
                className="font-semibold text-foreground"
              >
                Surinder Thakur
              </Link>
              , NN/g certified UX consultant. 12,000+ designers trained. $100M+
              in measurable impact.
            </p>
            {/* DESIGNERS: Social media icons — update links */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <XIcon />
              </Link>
            </div>
          </div>

          {/* ── Contact Column ───────────────────────────────────── */}
          <div className="space-y-6">
            <h4 className="label-caps text-proux-copper">Contact</h4>
            <div className="space-y-3">
              <Link
                href="mailto:hello@proux.com"
                className="block text-lg font-semibold text-proux-copper hover:underline"
              >
                hello@proux.com
              </Link>
              <p className="text-sm text-foreground">+91 98789 77771</p>
            </div>
            <div className="space-y-3">
              <h4 className="label-caps text-proux-copper">MIDDLE EAST</h4>
              <p className="text-sm text-muted-foreground">
                511, Zumurud Tower, Marina
                <br />
                Dubai. United Arab Emirates.
              </p>
            </div>
          </div>

          {/* ── Navigation Column ────────────────────────────────── */}
          <div className="space-y-6">
            <h4 className="label-caps text-muted-foreground">
              {footerNav.navigation.title}
            </h4>
            <ul className="space-y-3">
              {footerNav.navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ───────────────────────────────────── */}
          <div className="space-y-6">
            <h4 className="label-caps text-muted-foreground">
              {footerNav.company.title}
            </h4>
            <ul className="space-y-3">
              {footerNav.company.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        {/* ── Bottom Bar ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ProUX{" "}
            <span className="mx-2">|</span> All Rights Reserved{" "}
            <span className="mx-2">|</span> Managed by{" "}
            <span className="font-semibold text-foreground">
              Osum Studio Pvt. Ltd.
            </span>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* DESIGNERS: WhatsApp floating button — update phone number link */}
      <Link
        href="https://wa.me/919878977771"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>
    </footer>
  );
}
