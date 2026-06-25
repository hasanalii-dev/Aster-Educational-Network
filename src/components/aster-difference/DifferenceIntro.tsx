import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DifferenceIntro() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ---------------------------------------------------------
            // 1. MASTER TIMELINE: Header & Gallery Deal Animation
            // ---------------------------------------------------------
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            })

            if (headerRef.current) {
                tl.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
                )
            }

            const cards = gsap.utils.toArray<HTMLElement>('.gsap-photo-card')
            const rotations = [-8, -3, 0, 3, 8] // Original fan angles
            const zIndexes = [10, 20, 30, 20, 10] // Base architectural stacking order

            cards.forEach((card, i) => {
                // The "Deal" Animation
                tl.fromTo(
                    card,
                    { opacity: 0, y: 80, rotation: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        rotation: rotations[i],
                        scale: 1,
                        duration: 0.9,
                        ease: 'back.out(1.2)',
                    },
                    0.6 + (i * 0.1)
                )

                // The "Spring-Loaded" Physics Hover
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        rotation: 0,
                        scale: 1.08,
                        zIndex: 50, // Pop above all other cards
                        duration: 0.5,
                        ease: 'back.out(2)', // Physical rubber-band bounce
                        overwrite: 'auto'
                    })
                })

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotation: rotations[i], // Snap back to specific fan angle
                        scale: 1,
                        zIndex: zIndexes[i], // Restore original stack order
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    })
                })
            })

            // ---------------------------------------------------------
            // 2. THE MECHANICAL TYPESETTING SCRUB (Zvolta Upgrade)
            // ---------------------------------------------------------
            const words = gsap.utils.toArray<HTMLElement>('.gsap-prose-word')

            gsap.fromTo(
                words,
                {
                    color: 'rgba(92, 92, 97, 0.15)', // Faint ghost text
                    y: 4 // Pushed down slightly
                },
                {
                    color: (_, el) => el.dataset.color || '#5C5C61', // Resolve to dataset target color
                    y: 0, // Physically locks into place as it colors in
                    stagger: 0.1,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 85%',
                        end: 'bottom 60%',
                        scrub: 1.5, // Buttery smooth interpolation delay
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Helper function to split paragraphs into span-wrapped words for GSAP targeting
    const renderWords = (text: string, finalColorHex: string, customClass: string = '') => {
        return text.split(' ').map((word, i) => (
            <span
                key={i}
                className={`gsap-prose-word inline-block mr-[0.25em] will-change-transform ${customClass}`}
                data-color={finalColorHex}
            >
        {word}
      </span>
        ))
    }

    return (
        /* STRICT Pure White Canvas. Zero Black sitewide. */
        <section ref={sectionRef} className="pt-16 pb-24 md:pt-24 md:pb-36 px-6 md:px-12 bg-white text-[#15283D] overflow-hidden select-none">
            <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">

                {/* =========================================================
            HEADER & MASTER TITLE
        ========================================================= */}
                <div ref={headerRef} className="flex flex-col items-center max-w-4xl mx-auto mb-16 md:mb-24">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-6 h-6 flex items-center justify-center text-[#ffc715]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ffc715]">
                                <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                                <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                                <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] uppercase mt-0.5">
                            EDUCATION DESIGNED FOR THE WORLD AHEAD
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#15283D] leading-[1.1]">
                        The world our children are growing into will demand far more than <em className="font-medium italic text-[#334a89]">academic knowledge.</em>
                    </h2>
                </div>

                {/* =========================================================
            THE SPREAD GALLERY (3:4 Portrait Ratio)
            Driven entirely by GSAP hover physics instead of Tailwind.
        ========================================================= */}
                <div ref={galleryRef} className="flex justify-center items-center w-full mb-20 md:mb-32 -space-x-8 md:-space-x-12 lg:-space-x-16 perspective-[1000px] px-4">

                    {/* Card 1: Far Left */}
                    <div className="gsap-photo-card relative z-10 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_15px_40px_rgba(21,40,61,0.12)] overflow-hidden mt-12 md:mt-16 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" alt="Students collaborating" className="w-full h-full object-cover" />
                    </div>

                    {/* Card 2: Mid Left */}
                    <div className="gsap-photo-card relative z-20 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_20px_45px_rgba(21,40,61,0.14)] overflow-hidden mt-4 md:mt-6 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Classroom learning" className="w-full h-full object-cover" />
                    </div>

                    {/* Card 3: Center (Hero) */}
                    <div className="gsap-photo-card relative z-30 w-32 sm:w-44 md:w-60 lg:w-72 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_25px_50px_rgba(21,40,61,0.18)] overflow-hidden -mt-4 transform-gpu cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Technology and Robotics" className="w-full h-full object-cover" />
                    </div>

                    {/* Card 4: Mid Right */}
                    <div className="gsap-photo-card relative z-20 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_20px_45px_rgba(21,40,61,0.14)] overflow-hidden mt-4 md:mt-6 transform-gpu cursor-pointer hidden sm:block">
                        <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop" alt="Campus life" className="w-full h-full object-cover" />
                    </div>

                    {/* Card 5: Far Right */}
                    <div className="gsap-photo-card relative z-10 w-28 sm:w-40 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl bg-gray-200 border-[6px] border-white shadow-[0_15px_40px_rgba(21,40,61,0.12)] overflow-hidden mt-12 md:mt-16 transform-gpu cursor-pointer hidden sm:block">
                        <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" alt="Student in deep focus" className="w-full h-full object-cover" />
                    </div>

                </div>

                {/* =========================================================
            PROSE & THESIS (The Typesetting Scrub Container)
        ========================================================= */}
                <div ref={textRef} className="flex flex-col items-center max-w-3xl mx-auto gsap-scrub-container">

                    <div className="w-16 h-[2px] bg-[#ffc715] mb-10" />

                    <div className="font-['Quicksand'] text-base md:text-lg lg:text-[22px] leading-[1.65] space-y-8 md:space-y-10 font-medium">
                        <p>
                            {renderWords(
                                "It will require creativity, adaptability, emotional intelligence, technological fluency, leadership, and the confidence to navigate challenges that do not yet exist today.",
                                "#5C5C61"
                            )}
                        </p>
                        <p>
                            {renderWords(
                                "At The Aster School, we believe education should prepare students not only for examinations, but for life. That belief shapes everything we do.",
                                "#5C5C61"
                            )}
                        </p>
                        <p>
                            {renderWords(
                                "From the way students learn and lead, to the opportunities they are given to explore, create, compete, and contribute, every aspect of the Aster experience is intentionally designed to help children become capable, confident, and future-ready individuals.",
                                "#5C5C61"
                            )}
                        </p>
                        <p className="pt-4">
                            {renderWords(
                                "Because education should not simply prepare children for the next grade. It should prepare them for the future.",
                                "#334a89",
                                "font-bold text-xl md:text-2xl lg:text-[26px]"
                            )}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}