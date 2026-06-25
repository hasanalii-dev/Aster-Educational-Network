import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CommunityCtaSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
            if (words.length > 0) {
                gsap.to(words, {
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.prose-reveal-container',
                        start: 'top 85%',
                        end: 'bottom 60%',
                        scrub: true,
                    }
                })
            }

            gsap.fromTo('.architectural-conversion-chest',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.architectural-conversion-chest', start: 'top 80%' } }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <>
            <style>{sunlitCommunityStyles}</style>

            <section ref={sectionRef} className="sunlit-community-finale">
                <div className="finale-max-container">

                    {/* PART 1: THE UPPER WHITE ATRIUM */}
                    <div className="community-partnership-block">

                        <div className="section-title-badge">
                            <svg className="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span className="section-badge-text">COMMUNITY</span>
                        </div>

                        <p className="community-lead-prose prose-reveal-container">
                            {`At Aster, parents are active partners in the learning journey. Through meaningful engagement, open communication, workshops, events, and shared experiences, we create a community where children feel supported both at school and at home.`.split(' ').map((word, i) => (
                                <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] opacity-20 will-change-transform">{word}</span>
                            ))}
                        </p>

                        <p className="community-sub-prose">
                            Growth is strongest when families and educators work together and we are a school community built on partnership and trust.
                        </p>

                    </div>

                    {/* PART 2: THE ASTER BLUE MONOLITH CHEST */}
                    <div className="architectural-conversion-chest relative overflow-hidden">
                        
                        {/* ── REQUESTED LOGO WATERMARK ── */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                            <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                        </div>

                        <div className="chest-inner-rim z-10"></div>

                        <h2 className="monumental-philosophy-title z-10 relative">
                            “The right environment<br />shapes a lifetime.”
                        </h2>

                        <p className="chest-body-copy z-10 relative">
                            At Aster, students are guided to grow with confidence, humility, resilience, and purpose; preparing them not only for academic success, but for life beyond the classroom.
                        </p>

                        <div className="action-trigger-box z-10 relative">

                            <h3 className="trigger-headline">
                                Begin your child’s journey with Aster.
                            </h3>

                            <div className="conversion-button-row">
                                <Link to="/admissions" className="btn-aster btn-aster-primary">
                                    <span>Join the Waitlist</span>
                                    <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                                </Link>

                                <Link to="/campuses" className="btn-aster btn-aster-white">
                                    <span>Schedule a Campus Visit</span>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

const sunlitCommunityStyles = `
/* =========================================
 * SPOTLESS CANVAS: Pure White (#FFFFFF)
 * Lets the Blue Chest act as the hero block
 * ========================================= */
.sunlit-community-finale {
  position: relative;
  width: 100%;
  background-color: #FFFFFF; 
  padding: 100px 0 160px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.finale-max-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
}

.community-partnership-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 860px;
  gap: 24px;
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
  color: #394EA2; /* Aster Blue */
  text-transform: uppercase;
}

.section-badge-icon {
  width: 15px;
  height: 15px;
  color: #394EA2; /* Aster Blue */
}

/* Flipped to Alabaster Slate */
.community-lead-prose {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 34px;
  font-weight: 500;
  color: #0C0C13;
  line-height: 1.45;
  margin: 0;
}

.community-sub-prose {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #5C5C61;
  line-height: 1.6;
  margin: 0;
  max-width: 90%;
}

/* THE MONOLITH CHEST */
.architectural-conversion-chest {
  position: relative;
  width: 100%;
  background-color: #394EA2; /* Solid Aster Primary Blue */
  border-radius: 24px;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 24px 56px rgba(57, 78, 162, 0.25);
  box-sizing: border-box;
}

.chest-inner-rim {
  position: absolute;
  top: 0; left: 64px; right: 64px;
  height: 3px;
  background-color: #FFC51B;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0.9;
}

.monumental-philosophy-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 72px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0 0 32px 0;
}

.chest-body-copy {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 0 64px 0;
}

.action-trigger-box {
  width: 100%;
  padding-top: 56px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.trigger-headline {
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.01em;
  margin: 0;
}

.conversion-button-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* Button classes moved to index.css */

@media (max-width: 1200px) {
  .finale-max-container { padding: 0 60px; gap: 80px; }
  .architectural-conversion-chest { padding: 70px 60px; }
  .monumental-philosophy-title { font-size: 60px; }
}
@media (max-width: 992px) {
  .community-lead-prose { font-size: 28px; }
  .architectural-conversion-chest { padding: 60px 40px; }
  .monumental-philosophy-title { font-size: 50px; }
  .chest-body-copy { font-size: 18px; }
}
@media (max-width: 768px) {
  .sunlit-community-finale { padding: 60px 0 100px 0; }
  .finale-max-container { padding: 0 32px; gap: 64px; }
  .community-lead-prose { font-size: 24px; text-align: left; }
  .community-sub-prose { font-size: 16px; text-align: left; }
  
  .architectural-conversion-chest { padding: 48px 28px; border-radius: 20px; }
  .chest-inner-rim { left: 28px; right: 28px; }
  .monumental-philosophy-title { font-size: 40px; text-align: left; margin-bottom: 24px; }
  .chest-body-copy { font-size: 16px; text-align: left; margin-bottom: 40px; }
  
  .action-trigger-box { padding-top: 40px; gap: 24px; align-items: flex-start; text-align: left; }
  .trigger-headline { font-size: 20px; }
  .conversion-button-row { flex-direction: column; width: 100%; gap: 16px; }
  .btn-conversion-primary, .btn-conversion-secondary { width: 100%; justify-content: center; }
}
`;