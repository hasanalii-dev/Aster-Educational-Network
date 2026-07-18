import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const directors = [
    {
        name: "Salman Mustafa",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fsalman-mustafa.jpg&w=256&q=75",
        color: "#334a89",
        message: "Every child is capable of achieving excellence when learning is meaningful, engaging, and supported by high expectations. At Aster, we challenge students to think deeply, stay curious, and continuously improve. Academic success is important, but true excellence goes beyond grades. It is reflected in a student's commitment to learning, perseverance through challenges, and desire to reach their full potential. Our goal is to help every child develop the knowledge, skills, and mindset needed to succeed in school and beyond - Whatever It Takes!"
    },
    {
        name: "Nawaid Ali",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fnawaid-ali.jpg&w=256&q=75",
        color: "#9765d1",
        message: "I believe leadership begins long before adulthood. It begins when children are given the confidence to speak, contribute, and take responsibility. At Aster, students are encouraged to share ideas, lead initiatives, participate in debates, Model United Nations, presentations, and meaningful discussions. These experiences help them develop confidence, communication skills, and the courage to make their voices heard. When children learn to lead with confidence and purpose, they discover their ability to create positive change."
    },
    {
        name: "Kashan Iqbal",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fkashan-iqbal.jpg&w=256&q=75",
        color: "#e97f7b",
        message: "Education should prepare students for the future, not just the present. Technology is changing the world at an unprecedented pace, and children need opportunities to think creatively, solve problems, and adapt to new challenges. Through Robotics, Digital Literacy, and hands-on learning experiences, Aster students learn to become creators, innovators, and critical thinkers. Our goal is to help students develop the skills and confidence needed to thrive in a rapidly evolving world."
    },
    {
        name: "Mughees Bilwani",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fmughees-bilwani.jpg&w=256&q=75",
        color: "#6ab39d",
        message: "As a Director at Premier Club, one of Pakistan's leading sports clubs, I have seen firsthand how sport shapes character, builds resilience, and develops lifelong habits of excellence. I am of the view that some of life's most important lessons are learned through sport. Through training, competition, and teamwork, children develop discipline, resilience, perseverance, and confidence. They learn how to handle success with humility and challenges with determination. At Aster, sports are an essential part of student development. We are proud of the achievements our students continue to earn, but even more proud of the character they build along the way."
    },
    {
        name: "Shehroz Iqbal",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fshehroz-iqbal.jpg&w=256&q=75",
        color: "#394da1",
        message: "I believe children thrive when they feel valued, supported, and connected. A positive learning environment is built on strong relationships between students, educators, and families. At Aster, we work to create a culture where every child feels seen, heard, and encouraged to be their best self. When children experience a sense of belonging, they develop confidence, wellbeing, and the security needed to take on new challenges and opportunities. Together, we create a community where every child can flourish - Whatever It Takes!"
    },
    {
        name: "Zarak Mushtaq",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fzarak-mushtaq.jpg&w=256&q=75",
        color: "#d4a843",
        message: "Education is most powerful when it helps children develop strong character alongside strong knowledge. At Aster, we encourage students to lead with integrity, act with compassion, and remain grounded in their values. Through faith, reflection, and everyday experiences, children learn the importance of humility, responsibility, gratitude, and service. Success is not only measured by what a child achieves, but by the kind of person they become. Our goal is to nurture individuals who make a positive difference wherever life takes them."
    },
    {
        name: "Omer Altaf",
        image: "https://riyadh.asterschool.com/_next/image?url=%2Faster%2Fabout%2Fdirectors%2Fomer-altaf.jpg&w=256&q=75",
        color: "#e97f7b",
        message: "Learning becomes most meaningful when students have opportunities to apply it in the real world. At Aster, initiatives such as Genius Hour, Star Bites, student-led projects, and fundraising activities encourage children to take ownership of their ideas and turn them into action. These experiences help students develop creativity, initiative, problem-solving skills, and an entrepreneurial mindset. When children learn by doing, they gain the confidence to create, contribute, and make an impact beyond the classroom - Whatever It Takes!"
    }
]

export function AboutDirectors() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const [selectedDirector, setSelectedDirector] = useState<number | null>(null)
    const [scrollPos, setScrollPos] = useState(0)

    const maxScroll = Math.max(0, directors.length - 4)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading animation
            gsap.fromTo(
                ".directors-heading",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            )

            // Cards stagger entrance
            gsap.fromTo(
                ".director-portrait-card",
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".directors-carousel",
                        start: "top 85%",
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const scrollLeft = () => setScrollPos(p => Math.max(0, p - 1))
    const scrollRight = () => setScrollPos(p => Math.min(maxScroll, p + 1))

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-36 bg-[#0e1629] relative z-10 overflow-hidden">
            
            {/* Decorative arc behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.04] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03] pointer-events-none" />
            
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#334a89]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                
                {/* Section Heading */}
                <div className="directors-heading flex flex-col items-center justify-center gap-3 mb-20 md:mb-28 text-center">
                    <div className="flex items-center gap-3 mb-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffc715]">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#ffc715] uppercase">
                            LEADERSHIP
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight">
                        Our Visionary
                        <br />
                        <em className="font-medium italic text-[#ffc715]">Directors</em>
                    </h2>
                    <div className="w-16 h-[2px] bg-[#ffc715] mt-5" />
                </div>

                {/* Cards Carousel */}
                <div className="relative directors-carousel">
                    
                    {/* Navigation Arrows */}
                    <button 
                        onClick={scrollLeft}
                        className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300 ${scrollPos === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button 
                        onClick={scrollRight}
                        className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300 ${scrollPos >= maxScroll ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>

                    {/* Cards Track */}
                    <div className="overflow-hidden">
                        <div 
                            ref={cardsContainerRef}
                            className="flex gap-5 md:gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pb-4"
                            style={{ 
                                transform: `translateX(-${scrollPos * (100 / 4 + 1.5)}%)`,
                            }}
                        >
                            {directors.map((director, idx) => (
                                <div
                                    key={idx}
                                    className="director-portrait-card flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[calc(25%-18px)] cursor-pointer group"
                                    onClick={() => setSelectedDirector(idx)}
                                >
                                    <div 
                                        className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/[0.08] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(51,74,137,0.15)]"
                                        style={{
                                            background: `linear-gradient(180deg, ${director.color}15 0%, ${director.color}08 50%, ${director.color}20 100%)`
                                        }}
                                    >
                                        {/* Photo */}
                                        <img 
                                            src={director.image} 
                                            alt={director.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Gradient overlay at bottom */}
                                        <div 
                                            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none transition-opacity duration-500"
                                            style={{
                                                background: `linear-gradient(to top, ${director.color}ee 0%, ${director.color}80 35%, transparent 100%)`
                                            }}
                                        />

                                        {/* Name overlay - slides up on hover */}
                                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-lg">
                                                {director.name}
                                            </h3>
                                            <p className="font-['Quicksand'] text-[11px] font-bold tracking-[0.15em] uppercase mt-1 drop-shadow-lg"
                                               style={{ color: '#ffc715' }}
                                            >
                                                Director
                                            </p>
                                        </div>

                                        {/* Hover glow ring */}
                                        <div 
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                boxShadow: `inset 0 0 0 2px ${director.color}60, 0 0 30px ${director.color}20`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator dots */}
                    <div className="flex items-center justify-center gap-2 mt-10 md:hidden">
                        {directors.map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setScrollPos(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${scrollPos === idx ? 'w-8 bg-[#ffc715]' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-2 mt-10">
                        {Array.from({ length: maxScroll + 1 }).map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setScrollPos(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${scrollPos === idx ? 'w-8 bg-[#ffc715]' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── DIRECTOR MESSAGE MODAL ── */}
            {selectedDirector !== null && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedDirector(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#0e1629]/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" />
                    
                    {/* Modal */}
                    <div 
                        className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-[modalSlideUp_0.4s_ease-out]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Colored header strip */}
                        <div 
                            className="relative h-36 overflow-hidden"
                            style={{ background: `linear-gradient(135deg, ${directors[selectedDirector].color}, ${directors[selectedDirector].color}cc)` }}
                        >
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-8 w-32 h-32 rounded-full border-2 border-white/30" />
                                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border-2 border-white/15" />
                            </div>
                            
                            {/* Large decorative quote */}
                            <span className="absolute top-2 right-8 text-[120px] font-['Playfair_Display'] text-white/10 leading-none select-none">"</span>
                            
                            <button 
                                onClick={() => setSelectedDirector(null)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Portrait overlapping */}
                        <div className="flex justify-center -mt-16 relative z-10">
                            <div 
                                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl"
                                style={{ boxShadow: `0 8px 30px ${directors[selectedDirector].color}30` }}
                            >
                                <img src={directors[selectedDirector].image} alt={directors[selectedDirector].name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-8 md:px-12 pb-10 pt-6 text-center overflow-y-auto max-h-[calc(85vh-14rem)]">
                            <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#15283D] mb-1">{directors[selectedDirector].name}</h3>
                            <p className="font-['Quicksand'] text-xs font-bold tracking-[0.15em] uppercase mb-8"
                               style={{ color: directors[selectedDirector].color }}
                            >Director</p>
                            
                            <div className="w-16 h-[2px] mx-auto mb-8" style={{ backgroundColor: directors[selectedDirector].color }} />

                            <div className="font-['Quicksand'] font-medium text-[16px] md:text-[17px] text-[#15283D]/75 leading-[1.9] text-left italic">
                                <p>"{directors[selectedDirector].message}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
