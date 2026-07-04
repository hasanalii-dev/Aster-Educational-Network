import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StudentLifeBelonging() {
    const sectionRef = useRef<HTMLElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal image reveal
            gsap.fromTo(
                imageContainerRef.current,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: 'top 80%',
                    }
                }
            )

            // Text stagger reveal
            gsap.fromTo('.belonging-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-white px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Left Content */}
                <div className="flex flex-col justify-center order-2 lg:order-1">
                    <div className="flex items-center gap-3 mb-6 belonging-text">
                        <span className="w-8 h-[2px] bg-[#ffc715]"></span>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase">
                            A PLACE WHERE CHILDREN BELONG
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#334a89] leading-[1.1] mb-8 belonging-text">
                        Known, Valued & <br className="hidden md:block"/> Supported
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6 belonging-text">
                        <p className="text-xl font-bold text-[#15283D]">
                            Every child deserves to feel seen.
                        </p>
                        <p>
                            At Aster, students are part of a close-knit community where strong relationships between teachers, students, and families create an environment of trust, care, and belonging.
                        </p>
                        <p>
                            Children are encouraged to express themselves, ask questions, share ideas, and take risks in a space where they feel safe and supported.
                        </p>
                        <p className="text-[#334a89] font-bold">
                            When children know they belong, they develop the confidence to grow, learn, and thrive.
                        </p>
                    </div>
                </div>

                {/* Right Image */}
                <div className="order-1 lg:order-2 w-full h-[400px] md:h-[600px] lg:h-[700px] relative rounded-[24px] overflow-hidden shadow-2xl" ref={imageContainerRef}>
                    <img 
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop" 
                        alt="Children laughing and belonging together"
                        className="w-full h-full object-cover filter brightness-[0.95]"
                    />
                </div>

            </div>
        </section>
    )
}
