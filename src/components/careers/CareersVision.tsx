import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CareersVision() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.vision-text',
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
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">

                <div className="flex items-center justify-center gap-3 mb-6 vision-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#3A53A4] w-5 h-5">
                        <rect x="4" y="14" width="6" height="6" rx="1" />
                        <rect x="4" y="4" width="6" height="6" rx="1" />
                        <rect x="14" y="14" width="6" height="6" rx="1" />
                        <rect x="14" y="4" width="6" height="6" rx="1" fill="#FFC51B" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                        A SHARED PURPOSE
                    </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 vision-text tracking-tight">
                    United by a Common <em className="italic text-[#3A53A4]">Vision</em>
                </h2>

                <div className="w-16 h-[2px] bg-[#3A53A4] mb-10 vision-text" />

                <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] max-w-3xl flex flex-col gap-8">
                    <p className="vision-text">
                        Our vision is to develop individuals who transform the world through excellence-driven leadership that uplifts humanity.
                    </p>
                    <p className="vision-text">
                        Everything we do is guided by a commitment to meaningful learning, strong character, innovation, compassion, and service. We are looking for individuals who believe that education should go beyond academics and who are inspired by the opportunity to help children become confident, capable, and purpose-driven individuals.
                    </p>
                </div>
            </div>
        </section>
    )
}
