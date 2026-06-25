-- ==============================================================================
-- ASTER PAKISTAN — ADMIN RLS POLICIES
-- ==============================================================================
-- Run this in your Supabase SQL Editor to allow authenticated admin users
-- to perform CRUD operations. Without these, even logged-in users are blocked.

-- GLOBAL SETTINGS: Authenticated users can update
CREATE POLICY "Allow authenticated update on global_settings"
ON public.global_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- JOURNAL ARTICLES: Authenticated users get full CRUD
CREATE POLICY "Allow authenticated full access to journal_articles"
ON public.journal_articles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Also allow authenticated users to SELECT unpublished articles
CREATE POLICY "Allow authenticated read all articles"
ON public.journal_articles FOR SELECT
TO authenticated
USING (true);

-- TESTIMONIALS: Authenticated users get full CRUD
CREATE POLICY "Allow authenticated full access to testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- FAQS: Authenticated users get full CRUD
CREATE POLICY "Allow authenticated full access to faqs"
ON public.faqs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- INQUIRIES: Authenticated users can read and update status
CREATE POLICY "Allow authenticated read on inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update on inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (true);
