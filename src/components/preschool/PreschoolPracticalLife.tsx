import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hand, Brain, Move, ShieldCheck, Shirt, TreePine } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolPracticalLife() {
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
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
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

    const skills = [
        { label: 'Responsibility', icon: ShieldCheck },
        { label: 'Concentration', icon: Brain },
        { label: 'Coordination', icon: Move },
        { label: 'Confidence', icon: Hand },
        { label: 'Self-care', icon: Shirt },
        { label: 'Care for their environment', icon: TreePine },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#334a89] select-none overflow-hidden rounded-t-[60px] md:rounded-t-[120px] rounded-b-none border-t border-[#e97f7b]/10">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">

                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Hand className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#ffc715] uppercase mt-0.5">
                            PRACTICAL LIFE & INDEPENDENCE
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white leading-[1.05] mb-8">
                        Building <em className="font-medium italic text-[#ffc715]">Independence</em> Through Everyday Skills
                    </h2>

                    <div className="w-16 h-[2px] bg-[#ffc715] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-white/80 space-y-6 leading-[1.65] font-medium">
                        <p>
                            One of the most important goals of the Early Years is helping children become independent.
                        </p>
                        <p className="text-[#ffc715] font-bold text-xl pt-4">
                            Through Practical Life activities, children learn everyday skills that build:
                        </p>
                    </div>
                </div>

                {/* Skill badges */}
                <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-16 w-full max-w-4xl">
                    {skills.map((skill, index) => {
                        const isYellow = index % 2 !== 0
                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-[20px] px-6 py-4 md:px-8 md:py-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 md:gap-4 max-w-full ${
                                    isYellow ? 'bg-[#FFC51B]' : 'bg-white'
                                }`}
                            >
                                <skill.icon
                                    className="absolute -bottom-6 -right-6 w-20 h-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 text-[#334a89]/5"
                                    strokeWidth={1}
                                />
                                <div className={`absolute top-3 right-3 w-3 h-3 border-t border-r pointer-events-none transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isYellow ? 'border-white/40' : 'border-[#334a89]/20'}`} />
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 shrink-0 ${isYellow ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#334a89]/10 group-hover:bg-[#334a89]/20'}`}>
                                    <skill.icon className={`w-4 h-4 ${isYellow ? 'text-white' : 'text-[#334a89]'}`} strokeWidth={2} />
                                </div>
                                <span className={`relative z-10 font-['Quicksand'] font-bold text-base md:text-lg text-left ${isYellow ? 'text-white' : 'text-[#334a89]'}`}>
                                    {skill.label}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div ref={footerRef} className="text-center max-w-3xl mx-auto">
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#ffc715] leading-snug">
                        These seemingly simple experiences play a powerful role in developing self-belief and preparing children to navigate the world with confidence.
                    </p>
                </div>

            </div>
        </section>
    )
}
