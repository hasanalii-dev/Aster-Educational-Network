import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, UserPlus, Info } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function AdmissionsFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Overhanging warning card entrance
            gsap.fromTo('.gsap-warning-banner',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%'
                    }
                }
            )

            // Original blue card entrance
            gsap.fromTo('.finale-blue-card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.finale-blue-card',
                        start: 'top 80%'
                    }
                }
            )

            // Original blue card content stagger
            gsap.fromTo('.finale-stagger',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.finale-blue-card',
                        start: 'top 75%'
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-24 pb-32">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 text-center flex flex-col items-center">

                {/* =========================================================
                    OVERHANGING WARNING CARD (Z-20)
                ========================================================= */}
                <div className="gsap-warning-banner max-w-4xl mx-auto bg-white rounded-[24px] p-8 md:p-10 shadow-[0_20px_50px_rgba(21,40,61,0.08)] border border-[#15283D]/5 relative z-20 mb-[-50px] md:mb-[-60px] text-left flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-[#ffc715]/10 text-[#d69f18]">
                        <Info className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-[#15283D] !text-[#15283D] mb-3 tracking-tight">
                            Limited Seats. Exceptional Opportunities.
                        </h3>
                        <p className="font-['Quicksand'] text-[#5C5C61] !text-[#5C5C61] text-base md:text-lg font-medium leading-[1.6]">
                            To maintain meaningful learning experiences and personalized attention, class sizes are carefully managed across all campuses. Families are encouraged to begin the admissions process early to secure priority consideration for future openings.
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    ORIGINAL BLUE CARD (Z-10)
                ========================================================= */}
                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] px-10 pb-10 pt-[80px] md:px-20 md:pb-20 md:pt-[100px] text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30 z-10">

                    {/* ── LOGO WATERMARK ── */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />

                    <div className="finale-stagger flex items-center gap-3 mb-6 relative z-10 mt-2">
                        <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase mt-0.5">
                            READY TO TAKE THE NEXT STEP?
                        </span>
                    </div>

                    <h2 className="finale-stagger font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white max-w-4xl leading-[1.1] mb-10 relative z-10">
                        Join a community committed to developing confident learners.
                    </h2>

                    <p className="finale-stagger text-xl md:text-2xl font-['Quicksand'] font-medium text-white/95 relative z-10 mb-12">
                        Whatever It Takes!
                    </p>

                    <div className="finale-stagger w-full max-w-4xl border-t border-white/20 pt-10 flex flex-col items-center relative z-10">
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full">
                            <Link
                                to="/apply"
                                className="btn-aster btn-aster-primary rounded-full flex items-center justify-center gap-3 hover-shimmer relative overflow-hidden px-8 py-4 text-sm md:text-base font-bold tracking-[0.1em] uppercase"
                            >
                                <UserPlus className="w-5 h-5" />
                                Join the Waitlist
                            </Link>
                            <Link
                                to="/campuses"
                                className="btn-aster btn-aster-white rounded-full flex items-center justify-center gap-3 hover-shimmer relative overflow-hidden px-8 py-4 text-sm md:text-base font-bold tracking-[0.1em] uppercase"
                            >
                                <Calendar className="w-5 h-5" />
                                Schedule a Campus Visit
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}