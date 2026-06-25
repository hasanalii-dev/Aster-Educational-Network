import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutLearner() {
    const sectionRef = useRef<HTMLElement>(null)
    const leftColRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(min-width: 1024px)', () => {
                const left = leftColRef.current
                const right = rightColRef.current
                if (!left || !right) return

                // Master Section Title Entrance
                gsap.fromTo(
                    '.gsap-profile-title',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
                )

                // Asymmetric 3D Plinth Elevation (Staggered)
                gsap.fromTo(
                    left,
                    { opacity: 0, y: 90, rotateX: 6 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power2.out', scrollTrigger: { trigger: left, start: 'top 75%' } }
                )

                gsap.fromTo(
                    right,
                    { opacity: 0, y: 90, rotateX: 6 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power2.out', delay: 0.18, scrollTrigger: { trigger: right, start: 'top 75%' } }
                )

                // Unified Parallax Scrub (Handles both the Left Image AND the Right Video!)
                gsap.utils.toArray<HTMLElement>('.gsap-parallax-media').forEach((media) => {
                    gsap.fromTo(
                        media,
                        { yPercent: -8, scale: 1.06 },
                        { yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true } }
                    )
                })

                // Debossed Footer Die Flourish
                gsap.fromTo(
                    '.gsap-deboss-die',
                    { scale: 0.94, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.gsap-deboss-die', start: 'top 85%' } }
                )

                gsap.fromTo(
                    '.gsap-die-emblem',
                    { rotation: -180, scale: 0.5 },
                    { rotation: 0, scale: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-deboss-die', start: 'top 85%' } }
                )

                // Bullet Micro-Indentation on Hover
                gsap.utils.toArray<HTMLElement>('.gsap-bullet-item').forEach((item) => {
                    const pip = item.querySelector('.gsap-pip')
                    const text = item.querySelector('.gsap-text')

                    const hoverTl = gsap.timeline({ paused: true })
                    if (pip) hoverTl.to(pip, { scale: 1.35, duration: 0.2, ease: 'power2.out' }, 0)
                    if (text) hoverTl.to(text, { x: 6, duration: 0.25, ease: 'power2.out' }, 0)

                    item.addEventListener('mouseenter', () => hoverTl.play())
                    item.addEventListener('mouseleave', () => hoverTl.reverse())
                })
            })

            mm.add('(max-width: 1023px)', () => {
                gsap.fromTo(
                    '.gsap-mobile-step',
                    { opacity: 0, y: 35 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        /* STRICT Warm Institutional Sand Canvas (#F4F1EA). Zero Black. */
        <section ref={sectionRef} className="bg-[#F4F1EA] text-[#15283D] py-32 md:py-44 px-6 md:px-12 relative overflow-hidden select-none">

            {/* TOP LINTEL: SCALLOPED DIE-CUT PAPER CLOUD BORDER (text-[#FAFAFA] override) */}
            <div className="absolute top-0 left-0 right-0 h-8 md:h-12 text-[#FAFAFA] overflow-hidden pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col">

                {/* =========================================================
            SITEWIDE CONSISTENT MASTER HEADER (BESPOKE ASTERISK ICON)
        ========================================================= */}
                <div className="text-center max-w-3xl mx-auto mb-20 gsap-profile-title gsap-mobile-step group/head">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {/* The Vitruvian 8-Point Aster Star */}
                        <div className="w-5 h-5 flex items-center justify-center text-[#334a89] group-hover/head:rotate-90 transition-transform duration-500 origin-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20" />
                                <path d="M2 12h20" />
                                <path d="m5 5 14 14" />
                                <path d="m5 19 14-14" />
                            </svg>
                        </div>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-[#334a89]">
              THE ASTER PROFILE
            </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium text-[#334a89] tracking-tight leading-[1.08]">
                        Raising the <em className="font-medium italic text-[#ffc715]">Future-Ready</em> Learner
                    </h2>

                    <div className="w-16 h-[2px] bg-[#ffc715] mx-auto mt-6" />
                </div>

                {/* =========================================================
            THE EDMUND ASYMMETRIC SPREAD (5 / 7 Ratio)
        ========================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" style={{ perspective: '1200px' }}>

                    {/* ---------------------------------------------------------
              LEFT PLINTH (col-span-5): THE INDIVIDUAL
          --------------------------------------------------------- */}
                    <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-8 gsap-mobile-step">

                        {/* Header Lock */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 bg-[#ffc715]" />
                                <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.25em] text-[#334a89] uppercase">
                  THE FOUNDATION
                </span>
                            </div>
                            <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#334a89] leading-tight tracking-tight">
                                The Aster Learner
                            </h3>
                        </div>

                        {/* True-Color 3:4 Student Focus Portrait */}
                        <div className="w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-xl border border-[#334a89]/15 bg-[#334a89]/5">
                            <img
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
                                alt="Aster Student engaged in deep focus"
                                className="gsap-parallax-media w-full h-full object-cover contrast-105 will-change-transform"
                            />
                        </div>

                        {/* Alabaster Inset Bento Card */}
                        <div className="bg-white rounded-[28px] p-8 border border-[#334a89]/10 shadow-[0_15px_35px_rgba(21,40,61,0.05)] flex flex-col justify-between">
                            <p className="font-['Quicksand'] font-bold text-base md:text-lg text-[#334a89] mb-6 leading-snug">
                                At Aster, children are given the time, space, and dedicated guidance to:
                            </p>

                            <ul className="flex flex-col gap-3.5 mb-6">
                                {[
                                    'Explore freely without fear of failure',
                                    'Learn independently through inquiry',
                                    'Express confidently in every medium',
                                    'Grow organically at their own pace',
                                ].map((item, i) => (
                                    <li key={i} className="gsap-bullet-item flex items-start gap-3 font-['Quicksand'] text-sm md:text-base font-bold text-[#15283D] cursor-default">
                                        <span className="gsap-pip text-[#ffc715] text-base leading-none mt-0.5 inline-block origin-center">■</span>
                                        <span className="gsap-text inline-block transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="font-['Quicksand'] font-medium text-xs md:text-sm text-[#5C5C61] leading-relaxed border-t border-[#334a89]/10 pt-5">
                                Through meaningful experiences, hands-on learning, leadership opportunities, sports, and creativity, students develop an unshakeable inner foundation.
                            </p>
                        </div>

                    </div>

                    {/* ---------------------------------------------------------
              RIGHT PLINTH (col-span-7): THE ECOSYSTEM (VIDEO UPGRADE)
          --------------------------------------------------------- */}
                    <div ref={rightColRef} className="lg:col-span-7 flex flex-col gap-8 gsap-mobile-step pt-4 lg:pt-0">

                        {/* Header Lock */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 bg-[#6ab39d]" />
                                <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.25em] text-[#6ab39d] uppercase">
                  THE REAL WORLD
                </span>
                            </div>
                            <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#334a89] leading-tight tracking-tight">
                                Education Beyond Academics
                            </h3>
                        </div>

                        <p className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] font-medium leading-relaxed">
                            Through practical robotics, structured competitive sports, sustainability initiatives, early entrepreneurship, and rigorous social-emotional learning, we bridge the gap between classroom theory and real-world execution.
                        </p>

                        {/*
              ── THE LIVE 16:9 CAMPUS VIDEO ATRIUM ──
              Features a frosted glass broadcast pill in the top right.
            */}
                        <div className="w-full aspect-[16/9] rounded-[28px] overflow-hidden shadow-xl border border-[#334a89]/15 bg-[#334a89]/10 relative group">


                            {/* High-Stability 16:9 Educational Tech Stock MP4 */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                                className="gsap-parallax-media w-full h-full object-cover contrast-105 will-change-transform"
                            >
                                <source src="https://alpha.edu.pk/img/hero.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>

                        {/* Bento Outcome Tray (Solid Sage Squares ■) */}
                        <div className="bg-white rounded-[28px] p-8 md:p-10 border border-[#334a89]/10 shadow-[0_15px_35px_rgba(21,40,61,0.05)] flex flex-col">
              <span className="font-['Quicksand'] font-bold text-[10px] tracking-[0.25em] text-[#6ab39d] uppercase block mb-6">
                THE 5 TARGET COMPETENCIES
              </span>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {[
                                    { label: 'Critical Thinkers', desc: 'Analyzing data objectively' },
                                    { label: 'Effective Communicators', desc: 'Speaking with clarity & intent' },
                                    { label: 'Creative Problem-Solvers', desc: 'Innovating past roadblocks' },
                                    { label: 'Emotionally Intelligent', desc: 'Navigating human dynamics' },
                                    { label: 'Global Citizens', desc: 'Taking stewardship of the planet' },
                                ].map((item, i) => (
                                    <li key={i} className="gsap-bullet-item flex items-start gap-3 font-['Quicksand'] cursor-default">
                    <span className="gsap-pip text-[#6ab39d] text-base leading-none mt-0.5 inline-block origin-center">
                      ■
                    </span>
                                        <div className="gsap-text flex flex-col">
                                            <span className="font-bold text-sm text-[#15283D] leading-snug">{item.label}</span>
                                            <span className="font-medium text-xs text-[#5C5C61] mt-0.5">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Debossed Closing Quote */}
                        <div className="gsap-deboss-die bg-[#334a89] rounded-[24px] p-8 md:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden flex items-center justify-between">
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#394da1] rounded-full blur-2xl pointer-events-none" />

                            <p className="font-['Quicksand'] font-bold text-lg md:text-xl leading-snug max-w-xl relative z-10">
                                “Because enduring success in the modern world requires vastly more than academic achievement alone.”
                            </p>

                            <div className="gsap-die-emblem w-12 h-12 rounded-full bg-[#ffc715] flex items-center justify-center text-[#334a89] shrink-0 relative z-10 shadow-md hidden sm:flex">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* BOTTOM LINTEL: SCALLOPED DIE-CUT BORDER */}
            <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 text-white overflow-hidden pointer-events-none z-20">
                <svg className="w-full h-full transform -scale-y-100" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

        </section>
    )
}