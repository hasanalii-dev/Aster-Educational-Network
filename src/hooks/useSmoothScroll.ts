import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useSmoothScroll — Lenis + GSAP ScrollTrigger Sync
 *
 * Initializes Lenis smooth scroll on the page and
 * synchronizes it with GSAP's ticker so ScrollTrigger
 * animations respond to the smoothed scroll position.
 *
 * This is the industry-standard approach used by
 * award-winning websites for buttery-smooth scrolling.
 */
export function useSmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        })

        lenisRef.current = lenis

        // Sync Lenis scroll position with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Use GSAP's ticker to drive Lenis's RAF loop
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000) // Lenis expects ms, GSAP provides seconds
        })

        // Disable Lenis's own RAF since GSAP is driving it
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return lenisRef
}
