import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.finale-blue-card-safeguarding',
                { opacity: 0, y: 60 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: 'power3.out', 
                    scrollTrigger: { trigger: '.finale-blue-card-safeguarding', start: 'top 80%' } 
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#fbfaf8] py-24 px-6 md:px-12 relative z-20">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20">
                <div className="finale-blue-card-safeguarding w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#3A53A4]/30">

                    {/* ── LOGO WATERMARK ── */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#FBBB21] rounded-b-md" />
                    
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#FBBB21] uppercase mb-6 relative z-10">
                        OUR PROMISE
                    </span>
                    
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-8 relative z-10">
                        Every child who enters an Aster campus deserves to feel safe, respected, and valued.
                    </h2>
                    
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        Our commitment to safeguarding reflects our commitment to every child's right to learn in an environment where their wellbeing comes first.
                    </p>

                    <div className="font-['Quicksand'] text-sm md:text-base text-white/80 max-w-2xl leading-relaxed mb-12 relative z-10">
                        <strong className="block text-white mb-2">Questions About Safeguarding?</strong>
                        Our team is always available to discuss safeguarding practices, wellbeing support, and child protection procedures with parents and families.
                    </div>
                    
                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            {/* BUTTON 1: Primary Action */}
                            <Link
                                to="/contact"
                                className="btn-aster btn-aster-primary inline-flex hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                <span>Contact Our Team</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>

                            {/* BUTTON 2: Secondary Action */}
                            <Link
                                to="/book-tour"
                                className="btn-aster btn-aster-white inline-flex hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                <span>Book a Campus Visit</span>
                            </Link>
                        </div>
                    </div>
                    
                    <p className="font-['Quicksand'] mt-16 font-bold tracking-widest text-[#FBBB21] uppercase text-sm relative z-10">
                        The Aster School — Whatever It Takes!
                    </p>
                </div>
            </div>
        </section>
    )
}
