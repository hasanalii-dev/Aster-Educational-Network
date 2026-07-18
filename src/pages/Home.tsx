import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { useDraggableScroll } from '@/hooks/useDraggableScroll'
import { HeroSection, CampusesSection, ProgramsSection, TestimonialsSection, CommunityCtaSection } from '@/components/sections'
import gsap from 'gsap'
import ribbonSvg from '@/assets/ribbon.svg'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



/**
 * ImageWithSkeleton Helper Component
 * Handles the real-time loading state of an image.
 * Displays a pulsing skeleton background until the image is fully downloaded.
 * Includes a fix for cached images preventing the onLoad event.
 */
const ImageWithSkeleton = ({ src, alt, className, imgClassName, style, imgStyle, priority = false }: { src: string, alt: string, className?: string, imgClassName?: string, style?: React.CSSProperties, imgStyle?: React.CSSProperties, priority?: boolean }) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    const handleLoad = () => {
        if (imgRef.current) imgRef.current.classList.add('loaded')
        if (wrapperRef.current) wrapperRef.current.classList.add('is-loaded')
    }

    useEffect(() => {
        if (imgRef.current?.complete) {
            handleLoad()
        }
    }, [src])

    return (
        <div ref={wrapperRef} className={`skeleton-wrapper ${className || ''}`} style={style}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleLoad}
                className={imgClassName || ''}
                style={imgStyle}
                loading={priority ? "eager" : "lazy"}
                decoding={priority ? "sync" : "async"}
            />
        </div>
    )
}

const DecorativeCorner = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`absolute w-[60px] h-[60px] ${className || ''}`} style={style}>
        <div className="absolute top-0 left-0 w-[60px] h-[60px] bg-[#394EA2]" />
        <div className="absolute top-0 left-0 w-[40px] h-[40px] bg-[#8EC3FB]" />
        <div className="absolute top-[40px] left-[40px] w-[20px] h-[20px] bg-[#8EC3FB]" />
    </div>
)

/* ----------------------------------------
 * Aster Difference Data & Helpers
 * ---------------------------------------- */
const differenceData = [
    {
        title: "Robotics & Digital Literacy",
        desc: "Students learn to think critically, solve problems, and engage confidently with technology through coding, robotics, and digital exploration.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783169976/DSC03243_bvvzmf.jpg"
    },
    {
        title: "Sports & Discipline",
        desc: "From swimming and football to gymnastics and taekwondo, sports help students develop resilience, teamwork, focus, and self-belief.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783170082/496200395_1242109967922604_7907344747179719709_n_ut5v1l.jpg"
    },
    {
        title: "Social Emotional Learning",
        desc: "We intentionally nurture emotional intelligence, confidence, empathy, and communication helping students understand themselves and others.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783170199/As_part_of_Mental_Health_week_our_students_practiced_mindfulness_through_yoga_explored_emotion_vub6lj.jpg"
    },
    {
        title: "Islamic Learning",
        desc: "Students develop strong values rooted in humility, integrity, respect, and purposeful living.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783170305/495188560_1242587767874824_655110840629499397_n_yofyut.jpg"
    },
    {
        title: "Sustainability & Green Goals",
        desc: "Through hands-on environmental initiatives, students learn responsibility, awareness, and care for the world around them.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783170377/473127865_1676555299592329_7824417284584904866_n_tmd7uc.jpg"
    },
    {
        title: "Passion Projects & Entrepreneurship",
        desc: "Students are encouraged to think independently, take initiative, solve problems creatively, and confidently present their ideas.",
        image: "https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783170483/MEP04640_qkhjcw.jpg"
    }
]





/**
 * Home Page — Aster Pakistan
 *
 * Main marketing and conversion page.
 * Sections: Hero, Why Choose Us, The Aster Difference, Educational Stages Overview,
 * Student Life Preview, Campus Preview, Admissions CTA,
 * Parent Testimonials, Latest Journal Articles, Contact CTA
 */
export default function Home() {
    // Local state for the Aster Difference accordion
    const [activeDifferenceIndex, setActiveDifferenceIndex] = useState(0)
    
    // Grab scrolling ref for the accordion
    const accordionScrollRef = useDraggableScroll<HTMLDivElement>()


    // Refs for GSAP ScrollTrigger animations
    const wcuSectionRef = useRef<HTMLElement>(null)
    const wcuImgLargeRef = useRef<HTMLDivElement>(null)
    const wcuImgSmallRef = useRef<HTMLDivElement>(null)
    const wcuTitleCardRef = useRef<HTMLDivElement>(null)
    const wcuContentRef = useRef<HTMLDivElement>(null)
    const wcuOrnamentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ==========================================
            // WCU VELOCITY TRACKER & PARALLAX
            // ==========================================
            if (wcuSectionRef.current) {

                gsap.fromTo(wcuImgLargeRef.current,
                    { y: 40 },
                    { y: -40, ease: 'none', scrollTrigger: { trigger: wcuSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
                )

                gsap.fromTo(wcuImgSmallRef.current,
                    { y: 70 },
                    { y: -70, ease: 'none', scrollTrigger: { trigger: wcuSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } }
                )

                gsap.fromTo(wcuTitleCardRef.current,
                    { y: 30 },
                    { y: -30, ease: 'none', scrollTrigger: { trigger: wcuSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
                )

                if (wcuContentRef.current?.children) {
                    gsap.fromTo(Array.from(wcuContentRef.current.children),
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: wcuContentRef.current, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' } }
                    )
                }

                gsap.fromTo(wcuOrnamentRef.current,
                    { y: 30 },
                    { y: -30, ease: 'none', scrollTrigger: { trigger: wcuSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
                )
            }



        })

        return () => ctx.revert()
    }, [])

    return (
        <div id="page-home" className="page-wrapper">
            <SEO 
                title="Home" 
                keywords="best school in karachi, top 10 schools in karachi, best O level school in karachi, best A level college in karachi, primary school karachi, kindergarten karachi, private schools in karachi, aster school karachi, aster edu pk, best education in karachi, early years education karachi, top schools in DHA karachi, best elementary school karachi, senior school karachi, cambridge school karachi, igcse karachi, admission in karachi school"
                schema={`{
                  "@context": "https://schema.org",
                  "@type": "School",
                  "name": "The Aster School",
                  "alternateName": ["Aster School Karachi", "Aster Pakistan"],
                  "url": "https://aster.edu.pk",
                  "logo": "https://aster.edu.pk/logo.jpg",
                  "description": "The Aster School is widely considered the best school in Karachi, offering an outstanding Cambridge curriculum from Preschool through Senior School (O Levels and A Levels). If you are looking for the top schools in Karachi, The Aster School stands out for its premium education, holistic student development, and state-of-the-art facilities.",
                  "knowsAbout": ["O Levels", "A Levels", "Preschool Education", "Elementary Education", "Cambridge Curriculum", "IGCSE", "Holistic Education"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Karachi",
                    "addressRegion": "Sindh",
                    "addressCountry": "PK"
                  }
                }`}
            />
            <style>{homeStyles}</style>

            {/* =========================================
                1. HERO SECTION
            ========================================= */}
            <HeroSection />
            {/* =========================================
                END HERO SECTION
            ========================================= */}


            {/* =========================================
                2. WHY CHOOSE US SECTION
            ========================================= */}
            <section id="why-choose-us" className="wcu-section" ref={wcuSectionRef}>

                {/* Custom SVG Ornament (Top Right) */}
                <div className="wcu-ornament-grid" aria-hidden="true" ref={wcuOrnamentRef}>
                    <img src={ribbonSvg} alt="" className="wcu-lines-svg" />
                </div>

                <div className="wcu-container">

                    {/* Left Side: Overlapping Visual Composition */}
                    <div className="wcu-visuals">

                        <div ref={wcuImgLargeRef} className="wcu-parallax-wrap wcu-img-large">
                            <ImageWithSkeleton
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783169370/1000555006_ptbiit.jpg"
                                alt="Students collaborating at Aster"
                                className="wcu-img-fill rounded-[4px]"
                                priority={true}
                            />
                        </div>

                        <div ref={wcuImgSmallRef} className="wcu-parallax-wrap wcu-img-small">
                            <ImageWithSkeleton
                                src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_800,q_auto,f_auto/v1783169602/1000555000_qvecon.jpg"
                                alt="Aster student working on a project"
                                className="wcu-img-fill rounded-[4px]"
                                priority={true}
                            />
                        </div>

                        {/* Floating Title Card */}
                        <div className="wcu-title-card" ref={wcuTitleCardRef}>
                            <div className="wcu-badge">
                                <span className="wcu-badge-text">WHY CHOOSE US</span>
                                <svg
                                    className="wcu-badge-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M12 0L13.8292 10.1708L24 12L13.8292 13.8292L12 24L10.1708 13.8292L0 12L10.1708 10.1708L12 0Z" fill="#FFC51B"/>
                                </svg>
                            </div>
                            <h2 className="wcu-heading">
                                Education at Aster<br />prepares children for life
                            </h2>
                        </div>
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="wcu-content" ref={wcuContentRef}>
                        <p className="wcu-body">
                            The world our children are growing into demands more than memorization.
                            It demands confidence, communication, adaptability, leadership.
                            The ability to think independently and solve real problems.
                            <br /><br />
                            At Aster, these qualities are intentionally developed from the
                            earliest years through meaningful experiences, hands-on learning,
                            and a culture that encourages students to explore, lead, and grow with purpose.
                        </p>

                        <Link to="/about" className="btn-aster btn-aster-blue">
                            <span>Learn More</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </Link>
                    </div>

                </div>
            </section>
            {/* =========================================
                END WHY CHOOSE US SECTION
            ========================================= */}


            {/* =========================================
                3. THE ASTER DIFFERENCE SECTION
                - Clean inner-scrollable list (no GSAP pinning)
                - Matched column heights
            ========================================= */}
            <section id="aster-difference" className="py-24 bg-[var(--color-aster-blue)] font-[var(--font-family-body)] overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] flex flex-col items-center gap-16">

                    {/* Section Header */}
                    <div className="flex flex-col items-center gap-4 text-center max-w-[900px]">
                        <div className="flex items-center gap-3">
                            <div className="w-[15px] h-[16px] bg-[var(--color-aster-gold)] rotate-[75deg] relative">
                                <div className="absolute w-[10px] h-[10px] bg-[var(--color-aster-blue)] -bottom-[4px] -right-[4px]" />
                            </div>
                            <span className="text-[var(--color-aster-gold)] tracking-[0.3em] font-medium text-[16px] uppercase font-[var(--font-family-body)]">
                                THE ASTER DIFFERENCE
                            </span>
                        </div>
                        <h2 className="text-white text-[40px] md:text-[48px] font-medium leading-[120%] tracking-[-0.02em] font-[var(--font-family-display)]">
                            Education Designed for the Future
                        </h2>
                        <p className="text-white/80 text-[18px] leading-[160%] tracking-[-0.012em] mt-2">
                            A learning experience designed for the future. At Aster, learning extends far beyond textbooks. Our programs are built to help students develop the skills, mindset, and character needed for a rapidly changing world.
                        </p>
                    </div>

                    {/* Content Split Layout - Items stretch ensures both columns are exact same height */}
                    <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-10 h-auto lg:h-[550px] items-stretch relative">

                        {/* Left Column: Image Display */}
                        <div className="relative w-full lg:w-1/2 min-h-[400px] bg-[#8EC3FB] rounded-[24px] shrink-0 overflow-hidden flex items-center justify-center">

                            {/* 4 Decorative Corners */}
                            <DecorativeCorner className="top-0 left-0" />
                            <DecorativeCorner className="top-0 right-0 origin-center" style={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }} />
                            <DecorativeCorner className="bottom-0 right-0 origin-center" style={{ transform: 'rotate(180deg)' }} />
                            <DecorativeCorner className="bottom-0 left-0 origin-center" style={{ transform: 'matrix(1, 0, 0, -1, 0, 0)' }} />

                            {/* Inner Dark Blue Square */}
                            <div className="absolute w-[200px] md:w-[350px] h-[200px] md:h-[350px] bg-[#394EA2]" />

                            {/* Dynamic Cross-Fading Images WITH Curved Edges */}
                            {differenceData.map((item, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-[75%] md:w-[413px] h-[70%] md:h-[400px] left-[50%] md:left-[calc(50%+30px)] top-[50%] md:top-[calc(50%-15px)] -translate-x-1/2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                                        activeDifferenceIndex === i
                                            ? 'opacity-100 -translate-y-1/2 scale-100 z-10'
                                            : 'opacity-0 -translate-y-[40%] scale-95 z-0'
                                    }`}
                                >
                                    <ImageWithSkeleton
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden"
                                        style={{ borderRadius: '11px' }}
                                        imgStyle={{ borderRadius: '11px' }}
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Interactive Accordion Container */}
                        <div className="w-full lg:w-1/2 bg-[#FAFAFA] border border-[rgba(143,143,146,0.24)] rounded-[32px] p-8 lg:p-10 flex flex-col overflow-hidden">

                            <h3 className="text-[32px] font-semibold text-[#0C0C13] mb-6 font-[var(--font-family-heading)] tracking-[-0.02em] shrink-0">
                                Our Core Pillars
                            </h3>

                            {/* Native Inner Scroll Area with Custom Scrollbar */}
                            <div 
                                ref={accordionScrollRef}
                                data-cursor-grab="true"
                                className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-4 pb-4 select-none"
                            >
                                {differenceData.map((item, i) => {
                                    const isActive = activeDifferenceIndex === i

                                    return (
                                        <div key={i} className="flex flex-col group cursor-pointer" onClick={() => setActiveDifferenceIndex(i)}>

                                            {/* Accordion Header */}
                                            <div className="flex items-center gap-4 py-3">
                                                <div className={`flex items-center justify-center shrink-0 w-[40px] h-[40px] rounded-full text-[18px] font-semibold transition-colors duration-300 ${
                                                    isActive ? 'bg-[#394EA2] text-white' : 'bg-[#5C5C61] text-white'
                                                }`}>
                                                    {i + 1}
                                                </div>
                                                <h4 className={`text-[20px] md:text-[24px] font-medium tracking-[-0.02em] transition-colors duration-300 ${
                                                    isActive ? 'text-[#394EA2]' : 'text-[#5C5C61] group-hover:text-[#0C0C13]'
                                                }`}>
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Accordion Dropdown Content */}
                                            <div className={`accordion-grid ${isActive ? 'is-open' : ''}`}>
                                                <div className="accordion-inner pl-[56px]">
                                                    <p className="text-[#5C5C61] text-[16px] leading-[160%] pb-4 pr-2">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={`w-full h-[1px] mt-1 transition-colors duration-300 ${
                                                isActive ? 'bg-[#394EA2]' : 'bg-[#5C5C61]/20'
                                            }`} />

                                        </div>
                                    )
                                })}
                            </div>

                            {/* Action Button */}
                            <div className="mt-6 shrink-0 pt-2 border-t border-[rgba(143,143,146,0.1)]">
                                <Link
                                    to="/our-approach"
                                    className="btn-aster btn-aster-blue"
                                >
                                    <span>Discover More</span>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            {/* =========================================
                END THE ASTER DIFFERENCE SECTION
            ========================================= */}




            {/* =========================================
                4. PROGRAMS SECTION
            ========================================= */}
            <ProgramsSection />

            {/* =========================================
                5. CAMPUSES SECTION
            ========================================= */}
            <CampusesSection />

            {/* =========================================
                6. TESTIMONIALS SECTION
            ========================================= */}
            <TestimonialsSection />

            {/* =========================================
                7. COMMUNITY CTA SECTION
            ========================================= */}
            <CommunityCtaSection />

        </div>
    )
}

/* ----------------------------------------
 * Page & Section Styles
 * ---------------------------------------- */
const homeStyles = `
/* === GLOBAL LAYOUT UTILS === */
.page-wrapper {
  display: block; 
  width: 100%;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

/* === SKELETON LOADER WRAPPER === */
.skeleton-wrapper {
  background: linear-gradient(90deg, #E0E0E0 25%, #C4C4C4 50%, #E0E0E0 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s infinite linear;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton-wrapper.is-loaded {
  animation: none;
  background: transparent;
}
.skeleton-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  display: block;
  border-radius: inherit;
  will-change: opacity;
}
.skeleton-wrapper img.loaded { opacity: 1; }

/* === CUSTOM SCROLLBAR FOR ACCORDION CONTAINER === */
.custom-scrollbar::-webkit-scrollbar {
  width: 12px; /* Thicker scrollbar for visibility */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(57, 78, 162, 0.35); 
  border-radius: 10px;
  border: 3px solid #FAFAFA; /* Pseudo padding */
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(57, 78, 162, 0.6);
}

/* =========================================
 * 2. WHY CHOOSE US SECTION STYLES
 * ========================================= */
.wcu-section {
  position: relative;
  width: 100%;
  padding: 160px 0 120px;
  background: #FFFFFF;
  overflow: hidden;
}

.wcu-ornament-grid {
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 0;
  opacity: 0.8;
  pointer-events: none;
  will-change: transform, opacity;
}

@keyframes float-slow {
  0%, 100% { transform: scaleX(-1) translateY(0); }
  50% { transform: scaleX(-1) translateY(-15px); }
}

.wcu-lines-svg {
  width: 240px;
  height: 240px;
  object-fit: contain;
  animation: float-slow 8s ease-in-out infinite;
}

.wcu-container {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end; 
  gap: 80px;
}

.wcu-visuals {
  position: relative;
  width: 100%;
  max-width: 780px;
  height: 680px;
  flex-shrink: 0;
}

.wcu-parallax-wrap {
  will-change: transform;
  transform: translateZ(0);
}

.wcu-img-fill {
  width: 100%;
  height: 100%;
}

.wcu-img-large {
  position: absolute;
  right: 0;
  top: 80px;
  width: 408px;
  height: 508px;
  z-index: 1;
  border-radius: 4px;
}

.wcu-img-small {
  position: absolute;
  left: 60px;
  bottom: 0;
  width: 315px;
  height: 340px;
  z-index: 2;
  border-radius: 4px;
}

.wcu-title-card {
  position: absolute;
  left: -20px;
  top: 0;
  width: 610px;
  background: #394EA2;
  padding: 56px 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  z-index: 3;
  will-change: transform, opacity;
  transform: translateZ(0);
}

.wcu-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.wcu-badge-text {
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0.3em;
  color: #E6E6EB;
  text-transform: uppercase;
}

.wcu-badge-icon {
  width: 16px;
  height: 16px;
  transform: rotate(15deg);
}

.wcu-heading {
  font-family: var(--font-family-display);
  font-weight: 500;
  font-size: 44px;
  line-height: 136%;
  text-align: right;
  color: #FFFFFF;
  margin: 0;
}

.wcu-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 380px;
  gap: 36px;
  padding-bottom: 40px; 
  flex-shrink: 0;
}

.wcu-body {
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  color: #15283D;
  opacity: 0.7;
  margin: 0;
}

/* Button classes moved to index.css */



.wcu-btn-link svg {
  transition: transform 0.2s ease;
}

.wcu-btn-link:hover svg {
  transform: translate(4px, -4px);
}

/* =========================================
 * 3. THE ASTER DIFFERENCE ACCORDION STYLES
 * ========================================= */
.accordion-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.accordion-grid.is-open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
}

@media (max-width: 1280px) {
  .wcu-container { padding: 0 60px; gap: 40px; }
  .wcu-visuals { transform: scale(0.85); transform-origin: left bottom; margin-right: -100px; }
}

@media (max-width: 1024px) {
  .wcu-section { padding: 100px 0; }
  .wcu-container { flex-direction: column; align-items: stretch; padding: 0 40px; gap: 56px; }
  .wcu-ornament-grid { display: none; }
  .wcu-visuals { transform: none; max-width: 100%; height: auto; margin-right: 0; display: flex; flex-direction: column; gap: 24px; }
  .wcu-title-card { position: relative; left: 0; top: 0; width: 100%; max-width: 100%; align-items: flex-start; padding: 40px; box-shadow: none; }
  .wcu-heading { text-align: left; font-size: 36px; }
  .wcu-img-large, .wcu-img-small { position: relative; right: auto; top: auto; left: auto; bottom: auto; width: 100%; height: auto; aspect-ratio: 16/9; box-shadow: none; }
  .wcu-content { max-width: 100%; padding-bottom: 0; }
}

@media (max-width: 600px) {
  .wcu-section { padding: 64px 0; }
  .wcu-container { padding: 0 24px; gap: 40px; }
  .wcu-title-card { padding: 32px 24px; }
  .wcu-heading { font-size: 28px; }
  .wcu-body { font-size: 16px; }
  .wcu-img-large, .wcu-img-small { aspect-ratio: 4/3; }
}
`
