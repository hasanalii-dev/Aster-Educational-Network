import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StudentLifeOutro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.outro-text span',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
            gsap.fromTo('.outro-body',
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
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#15283D] text-white px-6 md:px-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#334a89] rounded-full mix-blend-screen filter blur-[150px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ffc715] rounded-full mix-blend-screen filter blur-[150px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase mt-0.5 outro-text">
                        <span>THE</span> <span>ASTER</span> <span>EXPERIENCE</span>
                    </span>
                </div>
                
                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-12 !text-white">
                    <span className="outro-text inline-block mr-3"><span>Student</span> <span>life</span> <span>at</span> <span>Aster</span> <span>is</span> <span>about</span></span>
                    <span className="outro-text inline-block mr-3"><span>far</span> <span>more</span> <span>than</span> <span>what</span> <span>happens</span></span>
                    <span className="outro-text inline-block text-[#ffc715]"><span>during</span> <span>lessons.</span></span>
                </h2>

                <div className="outro-body max-w-[800px] font-['Quicksand'] font-medium text-lg md:text-xl text-white/80 leading-relaxed flex flex-col gap-8">
                    <p>
                        It is about discovering passions, building friendships, developing confidence, embracing challenges, celebrating achievements, and creating memories that last a lifetime.
                    </p>
                    <p>
                        It is a place where children are encouraged to participate, contribute, lead, and grow. A place where they feel supported, inspired, and excited to return each day.
                    </p>
                    <p className="text-2xl md:text-3xl font-['Playfair_Display'] text-white italic mt-4">
                        Shaping joyful childhoods and meaningful futures – <br className="hidden md:block"/><span className="text-[#ffc715] font-semibold not-italic">Whatever It Takes!</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
