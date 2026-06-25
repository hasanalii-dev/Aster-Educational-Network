import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceSports() {
    const sectionRef = useRef<HTMLElement>(null)
    const ropeRef = useRef<HTMLDivElement>(null)
    
    // Track loaded state of polaroid images for skeleton animation
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Stagger Animation (Selects all items across the split DOM)
            const textItems = gsap.utils.toArray<HTMLElement>('.gsap-stagger-item')
            if (textItems.length > 0) {
                gsap.fromTo(
                    textItems,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }

            // Polaroids Entrance Animation
            if (ropeRef.current) {
                const polaroidItems = ropeRef.current.querySelectorAll('.polaroid-wrapper')
                gsap.fromTo(
                    polaroidItems,
                    { opacity: 0, y: -40, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: {
                            trigger: ropeRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Math for perfect positioning on a viewBox="0 0 100 100" path="M 0 10 Q 50 68.5 100 10"
    // y(t) = 10 + 117t - 117t^2
    const polaroids = [
        {
            title: 'Swimming',
            image: 'https://images.unsplash.com/photo-1519315901367-f34bf9150f5c?q=80&w=600&auto=format&fit=crop',
            rotation: '-6deg',
            x: 15,
            y: 24.9
        },
        {
            title: 'Football',
            image: 'https://images.unsplash.com/photo-1518605368461-1ee7a964a38d?q=80&w=600&auto=format&fit=crop',
            rotation: '4deg',
            x: 38,
            y: 37.57
        },
        {
            title: 'Gymnastics',
            image: 'https://images.unsplash.com/photo-1566351540899-74cbdf99fcb6?q=80&w=600&auto=format&fit=crop',
            rotation: '-3deg',
            x: 62,
            y: 37.57
        },
        {
            title: 'Taekwondo',
            image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop',
            rotation: '5deg',
            x: 85,
            y: 24.9
        }
    ]

    return (
        <section ref={sectionRef} className="pt-24 pb-20 md:pt-36 md:pb-32 bg-[#334a89] text-white overflow-hidden flex flex-col">
            
            {/* 1. TOP TEXT: Title and Heading */}
            <div className="px-6 md:px-12 w-full mb-12 md:mb-16">
                <div className="flex flex-col items-center max-w-4xl mx-auto text-center z-10">
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFC51B]">
                            <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                            <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#FFC51B] uppercase mt-1">
                            SPORTS EXCELLENCE
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white mb-6 leading-[1.1]">
                        Where Character Meets Competition
                    </h2>
                    
                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#FFC51B]" />
                </div>
            </div>

            {/* 2. MIDDLE TEXT: Content Paragraphs */}
            <div className="px-6 md:px-12 w-full mb-12 md:mb-16">
                <div className="flex flex-col items-center max-w-4xl mx-auto text-center z-10">
                    <div className="font-['Quicksand'] text-base md:text-lg text-white/80 space-y-6 leading-relaxed font-medium">
                        <p className="gsap-stagger-item">
                            At Aster, sports are far more than physical activity. They are a powerful vehicle for developing discipline, resilience, teamwork, confidence, and excellence.
                        </p>
                        <p className="gsap-stagger-item">
                            Through swimming, football, gymnastics, taekwondo, and competitive sporting opportunities, students learn what it means to commit to a goal, overcome challenges, and continuously improve.
                        </p>
                        <p className="gsap-stagger-item">
                            Our students proudly represent Aster at inter-school competitions, championships, and events such as the Alpha Sports Festival, demonstrating both skill and sportsmanship while competing alongside some of the region's strongest young athletes.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#FFC51B] pt-4">
                            While achievements and medals are celebrated, our greatest success is helping students develop the mindset required to persevere, grow, and strive for excellence in every area of life. Because champions are built long before they stand on a podium.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM GRAPHIC: Rope and Polaroids */}
            <div ref={ropeRef} className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] shrink-0 pointer-events-none md:pointer-events-auto -translate-y-[20%]">
                {/* The Rope SVG (edge to edge) */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M 0 10 Q 50 68.5 100 10" fill="none" stroke="#FFC51B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                
                {polaroids.map((p, i) => (
                    <div 
                        key={i}
                        className="polaroid-wrapper absolute z-10 hover:z-30 pointer-events-auto"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, 0)' }}
                    >
                        <div 
                            className="group relative w-[24vw] sm:w-[180px] md:w-[240px] lg:w-[280px] bg-white p-2 sm:p-3 md:p-4 pb-6 sm:pb-8 md:pb-12 shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-sm cursor-pointer origin-top flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:scale-110 hover:rotate-0"
                            style={{ transform: `rotate(${p.rotation})` }}
                        >
                            {/* Tape / Pin */}
                            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-[#FAFAFA]/90 backdrop-blur-sm border border-black/10 shadow-sm rotate-3 z-20" style={{ clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)' }} />
                            
                            {/* Image with Skeleton Loader */}
                            <div className="w-full aspect-square bg-[#334a89]/10 relative overflow-hidden shadow-inner">
                                {!loadedImages[i] && (
                                    <div className="absolute inset-0 bg-[#334a89]/20 animate-pulse" />
                                )}
                                <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    onLoad={() => setLoadedImages(prev => ({ ...prev, [i]: true }))}
                                    className={`w-full h-full object-cover transition-all duration-700 ${loadedImages[i] ? 'opacity-100 group-hover:scale-110' : 'opacity-0'}`} 
                                />
                            </div>
                            
                            {/* Label */}
                            <div className="text-center mt-2 sm:mt-4 md:mt-6">
                                <span className="font-['Quicksand'] font-bold text-xs sm:text-sm md:text-xl text-[#15283D]">
                                    {p.title}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </section>
    )
}
