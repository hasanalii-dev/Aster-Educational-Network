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

    // 3 Layers for the diagonal sweep
    const layer1 = useRef<HTMLDivElement>(null)
    const layer2 = useRef<HTMLDivElement>(null)
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
            }
        })
        masterTlRef.current = tl

        // Zero-States
        gsap.set(logoRef.current, { opacity: 0, scale: 0.95, borderRadius: '0px' })
        gsap.set(progressTrackRef.current, { opacity: 0, scaleX: 0 })
        gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(wordRefs.current, { opacity: 0, y: 16 })
        gsap.set([layer1.current, layer2.current, layer3.current], { yPercent: 0, rotation: 0 })

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

        // F. THE DIAGONAL RIP
        tl.to(layer3.current, { yPercent: -120, rotation: 12, duration: 0.85, ease: 'power4.inOut' }, "-=0.1")
        tl.to(layer2.current, { yPercent: -120, rotation: 12, duration: 0.85, ease: 'power4.inOut' }, "-=0.75")
        tl.to(layer1.current, { yPercent: -120, rotation: 12, duration: 0.85, ease: 'power4.inOut' }, "-=0.75")

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
                <div ref={layer1} className="ldr-layer ldr-layer-1" />
                <div ref={layer2} className="ldr-layer ldr-layer-2" />
                <div ref={layer3} className="ldr-layer ldr-layer-3">

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
                                        ref={el => wordRefs.current[i] = el!}
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
  position: fixed;
  top: -20%; left: -20%; right: -20%; bottom: -20%;
  z-index: 99999;
  will-change: transform;
}

.ldr-layer-1 { background: #FFC51B; z-index: 99999; }
.ldr-layer-2 { background: #394EA2; z-index: 100000; }
.ldr-layer-3 { background: #050B14; z-index: 100001; display: flex; align-items: center; justify-content: center; }

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