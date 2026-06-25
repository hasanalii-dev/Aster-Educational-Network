import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------
 * Individual Campus Multi-Media Card
 * ---------------------------------------- */
interface CampusItem {
    name: string
    grades: string
    desc: string
    image: string
    video: string
    path: string
}

const CampusCard = ({ campus }: { campus: CampusItem }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current && isVideoReady) {
            videoRef.current.play().catch(() => {})
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    return (
        <Link
            to={campus.path}
            className="editorial-campus-card group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* === LAYER 1: BASE PARALLAX IMAGE === */}
            <div className="campus-img-overflow">
                <img
                    src={campus.image}
                    alt={campus.name}
                    className="campus-base-img"
                    loading="lazy"
                />
            </div>

            {/* === LAYER 2: HOVER VIDEO === */}
            <video
                ref={videoRef}
                className={`campus-hover-video ${isVideoReady && isHovered ? 'is-playing' : ''}`}
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoReady(true)}
            >
                <source src={campus.video} type="video/mp4" />
            </video>

            {/* === LAYER 3: CINEMATIC VIGNETTE === */}
            <div className="campus-vignette"></div>

            {/* === LAYER 4: CENTERED BRITISH EDITORIAL CONTENT === */}
            <div className="campus-content-stack">
                <span className="campus-grade-range">{campus.grades}</span>
                <h3 className="campus-editorial-title">{campus.name}</h3>

                <div className="campus-hover-drawer">
                    <p className="campus-description">{campus.desc}</p>

                    <div className="btn-aster btn-aster-outline">
                        <span>LEARN MORE</span>
                        <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

/* ----------------------------------------
 * Campuses Master Data
 * ---------------------------------------- */
const campusesData: CampusItem[] = [
    {
        name: "PECHS Junior",
        grades: "EARLY YEARS – GRADE 4",
        desc: "A nurturing environment focused on foundational learning, confidence-building, and curiosity-driven exploration.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
        video: "https://alpha.edu.pk/img/hero.mp4",
        path: "/campuses"
    },
    {
        name: "PECHS Senior",
        grades: "GRADE 5 – GRADE 11",
        desc: "A future-focused environment where students develop leadership, academic excellence, independence, and real-world readiness.",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
        video: "https://alpha.edu.pk/img/hero.mp4",
        path: "/campuses"
    },
    {
        name: "Clifton Campus",
        grades: "EARLY YEARS – GRADE 5",
        desc: "A vibrant learning space where creativity, exploration, and skill-building are woven into everyday learning.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        video: "https://alpha.edu.pk/img/hero.mp4",
        path: "/campuses"
    }
]

export function CampusesSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            // Desktop Cinematic Experience
            mm.add("(min-width: 1024px)", () => {

                // 1. Kicker & Title Bloom
                gsap.fromTo(".kicker-gold-rule",
                    { width: 0 },
                    { width: 40, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".campuses-header-block", start: "top 80%" } }
                )
                gsap.fromTo(".campuses-main-title",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".campuses-header-block", start: "top 80%" } }
                )

                // 2. Asymmetrical Curtain Rise (Cards Stagger)
                gsap.fromTo(".editorial-campus-card",
                    { y: 160, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: "expo.out",
                        stagger: 0.25, // Creates the 1 -> 2 -> 3 cascading delay
                        scrollTrigger: {
                            trigger: ".monolith-cards-grid",
                            start: "top 85%",
                        }
                    }
                )

                // 3. True Internal Cinematic Lens Scrub
                gsap.utils.toArray<HTMLElement>(".campus-base-img").forEach((img) => {
                    gsap.fromTo(img,
                        { yPercent: -8 },
                        {
                            yPercent: 8,
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".monolith-cards-grid",
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    )
                })
            })

            // Mobile/Tablet Gentle Entrance (Prevents scroll lag on touch devices)
            mm.add("(max-width: 1023px)", () => {
                gsap.fromTo(".editorial-campus-card",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ".monolith-cards-grid", start: "top 85%" } }
                )
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <style>{editorialCampusesStyles}</style>

            <section id="campuses" ref={sectionRef} className="sitewide-campuses-section">
                <div className="campuses-master-container">

                    <div className="campuses-header-block">
                        <div className="campuses-badge" style={{ marginBottom: '16px' }}>
                            <span className="campuses-badge-text">CAMPUSES</span>
                            <svg
                                className="campuses-badge-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FFC51B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <h2 className="campuses-main-title">
                            Three Campuses. <span className="text-[#FFC51B] italic">One Shared Vision.</span>
                        </h2>
                    </div>

                    <div className="monolith-cards-grid">
                        {campusesData.map((campus, index) => (
                            <CampusCard key={index} campus={campus} />
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

/* ----------------------------------------
 * British Editorial Scoped CSS
 * ---------------------------------------- */
const editorialCampusesStyles = `
.sitewide-campuses-section {
  position: relative;
  width: 100%;
  background-color: #FFFFFF;
  padding: 140px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.campuses-master-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
}

.campuses-header-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.campuses-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.campuses-badge-text {
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0.3em;
  color: #394EA2; /* Aster Blue for visibility on white */
  text-transform: uppercase;
}

.campuses-badge-icon {
  width: 16px;
  height: 16px;
  transform: rotate(15deg);
}

.sitewide-kicker-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.kicker-gold-rule {
  width: 40px;
  height: 1px;
  background-color: #394EA2; 
  will-change: width;
}

.kicker-tracked-text {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.3em;
  color: #394EA2;
  text-transform: uppercase;
}

.campuses-main-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 58px;
  font-weight: 500;
  color: #394EA2;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
  will-change: transform, opacity;
}

/* GRID */
.monolith-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 1280px;
}

/* THE EDITORIAL CARD */
.editorial-campus-card {
  position: relative;
  width: 100%;
  height: 580px; 
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  background-color: #15283D;
  box-shadow: 0 16px 36px rgba(12, 12, 19, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.editorial-campus-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 24px 56px rgba(57, 78, 162, 0.2);
}

/* Overflow wrapper to hide the extra image height needed for GSAP parallax scrubbing */
.campus-img-overflow {
  position: absolute;
  inset: -15%; /* Generous bleed area for vertical movement */
  overflow: hidden;
  z-index: 1;
}

.campus-base-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.editorial-campus-card:hover .campus-base-img {
  transform: scale(1.06);
}

/* Layer 2: Looping Video */
.campus-hover-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease;
  z-index: 2;
}

.campus-hover-video.is-playing {
  opacity: 1;
}

/* Layer 3: Editorial Vignette */
.campus-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 11, 20, 0) 0%, rgba(5, 11, 20, 0.2) 40%, rgba(5, 11, 20, 0.85) 85%, #050B14 100%);
  z-index: 3;
  transition: opacity 0.4s ease;
}

.editorial-campus-card:hover .campus-vignette {
  background: linear-gradient(180deg, rgba(5, 11, 20, 0) 0%, rgba(5, 11, 20, 0.4) 30%, rgba(5, 11, 20, 0.95) 80%, #050B14 100%);
}

/* Layer 4: Content Stack */
.campus-content-stack {
  position: relative;
  z-index: 10;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.campus-grade-range {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FFFFFF;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.9;
  transition: transform 0.4s ease;
}

.campus-editorial-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 46px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.05;
  margin: 0;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.editorial-campus-card:hover .campus-editorial-title {
  transform: translateY(-4px);
}

.campus-hover-drawer {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, margin-top 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.editorial-campus-card:hover .campus-hover-drawer {
  max-height: 220px;
  opacity: 1;
  margin-top: 16px;
}

.campus-description {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 24px 0;
  max-width: 95%;
}

.btn-aster.btn-aster-outline {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 28px;
  border-radius: 100px;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
  transition: all 0.25s ease;
}

.editorial-campus-card:hover .btn-aster.btn-aster-outline {
  border-color: #FFC51B; 
  color: #FFC51B;
}

.btn-arrow {
  font-size: 14px;
  transition: transform 0.25s ease;
}

.editorial-campus-card:hover .btn-arrow {
  transform: translateX(4px);
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .campuses-master-container { padding: 0 60px; }
  .editorial-campus-card { height: 520px; }
  .campus-editorial-title { font-size: 38px; }
}

@media (max-width: 992px) {
  .monolith-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .editorial-campus-card:last-child { grid-column: span 2; max-width: 50%; margin: 0 auto; }
}

@media (max-width: 768px) {
  .sitewide-campuses-section { padding: 90px 0; }
  .campuses-master-container { padding: 0 32px; gap: 56px; }
  .campuses-main-title { font-size: 42px; }
  .monolith-cards-grid { grid-template-columns: 1fr; gap: 24px; }
  .editorial-campus-card:last-child { grid-column: span 1; max-width: 100%; }
  .editorial-campus-card { height: 460px; }
  .campus-hover-drawer { max-height: 200px; opacity: 1; margin-top: 12px; }
  .campus-description { font-size: 13px; margin-bottom: 16px; }
}
`;