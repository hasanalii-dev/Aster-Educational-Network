import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ApproachFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.finale-blue-card',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.finale-blue-card', start: 'top 80%' } }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">

                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                    {/* ── LOGO WATERMARK ── */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        OUR PURPOSE
                    </span>
                    
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        “Children learn best when they feel safe, inspired, challenged, and valued.”
                    </h2>
                    
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        Our approach is rooted in one belief. By combining meaningful experiences, strong relationships, future-ready learning, and purposeful guidance, we help students grow into confident individuals prepared to navigate the future with resilience, curiosity, and purpose. <strong className="text-[#ffc715] font-bold">The Aster School — Whatever It Takes!</strong>
                    </p>
                    
                    <div className="w-full max-w-2xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">
                            Experience learning the Aster way.
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            {/* BUTTON 1: Primary Action */}
                            <Link
                                to="/admissions"
                                className="btn-aster btn-aster-primary rounded-full hover-shimmer relative overflow-hidden px-10 py-4 text-base"
                            >
                                Join the Waitlist
                                <svg className="w-5 h-5 ml-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>

                            {/* BUTTON 2: Secondary Action */}
                            <Link
                                to="/book-tour"
                                className="btn-aster btn-aster-outline rounded-full hover-shimmer relative overflow-hidden px-10 py-4 text-base"
                            >
                                Book a Campus Visit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
