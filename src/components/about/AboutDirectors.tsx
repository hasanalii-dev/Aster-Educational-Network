import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const directors = [
    {
        name: "Salman Mustafa",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fsalman-mustafa.jpg&w=256&q=75",
        message: "Every child is capable of excellence when learning is meaningful, engaging, and supported by high expectations.\n\nAt Aster, we encourage students to think deeply, stay curious, and continuously improve. True excellence goes beyond grades—it is reflected in a student's commitment to learning, resilience through challenges, and determination to reach their full potential - Whatever It Takes!"
    },
    {
        name: "Nawaid Ali",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fnawaid-ali.jpg&w=256&q=75",
        message: "I believe leadership begins when children are given the confidence to speak, contribute, and take responsibility.\n\nThrough debates, Model United Nations, presentations, and student-led initiatives, Aster students learn to communicate with confidence and lead with purpose.\n\nWhen children find their voice, they discover their ability to create positive change."
    },
    {
        name: "Kashan Iqbal",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fkashan-iqbal.jpg&w=256&q=75",
        message: "Education should prepare students for the future, not just the present. Technology is changing the world at an unprecedented pace, and children need opportunities to think creatively, solve problems, and adapt to new challenges.\n\nThrough Robotics, Digital Literacy, and hands-on learning experiences, Aster students learn to become creators, innovators, and critical thinkers. Our goal is to help students develop the skills and confidence needed to thrive in a rapidly evolving world."
    },
    {
        name: "Mughees Bilwani",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fmughees-bilwani.jpg&w=256&q=75",
        message: "As a Director at Premier Club, one of Pakistan's leading sports clubs, I have seen firsthand how sport shapes character, builds resilience, and develops lifelong habits of excellence. I am of the view that some of life's most important lessons are learned through sport.\n\nThrough training, competition, and teamwork, children develop discipline, resilience, perseverance, and confidence. They learn how to handle success with humility and challenges with determination. At Aster, sports are an essential part of student development. We are proud of the achievements our students continue to earn, but even more proud of the character they build along the way."
    },
    {
        name: "Shehroz Iqbal",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fshehroz-iqbal.jpg&w=256&q=75",
        message: "I believe children thrive when they feel valued, supported, and connected. A positive learning environment is built on strong relationships between students, educators, and families.\n\nAt Aster, we work to create a culture where every child feels seen, heard, and encouraged to be their best self. When children experience a sense of belonging, they develop confidence, wellbeing, and the security needed to take on new challenges and opportunities. Together, we create a community where every child can flourish - Whatever It Takes!"
    },
    {
        name: "Zarak Mushtaq",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fzarak-mushtaq.jpg&w=256&q=75",
        message: "Education is most powerful when it helps children develop strong character alongside strong knowledge. At Aster, we encourage students to lead with integrity, act with compassion, and remain grounded in their values.\n\nThrough faith, reflection, and everyday experiences, children learn the importance of humility, responsibility, gratitude, and service. Success is not only measured by what a child achieves, but by the kind of person they become. Our goal is to nurture individuals who make a positive difference wherever life takes them."
    },
    {
        name: "Omer Altaf",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fomer-altaf.jpg&w=256&q=75",
        message: "Learning becomes most meaningful when students have opportunities to apply it in the real world. At Aster, initiatives such as Genius Hour, Star Bites, student-led projects, and fundraising activities encourage children to take ownership of their ideas and turn them into action.\n\nThese experiences help students develop creativity, initiative, problem-solving skills, and an entrepreneurial mindset. When children learn by doing, they gain the confidence to create, contribute, and make an impact beyond the classroom - Whatever It Takes!"
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
        <section ref={sectionRef} className="w-full py-20 md:py-32 bg-white relative z-10">
            <div className="max-w-[900px] mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-bold text-[#15283D]">
                        Director Messages
                    </h2>
                </div>

                <div className="flex flex-col gap-24">
                    {directors.map((director, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <div key={idx} className="director-card relative bg-[#b0b0b0] rounded-[40px] pt-16 pb-12 px-8 md:px-16 shadow-md mt-6">
                                
                                {isEven ? (
                                    <>
                                        {/* Image Top Left */}
                                        <div className="absolute -top-12 left-6 md:left-12 w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-white overflow-hidden shadow-lg bg-white">
                                            <img src={director.image} alt={director.name} className="w-full h-full object-cover" />
                                        </div>
                                        {/* Quotes Top Right */}
                                        <div className="absolute -top-10 right-6 md:right-12 text-8xl md:text-9xl font-['Playfair_Display'] text-[#334a89] leading-none select-none">
                                            ”
                                        </div>
                                        {/* Name aligned with image */}
                                        <h3 className="font-['Playfair_Display'] text-2xl md:text-4xl font-bold text-[#15283D] ml-32 md:ml-40 mb-10 mt-2">
                                            {director.name}
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        {/* Image Top Right */}
                                        <div className="absolute -top-12 right-6 md:right-12 w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-white overflow-hidden shadow-lg bg-white">
                                            <img src={director.image} alt={director.name} className="w-full h-full object-cover" />
                                        </div>
                                        {/* Quotes Top Left */}
                                        <div className="absolute -top-6 left-6 md:left-12 text-8xl md:text-9xl font-['Playfair_Display'] text-[#334a89] leading-none select-none">
                                            “
                                        </div>
                                        {/* Name aligned with image */}
                                        <h3 className="font-['Playfair_Display'] text-2xl md:text-4xl font-bold text-[#15283D] mr-32 md:mr-40 mb-10 mt-2 text-right">
                                            {director.name}
                                        </h3>
                                    </>
                                )}

                                {/* Message */}
                                <div className={`font-['Quicksand'] font-medium text-white text-[15px] md:text-[17px] leading-[1.8] italic flex flex-col gap-4 ${isEven ? 'text-left' : 'text-right'}`}>
                                    {director.message.split('\n\n').map((para, i) => (
                                        <p key={i}>
                                            {para.includes('Whatever It Takes') ? (
                                                <>
                                                    {para.split('Whatever It Takes')[0]}
                                                    <span className="font-bold">Whatever It Takes!</span>
                                                    {para.split('Whatever It Takes')[1]?.replace('!', '')}
                                                </>
                                            ) : (
                                                para
                                            )}
                                        </p>
                                    ))}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
