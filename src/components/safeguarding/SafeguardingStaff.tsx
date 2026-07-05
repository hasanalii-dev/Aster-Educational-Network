import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingStaff() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.staff-img',
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.staff-text',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.staff-commitment',
                { opacity: 0, scale: 0.95, y: 20 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
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
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#fbfaf8] relative">
            
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 staff-text">
                        <GraduationCap className="w-6 h-6 text-[#3A53A4]" fill="currentColor" strokeWidth={1} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#FBBB21] uppercase mt-1">
                            TRAINED & RESPONSIBLE STAFF
                        </span>
                    </div>
                    
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#334a89] leading-[1.1] mb-10 staff-text">
                        Safeguarding Is Everyone's Responsibility
                    </h2>
                    
                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed flex flex-col gap-6">
                        <p className="staff-text">
                            All staff members play an active role in safeguarding and child protection. Our team receives rigorous training and follows established procedures to ensure concerns are recognised and addressed.
                        </p>
                        <p className="staff-text">
                            The school also maintains designated safeguarding leadership to oversee safeguarding practices and support the wellbeing of students across our campuses.
                        </p>
                        <p className="font-bold text-[#3A53A4] text-xl md:text-2xl mt-4 staff-commitment">
                            We are committed to maintaining a culture of vigilance, accountability, and care.
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="w-full lg:w-1/2 staff-img">
                    <div className="relative h-[500px] md:h-[680px] w-full rounded-none shadow-none overflow-hidden bg-gray-50">
                        <img 
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/v1783261994/1000555027_mulx0h.jpg" 
                            alt="Our Responsible Staff" 
                            className="parallax-img w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
