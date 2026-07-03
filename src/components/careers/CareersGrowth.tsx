import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const growthItems = [
    'Pursue professional development',
    'Explore innovative approaches to learning',
    'Collaborate with colleagues',
    'Take initiative and ownership',
    'Contribute ideas and solutions',
    'Grow as leaders within their field',
]

export function CareersGrowth() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.growth-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.growth-item',
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: '.growth-item', start: 'top 85%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FBBB21] relative overflow-hidden selection:bg-[#334a89] selection:text-white">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 growth-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#334a89] w-5 h-5">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="white" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#334a89] uppercase mt-1">
                            A CULTURE OF GROWTH
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-10 growth-text tracking-tight">
                        Learn, Improve <br className="hidden md:block" />&amp; <em className="italic text-[#334a89]">Lead</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-white leading-relaxed flex flex-col gap-6">
                        <p className="growth-text">
                            At Aster, learning is not limited to students. We believe the best educators and professionals are lifelong learners who continuously seek opportunities to grow, reflect, and improve.
                        </p>
                    </div>
                </div>

                {/* List Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <p className="font-['Quicksand'] font-bold text-lg text-[#334a89] mb-8 growth-text">
                        Our team members are encouraged to:
                    </p>
                    <ul className="flex flex-col gap-5">
                        {growthItems.map((item, i) => (
                            <li key={i} className="growth-item flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#334a89] flex-shrink-0 flex items-center justify-center mt-0.5">
                                    <svg className="w-4 h-4 text-[#FBBB21]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#334a89]">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-white mt-10 growth-text">
                        As Aster continues to expand both locally and internationally, we remain committed to developing people who are prepared to lead the future of education.
                    </p>
                </div>
            </div>
        </section>
    )
}
