import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UsersRound } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachPartnership() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.partner-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const visualContainer = sectionRef.current?.querySelector('.visual-container')
            if (visualContainer) {
                gsap.fromTo(visualContainer,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                    }
                )
            }

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
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] relative overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 partner-text">
                        <UsersRound className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            A PARTNERSHIP WITH FAMILIES
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 partner-text tracking-tight">
                        Schools and families working <em className="italic text-[#3A53A4]">together.</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] flex flex-col gap-6">
                        <p className="partner-text">
                            We believe children thrive when schools and families work together with trust, consistency, and shared purpose.
                        </p>
                        <p className="partner-text">
                            At Aster, parents are active partners in the learning journey through communication, collaboration, workshops, events, and shared experiences that support each child’s growth both inside and outside the classroom.
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                    <div className="visual-container relative h-[500px] md:h-[650px] w-full overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
                            alt="Family and teacher partnership"
                            className="parallax-img w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
