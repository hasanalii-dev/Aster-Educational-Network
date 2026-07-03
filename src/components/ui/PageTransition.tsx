import { createContext, useContext, useCallback, useRef, useEffect, useState, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

/**
 * PageTransition — Realistic Water Level Rise & Drain
 *
 * Uses the same wave SVG as the footer. Water surges up from below the
 * screen with momentum (slight overshoot), the surface ripples intensely
 * while rising and calms once full. On exit the water drains back down.
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
    
    const containerRef = useRef<HTMLDivElement>(null)
    const waterLayer = useRef<HTMLDivElement>(null)
    const wavesRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    const isAnimating = useRef(false)
    const pendingTarget = useRef<string | null>(null)
    
    const [theme, setTheme] = useState<'default' | 'navy'>('default')

    // Initial state: everything hidden below viewport
    useEffect(() => {
        gsap.set(containerRef.current, { visibility: 'hidden' })
        gsap.set(waterLayer.current, { yPercent: 0, y: window.innerHeight + 400 })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.6, y: 60 })
        if (wavesRef.current) {
            gsap.set(wavesRef.current, { scaleY: 1 })
        }
    }, [])

    // === EXIT: Water drains back down ===
    useEffect(() => {
        if (pendingTarget.current && pendingTarget.current === location.pathname) {
            pendingTarget.current = null

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false
                    gsap.set(containerRef.current, { visibility: 'hidden' })
                }
            })

            // Logo sinks first
            tl.to(logoRef.current, { opacity: 0, y: 40, scale: 0.85, duration: 0.45, ease: 'power2.in' }, 0)

            // Waves get agitated as water drains
            tl.to(wavesRef.current, { scaleY: 1.8, duration: 0.4, ease: 'power2.out' }, 0.1)
            tl.to(wavesRef.current, { scaleY: 1, duration: 0.5, ease: 'power2.inOut' }, 0.5)

            // Water drains back down below screen
            tl.to(waterLayer.current, { 
                y: window.innerHeight + 400, 
                duration: 1.1, 
                ease: 'power2.in' 
            }, 0.2)
        }
    }, [location.pathname])

    // === ENTER: Water rises from below ===
    const navigateWithTransition = useCallback((to: string) => {
        if (isAnimating.current || window.location.pathname === to) return

        isAnimating.current = true
        pendingTarget.current = to 
        
        if (to === '/senior-school') {
            setTheme('navy')
        } else {
            setTheme('default')
        }

        // Reset: water fully below screen
        gsap.set(containerRef.current, { visibility: 'visible' })
        gsap.set(waterLayer.current, { y: window.innerHeight + 400 })
        gsap.set(logoRef.current, { opacity: 0, scale: 0.6, y: 60 })
        gsap.set(wavesRef.current, { scaleY: 1 })
        
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    navigate(to)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                }, 50)
            }
        })

        // Waves get tall/agitated as water starts rushing up
        tl.to(wavesRef.current, { scaleY: 3.5, duration: 0.35, ease: 'power2.out' }, 0)

        // Water surges up with overshoot (like real water sloshing)
        tl.to(waterLayer.current, { 
            y: -30,  // Slight overshoot past target
            duration: 0.8, 
            ease: 'power3.out' 
        }, 0.05)

        // Settle back (water sloshes then calms)
        tl.to(waterLayer.current, { 
            y: 0, 
            duration: 0.5, 
            ease: 'elastic.out(1, 0.6)' 
        }, 0.85)

        // Waves calm down once water is settled
        tl.to(wavesRef.current, { scaleY: 1, duration: 0.6, ease: 'power2.inOut' }, 0.85)

        // Logo bobs up from the water
        tl.to(logoRef.current, { 
            opacity: 1, scale: 1, y: -10, 
            duration: 0.7, ease: 'power3.out' 
        }, 0.7)
        // Gentle settle (bob effect)
        tl.to(logoRef.current, { 
            y: 0, 
            duration: 0.7, 
            ease: 'elastic.out(1, 0.5)' 
        }, 1.4)

    }, [navigate])

    const colors = theme === 'navy' ? {
        wave1: '#2F5482',
        wave2: '#26466B',
        wave3: '#1D3754',
        wave4: '#15283D',
        body: '#15283D'
    } : {
        wave1: '#8999CC',
        wave2: '#6272B5',
        wave3: '#4A5FA6',
        wave4: '#3D5298',
        body: '#334a89'
    }

    return (
        <TransitionContext.Provider value={{ navigateWithTransition }}>
            {children}

            <div ref={containerRef} className="ptr-container">
                <div ref={waterLayer} className="ptr-water">
                    <div ref={wavesRef} className="ptr-wave-surface">
                        <svg className="ptr-wave-svg ptr-wave-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,64 C120,20 240,100 360,64 C480,28 600,100 720,64 C840,28 960,100 1080,64 C1200,28 1320,100 1440,64 L1440,160 L0,160 Z" fill={colors.wave1} style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                        <svg className="ptr-wave-svg ptr-wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,80 C160,40 320,120 480,80 C640,40 800,120 960,80 C1120,40 1280,120 1440,80 L1440,160 L0,160 Z" fill={colors.wave2} style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                        <svg className="ptr-wave-svg ptr-wave-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,96 C200,50 400,130 600,96 C800,62 1000,130 1200,96 C1300,80 1400,110 1440,96 L1440,160 L0,160 Z" fill={colors.wave3} style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                        <svg className="ptr-wave-svg ptr-wave-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,110 C240,75 480,140 720,110 C960,80 1200,140 1440,110 L1440,160 L0,160 Z" fill={colors.wave4} style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                    </div>
                    <div className="ptr-water-body" style={{ background: colors.body, transition: 'background 0.5s ease' }} />
                </div>
                <div className="ptr-logo-wrap">
                    <img ref={logoRef} src="/logo.jpg" alt="Aster School" className="ptr-logo" />
                </div>
            </div>

            <style>{styles}</style>
        </TransitionContext.Provider>
    )
}

const styles = `
/* ===== WATER RISE TRANSITION ===== */
.ptr-container {
  position: fixed;
  inset: 0;
  z-index: 99999;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
}

.ptr-water {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 150vh;
  will-change: transform;
}

/* Wave surface — tall enough to show dramatic crests */
.ptr-wave-surface {
  position: absolute;
  top: clamp(-120px, -15vw, -200px);
  left: 0;
  width: 100%;
  height: clamp(120px, 15vw, 200px);
  line-height: 0;
  transform-origin: center bottom;
  will-change: transform;
}

/* Each SVG layer is full-width × 200%, doubled so the drift loops seamlessly */
.ptr-wave-svg {
  width: 200%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}

/* --- DRIFT: each layer slides left at a different speed --- */
.ptr-wave-1 { animation: ptr-drift-fast 2.5s linear infinite, ptr-bob-1 1.8s ease-in-out infinite; }
.ptr-wave-2 { animation: ptr-drift-med  3.5s linear infinite, ptr-bob-2 2.4s ease-in-out infinite; }
.ptr-wave-3 { animation: ptr-drift-slow 5s   linear infinite, ptr-bob-3 3.0s ease-in-out infinite; }
.ptr-wave-4 { animation: ptr-drift-xslow 7s  linear infinite, ptr-bob-4 3.6s ease-in-out infinite; }

@keyframes ptr-drift-fast  { 0% { transform: translateX(0); }  100% { transform: translateX(-50%); } }
@keyframes ptr-drift-med   { 0% { transform: translateX(0); }  100% { transform: translateX(-50%); } }
@keyframes ptr-drift-slow  { 0% { transform: translateX(0); }  100% { transform: translateX(-50%); } }
@keyframes ptr-drift-xslow { 0% { transform: translateX(0); }  100% { transform: translateX(-50%); } }

/* --- BOB: subtle vertical bounce to make waves feel alive --- */
@keyframes ptr-bob-1 { 0%,100% { top: 0; }      50% { top: -8px; } }
@keyframes ptr-bob-2 { 0%,100% { top: 0; }      50% { top: 6px; } }
@keyframes ptr-bob-3 { 0%,100% { top: 0; }      50% { top: -5px; } }
@keyframes ptr-bob-4 { 0%,100% { top: 0; }      50% { top: 4px; } }

.ptr-water-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150vh;
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
  width: clamp(100px, 18vw, 140px);
  height: clamp(100px, 18vw, 140px);
  object-fit: contain;
  box-shadow: 0 16px 48px rgba(0,0,0,0.45);
  border: 4px solid #FFFFFF;
  border-radius: 0;
}
`

