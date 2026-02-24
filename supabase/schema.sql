-- =============================================================================
-- PROUX DATABASE SCHEMA
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor to create all required tables.
-- Dashboard → SQL Editor → New Query → Paste & Run
--
-- DESIGNERS: You don't need to modify this file. It defines the backend data
-- structure for courses, articles, and contact form submissions.
-- =============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- COURSES TABLE
-- Stores training course information displayed on the training page.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image_url TEXT,
  instructor TEXT NOT NULL,
  syllabus JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- ARTICLES TABLE
-- Stores free articles / blog posts for the articles section.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'ProUX Team',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  read_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- ENQUIRIES TABLE
-- Stores form submissions from consulting, training, and general contact forms.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('consulting', 'training', 'general')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- SITE SETTINGS TABLE
-- Key-value store for site-wide configuration (hero text, CTA links, etc.)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- WAITLIST TABLE
-- Stores email signups from the training waitlist form.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'training',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Public read access for published courses
CREATE POLICY "Public can view published courses"
  ON public.courses FOR SELECT
  USING (is_published = true);

-- Public read access for published articles
CREATE POLICY "Public can view published articles"
  ON public.articles FOR SELECT
  USING (is_published = true);

-- Public can submit enquiries
CREATE POLICY "Public can submit enquiries"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

-- Public can read site settings
CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Public can join waitlist
CREATE POLICY "Public can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admins can manage courses"
  ON public.courses FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage articles"
  ON public.articles FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage enquiries"
  ON public.enquiries FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage waitlist"
  ON public.waitlist FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON public.enquiries(enquiry_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_read ON public.enquiries(is_read);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- =============================================================================
-- UPDATED_AT TRIGGER
-- Automatically updates the updated_at column on row changes.
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SEED DATA (optional sample content)
-- =============================================================================

INSERT INTO public.articles (title, slug, excerpt, content, author, category, tags, image_url, read_time, is_published, published_at)
VALUES
  (
    'Apparel E-Commerce: Visually Group and Clearly Label Size Filter Options',
    'apparel-ecommerce-size-filters',
    'Do you have a long ''time-to-value'', and an orchestra of noise...',
    'This article explores best practices for e-commerce size filter design, covering visual grouping, clear labeling, and user-friendly interaction patterns that reduce friction in the shopping experience.',
    'ProUX Team',
    'eCommerce',
    ARRAY['UX', 'eCommerce', 'Filters', 'CRO'],
    '/images/article-ecommerce.png',
    11,
    true,
    '2024-02-28'
  ),
  (
    'A Comprehensive Salesforce Audit Guide',
    'comprehensive-salesforce-audit-guide',
    'Three video conferencing tools that are objectively very similar, but that often trigger a...',
    'A thorough guide to auditing your Salesforce implementation from a UX perspective. Learn how to identify friction points, optimize workflows, and improve user adoption across your organization.',
    'ProUX Team',
    'MARKETING',
    ARRAY['Salesforce', 'Audit', 'Marketing', 'UX'],
    '/images/article-salesforce.png',
    11,
    true,
    '2024-02-28'
  ),
  (
    'The Psychology of Pricing Pages: 7 Principles That Convert',
    'psychology-pricing-pages',
    'Understanding how users process pricing information can dramatically improve your conversion rates...',
    'Explore the cognitive biases and psychological principles that make pricing pages effective. From anchoring to the decoy effect, learn how top SaaS companies design their pricing to maximize conversions.',
    'ProUX Team',
    'CRO',
    ARRAY['Pricing', 'Psychology', 'CRO', 'SaaS'],
    '/images/article-ecommerce.png',
    8,
    true,
    '2024-03-15'
  ),
  (
    'Mobile Navigation Patterns: When to Use Bottom Tabs vs Hamburger Menu',
    'mobile-navigation-patterns',
    'The debate between bottom tabs and hamburger menus is more nuanced than most designers think...',
    'A data-driven analysis of mobile navigation patterns, examining when each approach works best based on app complexity, user goals, and platform conventions.',
    'ProUX Team',
    'UX Design',
    ARRAY['Mobile', 'Navigation', 'UX', 'Patterns'],
    '/images/article-salesforce.png',
    9,
    true,
    '2024-04-10'
  )
ON CONFLICT (slug) DO NOTHING;
