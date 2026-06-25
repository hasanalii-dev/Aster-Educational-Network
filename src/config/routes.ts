// ============================================
// Aster Pakistan — Route Configuration
// ============================================
// Centralized route definitions for the entire application.
// All routes are defined here and consumed by the router.
// This pattern supports future CMS-driven dynamic routes.

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy-loaded page components for code splitting
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const OurApproach = lazy(() => import('@/pages/OurApproach'))
const Preschool = lazy(() => import('@/pages/Preschool'))
const Elementary = lazy(() => import('@/pages/Elementary'))
const SeniorSchool = lazy(() => import('@/pages/SeniorSchool'))
const AsterDifference = lazy(() => import('@/pages/AsterDifference'))
const Admissions = lazy(() => import('@/pages/Admissions'))
const StudentLife = lazy(() => import('@/pages/StudentLife'))
const Campuses = lazy(() => import('@/pages/Campuses'))
const Community = lazy(() => import('@/pages/Community'))
const Safeguarding = lazy(() => import('@/pages/Safeguarding'))
const ParentStories = lazy(() => import('@/pages/ParentStories'))
const FAQs = lazy(() => import('@/pages/FAQs'))
const Careers = lazy(() => import('@/pages/Careers'))
const Journal = lazy(() => import('@/pages/Journal'))
const JournalArticle = lazy(() => import('@/pages/JournalArticle'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Route metadata for SEO and navigation
export interface RouteConfig {
  path: string
  label: string
  element: React.ReactNode
  showInNav?: boolean
  showInFooter?: boolean
  children?: RouteConfig[]
}

// Application routes
export const routes: RouteObject[] = [
  {
    path: '/',
    element: null, // Will be wrapped with Layout in router setup
    children: [
      { index: true, element: null },
      { path: 'about', element: null },
      { path: 'our-approach', element: null },
      { path: 'preschool', element: null },
      { path: 'elementary', element: null },
      { path: 'senior-school', element: null },
      { path: 'the-aster-difference', element: null },
      { path: 'admissions', element: null },
      { path: 'student-life', element: null },
      { path: 'campuses', element: null },
      { path: 'community', element: null },
      { path: 'safeguarding', element: null },
      { path: 'parent-stories', element: null },
      { path: 'faqs', element: null },
      { path: 'careers', element: null },
      { path: 'journal', element: null },
      { path: 'journal/:slug', element: null },
      { path: 'contact', element: null },
      { path: '*', element: null },
    ],
  },
]

// Navigation structure for header/footer menus
export const navigationLinks = {
  main: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    {
      label: 'Academics',
      children: [
        { label: 'Our Approach', path: '/our-approach' },
        { label: 'Preschool', path: '/preschool' },
        { label: 'Elementary', path: '/elementary' },
        { label: 'Senior School', path: '/senior-school' },
      ],
    },
    { label: 'The Aster Difference', path: '/the-aster-difference' },
    { label: 'Student Life', path: '/student-life' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' },
  ],
  footer: {
    about: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Approach', path: '/our-approach' },
      { label: 'The Aster Difference', path: '/the-aster-difference' },
      { label: 'Our Campuses', path: '/campuses' },
      { label: 'Careers', path: '/careers' },
    ],
    academics: [
      { label: 'Preschool', path: '/preschool' },
      { label: 'Elementary', path: '/elementary' },
      { label: 'Senior School', path: '/senior-school' },
    ],
    community: [
      { label: 'Student Life', path: '/student-life' },
      { label: 'Community', path: '/community' },
      { label: 'Parent Stories', path: '/parent-stories' },
      { label: 'Safeguarding', path: '/safeguarding' },
      { label: 'FAQs', path: '/faqs' },
    ],
    connect: [
      { label: 'Admissions', path: '/admissions' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'The Aster Journal', path: '/journal' },
    ],
  },
} as const

// Page components map (used by router setup)
export const pageComponents = {
  Home,
  About,
  OurApproach,
  Preschool,
  Elementary,
  SeniorSchool,
  AsterDifference,
  Admissions,
  StudentLife,
  Campuses,
  Community,
  Safeguarding,
  ParentStories,
  FAQs,
  Careers,
  Journal,
  JournalArticle,
  Contact,
  NotFound,
}
