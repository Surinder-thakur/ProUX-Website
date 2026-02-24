"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* =============================================================================
 * DESIGNERS: Admin Dashboard Layout
 * =============================================================================
 * Sidebar layout with navigation links and top bar with user info.
 * Protected by middleware — redirects to /login if not authenticated.
 *
 * To update:
 * - Edit ADMIN_NAV to change sidebar navigation items
 * - Adjust sidebar width via the w-64 class
 * - Change sidebar background and text colors below
 * ========================================================================== */

/* DESIGNERS: Sidebar navigation items — update labels, hrefs, and icons */
const ADMIN_NAV = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {ADMIN_NAV.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* ── DESIGNERS: Desktop Sidebar ──────────────────────────────── */}
      {/* Hidden on mobile, visible on lg+ */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-white">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <svg
              className="h-5 w-auto"
              fill="none"
              viewBox="0 0 132 22"
            >
              <g clipPath="url(#clip_admin_logo)">
                <path d="M22.3151 0C21.473 7.89874 15.5786 10.8088 10.9473 10.8088V21.6176C27.3674 21.6176 33.2618 7.06729 33.2618 0H22.3151Z" fill="#B55331" />
                <path d="M10.9468 0H0V10.8088H10.9468V0Z" fill="#B55331" />
                <path d="M39.9531 21.6936V0.0529785H49.0373C50.6837 0.0529785 52.1047 0.36998 53.3001 1.00398C54.5028 1.63094 55.4298 2.50797 56.0812 3.63509C56.7326 4.75516 57.0583 6.05839 57.0583 7.54477C57.0583 9.0382 56.7255 10.3449 56.0597 11.465C55.4012 12.578 54.4598 13.441 53.2357 14.0539C52.0116 14.6667 50.5584 14.9732 48.8762 14.9732H43.2711V10.8521H47.8883C48.6901 10.8521 49.3594 10.7148 49.8963 10.44C50.4403 10.1653 50.8519 9.78139 51.1311 9.28828C51.4103 8.78812 51.5499 8.20695 51.5499 7.54477C51.5499 6.87555 51.4103 6.2979 51.1311 5.81183C50.8519 5.31872 50.4403 4.93832 49.8963 4.67063C49.3522 4.40294 48.6829 4.26909 47.8883 4.26909H45.2683V21.6936H39.9531Z" fill="#1A2130" />
                <path d="M59.6787 21.6936V5.46313H64.7791V8.42181H64.9509C65.2515 7.35105 65.7419 6.55502 66.422 6.03373C67.102 5.5054 67.893 5.24123 68.795 5.24123C69.0384 5.24123 69.2889 5.25884 69.5466 5.29406C69.8043 5.32224 70.0442 5.36803 70.2661 5.43143V9.92228C70.0155 9.83774 69.6862 9.77082 69.2782 9.72151C68.8773 9.6722 68.5194 9.64754 68.2044 9.64754C67.5816 9.64754 67.0197 9.78491 66.5186 10.0596C66.0247 10.3273 65.6345 10.7042 65.3482 11.1903C65.069 11.6693 64.9294 12.2329 64.9294 12.881V21.6936H59.6787Z" fill="#1A2130" />
                <path d="M79.2485 22C77.5161 22 76.0272 21.6513 74.7816 20.9539C73.5432 20.2495 72.5875 19.2703 71.9146 18.0164C71.2489 16.7554 70.916 15.2937 70.916 13.6312C70.916 11.9617 71.2489 10.4999 71.9146 9.24601C72.5875 7.98505 73.5432 7.00587 74.7816 6.30847C76.0272 5.60402 77.5161 5.2518 79.2485 5.2518C80.9808 5.2518 82.4662 5.60402 83.7046 6.30847C84.9502 7.00587 85.9059 7.98505 86.5716 9.24601C87.2445 10.4999 87.581 11.9617 87.581 13.6312C87.581 15.2937 87.2445 16.7554 86.5716 18.0164C85.9059 19.2703 84.9502 20.2495 83.7046 20.9539C82.4662 21.6513 80.9808 22 79.2485 22ZM79.2807 18.1009C79.9106 18.1009 80.444 17.9107 80.8806 17.5303C81.3173 17.1499 81.6502 16.6216 81.8792 15.9453C82.1155 15.269 82.2336 14.4871 82.2336 13.5995C82.2336 12.6978 82.1155 11.9088 81.8792 11.2325C81.6502 10.5563 81.3173 10.0279 80.8806 9.64754C80.444 9.26714 79.9106 9.07694 79.2807 9.07694C78.6293 9.07694 78.0781 9.26714 77.6271 9.64754C77.1833 10.0279 76.8432 10.5563 76.607 11.2325C76.3779 11.9088 76.2634 12.6978 76.2634 13.5995C76.2634 14.4871 76.3779 15.269 76.607 15.9453C76.8432 16.6216 77.1833 17.1499 77.6271 17.5303C78.0781 17.9107 78.6293 18.1009 79.2807 18.1009Z" fill="#1A2130" />
                <path d="M103.575 0.0529785H108.879V14.0116C108.879 15.6248 108.489 17.0301 107.709 18.2277C106.928 19.4182 105.84 20.341 104.444 20.9962C103.048 21.6443 101.427 21.9683 99.5801 21.9683C97.7117 21.9683 96.0796 21.6443 94.6837 20.9962C93.2878 20.341 92.2033 19.4182 91.4301 18.2277C90.657 17.0301 90.2705 15.6248 90.2705 14.0116V0.0529785H95.5857V13.5572C95.5857 14.3039 95.7503 14.9696 96.0796 15.5543C96.416 16.139 96.8849 16.5969 97.4862 16.928C98.0875 17.2591 98.7855 17.4246 99.5801 17.4246C100.375 17.4246 101.069 17.2591 101.663 16.928C102.265 16.5969 102.733 16.139 103.07 15.5543C103.406 14.9696 103.575 14.3039 103.575 13.5572V0.0529785Z" fill="#B55331" />
                <path d="M117.59 0.0529785L121.606 6.88963H121.778L125.837 0.0529785H131.785L125.149 10.8733L132 21.6936H125.901L121.778 14.783H121.606L117.483 21.6936H111.426L118.245 10.8733L111.598 0.0529785H117.59Z" fill="#B55331" />
              </g>
              <defs>
                <clipPath id="clip_admin_logo">
                  <rect fill="white" height="22" width="132" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav />
        </div>

        {/* Sign out */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Main Content Area ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* ── Top Bar ────────────────────────────────────────────── */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
          {/* Mobile menu toggle */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 -ml-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center px-6 border-b">
                <span className="text-sm font-bold text-proux-navy">ProUX Admin</span>
              </div>
              <div className="py-4">
                <SidebarNav onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Page title area */}
          <div className="flex-1" />

          {/* DESIGNERS: User info and actions in top bar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Site
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              A
            </div>
          </div>
        </header>

        {/* ── Page Content ──────────────────────────────────────── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
