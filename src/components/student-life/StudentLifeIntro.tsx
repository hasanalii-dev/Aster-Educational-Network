import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StudentLifeIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.intro-text span',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out',
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
                    <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#334a89] uppercase mt-0.5 intro-text">
                        <span>THE</span> <span>HEART</span> <span>OF</span> <span>ASTER</span>
                    </span>
                </div>
                
                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-[56px] text-[#1c1c1c] leading-[1.2] mb-12">
                    <span className="intro-text">
                        {"The experiences children remember most are often not found in textbooks. ".split(" ").map((word, i) => (
                            <span key={`a-${i}`} className="inline-block mr-[0.25em]">{word}</span>
                        ))}
                        {"They are found in the friendships they build, ".split(" ").map((word, i) => (
                            <span key={`b-${i}`} className="inline-block mr-[0.25em] text-[#334a89]">{word}</span>
                        ))}
                        {"the challenges they overcome, and the goals they achieve.".split(" ").map((word, i) => (
                            <span key={`c-${i}`} className="inline-block mr-[0.25em]">{word}</span>
                        ))}
                    </span>
                </h2>

                <div className="intro-body max-w-[800px] font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed flex flex-col gap-6">
                    <p>
                        At The Aster School, student life is intentionally designed to be active, engaging, and meaningful. Every day offers opportunities to participate, explore, create, compete, collaborate, and grow.
                    </p>
                    <p>
                        We believe that school should be a place where children feel excited to learn, confident to contribute, and happy to belong.
                    </p>
                </div>
            </div>
        </section>
    )
}
