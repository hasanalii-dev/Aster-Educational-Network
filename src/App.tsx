import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { pageComponents } from '@/config/routes'
import { lazy, Suspense } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'

// ============================================
// Aster Pakistan — Application Router
// ============================================
// All routes use lazy-loaded page components for
// optimal code splitting and fast initial load.

const {
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
  ProfileDashboard,
} = pageComponents

// Admin pages (lazy-loaded, separate bundle)
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const SiteSettings = lazy(() => import('@/pages/admin/sections/SiteSettings'))
const JournalManager = lazy(() => import('@/pages/admin/sections/JournalManager'))
const TestimonialsManager = lazy(() => import('@/pages/admin/sections/TestimonialsManager'))
const FAQManager = lazy(() => import('@/pages/admin/sections/FAQManager'))
const InquiriesManager = lazy(() => import('@/pages/admin/sections/InquiriesManager'))

const AdminSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #E7E5E4', borderTopColor: '#394da1', borderRadius: '50%', animation: 'aspin .6s linear infinite' }} />
      <style>{`@keyframes aspin{to{transform:rotate(360deg)}}`}</style>
    </div>
  }>
    {children}
  </Suspense>
)

const router = createBrowserRouter([
  // Public site routes
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'our-approach', element: <OurApproach /> },
      { path: 'preschool', element: <Preschool /> },
      { path: 'elementary', element: <Elementary /> },
      { path: 'senior-school', element: <SeniorSchool /> },
      { path: 'aster-difference', element: <AsterDifference /> },
      { path: 'admissions', element: <Admissions /> },
      { path: 'student-life', element: <StudentLife /> },
      { path: 'campuses', element: <Campuses /> },
      { path: 'community', element: <Community /> },
      { path: 'safeguarding', element: <Safeguarding /> },
      { path: 'parent-stories', element: <ParentStories /> },
      { path: 'faqs', element: <FAQs /> },
      { path: 'careers', element: <Careers /> },
      { path: 'journal', element: <Journal /> },
      { path: 'journal/:slug', element: <JournalArticle /> },
      { path: 'contact', element: <Contact /> },
      { path: 'profile', element: <ProfileDashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  // Admin CMS routes (separate layout, no Header/Footer)
  {
    path: '/admin/login',
    element: <AdminSuspense><AdminLogin /></AdminSuspense>,
  },
  {
    path: '/admin',
    element: <AdminSuspense><AdminLayout /></AdminSuspense>,
    children: [
      { index: true, element: <AdminSuspense><AdminDashboard /></AdminSuspense> },
      { path: 'settings', element: <AdminSuspense><SiteSettings /></AdminSuspense> },
      { path: 'journal', element: <AdminSuspense><JournalManager /></AdminSuspense> },
      { path: 'testimonials', element: <AdminSuspense><TestimonialsManager /></AdminSuspense> },
      { path: 'faqs', element: <AdminSuspense><FAQManager /></AdminSuspense> },
      { path: 'inquiries', element: <AdminSuspense><InquiriesManager /></AdminSuspense> },
    ],
  },
])

import ClickSpark from '@/components/ui/ClickSpark'

function App() {
  return (
    <ClickSpark sparkCount={10} sparkRadius={25}>
      <PageLoader />
      <RouterProvider router={router} />
    </ClickSpark>
  )
}

export default App

