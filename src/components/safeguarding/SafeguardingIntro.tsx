import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.intro-text span',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
            gsap.fromTo('.intro-body',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.3,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#fbfaf8] px-6 md:px-12">
            <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-10">
                    <svg className="w-4 h-4 text-[#FBBB21]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#3A53A4] uppercase mt-0.5 intro-text">
                        <span>OUR</span> <span>CULTURE</span>
                    </span>
                </div>
                
                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl text-[#1c1c1c] leading-[1.2] mb-12">
                    <span className="intro-text inline-block mr-3"><span>At</span> <span>The</span> <span>Aster</span> <span>School,</span></span>
                    <span className="intro-text inline-block mr-3"><span>the</span> <span>safety,</span> <span>wellbeing,</span></span>
                    <span className="intro-text inline-block mr-3"><span>and</span> <span>protection</span> <span>of</span></span>
                    <span className="intro-text inline-block text-[#3A53A4]"><span>every</span> <span>child</span> <span>is</span> <span>our</span> <span>highest</span> <span>priority.</span></span>
                </h2>

                <div className="intro-body max-w-[800px] font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed flex flex-col gap-6">
                    <p>
                        We believe children learn best when they feel secure, respected, supported, and cared for. Safeguarding is therefore not a policy that exists on paper alone, it is embedded into our culture, practices, and daily interactions.
                    </p>
                    <p>
                        Every member of our community shares a responsibility to help create an environment where children can learn, grow, and thrive with confidence.
                    </p>
                </div>
            </div>
        </section>
    )
}
