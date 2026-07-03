import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CareersCommunity() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.community-text',
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
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

                {/* Visual Side */}
                <div className="w-full lg:w-1/2 community-text">
                    <div className="relative h-[500px] md:h-[680px] w-full overflow-hidden bg-gray-50">
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=1200&auto=format&fit=crop"
                            alt="Growing Aster community"
                            className="parallax-img w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 community-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#FBBB21] w-5 h-5">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="white" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                            JOIN A GROWING EDUCATIONAL COMMUNITY
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-10 community-text tracking-tight">
                        Be Part of Something <em className="italic text-[#FBBB21]">Meaningful</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-white/90 leading-relaxed flex flex-col gap-6">
                        <p className="community-text">
                            Since opening our doors in 2019, The Aster School has grown into a thriving educational community serving families across multiple campuses, with expansion into Riyadh, Saudi Arabia.
                        </p>
                        <p className="community-text">
                            As we continue to grow, we are always looking for talented individuals who share our commitment to meaningful education and student success.
                        </p>
                        <p className="community-text">
                            Whether you are an experienced educator, an aspiring teacher, a specialist, a coach, or a professional working behind the scenes, there may be a place for you within the Aster community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
