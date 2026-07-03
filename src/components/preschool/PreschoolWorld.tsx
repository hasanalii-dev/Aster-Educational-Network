import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe2, Earth, Users, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolWorld() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const badgesRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
                )
            }

            // Card Deal animation (from DifferenceIntro)
            const cards = gsap.utils.toArray<HTMLElement>('.gsap-world-card')
            const rotations = [-8, -3, 0, 3, 8]
            const zIndexes = [10, 20, 30, 20, 10]

            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, rotation: 0, scale: 0.9 },
                    {
                        opacity: 1, y: 0, rotation: rotations[i], scale: 1,
                        duration: 0.9, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
                        delay: 0.1 * i,
                    }
                )

                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { rotation: 0, scale: 1.08, zIndex: 50, duration: 0.5, ease: 'back.out(2)', overwrite: 'auto' })
                })
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotation: rotations[i], scale: 1, zIndex: zIndexes[i], duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
                })
            })

            if (badgesRef.current) {
                gsap.fromTo(
                    badgesRef.current.children,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: badgesRef.current, start: 'top 85%' }
                    }
                )
            }

            if (footerRef.current) {
                gsap.fromTo(
                    footerRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 85%' } }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const appreciationItems = [
        { label: 'Different cultures', icon: Globe2 },
        { label: 'The natural world', icon: Earth },
        { label: 'Community and responsibility', icon: Users },
        { label: 'Environmental awareness', icon: Leaf },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none overflow-hidden">
            <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">

                <div ref={headerRef} className="flex flex-col items-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <Globe2 className="w-5 h-5 text-[#6ab39d] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5 text-left md:text-center">
                            UNDERSTANDING THE WORLD
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                        Curious Minds, <em className="font-medium italic text-[#6ab39d]">Global Hearts</em>
                    </h2>

                    <div className="w-16 h-[2px] bg-[#6ab39d] mb-10" />

                    <p className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] leading-[1.65] font-medium max-w-3xl">
                        Children are naturally curious about the world around them. Through culture studies, science exploration, geography, nature experiences, and sustainability initiatives, children develop an appreciation for:
                    </p>
                </div>

                {/* Photo Card Gallery (Fan spread from DifferenceIntro) */}
                <div ref={galleryRef} className="flex justify-center items-center w-full mb-20 md:mb-24 -space-x-8 md:-space-x-12 lg:-space-x-16 perspective-[1000px] px-4">
                    <div className="gsap-world-card relative z-10 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_15px_40px_rgba(21,40,61,0.12)] overflow-hidden mt-12 md:mt-16 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" alt="Children exploring nature" className="w-full h-full object-cover" />
                    </div>
                    <div className="gsap-world-card relative z-20 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_20px_45px_rgba(21,40,61,0.14)] overflow-hidden mt-4 md:mt-6 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" alt="Cultural studies" className="w-full h-full object-cover" />
                    </div>
                    <div className="gsap-world-card relative z-30 w-32 sm:w-44 md:w-60 lg:w-72 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_25px_50px_rgba(21,40,61,0.18)] overflow-hidden -mt-4 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1546410531-b4cafc7e1fb2?q=80&w=800&auto=format&fit=crop" alt="Children in nature" className="w-full h-full object-cover" />
                    </div>
                    <div className="gsap-world-card relative z-20 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_20px_45px_rgba(21,40,61,0.14)] overflow-hidden mt-4 md:mt-6 transform-gpu cursor-pointer hidden sm:block">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Science exploration" className="w-full h-full object-cover" />
                    </div>
                    <div className="gsap-world-card relative z-10 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_15px_40px_rgba(21,40,61,0.12)] overflow-hidden mt-12 md:mt-16 transform-gpu cursor-pointer hidden sm:block">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Geography learning" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Appreciation badges */}
                <div ref={badgesRef} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-16 w-full max-w-4xl">
                    {appreciationItems.map((item, index) => {
                        const isDark = index % 2 === 0
                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-[20px] px-6 py-4 md:px-8 md:py-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 md:gap-4 ${
                                    isDark ? 'bg-[#6ab39d]' : 'bg-[#334a89]'
                                }`}
                            >
                                <item.icon className="absolute -bottom-6 -right-6 w-20 h-20 pointer-events-none text-white/5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" strokeWidth={1} />
                                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors duration-500">
                                    <item.icon className="w-4 h-4 text-white" strokeWidth={2} />
                                </div>
                                <span className="relative z-10 font-['Quicksand'] font-bold text-base md:text-lg text-white">
                                    {item.label}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div ref={footerRef} className="text-center max-w-3xl mx-auto">
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#334a89] leading-snug">
                        These experiences help children become thoughtful, curious, and globally aware learners.
                    </p>
                </div>

            </div>
        </section>
    )
}
