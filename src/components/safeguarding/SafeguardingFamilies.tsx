import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingFamilies() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.family-img',
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.family-text',
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const parallaxImages = sectionRef.current?.querySelectorAll('.parallax-img')
            if (parallaxImages && parallaxImages.length > 0) {
                gsap.fromTo(
                    parallaxImages,
                    { yPercent: -12, scale: 1.1 },
                    {
                        yPercent: 12,
                        scale: 1.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#3A53A4] relative">
            
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 family-img">
                    <div className="relative h-[500px] md:h-[680px] w-full rounded-none shadow-none overflow-hidden bg-gray-50">
                        <img 
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/v1783262066/493802865_1231231339010467_6402077431719669692_n_m0lqkw.jpg" 
                            alt="Working in Partnership with Families" 
                            className="parallax-img w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 family-text">
                        <Users className="w-6 h-6 text-[#FBBB21]" fill="currentColor" strokeWidth={1} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                            WORKING IN PARTNERSHIP
                        </span>
                    </div>
                    
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-10 family-text">
                        A Shared Responsibility
                    </h2>
                    
                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-white/90 leading-relaxed flex flex-col gap-6 family-text">
                        <p>
                            Safeguarding is most effective when schools and families work together.
                        </p>
                        <p>
                            We believe open communication, trust, and collaboration are essential to supporting children's wellbeing and development. Parents are encouraged to maintain regular communication with the school and work alongside educators to ensure the best outcomes for every child.
                        </p>
                        <p className="font-bold text-[#FBBB21]">
                            Together, we create a community where children feel safe, supported, and empowered to succeed.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
