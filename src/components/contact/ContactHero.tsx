import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, UserPlus, ArrowRight } from 'lucide-react'
import gsap from 'gsap'

export function ContactHero() {
    const sectionRef = useRef<HTMLElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text and card entrance
            gsap.fromTo('.hero-stagger',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            )

            // Video background parallax effect
            if (bgRef.current && sectionRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 30, // move down by 30% on scroll
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative bg-[#15283D] pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 z-10 overflow-hidden">
            {/* Video Background (Parallax Container) */}
            <div ref={bgRef} className="absolute inset-0 z-0 h-[130%] -top-[15%] will-change-transform">
                <video
                    src="https://alpha.edu.pk/img/C2%20LR.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.6] contrast-105"
                />
                {/* Dark blue overlay to ensure text readability */}
                <div className="absolute inset-0 bg-[#15283D]/70 mix-blend-multiply" />
            </div>

            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#334a89] rounded-full filter blur-[150px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/3 z-0" />
            
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                {/* Left Column: Greeting */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="hero-stagger flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-[#ffc715]" />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#ffc715] uppercase">
                            CONTACT US
                        </span>
                    </div>
                    <h1 className="hero-stagger font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight mb-8">
                        We'd Love to <br />
                        <em className="italic text-[#ffc715]">Hear From You.</em>
                    </h1>
                    <p className="hero-stagger font-['Quicksand'] text-base md:text-lg text-white/80 font-medium leading-[1.6] max-w-2xl mb-6">
                        Whether you're exploring admissions, planning a campus visit, or simply learning more about The Aster School, our team is here to help.
                    </p>
                    <p className="hero-stagger font-['Quicksand'] text-base md:text-lg text-white/80 font-medium leading-[1.6] max-w-2xl">
                        We look forward to welcoming you and answering any questions you may have about your child's educational journey.
                    </p>
                </div>

                {/* Right Column: Quick Actions */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="hero-stagger bg-[#15283D]/40 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md shadow-2xl">
                        <h3 className="font-['Quicksand'] font-bold text-sm tracking-[0.25em] text-[#ffc715] uppercase mb-6">
                            START YOUR ASTER JOURNEY
                        </h3>
                        <p className="font-['Quicksand'] text-white/90 text-sm md:text-base font-medium leading-[1.6] mb-8">
                            Choosing the right school is one of the most important decisions a family makes. We encourage prospective parents to visit our campuses, meet our educators, and experience the Aster difference firsthand.
                        </p>
                        <div className="flex flex-col gap-4">
                            <Link to="/campuses" className="group flex items-center justify-between bg-white text-[#15283D] px-6 py-4 rounded-xl font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#ffc715] hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5" />
                                    Book a Campus Visit
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#15283D]/5 flex items-center justify-center transition-colors group-hover:bg-white/20">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                            <Link to="/admissions" className="group flex items-center justify-between bg-white/10 text-white border border-white/20 px-6 py-4 rounded-xl font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white hover:text-[#15283D] hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <UserPlus className="w-5 h-5" />
                                    Join the Waitlist
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-[#15283D]/5">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
