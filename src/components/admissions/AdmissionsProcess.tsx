import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AdmissionsProcess() {
    const sectionRef = useRef<HTMLElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    const steps: { num: string, title: string, desc: string, action?: { label: string, href: string } }[] = [
        {
            num: "1",
            title: "Submit an Enquiry",
            desc: "Complete the enquiry form and share your child's details with our admissions team.",
            action: {
                label: "Fill Admissions Form",
                href: "/apply"
            }
        },
        {
            num: "2",
            title: "Campus Visit & Parent Meeting",
            desc: "Visit the campus, explore our learning environments, and meet members of our admissions team to learn more about the Aster experience."
        },
        {
            num: "3",
            title: "Student Observation or Assessment",
            desc: "Depending on the age and grade level, students may participate in a classroom observation, interaction session, or age-appropriate assessment."
        },
        {
            num: "4",
            title: "Admission Decision",
            desc: "Families will be informed of the admission outcome and offered placement based on seat availability and admissions criteria."
        },
        {
            num: "5",
            title: "Enrollment & Welcome to Aster",
            desc: "Upon confirmation, families complete the enrollment process and begin their journey as part of the Aster community."
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Header Entrance (Plays Once)
            gsap.fromTo('.header-content',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true // Ensures it only plays once per page load
                    }
                }
            )

            // 2. The Interactive Scroll Line (Tracks your scroll position)
            if (lineRef.current && timelineRef.current) {
                gsap.to(lineRef.current, {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 75%',
                        end: 'bottom 85%',
                        scrub: true
                    }
                })
            }

            // 3. Sequential Step Reveal (Plays Once)
            const stepElements = gsap.utils.toArray<HTMLElement>('.process-step')
            stepElements.forEach((step) => {
                const marker = step.querySelector('.step-marker')
                const content = step.querySelector('.step-content')

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        once: true // CRITICAL: Ensures the pop-in animation only happens once
                    }
                })

                // Marker pops in, then content slides in right after
                tl.fromTo(marker,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
                ).fromTo(content,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
                    "-=0.4"
                )
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-24 border-b border-[#E5E7EB] overflow-hidden select-none">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Header Section */}
                <div className="header-content max-w-3xl mb-16 md:mb-20">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        The Admissions Process
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight mb-6 tracking-tight">
                        A Simple Journey Towards Enrollment
                    </h2>
                </div>

                {/* Timeline Section */}
                <div ref={timelineRef} className="relative w-full">

                    {/* Background Static Line */}
                    {/* Using exact pixel placement and -translate-x-1/2 for flawless center alignment */}
                    <div className="absolute top-2 bottom-2 left-[24px] md:left-[40px] w-[2px] bg-[#E5E7EB] -translate-x-1/2 z-0" />

                    {/* Active Scrolling Line (Aster Yellow) */}
                    <div ref={lineRef} className="absolute top-2 bottom-2 left-[24px] md:left-[40px] w-[2px] bg-[#ffc715] origin-top scale-y-0 -translate-x-1/2 z-0" />

                    {/* Steps */}
                    {steps.map((step, i) => (
                        <div key={i} className="process-step relative pb-12 md:pb-16 last:pb-0">

                            {/* Marker */}
                            {/* EXACT same left positioning as the line, guaranteeing the line runs straight through the center */}
                            <div className="step-marker absolute top-[-2px] md:top-[-4px] left-[24px] md:left-[40px] w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 bg-[#334a89] rounded-full flex items-center justify-center font-['Quicksand'] font-bold text-white text-base md:text-lg border-[4px] border-white shadow-[0_4px_10px_rgba(51,74,137,0.15)] z-10">
                                {step.num}
                            </div>

                            {/* Content */}
                            {/* Padding pushes the text safely away from the marker radius */}
                            <div className="step-content pl-[64px] md:pl-[96px]">
                                <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-[#15283D] mb-3">
                                    Step {step.num}: {step.title}
                                </h3>
                                <p className="font-['Quicksand'] text-[#5C5C61] text-base md:text-lg font-medium leading-relaxed max-w-3xl">
                                    {step.desc}
                                </p>
                                {step.action && (
                                    <Link to={step.action.href} className="inline-flex items-center gap-2 mt-4 font-['Quicksand'] font-bold text-sm tracking-widest text-[#334a89] uppercase transition-colors hover:text-[#ffc715]">
                                        {step.action.label}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </Link>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}