"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Enquiry } from "@/lib/types/database";

/* =============================================================================
 * DESIGNERS: Admin Dashboard Page
 * =============================================================================
 * Overview dashboard with stat cards and recent enquiries list.
 * Loads data from Supabase when available, otherwise shows placeholder stats.
 *
 * To update:
 * - Edit the stat cards array to change displayed metrics
 * - Update PLACEHOLDER_ENQUIRIES for static fallback data
 * - Adjust grid layout via grid-cols classes
 * ========================================================================== */

/* DESIGNERS: Placeholder data for when Supabase is not connected */
const PLACEHOLDER_STATS = {
  totalCourses: 6,
  totalArticles: 12,
  unreadEnquiries: 3,
};

const PLACEHOLDER_ENQUIRIES: Enquiry[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    enquiry_type: "consulting" as const,
    message: "We are looking for UX consulting services for our enterprise platform redesign. Could you share your availability for a discovery call?",
    is_read: false,
    created_at: "2025-04-20T14:30:00Z",
    company: "TechCorp Solutions",
    phone: null,
  },
  {
    id: "2",
    name: "Ahmed Al-Rashid",
    email: "ahmed@designstudio.ae",
    enquiry_type: "training" as const,
    message: "Interested in booking the AI-First UX Design course for a team of 15 designers. What are the available dates for Q2?",
    is_read: false,
    created_at: "2025-04-19T09:15:00Z",
    company: "Design Studio AE",
    phone: "+971 50 123 4567",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@startupindia.io",
    enquiry_type: "general" as const,
    message: "Love your free articles on AI-driven UX research. Would you consider a speaking engagement at our upcoming design conference in Mumbai?",
    is_read: true,
    created_at: "2025-04-18T16:45:00Z",
    company: "Startup India",
    phone: null,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "jwilson@financeplus.com",
    enquiry_type: "consulting" as const,
    message: "Our banking app has poor usability scores. We need a comprehensive UX audit and redesign recommendations. Budget approved for Q2.",
    is_read: false,
    created_at: "2025-04-17T11:00:00Z",
    company: "FinancePlus",
    phone: "+1 555 987 6543",
  },
  {
    id: "5",
    name: "Fatima Al-Sayed",
    email: "fatima@govtech.sa",
    enquiry_type: "training" as const,
    message: "Looking for a customized UX training program for our government digital services team. 25 participants, mix of designers and product managers.",
    is_read: true,
    created_at: "2025-04-16T08:30:00Z",
    company: "GovTech SA",
    phone: null,
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* DESIGNERS: Enquiry type badge colors */
function getEnquiryBadgeColor(type: string): string {
  const colorMap: Record<string, string> = {
    consulting: "bg-blue-50 text-blue-700 border-blue-200",
    training: "bg-purple-50 text-purple-700 border-purple-200",
    general: "bg-gray-50 text-gray-700 border-gray-200",
  };
  return colorMap[type] || "bg-secondary text-secondary-foreground";
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(PLACEHOLDER_STATS);
  const [enquiries, setEnquiries] = useState(PLACEHOLDER_ENQUIRIES);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        /* ── Fetch counts ────────────────────────────────────────── */
        const [coursesRes, articlesRes, enquiriesCountRes, enquiriesRes] =
          await Promise.all([
            supabase.from("courses").select("id", { count: "exact", head: true }),
            supabase.from("articles").select("id", { count: "exact", head: true }),
            supabase
              .from("enquiries")
              .select("id", { count: "exact", head: true })
              .eq("is_read", false),
            supabase
              .from("enquiries")
              .select("*")
              .order("created_at", { ascending: false })
              .limit(5),
          ]);

        setStats({
          totalCourses: coursesRes.count ?? PLACEHOLDER_STATS.totalCourses,
          totalArticles: articlesRes.count ?? PLACEHOLDER_STATS.totalArticles,
          unreadEnquiries:
            enquiriesCountRes.count ?? PLACEHOLDER_STATS.unreadEnquiries,
        });

        if (enquiriesRes.data && enquiriesRes.data.length > 0) {
          setEnquiries(enquiriesRes.data);
        }
      } catch {
        // Supabase not configured — keep placeholder data
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div>
        <h1 className="heading-2 text-proux-navy">Dashboard</h1>
        <p className="body-base mt-1">
          Overview of your ProUX content and enquiries.
        </p>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────── */}
      {/* DESIGNERS: Stat card grid — change icons, labels, and colors */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Courses
            </CardTitle>
            <svg className="h-5 w-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Published training courses
            </p>
          </CardContent>
        </Card>

        {/* Total Articles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Articles
            </CardTitle>
            <svg className="h-5 w-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalArticles}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Published free articles
            </p>
          </CardContent>
        </Card>

        {/* Unread Enquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread Enquiries
            </CardTitle>
            <svg className="h-5 w-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.unreadEnquiries}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Enquiries ──────────────────────────────────────── */}
      {/* DESIGNERS: Recent enquiries list — shows last 5 enquiries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="heading-4">Recent Enquiries</CardTitle>
          <Link
            href="/admin/enquiries"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                  !enquiry.is_read
                    ? "border-primary/20 bg-primary/[0.02]"
                    : ""
                }`}
              >
                {/* Unread indicator */}
                <div className="mt-1.5 flex-shrink-0">
                  {!enquiry.is_read ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">
                      {enquiry.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase tracking-wider ${getEnquiryBadgeColor(enquiry.enquiry_type)}`}
                    >
                      {enquiry.enquiry_type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {enquiry.message}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{enquiry.email}</span>
                    <span>{formatDate(enquiry.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
