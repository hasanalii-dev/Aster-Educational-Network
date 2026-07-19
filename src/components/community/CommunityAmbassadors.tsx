import { useEffect, useRef } from 'react'
import { Users, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityAmbassadors() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Staggered Content Fade-Up
            if (cardsRef.current) {
                const groups = cardsRef.current.querySelectorAll('.editorial-group')
                groups.forEach((group) => {
                    const items = group.querySelectorAll('.gsap-stagger-item')
                    gsap.fromTo(items,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            stagger: 0.15,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: group,
                                start: 'top 80%'
                            }
                        }
                    )
                })
            }

            // 2. Cinematic Parallax Scrub (Edge-to-Edge Images)
            const images = gsap.utils.toArray<HTMLImageElement>('.ambassador-parallax-img')
            images.forEach((img) => {
                gsap.fromTo(img,
                    { yPercent: -12 },
                    {
                        yPercent: 12,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                )
            })

            // 3. One-Shot Mechanical Typesetting (Thesis Statements)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-oneshot-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                            once: true,
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        /* The Deep Forest Green Canvas - Rich, dark, and highly premium */
        <section ref={sectionRef} className="py-24 md:py-40 bg-[#1E3F2E] px-6 md:px-12 overflow-hidden select-none selection:bg-white selection:text-[#1E3F2E]">
            <div ref={cardsRef} className="max-w-[1280px] mx-auto flex flex-col gap-32 lg:gap-48">

                {/* =========================================================
                    BLOCK 1: PARENTS AS PARTNERS (White Card Overhanging Bottom)
                ========================================================= */}
                <div className="editorial-group flex flex-col relative w-full items-start">

                    {/* Raw Edge-to-Edge Image (Anchored Left) */}
                    <div
                        className="w-full lg:w-[80%] h-[450px] md:h-[600px] lg:h-[700px] relative overflow-hidden shadow-[0_30px_60px_rgba(21,40,61,0.4)] group cursor-pointer z-0"
                        style={{ borderRadius: '0px' }}
                    >
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                            <img
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783274972/493896117_1231231472343787_963477596723003388_n_uyvjoo.jpg"
                                alt="Parents as Partners"
                                className="ambassador-parallax-img absolute h-[120%] -top-[10%] w-full object-cover will-change-transform"
                            />
                        </div>
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] mix-blend-multiply" />
                    </div>

                    {/* Pristine White Content Card (Hangs off the bottom right) */}
                    <div
                        className="bg-white p-10 md:p-14 lg:p-20 shadow-[0_40px_80px_rgba(21,40,61,0.3)] relative z-10 w-[95%] md:w-[85%] lg:w-[65%] self-end -mt-24 md:-mt-32 lg:-mt-48"
                        style={{ borderRadius: '0px' }}
                    >
                        <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                            <Users className="w-5 h-5 text-[#334a89] shrink-0" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                                PARENTS AS PARTNERS
                            </span>
                        </div>

                        <h3 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] !text-[#15283D] mb-8 leading-[1.05] tracking-tight">
                            Building Connections Between <em className="italic text-[#334a89] !text-[#334a89] block mt-2">Families & School</em>
                        </h3>

                        <Users className="gsap-stagger-item w-8 h-8 text-[#334a89] mb-10" />

                        <p className="gsap-stagger-item font-['Quicksand'] text-[#5C5C61] !text-[#5C5C61] text-base md:text-lg leading-[1.65] font-medium mb-10">
                            Our parent community plays an active role in school life. Through our Parent Ambassador Program, each class is represented by a parent ambassador who helps strengthen communication, encourage collaboration, and foster a sense of connection among families.
                        </p>

                        <div className="gsap-stagger-item pt-8 border-t border-[#15283D]/10">
                            <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-[#15283D] !text-[#15283D] leading-[1.6]">
                                {renderWords("This initiative helps parents stay informed, engaged, and connected while creating a supportive network that benefits both children and families.")}
                            </p>
                        </div>
                    </div>

                </div>

                {/* =========================================================
                    BLOCK 2: STAR PARENT DAY (Deep Navy Card Overhanging Top)
                ========================================================= */}
                <div className="editorial-group flex flex-col relative w-full items-end mt-12 lg:mt-0">

                    {/* Deep Navy Content Card (Hangs off the top left) */}
                    <div
                        className="bg-[#15283D] p-10 md:p-14 lg:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative z-10 w-[95%] md:w-[85%] lg:w-[65%] self-start -mb-24 md:-mb-32 lg:-mb-48"
                        style={{ borderRadius: '0px' }}
                    >
                        <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                            <Star className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#ffc715] !text-[#ffc715] uppercase mt-0.5">
                                STAR PARENT DAY
                            </span>
                        </div>

                        <h3 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-white !text-white mb-8 leading-[1.05] tracking-tight">
                            Becoming Part of Your <em className="italic text-[#ffc715] !text-[#ffc715] block mt-2">Child's World</em>
                        </h3>

                        <Star className="gsap-stagger-item w-8 h-8 text-[#ffc715] mb-10" fill="currentColor" />

                        <p className="gsap-stagger-item font-['Quicksand'] text-white/90 !text-white/90 text-base md:text-lg leading-[1.65] font-medium mb-10">
                            Each week, a parent is invited into the classroom to participate in engaging activities alongside students and educators.
                        </p>

                        <div className="gsap-stagger-item pt-8 border-t border-white/20">
                            <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-white !text-white leading-[1.6]">
                                {renderWords("For children, seeing a parent become part of their school experience is a moment of pride, excitement, and joy. For parents, it offers a unique opportunity to step into their child's world, experience learning firsthand, and create meaningful memories together.")}
                            </p>
                        </div>
                    </div>

                    {/* Raw Edge-to-Edge Image (Anchored Right) */}
                    <div
                        className="w-full lg:w-[80%] h-[450px] md:h-[600px] lg:h-[700px] relative overflow-hidden shadow-[0_30px_60px_rgba(21,40,61,0.4)] group cursor-pointer z-0"
                        style={{ borderRadius: '0px' }}
                    >
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                            <img
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783275012/493802865_1231231339010467_6402077431719669692_n_xzfdgc.jpg"
                                alt="Star Parent Day"
                                className="ambassador-parallax-img absolute h-[120%] -top-[10%] w-full object-cover will-change-transform"
                            />
                        </div>
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] mix-blend-multiply" />
                    </div>

                </div>

            </div>
        </section>
    )
}