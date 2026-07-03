import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const campuses = [
    {
        id: 'clifton',
        name: 'Clifton Campus',
        grades: 'Early Years – Grade 5',
        description: 'Our Clifton Campus provides a nurturing and engaging environment where children build strong foundations for lifelong learning.\n\nFrom the Early Years through Elementary School, students are encouraged to explore, question, create, and grow through meaningful learning experiences that develop both academic competence and character.',
        benefits: [
            'Montessori-inspired Early Years education',
            'Strong academic foundations',
            'Robotics and Digital Literacy',
            'Social Emotional Learning',
            'Sports and swimming opportunities',
            'Islamic Learning and character development',
            'A supportive and family-oriented community',
        ],
        finaleText: 'A place where curiosity is encouraged, confidence grows, and learning comes to life.',
        image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=1200&auto=format&fit=crop', // Reel aspect ratio
        video: 'https://alpha.edu.pk/img/hero.mp4',
    },
    {
        id: 'pechs-junior',
        name: 'PECHS Junior Campus',
        grades: 'Early Years – Grade 4',
        description: 'The PECHS Junior Campus is designed to support children during some of the most important years of development.\n\nThrough a blend of hands-on learning, literacy development, creativity, exploration, and character education, students build the foundations they need to succeed both in school and beyond.',
        benefits: [
            'Montessori philosophy in the Early Years',
            'Strong literacy and numeracy foundations',
            'Aster-developed learning resources',
            'Reading-focused initiatives',
            'Robotics and Digital Literacy',
            'Sports and co-curricular experiences',
            'Individual attention and guidance',
        ],
        finaleText: 'A place where children develop independence, confidence, and a genuine love for learning.',
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop', // Reel aspect ratio
        video: 'https://alpha.edu.pk/img/hero.mp4',
    },
    {
        id: 'pechs-senior',
        name: 'PECHS Senior Campus',
        grades: 'Grade 5 – Grade 11',
        description: 'The PECHS Senior Campus prepares students for success in higher education, future careers, and life beyond the classroom.\n\nAs a licensed Cambridge school with a strong record of academic achievement, the campus combines rigorous academics with leadership development, innovation, entrepreneurship, character education, and meaningful real-world experiences.',
        benefits: [
            'Cambridge curriculum pathway',
            'Robotics and Digital Literacy',
            'Passion Projects',
            'Entrepreneurship initiatives',
            'Leadership opportunities',
            'MUN and debating',
            'Sports excellence',
            'Social Emotional Learning',
            'Community engagement and service',
        ],
        finaleText: 'A learning environment where students are challenged to think critically, lead confidently, and contribute meaningfully.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop', // Reel aspect ratio
        video: 'https://alpha.edu.pk/img/hero.mp4',
    }
]

export function CampusShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const campusCards = gsap.utils.toArray<HTMLElement>('.campus-card')

            campusCards.forEach((card) => {
                const img = card.querySelector('.campus-image')
                const content = card.querySelector('.campus-content')
                
                // Parallax on image
                if (img) {
                    gsap.fromTo(img,
                        { yPercent: -15, scale: 1.1 },
                        {
                            yPercent: 15,
                            scale: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            }
                        }
                    )
                }

                // Fade up content
                if (content) {
                    gsap.fromTo(content,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 75%',
                            }
                        }
                    )
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-24 bg-[#fbfaf8] overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col gap-32">
                {campuses.map((campus, index) => {
                    const isEven = index % 2 === 0
                    return (
                        <CampusCard campus={campus} isEven={isEven} key={campus.id} />
                    )
                })}
            </div>
        </section>
    )
}

function CampusCard({ campus, isEven }: { campus: any, isEven: boolean }) {
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (isHovered && videoRef.current) {
            videoRef.current.play().catch(() => {})
        } else if (!isHovered && videoRef.current) {
            videoRef.current.pause()
        }
    }, [isHovered])

    return (
        <div 
            className={`campus-card flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
        >
            {/* Visual Side (Reel Aspect Ratio) */}
            <div 
                className="w-full lg:w-5/12 flex-shrink-0 relative group perspective-1000 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="aspect-[9/16] w-full max-w-[450px] mx-auto overflow-hidden rounded-[24px] md:rounded-[36px] shadow-2xl relative transform transition-transform duration-700 group-hover:scale-[1.02]">
                    <img
                        src={campus.image}
                        alt={campus.name}
                        className={`campus-image absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />
                    
                    {/* Video strictly controlled by hover state */}
                    <video 
                        ref={videoRef}
                        src={campus.video}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 will-change-transform pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-10 left-8 right-8 z-10 pointer-events-none transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-white mb-2">{campus.name}</h3>
                        <p className="font-['Quicksand'] font-bold tracking-widest text-[#FBBB21] text-sm uppercase">{campus.grades}</p>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="campus-content w-full lg:w-7/12 flex flex-col pt-8">
                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-4 h-4 text-[#FBBB21]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#3A53A4] uppercase mt-0.5">
                        CAMPUS PROFILE
                    </span>
                </div>
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#1c1c1c] mb-8 leading-[1.1]">
                    {campus.name}
                </h2>
                
                <div className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] leading-relaxed mb-10 whitespace-pre-line">
                    {campus.description}
                </div>

                <div className="mb-10">
                    <h4 className="font-['Quicksand'] font-bold text-sm tracking-wider text-[#1c1c1c] uppercase mb-6">Students benefit from:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {campus.benefits.map((benefit: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 group">
                                <CheckCircle2 className="w-5 h-5 text-[#3A53A4] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="font-['Quicksand'] font-medium text-base text-[#5C5C61] group-hover:text-[#1c1c1c] transition-colors">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#e5e7eb] shadow-sm mb-10 hover:shadow-md transition-shadow duration-300">
                    <p className="font-['Playfair_Display'] italic text-2xl text-[#3A53A4] leading-snug">
                        "{campus.finaleText}"
                    </p>
                </div>

                <div>
                    <Link to="/book-tour" className="btn-aster btn-aster-primary inline-flex hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <span>Book a Campus Visit</span>
                        <span className="btn-arrow ml-2">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
