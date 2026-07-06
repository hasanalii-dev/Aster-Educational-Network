import { useLayoutEffect, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scrolls to the top of the page on route change.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  // Ensure manual scroll restoration to prevent browser from overriding us
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    // 1. Instantly jump to top
    window.scrollTo(0, 0)
    
    // 2. Clear GSAP's scroll memory so it doesn't try to restore the old position
    ScrollTrigger.clearScrollMemory('manual')
    
    // 3. Wait for the browser to paint and then refresh ScrollTrigger
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh(true)
    })
  }, [pathname])
}
