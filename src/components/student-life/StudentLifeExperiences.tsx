import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
    {
        title: 'Swimming',
        desc: 'For many students, swimming is one of the most anticipated parts of the week. Beyond developing physical fitness and confidence in the water, students learn discipline, perseverance, and the importance of consistent effort.',
        image: 'https://images.unsplash.com/photo-1519315901367-f34f927e698e?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Sports',
        desc: 'Whether on the football field, gymnastics floor, taekwondo mat, or during team competitions, students develop resilience, teamwork, leadership, and sportsmanship while enjoying the excitement of healthy competition.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Robotics',
        desc: 'Students love the opportunity to build, create, experiment, and solve problems through Robotics. These hands-on experiences encourage creativity, innovation, and critical thinking while making learning engaging and enjoyable.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    }
]

export function StudentLifeExperiences() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.exp-intro',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.0, stagger: 0.2, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            const cards = gsap.utils.toArray('.exp-card') as HTMLElement[]
            cards.forEach((card, i) => {
                const imgContainer = card.querySelector('.exp-img-wrapper')
                
                // Horizontal Image Reveal
                gsap.fromTo(imgContainer,
                    { clipPath: i % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 1.5,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        }
                    }
                )

                gsap.fromTo(card.querySelectorAll('.exp-text'),
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#334a89] text-white px-6 md:px-12">
            <div className="max-w-[1360px] mx-auto">
                
                {/* Intro Block */}
                <div className="max-w-[900px] mx-auto text-center mb-24 md:mb-32">
                    <div className="flex items-center justify-center gap-3 mb-6 exp-intro">
                        <span className="w-8 h-[2px] bg-[#ffc715]"></span>
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase">
                            MORE THAN A CLASSROOM
                        </span>
                        <span className="w-8 h-[2px] bg-[#ffc715]"></span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 exp-intro !text-white">
                        Learning Through <em className="italic text-[#ffc715]">Experiences</em>
                    </h2>

                    <div className="font-['Quicksand'] font-medium text-lg text-white/80 leading-relaxed space-y-6 exp-intro max-w-[800px] mx-auto">
                        <p>
                            Some of the most meaningful learning happens when children step beyond the classroom walls.
                        </p>
                        <p>
                            Throughout the year, students participate in field trips, exhibitions, annual performances, themed learning experiences, student showcases, and special events that bring learning to life.
                        </p>
                        <p>
                            These opportunities help students make connections between what they learn in school and the world around them while building confidence, communication skills, and a broader perspective.
                        </p>
                        <p className="text-[#ffc715] font-bold text-xl mt-4">
                            Learning becomes more meaningful when it can be seen, experienced, and shared.
                        </p>
                    </div>
                </div>

                {/* The Experiences They Love */}
                <div className="text-center mb-16 exp-intro">
                    <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-4 !text-white">The Experiences Students Love Most</h3>
                    <p className="font-['Quicksand'] text-white/70">Where Passion Meets Participation</p>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className={`exp-card flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-20`}>
                            
                            <div className="w-full lg:w-1/2 h-[350px] md:h-[500px] rounded-[24px] overflow-hidden shadow-2xl relative exp-img-wrapper border-4 border-white/10">
                                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <span className="font-['Playfair_Display'] text-[80px] md:text-[120px] text-white/10 leading-none select-none mb-[-40px] exp-text">
                                    0{idx + 1}
                                </span>
                                <h4 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-6 text-[#ffc715] exp-text">
                                    {exp.title}
                                </h4>
                                <p className="font-['Quicksand'] text-lg text-white/80 leading-relaxed font-medium exp-text">
                                    {exp.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center exp-intro">
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-white max-w-[900px] mx-auto leading-relaxed border-t border-white/10 pt-16">
                        "These are more than activities. They are experiences that help students discover strengths, build confidence, and develop passions that often stay with them for years to come."
                    </p>
                </div>

            </div>
        </section>
    )
}
