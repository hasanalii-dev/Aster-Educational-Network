import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CampusesInternational() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.international-content > *',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            )
            
            gsap.fromTo('.international-bg',
                { scale: 1.1 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden bg-[#1a2347]">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full international-bg pointer-events-none">
                <video 
                    src="https://alpha.edu.pk/img/hero.mp4" 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-45 filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2347]/90 via-[#1a2347]/70 to-transparent" />
            </div>

            <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10 flex">
                <div className="w-full lg:w-1/2 international-content">
                    <div className="flex items-center gap-3 mb-6">
                        <svg className="w-4 h-4 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase mt-0.5">
                            ASTER INTERNATIONAL
                        </span>
                    </div>
                    
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white mb-8 leading-[1.1]">
                        Expanding Our Vision Beyond Borders
                    </h2>
                    
                    <div className="font-['Quicksand'] font-medium text-lg text-white/80 leading-relaxed mb-10 flex flex-col gap-6">
                        <p>
                            What began as a vision in Karachi continues to grow. As part of our commitment to delivering meaningful, future-focused education, The Aster School is expanding internationally with the launch of our Riyadh campus in the Kingdom of Saudi Arabia.
                        </p>
                        <p>
                            This milestone reflects our belief that every child deserves an education that nurtures curiosity, develops character, inspires leadership, and prepares them to thrive in an ever-changing world.
                        </p>
                    </div>

                    <div className="p-8 border-l-2 border-[#ffc715] bg-white/5 backdrop-blur-sm">
                        <p className="font-['Quicksand'] font-bold text-xl text-white leading-snug">
                            While our footprint continues to grow, our purpose remains the same:<br/>
                            <span className="text-[#ffc715]">To develop individuals who transform the world through excellence-driven leadership that uplifts humanity.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
