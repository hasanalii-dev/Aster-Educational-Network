import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ApproachBeyondClassroom() {
    const sectionRef = useRef<HTMLElement>(null)
    const chipsRef = useRef<HTMLDivElement>(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.beyond-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            if (chipsRef.current) {
                gsap.fromTo(chipsRef.current.children,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: chipsRef.current, start: 'top 85%' }
                    }
                )
            }

            const visualContainer = sectionRef.current?.querySelector('.visual-container')
            if (visualContainer) {
                gsap.fromTo(visualContainer,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                    }
                )
            }
            
            const parallaxImg = sectionRef.current?.querySelector('.parallax-img')
            if (parallaxImg) {
                gsap.fromTo(parallaxImg,
                    { yPercent: -10, scale: 1.1 },
                    {
                        yPercent: 10, scale: 1.1, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const activities = [
        "Annual performances",
        "Sports and movement",
        "Robotics competitions",
        "Passion Projects",
        "Sustainability initiatives",
        "Field trips",
        "Leadership opportunities",
        "Student-led experiences"
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-white relative z-10">
            {/* TOP LINTEL: SCALLOPED DIE-CUT PAPER CLOUD BORDER (White, pointing UP) */}
            <div className="absolute top-0 left-0 right-0 h-8 md:h-12 text-white pointer-events-none z-20 transform -translate-y-full">
                <svg className="w-full h-full transform -scale-y-100" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                    <div className="visual-container relative h-[500px] md:h-[650px] w-full overflow-hidden shadow-2xl">
                        {!imgLoaded && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                        )}
                        <img
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783266524/470527936_1668017837112742_7269969993980830315_n_eru41u.jpg"
                            alt="Students engaged in activities"
                            onLoad={() => setImgLoaded(true)}
                            className={`parallax-img w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 beyond-text">
                        <Compass className="w-5 h-5 text-[#FFC51B]" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            LEARNING BEYOND THE CLASSROOM
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-8 beyond-text tracking-tight">
                        Education extends far <em className="italic text-[#3A53A4]">beyond</em> traditional academics.
                    </h2>

                    <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-[1.75] beyond-text mb-8">
                        Students participate in a variety of dynamic programs:
                    </p>

                    <div ref={chipsRef} className="flex flex-wrap gap-3 mb-10">
                        {activities.map((activity, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#fbfaf8] border border-gray-200 text-[#1c1c1c] font-['Quicksand'] font-bold text-sm md:text-base hover:bg-[#FBBB21] hover:border-[#FBBB21] transition-colors duration-300 cursor-default"
                            >
                                {activity}
                            </span>
                        ))}
                    </div>

                    <p className="font-['Quicksand'] font-bold text-[#3A53A4] text-xl leading-[1.6] beyond-text border-l-4 border-[#FBBB21] pl-6 py-2">
                        These experiences help students develop confidence, communication, teamwork, resilience, and independence through real participation and meaningful challenges.
                    </p>
                </div>

            </div>

            {/* BOTTOM LINTEL: SCALLOPED DIE-CUT BORDER (White, pointing DOWN) */}
            <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 text-white pointer-events-none z-20 transform translate-y-full">
                <svg className="w-full h-full" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 L1200,0 L1200,24 Q1170,48 1140,24 Q1110,48 1080,24 Q1050,48 1020,24 Q990,48 960,24 Q930,48 900,24 Q870,48 840,24 Q810,48 780,24 Q750,48 720,24 Q690,48 660,24 Q630,48 600,24 Q570,48 540,24 Q510,48 480,24 Q450,48 420,24 Q390,48 360,24 Q330,48 300,24 Q270,48 240,24 Q210,48 180,24 Q150,48 120,24 Q90,48 60,24 Q30,48 0,24 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </section>
    )
}

