import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://proux.design"),
  title: {
    default: "ProUX — Invest in ProUX today, save on costly fixes tomorrow.",
    template: "%s | ProUX",
  },
  description:
    "AI-powered UX intelligence platform and expert consulting by NN/g certified professionals. Get UX audits, proven design principles, and data-backed strategies that drive measurable revenue impact.",
  keywords: [
    "UX consulting",
    "UX audit",
    "user experience",
    "AI UX tools",
    "conversion rate optimization",
    "UX strategy",
    "UX intelligence platform",
  ],
  authors: [{ name: "Surinder Thakur", url: "https://www.surinder.design" }],
  creator: "ProUX",
  publisher: "ProUX",
  alternates: {
    canonical: "https://proux.design",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://proux.design",
    siteName: "ProUX",
    title: "ProUX — Invest in ProUX today, save on costly fixes tomorrow.",
    description:
      "AI-powered UX intelligence platform and expert consulting. Get UX audits, proven design principles, and data-backed strategies.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@proux_design",
    title: "ProUX — Invest in ProUX today, save on costly fixes tomorrow.",
    description:
      "AI-powered UX intelligence platform and expert consulting. Get UX audits, proven design principles, and data-backed strategies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
