"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Enquiry } from "@/lib/types/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =============================================================================
 * DESIGNERS: Admin Enquiries Page
 * =============================================================================
 * Table of enquiries from Supabase with expandable message view.
 * Falls back to placeholder data when Supabase is not connected.
 *
 * To update:
 * - Edit PLACEHOLDER_ENQUIRIES for static fallback data
 * - Adjust table column widths and visibility
 * - Change badge colors in getEnquiryBadgeColor()
 * ========================================================================== */

const PLACEHOLDER_ENQUIRIES: Enquiry[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    company: "TechCorp Solutions",
    phone: null,
    enquiry_type: "consulting" as const,
    message:
      "We are looking for UX consulting services for our enterprise platform redesign. Could you share your availability for a discovery call?",
    is_read: false,
    created_at: "2025-04-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Ahmed Al-Rashid",
    email: "ahmed@designstudio.ae",
    company: "Design Studio AE",
    phone: "+971 50 123 4567",
    enquiry_type: "training" as const,
    message:
      "Interested in booking the AI-First UX Design course for a team of 15 designers. What are the available dates for Q2?",
    is_read: false,
    created_at: "2025-04-19T09:15:00Z",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@startupindia.io",
    company: "Startup India",
    phone: null,
    enquiry_type: "general" as const,
    message:
      "Love your free articles on AI-driven UX research. Would you consider a speaking engagement at our upcoming design conference in Mumbai?",
    is_read: true,
    created_at: "2025-04-18T16:45:00Z",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "jwilson@financeplus.com",
    company: "FinancePlus",
    phone: "+1 555 987 6543",
    enquiry_type: "consulting" as const,
    message:
      "Our banking app has poor usability scores. We need a comprehensive UX audit and redesign recommendations. Budget approved for Q2.",
    is_read: false,
    created_at: "2025-04-17T11:00:00Z",
  },
  {
    id: "5",
    name: "Fatima Al-Sayed",
    email: "fatima@govtech.sa",
    company: "GovTech SA",
    phone: null,
    enquiry_type: "training" as const,
    message:
      "Looking for a customized UX training program for our government digital services team. 25 participants, mix of designers and product managers.",
    is_read: true,
    created_at: "2025-04-16T08:30:00Z",
  },
  {
    id: "6",
    name: "Michael Torres",
    email: "mtorres@healthapp.co",
    company: "HealthApp",
    phone: "+1 555 123 7890",
    enquiry_type: "consulting" as const,
    message:
      "We are building an AI-powered health monitoring interface and need expert UX guidance on accessibility and trust patterns.",
    is_read: true,
    created_at: "2025-04-15T10:20:00Z",
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
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

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(PLACEHOLDER_ENQUIRIES);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnquiries() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        const { data, error } = await supabase
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setEnquiries(data);
        }
      } catch {
        // Supabase not configured — keep placeholder data
      } finally {
        setLoading(false);
      }
    }

    loadEnquiries();
  }, []);

  async function toggleRead(id: string, currentReadStatus: boolean) {
    /* Optimistically update the UI */
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, is_read: !currentReadStatus } : e
      )
    );

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase
        .from("enquiries")
        .update({ is_read: !currentReadStatus })
        .eq("id", id);
    } catch {
      // Revert on error
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, is_read: currentReadStatus } : e
        )
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div>
        <h1 className="heading-2 text-proux-navy">Enquiries</h1>
        <p className="body-base mt-1">
          Manage incoming consulting, training, and general enquiries.
        </p>
      </div>

      {/* ── Enquiries Table ───────────────────────────────────────── */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <>
                  <TableRow
                    key={enquiry.id}
                    className={`cursor-pointer ${
                      !enquiry.is_read ? "font-medium" : ""
                    } ${expandedId === enquiry.id ? "bg-muted/30" : ""}`}
                    onClick={() =>
                      setExpandedId(
                        expandedId === enquiry.id ? null : enquiry.id
                      )
                    }
                  >
                    <TableCell>
                      {!enquiry.is_read && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-sm">{enquiry.name}</span>
                        {enquiry.company && (
                          <span className="block text-xs text-muted-foreground">
                            {enquiry.company}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {enquiry.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase tracking-wider ${getEnquiryBadgeColor(enquiry.enquiry_type)}`}
                      >
                        {enquiry.enquiry_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatDate(enquiry.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(enquiry.id, enquiry.is_read);
                        }}
                        className={`text-xs font-medium transition-colors ${
                          enquiry.is_read
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-primary hover:text-primary/80"
                        }`}
                      >
                        {enquiry.is_read ? "Mark unread" : "Mark read"}
                      </button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded message view */}
                  {expandedId === enquiry.id && (
                    <TableRow key={`${enquiry.id}-expanded`}>
                      <TableCell colSpan={6}>
                        <div className="rounded-lg bg-muted/30 p-4 ml-6">
                          <p className="text-sm text-foreground leading-relaxed mb-3">
                            {enquiry.message}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <span>
                              <strong>Email:</strong> {enquiry.email}
                            </span>
                            {enquiry.phone && (
                              <span>
                                <strong>Phone:</strong> {enquiry.phone}
                              </span>
                            )}
                            {enquiry.company && (
                              <span>
                                <strong>Company:</strong> {enquiry.company}
                              </span>
                            )}
                            <span>
                              <strong>Received:</strong>{" "}
                              {formatDate(enquiry.created_at)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
