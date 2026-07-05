import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Timer, Smile, Sparkles, Trophy, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolPace() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const clotheslineRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Standard Entrance (Staggered Fade-Up)
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
                        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
                    }
                )
            }

            // 2. One-Shot Mechanical Typesetting (For the final thesis)
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

            // 3. Clothesline Images (Entrance + Continuous Sway)
            if (clotheslineRef.current) {
                const photos = clotheslineRef.current.querySelectorAll('.clothesline-photo')
                gsap.fromTo(
                    photos,
                    { opacity: 0, rotation: -20, y: -40 },
                    {
                        opacity: 1,
                        rotation: (i: number) => [-4, 3, -2][i % 3],
                        y: 0,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: { trigger: clotheslineRef.current, start: 'top 80%' },
                        onComplete: function() {
                            // Infinite subtle sway physics after drop-in (simplified to reduce CPU)
                            this.targets().forEach((target: any) => {
                                gsap.to(target, {
                                    rotation: 3,
                                    duration: 3 + Math.random(),
                                    ease: "sine.inOut",
                                    yoyo: true,
                                    repeat: -1
                                })
                            })
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const bulletItems = [
        { text: 'Develop confidence in their abilities', icon: Smile },
        { text: 'Build a positive relationship with learning', icon: Sparkles },
        { text: 'Experience success through effort and discovery', icon: Trophy },
        { text: 'Become independent and self-motivated learners', icon: Rocket },
    ]

    const clotheslineImages = [
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783268123/1000555029_nahmce.jpg', alt: 'Child learning at own pace' },
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783268136/1000555032_jcl5td.jpg', alt: 'Student exploring independently' },
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783268166/1000555039_rua52l.jpg', alt: 'Child discovering through play' },
    ]

    // Helper for One-Shot Typesetting
    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none overflow-hidden">
            <div className="max-w-[1000px] mx-auto flex flex-col items-center">

                {/* =========================================================
                    CONTENT & THESIS (Centered)
                ========================================================= */}
                <div ref={contentRef} className="flex flex-col items-center text-center w-full max-w-4xl">

                    {/* Square Bullet Label */}
                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <Timer className="w-5 h-5 text-[#6ab39d] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            LEARNING AT THEIR OWN PACE
                        </span>
                    </div>

                    {/* Aster Split Motif (Zero Black) */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] !text-[#15283D] mb-8 leading-[1.05]">
                        Every Journey is <em className="font-medium italic text-[#6ab39d] !text-[#6ab39d]">Unique</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#6ab39d] mb-10 mx-auto" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] space-y-6 leading-[1.65] font-medium mb-10">
                        <p className="gsap-stagger-item">
                            No two children learn in exactly the same way.
                        </p>
                        <p className="gsap-stagger-item">
                            At Aster, we recognize and respect individual developmental journeys. Children are given the time, space, and guidance to progress according to their readiness rather than being rushed through a standardized pace.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] !text-[#334a89] text-lg md:text-xl pt-2">
                            This approach helps children:
                        </p>
                    </div>

                    {/* Feature Cards (Retained user's rounded-[16px] shape override) */}
                    <div className="flex flex-wrap justify-center gap-4 mb-14">
                        {bulletItems.map((item, i) => (
                            <div
                                key={i}
                                className="gsap-stagger-item group relative overflow-hidden rounded-[16px] px-5 py-3 shadow-[0_4px_15px_rgba(106,179,157,0.15)] hover:shadow-[0_10px_25px_rgba(106,179,157,0.25)] transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 bg-[#6ab39d]"
                            >
                                <item.icon className="absolute -bottom-4 -right-4 w-16 h-16 pointer-events-none text-white/10 transition-transform duration-700 group-hover:scale-110" strokeWidth={1} />
                                <div className="relative z-10 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                                    <item.icon className="w-3.5 h-3.5 text-white !text-white" strokeWidth={2} />
                                </div>
                                <span className="relative z-10 font-['Quicksand'] font-bold text-sm md:text-base text-white !text-white">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* The One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item pt-6 border-t border-[#6ab39d]/15 w-full">
                        <p className="font-['Quicksand'] font-bold text-[#334a89] !text-[#334a89] text-lg md:text-xl leading-snug">
                            {renderWords("Because meaningful growth happens when children feel capable, supported, and understood.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    VISUAL SYSTEM (Clothesline below content)
                ========================================================= */}
                <div ref={clotheslineRef} className="relative w-full mt-20 md:mt-28 flex flex-col items-center justify-center pt-8">
                    <div className="relative w-full max-w-4xl mx-auto">

                        {/* The String Line (Expanded across the container) */}
                        <div className="absolute top-1 left-0 right-0 h-[2px] bg-[#334a89]/15 shadow-sm rounded-full" />

                        {/* Photos hanging from the clothesline */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">
                            {clotheslineImages.map((img, i) => (
                                <div
                                    key={i}
                                    className="clothesline-photo relative flex flex-col items-center will-change-transform"
                                    style={{ transformOrigin: 'top center' }}
                                >
                                    {/* Clothespin */}
                                    <div className={`relative z-20 w-4 h-8 flex-col items-center ${i === 0 ? 'flex' : 'hidden md:flex'}`}>
                                        <div className="w-3 h-3 rounded-full bg-[#e97f7b] border-2 border-[#cf6562] shadow-sm" />
                                        <div className="w-[2px] h-5 bg-[#e97f7b]/60" />
                                    </div>

                                    {/* Photo Container */}
                                    <div className={`relative w-48 sm:w-56 md:w-56 aspect-[3/4] rounded-lg bg-white border-[4px] border-white shadow-[0_12px_30px_rgba(21,40,61,0.12)] overflow-hidden cursor-pointer group transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(21,40,61,0.2)] hover:scale-[1.03] ${i !== 0 ? 'mt-0 md:-mt-1' : '-mt-1'}`}>
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}
