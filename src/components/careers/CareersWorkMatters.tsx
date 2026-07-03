import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CareersWorkMatters() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.work-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const parallaxImg = sectionRef.current?.querySelector('.parallax-img')
            if (parallaxImg) {
                gsap.fromTo(parallaxImg,
                    { yPercent: -12, scale: 1.1 },
                    {
                        yPercent: 12, scale: 1.1, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#334a89] relative overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 work-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#FBBB21] w-5 h-5">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="white" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                            MORE THAN A JOB
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-10 work-text tracking-tight">
                        Work That <em className="italic text-[#FBBB21]">Matters</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-white/90 leading-relaxed flex flex-col gap-6">
                        <p className="work-text">
                            Education is one of the few professions where the impact of your work extends far beyond the classroom. Whether you are teaching a lesson, coaching a sports team, supporting a family, designing learning experiences, or helping school operations run smoothly, your work contributes to shape the lives of young people.
                        </p>
                        <p className="font-bold text-[#FBBB21] text-xl md:text-2xl mt-4 work-text">
                            At Aster, every role matters because every role contributes to a child's journey.
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="w-full lg:w-1/2 work-text">
                    <div className="relative h-[500px] md:h-[680px] w-full overflow-hidden bg-gray-50">
                        <img
                            src="https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1200&auto=format&fit=crop"
                            alt="Aster educators"
                            className="parallax-img w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
