import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const measures = [
    'CCTV monitoring across key areas',
    'Visitor identification and check-in procedures',
    'Controlled campus access',
    'Supervised learning and activity spaces',
    'Clear arrival and dismissal protocols',
    'Parent notifications through school communication systems'
]

const physicalImages = [
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop'
]

export function SafeguardingPhysical() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % physicalImages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.phys-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.phys-bullet',
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: '.phys-bullets-grid', start: 'top 85%' }
                }
            )

            gsap.fromTo('.phys-img',
                { opacity: 0, scale: 1.1 },
                {
                    opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.phys-img-grid', start: 'top 80%' }
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
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#3A53A4] overflow-hidden relative">

            <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6 phys-header">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#FBBB21]">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                            </svg>
                            <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                                PHYSICAL SAFETY & SECURITY
                            </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-10 phys-header tracking-tight">
                            Protecting Children <em className="italic text-[#FBBB21]">Every Day</em>
                        </h2>

                        <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-white/90 leading-relaxed mb-10 phys-header">
                            The safety of our students is supported through a range of measures across our campuses, including:
                        </p>

                        <div className="phys-bullets-grid grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                            {measures.map((measure, i) => (
                                <div key={i} className="flex items-start gap-3 phys-bullet group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FBBB21] flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-['Quicksand'] font-medium text-base text-white/90 group-hover:text-white transition-colors">{measure}</span>
                                </div>
                            ))}
                        </div>

                        <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-[#FBBB21] leading-relaxed phys-header">
                            These measures help ensure that students remain safe, supported, and accounted for throughout the school day.
                        </p>
                    </div>

                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 phys-img">
                        <div className="relative h-[500px] md:h-[680px] w-full rounded-none shadow-none overflow-hidden bg-[#15283D]">
                            {physicalImages.map((src, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${activeIndex === idx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110 pointer-events-none'}`}
                                >
                                    <img
                                        src={src}
                                        alt={`Campus Security ${idx + 1}`}
                                        className="parallax-img w-full h-full object-cover opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A53A4]/60 via-[#3A53A4]/20 to-transparent mix-blend-multiply pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
