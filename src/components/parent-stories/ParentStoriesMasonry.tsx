import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
    {
        quote: "The personalized attention my daughter receives at Aster has completely transformed her confidence. She comes home every day excited to learn and share what she discovered.",
        name: "Sarah Ahmed",
        role: "Parent of Grade 3 Student",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        theme: "white"
    },
    {
        quote: "We chose Aster because of their holistic approach. It’s not just about academics; it's about building character, empathy, and resilience. The teachers truly go above and beyond.",
        name: "Omar Tariq",
        role: "Parent of Grade 5 Student",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        theme: "blue"
    },
    {
        quote: "Moving to a new city was tough on our son, but the Aster community welcomed us with open arms. The integration process was seamless, and he’s thriving socially and academically.",
        name: "Fatima & Ali Hassan",
        role: "Parents of Grade 1 Student",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&auto=format&fit=crop",
        theme: "light"
    },
    {
        quote: "The modern facilities and the integration of technology in the classrooms give the students a massive advantage. I know my child is being prepared for the future.",
        name: "Kamran Bukhari",
        role: "Parent of Grade 8 Student",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        theme: "white"
    },
    {
        quote: "What impressed me most was the level of communication. We always know exactly how our child is doing, what they are struggling with, and how we can support them at home.",
        name: "Aisha Rehman",
        role: "Parent of Grade 4 Student",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        theme: "white"
    },
    {
        quote: "The sports and arts programs are just as rigorous and respected as the academics. My son has found his passion in the drama club, and his confidence has skyrocketed.",
        name: "Zainab Malik",
        role: "Parent of Grade 7 Student",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        theme: "yellow"
    },
    {
        quote: "Every teacher we've encountered has been exceptional. They don't just teach the curriculum; they inspire curiosity and a genuine love for learning.",
        name: "Dr. Saad Khan",
        role: "Parent of Grade 6 Student",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        theme: "blue"
    },
    {
        quote: "We were worried about the transition from preschool, but the junior campus team made it effortless. The play-based learning approach is beautifully balanced with foundational academics.",
        name: "Hina Syed",
        role: "Parent of Prep Student",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
        theme: "white"
    }
]

export function ParentStoriesMasonry() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
            
            // Full block reveal on scroll, no scrub
            gsap.fromTo(cards, 
                { opacity: 0, y: 40 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.masonry-grid',
                        start: 'top 80%',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAF9] px-6 md:px-12 relative z-20">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#15283D] mb-4">
                        Trusted by Families
                    </h2>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg max-w-2xl">
                        Discover how The Aster School is making a lasting impact on our students and their families, straight from the parents themselves.
                    </p>
                </div>

                <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonials.map((testimonial, idx) => {
                        // Determine styling based on theme
                        let bgClass = "bg-white"
                        let textClass = "text-[#15283D]"
                        let roleClass = "text-[#5C5C61]"
                        let quoteIconColor = "text-[#334a89]/10"
                        let borderClass = "border border-[#E5E7EB]"

                        if (testimonial.theme === 'blue') {
                            bgClass = "bg-[#334a89]"
                            textClass = "text-white"
                            roleClass = "text-white/70"
                            quoteIconColor = "text-white/10"
                            borderClass = "border border-[#394da1]"
                        } else if (testimonial.theme === 'yellow') {
                            bgClass = "bg-[#ffc715]"
                            textClass = "text-[#15283D]"
                            roleClass = "text-[#15283D]/70"
                            quoteIconColor = "text-[#15283D]/10"
                            borderClass = "border border-[#e6b313]"
                        } else if (testimonial.theme === 'light') {
                            bgClass = "bg-[#F4F6F8]"
                            borderClass = "border border-transparent"
                        }

                        return (
                            <div 
                                key={idx} 
                                className={`testimonial-card break-inside-avoid p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(21,40,61,0.04)] hover:shadow-[0_30px_60px_rgba(21,40,61,0.08)] transition-all duration-500 hover:-translate-y-1 ${bgClass} ${borderClass}`}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <svg className={`w-12 h-12 ${quoteIconColor}`} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                    </svg>
                                </div>
                                <p className={`font-['Quicksand'] text-[17px] leading-[1.65] font-medium mb-8 ${textClass}`}>
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/20">
                                        <img 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <h4 className={`font-['Quicksand'] font-bold text-[15px] leading-tight ${textClass}`}>
                                            {testimonial.name}
                                        </h4>
                                        <p className={`font-['Quicksand'] text-[13px] font-medium mt-1 ${roleClass}`}>
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
