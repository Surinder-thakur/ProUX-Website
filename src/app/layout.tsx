import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "ProUX — AI-First UX Intelligence Platform",
    template: "%s | ProUX",
  },
  description:
    "Get AI-powered UX feedback, proven design principles, and expert-curated resources — all in one platform built by certified UX professionals.",
  keywords: [
    "UX consulting",
    "UX training",
    "user experience",
    "design courses",
    "UX tools",
    "AI UX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ProUX",
    title: "ProUX — AI-First UX Intelligence Platform",
    description:
      "Get AI-powered UX feedback, proven design principles, and expert-curated resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProUX — AI-First UX Intelligence Platform",
    description:
      "Get AI-powered UX feedback, proven design principles, and expert-curated resources.",
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
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
