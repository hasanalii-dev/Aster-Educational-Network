import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CampusesHero() {
    const sectionRef = useRef<HTMLElement>(null)
    const bannerFrameRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const textStackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textStackRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.1 }
            )

            const mm = gsap.matchMedia()

            mm.add('(min-width: 768px)', () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=400',
                        scrub: true,
                    },
                })

                tl.to(
                    bannerFrameRef.current,
                    {
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '0px',
                        ease: 'none',
                    },
                    0
                )

                tl.fromTo(
                    imageRef.current,
                    { yPercent: -10, scale: 1.15 },
                    { yPercent: 10, scale: 1.05, ease: 'none' },
                    0
                )
            })

            mm.add('(max-width: 767px)', () => {
                gsap.to(bannerFrameRef.current, {
                    borderRadius: '0px',
                    width: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=250',
                        scrub: true,
                    },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="w-full pt-28 md:pt-32 pb-16 md:pb-24 relative z-10 flex flex-col items-center overflow-x-hidden overflow-y-visible bg-[#fbfaf8] select-none"
        >
            <div
                ref={bannerFrameRef}
                className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform"
                style={{ borderRadius: '16px' }}
            >
                {/* The Image Mask (inherits border radius) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
                        alt="The Aster School Campuses"
                        className="w-full h-full object-cover filter brightness-[0.80] contrast-105 will-change-transform"
                    />
                    {/* LOW OPACITY DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                </div>
            </div>

            {/* Stationary Card Container */}
            <div className="absolute top-28 md:top-32 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                {/* Overlapping Blue Rectangle */}
                <div
                    ref={textStackRef}
                    className="absolute left-1/2 -translate-x-1/2 bg-[#394EA2] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 z-20 pointer-events-auto top-1/2 -translate-y-1/2 flex flex-col items-center text-center"
                >
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                        ONE VISION. MULTIPLE CAMPUSES. ONE ASTER EXPERIENCE.
                    </span>
                    <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white tracking-tight leading-none ">
                        Our Campuses
                    </h1>
                </div>
            </div>
        </section>
    )
}
