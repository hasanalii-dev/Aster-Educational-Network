import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronUp, ChevronDown } from 'lucide-react'
import atomsIcon from '@/assets/icons/atoms.svg'
import pasteIcon from '@/assets/icons/paste.svg'
import ribbonIcon from '@/assets/icons/ribbon.svg'

const carouselCards = [
    {
        bg: 'bg-[#e97f7b]',
        title: 'Developing Character & Competence',
        text: 'Our mission is to nurture confident, capable, and compassionate individuals through meaningful learning experiences that develop both character and competence.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    },
    {
        bg: 'bg-[#6ab39d]',
        title: 'Environments Built for Purpose',
        text: 'From the earliest years to senior school, we intentionally create environments where students are encouraged to think independently, lead with empathy, communicate confidently, and grow with purpose.',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    },
    {
        bg: 'bg-[#9765d1]',
        title: 'Learning Beyond Textbooks',
        text: 'At Aster, learning is not limited to textbooks or memorization. We believe children learn best when they actively explore, question, create, collaborate, and apply their understanding to the world around them.',
        image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop',
    }
]

export function AboutPrologue() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const currentIndexRef = useRef(0)
    const isAnimatingRef = useRef(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const N = carouselCards.length

    useEffect(() => {
        // Initial setup for GSAP cards
        for (let i = 0; i < N; i++) {
            const card = cardsRef.current[i]
            if (card) {
                gsap.set(card, {
                    y: i * 30,
                    scale: 1 - i * 0.05,
                    zIndex: 30 - i * 10,
                    opacity: 1 - i * 0.1,
                    transformOrigin: 'top center'
                })
            }
        }

        // Floating Background Depth Icons
        gsap.to('.depth-icon-1', { y: -20, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.depth-icon-2', { y: 25, rotation: -8, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.depth-icon-3', { y: -15, rotation: 6, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        
        // Header animation
        gsap.fromTo('.gsap-prologue-head',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
        )
    }, [])

    useEffect(() => {
        // Auto-play interval
        const timer = setInterval(() => {
            handleNext()
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const handleNext = () => {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true

        const currentIdx = currentIndexRef.current
        const nextIdx = (currentIdx + 1) % N
        const topCard = cardsRef.current[currentIdx]

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndexRef.current = nextIdx
                setActiveIndex(nextIdx)
                isAnimatingRef.current = false
            }
        })

        // 1. Slide top card down and out
        tl.to(topCard, {
            y: window.innerHeight * 0.6,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in"
        }, 0)

        // 2. Move remaining cards forward
        for (let i = 1; i < N; i++) {
            const cardIdx = (currentIdx + i) % N
            const targetPos = i - 1
            tl.to(cardsRef.current[cardIdx], {
                y: targetPos * 30,
                scale: 1 - targetPos * 0.05,
                zIndex: 30 - targetPos * 10,
                opacity: 1 - targetPos * 0.1,
                duration: 0.6,
                ease: "power3.out"
            }, 0.2)
        }

        // 3. Move top card to back and slide up
        tl.set(topCard, { zIndex: 30 - (N - 1) * 10, scale: 1 - (N - 1) * 0.05 }, 0.5)
        tl.to(topCard, {
            y: (N - 1) * 30,
            opacity: 1 - (N - 1) * 0.1,
            duration: 0.5,
            ease: "power3.out"
        }, 0.5)
    }

    const handlePrev = () => {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true

        const currentIdx = currentIndexRef.current
        const prevIdx = (currentIdx - 1 + N) % N
        const bottomCard = cardsRef.current[prevIdx]

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndexRef.current = prevIdx
                setActiveIndex(prevIdx)
                isAnimatingRef.current = false
            }
        })

        // 1. Bottom card drops down out of sight instantly to prep for sliding up to front
        tl.to(bottomCard, {
            y: window.innerHeight * 0.6,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in"
        }, 0)

        // 2. Move other cards backward
        for (let i = 0; i < N - 1; i++) {
            const cardIdx = (currentIdx + i) % N
            const targetPos = i + 1
            tl.to(cardsRef.current[cardIdx], {
                y: targetPos * 30,
                scale: 1 - targetPos * 0.05,
                zIndex: 30 - targetPos * 10,
                opacity: 1 - targetPos * 0.1,
                duration: 0.6,
                ease: "power3.out"
            }, 0.2)
        }

        // 3. Slide bottom card up to front
        tl.set(bottomCard, { zIndex: 30, scale: 1 }, 0.3)
        tl.to(bottomCard, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        }, 0.3)
    }

    return (
        <section ref={sectionRef} className="bg-white pt-28 pb-32 relative overflow-hidden">
            {/* Background Depth Layer */}
            <div className="absolute inset-0 max-w-[1500px] mx-auto pointer-events-none z-0">
                <img src={atomsIcon} alt="" className="hidden md:block depth-icon-1 absolute top-20 right-4 md:right-12 w-44 md:w-64 h-auto opacity-60 blur-[2px]" />
                <img src={pasteIcon} alt="" className="hidden md:block depth-icon-2 absolute top-[40%] right-[10%] w-36 md:w-52 h-auto opacity-70" />
                <img src={ribbonIcon} alt="" className="hidden md:block depth-icon-3 absolute top-16 -left-8 md:-left-12 w-64 md:w-80 h-auto opacity-60" />
            </div>

            <div className="w-full flex flex-col justify-center relative z-10">
                
                {/* Header Section */}
                <div className="max-w-[1360px] mx-auto w-full px-6 md:px-12 mb-12 flex flex-col items-center">
                    <div className="text-center max-w-4xl flex flex-col items-center gap-4 gsap-prologue-head">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                            </svg>
                            <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-[#334a89]">
                                OUR CORE PHILOSOPHY
                            </span>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium text-[#334a89] leading-[1.1] tracking-tight max-w-4xl">
                            Building Future-Ready <br className="hidden sm:block" />
                            <em className="font-medium italic text-[#ffc715]">Learners</em> with Purpose.
                        </h2>
                        <p className="font-['Quicksand'] text-base md:text-lg font-medium text-[#5C5C61] leading-relaxed max-w-3xl mt-2 mb-6">
                            “At The Aster School, we believe education should do more than prepare children for examinations; it should prepare them for life.”
                        </p>
                    </div>
                </div>

                {/* 3D Stacked Deck */}
                <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 pb-24 h-[550px] md:h-[450px] lg:h-[450px] relative perspective-[1200px] mt-4 group">
                    {carouselCards.map((card, idx) => (
                        <div 
                            key={idx}
                            ref={el => { cardsRef.current[idx] = el }}
                            className={`absolute left-0 right-0 mx-auto w-full max-w-[1000px] ${card.bg} rounded-[40px] p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/25 will-change-transform`}
                        >
                            <div className="md:col-span-6 flex flex-col justify-center pr-12 md:pr-0">
                                <h3 className="font-['Quicksand'] text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 md:mb-6 !text-white tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="font-['Quicksand'] text-base md:text-lg lg:text-xl leading-relaxed font-medium !text-white">
                                    {card.text}
                                </p>
                            </div>
                            <div className="md:col-span-6 h-[200px] md:h-[280px] lg:h-[320px] w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl border-4 border-white/25 bg-white/10">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover select-none" draggable="false" />
                            </div>
                        </div>
                    ))}

                    {/* Top Navigation Control */}
                    <button 
                        onClick={handlePrev}
                        className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-[#334a89]/10 text-[#334a89] flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none z-50"
                        aria-label="Previous card"
                    >
                        <ChevronUp className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Bottom Navigation Control */}
                    <button 
                        onClick={handleNext}
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-[#334a89]/10 text-[#334a89] flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none z-50"
                        aria-label="Next card"
                    >
                        <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </div>

            </div>
        </section>
    )
}