import { createContext, useContext, useCallback, useRef, useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

/**
 * PageTransition — Mind-Blowing Diagonal Sweep
 *
 * A premium, highly dynamic page transition requested by the client.
 * Features 3 staggered curved layers that sweep across the screen,
 * revealing the Aster Logo with a dynamic bounce.
 */

interface TransitionContextType {
    navigateWithTransition: (to: string) => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function useTransition() {
    const ctx = useContext(TransitionContext)
    const navigate = useNavigate()
    if (!ctx) {
        return { navigateWithTransition: (to: string) => navigate(to) }
    }
    return ctx
}

export function TransitionProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation()
    
    const layer1 = useRef<HTMLDivElement>(null)
    const layer2 = useRef<HTMLDivElement>(null)
    const layer3 = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    const isAnimating = useRef(false)
    const pendingTarget = useRef<string | null>(null)

    useEffect(() => {
        gsap.set([layer1.current, layer2.current, layer3.current], { 
            yPercent: 120, 
            rotation: 12,
            transformOrigin: 'top left',
            visibility: 'hidden' 
        })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.5, rotation: -15 })
    }, [])

    useEffect(() => {
        if (pendingTarget.current && pendingTarget.current === location.pathname) {
            pendingTarget.current = null

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false
                    gsap.set([layer1.current, layer2.current, layer3.current], { visibility: 'hidden' })
                }
            })

            // Brief hold so new page mounts
            tl.to({}, { duration: 0.1 })
            
            // Fade out logo rapidly
            tl.to(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.inOut' }, 0)

            // Sweep out top-right in staggered sequence
            tl.to(layer3.current, { yPercent: -120, duration: 0.9, ease: 'power4.inOut' }, 0)
            tl.to(layer2.current, { yPercent: -120, duration: 0.9, ease: 'power4.inOut' }, 0.1)
            tl.to(layer1.current, { yPercent: -120, duration: 0.9, ease: 'power4.inOut' }, 0.2)
        }
    }, [location.pathname])

    const navigateWithTransition = useCallback((to: string) => {
        if (isAnimating.current || window.location.pathname === to) return

        isAnimating.current = true
        pendingTarget.current = to 

        // Reset positions to bottom-left hidden
        gsap.set([layer1.current, layer2.current, layer3.current], { 
            yPercent: 120, 
            rotation: 12,
            visibility: 'visible' 
        })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.5, rotation: -15 })
        
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    navigate(to)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                }, 10)
            }
        })

        // Sweep in from bottom-left to center
        tl.to(layer1.current, { yPercent: 0, rotation: 0, duration: 0.8, ease: 'power4.inOut' }, 0)
        tl.to(layer2.current, { yPercent: 0, rotation: 0, duration: 0.8, ease: 'power4.inOut' }, 0.1)
        tl.to(layer3.current, { yPercent: 0, rotation: 0, duration: 0.8, ease: 'power4.inOut' }, 0.2)
        
        // Premium dynamic logo pop
        tl.to(logoRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.8)' }, 0.4)

    }, [navigate])

    return (
        <TransitionContext.Provider value={{ navigateWithTransition }}>
            {children}

            <div ref={layer1} className="ptr-layer ptr-layer-1" />
            <div ref={layer2} className="ptr-layer ptr-layer-2" />
            <div ref={layer3} className="ptr-layer ptr-layer-3">
                <img ref={logoRef} src="/logo.jpg" alt="Aster School" className="ptr-logo" />
            </div>

            <style>{transitionStyles}</style>
        </TransitionContext.Provider>
    )
}

const transitionStyles = `
/* === PREMIUM DIAGONAL SWEEP === */
.ptr-layer {
  position: fixed;
  top: -20%; left: -20%; right: -20%; bottom: -20%; /* Oversized to handle rotation safely */
  z-index: 99999;
  pointer-events: none;
  visibility: hidden;
  will-change: transform;
}

.ptr-layer-1 { background: #FFC51B; z-index: 99999; }
.ptr-layer-2 { background: #394EA2; z-index: 100000; }
.ptr-layer-3 { background: #050B14; z-index: 100001; display: flex; align-items: center; justify-content: center; }

.ptr-logo {
  width: 140px;
  height: 140px;
  object-fit: contain;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  border: 4px solid #FFFFFF;
}
`
