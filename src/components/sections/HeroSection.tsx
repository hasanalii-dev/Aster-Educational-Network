import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <>
            {/* Google Fonts: Playfair Display (Regal Ivy Serif) + Quicksand */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <style>{eliteHeroStyles}</style>

            <section className="cinematic-hero">

                {/* 1. PERMANENTLY MUTED AMBIENT BACKGROUND VIDEO */}
                {!isVideoLoaded && <div className="hero-video-skeleton absolute inset-0 z-0"></div>}
                <video
                    ref={videoRef}
                    className={`cinematic-video-bg transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadedData={() => setIsVideoLoaded(true)}
                    autoPlay
                    loop
                    muted // Hard-locked permanently
                    playsInline
                    poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop"
                >
                    <source src="https://alpha.edu.pk/img/hero.mp4" type="video/mp4" />
                </video>

                {/* Master Vignette to guarantee text contrast */}
                <div className="cinematic-vignette"></div>

                {/* 2. ETONHOUSE STYLE SIDE-DOCK (Far Right) */}
                <aside className="elite-side-dock" aria-label="Quick Access">

                    <Link to="/campuses" className="dock-item group">
                        <div className="dock-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <span className="dock-label">Our Campuses</span>
                    </Link>

                    <Link to="/admissions" className="dock-item group">
                        <div className="dock-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <span className="dock-label">Book a Tour</span>
                    </Link>

                    <Link to="/contact" className="dock-item group">
                        <div className="dock-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <span className="dock-label">Inquire Now</span>
                    </Link>

                </aside>

                {/* 3. MAIN HERO CONTENT (Restored to exact V1 layout) */}
                <div className="cinematic-content-container">

                    {/* KICKER */}
                    <div className="hero-kicker-wrapper">
                        <span className="kicker-text">Where Independence Begins and Curiosity Flourishes</span>
                        <svg className="kicker-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>

                    {/* MAIN HEADLINE */}
                    <h1 className="cinematic-headline">
                        Building Future-Ready Leaders.
                    </h1>

                    <div className="cinematic-sub-layout">

                        {/* BODY COPY */}
                        <p className="cinematic-body">
                            A Cambridge school where students grow through leadership, innovation, character, and real-world learning developing the confidence and skills to thrive beyond the classroom.
                        </p>

                        {/* REQUESTED TWO BUTTONS IN SOLID PRIMARY PALETTE */}
                        <div className="hero-cta-row">

                            {/* Primary Action: Solid Aster Blue Block */}
                            <Link 
                                to="/admissions" 
                                className="btn-aster btn-aster-primary"
                            >
                                <span>Join the Waitlist</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>

                            {/* Secondary Action: Crisp Solid White Block */}
                            <Link 
                                to="/campuses" 
                                className="btn-aster btn-aster-white"
                                data-cursor-image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
                            >
                                <span>Book a Campus Visit</span>
                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}

/* ----------------------------------------
 * Premium Ivy CSS (Syntax Verified)
 * ---------------------------------------- */
const eliteHeroStyles = `
:root {
  --ivy-serif: 'Playfair Display', Georgia, serif;
  --ivy-sans: 'Quicksand', sans-serif;
  --aster-primary: #394EA2;
  --aster-yellow: #FFC51B;
}

.cinematic-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 720px;
  background-color: #050b14;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
}

/* Background Video */
.cinematic-video-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: contrast(1.05) brightness(0.85);
}

/* Vignette */
.cinematic-vignette {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(0deg, rgba(5, 11, 20, 0.85) 0%, rgba(5, 11, 20, 0.25) 45%, rgba(5, 11, 20, 0.65) 100%),
    radial-gradient(circle at 75% 40%, transparent 0%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

@keyframes skeleton-pulse-dark {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.hero-video-skeleton {
  background: linear-gradient(90deg, #050b14 25%, #15283D 50%, #050b14 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse-dark 1.5s infinite linear;
}

/* ===================================================
 * 1. ETONHOUSE VERTICAL DOCK (Far Right)
 * =================================================== */
.elite-side-dock {
  position: absolute;
  right: 0; top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  background: rgba(5, 11, 20, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.dock-item {
  position: relative;
  display: flex; align-items: center;
  width: 54px; height: 54px;
  color: rgba(255, 255, 255, 0.65);
  background: transparent; border: none;
  cursor: pointer; text-decoration: none;
  transition: color 0.2s ease;
}

.dock-icon {
  width: 54px; height: 54px;
  display: flex; justify-content: center; align-items: center;
  position: relative; z-index: 2;
}

.dock-item:hover { color: var(--aster-yellow); }

/* Slide-out Label */
.dock-label {
  position: absolute;
  right: 54px; height: 38px;
  padding: 0 16px;
  background: #050b14; color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right: none;
  font-family: var(--ivy-sans); font-weight: 700; font-size: 12px;
  letter-spacing: 0.1em; text-transform: uppercase;
  display: flex; align-items: center; white-space: nowrap;
  border-top-left-radius: 6px; border-bottom-left-radius: 6px;
  opacity: 0; transform: translateX(8px);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.dock-item:hover .dock-label {
  opacity: 1; transform: translateX(0);
}

/* ===================================================
 * 2. MAIN HERO STATEMENT (V1 Layout)
 * =================================================== */
.cinematic-content-container {
  position: relative;
  z-index: 10;
  max-width: 1440px; width: 100%;
  padding: 0 100px 90px 100px;
}

.hero-kicker-wrapper {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 24px;
}

.kicker-text {
  font-family: var(--ivy-sans); font-weight: 600; font-size: 20px;
  letter-spacing: 0.02em; color: rgba(255, 255, 255, 0.85);
}

.kicker-arrow {
  color: var(--aster-yellow);
}

.cinematic-headline {
  font-family: var(--ivy-serif);
  font-size: 74px; font-weight: 500;
  color: #FFFFFF; line-height: 1.05;
  letter-spacing: -0.01em; margin: 0 0 24px 0;
  max-width: 850px;
  text-shadow: 0 12px 30px rgba(0,0,0,0.6);
}

.cinematic-sub-layout {
  display: flex; flex-direction: column; gap: 36px;
  max-width: 680px;
}

.cinematic-body {
  font-family: var(--ivy-sans); font-size: 18px; font-weight: 500;
  color: rgba(255, 255, 255, 0.85); line-height: 1.65; margin: 0;
}

.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

/* Button classes moved to index.css */

/* Responsive Rules */
@media (max-width: 1024px) {
  .cinematic-content-container { padding: 0 60px 70px 60px; }
  .cinematic-headline { font-size: 58px; }
}

@media (max-width: 768px) {
  .cinematic-content-container { padding: 0 32px 60px 32px; }
  .elite-side-dock { display: none; }
  .cinematic-headline { font-size: 42px; }
  .cinematic-body { font-size: 16px; }
  .hero-cta-row { flex-direction: column; align-items: stretch; gap: 14px; }
  .btn-solid-primary, .btn-solid-secondary { justify-content: center; }
}
`; // <-- Strictly terminated string!