import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceCommunity() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                // Intro text elements stagger
                gsap.fromTo(
                    contentRef.current.querySelectorAll('.gsap-stagger-item'),
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

                // Heading Scrub Reveal
                const words = contentRef.current.querySelectorAll('.gsap-scrub-word')
                if (words.length > 0) {
                    gsap.to(words, {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: contentRef.current.querySelector('.prose-reveal-container'),
                            start: 'top 85%',
                            end: 'bottom 60%',
                            scrub: true,
                        }
                    })
                }
            }

            // Image Parallax
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: imageRef.current.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-white text-[#15283D]">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div className="order-2 lg:order-1 relative h-[500px] md:h-[600px] w-full overflow-hidden">
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                        alt="Community"
                        className="absolute top-0 left-0 w-full h-[120%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#334a89]/20 to-transparent mix-blend-multiply pointer-events-none" />
                </div>

                <div ref={contentRef} className="order-1 lg:order-2 flex flex-col">
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ffc715]">
                            <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                            <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#334a89] uppercase mt-1">
                            A COMMUNITY BUILT AROUND CHILDREN
                        </span>
                    </div>

                    <h2 className="prose-reveal-container font-['Playfair_Display'] text-4xl md:text-5xl font-medium tracking-tight text-[#0C0C13] mb-6">
                        {`Strong Partnerships. Shared Purpose.`.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] opacity-20 will-change-transform">{word}</span>
                        ))}
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#334a89] mb-8" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-relaxed font-medium">
                        <p className="gsap-stagger-item">
                            A child's growth is strongest when schools and families work together.
                        </p>
                        <p className="gsap-stagger-item">
                            At Aster, we view parents as partners in the educational journey. Through meaningful communication, parent engagement opportunities, student showcases, conferences, and community events, we foster a culture of trust, collaboration, and shared purpose.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] pt-4 text-xl">
                            Together, we create an environment where children feel supported, valued, and empowered to thrive.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
