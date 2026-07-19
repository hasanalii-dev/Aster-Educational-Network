import { useEffect, useRef } from 'react'
import { Trophy } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementarySports() {
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

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em]">
                {word}
            </span>
        ))
    }

    return (
        /* Red Background with inverted selection colors for contrast */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#e97f7b] selection:bg-white selection:text-[#e97f7b] select-none overflow-hidden border-t border-white/10">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

                {/* =========================================================
                    CONTENT SIDE (Left - 7 cols)
                ========================================================= */}
                <div ref={contentRef} className="lg:col-span-7 flex flex-col order-2 lg:order-1">

                    {/* Square Bullet Label (Inverted to White) */}
                    <div className="gsap-stagger-item flex items-center justify-start gap-3 mb-6">
                        <Trophy className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-white !text-white uppercase mt-0.5">
                            SPORTS EXCELLENCE AT ASTER
                        </span>
                    </div>

                    {/* Aster Split Motif (White Text, Aster Yellow Italic) */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white !text-white mb-8 leading-[1.05]">
                        Building Discipline through <em className="font-medium italic text-[#ffc715] !text-[#ffc715]">Movement</em>
                    </h2>

                    {/* Divider (Aster Yellow) */}
                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10 shadow-sm" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-white/95 !text-white space-y-6 leading-[1.65] font-medium mb-10 max-w-2xl">
                        <p className="gsap-stagger-item text-xl font-bold text-white !text-white">
                            At Aster, sports are not co-curricular—they are character in motion.
                        </p>
                        <p className="gsap-stagger-item">
                            Through swimming, football, gymnastics, taekwondo, and competitive sporting opportunities, students develop:
                        </p>
                    </div>

                    {/* Upgraded Dynamic Color-Shifting Badges
                        Resting: White BG, Red Text.
                        Hover: Yellow BG, Navy Text.
                    */}
                    <div className="gsap-stagger-item flex flex-wrap gap-3 md:gap-4 mb-12 max-w-2xl">
                        {['Discipline', 'Resilience', 'Teamwork', 'Leadership', 'Confidence', 'Excellence through effort'].map((trait, index) => (
                            <span
                                key={index}
                                className="bg-white text-[#e97f7b] !text-[#e97f7b] px-6 py-2.5 rounded-full font-['Quicksand'] font-bold text-sm shadow-[0_4px_12px_rgba(21,40,61,0.08)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:bg-[#ffc715] hover:!text-[#15283D] hover:shadow-[0_12px_25px_rgba(21,40,61,0.15)] cursor-default"
                            >
                                {trait}
                            </span>
                        ))}
                    </div>

                    {/* One-Shot Typesetting Thesis (Inverted to White) */}
                    <div ref={textRef} className="gsap-stagger-item pt-8 border-t border-white/20 max-w-2xl">
                        <p className="font-['Quicksand'] text-lg md:text-xl font-bold text-white !text-white leading-[1.6] mb-4 drop-shadow-sm">
                            {renderWords("Every practice session, every challenge, and every competition becomes an opportunity to develop focus, teamwork, leadership, perseverance, and self-belief because excellence is built through consistent effort, purposeful training, and the mindset our students carry with them every day.")}
                        </p>
                        <p className="font-['Quicksand'] text-lg md:text-xl font-bold text-white !text-white leading-[1.6] drop-shadow-sm">
                            {renderWords("At Aster, we develop athletes, leaders, and resilient individuals who learn to do whatever it takes to reach their potential")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    IMAGE SIDE (Right - 5 cols, Raw Cinematic Parallax)
                ========================================================= */}
                <div className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                    <div
                        ref={imageRef}
                        className="relative w-full max-w-md lg:max-w-none aspect-[4/5] md:aspect-[3/4] lg:min-h-[750px] overflow-hidden bg-white/5 rounded-none border-none shadow-[0_20px_50px_rgba(21,40,61,0.15)] group cursor-pointer"
                    >
                        {/* Nested wrapper for CSS hover scale, protecting the GSAP Y-axis scrub */}
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                            <img
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270480/490533054_1216868483780086_7902214002359124603_n_xgk1jy.jpg"
                                alt="Sports Excellence"
                                className="absolute h-[120%] -top-[10%] w-full object-cover will-change-transform"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}