import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorBeyond() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }

            if (imgRef.current) {
                gsap.fromTo(
                    imgRef.current,
                    { opacity: 0, scale: 0.95 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: imgRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
                
                <div ref={contentRef} className="flex flex-col items-center max-w-4xl mb-16">
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <Compass className="w-5 h-5 text-[#edad0c]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#15283D] uppercase">
                            LEARNING BEYOND THE CLASSROOM
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] mb-8 leading-[1.1]">
                        Experiences That Shape <em className="text-[#334a89] italic">Growth</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#edad0c] mb-8 mx-auto" />

                    <div className="gsap-stagger-item font-['Quicksand'] text-lg md:text-xl text-[#5C5C61] space-y-6 font-medium leading-[1.6]">
                        <p>
                            Some of the most meaningful lessons happen beyond textbooks. Senior students participate in experiences that encourage them to apply learning, explore interests, and develop confidence beyond the classroom.
                        </p>
                        <p>
                            Through sports, sustainability initiatives, creative projects, competitions, entrepreneurship experiences, and student-led opportunities, they build skills that cannot be taught through theory alone.
                        </p>
                    </div>

                    <div className="gsap-stagger-item flex flex-wrap justify-center gap-3 md:gap-4 mt-12 max-w-3xl">
                        {['Leadership', 'Teamwork', 'Creativity', 'Discipline', 'Confidence', 'Adaptability'].map((skill, i) => (
                            <span key={i} className="bg-white text-[#15283D] px-6 py-3 border border-[#15283D]/10 shadow-sm font-['Quicksand'] font-bold text-sm tracking-wide" style={{ borderRadius: '0px' }}>
                                {skill}
                            </span>
                        ))}
                    </div>

                    <p className="gsap-stagger-item font-['Quicksand'] text-xl md:text-2xl font-bold text-[#15283D] mt-12">
                        Preparing them to contribute meaningfully wherever life takes them.
                    </p>
                </div>

                <div ref={imgRef} className="w-full max-w-[1000px] aspect-[21/9] bg-gray-200 shadow-2xl relative" style={{ borderRadius: '0px' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600&auto=format&fit=crop" 
                        alt="Learning Beyond The Classroom" 
                        className="w-full h-full object-cover"
                        style={{ borderRadius: '0px' }}
                    />
                </div>

            </div>
        </section>
    )
}
