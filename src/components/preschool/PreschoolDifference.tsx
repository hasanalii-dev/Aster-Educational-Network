import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Award, MessageCircle, Heart, Mountain, BookOpen } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolDifference() {
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
                        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
                    }
                )
            }

            if (footerRef.current) {
                const words = gsap.utils.toArray<HTMLElement>(footerRef.current.querySelectorAll('.gsap-diff-word'))
                if (words.length > 0) {
                    gsap.fromTo(
                        words,
                        { opacity: 0, y: 10 },
                        {
                            opacity: 1, y: 0, stagger: 0.05, ease: 'power2.out', duration: 0.6,
                            scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
                        }
                    )
                }
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const cardsData = [
        { text: 'Think independently', icon: Brain, isDark: true },
        { text: 'Learn confidently', icon: Award, isDark: false },
        { text: 'Express themselves clearly', icon: MessageCircle, isDark: true },
        { text: 'Show kindness and respect', icon: Heart, isDark: false },
        { text: 'Approach challenges with resilience', icon: Mountain, isDark: true },
        { text: 'Develop a lifelong love for learning', icon: BookOpen, isDark: false },
    ]

    const footerText = "Because when children are given the right environment, they discover just how capable they are."

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden select-none rounded-t-[60px] md:rounded-t-[120px] rounded-b-none">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center">

                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <Award className="w-5 h-5 text-[#FFC51B] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5 text-left md:text-center">
                            THE ASTER DIFFERENCE
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#334a89] leading-[1.05] mb-8">
                        Nurturing Children Who <em className="font-medium italic text-[#FFC51B]">Thrive</em>
                    </h2>

                    <div className="w-16 h-[2px] bg-[#FFC51B] mb-10" />

                    <p className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] leading-[1.65] font-medium max-w-3xl">
                        Our goal is not simply to prepare children for the next grade. It is to nurture children who:
                    </p>
                </div>

                <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-5xl mb-20">
                    {cardsData.map((card, i) => (
                        <div
                            key={i}
                            className={`group relative p-6 md:p-8 flex flex-col items-center justify-center text-center w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] min-h-[160px] md:min-h-[200px] rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                                card.isDark
                                    ? 'bg-[#334a89] shadow-[0_8px_24px_rgba(51,74,137,0.15)] hover:shadow-[0_20px_40px_rgba(51,74,137,0.3)]'
                                    : 'bg-[#FFC51B] shadow-[0_8px_24px_rgba(255,197,27,0.15)] hover:shadow-[0_20px_40px_rgba(255,197,27,0.3)]'
                            }`}
                        >
                            <card.icon
                                className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 text-white/5"
                                strokeWidth={1}
                            />
                            <div className="absolute top-6 right-6 w-5 h-5 border-t-[1.5px] border-r-[1.5px] pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 border-white/20" />
                            <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 bg-white/10 group-hover:bg-white/20">
                                <card.icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                            </div>
                            <h4 className="relative z-10 font-['Quicksand'] text-lg md:text-xl font-bold leading-tight tracking-tight text-white">
                                {card.text}
                            </h4>
                        </div>
                    ))}
                </div>

                <div ref={footerRef} className="relative w-full max-w-4xl mx-auto bg-white rounded-[40px] p-10 md:p-14 shadow-[0_20px_50px_rgba(51,74,137,0.08)] border border-[#334a89]/5 text-center">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFC51B] rounded-full flex items-center justify-center shadow-lg border-4 border-[#FAFAFA]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                    </div>
                    <p className="font-['Quicksand'] font-bold text-[#334a89] text-xl md:text-2xl lg:text-3xl leading-[1.5]">
                        {footerText.split(' ').map((word, i) => (
                            <span key={i} className="gsap-diff-word inline-block mr-[0.25em] will-change-transform">{word}</span>
                        ))}
                    </p>
                </div>

            </div>
        </section>
    )
}
