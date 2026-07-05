import { useEffect, useRef } from 'react'
import { Leaf, Sprout, TreePine, Recycle, Globe, HeartHandshake } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementarySustainability() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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

            // 2. Cinematic Image Reveal & Parallax Scrub
            if (imageRef.current) {
                // The Mask Reveal
                gsap.fromTo(
                    imageRef.current,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.5,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                    }
                )

                // The Physics Scrub
                const imgElement = imageRef.current.querySelector('img')
                if (imgElement) {
                    gsap.fromTo(
                        imgElement,
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

            // 3. One-Shot Mechanical Typesetting (Thesis Statement)
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

    const points = [
        { text: 'Care for living things', icon: Sprout },
        { text: 'Respect the natural environment', icon: TreePine },
        { text: 'Take responsibility for their actions', icon: Recycle },
        { text: 'Understand sustainable practices', icon: Globe },
        { text: 'Contribute positively to communities', icon: HeartHandshake }
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em]">
                {word}
            </span>
        ))
    }

    return (
        /* Deep Forest Green Background with Sage Selection Text */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#486D5B] selection:bg-[#DDEAE4] selection:text-[#486D5B] select-none overflow-hidden border-t border-white/5">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

                {/* =========================================================
                    CONTENT SIDE (Left - 7 cols)
                ========================================================= */}
                <div ref={contentRef} className="lg:col-span-7 flex flex-col order-2 lg:order-1">

                    {/* Square Bullet Label */}
                    <div className="gsap-stagger-item flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <Leaf className="w-5 h-5 text-[#DDEAE4] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#DDEAE4] !text-[#DDEAE4] uppercase mt-0.5 text-center lg:text-left">
                            SUSTAINABILITY IN ACTION
                        </span>
                    </div>

                    {/* Aster Split Motif (White Text, Aster Yellow Italic) */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white !text-white mb-8 leading-[1.05] text-center lg:text-left">
                        Learning to Care for the <em className="font-medium italic text-[#ffc715] !text-[#ffc715]">World Around Them</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10 shadow-sm mx-auto lg:mx-0" />

                    <p className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#DDEAE4]/90 !text-[#DDEAE4]/90 leading-[1.65] font-medium mb-10 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                        Children inherit the future, and they deserve opportunities to understand their role within it. Through intentional learning, we help them build a relationship with nature.
                    </p>

                    {/* UPGRADED CARDS: Soft Light Green with Dark Forest Text */}
                    <div className="gsap-stagger-item flex flex-col gap-3 mb-12 max-w-2xl mx-auto lg:mx-0 w-full">
                        {points.map((point, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-4 py-3 px-5 rounded-[12px] bg-[#DDEAE4] shadow-[0_4px_10px_rgba(21,40,61,0.1)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_12px_25px_rgba(21,40,61,0.2)] hover:-translate-y-1 hover:bg-white cursor-default"
                            >
                                {/* Inverted Icon Box */}
                                <div className="w-8 h-8 rounded-full bg-[#486D5B] flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110">
                                    <point.icon className="w-4 h-4 text-[#DDEAE4] transition-colors duration-500 group-hover:text-white" strokeWidth={2.5} />
                                </div>
                                <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#1A2F25] !text-[#1A2F25]">
                                    {point.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item pt-8 border-t border-white/20 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                        <p className="font-['Quicksand'] text-lg md:text-xl font-bold text-white !text-white leading-[1.6] mb-4 drop-shadow-sm">
                            {renderWords("Whether through gardening, conservation projects, or hands-on exploration, students learn that even small actions can create positive change.")}
                        </p>
                        <p className="font-['Quicksand'] text-lg md:text-xl font-bold text-[#ffc715] !text-[#ffc715] leading-[1.6] drop-shadow-sm">
                            {renderWords("These experiences nurture thoughtful individuals who understand that leadership begins with responsibility.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    IMAGE SIDE (Right - 5 cols, Cinematic Parallax, Uncurved)
                ========================================================= */}
                <div className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                    <div
                        ref={imageRef}
                        // UNCURVED: rounded-none applied. Highly responsive sizing logic.
                        className="relative w-full max-w-md lg:max-w-none aspect-[4/5] md:aspect-[3/4] lg:min-h-[750px] overflow-hidden bg-[#1A2F25] rounded-none shadow-[0_25px_60px_rgba(21,40,61,0.4)] border-[8px] md:border-[12px] border-[#DDEAE4]/10 group cursor-pointer"
                    >
                        {/* Nested wrapper for CSS hover scale, protecting the GSAP Y-axis scrub */}
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                            <img
                                // Reliable Unsplash image URL
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270372/473127865_1676555299592329_7824417284584904866_n_atdak9.jpg"
                                className="absolute h-[120%] -top-[10%] w-full object-cover will-change-transform"
                            />
                        </div>

                        {/* Premium inner shadow/vignette overlay */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] mix-blend-multiply" />
                    </div>
                </div>

            </div>
        </section>
    )
}