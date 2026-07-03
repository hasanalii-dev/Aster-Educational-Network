import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CareersIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.careers-intro-text',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative">
            <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
                <p className="font-['Quicksand'] font-medium text-lg md:text-xl lg:text-[22px] text-[#5C5C61] leading-[1.75] careers-intro-text">
                    At The Aster School, we believe education has the power to shape individuals, transform communities, and create a better future.
                </p>
                <p className="font-['Quicksand'] font-medium text-lg md:text-xl lg:text-[22px] text-[#5C5C61] leading-[1.75] mt-8 careers-intro-text">
                    Every day, our educators, leaders, and team members play a role in helping children discover their strengths, develop confidence, build character, and realize their potential.
                </p>
                <p className="font-['Quicksand'] font-bold text-lg md:text-xl lg:text-[22px] text-[#3A53A4] leading-[1.75] mt-8 careers-intro-text">
                    If you are passionate about meaningful education, lifelong learning, and making a lasting impact, we invite you to explore opportunities with us.
                </p>
            </div>
        </section>
    )
}
