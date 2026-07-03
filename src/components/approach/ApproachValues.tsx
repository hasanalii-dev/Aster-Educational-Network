import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, ShieldCheck, Sprout, CheckCircle2, HeartHandshake, Globe2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachValues() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.values-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            if (cardsRef.current) {
                gsap.fromTo(cardsRef.current.children,
                    { opacity: 0, scale: 0.9, y: 20 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const valuesList = [
        { label: "Integrity", icon: ShieldCheck },
        { label: "Humility", icon: Sprout },
        { label: "Responsibility", icon: CheckCircle2 },
        { label: "Compassion", icon: HeartHandshake },
        { label: "Respect for others and the world around them", icon: Globe2 }
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">

                <div className="flex items-center justify-center gap-3 mb-6 values-text">
                    <Shield className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                    <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                        VALUES-DRIVEN EDUCATION
                    </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 values-text tracking-tight">
                    Strong character is at the <em className="italic text-[#3A53A4]">heart</em> of everything we do.
                </h2>

                <div className="w-16 h-[2px] bg-[#3A53A4] mb-10 values-text" />

                <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] mb-12 max-w-3xl values-text">
                    <p>
                        Through Islamic learning, community engagement, respectful relationships, and everyday interactions, students are encouraged to lead with:
                    </p>
                </div>

                <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-16 w-full">
                    {valuesList.map((value, index) => {
                        const isDark = index % 2 === 0;
                        return (
                            <div 
                                key={index} 
                                className={`group relative overflow-hidden rounded-[20px] px-6 py-4 md:px-8 md:py-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 md:gap-4 max-w-full ${
                                    isDark 
                                        ? 'bg-[#334a89]' 
                                        : 'bg-[#FFC51B]'
                                }`}
                            >
                                <value.icon 
                                    className={`absolute -bottom-6 -right-6 w-20 h-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 text-white/5`} 
                                    strokeWidth={1}
                                />
                                
                                <div className={`absolute top-3 right-3 w-3 h-3 border-t border-r pointer-events-none transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 border-white/20`} />

                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 shrink-0 bg-white/10 group-hover:bg-white/20`}>
                                    <value.icon className={`w-4 h-4 text-white`} strokeWidth={2} />
                                </div>
                                <span className={`relative z-10 font-['Quicksand'] font-bold text-base md:text-lg text-left text-white`}>
                                    {value.label}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <p className="font-['Quicksand'] italic font-medium text-xl md:text-2xl text-[#1c1c1c] leading-relaxed max-w-3xl values-text">
                    "We believe education should help children become not only successful individuals, but also thoughtful and ethical human beings."
                </p>

            </div>
        </section>
    )
}
