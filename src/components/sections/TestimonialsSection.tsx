import { useState } from 'react'

/* ----------------------------------------
 * Verified Parent Feedback Data
 * ---------------------------------------- */
const testimonialsData = [
    {
        quote: "The balance between academics, character-building, and practical learning is what truly sets Aster apart. I can’t explain how much joy it brings to see my child working on his own ventures and succeeding in it.",
        author: "Parent of Senior School Student",
        tier: "Senior School"
    },
    {
        quote: "We’ve seen remarkable growth in our child’s confidence and communication. Aster creates an environment where children genuinely enjoy learning while developing important life skills.",
        author: "Parent of Elementary Student",
        tier: "Elementary School"
    },
    {
        quote: "Alyan has become far more independent, expressive, and confident since joining Aster. The confidence in doing things on his own and doing it well is definitely the wow factor for me.",
        author: "Parent of Early Years Student",
        tier: "Early Years"
    }
]

export function TestimonialsSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <>
            <style>{bookendTestimonialsStyles}</style>

            <section className="structural-testimonials-section">
                <div className="testimonials-master-container">

                    {/* === 1. SECTION HEADER (Strict Sitewide Synchronization) === */}
                    <div className="testimonials-header-block">

                        {/* Sitewide Kicker matching the live Hero & Learners modules */}
                        <div className="section-title-badge">
                            <svg className="section-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                            <span className="section-badge-text">THE ASTER COMMUNITY</span>
                        </div>

                        {/* Monumental Garamond Title */}
                        <h2 className="testimonials-main-title">
                            What Our Parents Say
                        </h2>

                        <p className="testimonials-subtitle">
                            Direct feedback from the families who trust us with their children’s future.
                        </p>

                    </div>

                    {/* === 2. THE 24px-RADIUS ARCHITECTURAL TRIPTYCH === */}
                    <div className="testimonials-triptych-grid">
                        {testimonialsData.map((item, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`architectural-feedback-card ${isHovered ? 'is-elevated' : ''}`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Top Row: School Tier Badge & Gold Stars */}
                                    <div className="card-top-meta">
                                        <span className="campus-tier-badge">{item.tier}</span>
                                        <div className="rating-stars" aria-label="5 out of 5 stars">
                                            ★★★★★
                                        </div>
                                    </div>

                                    {/* Center Body: High-Legibility Editorial Serif Quote */}
                                    <blockquote className="card-quote-prose">
                                        "{item.quote}"
                                    </blockquote>

                                    {/* Footer Row: Sitewide Blue Rule & Author Attribution */}
                                    <div className="card-attribution-footer">
                                        <div className="attribution-blue-rule"></div>
                                        <cite className="parent-author-name">{item.author}</cite>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                    {/* === 3. SUBTLE TRUST BAR === */}
                    <div className="trust-anchor-bar">
                        <div className="anchor-line"></div>
                        <span>VERIFIED ANNUAL PARENT SURVEY REVIEWS</span>
                        <div className="anchor-line"></div>
                    </div>

                </div>
            </section>
        </>
    )
}

/* ----------------------------------------
 * Sitewide Synchronized CSS (Syntax Locked)
 * ---------------------------------------- */
const bookendTestimonialsStyles = `
/* =========================================
 * IMMERSIVE CANVAS: Academic Navy (#050B14)
 * Bookends the page by matching your live Hero
 * ========================================= */
.structural-testimonials-section {
  position: relative;
  width: 100%;
  background-color: #121212; /* Deep Dark Charcoal */
  padding: 160px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.testimonials-master-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
}

/* HEADER BLOCK */
.testimonials-header-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  max-width: 720px;
}

.section-title-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.section-badge-text {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.25em;
  color: #FFC51B; /* Aster Yellow */
  text-transform: uppercase;
}

.section-badge-icon {
  width: 15px;
  height: 15px;
  color: #FFC51B; /* Aster Yellow */
}

.testimonials-main-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 64px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.08;
  letter-spacing: -0.01em;
  margin: 0;
}

.testimonials-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
}

/* TRIPTYCH GRID */
.testimonials-triptych-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
}

/* THE 24px ARCHITECTURAL CONTAINER */
.architectural-feedback-card {
  background-color: #FFFFFF;
  border-radius: 24px; /* Exact match to sitewide cards */
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
}

.architectural-feedback-card.is-elevated {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(255, 197, 27, 0.15); /* Subtle gold ambient glow on hover */
}

/* Card Top Metadata */
.card-top-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.campus-tier-badge {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background-color: #394EA2; /* Aster Primary Blue */
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 100px;
}

.rating-stars {
  color: #FFC51B;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* Card Prose */
.card-quote-prose {
  font-family: 'Quicksand', sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
  color: #15283D;
  line-height: 1.6;
  margin: 0 0 40px 0;
  flex-grow: 1;
}

/* Card Footer */
.card-attribution-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attribution-blue-rule {
  width: 40px;
  height: 2px;
  background-color: #394EA2;
}

.parent-author-name {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #394EA2;
  font-style: normal;
  text-transform: uppercase;
}

/* TRUST ANCHOR BAR */
.trust-anchor-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 680px;
  opacity: 0.35;
}

.anchor-line {
  flex-grow: 1;
  height: 1px;
  background-color: #FFFFFF;
}

.trust-anchor-bar span {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FFFFFF;
}

/* RESPONSIVE RULES */
@media (max-width: 1280px) {
  .testimonials-master-container { padding: 0 60px; gap: 64px; }
  .card-quote-prose { font-size: 20px; }
}

@media (max-width: 1024px) {
  .testimonials-triptych-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .architectural-feedback-card:last-child { grid-column: span 2; max-width: 600px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .structural-testimonials-section { padding: 100px 0; }
  .testimonials-master-container { padding: 0 32px; gap: 56px; }
  .testimonials-main-title { font-size: 46px; }
  .testimonials-triptych-grid { grid-template-columns: 1fr; gap: 28px; }
  .architectural-feedback-card:last-child { grid-column: span 1; max-width: 100%; }
  .architectural-feedback-card { padding: 40px 32px; }
  .trust-anchor-bar { display: none; }
}
`; // Explicitly closed and syntax locked