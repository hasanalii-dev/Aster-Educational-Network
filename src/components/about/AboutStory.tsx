import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WaveDivider } from '@/components/ui/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
    {
        year: '2019',
        label: 'The Foundation',
        body: 'Since opening its doors in 2019, Aster has grown from a vision for meaningful, child-centered learning into a thriving educational community known for innovation, experiential learning, and future-focused education.',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
    {
        year: '2020 - 2025',
        label: 'Expansion Across Karachi',
        body: 'What began as a single vision to redefine education has now expanded across multiple campuses in Karachi, nurturing students from Early Years to Senior School through environments designed to build confidence, curiosity, leadership, and resilience.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
    {
        year: '2026',
        label: 'Global Expansion to Riyadh',
        body: 'Today, Aster continues to grow beyond borders as an international school with its expansion into Riyadh, Kingdom of Saudi Arabia, bringing its philosophy of purposeful, future-ready education to a wider global community.',
        image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
]

export function AboutStory() {
    const sectionRef = useRef<HTMLElement>(null)
    const timelineTrackRef = useRef<HTMLDivElement>(null)

    // Decoupled Ref Arrays preventing Desktop/Mobile DOM collisions
    const desktopSpineRef = useRef<HTMLDivElement>(null)
    const mobileSpineRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<HTMLDivElement[]>([])
    const desktopNodeRefs = useRef<HTMLDivElement[]>([])
    const mobileNodeRefs = useRef<HTMLDivElement[]>([])
    const desktopRingRefs = useRef<HTMLDivElement[]>([])
    const mobileRingRefs = useRef<HTMLDivElement[]>([])
    const yearRefs = useRef<HTMLSpanElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            // ── Honest Rail Calibration Math ──
            // Stretches the spine specifically from the dead-center of Circle 1 to Circle 3
            const calibrateSpineRails = () => {
                const isDesktop = window.innerWidth >= 1024
                const activeNodes = isDesktop ? desktopNodeRefs.current : mobileNodeRefs.current
                const activeSpine = isDesktop ? desktopSpineRef.current : mobileSpineRef.current
                const track = timelineTrackRef.current

                if (!activeNodes[0] || !activeNodes[activeNodes.length - 1] || !activeSpine || !track) return

                const trackRect = track.getBoundingClientRect()
                const firstNodeRect = activeNodes[0].getBoundingClientRect()
                const lastNodeRect = activeNodes[activeNodes.length - 1].getBoundingClientRect()

                // Calculate relative Y offset points inside the track wrapper
                const startY = (firstNodeRect.top - trackRect.top) + (firstNodeRect.height / 2)
                const endY = (lastNodeRect.top - trackRect.top) + (lastNodeRect.height / 2)
                const honestHeight = endY - startY

                gsap.set(activeSpine, {
                    top: startY,
                    height: honestHeight
                })
            }

            calibrateSpineRails()
            window.addEventListener('resize', calibrateSpineRails)

            // =========================================================
            // DESKTOP ORCHESTRATION (min-width: 1024px)
            // =========================================================
            mm.add('(min-width: 1024px)', () => {
                const card0 = cardRefs.current[0]
                const card2 = cardRefs.current[cardRefs.current.length - 1]

                if (card0 && card2) {
                    // 1. Spine Liquid Fill (Scrub lag set to 0.5 for weighted laptop trackpad feel)
                    gsap.fromTo(
                        '.desktop-fill-runner',
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card0,
                                start: 'top 50%', // The 50% Monitor Strike Line
                                endTrigger: card2,
                                end: 'top 50%',
                                scrub: 0.5,
                            },
                        }
                    )

                    // 2. Golden Tracer Ball
                    gsap.fromTo(
                        '.desktop-glow-runner',
                        { top: '0%' },
                        {
                            top: '100%',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card0,
                                start: 'top 50%',
                                endTrigger: card2,
                                end: 'top 50%',
                                scrub: 0.5,
                            },
                        }
                    )
                }

                // 3. Card Anticipation & 50% Strike Ignition
                cardRefs.current.forEach((card, i) => {
                    if (!card) return
                    const node = desktopNodeRefs.current[i]
                    const ring = desktopRingRefs.current[i]
                    const year = yearRefs.current[i]
                    const isLeft = milestones[i].side === 'left'

                    // A. Card container floats in gently BEFORE the dot arrives
                    gsap.fromTo(
                        card,
                        { opacity: 0, x: isLeft ? -70 : 70 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                                end: 'top 55%',
                                scrub: true,
                            },
                        }
                    )

                    // B. ATOMIC 50% SNAP-STRIKE (Fires instantly the exact millisecond the dot hits the node)
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 50%',
                        onEnter: () => {
                            if (node) gsap.to(node, { scale: 1.35, backgroundColor: '#ffc715', borderColor: '#ffffff', boxShadow: '0 0 26px rgba(255,199,21,0.85)', duration: 0.3, ease: 'back.out(2.5)' })
                            if (ring) gsap.fromTo(ring, { scale: 0.5, opacity: 0.9 }, { scale: 3.5, opacity: 0, duration: 0.8, ease: 'power2.out' })
                            if (year) gsap.to(year, { color: '#ffc715', scale: 1.05, textShadow: '0 0 30px rgba(255,199,21,0.5)', duration: 0.3 })
                        },
                        onLeaveBack: () => {
                            if (node) gsap.to(node, { scale: 1.0, backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', boxShadow: 'none', duration: 0.3 })
                            if (year) gsap.to(year, { color: 'rgba(255,199,21,0.7)', scale: 1.0, textShadow: 'none', duration: 0.3 })
                        },
                    })

                    // C. Parallax Image
                    const image = card.querySelector('.story-parallax-img')
                    if (image) {
                        gsap.fromTo(
                            image,
                            { yPercent: -12, scale: 1.15 },
                            { yPercent: 12, scale: 1.15, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } }
                        )
                    }
                })

                // 4. Scrub word animation
                const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
                if (words.length > 0) {
                    gsap.to(words, {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.prose-reveal-container',
                            start: 'top 80%',
                            end: 'bottom 50%',
                            scrub: true,
                        }
                    })
                }
            })

            // =========================================================
            // MOBILE ORCHESTRATION (max-width: 1023px)
            // =========================================================
            mm.add('(max-width: 1023px)', () => {
                const card0 = cardRefs.current[0]
                const card2 = cardRefs.current[cardRefs.current.length - 1]

                if (card0 && card2) {
                    gsap.fromTo('.mobile-fill-runner', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: card0, start: 'top 55%', endTrigger: card2, end: 'top 55%', scrub: 0.5 } })
                    gsap.fromTo('.mobile-glow-runner', { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger: { trigger: card0, start: 'top 55%', endTrigger: card2, end: 'top 55%', scrub: 0.5 } })
                }

                cardRefs.current.forEach((card, i) => {
                    if (!card) return
                    const node = mobileNodeRefs.current[i]

                    gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 82%' } })

                    if (node) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 55%',
                            onEnter: () => gsap.to(node, { scale: 1.25, backgroundColor: '#ffc715', borderColor: '#ffffff', boxShadow: '0 0 18px rgba(255,199,21,0.6)', duration: 0.25 }),
                            onLeaveBack: () => gsap.to(node, { scale: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', boxShadow: 'none', duration: 0.25 })
                        })
                    }
                })
            })

            return () => window.removeEventListener('resize', calibrateSpineRails)
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="bg-[#334a89] text-white py-24 md:py-36 px-6 md:px-12 relative overflow-hidden select-none"
        >
            <style>{storyStyles}</style>
            <WaveDivider color="#ffffff" position="top" />

            {/* Ambient Depth */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#394da1]/50 blur-3xl pointer-events-none" />
            <div className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#263a6e]/40 blur-[120px] pointer-events-none" />

            {/* ── Oxygen Bubbles ── */}
            <div className="story-bubbles-container" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        className="story-bubble"
                        style={{
                            '--bubble-size': `${6 + Math.random() * 16}px`,
                            '--bubble-left': `${5 + Math.random() * 90}%`,
                            '--bubble-duration': `${6 + Math.random() * 10}s`,
                            '--bubble-delay': `${Math.random() * 12}s`,
                            '--bubble-wobble': `${15 + Math.random() * 30}px`,
                            '--bubble-opacity': `${0.15 + Math.random() * 0.25}`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <div className="max-w-[1360px] mx-auto flex flex-col relative z-10 pt-16">

                {/* ── TOP: Section Header ── */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 z-20 relative">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffc715]">
                            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-white uppercase mt-1">
                            OUR STORY
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium leading-[1.1] text-white tracking-tight mb-8">
                        Education should shape <em className="font-medium italic text-[#ffc715]">who</em> a child becomes, not just what they know.
                    </h2>
                    <div className="w-16 h-[2px] bg-[#ffc715] mb-8" />
                    <p className="font-['Quicksand'] font-bold text-white/75 tracking-[0.25em] uppercase text-xs mb-3">
                        Throughout this journey, one purpose has remained unchanged:
                    </p>
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#ffc715] leading-[1.3] max-w-3xl mx-auto prose-reveal-container">
                        &ldquo;{`To create learning experiences that help children grow into capable individuals who lead with excellence, humility, resilience, and purpose.`.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] will-change-transform opacity-20">{word}</span>
                        ))}&rdquo;
                    </p>
                </div>

                {/* ── BOTTOM: The Cinematic Timeline Track ── */}
                <div ref={timelineTrackRef} className="relative story-timeline-track w-full max-w-5xl mx-auto pt-8">

                    {/* ── Desktop Calibrated Spine Wrapper ── */}
                    <div ref={desktopSpineRef} className="absolute left-1/2 w-1 transform -translate-x-1/2 z-10 hidden lg:block will-change-transform">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        <div className="desktop-fill-runner absolute top-0 left-0 right-0 bg-gradient-to-b from-[#ffc715] to-[#ffdd6b] rounded-full origin-top shadow-[0_0_14px_#ffc715]" />
                        <div className="desktop-glow-runner absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#ffc715] rounded-full shadow-[0_0_20px_6px_rgba(255,199,21,0.5),_0_0_60px_12px_rgba(255,199,21,0.2)]" />
                    </div>

                    {/* ── Mobile Calibrated Spine Wrapper ── */}
                    <div ref={mobileSpineRef} className="absolute left-[2px] w-[3px] z-10 block lg:hidden will-change-transform">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        <div className="mobile-fill-runner absolute top-0 left-0 right-0 bg-gradient-to-b from-[#ffc715] to-[#ffdd6b] rounded-full origin-top shadow-[0_0_12px_#ffc715]" />
                        <div className="mobile-glow-runner absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#ffc715] rounded-full shadow-[0_0_16px_4px_rgba(255,199,21,0.6)]" />
                    </div>

                    {/* ── Milestone Cards Deck ── */}
                    <div className="flex flex-col gap-24 lg:gap-32 relative z-20">
                        {milestones.map((m, i) => (
                            <div
                                key={i}
                                ref={el => { if (el) cardRefs.current[i] = el }}
                                className={`story-milestone-card ${m.side === 'left' ? 'lg:pr-[55%]' : 'lg:pl-[55%]'} relative pl-10 lg:pl-0 lg:pr-0`}
                                style={{ perspective: '1200px' }}
                            >
                                {/* DESKTOP NODE PIN */}
                                <div
                                    ref={el => { if (el) desktopNodeRefs.current[i] = el }}
                                    className={`story-node desktop-node hidden lg:block ${m.side === 'left' ? 'story-node-left' : 'story-node-right'}`}
                                >
                                    <div ref={el => { if (el) desktopRingRefs.current[i] = el }} className="story-node-ring" />
                                </div>

                                {/* MOBILE NODE PIN */}
                                <div
                                    ref={el => { if (el) mobileNodeRefs.current[i] = el }}
                                    className="story-node block lg:hidden story-node-mobile"
                                >
                                    <div ref={el => { if (el) mobileRingRefs.current[i] = el }} className="story-node-ring" />
                                </div>

                                {/* Year Counter */}
                                <span ref={el => { if (el) yearRefs.current[i] = el }} className="story-year-badge block">
                                    {m.year}
                                </span>

                                {/* Text */}
                                <div className="story-card-text">
                                    <h3 className="font-['Quicksand'] font-extrabold text-xl md:text-2xl text-white tracking-tight mb-2">
                                        {m.label}
                                    </h3>
                                    <p className="font-['Quicksand'] text-sm md:text-base text-white/80 leading-relaxed font-medium">
                                        {m.body}
                                    </p>
                                </div>

                                {/* Image Frame */}
                                <div className="story-img-frame mt-5">
                                    <img
                                        src={m.image}
                                        alt={m.label}
                                        className="story-parallax-img w-full h-full object-cover will-change-transform"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <WaveDivider color="#ffffff" position="bottom" />
        </section>
    )
}

const storyStyles = `
/* ── NODES ── */
.story-node {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    z-index: 35;
    top: 0;
}

.story-node-right {
    left: 50%;
    transform: translateX(-50%);
}

.story-node-left {
    left: 50%;
    transform: translateX(-50%);
}

.story-node-mobile {
    position: absolute;
    left: -1px;
    top: 4px;
    width: 14px;
    height: 14px;
    transform: translateX(-50%);
}

/* ── YEAR BADGE ── */
.story-year-badge {
    display: inline-block;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 64px;
    font-weight: 600;
    color: rgba(255, 199, 21, 0.7);
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: 4px;
    will-change: transform, opacity, color;
    transition: color 0.3s ease;
}

/* ── IMAGE FRAME ── */
.story-img-frame {
    width: 100%;
    height: 240px;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    position: relative;
}

@media (min-width: 768px) {
    .story-img-frame { height: 300px; }
}

@media (max-width: 1023px) {
    .story-year-badge {
        font-size: 48px;
    }
}

/* ── NODE RING BURST ── */
.story-node-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #ffc715;
    pointer-events: none;
}

/* ── BUBBLES ── */
.story-bubbles-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
}

.story-bubble {
    position: absolute;
    bottom: -20px;
    left: var(--bubble-left);
    width: var(--bubble-size);
    height: var(--bubble-size);
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.08) 60%,
        transparent 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.15);
    opacity: 0;
    animation:
        bubble-rise var(--bubble-duration) var(--bubble-delay) infinite ease-in,
        bubble-wobble var(--bubble-duration) var(--bubble-delay) infinite ease-in-out;
}

@keyframes bubble-rise {
    0% {
        transform: translateY(0) scale(0.4);
        opacity: 0;
    }
    10% {
        opacity: var(--bubble-opacity);
        transform: translateY(-5vh) scale(0.8);
    }
    80% {
        opacity: var(--bubble-opacity);
        transform: translateY(-85vh) scale(1);
    }
    90% {
        opacity: var(--bubble-opacity);
        transform: translateY(-92vh) scale(1.3);
    }
    100% {
        opacity: 0;
        transform: translateY(-100vh) scale(1.6);
    }
}

@keyframes bubble-wobble {
    0%, 100% { margin-left: 0; }
    25% { margin-left: var(--bubble-wobble); }
    50% { margin-left: 0; }
    75% { margin-left: calc(var(--bubble-wobble) * -0.7); }
}
`