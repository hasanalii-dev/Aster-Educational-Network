import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, Lightbulb, Users, Globe2, HeartHandshake, MousePointerClick } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachHandsOn() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hands-on-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            if (cardsRef.current) {
                gsap.fromTo(cardsRef.current.children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const pillars = [
        { label: 'Exploration', icon: Compass },
        { label: 'Discovery', icon: Lightbulb },
        { label: 'Collaboration', icon: Users },
        { label: 'Real-world application', icon: Globe2 },
        { label: 'Meaningful participation', icon: HeartHandshake }
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-white relative">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col items-center">
                
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6 hands-on-text">
                        <MousePointerClick className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            HANDS-ON & INQUIRY-BASED LEARNING
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 hands-on-text tracking-tight">
                        Children learn best when they <em className="italic text-[#3A53A4]">experience</em> learning for themselves.
                    </h2>

                    <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] hands-on-text">
                        Our classrooms are designed around:
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full mb-20">
                    {pillars.map((pillar, i) => (
                        <div key={i} className="group relative bg-[#fbfaf8] border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-[#334a89] transition-colors duration-400">
                            <div className="w-14 h-14 rounded-full bg-[#334a89]/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors duration-400">
                                <pillar.icon className="w-6 h-6 text-[#334a89] group-hover:text-[#FBBB21] transition-colors duration-400" />
                            </div>
                            <span className="font-['Quicksand'] font-bold text-[#1c1c1c] group-hover:text-white transition-colors duration-400">
                                {pillar.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto text-center font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] flex flex-col gap-6 hands-on-text">
                    <p>
                        Through inquiry-based learning, projects, discussions, experimentation, and hands-on experiences, students build deeper understanding rather than relying on memorization alone.
                    </p>
                    <p className="font-bold text-[#3A53A4] text-xl md:text-2xl mt-2">
                        Learning becomes active, engaging, and purposeful.
                    </p>
                </div>

            </div>
        </section>
    )
}
