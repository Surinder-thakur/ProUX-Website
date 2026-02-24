/* =============================================================================
 * SUPABASE DATABASE TYPES
 * =============================================================================
 * These types mirror the Supabase database schema.
 * Run `npx supabase gen types typescript` to regenerate from your live schema.
 * ========================================================================== */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          long_description: string | null;
          duration: string;
          level: "beginner" | "intermediate" | "advanced";
          price: number;
          image_url: string | null;
          instructor: string;
          syllabus: Json | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          long_description?: string | null;
          duration: string;
          level: "beginner" | "intermediate" | "advanced";
          price: number;
          image_url?: string | null;
          instructor: string;
          syllabus?: Json | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          long_description?: string | null;
          duration?: string;
          level?: "beginner" | "intermediate" | "advanced";
          price?: number;
          image_url?: string | null;
          instructor?: string;
          syllabus?: Json | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          category: string;
          tags: string[];
          image_url: string | null;
          read_time: number;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          category: string;
          tags?: string[];
          image_url?: string | null;
          read_time?: number;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          category?: string;
          tags?: string[];
          image_url?: string | null;
          read_time?: number;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          enquiry_type: "consulting" | "training" | "general";
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          enquiry_type: "consulting" | "training" | "general";
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          enquiry_type?: "consulting" | "training" | "general";
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      course_level: "beginner" | "intermediate" | "advanced";
      enquiry_type: "consulting" | "training" | "general";
    };
  };
}

/* =============================================================================
 * CONVENIENCE TYPES
 * Use these throughout the app instead of deep-accessing Database types.
 * ========================================================================== */

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];

export type CourseInsert = Database["public"]["Tables"]["courses"]["Insert"];
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
export type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];

export type WaitlistEntry = Database["public"]["Tables"]["waitlist"]["Row"];
export type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"];
