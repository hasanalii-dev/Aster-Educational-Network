import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useGlobalReveal } from '@/hooks/useGlobalReveal'
import { TransitionProvider } from '@/components/ui/PageTransition'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ChatbotWidget } from '@/components/ui/ChatbotWidget'
import { PageSkeleton } from '@/components/ui/PageSkeleton'

/**
 * Root Layout — Aster Pakistan
 *
 * Wraps all pages with Header, Footer, scroll restoration,
 * Lenis smooth scroll, and GSAP page transitions.
 */
export function Layout() {
  useScrollToTop()
  useSmoothScroll()
  useGlobalReveal()

  return (
    <TransitionProvider>
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">
          <Suspense
            fallback={<PageSkeleton />}
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
      <ChatbotWidget />
    </TransitionProvider>
  )
}
