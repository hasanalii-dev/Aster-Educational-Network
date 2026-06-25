import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Cpu, Users, Lightbulb, Trophy, Heart, Handshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceWhyAster() {
    const sectionRef = useRef<HTMLElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const xRef = useRef(0)
    const speedRef = useRef(2.5)
    const dragVelocityRef = useRef(0)
    const isDraggingRef = useRef(false)
    const lastPointerX = useRef(0)
    const lastTimestamp = useRef(0)
    const rafRef = useRef<number>(0)
    const singleSetWidth = useRef(0)

    const cardsData = [
        { text: 'Academic excellence', icon: BookOpen, isDark: true },
        { text: 'Future-ready skills', icon: Cpu, isDark: false },
        { text: 'Leadership opportunities', icon: Users, isDark: true },
        { text: 'Entrepreneurship in action', icon: Lightbulb, isDark: false },
        { text: 'Sports excellence', icon: Trophy, isDark: true },
        { text: 'Strong values and character', icon: Heart, isDark: false },
        { text: 'Meaningful community partnerships', icon: Handshake, isDark: true }
    ]

    // Triple the items for seamless wrapping
    const marqueeItems = [...cardsData, ...cardsData, ...cardsData]

    const tick = useCallback(() => {
        if (!trackRef.current || singleSetWidth.current === 0) {
            rafRef.current = requestAnimationFrame(tick)
            return
        }

        if (isDraggingRef.current) {
            // While dragging, apply drag velocity directly
            xRef.current += dragVelocityRef.current
        } else {
            // Decay drag velocity when released
            if (Math.abs(dragVelocityRef.current) > 0.1) {
                xRef.current += dragVelocityRef.current
                dragVelocityRef.current *= 0.94 // Smooth deceleration
            } else {
                dragVelocityRef.current = 0
                // Normal auto-scroll
                xRef.current -= speedRef.current
            }
        }

        // Wrap seamlessly
        const w = singleSetWidth.current
        if (xRef.current <= -w) xRef.current += w
        if (xRef.current > 0) xRef.current -= w

        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
        rafRef.current = requestAnimationFrame(tick)
    }, [])

    useEffect(() => {
        // Measure one set width
        if (trackRef.current) {
            const children = trackRef.current.children
            const gap = 10 // gap-2.5 = 10px
            let totalW = 0
            const oneSetCount = cardsData.length
            for (let i = 0; i < oneSetCount; i++) {
                totalW += (children[i] as HTMLElement).offsetWidth + gap
            }
            singleSetWidth.current = totalW
        }

        rafRef.current = requestAnimationFrame(tick)

        const ctx = gsap.context(() => {
            // Text Scrub Reveal
            const words = sectionRef.current?.querySelectorAll('.gsap-scrub-word')
            if (words && words.length > 0) {
                gsap.fromTo(
                    words,
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current?.querySelector('.prose-reveal-container'),
                            start: 'top 85%',
                            end: 'bottom 60%',
                            scrub: true,
                        }
                    }
                )
            }

            // Finale word reveal
            gsap.fromTo('.gsap-finale-word',
                {
                    opacity: 0,
                    z: 600,
                    scale: 3,
                    filter: 'blur(20px)',
                    y: 100
                },
                {
                    opacity: 1,
                    z: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.gsap-finale-wrapper',
                        start: 'top 90%',
                        end: 'bottom 50%',
                        scrub: 1.5,
                    }
                }
            )
        }, sectionRef)

        return () => {
            cancelAnimationFrame(rafRef.current)
            ctx.revert()
        }
    }, [tick])

    // Pointer handlers for drag
    const handlePointerDown = (e: React.PointerEvent) => {
        isDraggingRef.current = true
        dragVelocityRef.current = 0
        lastPointerX.current = e.clientX
        lastTimestamp.current = Date.now()
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDraggingRef.current) return

        const now = Date.now()
        const deltaX = e.clientX - lastPointerX.current
        const deltaT = Math.max(now - lastTimestamp.current, 1)

        // Direct 1:1 position tracking + velocity calculation
        dragVelocityRef.current = (deltaX / deltaT) * 16 // Convert to per-frame velocity at ~60fps
        xRef.current += deltaX

        lastPointerX.current = e.clientX
        lastTimestamp.current = now
    }

    const handlePointerUp = () => {
        isDraggingRef.current = false
        // dragVelocityRef keeps its value and decays in the tick loop
    }

    // The Big Tagline split by words
    const finaleWords = "That is the Aster Difference.".split(' ')

    return (
        <section ref={sectionRef} className="pt-16 md:pt-24 pb-0 bg-[#FAFAFA] overflow-hidden select-none">
            <div className="max-w-[1000px] mx-auto text-center px-6 md:px-12">

                {/* Square Matrix Icon */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#334a89] shrink-0">
                        <rect x="4" y="4" width="7" height="7" fill="currentColor" />
                        <rect x="13" y="4" width="7" height="7" fill="currentColor" />
                        <rect x="4" y="13" width="7" height="7" fill="currentColor" />
                        <rect x="13" y="13" width="7" height="7" fill="#ffc715" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#334a89] uppercase mt-1">
                        WHY FAMILIES CHOOSE ASTER
                    </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#0C0C13] mb-6">
                    The Aster Difference
                </h2>

                <div className="w-16 h-[2px] bg-[#334a89] mx-auto mb-6" />

                <p className="font-['Quicksand'] text-lg md:text-xl text-[#5C5C61] leading-relaxed mb-10 max-w-3xl mx-auto">
                    Families choose Aster because their children experience more than an education. They experience a learning journey that combines:
                </p>
            </div>

            {/* ═══ DRAGGABLE INFINITE MARQUEE ═══ */}
            <div
                ref={marqueeRef}
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-none mb-10"
                style={{
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >

                <div
                    ref={trackRef}
                    className="flex gap-2.5 will-change-transform py-3"
                    style={{ width: 'max-content' }}
                >
                    {marqueeItems.map((card, index) => (
                        <div
                            key={index}
                            className={`
                                group relative p-5 md:p-7 flex flex-col justify-center text-center
                                w-[220px] sm:w-[260px] md:w-[300px] h-[160px] sm:h-[180px] md:h-[200px] shrink-0
                                rounded-[20px] md:rounded-[24px] overflow-hidden
                                transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03]
                                ${card.isDark ? 'bg-[#334a89]' : 'bg-[#FFC51B]'}
                            `}
                        >
                            {/* Giant Watermark Icon */}
                            <card.icon
                                className={`absolute -bottom-4 -right-4 w-24 h-24 md:w-28 md:h-28 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${card.isDark ? 'text-white/10' : 'text-white/30'}`}
                                strokeWidth={1}
                            />

                            {/* Corner Bracket */}
                            <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 pointer-events-none border-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                            <h4 className="relative z-10 font-['Quicksand'] text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-white px-2">
                                {card.text}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ TEXT SCRUB REVEAL ═══ */}
            <div className="max-w-[900px] mx-auto px-6 text-center mb-24 md:mb-40">
                <p className="prose-reveal-container font-['Quicksand'] font-bold text-xl sm:text-2xl md:text-3xl text-[#334a89] leading-snug max-w-3xl mx-auto">
                    {`Most importantly, they become confident individuals who are prepared to contribute positively to the world around them.`.split(' ').map((word, i) => (
                        <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] will-change-transform">
                            {word}
                        </span>
                    ))}
                </p>
            </div>

            {/* ═══ CINEMATIC FINALE ═══ */}
            <div
                className="gsap-finale-wrapper flex flex-col items-center justify-center w-full px-6 mt-24 md:mt-40 pb-0"
                style={{ perspective: '1200px' }}
            >
                <h2 className="font-['Manrope'] font-bold text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] leading-[1.1] tracking-tight flex flex-wrap justify-center gap-[0.2em]">
                    {finaleWords.map((word, i) => (
                        <span key={i} className={`gsap-finale-word inline-block will-change-transform ${word === 'Aster' || word === 'Difference.' ? 'text-[#334a89]' : 'text-[#ffc715]'}`}>
                            {word}
                        </span>
                    ))}
                </h2>
            </div>

        </section>
    )
}