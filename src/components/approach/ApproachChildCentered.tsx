import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smile } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachChildCentered() {
    const sectionRef = useRef<HTMLElement>(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.child-text',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const visualContainer = sectionRef.current?.querySelector('.visual-container')
            if (visualContainer) {
                gsap.fromTo(visualContainer,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                    }
                )
            }

            const parallaxImg = sectionRef.current?.querySelector('.parallax-img')
            if (parallaxImg) {
                gsap.fromTo(parallaxImg,
                    { yPercent: -10, scale: 1.1 },
                    {
                        yPercent: 10, scale: 1.1, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 child-text">
                        <Smile className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            CHILD-CENTERED LEARNING
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 child-text tracking-tight">
                        Every child learns <em className="italic text-[#3A53A4]">differently.</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] flex flex-col gap-6">
                        <p className="child-text">
                            At Aster, we recognize and respect individual learning styles, interests, strengths, and pace of development. Our educators guide children through experiences that encourage curiosity, independence, creativity, and confidence.
                        </p>
                        <p className="child-text">
                            Students are not simply taught what to think, they are encouraged to <strong className="text-[#3A53A4] font-bold">think critically</strong>, communicate confidently, and engage actively with the world around them.
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                    <div className="visual-container relative h-[500px] md:h-[650px] w-full overflow-hidden shadow-2xl">
                        {!imgLoaded && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                        )}
                        <img
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
                            alt="Child engaged in learning"
                            onLoad={() => setImgLoaded(true)}
                            className={`parallax-img w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A53A4]/40 to-transparent mix-blend-multiply"></div>
                    </div>
                </div>

            </div>
        </section>
    )
}
