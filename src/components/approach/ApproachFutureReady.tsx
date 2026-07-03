import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flag, MessageSquare, Lightbulb, Target, RefreshCw, MonitorSmartphone, Heart, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachFutureReady() {
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
                        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
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

    const cardsData = [
        { text: 'Leadership', icon: Flag, isDark: true },
        { text: 'Communication', icon: MessageSquare, isDark: false },
        { text: 'Creativity', icon: Lightbulb, isDark: true },
        { text: 'Problem-solving', icon: Target, isDark: false },
        { text: 'Adaptability', icon: RefreshCw, isDark: true },
        { text: 'Technological fluency', icon: MonitorSmartphone, isDark: false },
        { text: 'Emotional intelligence', icon: Heart, isDark: true }
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden select-none rounded-t-[60px] md:rounded-t-[120px] rounded-b-none">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center">

                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5">
                            FUTURE-READY EDUCATION
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#334a89] leading-[1.05] mb-8">
                        Beyond <em className="font-medium italic text-[#FFC51B]">Academic</em> Knowledge
                    </h2>

                    <div className="w-16 h-[2px] bg-[#FFC51B] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] space-y-6 leading-[1.65] font-medium">
                        <p>
                            The world our children are growing into requires far more than academic knowledge.
                        </p>
                        <p className="text-[#334a89] font-bold text-xl pt-4">
                            At Aster, students are intentionally exposed to opportunities that develop:
                        </p>
                    </div>
                </div>

                <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-5xl">
                    {cardsData.map((card, i) => (
                        <div
                            key={i}
                            className={`group relative p-6 md:p-8 flex flex-col items-center justify-center text-center w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] min-h-[160px] md:min-h-[200px] rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                                card.isDark 
                                    ? 'bg-[#334a89] shadow-[0_8px_24px_rgba(51,74,137,0.15)] hover:shadow-[0_20px_40px_rgba(51,74,137,0.3)]' 
                                    : 'bg-[#FFC51B] shadow-[0_8px_24px_rgba(255,197,27,0.15)] hover:shadow-[0_20px_40px_rgba(255,197,27,0.3)]'
                            }`}
                        >
                            <card.icon 
                                className={`absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 text-white/5`} 
                                strokeWidth={1}
                            />
                            
                            <div className={`absolute top-6 right-6 w-5 h-5 border-t-[1.5px] border-r-[1.5px] pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 border-white/20`} />

                            <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 bg-white/10 group-hover:bg-white/20`}>
                                <card.icon className={`w-6 h-6 md:w-8 md:h-8 text-white`} strokeWidth={1.5} />
                            </div>
                            
                            <h4 className={`relative z-10 font-['Quicksand'] text-lg md:text-xl font-bold leading-tight tracking-tight text-white`}>
                                {card.text}
                            </h4>
                        </div>
                    ))}
                </div>

                <div ref={footerRef} className="mt-24 text-center max-w-4xl mx-auto font-['Quicksand'] text-lg md:text-xl lg:text-2xl text-[#5C5C61] font-medium leading-[1.65]">
                    <p>
                        Through robotics, digital literacy, entrepreneurship, presentations, collaboration, and experiential learning, students gradually build the confidence and skills needed for the future.
                    </p>
                </div>

            </div>
        </section>
    )
}
