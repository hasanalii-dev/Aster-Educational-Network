import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingHero() {
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
                    { yPercent: -15, scale: 1.4 },
                    { yPercent: 15, scale: 1.3, ease: 'none' },
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
            className="w-full pt-40 md:pt-48 pb-16 md:pb-24 relative z-10 flex flex-col items-center overflow-x-hidden overflow-y-visible bg-[#fbfaf8] select-none"
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
                        src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783261770/montessori-v2_qnqjbe.png"
                        alt="Safeguarding at Aster"
                        className="w-full h-full object-cover filter brightness-[0.80] contrast-105 will-change-transform"
                    />
                    {/* LOW OPACITY DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                </div>
            </div>

            {/* Stationary Card Container */}
            <div className="absolute top-40 md:top-48 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                {/* Overlapping Blue Rectangle */}
                <div
                    ref={textStackRef}
                    className="absolute left-1/2 -translate-x-1/2 bg-[#3A53A4] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 z-20 pointer-events-auto top-0 -translate-y-1/2 flex flex-col items-center text-center"
                >
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#FBBB21] uppercase block mb-4">
                        EVERY CHILD DESERVES TO FEEL SAFE
                    </span>
                    <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white tracking-tight leading-none ">
                        Safeguarding
                    </h1>
                </div>
            </div>
        </section>
    )
}

