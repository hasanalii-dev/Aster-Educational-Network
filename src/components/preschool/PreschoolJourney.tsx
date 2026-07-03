import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sprout, Flower2, Sun } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolJourney() {
    const sectionRef = useRef<HTMLElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                    }
                )
            }

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
                    }
                )
            }

            if (footerRef.current) {
                gsap.fromTo(
                    footerRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const stages = [
        {
            label: 'CASA 1',
            icon: Sprout,
            color: 'bg-[#6ab39d]',
            textColor: 'text-white',
            iconBg: 'bg-white/15',
            desc: 'Children begin building independence, confidence, language, coordination, and social awareness through hands-on exploration and purposeful activities.',
        },
        {
            label: 'CASA 2',
            icon: Flower2,
            color: 'bg-[#e97f7b]',
            textColor: 'text-white',
            iconBg: 'bg-white/15',
            desc: 'As children grow, they are introduced to more complex learning experiences that strengthen concentration, communication, problem-solving, and responsibility.',
        },
        {
            label: 'CASA 3',
            icon: Sun,
            color: 'bg-[#9765d1]',
            textColor: 'text-white',
            iconBg: 'bg-white/15',
            desc: 'Children deepen their understanding of literacy, mathematics, and the world around them while developing the confidence, independence, and readiness needed for the next stage of their educational journey.',
        },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none overflow-hidden">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center">

                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <Sprout className="w-5 h-5 text-[#6ab39d] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5 text-left md:text-center">
                            THE ASTER EARLY YEARS JOURNEY
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black leading-[1.05] mb-8">
                        Our Preschool program is divided into <em className="font-medium italic text-[#6ab39d]">three stages</em>
                    </h2>

                    <div className="w-16 h-[2px] bg-[#6ab39d] mb-10" />
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mb-16">
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            className={`group relative p-8 md:p-10 flex flex-col items-center text-center rounded-[32px] md:rounded-[40px] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${stage.color} shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)]`}
                        >
                            {/* Giant Watermark Icon */}
                            <stage.icon
                                className="absolute -bottom-8 -right-8 w-48 h-48 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 text-white/10"
                                strokeWidth={1}
                            />

                            {/* Corner bracket */}
                            <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 pointer-events-none border-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-full ${stage.iconBg} flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/25`}>
                                <stage.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                            </div>

                            {/* Stage Label */}
                            <span className="font-['Quicksand'] font-extrabold text-sm tracking-[0.2em] text-white/80 uppercase mb-3">
                                {stage.label}
                            </span>

                            {/* Description */}
                            <p className={`font-['Quicksand'] text-base md:text-lg font-medium leading-[1.6] ${stage.textColor} opacity-95`}>
                                {stage.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div ref={footerRef} className="text-center max-w-3xl mx-auto">
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#334a89] leading-snug">
                        Each child progresses according to their individual development, allowing learning to remain meaningful, joyful, and appropriately challenging.
                    </p>
                </div>

            </div>
        </section>
    )
}
