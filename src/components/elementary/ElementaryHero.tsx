import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryHero() {
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
            className="w-full pt-40 md:pt-48 pb-16 md:pb-24 relative z-10 flex flex-col items-center overflow-x-hidden overflow-y-visible bg-white select-none"
        >
            <div
                ref={bannerFrameRef}
                className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform"
                style={{ borderRadius: '16px' }}
            >
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop"
                        alt="Elementary Students"
                        className="w-full h-full object-cover filter brightness-[0.85] contrast-105 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                </div>
            </div>

            <div className="absolute top-40 md:top-48 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                <div
                    ref={textStackRef}
                    className="absolute left-1/2 -translate-x-1/2 bg-[#334a89] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 z-20 pointer-events-auto shadow-2xl top-0 -translate-y-1/2 flex flex-col items-center text-center"
                >
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                        ACADEMICS
                    </span>
                    <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white tracking-tight leading-none ">
                        Elementary School
                    </h1>
                </div>
            </div>
        </section>
    )
}
