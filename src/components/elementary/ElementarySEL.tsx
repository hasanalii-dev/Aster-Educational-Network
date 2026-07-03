import { useEffect, useRef } from 'react'
import { Heart, ShieldCheck, Users, HandHeart, Smile, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementarySEL() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>('.gsap-stagger-item')
            if (items.length > 0) {
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }

            if (cardsRef.current) {
                const cards = cardsRef.current.children
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const skills = [
        { label: 'Self-awareness', icon: Smile },
        { label: 'Confidence', icon: ShieldCheck },
        { label: 'Empathy', icon: Heart },
        { label: 'Emotional resilience', icon: HandHeart },
        { label: 'Positive communication', icon: MessageCircle },
        { label: 'Collaboration', icon: Users },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#334a89] select-none overflow-hidden">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">
                
                {/* Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mb-16">
                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <Heart className="w-5 h-5 text-[#ffc715]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#ffc715] uppercase mt-0.5">
                            SOCIAL & EMOTIONAL LEARNING
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white mb-8 leading-[1.05]">
                        Growing with Confidence, Empathy & <em className="font-medium italic text-[#ffc715]">Self-Awareness</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10" />

                    <p className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-white/90 leading-[1.65] font-medium">
                        Academic growth is most meaningful when children feel confident, connected, and emotionally secure. Through Social Emotional Learning, students develop the ability to understand themselves, manage emotions, build healthy relationships, and make responsible decisions.
                    </p>
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
                                    className={`absolute -bottom-6 -right-6 w-20 h-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${isYellow ? 'text-white/10' : 'text-[#334a89]/5'}`}
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

                <div className="gsap-stagger-item max-w-3xl text-center">
                    <p className="font-['Quicksand'] text-lg md:text-xl text-white font-bold">
                        By developing emotional intelligence alongside academics, students are better equipped to navigate challenges, relationships, and opportunities throughout life.
                    </p>
                </div>
            </div>
        </section>
    )
}
