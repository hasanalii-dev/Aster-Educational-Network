import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorCambridge() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentBoxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentBoxRef.current) {
                gsap.fromTo(contentBoxRef.current,
                    { y: 60, opacity: 0 },
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

                // Stagger inner elements
                const children = contentBoxRef.current.querySelectorAll('.cambridge-stagger')
                gsap.fromTo(children,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative w-full min-h-[800px] flex items-center overflow-hidden bg-[#15283D]">
            
            {/* Absolute Full-width Video Background */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                >
                    <source src="https://res.cloudinary.com/lpxp5l3a/video/upload/q_auto,f_auto,w_1920/ASTER_SCHOOL__2_3_ldqbk5.mp4" type="video/mp4" />
                </video>
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[#15283D]/50" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex justify-center py-24 md:py-36">
                
                {/* Centered Solid Content Box */}
                <div 
                    ref={contentBoxRef}
                    className="relative p-10 md:p-14 lg:p-16 max-w-[800px] flex flex-col items-center text-center shadow-2xl bg-white"
                    style={{ borderRadius: '0px' }}
                >
                    {/* Corner Accent Rectangles */}
                    <div className="absolute top-0 left-0 w-6 h-6 bg-[#15283D]" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#15283D]" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#15283D]" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#15283D]" />

                    <div className="cambridge-stagger flex items-center gap-3 mb-6">
                        <Award className="w-5 h-5 text-[#edad0c]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#15283D] uppercase">
                            ACADEMIC EXCELLENCE WITH PURPOSE
                        </span>
                    </div>

                    <h2 className="cambridge-stagger font-['Playfair_Display'] text-4xl md:text-[50px] font-medium leading-[1.1] text-[#15283D] mb-8">
                        The Cambridge <em className="text-[#15283D] italic">Pathway</em>.
                    </h2>

                    <div className="cambridge-stagger font-['Quicksand'] text-[17px] leading-[1.65] text-[#5C5C61] space-y-6 font-medium w-full">
                        <p>
                            As a licensed Cambridge school, Aster offers an internationally recognized academic pathway that prepares students for future success in higher education and beyond.
                        </p>
                        <p>
                            We are proud of our <strong className="text-[#15283D] font-bold">100% Cambridge examination success rate</strong>, reflecting a culture of high expectations, consistent support, and a commitment to excellence.
                        </p>
                        
                        <div className="w-12 h-[2px] bg-[#edad0c] my-6 mx-auto" />
                        
                        <div className="flex flex-col items-start mx-auto w-fit space-y-3 font-['Quicksand'] text-[17px] font-bold text-[#15283D] text-left">
                            {['Critical thinking', 'Research skills', 'Independent learning habits', 'Problem-solving abilities', 'Academic confidence'].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 bg-[#edad0c] shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="w-12 h-[2px] bg-[#edad0c] my-6 mx-auto" />

                        <p className="text-[#15283D] font-bold text-lg">
                            Academic achievement at Aster is not simply about results. It is about developing learners who understand concepts deeply and can apply their knowledge meaningfully.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
