import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const directors = [
    {
        name: "Salman Mustafa",
        message: "Every child is capable of achieving excellence when learning is meaningful, engaging, and supported by high expectations. At Aster, we challenge students to think deeply, stay curious, and continuously improve. Academic success is important, but true excellence goes beyond grades. It is reflected in a student's commitment to learning, perseverance through challenges, and desire to reach their full potential. Our goal is to help every child develop the knowledge, skills, and mindset needed to succeed in school and beyond - Whatever It Takes!"
    },
    {
        name: "Nawaid Ali",
        message: "I believe leadership begins long before adulthood. It begins when children are given the confidence to speak, contribute, and take responsibility. At Aster, students are encouraged to share ideas, lead initiatives, participate in debates, Model United Nations, presentations, and meaningful discussions. These experiences help them develop confidence, communication skills, and the courage to make their voices heard. When children learn to lead with confidence and purpose, they discover their ability to create positive change."
    },
    {
        name: "Kashan Iqbal",
        message: "Education should prepare students for the future, not just the present. Technology is changing the world at an unprecedented pace, and children need opportunities to think creatively, solve problems, and adapt to new challenges. Through Robotics, Digital Literacy, and hands-on learning experiences, Aster students learn to become creators, innovators, and critical thinkers. Our goal is to help students develop the skills and confidence needed to thrive in a rapidly evolving world."
    },
    {
        name: "Mughees Bilwani",
        message: "As a Director at Premier Club, one of Pakistan's leading sports clubs, I have seen firsthand how sport shapes character, builds resilience, and develops lifelong habits of excellence. I am of the view that some of life's most important lessons are learned through sport. Through training, competition, and teamwork, children develop discipline, resilience, perseverance, and confidence. They learn how to handle success with humility and challenges with determination. At Aster, sports are an essential part of student development. We are proud of the achievements our students continue to earn, but even more proud of the character they build along the way."
    },
    {
        name: "Shehroz Iqbal",
        message: "I believe children thrive when they feel valued, supported, and connected. A positive learning environment is built on strong relationships between students, educators, and families. At Aster, we work to create a culture where every child feels seen, heard, and encouraged to be their best self. When children experience a sense of belonging, they develop confidence, wellbeing, and the security needed to take on new challenges and opportunities. Together, we create a community where every child can flourish - Whatever It Takes!"
    },
    {
        name: "Zarak Mushtaq",
        message: "Education is most powerful when it helps children develop strong character alongside strong knowledge. At Aster, we encourage students to lead with integrity, act with compassion, and remain grounded in their values. Through faith, reflection, and everyday experiences, children learn the importance of humility, responsibility, gratitude, and service. Success is not only measured by what a child achieves, but by the kind of person they become. Our goal is to nurture individuals who make a positive difference wherever life takes them."
    },
    {
        name: "Omer Altaf",
        message: "Learning becomes most meaningful when students have opportunities to apply it in the real world. At Aster, initiatives such as Genius Hour, Star Bites, student-led projects, and fundraising activities encourage children to take ownership of their ideas and turn them into action. These experiences help students develop creativity, initiative, problem-solving skills, and an entrepreneurial mindset. When children learn by doing, they gain the confidence to create, contribute, and make an impact beyond the classroom - Whatever It Takes!"
    }
]

export function AboutDirectors() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".director-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 bg-[#f8f9fa] relative z-10 border-t border-[#334a89]/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col items-center justify-center gap-4 mb-16 md:mb-24 text-center">
                    <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#ffc715] uppercase">
                        LEADERSHIP
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#334a89]">
                        Director's Messages
                    </h2>
                    <div className="h-1 w-24 bg-[#e97f7b] mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {directors.map((director, idx) => (
                        <div key={idx} className="director-card bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center border border-[#334a89]/5 hover:-translate-y-2 transition-transform duration-500 group">
                            {/* Placeholder Image */}
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#334a89]/5 to-[#334a89]/10 flex items-center justify-center mb-6 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                                <span className="font-['Playfair_Display'] text-3xl font-bold text-[#334a89]">
                                    {director.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            
                            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#15283D] mb-2">
                                {director.name}
                            </h3>
                            <p className="font-['Quicksand'] text-xs font-bold text-[#e97f7b] tracking-[0.15em] uppercase mb-8">
                                Director
                            </p>
                            
                            <div className="relative w-full h-full flex items-center">
                                <span className="absolute -top-4 -left-2 text-6xl font-['Playfair_Display'] text-[#334a89]/[0.03] leading-none">"</span>
                                <p className="font-['Quicksand'] font-medium text-[15px] text-[#5C5C61] leading-[1.8] relative z-10 italic w-full">
                                    "{director.message}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
