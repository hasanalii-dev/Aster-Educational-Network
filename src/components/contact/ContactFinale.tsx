import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export function ContactFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="finale-section bg-white py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20 gsap-fade">
                
                <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                    {/* ── LOGO WATERMARK ── */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        THE FIRST STEP TOWARDS A LIFETIME OF LEARNING
                    </span>
                    
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        {renderWords("Every child's journey begins with a conversation.")}
                    </h2>
                    
                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        We invite you to connect with our team, visit our campuses, and discover how The Aster School helps children grow into confident, capable, and compassionate individuals.
                    </p>
                    
                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            {/* BUTTON 1: Primary Action */}
                            <Link
                                to="/book-tour"
                                className="btn-aster btn-aster-primary"
                            >
                                <span>Book a Campus Visit</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>

                            {/* BUTTON 2: Secondary Action */}
                            <Link
                                to="/admissions"
                                className="btn-aster btn-aster-white"
                            >
                                <span>Join the Waitlist</span>
                            </Link>
                        </div>
                        
                        <h3 className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#ffc715] mt-6">
                            {renderWords("The Aster School — Whatever It Takes!")}
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    )
}
