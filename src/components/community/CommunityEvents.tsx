import { useEffect, useRef } from 'react'
import { Heart, Trophy } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityEvents() {
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

            gsap.utils.toArray('.event-img').forEach((img: any) => {
                gsap.fromTo(img,
                    { yPercent: -15 },
                    {
                        yPercent: 15, ease: 'none',
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#fbfaf8] px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1360px] mx-auto space-y-24 md:space-y-32">

                {/* Block 1: Shared Experiences */}
                <div ref={topBlockRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="w-full h-[500px] md:h-[700px] rounded-none overflow-hidden shadow-xl relative">
                        <img
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275330/1000554992_l6p07w.jpg"
                            alt="Shared Experiences"
                            className="event-img absolute inset-0 w-full h-[130%] object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <Heart className="w-6 h-6 text-[#6ab39d]" fill="currentColor" />
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#6ab39d] uppercase">
                                SHARED EXPERIENCES
                            </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#15283D] leading-[1.1] mb-8">
                            Connections That Extend Beyond School
                        </h2>

                        <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6">
                            <p className="text-xl font-bold text-[#334a89]">
                                Some of the strongest communities are built through shared experiences.
                            </p>
                            <p>
                                Throughout the year, families come together through school events, student showcases, annual performances, Reading Carnival, Sports Day, Open Houses, celebrations, and community gatherings that strengthen relationships across the Aster family.
                            </p>
                            <p>
                                These moments allow parents to connect with one another, celebrate their children's achievements, and become active participants in school life.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Block 2: Parent Playoffs */}
                <div ref={bottomBlockRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <div className="flex flex-col justify-center order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="w-6 h-6 text-[#e97f7b]" />
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#e97f7b] uppercase">
                                ASTER PARENT PLAYOFFS
                            </span>
                        </div>

                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#15283D] leading-[1.1] mb-8">
                            Celebrating Community Through Sport
                        </h2>

                        <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6">
                            <p className="text-xl font-bold text-[#15283D]">
                                At Aster, community extends beyond the classroom.
                            </p>
                            <p>
                                Through initiatives such as the Aster Parent Playoffs, parents have opportunities to participate in friendly sporting events that promote wellness, teamwork, and connection.
                            </p>
                            <p>
                                These experiences create memorable moments, strengthen relationships, and remind us that learning communities thrive when everyone is engaged.
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-[500px] md:h-[700px] rounded-none overflow-hidden shadow-xl order-1 lg:order-2 relative">
                        <div className="event-img absolute inset-0 w-full h-[130%] bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                            <Trophy className="w-12 h-12 mb-4 opacity-50" />
                            <span className="font-['Quicksand'] font-bold tracking-widest text-sm uppercase text-center px-4">Aster Parent Playoffs</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
