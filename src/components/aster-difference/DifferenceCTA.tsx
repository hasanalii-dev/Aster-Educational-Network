import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceCTA() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white pt-12 pb-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">
                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                    {/* ── LOGO WATERMARK ── */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        THE ASTER DIFFERENCE
                    </span>
                    
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-[56px] font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        Ready to Experience The Aster Difference?
                    </h2>
                    
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        Join a school that is preparing the next generation of thinkers, leaders, innovators, and change-makers. And that is the future we continue building every day — <strong className="text-[#ffc715] font-bold">Whatever It Takes!</strong>
                    </p>
                    
                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Begin your child’s journey with Aster.</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">

                            {/* BUTTON 1: Primary Action */}
                            <Link
                                to="/admissions"
                                className="btn-aster btn-aster-primary"
                            >
                                <span>Join the Waitlist</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>

                            {/* BUTTON 2: Secondary Action */}
                            <Link
                                to="/contact"
                                className="btn-aster btn-aster-white"
                            >
                                <span>Book a Campus Visit</span>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
