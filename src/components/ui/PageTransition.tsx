import { createContext, useContext, useCallback, useRef, useEffect, useState, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

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
    
    const containerRef = useRef<HTMLDivElement>(null)
    const overlayLayer = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    const isAnimating = useRef(false)
    const pendingTarget = useRef<string | null>(null)
    
    const [theme, setTheme] = useState<'default' | 'navy'>('default')

    // Initial state
    useEffect(() => {
        gsap.set(containerRef.current, { visibility: 'hidden' })
        gsap.set(overlayLayer.current, { opacity: 0 })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.85, rotation: 5 })
    }, [])

    // === OUT ANIMATION: Fade overlay OUT to reveal the new page ===
    useEffect(() => {
        // Guarantees the out animation fires when route changes
        if (pendingTarget.current !== null) {
            pendingTarget.current = null

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false
                    gsap.set(containerRef.current, { visibility: 'hidden' })
                }
            })

            // Pop logo out smoothly
            tl.to(logoRef.current, { 
                opacity: 0, 
                scale: 0.85, 
                rotation: -5,
                duration: 0.35, 
                ease: 'power2.inOut' 
            }, 0)

            // Smoothly fade out overlay to reveal the new page
            tl.to(overlayLayer.current, { 
                opacity: 0, 
                duration: 0.5, 
                ease: 'power2.inOut' 
            }, 0.1)
        }
    }, [location.pathname])

    // === IN ANIMATION: Fade overlay IN to cover the current page ===
    const navigateWithTransition = useCallback((to: string) => {
        if (isAnimating.current || window.location.pathname === to) return

        isAnimating.current = true
        pendingTarget.current = to 
        
        if (to === '/senior-school') {
            setTheme('navy')
        } else {
            setTheme('default')
        }

        // Reset positions
        gsap.set(containerRef.current, { visibility: 'visible' })
        gsap.set(overlayLayer.current, { opacity: 0 })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.85, rotation: 5 })
        
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    navigate(to)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                }, 30)
            }
        })

        // Smooth fade in of the solid overlay
        tl.to(overlayLayer.current, { 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power2.inOut' 
        }, 0)

        // Pop logo in with a dynamic bounce and un-tilt
        tl.to(logoRef.current, { 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 0.5, 
            ease: 'back.out(2)' 
        }, 0.1)

    }, [navigate])

    const colors = theme === 'navy' ? {
        body: '#15283D'
    } : {
        body: '#334a89'
    }

    return (
        <TransitionContext.Provider value={{ navigateWithTransition }}>
            {children}

            <div ref={containerRef} className="ptr-container">
                <div ref={overlayLayer} className="ptr-overlay" style={{ background: colors.body }} />
                
                <div className="ptr-logo-wrap">
                    <img ref={logoRef} src="/logo.jpg" alt="Aster School" className="ptr-logo" />
                </div>
            </div>

            <style>{styles}</style>
        </TransitionContext.Provider>
    )
}

const styles = `
/* ===== CLASSIC SMOOTH FADE OVERLAY ===== */
.ptr-container {
  position: fixed;
  inset: 0;
  z-index: 999999;
  pointer-events: none;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ptr-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: opacity;
}

/* Logo container */
.ptr-logo-wrap {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ptr-logo {
  width: clamp(90px, 16vw, 120px);
  height: clamp(90px, 16vw, 120px);
  object-fit: contain;
  box-shadow: 0 16px 48px rgba(0,0,0,0.45);
  border: 3px solid #FFFFFF;
  border-radius: 0;
  will-change: transform, opacity;
}
`
