import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const leadershipTraits = [
    { num: '01', text: "Take responsibility for their actions" },
    { num: '02', text: "Work collaboratively with others" },
    { num: '03', text: "Show empathy and respect" },
    { num: '04', text: "Navigate challenges with resilience" },
    { num: '05', text: "Contribute positively to their communities" }
]

export function SeniorLeadership() {
    const sectionRef = useRef<HTMLElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(headerRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                        }
                    }
                )
            }

            if (listRef.current) {
                const items = listRef.current.querySelectorAll('.trait-item')
                gsap.fromTo(items,
                    { x: -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 75%",
                        }
                    }
                )
            }

            if (imgRef.current) {
                gsap.fromTo(imgRef.current,
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: imgRef.current,
                            start: "top 75%",
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div ref={headerRef} className="flex flex-col mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-5 h-5 text-[#edad0c]" strokeWidth={2.5} />
                        <span className="text-[#15283D] tracking-[0.3em] font-['Quicksand'] font-bold text-sm uppercase">
                            LEADERSHIP & CHARACTER
                        </span>
                    </div>
                    <h2 className="text-[#15283D] text-4xl md:text-5xl lg:text-[56px] font-['Playfair_Display'] font-medium mb-6 leading-[1.1]">
                        Growing Into <em className="text-[#334a89] italic">Responsible</em> Individuals
                    </h2>
                    <p className="text-[#5C5C61] max-w-3xl font-['Quicksand'] text-lg md:text-xl font-medium leading-[1.6]">
                        At Aster, leadership begins with character. Through Social Emotional Learning, Islamic education, mentorship, and everyday experiences, students develop the values to lead with integrity, humility, and purpose.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Interactive List */}
                    <div ref={listRef} className="w-full lg:w-1/2 flex flex-col space-y-4">
                        <p className="font-['Quicksand'] text-[#15283D] font-bold text-xl mb-4">Students learn to:</p>
                        
                        {leadershipTraits.map((trait, i) => (
                            <div 
                                key={i}
                                className="trait-item group relative bg-white border border-[#15283D]/10 p-6 flex items-center gap-6 cursor-default transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#edad0c]/50"
                                style={{ borderRadius: '0px' }}
                            >
                                <div className="absolute inset-0 bg-[#15283D]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                
                                <span className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#edad0c]/40 group-hover:text-[#edad0c] transition-colors duration-300 shrink-0">
                                    {trait.num}
                                </span>
                                
                                <span className="font-['Quicksand'] text-lg md:text-xl font-bold text-[#15283D] group-hover:text-[#334a89] transition-colors duration-300">
                                    {trait.text}
                                </span>

                                <ArrowRight className="w-5 h-5 text-[#edad0c] ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>

                    {/* Right: Immersive Portrait */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div ref={imgRef} className="w-full max-w-[550px] aspect-[4/5] bg-gray-200 shadow-2xl relative" style={{ borderRadius: '0px' }}>
                            <img 
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270728/image00019_f0wnh7.jpg" 
                                alt="Student Leadership"
                                className="w-full h-full object-cover filter contrast-[1.05]"
                                style={{ borderRadius: '0px' }}
                            />
                            {/* Accent block */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#15283D] -z-10" />
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-[#edad0c] -z-10" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

