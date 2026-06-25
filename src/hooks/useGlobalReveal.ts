import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGlobalReveal() {
    const location = useLocation()

    // 1. Reveal Animations for elements with .reveal-up class
    useEffect(() => {
        let ctx: gsap.Context;
        
        // Wait for React Router to fully mount the Outlet and lazy components
        const timeoutId = setTimeout(() => {
            ctx = gsap.context(() => {
                const elements = document.querySelectorAll('.reveal-up')
                
                elements.forEach((el) => {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%', // Trigger slightly earlier
                            toggleActions: 'play none none none'
                        }
                    })
                })
            })
            
            // Refresh ScrollTrigger after mounting to calculate exact heights
            ScrollTrigger.refresh()
            
        }, 150)

        return () => {
            clearTimeout(timeoutId)
            if (ctx) ctx.revert()
        }
    }, [location.pathname])

    // 2. Global ScrollTrigger Refresh for route changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [location.pathname])
}
