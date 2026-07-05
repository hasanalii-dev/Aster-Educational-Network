import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, GraduationCap, Trophy, Microscope, HeartHandshake, Megaphone, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const roles = [
    { title: 'Teachers and Educators', icon: BookOpen, isDark: true },
    { title: 'Academic Leaders and Coordinators', icon: GraduationCap, isDark: false },
    { title: 'Sports Coaches', icon: Trophy, isDark: true },
    { title: 'Specialists and Subject Experts', icon: Microscope, isDark: false },
    { title: 'Student Support Professionals', icon: HeartHandshake, isDark: true },
    { title: 'Admissions and Marketing Professionals', icon: Megaphone, isDark: false },
    { title: 'Operations and Administrative Teams', icon: Settings, isDark: true },
]

export function CareersOpportunities() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.opp-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            )

            gsap.fromTo('.opp-role-card',
                { opacity: 0, y: 20, scale: 0.98 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.2)',
                    scrollTrigger: { trigger: '.opp-role-card', start: 'top 85%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#fbfaf8] relative">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12">

                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6 opp-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#3A53A4] w-5 h-5">
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" fill="#FFC51B" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#3A53A4] uppercase mt-0.5">
                            CURRENT OPPORTUNITIES
                        </span>
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1c1c] leading-[1.05] mb-6 opp-text tracking-tight">
                        Explore Available <em className="italic text-[#3A53A4]">Roles</em>
                    </h2>
                    <p className="font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed max-w-2xl mx-auto opp-text">
                        We welcome applications from passionate and purpose-driven individuals across a range of positions, including:
                    </p>
                </div>

                {/* Roles List */}
                <div className="flex flex-col gap-4 max-w-[700px] mx-auto mb-16">
                    {roles.map((role, i) => (
                        <div
                            key={i}
                            className={`opp-role-card group relative p-4 md:p-6 flex items-center justify-between text-left w-full rounded-[16px] md:rounded-[20px] overflow-hidden transition-all duration-400 hover:-translate-y-1 cursor-pointer ${
                                role.isDark 
                                    ? 'bg-[#334a89] shadow-[0_8px_16px_rgba(51,74,137,0.1)] hover:shadow-[0_16px_32px_rgba(51,74,137,0.25)]' 
                                    : 'bg-[#FBBB21] shadow-[0_8px_16px_rgba(255,187,33,0.15)] hover:shadow-[0_16px_32px_rgba(255,187,33,0.3)]'
                            }`}
                        >
                            {/* Giant Watermark Icon */}
                            <role.icon 
                                className={`absolute -bottom-6 -right-3 w-32 h-32 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${role.isDark ? 'text-white/10' : 'text-white/30'}`} 
                                strokeWidth={1}
                            />

                            {/* Corner Bracket ┐ */}
                            <div className="absolute top-4 right-4 w-5 h-5 border-t-[1.5px] border-r-[1.5px] pointer-events-none border-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${role.isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/30 group-hover:bg-white/40'}`}>
                                    <role.icon className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <h4 className="font-['Quicksand'] text-lg md:text-xl font-bold leading-tight tracking-tight text-white !text-white pr-6">
                                    {role.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="font-['Quicksand'] font-medium text-lg text-[#5C5C61] text-center mb-8 opp-text">
                    Available opportunities will be listed here as positions become available.
                </p>

                <div className="flex justify-center opp-text">
                    <Link
                        to="/open-roles"
                        className="btn-aster btn-aster-blue rounded-full hover-shimmer relative overflow-hidden px-10 py-4 text-base"
                    >
                        View Current Openings
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
