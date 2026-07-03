import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorCambridge() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                const children = contentRef.current.querySelectorAll('.cambridge-stagger')
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

            if (imgWrapRef.current && imgRef.current) {
                gsap.fromTo(imgWrapRef.current,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imgWrapRef.current,
                            start: "top 85%",
                        }
                    }
                )

                gsap.fromTo(imgRef.current,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imgWrapRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-36 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Left: Typography Content */}
                <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col">
                    <div className="cambridge-stagger flex items-center gap-3 mb-6">
                        <Award className="w-5 h-5 text-[#C9A84C]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#15283D] uppercase">
                            ACADEMIC EXCELLENCE WITH PURPOSE
                        </span>
                    </div>

                    <h2 className="cambridge-stagger font-['Playfair_Display'] text-4xl md:text-[50px] lg:text-[56px] font-medium leading-[1.1] text-[#15283D] mb-8">
                        The Cambridge <em className="text-[#334a89] italic">Pathway</em>.
                    </h2>

                    <div className="cambridge-stagger font-['Quicksand'] text-lg leading-[1.65] text-[#5C5C61] space-y-6 font-medium">
                        <p>
                            As a licensed Cambridge school, Aster offers an internationally recognized academic pathway that prepares students for future success in higher education and beyond.
                        </p>
                        <p>
                            We are proud of our <strong className="text-[#15283D]">100% Cambridge examination success rate</strong>, reflecting a culture of high expectations, consistent support, and a commitment to excellence.
                        </p>
                    </div>

                    <div className="cambridge-stagger w-12 h-[2px] bg-[#C9A84C] my-8" />

                    <ul className="cambridge-stagger space-y-4 font-['Quicksand'] text-lg font-bold text-[#15283D]">
                        {['Critical thinking', 'Research skills', 'Independent learning habits', 'Problem-solving abilities', 'Academic confidence'].map((item, i) => (
                            <li key={i} className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-[#C9A84C] shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className="cambridge-stagger mt-10 font-['Quicksand'] text-xl leading-[1.6] text-[#15283D] font-bold">
                        Academic achievement at Aster is not simply about results. It is about developing learners who understand concepts deeply and can apply their knowledge meaningfully.
                    </p>
                </div>

                {/* Right: Editorial Image */}
                <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                    <div 
                        ref={imgWrapRef}
                        className="relative w-full max-w-[500px] aspect-[3/4] z-10"
                    >
                        {/* Gold Frame Accent */}
                        <div className="absolute -inset-4 border border-[#C9A84C] z-0 pointer-events-none" />
                        
                        <div className="w-full h-full relative z-10 overflow-hidden shadow-2xl bg-gray-100" style={{ borderRadius: '0px' }}>
                            <img
                                ref={imgRef}
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop"
                                alt="Students reading"
                                className="w-full h-full object-cover transform-gpu"
                                style={{ borderRadius: '0px' }}
                            />
                        </div>
                        
                        {/* Decorative Box */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#15283D] z-20 flex items-center justify-center p-6 shadow-xl">
                            <span className="font-['Playfair_Display'] italic text-white text-3xl font-medium leading-none text-center">
                                100%<br />
                                <span className="font-['Quicksand'] not-italic text-xs tracking-widest text-[#C9A84C] font-bold mt-2 block uppercase">Success Rate</span>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
