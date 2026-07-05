import { useEffect, useRef, useState } from 'react'
import { FolderOpen } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryResources() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    const [activeIndex, setActiveIndex] = useState(0)
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

    const listItems = [
        {
            title: "Clarity & Understanding",
            text: "Workbooks designed to break down complex concepts into accessible steps.",
            image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783269710/IMG_0153_cp7fg6.jpg"
        },
        {
            title: "Guided Practice",
            text: "Structured exercises that build confidence without overwhelming the student.",
            image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783269941/1000555027_mneccz.jpg"
        },
        {
            title: "Meaningful Application",
            text: "Real-world problems that encourage students to apply what they learn.",
            image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783269996/494470437_1233498812117053_8680063396234529913_n_gbw9kx.jpg"
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
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

            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0, x: 40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        }
                    }
                )

                const parallaxImages = imageRef.current.querySelectorAll('.parallax-img')
                if (parallaxImages.length > 0) {
                    gsap.fromTo(
                        parallaxImages,
                        { yPercent: -12, scale: 1.1 },
                        {
                            yPercent: 12,
                            scale: 1.1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imageRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            }
                        }
                    )
                }
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] text-[#15283D] overflow-hidden">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Content Block */}
                <div ref={contentRef} className="flex flex-col">
                    <div className="gsap-stagger-item flex items-center justify-start gap-3 mb-6">
                        <FolderOpen className="w-5 h-5 text-[#ffc715]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5">
                            DESIGNED FOR THE WAY CHILDREN LEARN
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-8 leading-[1.05]">
                        Resources that <em className="font-medium italic text-[#ffc715]">Evolve</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-[1.65] font-medium mb-10">
                        <p className="gsap-stagger-item">
                            At Aster, we believe learning resources should evolve alongside the world our children are growing into.
                        </p>
                        <p className="gsap-stagger-item">
                            To support deeper understanding and more meaningful learning, our academic team develops and continuously refines Aster's own in-house workbooks and learning materials.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] pt-2">
                            Our workbooks help students:
                        </p>
                    </div>

                    {/* Interactive "Folders" List */}
                    <div className="flex flex-col border-l-2 border-[#e97f7b]/20 ml-2">
                        {listItems.map((item, i) => {
                            const isActive = activeIndex === i
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`gsap-stagger-item group text-left relative py-5 md:py-6 pl-8 pr-4 transition-all duration-300 ${
                                        isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <div 
                                        className={`absolute left-[-2px] top-0 bottom-0 w-1 transition-all duration-300 ${
                                            isActive ? 'bg-[#ffc715] h-full' : 'bg-transparent h-0 group-hover:h-full group-hover:bg-[#ffc715]/40'
                                        }`} 
                                    />
                                    
                                    <h3 className={`font-['Playfair_Display'] text-xl md:text-2xl font-medium tracking-tight mb-2 transition-colors duration-300 ${isActive ? 'text-[#334a89]' : 'text-[#15283D]'}`}>
                                        {item.title}
                                    </h3>
                                    
                                    <div 
                                        className={`font-['Quicksand'] text-base md:text-lg text-[#5C5C61] font-medium leading-relaxed overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
                                        style={{ 
                                            maxHeight: isActive ? '200px' : '0px',
                                            opacity: isActive ? 1 : 0,
                                            transform: `translateY(${isActive ? '0' : '-10px'})`
                                        }}
                                    >
                                        <div className="pt-2">
                                            {item.text}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Image Crossfade Block */}
                <div 
                    ref={imageRef}
                    className="relative h-[500px] md:h-[680px] w-full shadow-2xl overflow-hidden bg-gray-50 border border-black/5"
                >
                    {listItems.map((item, i) => (
                        <div 
                            key={i} 
                            className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {!loadedImages[i] && (
                                <div className="absolute inset-0 bg-[#334a89]/5 animate-pulse" />
                            )}
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                onLoad={() => setLoadedImages(prev => ({...prev, [i]: true}))}
                                className={`parallax-img w-full h-full object-cover transition-opacity duration-700 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {/* Tint overlay */}
                            <div className="absolute inset-0 bg-[#334a89]/20 mix-blend-multiply pointer-events-none" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
