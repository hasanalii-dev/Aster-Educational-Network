import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceSustainability() {
    const sectionRef = useRef<HTMLElement>(null)
    const fanRef = useRef<HTMLDivElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Intro Text Stagger
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current.querySelectorAll('.gsap-stagger-item'),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: introRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }

            // 1.5. Content Text Stagger
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.querySelectorAll('.gsap-stagger-item'),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
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

    const fanImages = [
        {
            src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
            // Far Left
            transform: '-translate-x-[75%] md:-translate-x-[85%] translate-y-4 md:translate-y-8 -rotate-[12deg] md:-rotate-[16deg] scale-[0.88]',
            zIndex: 10
        },
        {
            src: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5e439?q=80&w=600&auto=format&fit=crop',
            // Middle Left
            transform: '-translate-x-[40%] md:-translate-x-[45%] translate-y-1 md:translate-y-3 -rotate-[6deg] md:-rotate-[8deg] scale-[0.94]',
            zIndex: 20
        },
        {
            src: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e736?q=80&w=600&auto=format&fit=crop',
            // Center
            transform: 'translate-x-0 translate-y-0 rotate-0 scale-100',
            zIndex: 30
        },
        {
            src: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop',
            // Middle Right
            transform: 'translate-x-[40%] md:translate-x-[45%] translate-y-1 md:translate-y-3 rotate-[6deg] md:rotate-[8deg] scale-[0.94]',
            zIndex: 20
        },
        {
            src: 'https://images.unsplash.com/photo-1574682782414-07f9c8f1f1bb?q=80&w=600&auto=format&fit=crop',
            // Far Right
            transform: 'translate-x-[75%] md:translate-x-[85%] translate-y-4 md:translate-y-8 rotate-[12deg] md:rotate-[16deg] scale-[0.88]',
            zIndex: 10
        }
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#468266] text-white overflow-hidden flex flex-col">
            
            {/* 1. TOP TEXT: Title and Heading */}
            <div className="px-6 md:px-12 w-full mb-8 md:mb-12">
                <div ref={introRef} className="flex flex-col items-center max-w-4xl mx-auto text-center z-10">
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#143d2c]">
                            <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                            <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-white uppercase mt-1">
                            SUSTAINABILITY IN ACTION
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white mb-6 leading-[1.05]">
                        Learning to Care for the World Around Them
                    </h2>
                    
                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#143d2c]" />
                </div>
            </div>

            {/* 2. MIDDLE GRAPHIC: Overlapping Fan Layout */}
            <div ref={fanRef} className="relative h-[240px] sm:h-[300px] md:h-[360px] w-full flex items-center justify-center mb-10 md:mb-16 mt-2 pointer-events-none md:pointer-events-auto">
                {fanImages.map((img, i) => (
                    <div 
                        key={i} 
                        className="fan-card-wrapper absolute w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] aspect-[3/4] pointer-events-auto"
                        style={{ zIndex: img.zIndex }}
                    >
                        <div 
                            className={`group w-full h-full rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-[2px] md:border-[3px] border-white/60 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom cursor-pointer transform ${img.transform} hover:!z-50 hover:!-translate-y-8 hover:!rotate-0 hover:!scale-[1.15] hover:border-white`}
                        >
                            {!loadedImages[i] && (
                                <div className="absolute inset-0 bg-[#143d2c]/10 animate-pulse" />
                            )}
                            <img 
                                src={img.src} 
                                onLoad={() => setLoadedImages(prev => ({...prev, [i]: true}))}
                                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'}`} 
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. BOTTOM TEXT: Content Paragraphs */}
            <div className="px-6 md:px-12 w-full">
                <div ref={contentRef} className="flex flex-col items-center max-w-4xl mx-auto text-center z-10">
                    <div className="font-['Quicksand'] text-base md:text-lg text-white/90 space-y-6 leading-relaxed font-medium">
                        <p className="gsap-stagger-item">
                            We believe children should understand their responsibility toward the world they will inherit.
                        </p>
                        <p className="gsap-stagger-item">
                            Through our Green Goals program, students actively engage with sustainability through meaningful, hands-on experiences. They grow vegetables and crops, care for gardens, participate in environmental initiatives, and explore natural life cycles through activities such as butterfly breeding projects.
                        </p>
                        <p className="gsap-stagger-item">
                            These experiences foster responsibility, stewardship, patience, and an appreciation for the interconnectedness of people, communities, and the natural world.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#143d2c] pt-4 text-xl">
                            Because meaningful change begins with understanding that every action matters.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    )
}
