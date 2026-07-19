import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CampusesIntro() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.campuses-intro-content',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.campuses-intro-content',
                        start: 'top 85%'
                    }
                }
            )

            // Full text reveal animation for the intro paragraph
            gsap.fromTo('.reveal-word',
                { opacity: 0, yPercent: 100, rotation: 5 },
                {
                    opacity: 1, 
                    yPercent: 0, 
                    rotation: 0,
                    duration: 0.8, 
                    ease: 'power3.out',
                    stagger: 0.015,
                    scrollTrigger: {
                        trigger: '.campuses-text-container',
                        start: 'top 80%',
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const textSegments = [
        { text: "Since opening our doors in ", style: "" },
        { text: "2019", style: "font-bold text-[#394EA2]" },
        { text: ", The Aster School has grown into a ", style: "" },
        { text: "thriving learning community", style: "font-bold text-[#394EA2]" },
        { text: " committed to developing ", style: "" },
        { text: "confident learners", style: "italic font-bold" },
        { text: ", ", style: "" },
        { text: "compassionate leaders", style: "italic font-bold" },
        { text: ", and ", style: "" },
        { text: "future-ready individuals", style: "italic font-bold" },
        { text: ". Today, our campuses across ", style: "" },
        { text: "Karachi", style: "font-bold text-[#394EA2]" },
        { text: " serve students at different stages of their educational journey, while our expansion into ", style: "" },
        { text: "Riyadh", style: "font-bold text-[#394EA2]" },
        { text: " reflects a growing vision to bring ", style: "" },
        { text: "meaningful, child-centered education", style: "italic text-[#394EA2] font-semibold" },
        { text: " to families beyond Pakistan. While each campus has its own identity, every Aster student experiences the same commitment to ", style: "" },
        { text: "excellence, resilience, humility, innovation, and purposeful learning", style: "font-bold text-[#394EA2]" },
        { text: ".", style: "" },
    ];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-[#fbfaf8] px-6 md:px-12">
            <div className="max-w-[1000px] mx-auto text-center campuses-intro-content flex flex-col items-center">
                <p className="campuses-text-container font-['Quicksand'] text-lg md:text-xl text-[#5C5C61] leading-relaxed max-w-4xl mb-16">
                    {textSegments.map((seg, idx) => {
                        const words = seg.text.split(/(\s+)/);
                        return words.map((token, tIdx) => {
                            if (token.trim() === '') {
                                return <span key={`${idx}-${tIdx}`}>{token}</span>;
                            }
                            return (
                                <span key={`${idx}-${tIdx}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
                                    <span className={`inline-block reveal-word ${seg.style}`}>
                                        {token}
                                    </span>
                                </span>
                            );
                        });
                    })}
                </p>

                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-4 h-4 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#394EA2] uppercase mt-0.5">
                        FIND THE RIGHT CAMPUS FOR YOUR CHILD
                    </span>
                </div>
                
                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-[#334a89] leading-[1.2] max-w-3xl mb-8">
                    Every stage of childhood brings unique opportunities for growth.
                </h2>
                
                <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] max-w-2xl leading-relaxed">
                    Our campuses are thoughtfully designed to support students through each phase of their educational journey, providing age-appropriate learning environments, experiences, and opportunities that help children thrive academically, socially, emotionally, and personally.
                </p>
            </div>
        </section>
    )
}
