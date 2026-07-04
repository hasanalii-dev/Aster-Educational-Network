import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorCommunication() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                
                if (imgRef.current) {
                    gsap.fromTo(imgRef.current,
                        { scale: 1.15, yPercent: -10 },
                        {
                            scale: 1,
                            yPercent: 10,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    )
                }

                if (quoteRef.current) {
                    gsap.fromTo(quoteRef.current,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: quoteRef.current,
                                start: "top 85%",
                            }
                        }
                    )
                }

                if (contentRef.current) {
                    const children = contentRef.current.querySelectorAll('.comm-reveal')
                    gsap.fromTo(children,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            stagger: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: contentRef.current,
                                start: "top 80%",
                            }
                        }
                    )
                }
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full bg-[#15283D] flex flex-col pt-16 md:pt-24 pb-24 md:pb-36">
            
            {/* Top: Wide Landscape Image */}
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
                <div className="w-full h-[40vh] min-h-[300px] max-h-[500px] relative overflow-hidden shadow-2xl" style={{ borderRadius: '0px' }}>
                    <img 
                        ref={imgRef}
                        src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop" 
                        alt="Public Speaking and Communication"
                        className="absolute inset-0 w-full h-full object-cover origin-top"
                        style={{ borderRadius: '0px' }}
                    />
                    <div className="absolute inset-0 bg-[#15283D]/20 mix-blend-multiply pointer-events-none" />
                </div>
            </div>

            {/* Bottom: 2-Column Editorial Content */}
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col">
                
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left Column: Quote & Badge */}
                    <div className="w-full lg:w-5/12 flex flex-col border-t-2 border-[#edad0c]/30 pt-8">
                        <div className="flex items-center gap-3 mb-8">
                            <MessageCircle className="w-5 h-5 text-[#edad0c]" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#edad0c] uppercase mt-0.5">
                                COMMUNICATION & PERSPECTIVE
                            </span>
                        </div>
                        
                        <h2 ref={quoteRef} className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[52px] font-medium text-white leading-[1.1]">
                            Finding Their <em className="italic text-[#edad0c]">Voice.</em>
                        </h2>
                    </div>

                    {/* Right Column: Paragraphs & Lists */}
                    <div ref={contentRef} className="w-full lg:w-7/12 flex flex-col border-t-2 border-[#5C5C61]/30 pt-8">
                        
                        <div className="comm-reveal font-['Quicksand'] text-lg md:text-xl text-white/90 space-y-6 font-medium leading-[1.65]">
                            <p>
                                Strong communication skills open doors to opportunity, leadership, and lifelong success. At Aster, students develop proficiency in English, Urdu, and Arabic, with Mandarin available as an additional language option.
                            </p>
                            <p>
                                Arabic holds a special place within the Aster experience. As a compulsory language and the language of the Holy Qur'an, it helps students deepen their understanding of Islam while developing strong reading, writing, speaking, and comprehension skills.
                            </p>
                        </div>

                        <div className="comm-reveal w-12 h-[2px] bg-[#edad0c] my-10" />

                        <div className="comm-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Presentations', 'Public speaking', 'Debates', 'Discussions', 'Model United Nations (MUN)'].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-[#edad0c] shrink-0" />
                                    <span className="font-['Quicksand'] text-base font-bold text-white uppercase tracking-wider">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}
