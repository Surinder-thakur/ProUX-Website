import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-90B43DV3LV"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-90B43DV3LV');
          `}
        </Script>
      </head>
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
