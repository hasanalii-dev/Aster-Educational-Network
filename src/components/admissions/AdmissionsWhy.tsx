import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BookOpen, Cpu, Users, Heart, Trophy, Lightbulb, Handshake } from 'lucide-react'

export function AdmissionsWhy() {
    const points = [
        { text: "Academic excellence", icon: BookOpen },
        { text: "Future-ready learning", icon: Cpu },
        { text: "Leadership opportunities", icon: Users },
        { text: "Strong values and character development", icon: Heart },
        { text: "Sports and co-curricular excellence", icon: Trophy },
        { text: "Innovation and creativity", icon: Lightbulb },
        { text: "Meaningful school-family partnerships", icon: Handshake }
    ]

    const quoteRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animate quote immediately on mount (not scroll based)
        const ctx = gsap.context(() => {
            gsap.fromTo('.quote-word', 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
            )
        }, quoteRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="bg-[#F8F9FA] py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 text-center">
                
                <div className="gsap-fade max-w-3xl mx-auto mb-16">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#394EA2] uppercase mb-4 block">
                        Why Families Choose Aster
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight mb-6">
                        More than a traditional school experience.
                    </h2>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed">
                        Families choose a learning environment that combines exactly what their child needs to succeed in the modern world.
                    </p>
                </div>

                <div className="gsap-fade flex flex-wrap justify-center gap-6 text-left mb-20 max-w-5xl mx-auto">
                    {points.map((point, i) => {
                        const isYellow = i % 2 === 0
                        const bgColor = isYellow ? 'bg-[#ffc715]' : 'bg-[#334a89]'
                        const Icon = point.icon
                        
                        return (
                            <div 
                                key={i} 
                                className={`group relative p-6 md:p-8 flex flex-col justify-center min-h-[160px] md:min-h-[180px] w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-[20px] md:rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${bgColor}`}
                            >
                                {/* Watermark Icon */}
                                <Icon 
                                    className={`absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6 ${isYellow ? 'text-white/20' : 'text-white/5'}`}
                                    strokeWidth={1}
                                />

                                {/* Corner Bracket */}
                                <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 pointer-events-none border-white/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                                <h3 className="relative z-10 font-['Quicksand'] text-xl md:text-2xl font-bold leading-tight tracking-tight text-white pr-4">
                                    {point.text}
                                </h3>
                            </div>
                        )
                    })}
                </div>

                <div ref={quoteRef} className="max-w-4xl mx-auto bg-[#394EA2] p-10 md:p-14 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc715] rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <p className="font-['Quicksand'] text-2xl md:text-3xl font-medium leading-relaxed relative z-10 text-center">
                        {"Most importantly, they choose a school that sees the potential within every child and is committed to helping them grow into confident, capable, and compassionate individuals.".split(' ').map((word, i) => (
                            <span key={i} className="quote-word inline-block mr-[0.25em] opacity-0 will-change-transform">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>

            </div>
        </section>
    )
}
