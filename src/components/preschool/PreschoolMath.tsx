import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, Hash, BrainCircuit, Lightbulb, Shapes, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolMath() {
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
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
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
        { text: 'Number sense', icon: Hash },
        { text: 'Logical thinking', icon: BrainCircuit },
        { text: 'Problem-solving skills', icon: Lightbulb },
        { text: 'Pattern recognition', icon: Shapes },
        { text: 'Mathematical confidence', icon: Award },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] select-none overflow-hidden border-t border-[#ffb288]/10">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Image Side */}
                <div
                    ref={imageRef}
                    className="order-2 lg:order-1 relative h-[500px] md:h-[640px] w-full overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783268262/1000555031_brwcww.jpg"
                        alt="Children learning mathematics with hands-on materials"
                        className="w-full h-full object-cover will-change-transform contrast-[1.02]"
                    />
                </div>

                {/* Content Side */}
                <div ref={contentRef} className="order-1 lg:order-2 flex flex-col">
                    <div className="gsap-stagger-item flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <Calculator className="w-5 h-5 text-[#ffb288] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5 text-left lg:text-left">
                            MATHEMATICS THROUGH DISCOVERY
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-8 leading-[1.05]">
                        Numbers Come <em className="font-medium italic text-[#ffb288]">Alive</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffb288] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] space-y-6 leading-[1.65] font-medium mb-10">
                        <p className="gsap-stagger-item">
                            Mathematics is introduced through hands-on materials that allow children to see and experience mathematical concepts in meaningful ways.
                        </p>
                        <p className="gsap-stagger-item font-bold text-[#334a89] text-lg md:text-xl pt-2">
                            Through exploration and guided discovery, children develop:
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {bulletItems.map((item, i) => {
                            const isDark = i % 2 === 0
                            return (
                                <div
                                    key={i}
                                    className={`gsap-stagger-item group relative overflow-hidden rounded-[16px] px-5 py-3 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 ${
                                        isDark ? 'bg-[#334a89]' : 'bg-[#FFC51B]'
                                    }`}
                                >
                                    <item.icon className="absolute -bottom-4 -right-4 w-16 h-16 pointer-events-none text-white/5 transition-transform duration-700 group-hover:scale-110" strokeWidth={1} />
                                    <div className="relative z-10 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                                    </div>
                                    <span className="relative z-10 font-['Quicksand'] font-bold text-sm md:text-base text-white">
                                        {item.text}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="gsap-stagger-item pt-6 border-t border-[#ffb288]/15">
                        <p className="font-['Quicksand'] font-bold text-[#334a89] text-lg md:text-xl leading-snug">
                            Learning becomes a process of understanding rather than memorization.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

