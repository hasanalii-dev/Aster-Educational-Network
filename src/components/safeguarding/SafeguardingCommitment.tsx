import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SafeguardingCommitment() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Raw Parallax Image Entry
            gsap.fromTo('.commit-img',
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            // 2. Content Stagger Entry
            gsap.fromTo('.commit-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            // 3. Cinematic Image Parallax
            gsap.to('.commit-img-inner', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })

            // 4. ONE-SHOT TYPESETTING TRIGGER
            const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
            if (words.length > 0) {
                gsap.fromTo(words,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.04,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 85%',
                            once: true,
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const thesisText = "Safeguarding at Aster extends beyond protection. It is about creating a culture of care, respect, responsibility, and trust."

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] overflow-hidden relative select-none border-t border-[#334a89]/5">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* =========================================================
                        LEFT COLUMN: RAW PARALLAX MEDIA
                    ========================================================= */}
                    <div className="w-full lg:w-5/12 commit-img">
                        <div className="relative h-[500px] md:h-[680px] w-full rounded-none shadow-none overflow-hidden bg-[#15283D]">
                            <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                                <img
                                    src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783261842/1000555008_rhc9hm.jpg"
                                    alt="Safe Learning Environments"
                                    className="commit-img-inner w-full h-full object-cover contrast-[1.05] opacity-90 will-change-transform"
                                />
                            </div>
                        </div>
                    </div>

                    {/* =========================================================
                        RIGHT COLUMN: THE CONTENT PLINTH
                    ========================================================= */}
                    <div className="w-full lg:w-7/12 relative z-10">

                        {/* Header Lockup */}
                        <div className="flex items-center gap-3 mb-6 commit-text group/star">
                            <div className="w-5 h-5 flex items-center justify-center text-[#ffc715] group-hover/star:rotate-90 transition-transform duration-500 origin-center">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v20" />
                                    <path d="M2 12h20" />
                                    <path d="m5 5 14 14" />
                                    <path d="m5 19 14-14" />
                                </svg>
                            </div>
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                                OUR COMMITMENT TO SAFEGUARDING
                            </span>
                        </div>

                        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#15283D] !text-[#15283D] leading-[1.05] mb-8 commit-text tracking-tight">
                            Creating Safe Learning <em className="italic font-medium text-[#334a89] !text-[#334a89]">Environments</em>
                        </h2>

                        <div className="w-16 h-[2px] bg-[#ffc715] mb-10 commit-text" />

                        <div className="font-['Quicksand'] font-medium text-base md:text-lg lg:text-[20px] text-[#5C5C61] !text-[#5C5C61] leading-[1.7] space-y-6 commit-text mb-10">
                            <p>
                                We are committed to providing an environment where every child feels physically, emotionally, and psychologically safe.
                            </p>
                            <p>
                                This commitment guides how we design our learning spaces, support student wellbeing, train our staff, and partner with families.
                            </p>
                        </div>

                        {/* Typesetting Trigger Container (The Final Thesis) */}
                        <div ref={textRef} className="commit-text pt-6 border-t border-[#334a89]/10">
                            <p className="font-['Quicksand'] font-bold text-[#334a89] !text-[#334a89] text-xl md:text-2xl leading-snug">
                                {thesisText.split(' ').map((word, i) => (
                                    <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] will-change-transform opacity-0">
                                        {word}
                                    </span>
                                ))}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
