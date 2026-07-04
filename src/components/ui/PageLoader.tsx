import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const sloganWords = ["WHATEVER", "IT", "TAKES."]

export function PageLoader() {
    const [isVisible, setIsVisible] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    // Smart Gate Refs
    const isSiteReadyRef = useRef(false)
    const masterTlRef = useRef<gsap.core.Timeline | null>(null)
    const progressTrackRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const wordRefs = useRef<HTMLSpanElement[]>([])

    const layer3 = useRef<HTMLDivElement>(null)

    // === 1. REAL DOM & FONT LISTENER ===
    useEffect(() => {
        const markSiteReady = () => {
            isSiteReadyRef.current = true
            // If the GSAP timeline got caught waiting at the 80% gate, release it instantly
            if (masterTlRef.current && masterTlRef.current.paused()) {
                masterTlRef.current.play()
            }
        }

        Promise.all([
            document.fonts.ready,
            new Promise<void>((resolve) => {
                if (document.readyState === 'complete') {
                    resolve()
                } else {
                    window.addEventListener('load', () => resolve(), { once: true })
                }
            })
        ]).then(() => {
            markSiteReady()
        })
    }, [])

    // === 2. THE MASTER CHOREOGRAPHY ===
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = ''
                setIsVisible(false)
                window.dispatchEvent(new CustomEvent('asterLoaderFinished'))
            }
        })
        masterTlRef.current = tl

        // Zero-States
        gsap.set(logoRef.current, { opacity: 0, scale: 0.95, borderRadius: '0px' })
        gsap.set(progressTrackRef.current, { opacity: 0, scaleX: 0 })
        gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(wordRefs.current, { opacity: 0, y: 16 })
        gsap.set(layer3.current, { y: 0, rotation: 0 })

        // A. Materialize Logo & Base Track
        tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        tl.to(progressTrackRef.current, { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' }, "-=0.3")

        // B. THE SMART BUFFER: Crawl rapidly to 80%
        tl.to(progressBarRef.current, {
            scaleX: 0.8,
            duration: 0.8,
            ease: 'power1.out'
        })
            // CHECKPOINT GATE: Check if the browser actually finished downloading fonts/assets
            .call(() => {
                if (!isSiteReadyRef.current) {
                    tl.pause() // Freezes the bar right here if the user's Wi-Fi is lagging
                }
            })
            // C. THE MECHANICAL SNAP: Complete 80% -> 100%
            .to(progressBarRef.current, {
                scaleX: 1,
                duration: 0.2,
                ease: 'power3.inOut'
            })

        // D. TRIGGER RESTORED: Word-by-Word Slogan pop
        tl.to(wordRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.8)',
            stagger: 0.08 // Individual word animation
        })

        // Hold room for 0.45s to digest statement
        tl.to({}, { duration: 0.45 })

        // E. REFINED EXIT: The "Lead Type Sink" (Clean downward drop, zero kerning stretch)
        tl.to(wordRefs.current, {
            opacity: 0,
            y: 12, // Physical drop-out
            duration: 0.25,
            ease: 'power3.in',
            stagger: 0.03
        })

        tl.to([logoRef.current, progressTrackRef.current], {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.inOut'
        }, "-=0.2")

        // F. THE WATER DRAIN OUT
        // Waves get agitated as water drains
        tl.to('.ldr-wave-surface', { scaleY: 2.0, duration: 0.3, ease: 'power2.out' }, "-=0.2")
        
        // The entire water tank drops down to empty
        tl.to(layer3.current, { 
            y: window.innerHeight + 400, 
            duration: 1.0, 
            ease: 'power2.inOut' 
        }, "-=0.1")

        tl.set(containerRef.current, { pointerEvents: 'none' })

        return () => {
            document.body.style.overflow = ''
            tl.kill()
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&display=swap" rel="stylesheet" />

            <style>{smartLoaderStyles}</style>

            <div ref={containerRef} className="smart-loader-master-veil">
                <div ref={layer3} className="ldr-layer ldr-layer-3">

                    {/* The Water Surface — 4 animated layers matching PageTransition */}
                    <div className="ldr-wave-surface">
                        <svg className="ldr-wave-svg ldr-wave-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,64 C120,20 240,100 360,64 C480,28 600,100 720,64 C840,28 960,100 1080,64 C1200,28 1320,100 1440,64 L1440,160 L0,160 Z" fill="#8999CC" />
                        </svg>
                        <svg className="ldr-wave-svg ldr-wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,80 C160,40 320,120 480,80 C640,40 800,120 960,80 C1120,40 1280,120 1440,80 L1440,160 L0,160 Z" fill="#6272B5" />
                        </svg>
                        <svg className="ldr-wave-svg ldr-wave-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,96 C200,50 400,130 600,96 C800,62 1000,130 1200,96 C1300,80 1400,110 1440,96 L1440,160 L0,160 Z" fill="#4A5FA6" />
                        </svg>
                        <svg className="ldr-wave-svg ldr-wave-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
                            <path d="M0,110 C240,75 480,140 720,110 C960,80 1200,140 1440,110 L1440,160 L0,160 Z" fill="#3D5298" />
                        </svg>
                    </div>

                    <div className="smart-sanctuary-portal">

                        {/* Square Crest */}
                        <img
                            ref={logoRef}
                            src="/logo.jpg"
                            alt="The Aster School"
                            className="loader-sharp-crest"
                        />

                        <div className="smart-ignition-stack">

                            {/* Smart Progress Gate */}
                            <div ref={progressTrackRef} className="loader-track-base">
                                <div ref={progressBarRef} className="loader-gold-charge"></div>
                            </div>

                            {/* Restored Word-by-Word Lockup */}
                            <div className="slogan-stagger-box">
                                {sloganWords.map((word, i) => (
                                    <span
                                        key={i}
                                        ref={el => { wordRefs.current[i] = el!; }}
                                        className="staggered-slogan-word"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

const smartLoaderStyles = `
.smart-loader-master-veil {
  position: fixed;
  inset: 0;
  z-index: 999999;
  pointer-events: none;
}

.ldr-layer {
  position: absolute;
  inset: 0;
  z-index: 99999;
  will-change: transform;
}

.ldr-layer-3 { background: #334a89; display: flex; align-items: center; justify-content: center; }

.ldr-wave-surface {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: clamp(120px, 15vw, 200px);
  line-height: 0;
  transform-origin: center bottom;
  will-change: transform;
}

.ldr-wave-svg { width: 200%; height: 100%; position: absolute; left: 0; bottom: 0; }

.ldr-wave-1 { animation: ldr-drift 2.5s linear infinite, ldr-bob-1 1.8s ease-in-out infinite; }
.ldr-wave-2 { animation: ldr-drift 3.5s linear infinite, ldr-bob-2 2.4s ease-in-out infinite; }
.ldr-wave-3 { animation: ldr-drift 5s   linear infinite, ldr-bob-3 3.0s ease-in-out infinite; }
.ldr-wave-4 { animation: ldr-drift 7s   linear infinite, ldr-bob-4 3.6s ease-in-out infinite; }

@keyframes ldr-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes ldr-bob-1 { 0%,100% { top: 0; } 50% { top: -8px; } }
@keyframes ldr-bob-2 { 0%,100% { top: 0; } 50% { top: 6px; } }
@keyframes ldr-bob-3 { 0%,100% { top: 0; } 50% { top: -5px; } }
@keyframes ldr-bob-4 { 0%,100% { top: 0; } 50% { top: 4px; } }

.smart-sanctuary-portal {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  pointer-events: auto;
  width: 100%;
  max-width: 420px;
}

.loader-sharp-crest {
  height: 130px;
  width: 130px;
  object-fit: contain;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  border-radius: 0px !important; /* HARD ZERO CURVE */
  display: block;
  will-change: transform, opacity;
}

.smart-ignition-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.loader-track-base {
  position: relative;
  width: 220px;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  will-change: transform, opacity;
}

.loader-gold-charge {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #FFC51B;
  will-change: transform;
}

.slogan-stagger-box {
  display: flex;
  gap: 8px;
  overflow: hidden;
}

.staggered-slogan-word {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #FFC51B;
  text-transform: uppercase;
  display: inline-block;
  will-change: transform, opacity;
}
`; // Strictly closed and terminated!