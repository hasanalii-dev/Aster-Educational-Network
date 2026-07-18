import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutFounder() {
    const sectionRef = useRef<HTMLElement>(null)
    const profileCardRef = useRef<HTMLDivElement>(null)
    const speechWrapperRef = useRef<HTMLDivElement>(null)
    const speechParagraphsRef = useRef<HTMLParagraphElement[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()



            // =========================================================
            // DESKTOP / TABLET: Slow Cinematic Text Scrubber
            // =========================================================
            mm.add('(min-width: 768px)', () => {
                speechParagraphsRef.current.forEach((paragraph) => {
                    if (!paragraph) return
                    gsap.fromTo(
                        paragraph,
                        { opacity: 0.22, y: 20, filter: 'blur(2px)' },
                        {
                            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out',
                            scrollTrigger: { trigger: paragraph, start: 'top 85%', end: 'top 50%', scrub: true },
                        }
                    )
                })
            })

            // =========================================================
            // MOBILE ONLY: Hyper-Fast "Instant-Sharp" Scrubber
            // =========================================================
            mm.add('(max-width: 767px)', () => {
                speechParagraphsRef.current.forEach((paragraph) => {
                    if (!paragraph) return
                    gsap.fromTo(
                        paragraph,
                        { opacity: 0.4, y: 12, filter: 'blur(1px)' },
                        {
                            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power1.out',
                            scrollTrigger: { trigger: paragraph, start: 'top 92%', end: 'top 80%', scrub: true },
                        }
                    )
                })
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-28 md:py-40 px-6 md:px-12 relative overflow-visible select-none">

            {/* Slogan Gradient Keyframes */}
            <style>{`
        @keyframes secondary-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-slogan-gradient {
          background-size: 200% auto;
          animation: secondary-flow 4s linear infinite;
        }
      `}</style>

            {/*
        CRITICAL FIX: REMOVED 'items-start' FROM THIS GRID.
        Both columns now natively stretch to the exact same floor height!
      */}
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">

                {/* ── LEFT: THE OPEN ELEVATOR SHAFT ── */}
                <div className="lg:col-span-4 h-full">

                    {/* THE STICKY ELEVATOR CAR (Glides left, hits top-32, rides down) */}
                    <div ref={profileCardRef} className="lg:sticky lg:top-32 z-20 will-change-transform flex flex-col items-start">

                        <div className="flex items-center gap-3 mb-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffc715]">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <span className="font-['Quicksand'] font-bold text-sm md:text-base tracking-[0.3em] text-[#394da1] uppercase mt-1">
                                DIRECTOR'S MESSAGE
                            </span>
                        </div>

                        <div className="w-full aspect-[3/4] rounded-none overflow-hidden bg-[#334a89]/5 mb-6 shadow-2xl border border-[#334a89]/15 relative group">
                            <img
                                src="/founder.jpg"
                                alt="Falak Shaikhani"
                                className="w-full h-full object-cover contrast-105"
                            />
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white hover:scale-110 text-[#334a89] p-3 rounded-full shadow-lg transition-all duration-300 z-10 cursor-pointer"
                                aria-label="View biography"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </button>
                        </div>

                        <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#334a89] leading-tight">
                            Falak Shaikhani
                        </h3>
                        <p className="font-['Quicksand'] text-xs font-bold text-[#e97f7b] tracking-[0.15em] uppercase mt-1 mb-6">
                            Founder &amp; Director, The Aster School
                        </p>

                    </div>

                </div>

                {/* ── RIGHT: THE SPEECH ── */}
                <div ref={speechWrapperRef} className="lg:col-span-8 flex flex-col gap-8 pt-8 lg:pl-12 relative will-change-transform">
          <span className="absolute top-0 lg:-top-8 left-4 text-[220px] md:text-[260px] font-['Playfair_Display'] text-[#394da1]/[0.04] select-none pointer-events-none leading-none">
            “
          </span>

                    <div className="relative z-10 flex flex-col gap-8 font-['Quicksand'] font-medium text-lg md:text-xl text-[#15283D] leading-relaxed">
                        <p ref={el => { if (el) speechParagraphsRef.current[0] = el }}>
                            "At Aster, we believe education is about far more than academics. It is about helping children discover who they are, what they value, and who they have the potential to become. Our vision is to develop individuals with the character, confidence, and skills to succeed in whatever they choose to do in life. We want every child to grow into a resilient, compassionate, and purpose-driven individual who is prepared not only for school, but for life.
                        </p>
                        <p ref={el => { if (el) speechParagraphsRef.current[1] = el }}>
                            As a mother and educator, I have always believed that children thrive when they feel safe, respected, inspired, and heard. When given the right environment and opportunities, they develop curiosity, confidence, independence, and a lifelong love for learning.
                        </p>
                        <p ref={el => { if (el) speechParagraphsRef.current[2] = el }}>
                            At Aster, we are committed to creating meaningful learning experiences that nurture the whole child while building strong partnerships with families. Together, we can raise a generation that leads with integrity, pursues excellence with purpose, and contributes positively to the world around them.
                        </p>

                        {/* Slogan Pull-Quote */}
                        <div ref={el => { if (el) speechParagraphsRef.current[3] = el! }} className="mt-6 pt-8 border-t-2 border-[#ffc715] flex flex-col gap-4">
                            <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#334a89] leading-snug">
                                And that is the future we continue to build every single day —{' '}
                                <span className="animate-slogan-gradient bg-gradient-to-r from-[#e97f7b] via-[#9765d1] via-60% to-[#6ab39d] bg-clip-text text-transparent font-extrabold tracking-tight pb-0.5 border-b-4 border-[#ffc715]">
                  Whatever It Takes."
                </span>
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                <span className="font-['Playfair_Display'] font-bold text-2xl text-[#334a89] italic">Falak Shaikhani</span>
                                <span className="text-xs text-[#334a89]/30">•</span>
                                <span className="font-['Quicksand'] font-bold text-xs tracking-[0.2em] uppercase text-[#394da1]">Founder's Desk</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* ── BIOGRAPHY MODAL ── */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setIsModalOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#15283D]/60 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" />
                    
                    {/* Modal Content */}
                    <div 
                        className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-[modalSlideUp_0.4s_ease-out]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header with image strip */}
                        <div className="relative h-32 bg-gradient-to-r from-[#334a89] to-[#394da1] overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-8 w-32 h-32 rounded-full border-2 border-white/20" />
                                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border-2 border-white/10" />
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Portrait overlapping header */}
                        <div className="flex justify-center -mt-16 relative z-10">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                <img src="/founder.jpg" alt="Falak Shaikhani" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Bio content */}
                        <div className="px-8 md:px-12 pb-10 pt-6 text-center">
                            <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#334a89] mb-1">Falak Shaikhani</h3>
                            <p className="font-['Quicksand'] text-xs font-bold text-[#e97f7b] tracking-[0.15em] uppercase mb-8">Founder &amp; Director, The Aster School</p>
                            
                            <div className="w-16 h-[2px] bg-[#ffc715] mx-auto mb-8" />

                            <div className="flex flex-col gap-5 font-['Quicksand'] font-medium text-[15px] text-[#15283D]/80 leading-[1.85] text-left">
                                <p>An educationist, entrepreneur, and visionary leader passionate about transforming education through meaningful and future-focused learning.</p>
                                <p>She holds a Master’s degree in Economics from the London School of Economics and Political Science and has professional experience working with globally recognized organizations including Deutsche Bank, JPMorgan Chase, and Deloitte.</p>
                                <p>Her educational journey also includes specialized training in education and leadership through programs associated with Harvard University and Finland’s globally recognized education system, alongside participation in international education conferences around the world.</p>
                                <p>Her vision is to transform the world through leadership that uplifts humanity — creating learning environments where children grow into confident, compassionate, and purpose-driven individuals prepared to make a meaningful difference in the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}