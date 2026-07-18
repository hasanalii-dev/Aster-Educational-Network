import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceHero() {
    const sectionRef = useRef<HTMLElement>(null)
    const bannerFrameRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const textStackRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

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

            // Content fade in
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full pt-32 md:pt-40 pb-32 md:pb-40 relative z-10 flex flex-col items-center bg-white select-none overflow-x-hidden">
            <div className="flex justify-center w-full">
                <div
                    ref={bannerFrameRef}
                    className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform"
                    style={{ borderRadius: '16px' }}
                >
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                        <img
                            ref={imageRef}
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_1200,q_auto,f_auto/v1783269348/glimpse-4_jcy5yy.jpg"
                            alt="The Aster Difference"
                            className="w-full h-full object-cover will-change-transform"
                        />
                        {/* LOW OPACITY DARK OVERLAY */}
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Stationary Card Container */}
            <div className="absolute top-32 md:top-40 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 pointer-events-auto">
                    <div
                        ref={textStackRef}
                        className="bg-[#394EA2] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 flex flex-col items-center text-center"
                    >
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                            THE ASTER DIFFERENCE
                        </span>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white tracking-tight leading-none ">
                            Education designed for life
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}
