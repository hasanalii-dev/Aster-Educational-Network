import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryLiteracy() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                
                // Image Parallax Scale
                if (imgRef.current) {
                    gsap.fromTo(imgRef.current,
                        { scale: 1.15, transformOrigin: "center center" },
                        {
                            scale: 1,
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

                // Stagger Text Content
                if (contentRef.current) {
                    const children = contentRef.current.querySelectorAll('.literacy-reveal')
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
        <section ref={sectionRef} className="w-full flex flex-col lg:flex-row min-h-[700px] lg:h-[800px] bg-[#15283D] overflow-hidden">
            
            {/* Left: 100% Height Immersive Image */}
            <div className="w-full lg:w-1/2 h-[500px] lg:h-full relative overflow-hidden" style={{ borderRadius: '0px' }}>
                <img 
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop" 
                    alt="Culture of Literacy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius: '0px' }}
                />
            </div>

            {/* Right: Stark Content Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-12 md:p-20 lg:p-24 bg-[#edad0c]" style={{ borderRadius: '0px' }}>
                <div ref={contentRef} className="max-w-[500px] flex flex-col">
                    
                    <div className="literacy-reveal flex items-center gap-3 mb-8">
                        <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-white uppercase">
                            COMMUNICATION
                        </span>
                    </div>

                    <h2 className="literacy-reveal font-['Playfair_Display'] text-5xl md:text-6xl font-medium text-white leading-[1.05] mb-8">
                        A Culture of <em className="italic block mt-2 text-[#334a89]">Literacy.</em>
                    </h2>

                    <div className="literacy-reveal w-16 h-[3px] bg-[#334a89] mb-8" />

                    <div className="literacy-reveal font-['Quicksand'] text-lg md:text-xl text-white space-y-6 font-medium leading-[1.6]">
                        <p>
                            We believe that strong reading skills are the absolute foundation of all learning.
                        </p>
                        <p>
                            Through dedicated reading time, classroom libraries, and storytelling, students develop a deep love for literature. We emphasize comprehension, vocabulary building, and expression, ensuring students become confident readers and articulate communicators.
                        </p>
                    </div>
                    
                </div>
            </div>

        </section>
    )
}
