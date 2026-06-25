import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Target, Cpu, Users, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceFutureReady() {
    const sectionRef = useRef<HTMLElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Intro Text Reveal
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                    }
                )
            }

            // 2. Edmun Cards Staggered Deal
            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
                    }
                )
            }

            // 3. Footer Statement Reveal
            if (footerRef.current) {
                gsap.fromTo(
                    footerRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
                    }
                )

                const words = gsap.utils.toArray<HTMLElement>(footerRef.current.querySelectorAll('.gsap-scrub-word'))
                if (words.length > 0) {
                    gsap.to(words, {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 80%',
                            end: 'bottom 60%',
                            scrub: true,
                        }
                    })
                }
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const cardsData = [
        {
            text: 'Think critically and creatively',
            icon: Brain,
            isDark: false
        },
        {
            text: 'Solve real-world problems',
            icon: Target,
            isDark: true
        },
        {
            text: 'Adapt to new technologies',
            icon: Cpu,
            isDark: false
        },
        {
            text: 'Work collaboratively',
            icon: Users,
            isDark: true
        },
        {
            text: 'Approach challenges with confidence',
            icon: Shield,
            isDark: false
        }
    ]

    return (
        /* Cloud-shaped section borders without the floating container effect */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden select-none rounded-[60px] md:rounded-[120px]">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center">

                {/* =========================================================
            TOP SECTION: INTRO & THESIS
        ========================================================= */}
                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">

                    <div className="flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#334a89]">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="#FFC51B" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
              FUTURE-READY LEARNING
            </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#334a89] !text-[#334a89] leading-[1.05] mb-8">
                        Preparing Students for <em className="font-medium italic text-[#FFC51B] !text-[#FFC51B]">Tomorrow</em>, Today
                    </h2>

                    <div className="w-16 h-[2px] bg-[#FFC51B] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] !text-[#5C5C61] space-y-6 leading-[1.65] font-medium">
                        <p>
                            Technology is transforming the world at an unprecedented pace. Students need more than digital exposure, they need opportunities to think critically, solve problems, innovate, and create.
                        </p>
                        <p>
                            Through Robotics, Digital Literacy, innovation-based learning, and hands-on problem-solving experiences, students develop the skills that will help them thrive in an increasingly dynamic world.
                        </p>
                        <p className="text-[#334a89] !text-[#334a89] font-bold text-xl pt-4">They learn to:</p>
                    </div>
                </div>

                {/* =========================================================
            MIDDLE SECTION: EDMUN HIGH STATEMENT CARDS
            Light cards strictly set to warm yellow-white (#F2E0C2).
        ========================================================= */}
                <div ref={cardsRef} className="flex flex-wrap justify-center w-full gap-6 mb-20 max-w-6xl">
                    {cardsData.map((card, index) => (
                        <div
                            key={index}
                            className={`
                group relative p-10 md:p-12 flex flex-col justify-start text-left
                w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
                min-h-[280px]
                rounded-[32px] md:rounded-[40px] overflow-hidden
                transition-all duration-500 hover:-translate-y-2
                ${card.isDark
                                ? 'bg-[#334a89] shadow-[0_15px_40px_rgba(51,74,137,0.15)] hover:shadow-[0_25px_50px_rgba(51,74,137,0.3)]'
                                : 'bg-[#FFC51B] shadow-[0_15px_40px_rgba(255,199,21,0.2)] hover:shadow-[0_25px_50px_rgba(255,199,21,0.4)]'
                            }
              `}
                        >
                            {/* Giant Watermark Icon */}
                            <card.icon 
                                className={`absolute -bottom-8 -right-8 w-48 h-48 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${card.isDark ? 'text-white/10' : 'text-white/30'}`} 
                                strokeWidth={1}
                            />

                            {/* Edmun High Corner Bracket ┐ */}
                            <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 pointer-events-none border-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                            {/* The Quicksand Text Node (Anti-Black Reset Guarded) */}
                            <h4 className="relative z-10 font-['Quicksand'] text-2xl md:text-[28px] font-bold leading-tight tracking-tight text-white !text-white pr-8">
                                {card.text}
                            </h4>
                        </div>
                    ))}
                </div>

                {/* =========================================================
            BOTTOM SECTION: FOOTER THESIS
        ========================================================= */}
                <div ref={footerRef} className="relative w-full max-w-4xl mx-auto bg-white rounded-[40px] p-10 md:p-14 shadow-[0_20px_50px_rgba(51,74,137,0.08)] border border-[#334a89]/5 text-center mt-6">
                    
                    {/* Decorative Aster Quote Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFC51B] rounded-full flex items-center justify-center shadow-lg border-4 border-[#FAFAFA]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                    </div>

                    <p className="font-['Quicksand'] font-bold text-[#334a89] !text-[#334a89] text-xl md:text-2xl lg:text-3xl leading-[1.5]">
                        {`Rather than simply consuming technology, Aster students learn how to use it purposefully to create, innovate, and lead.`.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word opacity-20 inline-block mr-[0.25em] will-change-transform">{word}</span>
                        ))}
                    </p>
                </div>

            </div>
        </section>
    )
}