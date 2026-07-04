import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StudentLifeGrowth() {
    const sectionRef = useRef<HTMLElement>(null)
    const topBlockRef = useRef<HTMLDivElement>(null)
    const bottomBlockRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                topBlockRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: topBlockRef.current, start: 'top 80%' }
                }
            )

            gsap.fromTo(
                bottomBlockRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: bottomBlockRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-white px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1360px] mx-auto space-y-24 md:space-y-32">
                
                {/* Block 1: Confidence */}
                <div ref={topBlockRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden shadow-xl">
                        <img 
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop" 
                            alt="Building Confidence"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-[#e97f7b]"></span>
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#e97f7b] uppercase">
                                BUILDING CONFIDENCE THROUGH PARTICIPATION
                            </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#334a89] leading-[1.1] mb-8">
                            Every Child Has <br className="hidden md:block"/> Opportunities to Shine
                        </h2>

                        <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6">
                            <p className="text-xl font-bold text-[#15283D]">
                                Confidence develops when children are given opportunities to participate, contribute, and be heard.
                            </p>
                            <p>
                                Whether presenting in front of their classmates, performing on stage, representing their house team, competing in an event, sharing ideas, or taking on leadership responsibilities, students are encouraged to step beyond their comfort zones and discover what they are capable of achieving.
                            </p>
                            <p className="text-[#334a89] font-bold">
                                Over time, these experiences help students become more confident communicators, stronger collaborators, and more resilient individuals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Block 2: Friendships */}
                <div ref={bottomBlockRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    <div className="flex flex-col justify-center order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-[#6ab39d]"></span>
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#6ab39d] uppercase">
                                FRIENDSHIPS THAT LAST
                            </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#334a89] leading-[1.1] mb-8">
                            The Heart of the <br className="hidden md:block"/> Aster Experience
                        </h2>

                        <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6">
                            <p>
                                Long after students forget specific lessons, they often remember the people they shared their journey with. 
                            </p>
                            <p>
                                The friendships built through everyday moments, teamwork, celebrations, challenges, and shared experiences become an important part of childhood and school life.
                            </p>
                            <p className="text-[#15283D] font-bold">
                                At Aster, we believe that a strong sense of community helps children feel happier, more connected, and more confident in themselves, and we are committed to maintaining a healthy and thriving environment for strong friendships to foster.
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden shadow-xl order-1 lg:order-2">
                        <img 
                            src="https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=1200&auto=format&fit=crop" 
                            alt="Friendships That Last"
                            className="w-full h-full object-cover filter brightness-[0.95]"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
