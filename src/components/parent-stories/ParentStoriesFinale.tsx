import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParentStoriesFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Full block reveal on scroll instead of word-by-word scrub
            gsap.fromTo('.finale-content-block',
                { opacity: 0, y: 40 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.0, 
                    ease: 'power3.out', 
                    scrollTrigger: { 
                        trigger: '.finale-content-block', 
                        start: 'top 85%' 
                    } 
                }
            )

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
        <section ref={sectionRef} className="bg-[#FAFAF9] py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20">
                
                {/* Standard fade-up block instead of letter-by-letter scrub */}
                <div className="finale-content-block max-w-3xl text-center flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-4 h-4 text-[#394da1]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#394da1] uppercase mt-0.5">
                            YOUR FAMILY, OUR FOCUS
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#334a89] mb-6">
                        We believe meaningful education is strongest when schools and families work together with a shared vision for the child.
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] leading-relaxed">
                        The stories above are just a glimpse into the lasting relationships we build with our students and their families. At Aster, your child's success is a collaborative journey.
                    </p>
                </div>

                {/* The large closing card */}
                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                    {/* Logo Watermark */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        JOIN OUR COMMUNITY
                    </span>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        “Be part of a school that values character, curiosity, and collaboration.”
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        If our parent stories resonate with your hopes for your child's education, we invite you to take the next step. Let’s work together to shape a bright future — <strong className="text-[#ffc715] font-bold">Whatever It Takes!</strong>
                    </p>
                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Begin your child’s journey with Aster.</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">

                            {/* Primary Action */}
                            <Link
                                to="/admissions"
                                className="btn-aster btn-aster-primary"
                            >
                                <span>Start Application</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>

                            {/* Secondary Action */}
                            <Link
                                to="/campuses"
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
