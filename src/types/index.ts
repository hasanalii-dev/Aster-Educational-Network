// ============================================
// Aster Pakistan — Global Type Definitions
// ============================================
// Shared types used throughout the application.
// Designed to support future CMS integration.

// ----------------------------------------
// Navigation Types
// ----------------------------------------
export interface NavLink {
  label: string
  path: string
}

export interface NavGroup {
  label: string
  children: NavLink[]
}

export type NavItem = NavLink | NavGroup

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

// ----------------------------------------
// Content Types (CMS-Ready)
// ----------------------------------------
export interface SEOData {
  title: string
  description: string
  image?: string
  canonical?: string
}

export interface HeroSection {
  title: string
  subtitle?: string
  description?: string
  image?: string
  cta?: {
    label: string
    href: string
  }
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  content: string
  image?: string
  rating?: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface JournalArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  coverImage: string
  category: string
  tags: string[]
  readTime: number
}

export interface CampusInfo {
  id: string
  name: string
  address: string
  phone: string
  email: string
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
  facilities: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  order: number
}

export interface ProgramInfo {
  id: string
  title: string
  description: string
  ageRange?: string
  highlights: string[]
  image?: string
}

// ----------------------------------------
// Form Types
// ----------------------------------------
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  inquiryType: 'general' | 'admissions' | 'careers' | 'other'
}

export interface AdmissionInquiry {
  parentName: string
  email: string
  phone: string
  childName: string
  childAge: number
  grade: string
  message?: string
}

// ----------------------------------------
// Component Props Types
// ----------------------------------------
export interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export interface PageProps {
  title?: string
  description?: string
}

// ----------------------------------------
// Job Types (CMS)
// ----------------------------------------
export interface JobOpening {
    id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements: string
    is_active: boolean
    created_at: string
}

export interface JobApplication {
    id: string
    job_id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    resume_link: string
    cover_letter: string
    status: string
    created_at: string
}

// ----------------------------------------
// Parent Stories Types (CMS)
// ----------------------------------------
export interface ParentStory {
    id: string
    quote: string
    name: string
    role: string
    image?: string
    is_active: boolean
    created_at: string
}
