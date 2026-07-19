import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.intro-body',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', stagger: 0.15,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-12 relative">
            <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-10 intro-body">
                    <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#334a89] uppercase mt-0.5">
                        EDUCATION IS A PARTNERSHIP
                    </span>
                </div>
                
                <h2 className="intro-body font-['Playfair_Display'] text-3xl md:text-5xl lg:text-[56px] text-[#15283D] leading-[1.2] mb-12">
                    At Aster, we believe education is most powerful when schools and families work together with a shared vision for the child.
                </h2>

                <div className="intro-body max-w-[800px] font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed flex flex-col gap-8">
                    <h3 className="intro-body font-['Playfair_Display'] text-2xl md:text-3xl text-[#334a89] italic -mb-4">
                        Parents: A Child's First Teachers
                    </h3>
                    <p>
                        Parents play one of the most important roles in a child's development. At Aster, we view families as partners in the educational journey and believe that meaningful collaboration between school and home creates the strongest outcomes for children.
                    </p>
                    <p>
                        Through regular communication, parent engagement opportunities, workshops, and school events, we work together to support each child's academic, social, emotional, and personal growth. We believe when schools and families share a common purpose, children benefit the most.
                    </p>
                    <p>
                        Children thrive when they experience consistency between home and school, when the adults around them communicate openly, and when they feel supported by a community that genuinely cares about their growth and well-being.
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-[#334a89] mt-4">
                        That is why community is at the heart of the Aster experience.
                    </p>
                    <p>
                        Together, we create an environment where children feel supported, parents feel connected, and learning extends beyond the classroom.
                    </p>
                </div>
            </div>
        </section>
    )
}
