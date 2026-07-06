import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scrolls to the top of the page on route change.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    ScrollTrigger.refresh()
  }, [pathname])
}
