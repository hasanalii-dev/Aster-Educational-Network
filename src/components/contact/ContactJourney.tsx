import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export function ContactJourney() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.gsap-journey-fade',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#F8F9FA] py-24 md:py-32 border-b border-[#E5E7EB] mt-16 md:mt-24">
            <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
                
                {/* Intro Text moved from Hero */}
                <p className="gsap-journey-fade font-['Quicksand'] text-[#5C5C61] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                    Whether you're exploring admissions, planning a campus visit, or simply learning more about The Aster School, our team is here to help. We look forward to welcoming you and answering any questions you may have about your child's educational journey.
                </p>

                <span className="gsap-journey-fade font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                    START YOUR ASTER JOURNEY
                </span>
                
                <h2 className="gsap-journey-fade font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-[#15283D] leading-tight mb-8">
                    Choosing the right school is one of the most important decisions a family makes.
                </h2>
                
                <p className="gsap-journey-fade font-['Quicksand'] text-[#5C5C61] text-lg md:text-xl font-medium leading-relaxed mb-12">
                    We encourage prospective parents to visit our campuses, meet our educators, explore our learning environments, and experience the Aster difference firsthand.
                </p>

                <div className="gsap-journey-fade flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/book-tour"
                        className="btn-aster btn-aster-primary w-full sm:w-auto"
                    >
                        <span>Book a Campus Visit</span>
                        <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                    </Link>
                    
                    <a
                        href="https://form.jotform.com/222871184574462"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-aster btn-aster-white w-full sm:w-auto"
                    >
                        <span>Join the Waitlist</span>
                    </a>
                </div>

            </div>
        </section>
    )
}
