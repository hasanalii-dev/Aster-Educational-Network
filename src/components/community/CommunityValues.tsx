import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityValues() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.values-intro',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#050B14] text-white px-6 md:px-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#334a89] rounded-full mix-blend-screen filter blur-[200px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ffc715] rounded-full mix-blend-screen filter blur-[150px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-10 values-intro">
                    <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase mt-0.5">
                        A COMMUNITY BUILT ON SHARED VALUES
                    </span>
                </div>
                
                <h2 className="values-intro font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-12 !text-white">
                    Growing Together with <span className="text-[#ffc715] italic">Purpose</span>
                </h2>

                <div className="values-body max-w-[800px] font-['Quicksand'] font-medium text-lg md:text-xl text-white/80 leading-relaxed flex flex-col gap-8">
                    <p>
                        The Aster community is united by a shared commitment to raising children who are confident, compassionate, resilient, and purposeful.
                    </p>
                    <p>
                        Together, we celebrate successes, navigate challenges, support one another, and contribute to a culture built on trust, respect, and meaningful relationships.
                    </p>
                    <p className="text-[#ffc715] font-bold">
                        This sense of belonging is one of the reasons families remain connected to Aster long after their children graduate from a particular classroom or campus.
                    </p>
                </div>
            </div>
        </section>
    )
}
