import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryFinale() {
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
        <section ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20 gsap-fade">
                <div className="max-w-3xl text-center flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-4 h-4 text-[#394da1]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#394da1] uppercase mt-0.5">
                            THE ASTER ELEMENTARY EXPERIENCE
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#334a89] mb-6 prose-reveal-container">
                        {`The Elementary years are about far more than completing assignments or passing assessments.`.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] opacity-20 will-change-transform">{word}</span>
                        ))}
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] leading-relaxed mb-6">
                        They are about helping children become:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
                        {['Confident communicators', 'Independent learners', 'Curious explorers', 'Thoughtful problem-solvers', 'Compassionate individuals'].map((trait, i) => (
                            <span key={i} className="bg-[#FAFAFA] text-[#334a89] px-4 py-2 rounded-full font-['Quicksand'] font-bold text-sm border border-[#e97f7b]/20 shadow-sm">
                                {trait}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        JOIN OUR COMMUNITY
                    </span>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        “By combining strong academics with meaningful experiences, we help students develop the skills, mindset, and character needed for the years ahead.”
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        Where curiosity grows, confidence strengthens, and learning comes to life. <strong className="text-[#ffc715] font-bold">The Aster School — Whatever It Takes!</strong>
                    </p>
                    
                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Begin your child’s journey with Aster.</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link to="/admissions" className="btn-aster btn-aster-primary">
                                <span>Join the Waitlist</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>
                            <Link to="/campuses" className="btn-aster btn-aster-white">
                                <span>Book a Campus Visit</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
