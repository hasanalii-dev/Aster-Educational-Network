import { useEffect, useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SeniorIntro() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none overflow-hidden">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
                
                <div ref={contentRef} className="flex flex-col items-center max-w-4xl">
                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <GraduationCap className="w-5 h-5 text-[#edad0c] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#15283D] uppercase mt-0.5">
                            SENIOR SCHOOL
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] mb-8 leading-[1.05]">
                        Where Future-Ready Leaders<br />Are <em className="font-medium italic text-[#334a89]">Built</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#edad0c] mb-10 mx-auto" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-[1.65] font-medium max-w-3xl">
                        <p className="gsap-stagger-item">
                            The Senior School years are a time of transformation. As students prepare for higher education and life beyond school, they begin taking greater ownership of their learning, decisions, and aspirations. This is the stage where knowledge is applied, perspectives are challenged, and students develop the confidence to navigate an increasingly complex world.
                        </p>
                        <p className="gsap-stagger-item">
                            At The Aster School, Senior School combines academic excellence with innovation, leadership, communication, and character development to prepare students not only for examinations, but for life.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#15283D] text-xl pt-4">
                            Because the future belongs to those who can think independently, act with purpose, and lead with impact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
