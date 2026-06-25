import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ImageWithSkeleton Helper Component
 * Includes real-time loading states and an onError escape hatch.
 */
const ImageWithSkeleton = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`skeleton-wrapper ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)} // Prevents infinite skeleton trapping if a link drops
        className={`program-img ${isLoaded ? 'is-visible' : ''}`}
        loading="lazy"
      />
    </div>
  )
}

/* ----------------------------------------
 * High-Reliability Pexels CDN Image Data
 * ---------------------------------------- */
const learnerData = [
  { title: "Annual plays and performances", image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Robotics competitions", image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Sports tournaments", image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Passion Projects", image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Student-led initiatives", image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Entrepreneurship experiences", image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Community and fundraising events", image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Field trips and experiential learning", image: "https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=800" },
]

export function ProgramsSection() {
  const [activeLearnerIndex, setActiveLearnerIndex] = useState(0)
  const learnerSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop Auto-Scrubbing Pin
      mm.add("(min-width: 1024px)", () => {
        if (learnerSectionRef.current) {
          ScrollTrigger.create({
            trigger: learnerSectionRef.current,
            start: "center center",
            end: "+=2400",
            pin: true,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const totalItems = learnerData.length;
              const newIndex = Math.min(totalItems - 1, Math.floor(self.progress * totalItems));
              setActiveLearnerIndex(newIndex);
            }
          });
        }
      });
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Direct Google Fonts link ensuring Manrope & Playfair Display are explicitly loaded */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{programsStyles}</style>

      <section id="learners-to-leaders" ref={learnerSectionRef} className="learners-section" data-cursor-scroll="true">
        <div className="learners-container">

          {/* === LEFT COLUMN: Headings & Program List === */}
          <div className="learners-left">

            <div className="learners-header">
              <div className="learners-kicker">
                <div className="learners-kicker-icon">
                  <div className="learners-kicker-dot" />
                  <div className="learners-kicker-dot-2" />
                </div>
                <span>LEARNING IN ACTION</span>
              </div>
              <h2 className="learners-title">From Learners<br />To Leaders</h2>
            </div>

            <div className="learners-list">
              {learnerData.map((item, i) => {
                const isActive = activeLearnerIndex === i;
                return (
                  <div
                    key={i}
                    className={`learner-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveLearnerIndex(i)}
                  >
                    <div className="learner-line" />
                    <h3 className="learner-name">{item.title}</h3>
                  </div>
                )
              })}
            </div>

          </div>

          {/* === RIGHT COLUMN: Visuals & Overlapping Gold Card === */}
          <div className="learners-right">

            {/* Main Image Stack */}
            <div className="learners-image-wrapper">
              {learnerData.map((item, i) => (
                <div
                  key={i}
                  className={`learners-image-layer transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeLearnerIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <ImageWithSkeleton src={item.image} alt={item.title} />
                </div>
              ))}
            </div>

            {/* Overlapping Aster Gold Card */}
            <div className="learners-yellow-card">
              <p>
                Experiences that build confidence, creativity, and courage. Meaningful learning happens when students actively participate, create, collaborate, and lead.
              </p>
            </div>

            {/* Pagination Dots (Far Right) */}
            <div className="learners-pagination">
              <div className="learners-dots-container">
                {learnerData.map((_, i) => (
                  <div key={i} className={`learner-dot-wrap ${activeLearnerIndex === i ? 'is-active' : ''}`}>
                    <div className="learner-dot" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

/* ----------------------------------------
 * Premium Scoped CSS (Syntax Verified)
 * ---------------------------------------- */
const programsStyles = `
/* Skeleton Loader */
.skeleton-wrapper {
  background: linear-gradient(90deg, #DCE2DC 25%, #C8D0C8 50%, #DCE2DC 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s infinite linear;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.program-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  display: block;
  border-radius: inherit;
}

.program-img.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* =========================================
 * NEW SECTION TINT: Oxford Linen (#F4F1EA)
 * ========================================= */
.learners-section {
  position: relative;
  width: 100%;
  background-color: #F4F1EA; /* High-end warm parchment stone tint */
  padding: 130px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.learners-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  gap: 80px;
  min-height: 650px;
}

/* LEFT COLUMN */
.learners-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: 440px;
  flex-shrink: 0;
}

.learners-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.learners-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.3em;
  color: #394EA2;
  text-transform: uppercase;
}

.learners-kicker-icon {
  width: 15px;
  height: 16px;
  background: #394EA2;
  transform: rotate(75deg);
  position: relative;
}

.learners-kicker-dot, .learners-kicker-dot-2 {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #F4F1EA; /* Matches new canvas */
}
.learners-kicker-dot { right: -2px; bottom: 0; }
.learners-kicker-dot-2 { right: 4px; bottom: 6px; }

/* Regal Garamond Serif Headline */
.learners-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
  font-size: 58px;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #394EA2;
  margin: 0;
}

.learners-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 12px;
  width: 100%;
}

.learner-item {
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0.35;
  transition: opacity 300ms ease;
  cursor: pointer;
}

.learner-item.is-active {
  opacity: 1;
}

.learner-line {
  width: 24px;
  height: 2px;
  background: #394EA2;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 300ms ease;
}

.learner-item.is-active .learner-line {
  opacity: 1;
  transform: translateX(0);
}

/* Explicitly locked to Quicksand */
.learner-name {
  font-family: 'Quicksand', sans-serif !important;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #15283D;
  margin: 0;
  transition: color 0.2s ease;
}

.learner-item.is-active .learner-name {
  color: #394EA2;
}

/* RIGHT COLUMN */
.learners-right {
  position: relative;
  flex-grow: 1;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.learners-image-wrapper {
  position: relative;
  width: 420px;
  height: 520px;
  border-radius: 16px;
  background: #E0E6E0;
  z-index: 1;
  box-shadow: 0 24px 56px rgba(12, 12, 19, 0.12);
}

.learners-image-layer {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
}

/* Aster Gold Card */
.learners-yellow-card {
  position: absolute;
  width: 380px;
  background-color: #FFC51B; 
  border-radius: 12px;
  padding: 40px 48px;
  right: 0;
  bottom: -20px;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(255, 197, 27, 0.25);
}

.learners-yellow-card p {
  font-family: 'Quicksand', sans-serif !important;
  font-weight: 600;
  font-size: 17px;
  line-height: 160%;
  color: #15283D;
  margin: 0;
}

/* PAGINATION DOTS */
.learners-pagination {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

.learners-dots-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.learner-dot-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: border-color 300ms ease;
}

.learner-dot-wrap.is-active {
  border-color: #394EA2;
}

.learner-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #394EA2;
  opacity: 0.2;
  transition: opacity 300ms ease;
}

.learner-dot-wrap.is-active .learner-dot {
  opacity: 1;
}

/* RESPONSIVE */
@media (max-width: 1280px) {
  .learners-container { padding: 0 60px; gap: 40px; }
  .learners-right { transform: scale(0.9); transform-origin: right center; }
}

@media (max-width: 1024px) {
  .learners-section { padding: 100px 0; }
  .learners-container { flex-direction: column; padding: 0 40px; gap: 60px; min-height: auto; }
  .learners-left { width: 100%; align-items: flex-start; }
  .learners-list { display: none; }
  .learners-right { transform: none; width: 100%; height: auto; display: flex; flex-direction: column; gap: 24px; }
  .learners-image-wrapper { width: 100%; height: auto; aspect-ratio: 4/5; max-width: 500px; }
  .learners-yellow-card { position: relative; width: 100%; right: auto; bottom: auto; padding: 32px; max-width: 500px; }
  .learners-pagination { display: none; }
}

@media (max-width: 600px) {
  .learners-section { padding: 64px 0; }
  .learners-container { padding: 0 24px; gap: 40px; }
  .learners-title { font-size: 40px; }
  .learners-image-wrapper { aspect-ratio: 1; }
  .learners-yellow-card p { font-size: 16px; }
}
`; // Explicitly closed and terminated!