import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CampusesIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.campuses-intro-content',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.campuses-intro-content',
                        start: 'top 85%'
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-[#fbfaf8] px-6 md:px-12">
            <div className="max-w-[1000px] mx-auto text-center campuses-intro-content flex flex-col items-center">
                <p className="font-['Quicksand'] text-lg md:text-xl text-[#5C5C61] leading-relaxed max-w-4xl mb-16">
                    Since opening our doors in 2019, The Aster School has grown into a thriving learning community committed to developing confident learners, compassionate leaders, and future-ready individuals.
                    Today, our campuses across Karachi serve students at different stages of their educational journey, while our expansion into Riyadh reflects a growing vision to bring meaningful, child-centered education to families beyond Pakistan.
                    While each campus has its own identity, every Aster student experiences the same commitment to excellence, resilience, humility, innovation, and purposeful learning.
                </p>

                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-4 h-4 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#394EA2] uppercase mt-0.5">
                        FIND THE RIGHT CAMPUS FOR YOUR CHILD
                    </span>
                </div>
                
                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-[#334a89] leading-[1.2] max-w-3xl mb-8">
                    Every stage of childhood brings unique opportunities for growth.
                </h2>
                
                <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] max-w-2xl leading-relaxed">
                    Our campuses are thoughtfully designed to support students through each phase of their educational journey, providing age-appropriate learning environments, experiences, and opportunities that help children thrive academically, socially, emotionally, and personally.
                </p>
            </div>
        </section>
    )
}
