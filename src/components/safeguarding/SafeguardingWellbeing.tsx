import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingWellbeing() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Standard Entrance (Staggered Fade-Up)
            gsap.fromTo('.wellbeing-text',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%'
                    }
                }
            )



            // 3. One-Shot Mechanical Typesetting
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0.25, y: 8 },
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

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FBBB21] relative overflow-hidden selection:bg-[#334a89] selection:text-white border-t border-[#334a89]/10 select-none">



            <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">

                {/* =========================================================
                    HEADER & MASTER TITLE
                ========================================================= */}
                <div className="flex items-center justify-center gap-3 mb-6 wellbeing-text group/star">
                    <div className="w-5 h-5 flex items-center justify-center text-[#334a89] group-hover/star:rotate-90 transition-transform duration-500 origin-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20" />
                            <path d="M2 12h20" />
                            <path d="m5 5 14 14" />
                            <path d="m5 19 14-14" />
                        </svg>
                    </div>
                    <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                        STUDENT WELLBEING
                    </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[64px] font-medium text-white !text-white leading-[1.05] mb-8 wellbeing-text tracking-tight">
                    Supporting the Whole <span className="font-['Quicksand'] font-bold text-[#334a89] !text-[#334a89]">Child</span>
                </h2>

                <div className="w-16 h-[2px] bg-white mb-10 wellbeing-text shadow-sm" />

                {/* =========================================================
                    PROSE & THESIS
                ========================================================= */}
                <div className="font-['Quicksand'] font-medium text-base md:text-lg lg:text-[20px] text-white !text-white leading-[1.75] max-w-3xl flex flex-col gap-8">

                    <p className="wellbeing-text">
                        Safeguarding includes protecting children's emotional wellbeing as well as their physical safety.
                    </p>

                    <p className="wellbeing-text">
                        Through positive relationships, Social Emotional Learning, pastoral support, and a culture built on respect and empathy, we strive to create environments where children feel valued, heard, and supported.
                    </p>

                    {/* The One-Shot Typesetting Container */}
                    <div ref={textRef} className="pt-6 mt-4 border-t border-white/20">
                        <p className="text-[#334a89] !text-[#334a89] font-bold text-xl md:text-2xl leading-[1.6]">
                            {renderWords("Students are encouraged to speak openly, seek help when needed, and contribute to a community where kindness, responsibility, and mutual respect are expected.")}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}