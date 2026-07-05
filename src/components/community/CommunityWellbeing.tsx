import { useEffect, useRef } from 'react'
import { Smile } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityWellbeing() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                gsap.fromTo(contentRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                    }
                )
            }

            // Parallax image
            gsap.utils.toArray('.wellbeing-img').forEach((img: any) => {
                gsap.fromTo(img,
                    { yPercent: -15 },
                    {
                        yPercent: 15, ease: 'none',
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                <div className="flex flex-col justify-center order-2 lg:order-1" ref={contentRef}>
                    <div className="flex items-center gap-3 mb-6">
                        <Smile className="w-6 h-6 text-[#e97f7b]" />
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#e97f7b] uppercase">
                            WELLBEING FOR THE WHOLE FAMILY
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#15283D] leading-[1.1] mb-8">
                        Supporting Parents Beyond the Classroom
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed space-y-6">
                        <p className="text-xl font-bold text-[#15283D]">
                            A healthy school community considers the wellbeing of everyone within it.
                        </p>
                        <p>
                            Through mental health and wellbeing workshops, parents are provided with opportunities to learn, connect, reflect, and access valuable resources that support both personal wellbeing and family life.
                        </p>
                        <p>
                            These conversations help strengthen resilience, understanding, and healthy relationships within families and the wider community.
                        </p>
                    </div>
                </div>

                <div className="w-full h-[500px] md:h-[700px] rounded-none overflow-hidden shadow-2xl relative order-1 lg:order-2 border-4 border-white">
                    <div className="wellbeing-img absolute inset-0 w-full h-[130%] bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                        <Smile className="w-12 h-12 mb-4 opacity-50" />
                        <span className="font-['Quicksand'] font-bold tracking-widest text-sm uppercase text-center px-4">Wellbeing for the Whole Family</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
