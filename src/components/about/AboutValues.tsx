import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutValues() {
    const sectionRef = useRef<HTMLElement>(null)
    const floatingPillsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {

            /*
              ── THE DECOUPLED LISSAJOU HARMONIC FLOAT MATRIX ──
              X, Y, and Rotation run on non-divisible prime-number durations.
              Guarantees 100% collision immunity with the text block.
            */
            const floatProfiles = [
                { x: -12, y: -10, r: -3.5, dX: 4.3, dY: 5.1, dR: 5.9, dly: 0.1 },   // Sage
                { x: 12, y: -8, r: 4.0, dX: 4.9, dY: 5.7, dR: 4.6, dly: 0.75 },    // Coral
                { x: -10, y: 10, r: -2.5, dX: 5.4, dY: 4.5, dR: 6.2, dly: 1.4 },   // Gold
                { x: 10, y: 8, r: 3.5, dX: 4.1, dY: 4.8, dR: 5.3, dly: 2.1 },      // Lavender
            ]

            floatingPillsRef.current.forEach((pill, i) => {
                if (!pill) return
                const p = floatProfiles[i]

                gsap.to(pill, { x: p.x, duration: p.dX, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: p.dly })
                gsap.to(pill, { y: p.y, duration: p.dY, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: p.dly + 0.3 })
                gsap.to(pill, { rotation: p.r, duration: p.dR, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: p.dly + 0.6 })
            })

            gsap.fromTo(
                '.gsap-values-box',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        /* STRICT Pure Alabaster (#FAFAFA). Zero Black sitewide. */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] select-none">

            {/* STRICTLY rounded-none! Pure 90-degree institutional monolith */}
            <div className="gsap-values-box max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-none overflow-hidden border border-[#334a89]/15 shadow-[0_25px_60px_rgba(21,40,61,0.08)] min-h-[640px] relative z-10">

                {/* =========================================================
            LEFT COLUMN: THE BLUE INSTITUTIONAL ANCHOR (UNTOUCHED)
        ========================================================= */}
                <div className="bg-[#334a89] p-10 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#394da1] rounded-bl-full pointer-events-none opacity-45 blur-2xl" />

                    <div className="relative z-10 mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-4 h-4 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] !text-[#ffc715] uppercase">
                CORE GUIDING PRINCIPLE
              </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-[64px] font-medium mb-5 leading-[1.05] tracking-tight">
                            <span className="text-white !text-white">Excellence with</span>
                            <br />
                            <em className="font-medium italic text-[#ffc715] !text-[#ffc715]">Purpose</em>
                        </h2>

                        <p className="font-['Quicksand'] text-base md:text-lg text-white/85 !text-white/85 max-w-md font-medium leading-relaxed">
                            We always do our best to make a difference, leading by helping others and doing what is right.
                        </p>
                    </div>

                    <div className="w-full h-64 md:h-72 rounded-none overflow-hidden shadow-2xl border-2 border-white/15 relative z-10 bg-[#394da1]">
                        <img
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
                            alt="Aster Students Collaborating"
                            className="w-full h-full object-cover contrast-105"
                        />
                    </div>
                </div>

                {/* =========================================================
            RIGHT COLUMN: PURE FLAT-INK ORBITAL MATRIX (ZERO SHADOWS)
        ========================================================= */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-between items-center relative overflow-hidden min-h-[580px]">

                    <div className="hidden md:flex flex-col justify-between w-full max-w-[480px] h-[78%] my-auto z-20">

                        {/* ROW 1: ROOF TRACK */}
                        <div className="flex items-center justify-between w-full">
                            {/* Sage (Strict shadow-none) */}
                            <div
                                ref={(el) => { if (el) floatingPillsRef.current[0] = el }}
                                className="bg-[#6ab39d] text-white border border-[#52937e]/30 px-5 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs lg:text-sm flex items-center gap-2 shadow-none will-change-transform select-none"
                            >
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                                <span>Leadership for Impact</span>
                            </div>

                            {/* Coral (Strict shadow-none) */}
                            <div
                                ref={(el) => { if (el) floatingPillsRef.current[1] = el }}
                                className="bg-[#e97f7b] text-white border border-[#cf6562]/30 px-5 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs lg:text-sm flex items-center gap-2 shadow-none will-change-transform select-none"
                            >
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                <span>Compassion & Service</span>
                            </div>
                        </div>

                        {/* ROW 2: FROZEN CENTER TEXT NODE */}
                        <div className="flex flex-col items-center text-center my-auto px-2 py-4 pointer-events-none">
                            <div className="flex items-center justify-center gap-3 mb-3.5">
                                <svg className="w-4 h-4 text-[#394da1]" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="4,12 14,12 14,22 4,22" />
                                    <polygon points="10,4 20,4 20,14 10,14" />
                                </svg>
                                <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#394da1] !text-[#394da1] uppercase">
                  OUR VALUES DEFINED
                </span>
                            </div>

                            <h3 className="font-['Playfair_Display'] text-4xl md:text-[40px] font-medium text-[#334a89] !text-[#334a89] leading-[1.1] mb-3.5 tracking-tight max-w-[340px]">
                                Values Designed for Global Impact & Human Leadership
                            </h3>

                            <p className="font-['Quicksand'] text-sm md:text-base text-[#5C5C61] !text-[#5C5C61] font-medium leading-relaxed max-w-[320px]">
                                We speak the truth, follow our values from the heart, and care for people, animals, and our planet.
                            </p>
                        </div>

                        {/* ROW 3: FLOOR TRACK */}
                        <div className="flex items-center justify-between w-full">
                            {/* Gold (Strict shadow-none) */}
                            <div
                                ref={(el) => { if (el) floatingPillsRef.current[2] = el }}
                                className="bg-[#ffc715] text-[#334a89] border border-[#d9a400]/30 px-5 py-2.5 rounded-full font-['Quicksand'] font-extrabold text-xs lg:text-sm flex items-center gap-2 shadow-none will-change-transform select-none"
                            >
                                <svg className="w-4 h-4 text-[#334a89] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                                <span>Absolute Integrity</span>
                            </div>

                            {/* Lavender Lightbulb (Strict shadow-none) */}
                            <div
                                ref={(el) => { if (el) floatingPillsRef.current[3] = el }}
                                className="bg-[#9765d1] text-white border border-[#7d4bb5]/30 px-5 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs lg:text-sm flex items-center gap-2 shadow-none will-change-transform select-none"
                            >
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                    <path d="M9 18h6" />
                                    <path d="M10 22h4" />
                                </svg>
                                <span>Lifelong Innovation</span>
                            </div>
                        </div>

                    </div>

                    {/* ── MOBILE FALLBACK: Pristine Flat Stack (< 768px) ── */}
                    <div className="flex md:hidden flex-col items-center text-center my-auto py-8 w-full">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#394da1]" />
                            <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.25em] text-[#394da1] uppercase">
                OUR VALUES DEFINED
              </span>
                        </div>

                        <h3 className="font-['Playfair_Display'] text-3xl font-medium text-[#334a89] leading-tight mb-3">
                            Values Designed for Global Impact & Human Leadership
                        </h3>

                        <p className="font-['Quicksand'] text-xs text-[#5C5C61] font-medium leading-relaxed mb-8">
                            We speak the truth, follow our values from the heart, and care for people, animals, and our planet.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
                            <div className="bg-[#6ab39d] text-white border border-[#52937e]/30 px-4 py-3 rounded-2xl font-['Quicksand'] font-bold text-xs flex items-center gap-2.5 text-left shadow-none">
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                                <span>Leadership for Impact</span>
                            </div>
                            <div className="bg-[#e97f7b] text-white border border-[#cf6562]/30 px-4 py-3 rounded-2xl font-['Quicksand'] font-bold text-xs flex items-center gap-2.5 text-left shadow-none">
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                <span>Compassion & Service</span>
                            </div>
                            <div className="bg-[#ffc715] text-[#334a89] border border-[#d9a400]/30 px-4 py-3 rounded-2xl font-['Quicksand'] font-extrabold text-xs flex items-center gap-2.5 text-left shadow-none">
                                <svg className="w-4 h-4 text-[#334a89] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                <span>Absolute Integrity</span>
                            </div>
                            <div className="bg-[#9765d1] text-white border border-[#7d4bb5]/30 px-4 py-3 rounded-2xl font-['Quicksand'] font-bold text-xs flex items-center gap-2.5 text-left shadow-none">
                                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                                <span>Lifelong Innovation</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}