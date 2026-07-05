import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, ShieldCheck, HeartPulse, Brain, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function CommunityWorkshops() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const boardRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Staggered Content Fade-Up
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
                            trigger: sectionRef.current,
                            start: 'top 75%'
                        }
                    }
                )
            }

            // 2. The Pinboard Image Entrances & REAL Pendulum Wind Physics
            if (boardRef.current) {
                const windWrappers = boardRef.current.querySelectorAll('.board-pin-wind')

                // First: The Entrance Animation
                gsap.fromTo(windWrappers,
                    { opacity: 0, scale: 0.8, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: boardRef.current,
                            start: 'top 70%'
                        },
                        // Second: Trigger the continuous pendulum sway ONLY after they enter
                        onComplete: () => {
                            windWrappers.forEach((pin, index) => {
                                const baseRotation = parseFloat((pin as HTMLElement).dataset.rotate || '0')

                                // SET THE ANCHOR POINT: 50% width (center), 15px down from top (where the pin/tape is)
                                gsap.set(pin, { transformOrigin: "50% 15px" })

                                // Intense, continuous pendulum physics (Rotation ONLY, no X/Y translation)
                                gsap.to(pin, {
                                    rotation: baseRotation + (index % 2 === 0 ? 3.5 : -3.5),
                                    duration: 3 + index * 0.4,
                                    ease: "sine.inOut",
                                    yoyo: true,
                                    repeat: -1,
                                    delay: index * 0.15
                                })
                            })
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
                            start: 'top 80%',
                            once: true,
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const topics = [
        { title: 'Parenting & Child Development', icon: BookOpen },
        { title: 'Child Safety & Wellbeing', icon: ShieldCheck },
        { title: 'First Aid & Emergency Preparedness', icon: HeartPulse },
        { title: 'Mental Health & Emotional Wellbeing', icon: Brain },
        { title: 'Contemporary Parenting Challenges', icon: Users },
    ]

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        /* FIXED: Restored 'overflow-hidden' to prevent horizontal page scrolling */
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#334a89] text-white px-6 md:px-12 rounded-[40px] md:rounded-[60px] mx-2 md:mx-6 my-12 overflow-hidden shadow-[0_30px_80px_rgba(21,40,61,0.3)] relative select-none selection:bg-[#ffc715] selection:text-[#15283D]">

            {/* Ambient Background Accents */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#4d67bd] rounded-full filter blur-[120px] opacity-40 pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#ffc715] rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10 items-center">

                {/* =========================================================
                    LEFT COLUMN: TYPOGRAPHY & LIST (5 Cols)
                ========================================================= */}
                <div ref={contentRef} className="lg:col-span-5 flex flex-col justify-center relative z-20">

                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <Users className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] !text-[#ffc715] uppercase mt-0.5">
                            LEARNING TOGETHER
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] leading-[1.05] mb-8 !text-white tracking-tight">
                        Workshops That Support Modern <em className="italic text-[#ffc715] !text-[#ffc715]">Parenting</em>
                    </h2>

                    <BookOpen className="gsap-stagger-item w-8 h-8 text-[#ffc715] mb-10" />

                    <div className="gsap-stagger-item font-['Quicksand'] font-medium text-lg text-white/90 !text-white/90 leading-[1.65] space-y-6">
                        <p>
                            Parenting is one of life's most important responsibilities, and we believe families deserve meaningful support throughout that journey.
                        </p>
                        <p>
                            Throughout the year, Aster hosts workshops and learning sessions on topics relevant to modern families. These sessions create opportunities for learning, reflection, discussion, and growth within our parent community.
                        </p>
                    </div>

                    {/* Upgraded Tactile List */}
                    <div className="gsap-stagger-item mt-10 space-y-3">
                        {topics.map((topic, i) => (
                            <div key={i} className="group flex items-center gap-5 bg-white/5 p-4 rounded-[16px] border border-white/10 hover:bg-white/10 hover:border-[#ffc715]/40 transition-all duration-500 cursor-default">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-500 group-hover:bg-[#ffc715]">
                                    <topic.icon className="w-5 h-5 text-white transition-colors duration-500 group-hover:text-[#15283D]" strokeWidth={2} />
                                </div>
                                <span className="font-['Quicksand'] font-bold text-base md:text-lg text-white !text-white group-hover:text-[#ffc715] transition-colors duration-300">
                                    {topic.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item mt-10 pt-8 border-t border-white/20">
                        <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#ffc715] !text-[#ffc715] leading-[1.4]">
                            {renderWords("Supporting children begins with supporting the adults who care for them.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: THE 5-IMAGE WIND PINBOARD (7 Cols)
                ========================================================= */}
                <div ref={boardRef} className="lg:col-span-7 flex justify-center lg:justify-end mt-16 lg:mt-0 w-full relative z-10">
                    <div className="relative w-full h-[700px] md:h-[850px]">

                        {/* IMAGE 1 (Extreme Top Left)
                            Pushed up into the negative space
                        */}
                        <div className="absolute -top-[10%] md:-top-[15%] left-[0%] md:left-[5%] w-[45%] md:w-[35%] z-10">
                            <div className="board-pin-wind will-change-transform" data-rotate="-8" style={{ transform: 'rotate(-8deg)' }}>
                                <div className="bg-white p-2 md:p-3 pb-10 md:pb-14 shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-transform duration-[400ms] hover:scale-105 group cursor-grab">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-md shadow-sm border border-white/20 rotate-[6deg] z-20" />
                                    <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783274972/493896117_1231231472343787_963477596723003388_n_uyvjoo.jpg" alt="Parent Support 1" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IMAGE 2 (Extreme Top Right)
                            Pushed up into the negative space
                        */}
                        <div className="absolute -top-[5%] md:-top-[10%] right-[0%] md:right-[5%] w-[40%] md:w-[32%] z-20">
                            <div className="board-pin-wind will-change-transform" data-rotate="6" style={{ transform: 'rotate(6deg)' }}>
                                <div className="bg-white p-2 md:p-3 pb-10 md:pb-14 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-transform duration-[400ms] hover:scale-105 group cursor-grab">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/30 backdrop-blur-md shadow-sm border border-white/20 rotate-[-4deg] z-20" />
                                    <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275070/493931497_1231418262325108_3929573455326795932_n_aaautu.jpg" alt="Parent Support 2" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IMAGE 3 (Main Center)
                        */}
                        <div className="absolute top-[25%] md:top-[30%] left-[20%] md:left-[25%] w-[50%] md:w-[45%] z-30">
                            <div className="board-pin-wind will-change-transform" data-rotate="-2" style={{ transform: 'rotate(-2deg)' }}>
                                <div className="bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-transform duration-[400ms] hover:scale-[1.03] group cursor-grab">
                                    {/* Star Pin for the main image */}
                                    <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 text-[#ffc715] drop-shadow-md z-20 rotate-[15deg]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                    <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                        <img src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275077/494446741_1231230515677216_4742606727133253107_n_hsetky.jpg" alt="Main Workshop" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IMAGE 4 (Extreme Bottom Right)
                            Pushed down into the negative space
                        */}
                        <div className="absolute -bottom-[5%] md:-bottom-[10%] right-[0%] md:right-[5%] w-[40%] md:w-[35%] z-40">
                            <div className="board-pin-wind will-change-transform" data-rotate="10" style={{ transform: 'rotate(10deg)' }}>
                                <div className="bg-white p-2 md:p-3 pb-10 md:pb-14 shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-transform duration-[400ms] hover:scale-105 group cursor-grab">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/60 backdrop-blur-md shadow-sm border border-white/20 rotate-[-8deg] z-20" />
                                    <div className="w-full aspect-[2/3] overflow-hidden bg-gray-100 relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275110/494165045_1231231425677125_872399796167294069_n_1_fsydvh.jpg" alt="Parent Support 4" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IMAGE 5 (Extreme Bottom Left)
                            Pushed down into the negative space
                        */}
                        <div className="absolute -bottom-[15%] md:-bottom-[20%] left-[5%] md:left-[10%] w-[45%] md:w-[35%] z-50">
                            <div className="board-pin-wind will-change-transform" data-rotate="-12" style={{ transform: 'rotate(-12deg)' }}>
                                <div className="bg-white p-2 md:p-3 pb-10 md:pb-14 shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-transform duration-[400ms] hover:scale-105 group cursor-grab">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/50 backdrop-blur-md shadow-sm border border-white/20 rotate-[5deg] z-20" />
                                    <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275173/1000555027_rqalro.jpg" alt="Parent Support 5" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}