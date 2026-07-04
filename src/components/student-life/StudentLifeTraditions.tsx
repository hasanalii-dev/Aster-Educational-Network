import { useEffect, useRef } from 'react'
import { Flag, HeartHandshake } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StudentLifeTraditions() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Spring-Loaded Card Entrance
            if (cardsRef.current) {
                const cards = cardsRef.current.children
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 2. Inner Card Image Parallax Scrub
            const images = gsap.utils.toArray<HTMLImageElement>('.card-parallax-img')
            images.forEach((img) => {
                gsap.fromTo(
                    img,
                    { yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                )
            })

            // 3. One-Shot Mechanical Typesetting (Thesis Statements)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                            once: true,
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] px-6 md:px-12 relative overflow-hidden select-none border-t border-[#15283D]/5">
            <div ref={cardsRef} className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* =========================================================
                    CARD 1: SCHOOL SPIRIT (Aster Yellow Accent)
                ========================================================= */}
                <div className="flex flex-col bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(21,40,61,0.06)] border border-[#15283D]/5 relative group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(21,40,61,0.12)] hover:border-[#ffc715]/30 overflow-hidden">

                    {/* Content Section */}
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Flag className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                                SPIRIT & TRADITIONS
                            </span>
                        </div>

                        <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] !text-[#15283D] leading-[1.1] mb-8 tracking-tight">
                            Creating Memories <em className="italic text-[#ffc715] !text-[#ffc715]">Together</em>
                        </h3>

                        <div className="w-12 h-[2px] bg-[#ffc715] mb-8 shadow-sm" />

                        <div className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] leading-[1.65] space-y-6">
                            <p className="text-[#334a89] !text-[#334a89] font-bold">
                                Some of the strongest school memories are created through shared experiences.
                            </p>
                            <p>
                                Throughout the year, students come together for Sports Day, Independence Day celebrations, inter-house competitions, annual performances, school-wide events, and special community gatherings that build connection and school spirit.
                            </p>
                            <p>
                                These moments encourage teamwork, healthy competition, leadership, and a sense of pride in being part of the Aster community.
                            </p>

                            {/* One-Shot Thesis */}
                            <p className="pt-4 font-bold text-xl md:text-2xl text-[#15283D] !text-[#15283D] border-t border-[#15283D]/10 mt-6">
                                {renderWords("They also create something equally important: joy.")}
                            </p>
                        </div>
                    </div>

                    {/* Image Section (Edge-to-Edge Parallax) */}
                    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-100 group-hover:shadow-[inset_0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-700">
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
                            <img
                                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
                                alt="School Spirit"
                                className="card-parallax-img absolute h-[120%] -top-[10%] w-full object-cover will-change-transform contrast-[1.05]"
                            />
                        </div>
                        {/* Inner Vignette to ground the image */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(21,40,61,0.2)] mix-blend-multiply" />
                    </div>
                </div>

                {/* =========================================================
                    CARD 2: FAITH & VALUES (Aster Green Accent)
                ========================================================= */}
                <div className="flex flex-col bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(21,40,61,0.06)] border border-[#15283D]/5 relative group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(21,40,61,0.12)] hover:border-[#6ab39d]/30 overflow-hidden">

                    {/* Content Section */}
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <HeartHandshake className="w-5 h-5 text-[#6ab39d] shrink-0" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                                FAITH, VALUES & COMMUNITY
                            </span>
                        </div>

                        <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] !text-[#15283D] leading-[1.1] mb-8 tracking-tight">
                            Growing Through Shared <em className="italic text-[#6ab39d] !text-[#6ab39d]">Purpose</em>
                        </h3>

                        <div className="w-12 h-[2px] bg-[#6ab39d] mb-8 shadow-sm" />

                        <div className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] leading-[1.65] space-y-6">
                            {/* One-Shot Thesis placed at the top for editorial pacing */}
                            <p className="text-[#334a89] !text-[#334a89] font-bold text-xl md:text-2xl pb-4 border-b border-[#15283D]/10 mb-6">
                                {renderWords("At Aster, values are not simply taught. They are lived.")}
                            </p>

                            <p>
                                Students regularly participate in Ramadan activities, Islamic competitions, charity initiatives, community projects, and meaningful acts of service that encourage empathy, gratitude, compassion, and reflection.
                            </p>
                            <p>
                                These experiences help students understand the importance of contributing positively to the world around them while strengthening their connection to faith and community.
                            </p>
                        </div>
                    </div>

                    {/* Image Section (Edge-to-Edge Parallax) */}
                    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-100 group-hover:shadow-[inset_0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-700">
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
                            <img
                                src="https://images.unsplash.com/photo-1593113545331-419b626e2553?q=80&w=1200&auto=format&fit=crop"
                                alt="Values and Community"
                                className="card-parallax-img absolute h-[120%] -top-[10%] w-full object-cover will-change-transform contrast-[1.05]"
                            />
                        </div>
                        {/* Inner Vignette to ground the image */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(21,40,61,0.2)] mix-blend-multiply" />
                    </div>
                </div>

            </div>
        </section>
    )
}