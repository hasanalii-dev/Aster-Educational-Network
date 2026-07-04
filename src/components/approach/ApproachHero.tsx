import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ApproachHero() {
    const sectionRef = useRef<HTMLElement>(null)
    const bannerFrameRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const textStackRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textStackRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.1 }
            )

            if (textStackRef.current) {
                gsap.fromTo(
                    textStackRef.current.children,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.4 }
                )
            }

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
                    { opacity: 0, y: 40, scale: 0.98 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full pt-28 md:pt-32 pb-16 md:pb-24 relative z-10 flex flex-col items-center bg-white select-none">
            <div className="flex justify-center w-full">
                <div
                    ref={bannerFrameRef}
                    className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform"
                    style={{ borderRadius: '16px' }}
                >
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                        {!imgLoaded && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                        )}
                        <img
                            ref={imageRef}
                            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop"
                            alt="Students actively learning"
                            onLoad={() => setImgLoaded(true)}
                            className={`w-full h-full object-cover filter brightness-[0.85] contrast-105 will-change-transform transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                    </div>
                </div>

                <div className="absolute top-28 md:top-32 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                    <div
                        ref={textStackRef}
                        className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 bg-[#394EA2] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 text-left z-20 pointer-events-auto"
                    >
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                            APPROACH
                        </span>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-white tracking-tight leading-[1.1] whitespace-nowrap">
                            Our Approach
                        </h1>
                    </div>
                </div>
            </div>

            <div ref={contentRef} className="mt-24 md:mt-32 max-w-[900px] mx-auto px-6 md:px-12 text-center flex flex-col gap-6">
                <p className="font-['Quicksand'] font-bold text-xl md:text-2xl lg:text-[28px] text-[#334a89] leading-snug">
                    At Aster, we believe meaningful learning happens when children actively participate in the process of discovery.
                </p>
                <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.7]">
                    Our approach moves beyond rote memorization and passive instruction. We create learning environments where students are encouraged to explore ideas, ask questions, solve problems, collaborate with others, and apply their learning in meaningful ways.
                </p>
                <p className="font-['Quicksand'] font-bold text-xl text-[#ffc715] leading-[1.7] mt-2">
                    The goal is not only academic success, but the development of confident, capable, and future-ready individuals.
                </p>
            </div>
        </section>
    )
}
