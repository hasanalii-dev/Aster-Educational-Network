import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SeniorFaculty() {
    const sectionRef = useRef<HTMLElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Content Staggered Fade-Up
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
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 2. Cinematic Image Reveal & Parallax Scrub
            if (imgWrapRef.current) {
                gsap.fromTo(
                    imgWrapRef.current,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.5,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                    }
                )

                const imgElement = imgWrapRef.current.querySelector('img')
                if (imgElement) {
                    gsap.fromTo(
                        imgElement,
                        { yPercent: -12 },
                        {
                            yPercent: 12,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imgWrapRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        }
                    )
                }
            }

            // 3. One-Shot Mechanical Typesetting
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

    const renderWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="gsap-oneshot-word inline-block mr-[0.25em] will-change-transform">
                {word}
            </span>
        ))
    }

    return (
        /* Uniform Deep Navy Background eliminates the messy split */
        <section ref={sectionRef} className="w-full relative bg-[#15283D] py-24 md:py-36 z-10 overflow-hidden select-none">

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">

                {/* =========================================================
                    LEFT: CONTENT PANEL (Pristine White Card)
                ========================================================= */}
                <div
                    ref={contentRef}
                    className="w-full lg:col-span-6 flex flex-col bg-white p-10 md:p-14 lg:p-20 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-20"
                    style={{ borderRadius: '0px' }}
                >
                    <div className="gsap-stagger-item flex items-center gap-3 mb-8">
                        <Users className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
                            EXPERT EDUCATORS
                        </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-[#15283D] !text-[#15283D] leading-[1.05] mb-8 tracking-tight">
                        Highly Qualified <em className="italic text-[#334a89] !text-[#334a89] block mt-1">Faculty.</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#ffc715] mb-10 shadow-sm" />

                    <div className="gsap-stagger-item font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] space-y-6 font-medium leading-[1.65]">
                        <p>
                            Behind every successful student is a teacher who inspires, guides, and believes in their potential.
                        </p>
                        <p>
                            Our Senior School students are supported by a team of highly qualified educators who bring subject expertise, professional experience, and a commitment to continuous growth. Through ongoing training and professional development, our faculty remain aligned with evolving educational standards and best practices.
                        </p>
                    </div>

                    {/* One-Shot Typesetting Thesis */}
                    <div ref={textRef} className="gsap-stagger-item pt-10 mt-8 border-t border-[#15283D]/10">
                        <p className="font-['Quicksand'] font-bold text-lg md:text-xl text-[#15283D] !text-[#15283D] leading-[1.6]">
                            {renderWords("More importantly, they understand that education is about more than teaching content. It is about developing confidence, character, curiosity, and a lifelong love for learning.")}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    RIGHT: CINEMATIC PARALLAX IMAGE
                ========================================================= */}
                <div className="w-full lg:col-span-6 flex justify-center lg:justify-end relative z-10 lg:-ml-16">
                    <div
                        ref={imgWrapRef}
                        // Raw, unbordered image container tucked cleanly under the white card
                        className="w-full aspect-[4/5] lg:h-[750px] relative overflow-hidden bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer"
                        style={{ borderRadius: '0px' }}
                    >
                        {/* Nested wrapper for CSS hover scale, protecting the GSAP Y-axis scrub */}
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                            <img
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783270739/image00021_n01slb.jpg"
                                alt="Expert Faculty"
                                className="absolute h-[120%] -top-[10%] w-full object-cover will-change-transform contrast-[1.05]"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
