import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, CheckCircle2, Sparkles, TrendingUp, Users, Heart, Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function AdmissionsCriteria() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Staggered Content Fade-Up (Left Side)
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%'
                        }
                    }
                )
            }

            // 2. The Dossier Card Entrance (Right Side)
            if (cardRef.current) {
                gsap.fromTo(cardRef.current,
                    { opacity: 0, scale: 0.95, y: 60 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.2,
                        ease: 'back.out(1.05)',
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: 'top 80%'
                        }
                    }
                )

                // Stagger the document list items inside the card
                const docItems = cardRef.current.querySelectorAll('.doc-item')
                gsap.fromTo(docItems,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: 'top 75%'
                        }
                    }
                )
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

    const qualities = [
        { text: "Curiosity and a willingness to learn", icon: Sparkles },
        { text: "Positive attitudes toward growth and development", icon: TrendingUp },
        { text: "Respectful and collaborative behaviour", icon: Users },
        { text: "Family commitment to the child's educational journey", icon: Heart },
        { text: "Alignment with the values and culture of the school", icon: Compass }
    ]

    const documents = [
        "Child's Birth Certificate",
        "B-Form / Identification Documents",
        "Recent Passport-Size Photographs",
        "Previous School Reports (where applicable)",
        "School Leaving Certificate (where applicable)",
        "Parent/Guardian CNIC Copies",
        "Any additional documentation requested"
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-white overflow-hidden border-t border-[#15283D]/5 select-none">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-start">

                {/* =========================================================
                    LEFT COLUMN: THE PHILOSOPHY (6 Cols)
                ========================================================= */}
                <div ref={contentRef} className="lg:col-span-6 flex flex-col pr-0 lg:pr-12">

                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <Compass className="w-5 h-5 text-[#334a89] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            WHAT WE LOOK FOR
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] !text-[#15283D] leading-[1.05] mb-8 tracking-tight">
                        Building Strong School-Family <em className="italic text-[#334a89] !text-[#334a89]">Partnerships</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#334a89] mb-10 shadow-sm" />

                    <div className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] font-medium leading-[1.65] space-y-6">
                        <p>
                            Admissions decisions are not based solely on academic performance.
                        </p>
                        <p>
                            We seek students and families who will thrive within the Aster community and embrace our values of excellence, resilience, and humility. We look for:
                        </p>
                    </div>

                    {/* Interactive Tactile Rows */}
                    <div className="gsap-stagger-item mt-10 space-y-2">
                        {qualities.map((item, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-5 p-4 rounded-[16px] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#FAFAFA] hover:translate-x-2 cursor-default"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#ffc715]/20 border border-[#15283D]/5">
                                    <item.icon className="w-5 h-5 text-[#334a89] transition-colors duration-300 group-hover:text-[#d69f18]" strokeWidth={2} />
                                </div>
                                <span className="font-['Quicksand'] font-bold text-base md:text-lg text-[#15283D] !text-[#15283D]">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item mt-10 pt-8 border-t border-[#15283D]/10">
                        <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#334a89] !text-[#334a89] leading-[1.4]">
                            {renderWords("Every child is unique, and we take a holistic approach when considering applications.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: THE DOSSIER CARD (5 Cols, offset by 1)
                ========================================================= */}
                <div className="lg:col-span-5 lg:col-start-8 w-full mt-8 lg:mt-0 relative z-10">
                    <div
                        ref={cardRef}
                        className="bg-[#334a89] p-10 md:p-14 rounded-[32px] md:rounded-[40px] relative overflow-hidden group
                        shadow-[inset_0_2px_0_rgba(255,255,255,0.2),_0_30px_60px_rgba(51,74,137,0.25)] transition-shadow duration-500 hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),_0_40px_80px_rgba(51,74,137,0.35)]"
                    >
                        {/* Giant Ghosted Watermark */}
                        <FileText
                            className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-[0.03] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12"
                            strokeWidth={1}
                        />

                        {/* Top Right Corner Fold Accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent opacity-50 rounded-tr-[32px] md:rounded-tr-[40px] pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-white !text-white mb-6 tracking-tight">
                                Required Documents
                            </h3>

                            <p className="font-['Quicksand'] text-white/90 !text-white/90 text-base md:text-lg font-medium mb-10 leading-[1.6]">
                                To begin the admissions process, families may be asked to provide:
                            </p>

                            <ul className="space-y-5">
                                {documents.map((doc, i) => (
                                    <li key={i} className="doc-item flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-[#ffc715] shrink-0 mt-0.5" strokeWidth={2.5} />
                                        <span className="font-['Quicksand'] font-bold text-lg text-white !text-white leading-[1.4]">
                                            {doc}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-white/15">
                                <p className="font-['Quicksand'] font-medium text-sm text-white/60 !text-white/60 leading-[1.6]">
                                    <strong className="text-[#ffc715]">Note:</strong> Specific requirements may vary depending on grade level and current admissions stage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}