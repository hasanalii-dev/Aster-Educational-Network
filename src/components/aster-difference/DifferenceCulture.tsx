import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceCulture() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Content Stagger
            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll('.gsap-stagger-item')
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 2. Image Reveal & Parallax
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        }
                    }
                )

                const imgElement = imageRef.current.querySelector('img')
                if (imgElement) {
                    gsap.fromTo(
                        imgElement,
                        { yPercent: -8, scale: 1.05 },
                        {
                            yPercent: 8,
                            scale: 1.05,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imageRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            }
                        }
                    )
                }
            }

            // 3. Mechanical Typesetting Scrub (Footer Thesis)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
            if (words.length > 0) {
                gsap.fromTo(
                    words,
                    { opacity: 0.2, y: 4 }, // Ghosted state
                    {
                        opacity: 1,
                        y: 0, // Physically locks into place
                        stagger: 0.1,
                        ease: 'power1.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 90%',
                            end: 'bottom 75%',
                            scrub: 1.5,
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const footerText = "Students who can communicate confidently are prepared to lead confidently."

    return (
        /* STRICT Pure White Canvas. Zero Black sitewide. */
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAFAFA] select-none border-t border-[#334a89]/5 overflow-hidden">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* =========================================================
            LEFT COLUMN: THE RAW ARCHITECTURAL IMAGE
            Strictly rounded-none, shadow-none.
        ========================================================= */}
                <div
                    ref={imageRef}
                    className="order-2 lg:order-1 relative h-[500px] md:h-[640px] w-full rounded-none shadow-none overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                        alt="Culture of Reading"
                        className="w-full h-full object-cover will-change-transform contrast-[1.02]"
                    />
                </div>

                {/* =========================================================
            RIGHT COLUMN: THE CONTENT PLINTH
        ========================================================= */}
                <div ref={contentRef} className="order-1 lg:order-2 flex flex-col">

                    {/* Header Lockup (Pixel Squares Ellipsis) */}
                    <div className="gsap-stagger-item flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#334a89]">
                            <rect x="2" y="9" width="6" height="6" rx="1" />
                            <rect x="10" y="9" width="6" height="6" rx="1" fill="#FFC51B" />
                            <rect x="18" y="9" width="6" height="6" rx="1" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
              READING & COMMUNICATION
            </span>
                    </div>

                    <h2 className="gsap-stagger-item font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#334a89] !text-[#334a89] mb-8 leading-[1.05]">
                        Building Confident Thinkers and <em className="font-medium italic text-[#FFC51B] !text-[#FFC51B]">Communicators</em>
                    </h2>

                    <div className="gsap-stagger-item w-16 h-[2px] bg-[#FFC51B] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg text-[#5C5C61] !text-[#5C5C61] space-y-6 md:space-y-8 leading-[1.65] font-medium mb-10">
                        <p className="gsap-stagger-item">
                            Strong communication skills begin with strong literacy foundations. At Aster, reading is embedded into school culture through initiatives such as DEAR (Drop Everything and Read), Readathon, and our annual Reading Carnival.
                        </p>
                        <p className="gsap-stagger-item">
                            Through Readathon, students engage with books independently and document their reflections, learning, and insights through specially designed Aster workbooks. This process strengthens comprehension, critical thinking, and a deeper connection with reading.
                        </p>
                        <p className="gsap-stagger-item">
                            Beyond literacy, students are regularly encouraged to communicate their ideas through presentations, discussions, debates, storytelling, and public speaking opportunities.
                        </p>
                        <p className="gsap-stagger-item">
                            Many students also participate in Model United Nations (MUN) conferences and debating events, developing the confidence to engage with complex issues, think critically, and express their perspectives effectively.
                        </p>
                    </div>

                    {/* Typesetting Scrub Container */}
                    <div ref={textRef} className="gsap-stagger-item pt-6 border-t border-[#334a89]/10">
                        <p className="font-['Quicksand'] font-bold text-[#334a89] !text-[#334a89] text-xl md:text-2xl leading-snug">
                            {footerText.split(' ').map((word, i) => (
                                <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] will-change-transform">
                  {word}
                </span>
                            ))}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}