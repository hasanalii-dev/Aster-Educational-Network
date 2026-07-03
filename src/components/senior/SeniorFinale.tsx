import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SeniorFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
            if (words.length > 0) {
                gsap.to(words, {
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.prose-reveal-container',
                        start: 'top 85%',
                        end: 'bottom 60%',
                        scrub: true,
                    }
                })
            }

            gsap.fromTo('.finale-blue-card',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.finale-blue-card', start: 'top 80%' } }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#FAFAFA] py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20 gsap-fade">
                <div className="max-w-3xl text-center flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-4 h-4 text-[#15283D]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#15283D] uppercase mt-0.5">
                            THE ASTER SENIOR SCHOOL EXPERIENCE
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#15283D] mb-6 prose-reveal-container">
                        {`By the time students graduate from Aster, they have developed far more than academic qualifications.`.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] opacity-20 will-change-transform">{word}</span>
                        ))}
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] leading-relaxed mb-6">
                        They leave as:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
                        {['Confident communicators', 'Independent thinkers', 'Innovative problem-solvers', 'Responsible leaders', 'Purpose-driven individuals'].map((trait, i) => (
                            <span key={i} className="bg-white text-[#15283D] px-5 py-2.5 rounded-full font-['Quicksand'] font-bold text-sm border border-[#15283D]/10 shadow-sm" style={{ borderRadius: '0px' }}>
                                {trait}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="finale-blue-card w-full bg-[#15283D] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#334a89]/30" style={{ borderRadius: '0px' }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-[0.03] select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" style={{ borderRadius: '0px' }} />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#C9A84C]" style={{ borderRadius: '0px' }} />
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#C9A84C] uppercase mb-6 relative z-10">
                        LOOKING TOWARD THE FUTURE
                    </span>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        “Because the ultimate goal of education is not simply achievement, it is developing individuals who can transform the world through excellence-driven leadership that uplifts humanity.”
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-12 relative z-10">
                        Prepared not only for university, but for the opportunities and challenges of an ever-changing world. <strong className="text-[#C9A84C] font-bold">The Aster School — Whatever It Takes!</strong>
                    </p>
                    
                    <div className="w-full max-w-xl border-t border-white/10 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Ready to Take the Next Step?</h3>
                        <p className="font-['Quicksand'] text-white/80 max-w-sm">
                            Join a learning community that prepares students for success in university, career, and life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
                            <Link to="/admissions" className="bg-[#C9A84C] hover:bg-[#b59540] text-[#15283D] font-['Quicksand'] font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all flex items-center justify-center gap-2 group" style={{ borderRadius: '0px' }}>
                                <span>Join the Waitlist</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link to="/campuses" className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-['Quicksand'] font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all flex items-center justify-center" style={{ borderRadius: '0px' }}>
                                <span>Book a Campus Visit</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
