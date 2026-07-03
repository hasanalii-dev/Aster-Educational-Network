import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Brain, Lightbulb, Award, Blocks } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolMaterials() {
    const sectionRef = useRef<HTMLElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Interactive State for the Accordion Links
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Standard Entrance (Staggered Fade-Up) for everything
            const items = gsap.utils.toArray<HTMLElement>('.gsap-stagger-item')
            if (items.length > 0) {
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                    }
                )
            }

            // 2. Cinematic Media Reveal & Parallax Scrub applied to ALL layered images
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.5,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: imageRef.current, start: 'top 85%' }
                    }
                )

                const imgElements = imageRef.current.querySelectorAll('.parallax-img')
                if (imgElements.length > 0) {
                    gsap.fromTo(
                        imgElements,
                        { yPercent: -12 },
                        {
                            yPercent: 12,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imageRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        }
                    )
                }
            }

            // 3. One-Shot Mechanical Typesetting
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
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const interactiveItems = [
        {
            text: 'Develop deeper understanding',
            icon: Eye,
            image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop'
        },
        {
            text: 'Strengthen concentration',
            icon: Brain,
            image: 'https://images.unsplash.com/photo-1587654780799-5e2f2e6a57d1?q=80&w=1200&auto=format&fit=crop'
        },
        {
            text: 'Build problem-solving skills',
            icon: Lightbulb,
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop'
        },
        {
            text: 'Learn independently',
            icon: Blocks,
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
        },
        {
            text: 'Gain confidence through mastery',
            icon: Award,
            image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop'
        },
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#e97f7b] selection:bg-white selection:text-[#e97f7b] select-none overflow-hidden flex flex-col items-center">

            {/* =========================================================
                TOP HEADER (Centered)
            ========================================================= */}
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-16 md:mb-24">

                {/* Square Bullet Label (Inverted to White) */}
                <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                    <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-white !text-white uppercase mt-0.5">
                        LEARNING THROUGH MATERIALS
                    </span>
                </div>

                {/* Aster Split Motif (White Text, Aster Yellow Italic) */}
                <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-white !text-white mb-8 leading-[1.05]">
                    See, Touch, <em className="font-medium italic text-[#ffc715] !text-[#ffc715]">Discover</em>
                </h2>

                {/* Divider (Aster Yellow) */}
                <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10 mx-auto shadow-sm" />

                <div className="font-['Quicksand'] text-base md:text-lg text-white/95 !text-white space-y-6 leading-[1.65] font-medium max-w-3xl">
                    <p className="gsap-stagger-item">
                        Children learn best when they can see, touch, manipulate, and experience concepts for themselves.
                    </p>
                    <p className="gsap-stagger-item">
                        In our classrooms, students work with carefully designed learning materials that transform abstract ideas into concrete understanding. Rather than memorizing information, children actively construct knowledge through exploration and discovery.
                    </p>
                </div>
            </div>

            {/* =========================================================
                GRID (Accordion Left, Image Right)
            ========================================================= */}
            <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* ACCORDION LIST (Reference style) */}
                <div className="order-2 lg:order-1 flex flex-col w-full">
                    <p className="gsap-stagger-item font-['Quicksand'] font-bold text-white !text-white text-lg md:text-xl pb-6">
                        This hands-on approach helps children:
                    </p>

                    <div className="flex flex-col w-full">
                        {interactiveItems.map((item, i) => {
                            const isActive = activeIndex === i;

                            return (
                                <div
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`gsap-stagger-item group flex items-center gap-5 md:gap-8 py-5 md:py-6 border-b transition-colors duration-300 cursor-pointer select-none ${
                                        isActive
                                            ? 'border-white'
                                            : 'border-white/20 hover:border-white/40'
                                    }`}
                                >
                                    {/* Icon Badge (Circular) */}
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-white text-[#e97f7b] shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                            : 'bg-white/10 text-white group-hover:bg-white/20'
                                    }`}>
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    {/* Link Text */}
                                    <span className={`font-['Quicksand'] text-lg md:text-2xl transition-colors duration-300 ${
                                        isActive
                                            ? 'text-white !text-white font-bold'
                                            : 'text-white/60 !text-white/60 font-medium group-hover:text-white/80'
                                    }`}>
                                        {item.text}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* IMAGE SIDE (Interactive Crossfade Gallery - Uncurved) */}
                <div
                    ref={imageRef}
                    className="order-1 lg:order-2 relative h-[450px] md:h-[600px] w-full overflow-hidden rounded-none shadow-[0_20px_50px_rgba(21,40,61,0.2)] bg-[#cf6562]"
                >
                    <div className="relative w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]">
                        {interactiveItems.map((item, i) => (
                            <img
                                key={i}
                                src={item.image}
                                alt={`Learning through ${item.text}`}
                                // Layered absolutely. Only the active index gets full opacity and top z-index.
                                className={`parallax-img absolute h-[120%] -top-[10%] left-0 w-full object-cover will-change-transform contrast-[1.05] transition-opacity duration-700 ease-in-out ${activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* =========================================================
                BOTTOM THESIS (One-Shot Typesetting)
            ========================================================= */}
            <div ref={textRef} className="max-w-4xl mx-auto text-center mt-16 md:mt-24 pt-10 border-t border-white/20 w-full">
                <p className="font-['Quicksand'] font-bold text-white !text-white text-xl md:text-2xl leading-snug drop-shadow-sm">
                    {renderWords("The materials become tools that help children make sense of the world around them.")}
                </p>
            </div>

        </section>
    )
}