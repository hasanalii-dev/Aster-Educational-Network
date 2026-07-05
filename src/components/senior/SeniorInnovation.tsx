import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ImageWithSkeleton = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <div className={`senior-skeleton ${className || ''}`} style={{ borderRadius: '0px' }}>
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ borderRadius: '0px' }}
                loading="lazy"
            />
        </div>
    )
}

export function SeniorInnovation() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgLargeRef = useRef<HTMLDivElement>(null)
    const imgSmallRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                const velocityElements = [
                    imgLargeRef.current,
                    imgSmallRef.current,
                ].filter(Boolean) as HTMLElement[]

                let velocitySkew = 0

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: (self) => {
                        const currentVelocity = self.getVelocity()
                        const clampedVelocity = gsap.utils.clamp(-2000, 2000, currentVelocity)
                        velocitySkew = clampedVelocity / 800
                    },
                })

                const updateSkew = () => {
                    const currentSkew = gsap.utils.interpolate(
                        parseFloat(velocityElements[0]?.style.getPropertyValue('--v-skew') || '0'),
                        velocitySkew,
                        0.08
                    )

                    velocityElements.forEach(el => {
                        el.style.setProperty('--v-skew', String(currentSkew))
                        el.style.transform = `${el.dataset.baseTransform || ''} skewY(${currentSkew}deg)`.trim()
                    })

                    velocitySkew *= 0.95
                    if (Math.abs(velocitySkew) < 0.01) velocitySkew = 0
                }

                gsap.ticker.add(updateSkew)

                gsap.fromTo(imgLargeRef.current,
                    { y: 30 },
                    { y: -30, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5, onUpdate: (self) => { if (imgLargeRef.current) { imgLargeRef.current.dataset.baseTransform = `translateY(${gsap.utils.interpolate(30, -30, self.progress)}px)` } } } }
                )

                gsap.fromTo(imgSmallRef.current,
                    { y: 50 },
                    { y: -50, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2.2, onUpdate: (self) => { if (imgSmallRef.current) { imgSmallRef.current.dataset.baseTransform = `translateY(${gsap.utils.interpolate(50, -50, self.progress)}px)` } } } }
                )

                if (contentRef.current?.children) {
                    gsap.fromTo(Array.from(contentRef.current.children),
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: contentRef.current, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' } }
                    )
                }

                return () => gsap.ticker.remove(updateSkew)
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <>
            <style>{`
            .senior-skeleton {
                background: linear-gradient(90deg, #E0E0E0 25%, #C4C4C4 50%, #E0E0E0 75%);
                background-size: 200% 100%;
                animation: skeleton-pulse 1.5s infinite linear;
            }
            .senior-skew-wrap {
                will-change: transform;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }
            `}</style>
            
            <section ref={sectionRef} className="py-24 md:py-40 bg-[#FAFAFA] overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left: Typography Content */}
                    <div className="w-full lg:w-5/12 flex flex-col" ref={contentRef}>
                        <div className="flex items-center gap-3 mb-6">
                            <Lightbulb className="w-5 h-5 text-[#edad0c]" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#15283D] uppercase">
                                DEVELOPING FUTURE-READY LEARNERS
                            </span>
                        </div>
                        
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] leading-[1.1] mb-8">
                            Innovation, Technology & <em className="text-[#334a89] italic">Entrepreneurship</em>
                        </h2>
                        
                        <div className="font-['Quicksand'] text-lg text-[#5C5C61] space-y-6 font-medium leading-[1.6]">
                            <p>
                                The world is evolving rapidly, and students need opportunities to develop the skills required to thrive within it.
                            </p>
                            <p>
                                Through Robotics, Digital Literacy, innovation-based learning, and entrepreneurship experiences, students learn to think strategically, solve real-world problems, and turn ideas into action.
                            </p>
                        </div>

                        <ul className="mt-10 space-y-4 font-['Quicksand'] text-lg font-bold text-[#15283D]">
                            {['Think strategically', 'Solve real-world problems', 'Work collaboratively', 'Adapt to emerging technologies', 'Turn ideas into action'].map((item, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 bg-[#edad0c]" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 font-['Quicksand'] text-base text-[#5C5C61] font-medium leading-[1.6] space-y-4">
                            <p>
                                Programs such as <strong className="text-[#15283D]">Genius Hour</strong> allow students to pursue independent projects based on their interests and curiosities, while initiatives such as <strong className="text-[#15283D]">Star Bites</strong>, our student-led canteen project, introduce students to entrepreneurship, financial literacy, teamwork, and real-world responsibility.
                            </p>
                            <p className="font-bold text-[#15283D]">
                                These experiences help students develop the adaptability, initiative, and mindset required for the future.
                            </p>
                        </div>
                    </div>

                    {/* Right: Skewed Visuals */}
                    <div className="w-full lg:w-7/12 relative h-[500px] md:h-[650px] flex-shrink-0">
                        <div 
                            ref={imgLargeRef} 
                            className="senior-skew-wrap absolute right-0 top-0 w-[85%] md:w-[450px] h-[400px] md:h-[550px] z-10 shadow-2xl"
                            style={{ borderRadius: '0px' }}
                        >
                            <ImageWithSkeleton
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783271036/image00016_rlwwu8.jpg"
                                alt="Project-based Learning"
                                className="w-full h-full"
                            />
                        </div>

                        <div 
                            ref={imgSmallRef} 
                            className="senior-skew-wrap absolute left-0 md:left-10 bottom-0 md:bottom-10 w-[70%] md:w-[350px] h-[300px] md:h-[400px] z-20 shadow-[0_32px_64px_rgba(0,0,0,0.2)] border-[8px] border-[#FAFAFA]"
                            style={{ borderRadius: '0px' }}
                        >
                            <ImageWithSkeleton
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270626/image00026_znlnek.jpg"
                                alt="Entrepreneurship Workshop"
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

