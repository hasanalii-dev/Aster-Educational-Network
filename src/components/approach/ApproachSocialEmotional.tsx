import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachSocialEmotional() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.social-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const visualContainer = sectionRef.current?.querySelector('.visual-container')
            if (visualContainer) {
                gsap.fromTo(visualContainer,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                    }
                )
            }

            const listItems = sectionRef.current?.querySelectorAll('.social-list-item')
            if (listItems && listItems.length > 0) {
                gsap.fromTo(listItems,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                        scrollTrigger: { trigger: '.social-list-item', start: 'top 85%' }
                    }
                )
            }
            
            const parallaxImg = sectionRef.current?.querySelector('.parallax-img')
            if (parallaxImg) {
                gsap.fromTo(parallaxImg,
                    { yPercent: -10, scale: 1.1 },
                    {
                        yPercent: 10, scale: 1.1, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const points = [
        "Self-awareness",
        "Confidence",
        "Empathy",
        "Positive relationships",
        "Emotional regulation",
        "Responsible decision-making"
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#334a89] relative overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 social-text">
                        <Heart className="w-5 h-5 text-[#FBBB21]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                            SOCIAL & EMOTIONAL DEVELOPMENT
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-8 social-text tracking-tight">
                        Emotional well-being is deeply connected to <em className="italic text-[#FBBB21]">meaningful learning.</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-white/90 leading-relaxed flex flex-col gap-6">
                        <p className="social-text">
                            Our approach intentionally supports students in developing:
                        </p>
                        
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-2 mb-6">
                            {points.map((point, index) => (
                                <li key={index} className="social-list-item flex items-start gap-3">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[#FBBB21] flex-shrink-0" />
                                    <span className="font-bold text-white tracking-wide">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="social-text font-bold text-[#FBBB21] text-xl mt-2">
                            By nurturing emotional intelligence alongside academics, we help students grow into grounded, resilient, and compassionate individuals.
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                    <div className="visual-container relative h-[500px] md:h-[700px] w-full overflow-hidden bg-gray-50">
                        <img
                            src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop"
                            alt="Students collaborating and smiling"
                            className="parallax-img w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#334a89]/20 mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
