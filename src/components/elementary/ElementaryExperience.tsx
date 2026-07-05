import { useEffect, useRef } from 'react'
import { Compass, Star, Palette, Telescope, Lightbulb, Pencil, Sparkles, BookOpen, Microscope, Atom } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryExperience() {
    const sectionRef = useRef<HTMLElement>(null)
    const softboardRef = useRef<HTMLDivElement>(null)
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

            // 2. One-Shot Mechanical Typesetting
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

            // 3. The Softboard "Pinning", Clip Art, and Wind Physics
            if (softboardRef.current) {
                const board = softboardRef.current;
                const photos = board.querySelectorAll('.softboard-photo');
                const cliparts = board.querySelectorAll('.clipart-item');

                gsap.fromTo(board,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: board, start: 'top 80%' } }
                );

                // Physical "Stamp/Pin" effect for the polaroids
                gsap.fromTo(
                    photos,
                    { opacity: 0, scale: 1.3, rotation: (i) => [-15, 10, -5][i % 3] },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: (i: number) => [-6, 4, -3][i % 3], // Resting pin angles
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'back.out(1.8)',
                        scrollTrigger: { trigger: board, start: 'top 75%' },
                        onComplete: function() {
                            // Removed infinite GSAP Wind Physics loop to improve performance
                            // Instead, relying solely on the CSS hover effects which are hardware accelerated
                        }
                    }
                );

                // Springy pop-in for the decorative clip art
                gsap.fromTo(
                    cliparts,
                    { opacity: 0, scale: 0, rotation: 180 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: (i: number) => [-15, 20, -25, 12][i % 4],
                        duration: 1,
                        stagger: 0.15,
                        ease: 'elastic.out(1, 0.6)',
                        scrollTrigger: { trigger: board, start: 'top 65%' }
                    }
                );
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const softboardImages = [
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270261/648199744_1519242356876029_5716534411369876124_n_pxkxeq.jpg', title: 'Performances' },
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270281/499711629_1251023857031215_8399418256028210795_n_qaflzs.jpg', title: 'Reading Carnival' },
        { src: 'https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270296/496003952_1242816021185332_8452547634888452440_n_m470e3.jpg', title: 'Project-Based Learning' },
    ]

    const badges = [
        { text: 'Reading Carnival', icon: BookOpen },
        { text: 'Annual Performances', icon: Star },
        { text: 'Sports Day', icon: Compass },
        { text: 'Sustainability Initiatives', icon: Sparkles },
        { text: 'Field Trips', icon: Telescope },
        { text: 'Project-Based Learning', icon: Microscope }
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em]">
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
                <div ref={contentRef} className="flex flex-col items-center max-w-4xl">

                    <div className="gsap-stagger-item flex items-center justify-center gap-3 mb-6">
                        <Compass className="w-5 h-5 text-[#ffb288] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            LEARNING THROUGH EXPERIENCE
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#15283D] !text-[#15283D] mb-8 leading-[1.05]">
                        Where Knowledge Comes to <em className="font-medium italic text-[#ffb288] !text-[#ffb288]">Life</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffb288] mb-10 mx-auto" />

                    <p className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] leading-[1.65] font-medium mb-12 max-w-3xl">
                        Throughout the year, students participate in opportunities that connect learning to the real world. These moments encourage students to apply their learning, communicate their ideas, work collaboratively, and step outside their comfort zones.
                    </p>

                    {/* TACTILE PILL BADGES */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-14 max-w-4xl">
                        {badges.map((badge, i) => (
                            <div
                                key={i}
                                className="gsap-stagger-item group relative flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-[#15283D]/10 shadow-[0_4px_10px_rgba(21,40,61,0.04)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_25px_rgba(51,74,137,0.15)] hover:border-[#334a89]/30 cursor-default"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#15283D]/5 text-[#334a89] !text-[#334a89] flex items-center justify-center transition-all duration-300 group-hover:bg-[#334a89] group-hover:border-[#334a89] group-hover:text-white group-hover:!text-white group-hover:rotate-12 shrink-0">
                                    <badge.icon className="w-4 h-4" strokeWidth={2.5} />
                                </div>
                                <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#15283D] !text-[#15283D] transition-colors duration-300 group-hover:text-[#334a89] group-hover:!text-[#334a89] mt-0.5">
                                    {badge.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ONE-SHOT TYPESETTING THESIS */}
                    <div ref={textRef} className="gsap-stagger-item w-full pb-8">
                        <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-[#334a89] !text-[#334a89]">
                            {renderWords("Because confidence grows when children actively participate rather than simply observe.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    VISUAL SYSTEM (Light Blue Softboard & Clip Art)
                ========================================================= */}
                <div ref={softboardRef} className="relative w-full max-w-[1100px] mx-auto mt-12 md:mt-20">

                    {/* The Board Container */}
                    <div className="relative w-full bg-[#E8EEF5] rounded-[32px] md:rounded-[48px] border-[12px] md:border-[16px] border-[#A1B4C9] p-10 md:p-16 lg:p-24 shadow-[inset_0_15px_40px_rgba(51,74,137,0.08),_0_25px_50px_rgba(21,40,61,0.1)] overflow-hidden">

                        {/* Softboard Fabric Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

                        {/* Decorative Classroom Clip Art */}
                        <Palette className="clipart-item absolute top-6 left-6 md:top-10 md:left-12 w-12 h-12 md:w-16 md:h-16 text-[#ffc715] opacity-80" strokeWidth={1.5} />
                        <Telescope className="clipart-item absolute bottom-8 left-8 md:bottom-12 md:left-16 w-14 h-14 md:w-20 md:h-20 text-[#6ab39d] opacity-80" strokeWidth={1.5} />
                        <Lightbulb className="clipart-item absolute top-8 right-8 md:top-12 md:right-16 w-10 h-10 md:w-14 md:h-14 text-[#e97f7b] opacity-80" strokeWidth={1.5} />
                        <Pencil className="clipart-item absolute bottom-10 right-6 md:bottom-14 md:right-12 w-12 h-12 md:w-16 md:h-16 text-[#334a89] opacity-80" strokeWidth={1.5} />
                        <Atom className="clipart-item absolute top-1/2 left-4 md:left-10 w-10 h-10 md:w-12 md:h-12 text-[#ffb288] opacity-70" strokeWidth={1.5} />

                        {/* Polaroids Container */}
                        <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-12 justify-center relative z-10">
                            {softboardImages.map((img, i) => (
                                <div
                                    key={i}
                                    // transformOrigin locked to center-top so the GSAP wind physics swing accurately from the pin
                                    className="softboard-photo relative flex flex-col items-center transform-gpu group cursor-pointer hover:z-50"
                                    style={{ transformOrigin: 'center 0px' }}
                                >
                                    {/* 3D Pushpin (Unpinning Physics: Pulls up and away on hover) */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-3 group-hover:scale-110">
                                        <div className="w-6 h-6 rounded-full bg-[#e97f7b] shadow-[0_6px_12px_rgba(21,40,61,0.3)] border-2 border-white/40 relative">
                                            <div className="absolute top-1 left-1 w-2 h-2 bg-white/80 rounded-full" />
                                        </div>
                                        {/* The Needle */}
                                        <div className="w-[3px] h-4 bg-gray-300 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] shadow-sm" />
                                    </div>

                                    {/* Polaroid Frame (Unpinning Physics: Slides down, straightens out, massive shadow) */}
                                    <div className="relative z-30 w-44 sm:w-56 md:w-64 bg-white p-3 pb-10 md:p-4 md:pb-14 shadow-[0_15px_35px_rgba(21,40,61,0.12)] rounded-sm transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-8 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_40px_70px_rgba(21,40,61,0.25)]">
                                        <div className="w-full aspect-square bg-gray-100 overflow-hidden shadow-inner border border-black/5">
                                            <img
                                                src={img.src}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center px-2">
                                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm text-[#15283D] !text-[#15283D]">
                                                {img.title}
                                            </span>
                                        </div>
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