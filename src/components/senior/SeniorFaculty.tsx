import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorFaculty() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                
                if (imgWrapRef.current) {
                    gsap.fromTo(imgWrapRef.current,
                        { y: 80, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 75%",
                            }
                        }
                    )
                }

                if (contentRef.current) {
                    const children = contentRef.current.querySelectorAll('.faculty-reveal')
                    gsap.fromTo(children,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            stagger: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: contentRef.current,
                                start: "top 75%",
                            }
                        }
                    )
                }
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full relative bg-white py-24 md:py-40 z-10 overflow-hidden">
            
            {/* The Charcoal Background Block that doesn't span full height */}
            <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-[#2C2C2C] z-0" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Left: Content Panel (Overlaps the charcoal / white boundary) */}
                <div ref={contentRef} className="w-full lg:w-5/12 flex flex-col bg-white p-8 md:p-12 shadow-2xl relative" style={{ borderRadius: '0px' }}>
                    
                    {/* Floating Gold Accent Box */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#C9A84C]" />

                    <div className="faculty-reveal flex items-center gap-3 mb-8">
                        <Users className="w-6 h-6 text-[#15283D]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#15283D] uppercase mt-1">
                            EXPERT EDUCATORS
                        </span>
                    </div>

                    <h2 className="faculty-reveal font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-[1.1] mb-8">
                        Highly Qualified <em className="italic block mt-2 text-[#334a89]">Faculty.</em>
                    </h2>

                    <div className="faculty-reveal w-16 h-[2px] bg-[#C9A84C] mb-8" />

                    <div className="faculty-reveal font-['Quicksand'] text-lg text-[#5C5C61] space-y-6 font-medium leading-[1.6]">
                        <p>
                            Behind every successful student is a teacher who inspires, guides, and believes in their potential.
                        </p>
                        <p>
                            Our Senior School students are supported by a team of highly qualified educators who bring subject expertise, professional experience, and a commitment to continuous growth. Through ongoing training and professional development, our faculty remain aligned with evolving educational standards and best practices.
                        </p>
                        <p className="font-bold text-[#15283D] pt-2">
                            More importantly, they understand that education is about more than teaching content. It is about developing confidence, character, curiosity, and a lifelong love for learning.
                        </p>
                    </div>
                </div>

                {/* Right: Floating Portrait */}
                <div className="w-full lg:w-7/12 flex justify-center lg:justify-end relative">
                    <div ref={imgWrapRef} className="w-full max-w-[600px] aspect-[4/3] relative">
                        {/* Decorative Wireframe behind Image */}
                        <div className="absolute top-8 left-8 w-full h-full border border-white/20 z-0 pointer-events-none" />
                        
                        <img 
                            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop" 
                            alt="Expert Faculty"
                            className="w-full h-full object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10 filter contrast-110"
                            style={{ borderRadius: '0px' }}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
