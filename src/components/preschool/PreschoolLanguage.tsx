import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, MessageCircle, BookMarked, Languages, Palette, Mic } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolLanguage() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
                        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
                    }
                )
            }

            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                    }
                )

                const imgElement = imageRef.current.querySelector('img')
                if (imgElement) {
                    gsap.fromTo(
                        imgElement,
                        { yPercent: -8, scale: 1.05 },
                        {
                            yPercent: 8, scale: 1.05, ease: 'none',
                            scrollTrigger: { trigger: imageRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
                        }
                    )
                }
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const bulletItems = [
        { text: 'Storytelling', icon: BookOpen },
        { text: 'Conversations', icon: MessageCircle },
        { text: 'Reading readiness', icon: BookMarked },
        { text: 'Vocabulary development', icon: Languages },
        { text: 'Creative expression', icon: Palette },
        { text: 'Public speaking experiences', icon: Mic },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none relative z-10">
            {/* TOP LINTEL: SCALLOPED DIE-CUT PAPER CLOUD BORDER (White, pointing UP) */}
            <div className="absolute top-0 left-0 right-0 h-8 md:h-12 text-white pointer-events-none z-20 transform -translate-y-full">
                <svg className="w-full h-full transform -scale-y-100" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Content Side */}
                <div ref={contentRef} className="flex flex-col">
                    <div className="gsap-stagger-item flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <BookOpen className="w-5 h-5 text-[#9765d1] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5 text-left lg:text-left">
                            LANGUAGE, LITERACY & COMMUNICATION
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-8 leading-[1.05]">
                        The Power of <em className="font-medium italic text-[#9765d1]">Words</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#9765d1] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-[1.65] font-medium mb-10">
                        <p className="gsap-stagger-item">
                            Language development is woven throughout the Preschool experience.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] text-lg md:text-xl pt-2">
                            Children engage in rich opportunities for:
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {bulletItems.map((item, i) => (
                            <div
                                key={i}
                                className="gsap-stagger-item group relative overflow-hidden rounded-[16px] px-5 py-3 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 bg-[#9765d1]"
                            >
                                <item.icon className="absolute -bottom-4 -right-4 w-16 h-16 pointer-events-none text-white/10 transition-transform duration-700 group-hover:scale-110" strokeWidth={1} />
                                <div className="relative z-10 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                                    <item.icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                                </div>
                                <span className="relative z-10 font-['Quicksand'] font-bold text-sm md:text-base text-white">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="gsap-stagger-item pt-6 border-t border-[#9765d1]/15">
                        <p className="font-['Quicksand'] font-bold text-[#334a89] text-lg md:text-xl leading-snug">
                            As confidence grows, children learn to communicate their thoughts clearly, listen respectfully, and express themselves with increasing independence.
                        </p>
                    </div>
                </div>

                {/* Image Side */}
                <div
                    ref={imageRef}
                    className="relative h-[500px] md:h-[640px] w-full overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783268219/1000554765_n2ezp8.jpg"
                        alt="Children engaged in storytelling and language activities"
                        className="w-full h-full object-cover will-change-transform contrast-[1.02]"
                    />
                </div>

            </div>

            {/* BOTTOM LINTEL: SCALLOPED DIE-CUT BORDER (White, pointing DOWN) */}
            <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 text-white pointer-events-none z-20 transform translate-y-full">
                <svg className="w-full h-full" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </section>
    )
}

