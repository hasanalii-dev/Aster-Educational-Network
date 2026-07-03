import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const qualities = [
    'Care deeply about children and their development',
    'Believe in excellence and continuous improvement',
    'Lead with integrity and professionalism',
    'Embrace innovation and new ideas',
    'Value collaboration and teamwork',
    'Demonstrate resilience and adaptability',
    'Build positive relationships with students, families, and colleagues',
    'Approach challenges with a solution-oriented mindset',
]

export function CareersQualities() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.qual-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.qual-card',
                { opacity: 0, y: 20, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
                    scrollTrigger: { trigger: '.qual-card', start: 'top 90%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">

                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6 qual-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#3A53A4] w-5 h-5">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="#FFC51B" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            WHO THRIVES AT ASTER?
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-6 qual-text tracking-tight">
                        The Qualities We <em className="italic text-[#3A53A4]">Value</em>
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed max-w-2xl mx-auto qual-text">
                        While every role is unique, the people who thrive at Aster often share common qualities.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {qualities.map((q, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                className={`qual-card group bg-white border border-gray-100 p-6 transition-all duration-300 cursor-default ${
                                    isEven ? 'hover:bg-[#FBBB21] hover:border-[#FBBB21]' : 'hover:bg-[#334a89] hover:border-[#334a89]'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
                                    isEven ? 'bg-[#334a89]/10 group-hover:bg-white/40' : 'bg-[#FBBB21]/20 group-hover:bg-white/20'
                                }`}>
                                    <span className={`font-['Quicksand'] font-black text-sm transition-colors duration-300 ${
                                        isEven ? 'text-[#334a89] group-hover:text-[#334a89]' : 'text-[#FBBB21] group-hover:text-white'
                                    }`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className={`font-['Quicksand'] font-medium text-[#1c1c1c] transition-colors duration-300 leading-relaxed ${
                                    isEven ? 'group-hover:text-[#334a89]' : 'group-hover:text-white'
                                }`}>
                                    {q}
                                </p>
                            </div>
                        )
                    })}
                </div>

                <p className="font-['Quicksand'] italic font-medium text-2xl md:text-3xl text-[#3A53A4] text-center mt-16 qual-text">
                    Most importantly, they believe education can change lives.
                </p>
            </div>
        </section>
    )
}
