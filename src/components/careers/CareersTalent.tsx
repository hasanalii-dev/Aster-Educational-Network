import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CareersTalent() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.talent-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#f0ece6] relative">
            <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">

                <div className="flex items-center justify-center gap-3 mb-6 talent-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#3A53A4] w-5 h-5">
                        <rect x="4" y="14" width="6" height="6" rx="1" />
                        <rect x="4" y="4" width="6" height="6" rx="1" />
                        <rect x="14" y="14" width="6" height="6" rx="1" />
                        <rect x="14" y="4" width="6" height="6" rx="1" fill="#FFC51B" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                        DON'T SEE THE RIGHT ROLE?
                    </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 talent-text tracking-tight">
                    Join Our Talent <em className="italic text-[#3A53A4]">Network</em>
                </h2>

                <div className="w-16 h-[2px] bg-[#3A53A4] mb-10 talent-text" />

                <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] max-w-3xl flex flex-col gap-8">
                    <p className="talent-text">
                        We are always interested in connecting with exceptional individuals who align with our vision and values. If a suitable opportunity is not currently available, we encourage you to submit your profile for future consideration.
                    </p>
                    <p className="talent-text">
                        We regularly review applications as new positions become available across our campuses.
                    </p>
                </div>

                <div className="flex justify-center mt-12 talent-text">
                    <Link
                        to="#"
                        className="btn-aster btn-aster-blue rounded-full hover-shimmer relative overflow-hidden px-10 py-4 text-base"
                    >
                        Submit Your CV
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
