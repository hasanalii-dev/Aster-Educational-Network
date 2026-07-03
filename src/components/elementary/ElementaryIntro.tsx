import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryIntro() {
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
                        <Sparkles className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5">
                            ELEMENTARY SCHOOL
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] mb-8 leading-[1.05]">
                        Building Confident Learners,<br />Curious Thinkers & <em className="font-medium italic text-[#334a89]">Strong Foundations</em> for Life
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#334a89] mb-10 mx-auto" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-[1.65] font-medium max-w-3xl">
                        <p className="gsap-stagger-item">
                            The Elementary years are a time of remarkable growth. As children become more independent and aware of the world around them, they begin to ask deeper questions, make meaningful connections, and develop a stronger sense of who they are.
                        </p>
                        <p className="gsap-stagger-item">
                            At The Aster School, we use these formative years to strengthen academic foundations while nurturing curiosity, confidence, character, and a love for learning. Through meaningful experiences and hands-on exploration, students learn not only what to learn, but how to think.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] text-xl pt-4">
                            Strong foundations create limitless possibilities!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
