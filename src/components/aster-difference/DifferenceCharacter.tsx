import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Heart, Anchor, Mountain, Scale, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceCharacter() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    
    const [activeIndex, setActiveIndex] = useState(0)
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

    const listItems = [
        {
            title: 'Lead with integrity',
            image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop',
            icon: Shield
        },
        {
            title: 'Show empathy and respect',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
            icon: Heart
        },
        {
            title: 'Demonstrate humility',
            image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop',
            icon: Anchor
        },
        {
            title: 'Build resilience',
            image: 'https://images.unsplash.com/photo-1506869640319-baa1f38e3e4a?q=80&w=800&auto=format&fit=crop',
            icon: Mountain
        },
        {
            title: 'Take responsibility for their actions',
            image: 'https://images.unsplash.com/photo-1427504494785-319ce8372ac0?q=80&w=800&auto=format&fit=crop',
            icon: Scale
        },
        {
            title: 'Contribute positively to their communities',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
            icon: Users
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text & Card Stagger
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
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

            // Image Container Entrance
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0, x: -40 },
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

                // Shared Parallax Physics for all images
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
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white text-[#15283D] overflow-hidden">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Image Crossfade Block (Rounded-none, shadow-none, parallax enabled) */}
                <div 
                    ref={imageRef}
                    className="order-2 lg:order-1 relative h-[500px] md:h-[680px] w-full rounded-none shadow-none overflow-hidden bg-gray-50"
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
                            {/* Blue overlay tint */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#334a89]/40 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Content Block */}
                <div ref={contentRef} className="order-1 lg:order-2 flex flex-col">
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFC51B]">
                            <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                            <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#334a89] uppercase mt-1">
                            CHARACTER & FAITH
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0C0C13] mb-6 leading-[1.05]">
                        Developing Individuals Who Lead with Purpose
                    </h2>
                    
                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#334a89] mb-8" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-relaxed font-medium">
                        <p className="gsap-stagger-item">
                            Success without character is incomplete. At Aster, Social Emotional Learning and Islamic education are intentionally woven into the student experience to help children develop the values and habits that will guide them throughout life.
                        </p>
                        <p className="gsap-stagger-item text-[#334a89] font-bold mt-2">Students learn to:</p>
                    </div>

                    {/* Interactive Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-6 mb-10">
                        {listItems.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <div 
                                    key={index} 
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative overflow-hidden gsap-stagger-item group cursor-pointer flex flex-col justify-center p-4 md:p-5 min-h-[80px] md:min-h-[96px] rounded-[20px] transition-all duration-500 border ${isActive ? 'bg-[#334a89] border-[#334a89] shadow-[0_15px_30px_rgba(51,74,137,0.3)] scale-[1.02]' : 'bg-[#FAFAFA] border-transparent hover:bg-white hover:border-[#334a89]/10 hover:shadow-md'}`}
                                >
                                    <item.icon 
                                        className={`absolute -bottom-3 -right-3 w-16 h-16 md:w-24 md:h-24 pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${isActive ? 'text-white/10' : 'text-[#334a89]/5'}`} 
                                        strokeWidth={1}
                                    />
                                    <span className={`relative z-10 pr-6 md:pr-8 text-left font-['Quicksand'] font-bold text-sm md:text-[15px] leading-snug transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#5C5C61] group-hover:text-[#334a89]'}`}>
                                        {item.title}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] font-medium leading-relaxed">
                        <p className="gsap-stagger-item">
                            These experiences help students develop not only strong minds, but humble hearts. Because who a child becomes matters just as much as what they achieve.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
