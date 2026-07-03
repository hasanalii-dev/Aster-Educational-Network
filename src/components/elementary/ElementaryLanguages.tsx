import { useEffect, useRef } from 'react'
import { Globe2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryLanguages() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
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
                            start: 'top 85%',
                        }
                    }
                )
            }

            // 2. One-Shot Mechanical Typesetting (Thesis Statement)
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

    const languages = [
        {
            name: 'English',
            nativeName: 'EN',
            desc: 'For literacy, communication, and global readiness.',
            color: 'text-[#334a89]',
            bg: 'bg-[#334a89]',
            hex: '#334a89'
        },
        {
            name: 'Urdu',
            nativeName: 'اردو',
            desc: 'To strengthen cultural identity and expression.',
            color: 'text-[#e97f7b]',
            bg: 'bg-[#e97f7b]',
            hex: '#e97f7b'
        },
        {
            name: 'Arabic',
            nativeName: 'العربية',
            desc: "As a compulsory language and a gateway to understanding the Holy Qur'an.",
            color: 'text-[#6ab39d]',
            bg: 'bg-[#6ab39d]',
            hex: '#6ab39d'
        },
        {
            name: 'Mandarin',
            nativeName: '中文',
            desc: 'As an additional language option that expands global perspectives.',
            color: 'text-[#ffb288]',
            bg: 'bg-[#ffb288]',
            hex: '#ffb288'
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
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] select-none overflow-hidden border-t border-[#15283D]/5">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">

                {/* =========================================================
                    CONTENT & THESIS
                ========================================================= */}
                <div ref={contentRef} className="flex flex-col items-center w-full">

                    {/* Square Bullet Label */}
                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <Globe2 className="w-5 h-5 text-[#9765d1]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            ENGLISH, URDU, ARABIC, AND MANDARIN
                        </span>
                    </div>

                    {/* Aster Split Motif */}
                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] !text-[#15283D] mb-8 leading-[1.05]">
                        Opening Doors through <em className="font-medium italic text-[#9765d1] !text-[#9765d1]">Language</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#9765d1] mb-10 mx-auto" />

                    <p className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] leading-[1.65] font-medium mb-16 max-w-3xl">
                        Children are naturally receptive to language learning, making the Elementary years an ideal time to develop strong communication skills and global awareness.
                    </p>

                    {/* =========================================================
                        THE LANGUAGE GRID (Tactile, Watermarked Cards)
                    ========================================================= */}
                    <div className="gsap-stagger-item w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 text-left">
                        {languages.map((lang, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden bg-white p-8 md:p-10 rounded-[24px] shadow-[0_15px_40px_rgba(21,40,61,0.06)] border border-[#15283D]/5 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(21,40,61,0.12)] cursor-default"
                            >
                                {/* Giant Ghosted Native Script Watermark - Opacity increased to 20% */}
                                <div
                                    className="absolute -bottom-8 -right-4 text-[140px] md:text-[180px] font-black leading-none opacity-20 pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ color: lang.hex }}
                                >
                                    {lang.nativeName}
                                </div>

                                {/* Structural Color Bar */}
                                <div className={`absolute top-0 left-0 w-full h-1.5 ${lang.bg} opacity-80`} />

                                <div className="relative z-10 flex flex-col h-full justify-start">
                                    <h3 className={`font-['Quicksand'] text-3xl md:text-4xl font-bold ${lang.color} !${lang.color} mb-4`}>
                                        {lang.name}
                                    </h3>
                                    <p className="font-['Quicksand'] text-[#5C5C61] !text-[#5C5C61] font-medium leading-[1.6] text-lg max-w-[85%]">
                                        {lang.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* =========================================================
                        SUPPORTING PROSE & THESIS
                    ========================================================= */}
                    <div className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] font-medium space-y-6 max-w-4xl text-center md:text-left mx-auto mb-10 p-8 md:p-12 bg-white rounded-[32px] shadow-[0_10px_30px_rgba(21,40,61,0.04)] border border-[#15283D]/5">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                            {/* Accent Quote Mark */}
                            <div className="hidden md:flex text-[#6ab39d] opacity-20 text-6xl font-['Playfair_Display'] leading-none">
                                "
                            </div>

                            <div className="space-y-6">
                                <p>
                                    <strong className="text-[#334a89] !text-[#334a89]">Arabic holds a special place within the Aster experience.</strong> As the language of Islam and the Holy Qur'an, it helps students build a deeper connection with their faith while developing skills in reading, writing, speaking, and comprehension.
                                </p>
                                <p>
                                    Beyond language lessons, students regularly express themselves through presentations, storytelling, discussions, and performances, helping them become confident communicators who can engage with the world around them.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item w-full pt-8">
                        <p className="font-['Quicksand'] font-bold text-xl md:text-2xl lg:text-[26px] text-[#334a89] !text-[#334a89]">
                            {renderWords("Every new language opens a new way of thinking, connecting, and understanding the world.")}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}