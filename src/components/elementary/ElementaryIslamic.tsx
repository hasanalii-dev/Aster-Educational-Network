import { useEffect, useRef } from 'react'
import { Moon, Star, ShieldCheck, Heart, Leaf, Sun, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryIslamic() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Content Staggered Fade-Up
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }

            // 2. Spring-Loaded Card Grid Entrance
            if (cardsRef.current) {
                const cards = cardsRef.current.children
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 3. One-Shot Mechanical Typesetting (Thesis Statement)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 85%',
                            once: true,
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const values = [
        { label: 'Integrity', icon: ShieldCheck },
        { label: 'Humility', icon: Leaf },
        { label: 'Respect', icon: Star },
        { label: 'Compassion', icon: Heart },
        { label: 'Gratitude', icon: Sun },
        { label: 'Responsibility', icon: CheckCircle2 },
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em]">
                {word}
            </span>
        ))
    }

    return (
        /* Off-White Plinth Background */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] select-none overflow-hidden border-t border-[#15283D]/5">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center">

                {/* =========================================================
                    HEADER & THESIS
                ========================================================= */}
                <div ref={contentRef} className="flex flex-col items-center text-center max-w-3xl mb-16 md:mb-20">

                    {/* Square Bullet Label with Crescent Moon */}
                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <Moon className="w-5 h-5 text-[#6ab39d] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            ISLAMIC LEARNING & CHARACTER
                        </span>
                    </div>

                    {/* Aster Split Motif (Zero Black) */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] !text-[#15283D] mb-8 leading-[1.05]">
                        Rooted in Values, Guided by <em className="font-medium italic text-[#6ab39d] !text-[#6ab39d]">Purpose</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#6ab39d] mb-10" />

                    <p className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] !text-[#5C5C61] leading-[1.65] font-medium">
                        At Aster, character is developed intentionally. Through Islamic Learning and everyday school experiences, students deepen their understanding of faith while developing values that guide their actions and relationships.
                    </p>
                </div>

                {/* =========================================================
                    THE VALUE CARDS GRID (Slimmer 3D Canva Bevel UI)
                ========================================================= */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-20 w-full max-w-5xl">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            // TIGHTENED PADDING: px-5 py-3 md:px-6 md:py-4
                            className="group relative overflow-hidden rounded-[16px] px-5 py-3 md:px-6 md:py-4 bg-[#6ab39d] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default flex items-center gap-4

                            /* THE 3D BEVEL SHADOW EFFECT (Light top edge, dark bottom edge, standard drop shadow) */
                            shadow-[inset_0_2px_0_rgba(255,255,255,0.4),_inset_0_-2px_0_rgba(0,0,0,0.1),_0_10px_20px_rgba(106,179,157,0.25)]
                            hover:-translate-y-1 hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.6),_inset_0_-2px_0_rgba(0,0,0,0.1),_0_15px_30px_rgba(106,179,157,0.4)]
                            "
                        >
                            {/* Scaled-down Ghosted Watermark */}
                            <value.icon
                                className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:-rotate-12 text-white/10 group-hover:text-white/20"
                                strokeWidth={1}
                            />

                            {/* Adjusted Corner Bracket Indicator */}
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 border-white/30 group-hover:border-white/70" />

                            {/* Slimmer Interactive Icon Orb */}
                            <div className="relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-500 shrink-0 bg-white/20 group-hover:bg-white shadow-sm">
                                <value.icon className="w-4 h-4 md:w-4.5 md:h-4.5 transition-colors duration-500 text-white group-hover:text-[#6ab39d]" strokeWidth={2.5} />
                            </div>

                            {/* Card Text */}
                            <span className="relative z-10 font-['Quicksand'] font-bold text-base md:text-lg text-left text-white !text-white drop-shadow-sm mt-0.5">
                                {value.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* =========================================================
                    ONE-SHOT TYPESETTING THESIS
                ========================================================= */}
                <div ref={textRef} className="max-w-3xl text-center border-t border-[#15283D]/10 pt-10 w-full">
                    <p className="font-['Quicksand'] text-lg md:text-xl lg:text-[22px] text-[#334a89] !text-[#334a89] font-bold leading-[1.6]">
                        {renderWords("These values help students grow into individuals who are not only knowledgeable, but also principled, thoughtful, and purposeful.")}
                    </p>
                </div>

            </div>
        </section>
    )
}