import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ElementaryCuriosity() {
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
                const children = contentBoxRef.current.querySelectorAll('.curiosity-stagger')
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
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://alpha.edu.pk/img/hero.mp4" type="video/mp4" />
                </video>
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[#15283D]/50" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex justify-center">
                
                {/* Centered Solid Content Box */}
                <div 
                    ref={contentBoxRef}
                    className="relative p-10 md:p-14 lg:p-16 max-w-[800px] flex flex-col items-center text-center shadow-2xl bg-white"
                    style={{ borderRadius: '0px' }}
                >
                    {/* Corner Accent Rectangles */}
                    <div className="absolute top-0 left-0 w-6 h-6 bg-[#334a89]" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#334a89]" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#334a89]" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#334a89]" />

                    <div className="curiosity-stagger flex items-center gap-3 mb-6">
                        <Compass className="w-5 h-5 text-[#ffc715]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#394EA2] uppercase">
                            LEARNING WITH PURPOSE
                        </span>
                    </div>

                    <h2 className="curiosity-stagger font-['Playfair_Display'] text-4xl md:text-[50px] font-medium leading-[1.1] text-[#15283D] mb-8">
                        Curiosity is our <em className="text-[#394EA2] italic">Superpower</em>.
                    </h2>

                    <div className="curiosity-stagger font-['Quicksand'] text-[17px] leading-[1.65] text-[#5C5C61] space-y-6 font-medium">
                        <p>
                            Children are naturally curious, and we believe that curiosity should be protected and nurtured.
                        </p>
                        <p>
                            Our classrooms encourage students to ask questions, explore ideas, think critically, collaborate, and apply their learning in meaningful ways.
                        </p>
                        <div className="w-12 h-[2px] bg-[#ffc715] my-4 mx-auto" />
                        <p className="text-[#15283D] font-bold text-lg">
                            Rather than relying solely on memorization, students are guided to understand concepts deeply and make connections across subjects.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
