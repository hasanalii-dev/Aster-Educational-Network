import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import atomsIcon from '@/assets/icons/atoms.svg'
import pasteIcon from '@/assets/icons/paste.svg'
import ribbonIcon from '@/assets/icons/ribbon.svg'

gsap.registerPlugin(ScrollTrigger)

export function AboutPrologue() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Section Header Entrance Fade
            gsap.fromTo(
                '.gsap-prologue-head',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
            )

            // 2. The Sticky Stacking Deck (GSAP Depth Push)
            cardsRef.current.forEach((card, index) => {
                if (index === cardsRef.current.length - 1) return

                const nextCard = cardsRef.current[index + 1]

                gsap.to(card, {
                    scale: 0.95,
                    opacity: 0.85,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: nextCard,
                        start: 'top ' + (152 + index * 32),
                        end: '+=250',
                        scrub: true,
                    },
                })
            })

            // 3. Floating Background Depth Icons (Static Floating)
            gsap.to('.depth-icon-1', { y: -20, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to('.depth-icon-2', { y: 25, rotation: -8, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to('.depth-icon-3', { y: -15, rotation: 6, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-28 px-6 md:px-12 relative overflow-visible">

            {/* =========================================================
          BACKGROUND DEPTH LAYER: FLOATING SVGS
      ========================================================= */}
            <div className="absolute inset-0 max-w-[1500px] mx-auto pointer-events-none z-0">
                <img
                    src={atomsIcon}
                    alt=""
                    className="hidden md:block depth-icon-1 absolute top-20 right-4 md:right-12 w-44 md:w-64 h-auto opacity-60 blur-[2px]"
                />
                <img
                    src={pasteIcon}
                    alt=""
                    className="hidden md:block depth-icon-2 absolute top-[40%] right-[10%] w-36 md:w-52 h-auto opacity-70"
                />
                <img
                    src={ribbonIcon}
                    alt=""
                    className="hidden md:block depth-icon-3 absolute top-16 -left-8 md:-left-12 w-64 md:w-80 h-auto opacity-60"
                />
            </div>

            <div className="max-w-[1360px] mx-auto flex flex-col items-center relative z-10">

                {/* =========================================================
            SITEWIDE STANDARD SECTION HEADER
        ========================================================= */}
                <div className="text-center max-w-4xl flex flex-col items-center gap-4 mb-20 gsap-prologue-head">

                    <div className="flex items-center gap-3 mb-2">
                        <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-[#334a89]">
              OUR CORE PHILOSOPHY
            </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium text-[#334a89] leading-[1.1] tracking-tight max-w-4xl">
                        Building Future-Ready <br className="hidden sm:block" />
                        <em className="font-medium italic text-[#ffc715]">Learners</em> with Purpose.
                    </h2>

                    <p className="font-['Quicksand'] text-base md:text-lg font-medium text-[#5C5C61] leading-relaxed max-w-3xl mt-2">
                        “At The Aster School, we believe education should do more than prepare children for examinations; it should prepare them for life.”
                    </p>

                </div>

                {/* =========================================================
            THE STICKY STACKING DECK (Wide Curved Cards)
            CARD HEADINGS SWAPPED TO HEAVY QUICKSAND (!text-white)
            CLEAN, WIDGET-FREE CURVED IMAGES
        ========================================================= */}
                <div className="w-full flex flex-col gap-12 pb-24">

                    {/* STACK CARD 1: CORAL (#e97f7b) */}
                    <div
                        ref={el => cardsRef.current[0] = el!}
                        className="sticky top-[120px] w-full bg-[#e97f7b] rounded-[40px] p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl transition-all duration-300 border border-white/25 will-change-transform z-10"
                    >
                        {/* Left Copy: FORCED PURE ASTER WHITE */}
                        <div className="lg:col-span-6 flex flex-col justify-center">
                            {/* SWAPPED TO QUICKSAND EXTRABOLD (800 weight) */}
                            <h3 className="font-['Quicksand'] text-3xl md:text-5xl font-extrabold leading-tight mb-6 !text-white tracking-tight">
                                Developing Character & Competence
                            </h3>
                            <p className="font-['Quicksand'] text-lg md:text-xl leading-relaxed font-medium !text-white">
                                Our mission is to nurture confident, capable, and compassionate individuals through meaningful learning experiences that develop both character and competence.
                            </p>
                        </div>

                        {/* Right Visual Box: CLEAN CURVED IMAGE */}
                        <div className="lg:col-span-6 h-[340px] md:h-[400px] w-full rounded-[32px] overflow-hidden shadow-xl border-4 border-white/25 bg-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
                                alt="Students collaborating"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* STACK CARD 2: BOTANICAL SAGE (#6ab39d) */}
                    <div
                        ref={el => cardsRef.current[1] = el!}
                        className="sticky top-[152px] w-full bg-[#6ab39d] rounded-[40px] p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl transition-all duration-300 border border-white/25 will-change-transform z-20"
                    >
                        {/* Left Copy: FORCED PURE ASTER WHITE */}
                        <div className="lg:col-span-6 flex flex-col justify-center">
                            {/* SWAPPED TO QUICKSAND EXTRABOLD (800 weight) */}
                            <h3 className="font-['Quicksand'] text-3xl md:text-5xl font-extrabold leading-tight mb-6 !text-white tracking-tight">
                                Environments Built for Purpose
                            </h3>
                            <p className="font-['Quicksand'] text-lg md:text-xl leading-relaxed font-medium !text-white">
                                From the earliest years to senior school, we intentionally create environments where students are encouraged to think independently, lead with empathy, communicate confidently, and grow with purpose.
                            </p>
                        </div>

                        {/* Right Visual Box: CLEAN CURVED IMAGE */}
                        <div className="lg:col-span-6 h-[340px] md:h-[400px] w-full rounded-[32px] overflow-hidden shadow-xl border-4 border-white/25 bg-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                                alt="Aster Classroom"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* STACK CARD 3: LAVENDER (#9765d1) */}
                    <div
                        ref={el => cardsRef.current[2] = el!}
                        className="sticky top-[184px] w-full bg-[#9765d1] rounded-[40px] p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl transition-all duration-300 border border-white/25 will-change-transform z-30"
                    >
                        {/* Left Copy: FORCED PURE ASTER WHITE */}
                        <div className="lg:col-span-6 flex flex-col justify-center">
                            {/* SWAPPED TO QUICKSAND EXTRABOLD (800 weight) */}
                            <h3 className="font-['Quicksand'] text-3xl md:text-5xl font-extrabold leading-tight mb-6 !text-white tracking-tight">
                                Learning Beyond Textbooks
                            </h3>
                            <p className="font-['Quicksand'] text-lg md:text-xl leading-relaxed font-medium !text-white">
                                At Aster, learning is not limited to textbooks or memorization. We believe children learn best when they actively explore, question, create, collaborate, and apply their understanding to the world around them.
                            </p>
                        </div>

                        {/* Right Visual Box: CLEAN CURVED IMAGE */}
                        <div className="lg:col-span-6 h-[340px] md:h-[400px] w-full rounded-[32px] overflow-hidden shadow-xl border-4 border-white/25 bg-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop"
                                alt="Active Discovery"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}