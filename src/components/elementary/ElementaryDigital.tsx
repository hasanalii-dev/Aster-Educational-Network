import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Terminal, Layers, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ImageWithSkeleton = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <div className={`relative bg-[#15283D]/5 overflow-hidden ${className || ''}`} style={{ borderRadius: '0px' }}>
            {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ borderRadius: '0px' }}
                loading="lazy"
            />
            {/* Outline completely removed for raw, edge-to-edge finish */}
        </div>
    )
}

export function ElementaryDigital() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgLargeRef = useRef<HTMLDivElement>(null)
    const imgSmallRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let updateSkew: () => void;

        const ctx = gsap.context(() => {
            // 1. Content Staggered Fade-Up
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 2. One-Shot Mechanical Typesetting (Thesis Statement)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 85%',
                            once: true,
                        }
                    }
                )
            }

            // 3. Cinematic Parallax & Velocity Skew Physics (GSAP Native)
            if (sectionRef.current) {
                const velocityElements = [
                    imgLargeRef.current,
                    imgSmallRef.current,
                ].filter(Boolean) as HTMLElement[]

                let velocitySkew = 0

                // Track scroll velocity and calculate target skew
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: (self) => {
                        const currentVelocity = self.getVelocity()
                        // Clamp to prevent extreme bending, divide by 400 for sensitivity
                        velocitySkew = gsap.utils.clamp(-6, 6, currentVelocity / 400)
                    },
                })

                // Ticker intelligently applies skew physics smoothly over time
                updateSkew = () => {
                    velocityElements.forEach(el => {
                        const currentSkew = gsap.getProperty(el, "skewY") as number || 0;
                        const nextSkew = gsap.utils.interpolate(currentSkew, velocitySkew, 0.1);

                        // Let GSAP natively handle the transform so it doesn't fight the Y-parallax
                        gsap.set(el, { skewY: nextSkew, force3D: true });
                    })

                    // Friction
                    velocitySkew *= 0.9
                }

                gsap.ticker.add(updateSkew)

                // High-Travel Y-Axis Parallax (Scrubbed)
                gsap.fromTo(imgLargeRef.current,
                    { y: 100 },
                    { y: -100, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
                )

                gsap.fromTo(imgSmallRef.current,
                    { y: 160 },
                    { y: -80, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } }
                )
            }
        }, sectionRef)

        return () => {
            if (updateSkew) gsap.ticker.remove(updateSkew);
            ctx.revert();
        }
    }, [])

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    const skills = [
        { label: 'Logical Thinking', icon: Terminal },
        { label: 'Complex Problem Solving', icon: Layers },
        { label: 'Safe Digital Exploration', icon: ShieldCheck },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] overflow-hidden relative select-none border-t border-[#15283D]/5">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative z-10">

                {/* =========================================================
                    CONTENT SIDE (Left - 5 cols)
                ========================================================= */}
                <div className="lg:col-span-5 flex flex-col" ref={contentRef}>

                    {/* Square Bullet Label */}
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <Cpu className="w-5 h-5 text-[#334a89] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            FUTURE READY
                        </span>
                    </div>

                    {/* Aster Split Motif */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] !text-[#15283D] leading-[1.05] mb-8 tracking-tight">
                        Robotics & <em className="text-[#334a89] !text-[#334a89] italic font-medium">Digital Literacy</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#334a89] mb-10 shadow-sm" />

                    <div className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] font-medium leading-[1.65] mb-10">
                        <p>
                            The world our children are growing into demands more than rote learning. It demands confidence, adaptability, and the ability to think independently and solve real problems.
                        </p>
                    </div>

                    {/* Tactile List Badges */}
                    <div className="gsap-stagger-item flex flex-col gap-3 mb-12">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-4 py-3 px-5 rounded-[12px] bg-white border border-[#15283D]/5 shadow-[0_4px_10px_rgba(21,40,61,0.04)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_12px_25px_rgba(51,74,137,0.12)] hover:-translate-y-1 hover:border-[#334a89]/20 cursor-default"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#334a89] group-hover:scale-110">
                                    <skill.icon className="w-4 h-4 text-[#334a89] transition-colors duration-500 group-hover:text-white" strokeWidth={2} />
                                </div>
                                <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#15283D] !text-[#15283D] transition-colors duration-300 group-hover:text-[#334a89] group-hover:!text-[#334a89]">
                                    {skill.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item pt-8 border-t border-[#15283D]/10">
                        <p className="font-['Quicksand'] text-lg md:text-xl font-bold text-[#334a89] !text-[#334a89] leading-[1.6]">
                            {renderWords("Students learn to think critically and engage confidently with technology through coding, robotics, and digital exploration.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    IMAGE SIDE (Right - 7 cols, GSAP Scroll Physics)
                ========================================================= */}
                <div className="lg:col-span-7 relative h-[500px] md:h-[650px] lg:min-h-[750px] w-full mt-12 lg:mt-0">

                    {/* Back Image (Large) - Width reduced by 5% */}
                    <div
                        ref={imgLargeRef}
                        className="absolute right-0 top-0 w-[80%] md:w-[75%] h-[400px] md:h-[550px] lg:h-[650px] z-10 shadow-[0_20px_50px_rgba(21,40,61,0.12)] will-change-transform"
                    >
                        <ImageWithSkeleton
                            src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1200&auto=format&fit=crop"
                            alt="Robotics class"
                            className="w-full h-full"
                        />
                    </div>

                    {/* Front Image (Small, Overlapping, Borderless) */}
                    <div
                        ref={imgSmallRef}
                        className="absolute left-0 bottom-0 md:bottom-10 lg:bottom-16 w-[70%] md:w-[55%] h-[300px] md:h-[400px] lg:h-[450px] z-20 shadow-[0_30px_60px_rgba(21,40,61,0.2)] will-change-transform"
                    >
                        <ImageWithSkeleton
                            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
                            alt="Digital Literacy"
                            className="w-full h-full"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}