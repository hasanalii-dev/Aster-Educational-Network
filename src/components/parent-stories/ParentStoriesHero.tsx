import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParentStoriesHero() {
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
            className="w-full pt-20 md:pt-24 pb-32 md:pb-48 relative z-10 flex flex-col items-center bg-[#F4F6F8] select-none"
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
                        src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_1200,q_auto,f_auto/v1783259891/imageye___-_imgi_132_image_crrae4.webp"
                        alt="The Aster School Community"
                        className="w-full h-full object-cover will-change-transform"
                    />
                    {/* LOW OPACITY DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                </div>
            </div>

            {/* Stationary Card Container (matches initial banner size so it stays fixed relative to the page while image expands) */}
            <div className="absolute top-20 md:top-24 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                {/* Overlapping Blue Rectangle */}
                <div
                    ref={textStackRef}
                    className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 bg-[#334a89] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 text-center md:text-left z-20 pointer-events-auto rounded-sm"
                >
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                        PARENT STORIES
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white leading-[1.1] md:leading-[1.1]">
                        What Our Community Says
                    </h1>
                </div>
            </div>
        </section>
    )
}
