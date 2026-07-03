import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const foundationsData = [
    {
        title: "Language & Literacy",
        desc: "Developing strong reading, writing, and communication skills through diverse texts and expressive writing.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Mathematics",
        desc: "Building a deep understanding of numbers, logic, and problem-solving applied to real-world scenarios.",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Science",
        desc: "Encouraging inquiry, experimentation, and a love for the natural world through hands-on learning.",
        image: "https://images.unsplash.com/photo-1564473373406-38379659b8eb?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Social Studies",
        desc: "Understanding communities, history, and global perspectives to foster informed citizens.",
        image: "https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Urdu",
        desc: "Fostering cultural connection, linguistic proficiency, and an appreciation for literature.",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Islamic Studies",
        desc: "Developing a strong foundation in faith, Qur'anic Arabic, and core Islamic values.",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop"
    }
]

export function ElementaryFoundations() {
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.foundation-card')
                gsap.fromTo(cards,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#394EA2] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[15px] h-[16px] bg-[#ffc715] rotate-[75deg] relative">
                            <div className="absolute w-[10px] h-[10px] bg-[#394EA2] -bottom-[4px] -right-[4px]" />
                        </div>
                        <span className="text-[#ffc715] tracking-[0.3em] font-['Quicksand'] font-bold text-sm uppercase">
                            STRONG ACADEMIC FOUNDATIONS
                        </span>
                    </div>
                    <h2 className="text-white text-4xl md:text-5xl lg:text-[56px] font-['Playfair_Display'] font-medium mb-6">
                        The Foundation for Future Learning
                    </h2>
                    <p className="text-white/80 max-w-3xl font-['Quicksand'] text-lg md:text-xl font-medium leading-[1.6]">
                        Learning is designed to be engaging, purposeful, and connected to real-world experiences, helping students build understanding rather than simply recall information.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foundationsData.map((item, index) => (
                        <div 
                            key={index}
                            className="foundation-card bg-white group hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
                            style={{ borderRadius: '0px' }}
                        >
                            <div className="relative h-64 overflow-hidden" style={{ borderRadius: '0px' }}>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ borderRadius: '0px' }}
                                />
                            </div>
                            <div className="p-8 md:p-10 flex flex-col flex-grow bg-white" style={{ borderRadius: '0px' }}>
                                <h3 className="font-['Quicksand'] text-2xl text-[#15283D] font-bold mb-4 group-hover:text-[#394EA2] transition-colors">
                                    {item.title}
                                </h3>
                                <div className="w-10 h-[2px] bg-[#ffc715] mb-5" />
                                <p className="font-['Quicksand'] text-[#5C5C61] font-medium leading-[1.6]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
