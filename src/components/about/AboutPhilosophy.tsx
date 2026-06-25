import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import wrapperBg from '@/assets/icons/wrapper.svg'

gsap.registerPlugin(ScrollTrigger)

export function AboutPhilosophy() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerBoxRef = useRef<HTMLDivElement>(null)
    const visionCardRef = useRef<HTMLDivElement>(null)
    const missionCardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            // ── BORDER CLOUD DRIFT (Floating freely behind the blue box) ──
            gsap.to('.gsap-ambient-cloud-left', { x: 18, y: -6, duration: 5.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to('.gsap-ambient-cloud-right', { x: -20, y: 10, duration: 6.1, repeat: -1, yoyo: true, ease: 'sine.inOut' })

            // ── DESKTOP: Clean Overlap Entrance ──
            mm.add('(min-width: 768px)', () => {
                const header = headerBoxRef.current
                const vCard = visionCardRef.current
                const mCard = missionCardRef.current
                if (!header || !vCard || !mCard) return

                gsap.fromTo(
                    header,
                    { opacity: 0, y: -25 },
                    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
                )

                const cardTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.edmund-interlock-grid',
                        start: 'top 80%',
                        end: 'top 45%',
                        scrub: true,
                    },
                })

                cardTl.fromTo(vCard, { opacity: 0, y: 80 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0)
                cardTl.fromTo(mCard, { opacity: 0, y: 80 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.05)

                gsap.fromTo(
                    '.gsap-spec-item',
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: vCard, start: 'top 60%' } }
                )
            })

            // ── MOBILE REVEAL ──
            mm.add('(max-width: 767px)', () => {
                gsap.fromTo(
                    '.gsap-mobile-step',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
                )
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="text-[#15283D] py-28 md:py-40 px-6 md:px-12 relative overflow-hidden border-t border-[#334a89]/10 select-none">

            {/* BACKGROUND IMAGE AND OVERLAY */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none bg-white"
                style={{
                    backgroundImage: `url("${wrapperBg}")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 100%',
                    backgroundPosition: 'top center'
                }}
            />

            {/* =========================================================
          AMBIENT SKY LAYER: FREE-FLOATING CLOUDS (ON TOP OF BLUE RECTANGLE)
      ========================================================= */}
            <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden max-w-[1500px] mx-auto">
                <div className="gsap-ambient-cloud-left absolute top-12 md:top-24 left-4 md:left-24 w-32 md:w-48 text-white">
                    <svg viewBox="0 0 120 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M96 46.5C96 55.06 89.06 62 80.5 62H27.5C18.94 62 12 55.06 12 46.5C12 39.46 16.69 33.52 23.23 31.55C25.42 21.6 34.33 14 45 14C53.37 14 60.62 18.77 64.12 25.85C66.42 24.08 69.29 23 72.5 23C79.88 23 85.95 28.61 86.91 35.85C92.05 37.3 96 41.44 96 46.5Z" />
                    </svg>
                </div>
                <div className="gsap-ambient-cloud-right absolute top-8 md:top-16 right-0 md:right-16 w-40 md:w-56 text-white">
                    <svg viewBox="0 0 120 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform -scale-x-100">
                        <path d="M96 46.5C96 55.06 89.06 62 80.5 62H27.5C18.94 62 12 55.06 12 46.5C12 39.46 16.69 33.52 23.23 31.55C25.42 21.6 34.33 14 45 14C53.37 14 60.62 18.77 64.12 25.85C66.42 24.08 69.29 23 72.5 23C79.88 23 85.95 28.61 86.91 35.85C92.05 37.3 96 41.44 96 46.5Z" />
                    </svg>
                </div>
            </div>

            <div className="max-w-[1360px] mx-auto relative z-10">

                {/* =========================================================
            TOP LAYER (z-10): THE CURVED BLUE RECTANGLE (UNTOUCHED)
        ========================================================= */}
                <div
                    ref={headerBoxRef}
                    className="gsap-mobile-step bg-[#334a89] rounded-[36px] py-16 md:py-20 px-8 md:px-16 max-w-5xl mx-auto shadow-2xl relative z-10 flex flex-col items-center text-center overflow-hidden"
                >
                    <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
                        <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-[#ffc715]">
              GUIDING PRINCIPLES
            </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.08] relative z-10 max-w-2xl">
                        Our Core <em className="font-medium italic text-[#ffc715]">Philosophy</em>
                    </h2>

                    <div className="w-20 h-[2px] bg-[#ffc715] mt-6 relative z-10" />

                    {/* Spacer allowing the sleek cards to overlap the blue box boundary */}
                    <div className="h-12 md:h-20 w-full" />
                </div>

                {/* =========================================================
            BOTTOM LAYER (z-20): SLEEK, MINIMALIST BENTO CARDS
            Strictly high-contrast typography, zero clipart icons.
        ========================================================= */}
                <div className="edmund-interlock-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-20 -mt-16 md:-mt-24 px-2 sm:px-4">

                    {/* ---------------------------------------------------------
              CARD 1: OUR VISION (Sleek Minimalist Spec)
          --------------------------------------------------------- */}
                    <div
                        ref={visionCardRef}
                        data-cursor-image="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop"
                        className="gsap-mobile-step bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(21,40,61,0.06)] border border-[#334a89]/15 flex flex-col justify-between relative group hover:border-[#6ab39d]/60 transition-colors duration-500"
                    >
                        <div>
                            {/* Minimal Typographic Header Lockup */}
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2 h-2 bg-[#6ab39d] block" />
                                    <span className="font-['Quicksand'] font-extrabold text-xs tracking-[0.25em] text-[#6ab39d] uppercase">
                    OUR VISION
                  </span>
                                </div>
                                <span className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-[#15283D]/15 select-none leading-none">
                  01
                </span>
                            </div>

                            {/* Master Vision Quote */}
                            <p className="font-['Quicksand'] font-bold text-2xl md:text-3xl text-[#334a89] leading-[1.35] mb-12 tracking-tight">
                                “We envision individuals transforming the world through excellence-driven leadership that uplifts humanity.”
                            </p>
                        </div>

                        {/* 3-Column Editorial Typesetting */}
                        <div className="border-t border-[#15283D]/10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 font-['Quicksand']">
                            <div className="gsap-spec-item">
                                <span className="font-bold text-sm text-[#15283D] block mb-1">Resilience</span>
                                <p className="text-xs text-[#5C5C61] leading-relaxed font-medium">
                                    Embracing challenges with courage and determination.
                                </p>
                            </div>

                            <div className="gsap-spec-item">
                                <span className="font-bold text-sm text-[#15283D] block mb-1">Humility</span>
                                <p className="text-xs text-[#5C5C61] leading-relaxed font-medium">
                                    Leading with kindness, empathy, and integrity.
                                </p>
                            </div>

                            <div className="gsap-spec-item">
                                <span className="font-bold text-sm text-[#15283D] block mb-1">Excellence</span>
                                <p className="text-xs text-[#5C5C61] leading-relaxed font-medium">
                                    Striving to do their best with consistency and purpose.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* ---------------------------------------------------------
              CARD 2: OUR MISSION (Sleek Minimalist Spec)
          --------------------------------------------------------- */}
                    <div
                        ref={missionCardRef}
                        data-cursor-image="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=400&auto=format&fit=crop"
                        className="gsap-mobile-step bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(21,40,61,0.06)] border border-[#334a89]/15 flex flex-col justify-between relative group hover:border-[#e97f7b]/60 transition-colors duration-500"
                    >
                        <div>
                            {/* Minimal Typographic Header Lockup */}
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2 h-2 bg-[#e97f7b] block" />
                                    <span className="font-['Quicksand'] font-extrabold text-xs tracking-[0.25em] text-[#e97f7b] uppercase">
                    OUR MISSION
                  </span>
                                </div>
                                <span className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-[#15283D]/15 select-none leading-none">
                  02
                </span>
                            </div>

                            {/* Master Mission Quote */}
                            <p className="font-['Quicksand'] font-bold text-2xl md:text-3xl text-[#334a89] leading-[1.35] mb-12 tracking-tight">
                                “To create meaningful learning experiences that develop curiosity, independence, emotional strength, and a lifelong love for learning.”
                            </p>
                        </div>

                        {/* Minimalist Left-Border Kicker Prose */}
                        <div className="border-t border-[#15283D]/10 pt-8 flex items-start">
                            <p className="font-['Quicksand'] text-sm md:text-base text-[#5C5C61] leading-relaxed font-medium pl-4 border-l-2 border-[#e97f7b]/50">
                                We strive to nurture learners who think independently, communicate confidently, and grow into compassionate individuals prepared for both local and global futures.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}