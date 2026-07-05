import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

gsap.registerPlugin(ScrollTrigger)

/**
 * Site Footer — Aster Pakistan
 * Features:
 * - Floating overlapping Newsletter card (Polished UI).
 * - Clean, multi-column navigation mapped to all CMS pages.
 * - GSAP Parallax and stagger reveal animations.
 * - Animated Oxygen Bubbles background effect.
 */

const footerLinks = {
    about: [
        { label: 'About Us', path: '/about' },
        { label: 'The Aster Difference', path: '/aster-difference' },
        { label: 'Our Campuses', path: '/campuses' },
        { label: 'Safeguarding', path: '/safeguarding' },
        { label: 'Careers', path: '/careers' },
    ],
    academics: [
        { label: 'Our Approach', path: '/our-approach' },
        { label: 'Preschool', path: '/preschool' },
        { label: 'Elementary', path: '/elementary' },
        { label: 'Senior School', path: '/senior-school' },
    ],
    studentLife: [
        { label: 'Life at Aster', path: '/student-life' },
        { label: 'Community', path: '/community' },
        { label: 'The Aster Journal', path: '/journal' },
    ],
    admissions: [
        { label: 'How to Apply', path: '/admissions' },
        { label: 'Parent Stories', path: '/parent-stories' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Contact Us', path: '/contact' },
    ]
}

function OxygenBubbles() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current

        let isActive = true
        const spawnBubble = () => {
            if (!isActive) return
            const bubble = document.createElement('div')
            const size = gsap.utils.random(12, 32)
            const startX = gsap.utils.random(5, 95) // percentage
            const opacity = gsap.utils.random(0.05, 0.15) // highly transparent

            bubble.style.position = 'absolute'
            bubble.style.bottom = '-40px'
            bubble.style.left = `${startX}%`
            bubble.style.width = `${size}px`
            bubble.style.height = `${size}px`
            bubble.style.borderRadius = '50%'
            bubble.style.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.5})`
            bubble.style.border = `1px solid rgba(255, 255, 255, ${opacity * 2})`
            bubble.style.pointerEvents = 'none'
            bubble.style.zIndex = '1'

            const highlight = document.createElement('div')
            highlight.style.position = 'absolute'
            highlight.style.bottom = '10%'
            highlight.style.right = '10%'
            highlight.style.width = '60%'
            highlight.style.height = '60%'
            highlight.style.borderRadius = '50%'
            highlight.style.borderBottom = `1.5px solid rgba(255, 255, 255, ${opacity * 4})`
            highlight.style.transform = 'rotate(-45deg)'

            bubble.appendChild(highlight)

            container.appendChild(bubble)

            const duration = gsap.utils.random(15, 30)
            const targetY = -gsap.utils.random(300, 800)

            const tl = gsap.timeline({
                onComplete: () => {
                    if (!isActive) return
                    // Bubble Pop Animation
                    gsap.to(bubble, {
                        scale: 1.8,
                        opacity: 0,
                        duration: 0.25,
                        ease: 'power2.out',
                        onComplete: () => {
                            if (bubble.parentNode === container) {
                                bubble.remove()
                            }
                        }
                    })
                }
            })

            // Rise Up
            tl.to(bubble, {
                y: targetY,
                duration: duration,
                ease: 'power1.inOut'
            }, 0)

            // Zig Zag / Drift
            tl.to(bubble, {
                x: `+=${gsap.utils.random(-80, 80)}`,
                duration: duration / 3,
                yoyo: true,
                repeat: 2,
                ease: 'sine.inOut'
            }, 0)

            // Fade in slightly at start
            gsap.fromTo(bubble, { opacity: 0 }, { opacity: 1, duration: 0.5 })

            setTimeout(spawnBubble, gsap.utils.random(1500, 3500))
        }

        // Start a few bubbles immediately
        for(let i=0; i<2; i++) {
            setTimeout(spawnBubble, i * 400)
        }

        return () => {
            isActive = false
        }
    }, [])

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />
}

export function Footer() {
    const currentYear = new Date().getFullYear()
    const footerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        const footer = footerRef.current
        const content = contentRef.current
        if (!footer || !content) return

        const parallaxTl = gsap.fromTo(content,
            { yPercent: -15 },
            {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        )

        const groups = content.querySelectorAll('.footer-anim-group')
        const fadeTl = gsap.fromTo(groups,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )

        return () => {
            parallaxTl.kill()
            fadeTl.kill()
        }
    }, [])

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        try {
            const { error } = await supabase.from('newsletter_subscribers').insert([
                { email: email, status: 'subscribed' }
            ])
            if (error) {
                if (error.code === '23505') {
                    // Already subscribed
                    setSubscribed(true)
                } else {
                    console.error('Newsletter error:', error)
                    alert('An error occurred. Please try again.')
                }
            } else {
                setSubscribed(true)
            }
        } catch (err) {
            console.error('Newsletter error:', err)
        }

        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <style>{footerStyles}</style>
            <footer ref={footerRef} id="site-footer" className="site-footer">
                <div className="newsletter-wrapper">
                    <div className="newsletter-container">
                        <div className="newsletter-card">
                            <div className="newsletter-mesh mesh-teal" />
                            <div className="newsletter-mesh mesh-purple" />
                            <div className="newsletter-content">
                                <h3 className="newsletter-title">Join Our Newsletter</h3>
                                <p className="newsletter-desc">
                                    Subscribe for the latest news, campus events, and educational insights from Aster Pakistan.
                                </p>
                            </div>
                            <div className="newsletter-form-container">
                                {subscribed ? (
                                    <div className="newsletter-success">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Thank you for subscribing!
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="newsletter-form">
                                        <div className="newsletter-input-wrapper">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Your email address"
                                                required
                                                className="newsletter-input"
                                            />
                                        </div>
                                        <button type="submit" className="btn-aster btn-aster-primary" style={{ padding: '14px 24px', flexShrink: 0 }}>
                                            Subscribe
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-waves-container">
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax-waves">
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(51, 74, 137, 0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(51, 74, 137, 0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(51, 74, 137, 0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#334a89" />
                        </g>
                    </svg>
                </div>

                <div className="footer-background">
                    <OxygenBubbles />
                    <div ref={contentRef} className="footer-content-wrapper">
                        <div className="footer-grid">
                            <div className="footer-brand-col footer-anim-group">
                                <Link to="/" className="footer-logo-link">
                                    <img src="/logo.jpg" alt="The Aster School" className="footer-logo-img" />
                                </Link>
                                <p className="footer-slogan">
                                    Building Future-Ready Leaders <br/>
                                </p>
                                <div className="footer-contact">
                                    <a href="mailto:info@aster.edu.pk" className="footer-contact-link">info@aster.edu.pk</a>
                                    <a href="tel:+923368827837" className="footer-contact-link">+92 336 882 7837</a>
                                </div>
                            </div>
                            <div className="footer-links-grid">
                                <div className="footer-link-group footer-anim-group">
                                    <h4 className="footer-link-title">About</h4>
                                    <ul className="footer-link-list">
                                        {footerLinks.about.map((link) => (
                                            <li key={link.path}>
                                                <Link to={link.path} className="footer-link-item">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="footer-link-group footer-anim-group">
                                    <h4 className="footer-link-title">Academics</h4>
                                    <ul className="footer-link-list">
                                        {footerLinks.academics.map((link) => (
                                            <li key={link.path}>
                                                <Link to={link.path} className="footer-link-item">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="footer-link-group footer-anim-group">
                                    <h4 className="footer-link-title">Student Life</h4>
                                    <ul className="footer-link-list">
                                        {footerLinks.studentLife.map((link) => (
                                            <li key={link.path}>
                                                <Link to={link.path} className="footer-link-item">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="footer-link-group footer-anim-group">
                                    <h4 className="footer-link-title">Admissions</h4>
                                    <ul className="footer-link-list">
                                        {footerLinks.admissions.map((link) => (
                                            <li key={link.path}>
                                                <Link to={link.path} className="footer-link-item">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer-legal-bar footer-anim-group">
                            <div className="footer-legal-left">
                                <p className="footer-copyright">
                                    &copy; {currentYear} The Aster School. All rights reserved.
                                </p>
                                <div className="footer-legal-links">
                                    <Link to="/safeguarding" className="footer-legal-item">Safeguarding</Link>
                                    <span className="footer-legal-dot">•</span>
                                    <Link to="#" className="footer-legal-item">Privacy Policy</Link>
                                    <span className="footer-legal-dot">•</span>
                                    <Link to="#" className="footer-legal-item">Terms of Service</Link>
                                </div>
                            </div>
                            
                            <button onClick={scrollToTop} className="footer-back-to-top" aria-label="Scroll back to top">
                                <span className="font-['Quicksand'] font-bold text-sm">BACK TO TOP</span>
                                <div className="footer-back-icon">
                                    <ArrowUp className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

const footerStyles = `
.site-footer {
  position: relative;
  margin-top: 120px;
  z-index: 0;
  font-family: 'Quicksand', sans-serif;
}
.newsletter-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
  padding: 0 24px;
}
.newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
}
@keyframes float-box {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.newsletter-card {
  background: #FFFFFF;
  border-radius: 32px;
  box-shadow: 0 24px 64px -16px rgba(21, 40, 61, 0.15), 0 0 0 1px rgba(0,0,0,0.02) inset;
  padding: 48px 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  animation: float-box 8s ease-in-out infinite;
}
.newsletter-mesh {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  opacity: 0.8;
}
.mesh-teal { 
  background: rgba(255, 199, 21, 0.25); 
  top: -150px; right: -100px; 
}
.mesh-purple { 
  background: rgba(51, 74, 137, 0.15); 
  bottom: -200px; left: -50px; 
}
.newsletter-content {
  flex: 1;
  position: relative;
  z-index: 10;
}
.newsletter-title {
  font-size: 32px;
  font-weight: 800;
  color: #15283D;
  letter-spacing: -0.02em;
  margin: 0 0 12px 0;
}
.newsletter-desc {
  font-size: 16px;
  font-weight: 500;
  color: #5C5C61;
  max-width: 420px;
  margin: 0;
  line-height: 160%;
}
.newsletter-form-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 10;
}
.newsletter-form {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.newsletter-input-wrapper {
  flex: 1;
  position: relative;
  min-width: 0;
}
.newsletter-input {
  width: 100%;
  background: #F8F9FB;
  border: 1px solid rgba(21, 40, 61, 0.1);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); 
  border-radius: 16px;
  padding: 16px 24px;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #15283D;
  transition: all 250ms ease;
}
.newsletter-input::placeholder { color: #A0A0A5; }
.newsletter-input:focus {
  outline: none;
  border-color: #394da1;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02), 0 0 0 4px rgba(57, 77, 161, 0.1);
  background: #FFFFFF;
}
.newsletter-submit {
  background: #ffc715; 
  color: #15283D;
  padding: 16px 32px;
  border-radius: 16px;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.newsletter-success {
  background: rgba(106, 179, 157, 0.15); 
  border: 1px solid rgba(106, 179, 157, 0.3);
  color: #2D6A53;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.footer-waves-container {
  width: 100%;
  height: 120px;
  margin-bottom: -2px; /* Prevent sub-pixel gap */
  line-height: 0;
  position: relative;
  z-index: 10;
}
.waves {
  position: relative;
  width: 100%;
  height: 100%;
}
.parallax-waves > use {
  animation: wave-move 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax-waves > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax-waves > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax-waves > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax-waves > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes wave-move {
  0% { transform: translate3d(-90px, 0, 0); }
  100% { transform: translate3d(85px, 0, 0); }
}

.footer-background {
  background: #334a89; 
  color: #FFFFFF;
  padding-top: 80px; 
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.footer-content-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  width: 100%;
  position: relative;
  z-index: 10;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 10;
}
.footer-logo-img {
  height: 60px;
  width: auto;
  border-radius: 0 !important; 
}
.footer-slogan {
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}
.footer-contact-link {
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 200ms ease, transform 200ms ease;
  display: inline-block;
  transform-origin: left;
}
.footer-contact-link:hover { color: #ffc715; transform: translateX(4px); }
.footer-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  z-index: 10;
}
.footer-link-group {
  display: flex;
  flex-direction: column;
}
.footer-link-title {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ffc715; 
  margin: 0 0 24px 0;
}
.footer-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer-link-item {
  position: relative;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  color: #E4F0F9;
  text-decoration: none;
  transition: color 250ms ease, transform 250ms ease;
}
.footer-link-item::after {
  content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background-color: #ffc715;
  transform: scaleX(0); transform-origin: right; transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-link-item:hover { color: #FFFFFF; transform: translateX(4px); }
.footer-link-item:hover::after { transform: scaleX(1); transform-origin: left; }
.footer-legal-bar {
  margin-top: 80px;
  padding-top: 32px;
  border: none !important;
  border-top: 1px solid rgba(255,255,255,0.15) !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 10;
}
.footer-legal-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-copyright {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}
.footer-legal-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.footer-legal-dot {
  color: rgba(255,255,255,0.3);
  font-size: 12px;
}
.footer-legal-item {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 200ms ease;
}
.footer-legal-item:hover { color: #ffc715; }

.footer-back-to-top {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px 0;
  transition: opacity 0.2s ease;
}
.footer-back-to-top:hover {
  opacity: 0.8;
}
.footer-back-to-top:hover .footer-back-icon {
  transform: translateY(-4px);
  background: #ffc715;
  color: #334a89;
  border-color: #ffc715;
}
.footer-back-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}


@media (max-width: 1024px) {
  .newsletter-card { flex-direction: column; text-align: center; padding: 40px; }
  .newsletter-form { width: 100%; }
  .footer-content-wrapper { padding: 0 40px; }
  .footer-grid { grid-template-columns: 1fr; gap: 64px; }
  .footer-brand-col { align-items: center; text-align: center; }
  .footer-links-grid { grid-template-columns: repeat(2, 1fr); gap: 48px; }
}
@media (max-width: 600px) {
  .newsletter-wrapper { padding: 0 16px; }
  .newsletter-card { padding: 32px 24px; }
  .newsletter-form { flex-direction: column; }
  .newsletter-title { font-size: 24px; }
  .footer-background { padding-top: 320px; }
  .footer-content-wrapper { padding: 0 24px; }
  .footer-links-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .footer-link-item::after { left: 50%; transform: translateX(-50%) scaleX(0); transform-origin: center; }
  .footer-link-item:hover { transform: translateY(-2px); }
  .footer-link-item:hover::after { transform: translateX(-50%) scaleX(1); }
  .footer-legal-bar { flex-direction: column-reverse; gap: 32px; text-align: center; align-items: center; }
  .footer-legal-left { align-items: center; gap: 16px; }
  .footer-legal-links { flex-direction: column; gap: 12px; align-items: center; }
  .footer-legal-dot { display: none; }
}
`
