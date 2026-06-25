import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useGlobalReveal } from '@/hooks/useGlobalReveal'
import { TransitionProvider } from '@/components/ui/PageTransition'
import { CustomCursor } from '@/components/ui/CustomCursor'

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
            fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-3 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-neutral-400 font-[var(--font-family-body)]">Loading...</p>
                </div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </TransitionProvider>
  )
}
