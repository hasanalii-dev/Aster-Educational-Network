import { useEffect, useRef, useState } from 'react'
import { SEO } from '@/components/seo/SEO'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Mail, Calendar, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const faqData = [
    {
        q: 'When was The Aster School established?',
        a: 'The Aster School was founded in 2019 and has since grown into a thriving educational community serving students across multiple campuses, with expansion into Riyadh, Saudi Arabia.'
    },
    {
        q: 'Which curriculum does The Aster School follow?',
        a: 'Our Senior School follows the Cambridge curriculum pathway. In the Early Years, children learn through a Montessori-inspired approach that encourages independence, exploration, and hands-on learning.'
    },
    {
        q: 'Do children learn through Montessori methods?',
        a: 'Yes. Our Early Years program is inspired by Montessori philosophy, where children work with carefully designed learning materials and progress at their own pace within a prepared environment.'
    },
    {
        q: 'Is Arabic offered at The Aster School?',
        a: 'Yes. Arabic is offered across all Aster campuses and is a compulsory language for students.'
    },
    {
        q: 'Are other languages taught at Aster?',
        a: 'Students learn English, Urdu, and Arabic as part of their educational journey. Mandarin is also available to further support global learning and communication.'
    },
    {
        q: 'When can students apply for admission?',
        a: 'Admissions primarily take place during our admission cycle each year. However, if seats are available and a student successfully completes the admission process, mid-year admissions may occasionally be considered.'
    },
    {
        q: 'Is there an admission assessment?',
        a: 'For Early Years applicants, children participate in an observation process. For Elementary and Senior School applicants, an assessment may be conducted to determine readiness and placement.'
    },
    {
        q: 'Are scholarships available?',
        a: 'Outstanding Senior School applicants may be considered for scholarship opportunities based on academic performance and overall potential.'
    },
    {
        q: 'Is there a waitlist?',
        a: 'Yes. Some grades reach capacity quickly, and families may be placed on a waitlist depending on seat availability.'
    },
    {
        q: 'Does the school provide meals?',
        a: 'Students bring their own meals and snacks from home. To support healthy habits, the school shares recommended meal plans and nutrition guidance with families.\n\nSenior School students also benefit from Star Bites, our student-led canteen initiative that provides valuable entrepreneurship and leadership experiences.'
    },
    {
        q: 'Is a school uniform required?',
        a: 'Yes. Students are expected to wear the appropriate school uniform. Depending on activities and programs, students may also have designated sports uniforms and taekwondo uniforms.'
    },
    {
        q: 'Does Aster provide transportation?',
        a: 'At present, transportation services are not provided. Students arrive and depart using family-arranged transportation.'
    },
    {
        q: 'How does the school communicate with parents?',
        a: 'Parents primarily receive updates and communication through the Parent App and email. These platforms help families stay informed about important announcements, events, student updates, and school activities.'
    },
    {
        q: 'Can parents meet with school leadership?',
        a: 'Yes. Parents may request meetings with school leadership, including campus principals, whenever needed. We believe strong communication between families and school is essential to student success.'
    },
    {
        q: 'Are parents involved in school life?',
        a: 'Absolutely. Parents actively participate through initiatives such as Star Parent Day, the Parent Ambassador Program, workshops, school events, performances, sports activities, and community gatherings throughout the year.'
    },
    {
        q: 'How does The Aster School ensure student safety?',
        a: 'Student safety is a top priority. Our campuses maintain safeguarding practices that include CCTV monitoring, visitor check-in procedures, trained staff, designated safeguarding leadership, supervised learning environments, and clear student safety protocols.'
    }
]

function FAQItem({ faq, isOpen, onClick, index }: { faq: {q: string, a: string}, isOpen: boolean, onClick: () => void, index: number }) {
    const isBlue = index % 2 === 0
    const bgColor = isBlue ? 'bg-[#334a89]' : 'bg-[#ffc715]'
    const iconColor = isBlue ? 'text-[#334a89]' : 'text-[#ffc715]'

    return (
        <div 
            className={`relative overflow-hidden transition-[border-radius,background-color,height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md text-white ${bgColor} ${isOpen ? 'rounded-2xl' : 'rounded-[32px] md:rounded-[40px]'}`}
        >
            <SEO title="FAQs | The Aster School" />
            <button
                onClick={onClick}
                className={`relative z-10 w-full flex items-center justify-between text-left focus:outline-none group transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] text-white ${isOpen ? 'p-6 md:p-8 pb-4' : 'px-6 py-5 md:px-10 md:py-8'}`}
            >
                <h3 className={`font-['Quicksand'] font-bold text-lg md:text-xl pr-8 transition-colors duration-300 text-white`}>
                    {faq.q}
                </h3>
                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white ${iconColor} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180 shadow-inner' : 'rotate-0 shadow-lg'}`}>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </button>
            <div 
                className="relative z-10 grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ 
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pt-0 font-['Quicksand'] text-white/95 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {faq.a}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FAQs() {

    const pageRef = useRef<HTMLDivElement>(null)
    const bannerFrameRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const textStackRef = useRef<HTMLDivElement>(null)
    const [imgLoaded, setImgLoaded] = useState(false)
    const faqListRef = useRef<HTMLDivElement>(null)

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(
                textStackRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.1 }
            )

            const mm = gsap.matchMedia()

            mm.add('(min-width: 768px)', () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: bannerFrameRef.current,
                        start: 'top top',
                        end: '+=400',
                        scrub: true,
                    },
                })

                tl.to(
                    bannerFrameRef.current,
                    {
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '0px',
                        ease: 'none',
                    },
                    0
                )

                tl.fromTo(
                    imageRef.current,
                    { yPercent: -10, scale: 1.15 },
                    { yPercent: 10, scale: 1.05, ease: 'none' },
                    0
                )
            })

            mm.add('(max-width: 767px)', () => {
                gsap.to(bannerFrameRef.current, {
                    borderRadius: '0px',
                    width: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bannerFrameRef.current,
                        start: 'top top',
                        end: '+=250',
                        scrub: true,
                    },
                })
            })

            // Content Intro Animation
            gsap.fromTo('.faq-intro-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.faq-intro-section', start: 'top 80%' }
                }
            )

            // FAQs Stagger Animation
            if (faqListRef.current) {
                gsap.fromTo(
                    faqListRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                        scrollTrigger: { trigger: '.faq-intro-section', start: 'top 70%' } // Triggered when intro is scrolled
                    }
                )
            }

            // Finale Animation
            gsap.fromTo('.finale-blue-card',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.finale-blue-card', start: 'top 80%' } }
            )
            gsap.fromTo('.finale-stagger',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.finale-blue-card', start: 'top 75%' }
                }
            )

        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div id="page-faqs" ref={pageRef} className="bg-[#fbfaf8] w-full min-h-screen">
            
            {/* HERO SECTION */}
            <section className="w-full pt-28 md:pt-32 pb-16 md:pb-24 relative z-10 flex flex-col items-center bg-white select-none">
                <div className="flex justify-center w-full relative">
                    <div
                        ref={bannerFrameRef}
                        className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform"
                        style={{ borderRadius: '16px' }}
                    >
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                            {!imgLoaded && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                            )}
                            <img
                                ref={imageRef}
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_1200,q_auto,f_auto/v1783269348/glimpse-4_jcy5yy.jpg"
                                alt="Parents and students"
                                onLoad={() => setImgLoaded(true)}
                                className={`w-full h-full object-cover will-change-transform transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                        </div>
                    </div>

                    <div className="absolute top-28 md:top-32 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                        <div
                            ref={textStackRef}
                            className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 bg-[#394EA2] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 text-left z-20 pointer-events-auto shadow-xl"
                        >
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                                FAQS
                            </span>
                            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium text-white tracking-tight leading-[1.1]">
                                Frequently Asked Questions
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="faq-intro-section pt-32 pb-16 px-6 md:px-12 max-w-[900px] mx-auto text-center flex flex-col items-center">
                <h2 className="faq-intro-text font-['Playfair_Display'] text-3xl md:text-5xl text-[#1c1c1c] leading-[1.2] mb-8">
                    Everything You Need to Know About <span className="font-['Quicksand'] font-bold text-[#334a89]">The Aster School</span>
                </h2>
                <p className="faq-intro-text font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed mb-6">
                    Choosing the right school is an important decision, and naturally, parents have questions.
                </p>
                <p className="faq-intro-text font-['Quicksand'] font-medium text-lg md:text-xl text-[#5C5C61] leading-relaxed">
                    We've answered some of the most common questions families ask about our programs, admissions process, campuses, and school experience. If you don't find what you're looking for, our Admissions Team would be happy to help.
                </p>
            </section>

            {/* ACCORDION SECTION */}
            <section className="pb-32 px-6 md:px-12 max-w-[900px] mx-auto">
                <div ref={faqListRef} className="flex flex-col gap-6 md:gap-8">
                    {faqData.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            {/* FINALE SECTION */}
            <section className="bg-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
                <div className="max-w-[1360px] mx-auto flex flex-col items-center">
                    <div className="finale-blue-card w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                        {/* ── LOGO WATERMARK ── */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                            <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                        </div>

                        <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                        
                        <div className="finale-stagger flex items-center gap-3 mb-6 relative z-10 mt-2">
                            <svg className="w-5 h-5 text-[#ffc715]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                            </svg>
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#ffc715] uppercase mt-0.5">
                                STILL HAVE QUESTIONS?
                            </span>
                        </div>
                        
                        <h2 className="finale-stagger font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-white max-w-4xl leading-[1.1] mb-10 relative z-10">
                            Our team would be delighted to help.
                        </h2>
                        
                        <p className="finale-stagger text-xl md:text-2xl font-['Quicksand'] font-medium text-white/95 relative z-10 mb-12">
                            The Aster School — <strong className="text-[#ffc715] font-bold">Whatever It Takes!</strong>
                        </p>
                        
                        <div className="finale-stagger w-full max-w-4xl border-t border-white/20 pt-10 flex flex-col items-center relative z-10">
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full">
                                <Link
                                    to="/contact"
                                    className="btn-aster btn-aster-primary rounded-full flex items-center justify-center gap-3 hover-shimmer relative overflow-hidden px-8 py-4 text-sm md:text-base font-bold tracking-[0.1em] uppercase"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact Admissions
                                </Link>

                                <Link
                                    to="/book-tour"
                                    className="btn-aster btn-aster-white rounded-full flex items-center justify-center gap-3 hover-shimmer relative overflow-hidden px-8 py-4 text-sm md:text-base font-bold tracking-[0.1em] uppercase"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book a Campus Visit
                                </Link>

                                <Link
                                    to="/admissions"
                                    className="btn-aster btn-aster-white rounded-full flex items-center justify-center gap-3 hover-shimmer relative overflow-hidden px-8 py-4 text-sm md:text-base font-bold tracking-[0.1em] uppercase"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    Join the Waitlist
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
