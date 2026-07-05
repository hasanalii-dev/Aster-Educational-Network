import { Outlet } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useGlobalReveal } from '@/hooks/useGlobalReveal'
import { TransitionProvider } from '@/components/ui/PageTransition'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ChatbotWidget } from '@/components/ui/ChatbotWidget'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { supabase } from '@/lib/supabase'

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

  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    supabase.from('global_settings').select('*').eq('id', 1).single().then(({ data }) => {
      if (data) setSettings(data)
    })
  }, [])

  return (
    <TransitionProvider>
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        <Header 
            marqueeText={settings?.marquee_text} 
            marqueeLink={settings?.marquee_link} 
            marqueeIsActive={settings?.marquee_is_active} 
        />
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
