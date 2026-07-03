import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Flag, ShieldCheck, HeartHandshake, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const traits = [
    { title: 'Excellence with Purpose', bg: '#FBBB21', Icon: Award },
    { title: 'Leadership for Impact', bg: '#3A53A4', Icon: Flag },
    { title: 'Integrity', bg: '#FBBB21', Icon: ShieldCheck },
    { title: 'Compassion and Service', bg: '#3A53A4', Icon: HeartHandshake },
    { title: 'Innovation and Lifelong Learning', bg: '#FBBB21', Icon: Lightbulb }
]

export function CampusesExperience() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.experience-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
                    scrollTrigger: { trigger: '.experience-header', start: 'top 85%' }
                }
            )

            gsap.fromTo('.trait-item',
                { opacity: 0, scale: 0.95, y: 20 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)',
                    scrollTrigger: { trigger: '.traits-grid', start: 'top 85%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-white px-6 md:px-12 relative">
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-15deg); }
                    100% { transform: translateX(300%) skewX(-15deg); }
                }
                .hover-shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
                    transform: translateX(-150%) skewX(-15deg);
                    pointer-events: none;
                    z-index: 20;
                }
                .hover-shimmer:hover::after {
                    animation: shimmer 1.2s infinite;
                }
            `}</style>
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">
                <div className="experience-header text-center max-w-4xl mb-20">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <svg className="w-4 h-4 text-[#FBBB21]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#3A53A4] uppercase mt-0.5">
                            SHARED PHILOSOPHY
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#1c1c1c] mb-8 leading-[1.1]">
                        The Aster Experience Across Every Campus
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed">
                        No matter which campus a child attends, every Aster student benefits from a shared educational philosophy rooted in these core principles.
                    </p>
                </div>

                <div className="traits-grid flex flex-wrap justify-center gap-4 md:gap-6 mb-20">
                    {traits.map((trait, i) => (
                        <div 
                            key={i} 
                            className="trait-item hover-shimmer relative overflow-hidden rounded-full px-6 py-3 md:px-8 md:py-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 group cursor-pointer"
                            style={{ backgroundColor: trait.bg }}
                        >
                            <trait.Icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-['Quicksand'] font-bold text-white text-sm md:text-base uppercase tracking-wider relative z-10">
                                {trait.title}
                            </span>
                            
                            {/* Decorative Corner Accent */}
                            <div className="absolute top-2 right-4 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M4 4h16v16" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl text-center">
                    <p className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed mb-6">
                        Across every classroom, activity, and experience, students are encouraged to think independently, act responsibly, contribute positively, and pursue their full potential.
                    </p>
                    <p className="font-['Quicksand'] font-medium text-xl md:text-2xl text-[#1c1c1c] leading-relaxed italic">
                        At Aster, education is about more than academic success. It is about shaping confident individuals who are prepared to make a meaningful difference in the world.
                    </p>
                </div>
            </div>
        </section>
    )
}
