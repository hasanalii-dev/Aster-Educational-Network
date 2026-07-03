import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function PreschoolFinale() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>('.gsap-ps-scrub-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.ps-prose-reveal-container',
                            start: 'top 85%',
                        }
                    }
                )
            }

            gsap.fromTo('.ps-finale-blue-card',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ps-finale-blue-card', start: 'top 80%' } }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const scrubText = "A strong foundation. A confident beginning. A lifetime of possibilities."

    return (
        <section ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20">
                <div className="max-w-3xl text-center flex flex-col items-center">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <svg className="w-4 h-4 text-[#6ab39d] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#334a89] uppercase mt-0.5 text-left md:text-center">
                            THE BEGINNING OF A BEAUTIFUL JOURNEY
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#334a89] mb-6 ps-prose-reveal-container">
                        {scrubText.split(' ').map((word, i) => (
                            <span key={i} className="gsap-ps-scrub-word inline-block mr-[0.25em] opacity-20 will-change-transform">{word}</span>
                        ))}
                    </h2>
                </div>

                <div className="ps-finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                    {/* Logo Watermark */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>

                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />

                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                        WHERE IT ALL BEGINS
                    </span>

                    <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                        "The early years are the foundation of who a child becomes."
                    </h2>

                    <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                        At The Aster School, we nurture independence, curiosity, confidence, and a genuine love for learning from the very first day — <strong className="text-[#ffc715] font-bold">Whatever It Takes!</strong>
                    </p>

                    <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                        <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Begin your child's journey with Aster.</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link
                                to="/admissions"
                                className="btn-aster btn-aster-primary hover-shimmer"
                            >
                                <span>Join the Waitlist</span>
                                <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                            </Link>
                            <Link
                                to="/book-tour"
                                className="btn-aster btn-aster-white hover-shimmer"
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
