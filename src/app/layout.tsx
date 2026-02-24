import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

/* =============================================================================
 * DESIGNERS: Font Configuration
 * =============================================================================
 * Change the Google Font import to update the site's typeface.
 * Popular alternatives: "DM_Sans", "Plus_Jakarta_Sans", "Outfit", "Manrope"
 *
 * To switch fonts:
 * 1. Import the new font from "next/font/google"
 * 2. Update the variable name below
 * 3. The entire site will update automatically
 * ========================================================================== */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

/* =============================================================================
 * DESIGNERS: SEO Metadata
 * Update title, description, and Open Graph info for search engines.
 * ========================================================================== */
export const metadata: Metadata = {
  title: {
    default: "ProUX — UX Consulting, Training & Tools",
    template: "%s | ProUX",
  },
  description:
    "Empowering teams to create exceptional user experiences through expert UX consulting, professional training courses, and powerful design tools.",
  keywords: [
    "UX consulting",
    "UX training",
    "user experience",
    "design courses",
    "UX tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ProUX",
    title: "ProUX — UX Consulting, Training & Tools",
    description:
      "Empowering teams to create exceptional user experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProUX — UX Consulting, Training & Tools",
    description:
      "Empowering teams to create exceptional user experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
