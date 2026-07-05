import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ParentStory } from '@/types'

gsap.registerPlugin(ScrollTrigger)

export function ParentStoriesMasonry() {
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const [stories, setStories] = useState<ParentStory[]>([])

    useEffect(() => {
        const fetchStories = async () => {
            const { data } = await supabase
                .from('parent_stories')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
            
            if (data) {
                const themes = ['white', 'blue', 'light', 'yellow']
                const storiesWithThemes = data.map((story, i) => ({
                    ...story,
                    theme: themes[i % themes.length]
                }))
                setStories(storiesWithThemes as ParentStory[])
            }
        }
        fetchStories()
    }, [])

    // Split stories into 3 arrays for independent column scrolling
    const col1 = stories.filter((_, i) => i % 3 === 0)
    const col2 = stories.filter((_, i) => i % 3 === 1)
    const col3 = stories.filter((_, i) => i % 3 === 2)

    useEffect(() => {
        if (stories.length === 0) return

        const ctx = gsap.context(() => {

            // Header Entrance Sequence
            gsap.fromTo('.gsap-header-elem',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '.gsap-header-elem', start: 'top 85%' }
                }
            )

            // Dynamic Parallax Scrolling Effect (Desktop Only)
            const mm = gsap.matchMedia()
            
            mm.add('(min-width: 768px)', () => {
                const columns = gsap.utils.toArray<HTMLElement>('.parallax-col')

                columns.forEach((col, index) => {
                    // Determine speed based on column index (Middle column moves faster/opposite)
                    const yOffset = index === 1 ? -80 : 50

                    gsap.fromTo(col,
                        { y: index === 1 ? 80 : -50 },
                        {
                            y: yOffset,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: gridRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1 // 1 second smoothing effect on the scroll
                            }
                        }
                    )
                })
            })

            // Initial fade in for the cards themselves
            const allColumns = gsap.utils.toArray<HTMLElement>('.parallax-col')
            allColumns.forEach((col) => {
                const cards = col.querySelectorAll('.testimonial-card')
                gsap.fromTo(cards,
                    { opacity: 0, scale: 0.95 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
                    }
                )
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [stories])

    // Card Renderer Function
    const renderCard = (testimonial: any) => {
        // Premium Theme Engine - dynamically assigned during fetch
        const theme = testimonial.theme

        let bgClass = "bg-white/80 backdrop-blur-xl border border-[#E5E7EB] hover:border-[#334a89]/30"
        let textClass = "text-[#15283D]"
        let roleClass = "text-[#5C5C61]"
        let quoteIconColor = "text-[#334a89]/10"
        let authorPillClass = "bg-[#F4F6F8] border border-[#E5E7EB]"
        let avatarContainerClass = "bg-white border-2 border-[#E5E7EB]"

        if (theme === 'blue') {
            bgClass = "bg-[#334a89] border border-transparent"
            textClass = "text-white"
            roleClass = "text-white/70"
            quoteIconColor = "text-[#ffc715]/20"
            authorPillClass = "bg-white/10 border border-white/10 backdrop-blur-md"
            avatarContainerClass = "bg-white/10 border-2 border-white/20"
        } else if (theme === 'yellow') {
            bgClass = "bg-[#ffc715] border border-transparent"
            textClass = "text-[#15283D]"
            roleClass = "text-[#15283D]/70"
            quoteIconColor = "text-[#15283D]/10"
            authorPillClass = "bg-white/40 border border-white/30 backdrop-blur-md"
            avatarContainerClass = "bg-white/50 border-2 border-white/40"
        } else if (theme === 'light') {
            bgClass = "bg-[#F4F6F8] border border-transparent hover:bg-white hover:border-[#E5E7EB]"
            authorPillClass = "bg-white border border-[#E5E7EB]"
        }

        return (
            <div
                key={testimonial.id}
                className={`testimonial-card p-8 md:p-10 rounded-[40px] shadow-[0_20px_40px_rgba(21,40,61,0.04)] hover:shadow-[0_40px_80px_rgba(51,74,137,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col group ${bgClass}`}
            >
                <div className="flex justify-between items-start mb-8">
                    <Quote className={`w-10 h-10 ${quoteIconColor} rotate-180 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12`} fill="currentColor" />
                </div>

                <p className={`font-['Quicksand'] text-[17px] leading-[1.65] font-medium mb-10 flex-1 ${textClass}`}>
                    "{testimonial.quote}"
                </p>

                {/* Glassmorphic Author Badge with Minimalist Icon */}
                <div className={`flex items-center gap-4 p-3 pr-6 rounded-full ${authorPillClass}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${avatarContainerClass}`}>
                        <User className={`w-5 h-5 ${testimonial.theme === 'blue' ? 'text-white' : 'text-[#334a89]'}`} />
                    </div>
                    <div>
                        <h4 className={`font-['Quicksand'] font-bold text-[14px] tracking-wide leading-tight ${textClass}`}>
                            {testimonial.name}
                        </h4>
                        <p className={`font-['Quicksand'] text-[11px] font-bold uppercase tracking-[0.1em] mt-1 ${roleClass}`}>
                            {testimonial.role}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-white px-6 md:px-12 relative z-20">

            {/* =========================================================
                TOP CLOUD BORDER
            ========================================================= */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none -translate-y-[99%] rotate-180">
                <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FFFFFF" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFFFFF" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
                </svg>
            </div>


            <div className="max-w-[1400px] mx-auto relative z-10 px-6 md:px-12">

                {/* Modern SaaS Header */}
                <div className="flex flex-col items-center mb-24 text-center">
                    <span className="gsap-header-elem font-['Quicksand'] font-bold text-[12px] tracking-[0.2em] text-[#334a89] uppercase mb-4 block bg-[#334a89]/5 px-4 py-2 rounded-full border border-[#334a89]/10">
                        Parent Testimonials
                    </span>
                    <h2 className="gsap-header-elem font-['Quicksand'] text-4xl md:text-[56px] font-extrabold text-[#15283D] leading-[1.1] tracking-tight mb-6">
                        Trusted by <span className="text-[#334a89]">Families.</span>
                    </h2>
                    <p className="gsap-header-elem font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium max-w-2xl leading-relaxed">
                        Discover how The Aster School is making a lasting impact on our students and their families, straight from the parents themselves.
                    </p>
                </div>

                {/* =========================================================
                    PARALLAX SCROLLING GRID
                ========================================================= */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Left Column (Scrolls slightly down) */}
                    <div className="parallax-col flex flex-col gap-8">
                        {col1.map((item) => renderCard(item))}
                    </div>

                    {/* Middle Column (Scrolls slightly up) */}
                    <div className="parallax-col flex flex-col gap-8 mt-0 md:mt-12 lg:mt-24">
                        {col2.map((item) => renderCard(item))}
                    </div>

                    {/* Right Column (Scrolls slightly down) */}
                    <div className="parallax-col flex flex-col gap-8 mt-0 lg:mt-12">
                        {col3.map((item) => renderCard(item))}
                    </div>

                </div>
            </div>


        </section>
    )
}