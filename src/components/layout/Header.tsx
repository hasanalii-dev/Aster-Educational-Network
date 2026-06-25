import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { TransitionLink } from '@/components/ui/TransitionLink'

/**
 * Site Header — Aster Pakistan
 *
 * Responsive navbar with:
 * - Top announcement marquee (CMS ready via props)
 * - Logo on the left (points to /logo.jpg)
 * - Centered navigation mapped to all pages via animated premium dropdowns
 * - CTA button on the right (Brand Yellow)
 * - Smart sticky positioning
 * - Mobile Menu: Premium floating modal, staggered fluid animations,
 * massive typography, and dedicated action cards. Appears ABOVE navbar.
 */

/* ----------------------------------------
 * Icons
 * ---------------------------------------- */
const Icons = {
    Home: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    About: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    ),
    Academics: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
    ),
    Admissions: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    ),
    StudentLife: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
}

/* ----------------------------------------
 * Navigation data (Aligned with Content Doc)
 * ---------------------------------------- */
interface NavItem {
    label: string
    href?: string
    icon: ReactNode
    children?: { label: string; href: string; description?: string }[]
    featured?: { title: string; desc: string; img: string; href: string; action: string }
}

const navItems: NavItem[] = [
    {
        label: 'Home',
        href: '/',
        icon: Icons.Home,
    },
    {
        label: 'About',
        icon: Icons.About,
        featured: {
            title: 'Discover Aster',
            desc: 'A vibrant community dedicated to building future-ready learners.',
            img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
            href: '/about',
            action: 'Read our story'
        },
        children: [
            { label: 'About Us', href: '/about', description: 'Building future-ready learners' },
            { label: 'The Aster Difference', href: '/aster-difference', description: 'Education designed for the world' },
            { label: 'Our Campuses', href: '/campuses', description: 'Clifton, PECHS, & Riyadh' },
            { label: 'Safeguarding', href: '/safeguarding', description: 'Every child deserves to feel safe' },
            { label: 'Careers', href: '/careers', description: 'Build the future with us' },
        ],
    },
    {
        label: 'Academics',
        icon: Icons.Academics,
        featured: {
            title: 'Academic Excellence',
            desc: 'Child-centered, inquiry-based learning frameworks for all ages.',
            img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
            href: '/our-approach',
            action: 'Explore academics'
        },
        children: [
            { label: 'Our Approach', href: '/our-approach', description: 'Child-centered learning' },
            { label: 'Preschool', href: '/preschool', description: 'Early Years (Casa 1-3)' },
            { label: 'Elementary', href: '/elementary', description: 'Grade 1 – Grade 5' },
            { label: 'Senior School', href: '/senior-school', description: 'Grade 6 – Grade 11' },
        ],
    },
    {
        label: 'Student Life',
        icon: Icons.StudentLife,
        featured: {
            title: 'Campus Life',
            desc: 'Fostering creativity, wellness, and global citizenship every day.',
            img: 'https://images.unsplash.com/photo-1427504494785-319ce8372ac0?w=800&q=80',
            href: '/student-life',
            action: 'See campus life'
        },
        children: [
            { label: 'Life at Aster', href: '/student-life', description: 'More than a school day' },
            { label: 'Community', href: '/community', description: 'Growing together as partners' },
            { label: 'The Aster Journal', href: '/journal', description: 'Ideas, insights & conversations' },
        ]
    },
    {
        label: 'Admissions',
        icon: Icons.Admissions,
        featured: {
            title: 'Join Our Community',
            desc: 'Admissions for the 2026-2027 academic year are now open.',
            img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
            href: '/admissions',
            action: 'Apply today'
        },
        children: [
            { label: 'How to Apply', href: '/admissions', description: 'Begin your Aster journey' },
            { label: 'Parent Stories', href: '/parent-stories', description: 'The growth parents see' },
            { label: 'FAQs', href: '/faqs', description: 'Everything you need to know' },
            { label: 'Contact Us', href: '/contact', description: 'We’d love to hear from you' },
        ],
    },
]

/* ----------------------------------------
 * UI Components
 * ---------------------------------------- */
function ChevronDown({ isOpen }: { isOpen: boolean }) {
    return (
        <svg
            width="14"
            height="8"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
        >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function MenuIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="3" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    )
}

/* ----------------------------------------
 * Desktop Nav Link (No longer its own dropdown panel)
 * ---------------------------------------- */
function DesktopNavLink({ item, isOpen, onMouseEnter, onClick }: { item: NavItem, isOpen: boolean, onMouseEnter: (e: React.MouseEvent) => void, onClick?: () => void }) {
    if (!item.children) {
        return <TransitionLink to={item.href!} className="nav-link" onClick={onClick}><span>{item.label}</span></TransitionLink>
    }
    
    return (
        <button className={`nav-link nav-link-dropdown ${isOpen ? 'active' : ''}`} onMouseEnter={onMouseEnter} onClick={onClick} aria-expanded={isOpen} type="button">
            <span>{item.label}</span>
            <ChevronDown isOpen={isOpen} />
        </button>
    )
}

/* ----------------------------------------
 * Mobile Menu Huge Link / Accordion
 * ---------------------------------------- */
function MobileHugeLink({ item, isOpen, onToggle, onLinkClick, animDelay }: { item: NavItem, isOpen: boolean, onToggle: () => void, onLinkClick: () => void, animDelay: number }) {
    const style = { '--anim-delay': `${animDelay}ms` } as React.CSSProperties

    if (!item.children) {
        return (
            <div className="mobile-anim-item" style={style}>
                <TransitionLink to={item.href!} className="mobile-huge-link" onClick={onLinkClick}>
                    {item.label}
                </TransitionLink>
            </div>
        )
    }

    return (
        <div className="mobile-anim-item" style={style}>
            <button className="mobile-huge-link" onClick={onToggle} aria-expanded={isOpen} type="button">
                <span>{item.label}</span>
                <span className="mobile-huge-icon"><ChevronDown isOpen={isOpen} /></span>
            </button>
            <div className="mobile-huge-accordion" style={{ maxHeight: isOpen ? `${item.children.length * 70}px` : '0', opacity: isOpen ? 1 : 0 }}>
                <div className="mobile-huge-accordion-inner">
                    {item.children.map((child) => (
                        <TransitionLink key={child.href} to={child.href} className="mobile-huge-sublink" onClick={onLinkClick}>
                            {child.label}
                        </TransitionLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ----------------------------------------
 * Header Component Props
 * ---------------------------------------- */
interface HeaderProps {
    marqueeText?: string
    marqueeLink?: string
}

/* ----------------------------------------
 * Header Component
 * ---------------------------------------- */
export function Header({
                           marqueeText = "Admissions for the 2026-2027 academic year are now open.",
                           marqueeLink = "/admissions"
                       }: HeaderProps) {
    const location = useLocation()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [dropdownStyle, setDropdownStyle] = useState({ left: 0, opacity: 0, pointerEvents: 'none' })
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)
    
    const headerRef = useRef<HTMLElement>(null)
    const navRef = useRef<HTMLElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const closeMobile = useCallback(() => {
        setMobileOpen(false)
        setMobileAccordion(null)
    }, [])
    
    const closeDropdowns = useCallback(() => {
        setOpenDropdown(null)
        setDropdownStyle(prev => ({ ...prev, opacity: 0, pointerEvents: 'none' }))
    }, [])

    const handleMouseEnterDropdown = (label: string, e: React.MouseEvent) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpenDropdown(label)
        
        const button = e.currentTarget as HTMLElement
        if (navRef.current) {
            const navRect = navRef.current.getBoundingClientRect()
            const buttonRect = button.getBoundingClientRect()
            // Center the dropdown exactly underneath the button
            const leftOffset = buttonRect.left - navRect.left + (buttonRect.width / 2)
            
            setDropdownStyle({
                left: leftOffset,
                opacity: 1,
                pointerEvents: 'auto'
            })
        }
    }

    const handleMouseLeaveNav = () => {
        timeoutRef.current = setTimeout(() => {
            closeDropdowns()
        }, 150) // Slight delay to allow moving mouse to the panel
    }
    
    const handleMouseEnterNav = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    const marqueeItems = Array(6).fill(null)
    const scrolledClass = scrolled || location.pathname !== '/' ? 'site-header--scrolled' : ''

    return (
        <>
            <style>{headerStyles}</style>

            <header id="site-header" ref={headerRef} className={`site-header ${scrolledClass}`}>

                {/* === TOP MARQUEE STRIP === */}
                {marqueeText && (
                    <div className="header-marquee-wrapper">
                        <div className="header-marquee-track">
                            <div className="header-marquee-group">
                                {marqueeItems.map((_, i) => (
                                    <div className="header-marquee-item" key={`m1-${i}`}>
                                        <Link to={marqueeLink} className="header-marquee-link">{marqueeText}</Link>
                                        <span className="header-marquee-separator">✦</span>
                                    </div>
                                ))}
                            </div>
                            <div className="header-marquee-group" aria-hidden="true">
                                {marqueeItems.map((_, i) => (
                                    <div className="header-marquee-item" key={`m2-${i}`}>
                                        <Link to={marqueeLink} className="header-marquee-link">{marqueeText}</Link>
                                        <span className="header-marquee-separator">✦</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* === MAIN NAVBAR === */}
                <div className="header-nav-container">
                    <div className="header-inner">
                        <TransitionLink to="/" className="header-logo" aria-label="Aster Pakistan Home" onClick={closeMobile}>
                            <img src="/logo.jpg" alt="The Aster School" className="header-logo-img" />
                        </TransitionLink>

                        <nav id="main-navigation" className="desktop-nav" aria-label="Main navigation" ref={navRef} onMouseLeave={handleMouseLeaveNav} onMouseEnter={handleMouseEnterNav}>
                            {navItems
                                .filter(item => item.label !== 'Home') /* Hide Home on Desktop, keep in Mobile Drawer */
                                .map((item) => (
                                    <DesktopNavLink 
                                        key={item.label} 
                                        item={item} 
                                        isOpen={openDropdown === item.label} 
                                        onMouseEnter={(e) => handleMouseEnterDropdown(item.label, e)} 
                                        onClick={closeDropdowns}
                                    />
                                ))}

                            {/* Global Shifting Dropdown Panel */}
                            <div className="global-dropdown-panel" style={{ left: `${dropdownStyle.left}px`, opacity: dropdownStyle.opacity, pointerEvents: dropdownStyle.pointerEvents as any }}>
                                {navItems.filter(item => item.children).map(item => (
                                    <div key={`panel-${item.label}`} className={`dropdown-content-group ${openDropdown === item.label ? 'active' : ''}`}>
                                        
                                        {/* Left Side: Standard Links */}
                                        <div className="dropdown-links-list">
                                            {item.children!.map(child => (
                                                <TransitionLink key={child.href} to={child.href} className="nav-dropdown-item" onClick={closeDropdowns}>
                                                    <span className="nav-dropdown-item-label">{child.label}</span>
                                                    {child.description && <span className="nav-dropdown-item-desc">{child.description}</span>}
                                                </TransitionLink>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Card */}
                                        {item.featured && (
                                            <div className="dropdown-featured-card">
                                                <img src={item.featured.img} alt={item.featured.title} className="dropdown-featured-img" />
                                                <div className="dropdown-featured-content">
                                                    <h5 className="dropdown-featured-title">{item.featured.title}</h5>
                                                    <p className="dropdown-featured-desc">{item.featured.desc}</p>
                                                    <TransitionLink to={item.featured.href} className="dropdown-featured-link" onClick={closeDropdowns}>
                                                        {item.featured.action} &rarr;
                                                    </TransitionLink>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </nav>

                        <div className="header-actions">
                            <TransitionLink to="/contact" className="btn-aster btn-aster-primary" id="nav-book-visit">
                                <span>Book a Campus Visit</span>
                            </TransitionLink>
                        </div>

                        {/* Hamburger Button (Only opens the menu) */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                            type="button"
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>

            {/* === MOBILE OVERLAY === */}
            <div className={`mobile-overlay ${mobileOpen ? 'is-visible' : ''}`} onClick={closeMobile} aria-hidden="true" />

            {/* === MOBILE FLOATING APP DRAWER === */}
            <div className={`mobile-app-drawer ${mobileOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">

                {/* Drawer Header with Logo and Close Button */}
                <div className="mobile-drawer-header">
                    <img src="/logo.jpg" alt="Aster Logo" className="mobile-drawer-logo" />
                    <button className="mobile-close-btn" onClick={closeMobile} aria-label="Close menu">
                        <CloseIcon />
                    </button>
                </div>

                <div className="mobile-drawer-scroll-area">
                    {/* Top Links Section */}
                    <div className="mobile-drawer-links">
                        {navItems.map((item, index) => (
                            <MobileHugeLink
                                key={item.label}
                                item={item}
                                isOpen={mobileAccordion === item.label}
                                onToggle={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                                onLinkClick={closeMobile}
                                animDelay={100 + (index * 50)}
                            />
                        ))}
                    </div>

                    {/* Bottom Action Cards Section */}
                    <div className="mobile-drawer-actions">

                        {/* Card 1: Campus Visit (Yellow Palette) */}
                        <div className="mobile-anim-item" style={{ '--anim-delay': '400ms' } as React.CSSProperties}>
                            <Link to="/contact" className="mobile-action-card card-yellow" onClick={closeMobile}>
                                <div className="mobile-action-content">
                                    <span className="mobile-action-title">Campus Visit</span>
                                    <span className="mobile-action-desc">Experience Aster in person.</span>
                                </div>
                                <div className="mobile-action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        {/* Card 2: Admissions (White Palette) */}
                        <div className="mobile-anim-item" style={{ '--anim-delay': '450ms' } as React.CSSProperties}>
                            <Link to="/admissions" className="mobile-action-card card-white" onClick={closeMobile}>
                                <div className="mobile-action-content">
                                    <span className="mobile-action-title">Admissions</span>
                                    <span className="mobile-action-desc">Apply for the 2026-2027 year.</span>
                                </div>
                                <div className="mobile-action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

/* ----------------------------------------
 * Scoped Styles
 * ---------------------------------------- */
const headerStyles = `
/* === HEADER WRAPPER === */
.site-header {
  position: absolute;
  top: 0; 
  left: 0;
  z-index: 1000;
  width: 100%;
}

.site-header--scrolled {
  position: fixed;
  top: -40px; 
}


/* === TOP MARQUEE STRIP === */
.header-marquee-wrapper {
  background: #394da1; /* Primary 70% */
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
}

.header-marquee-track { display: flex; white-space: nowrap; }
.header-marquee-group { display: flex; align-items: center; animation: scrollMarquee 25s linear infinite; }
.header-marquee-track:hover .header-marquee-group { animation-play-state: paused; }
.header-marquee-item { display: flex; align-items: center; }

.header-marquee-link {
  font-family: 'Quicksand', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.2s ease;
}

.header-marquee-link:hover { opacity: 0.8; text-decoration: underline; text-underline-offset: 4px; }
.header-marquee-separator { color: #ffc715; font-size: 10px; margin: 0 32px; } /* Accent Yellow 70% */

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

/* === MAIN NAVBAR CONTAINER === */
.header-nav-container {
  background: transparent;
  transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1001; 
  border-radius: 0;
}

.site-header--scrolled .header-nav-container { 
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(51, 74, 137, 0.08); 
  border-bottom: 1px solid rgba(51, 74, 137, 0.08);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.site-header--scrolled .header-inner {
  height: 72px;
}

.header-logo { display: flex; align-items: center; flex-shrink: 0; transition: opacity 200ms ease; }
.header-logo:hover { opacity: 0.85; }
/* Forced straight edges for logo */
.header-logo-img { height: 50px; width: 50px; object-fit: contain; border-radius: 0 !important; }

/* === DESKTOP NAV & SHIFTING DROPDOWN === */
.desktop-nav { display: flex; align-items: center; gap: 40px; height: 100%; position: relative; }

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9); /* White text on hero */
  border: none;
  background: none;
  cursor: pointer;
  letter-spacing: -0.01em;
  text-decoration: none;
  transition: color 250ms ease;
}

.site-header--scrolled .nav-link {
  color: #334a89; /* Primary 90% */
}

.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background-color: #ffc715; 
  transform: scaleX(0); transform-origin: right; transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.site-header--scrolled .nav-link::after {
  background-color: #394da1; /* Primary 70% */
}

.nav-link:hover, .nav-link.active { color: #ffffff; }
.site-header--scrolled .nav-link:hover, .site-header--scrolled .nav-link.active { color: #394da1; }
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); transform-origin: left; }

.global-dropdown-panel {
  position: absolute;
  top: calc(100% + 8px);
  /* left is set dynamically */
  transform: translateX(-50%); /* Center over the target left coordinate */
  background: #ffffff;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 24px 64px -12px rgba(51, 74, 137, 0.2), 0 0 0 1px rgba(51, 74, 137, 0.05);
  transition: left 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
  will-change: left, opacity;
  z-index: 100;
}

.dropdown-content-group {
  display: none;
  flex-direction: row; /* Split Layout */
  gap: 32px;
}

.dropdown-content-group.active {
  display: flex;
  animation: fadeInContent 250ms ease forwards;
}

@keyframes fadeInContent {
  from { opacity: 0.5; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-links-list {
  display: flex;
  flex-direction: column;
  min-width: 280px;
}

.nav-dropdown-item {
  display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border-radius: 10px;
  text-decoration: none; transition: background 200ms ease, transform 200ms ease;
}

.nav-dropdown-item:hover { background: rgba(57, 77, 161, 0.05); transform: translateX(4px); }
.nav-dropdown-item-label { font-family: 'Quicksand', sans-serif; font-size: 15px; font-weight: 600; color: #334a89; transition: color 200ms ease; }
.nav-dropdown-item:hover .nav-dropdown-item-label { color: #394da1; }
.nav-dropdown-item-desc { font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 400; color: #6080cf; } /* Primary 30% */

.dropdown-featured-card {
  width: 260px;
  background: #F8F9FB;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dropdown-featured-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.dropdown-featured-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dropdown-featured-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #334a89;
  margin: 0 0 6px 0;
}

.dropdown-featured-desc {
  font-family: 'Quicksand', sans-serif;
  font-size: 13px;
  color: #6080cf;
  margin: 0 0 16px 0;
  line-height: 140%;
}

.dropdown-featured-link {
  margin-top: auto;
  font-family: 'Quicksand', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #394da1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 200ms ease;
}

.dropdown-featured-link:hover {
  opacity: 0.7;
}

/* === CTA BUTTON === */
.header-actions { display: flex; align-items: center; flex-shrink: 0; }
.btn-header {
  display: inline-flex; align-items: center; justify-content: center; padding: 12px 28px;
  font-family: 'Quicksand', sans-serif; font-size: 15px; font-weight: 700; color: #334a89; /* Primary 90% */
  background: #ffc715; /* Yellow 70% */ border-radius: 9999px; text-decoration: none; white-space: nowrap;
}

/* === MOBILE TOGGLE === */
.mobile-menu-toggle {
  display: none; align-items: center; justify-content: center; width: 48px; height: 48px;
  border: none; background: none; cursor: pointer; color: rgba(255, 255, 255, 0.9); border-radius: 8px;
  transition: background 200ms ease, color 200ms ease;
}

.site-header--scrolled .mobile-menu-toggle {
  color: #334a89;
}
.mobile-menu-toggle:hover { background: rgba(57, 77, 161, 0.05); }

/* === MOBILE OVERLAY (Behind the floating drawer) === */
.mobile-overlay {
  position: fixed; inset: 0; z-index: 9998; /* VERY HIGH Z-INDEX */
  background: rgba(51, 74, 137, 0.6); backdrop-filter: blur(8px);
  opacity: 0; visibility: hidden; transition: opacity 400ms ease, visibility 400ms ease;
}
.mobile-overlay.is-visible { opacity: 1; visibility: visible; }

/* =========================================
 * MOBILE APP DRAWER (Reference Inspired)
 * ========================================= */
.mobile-app-drawer {
  position: fixed;
  top: 16px; bottom: 16px; right: 16px;
  width: calc(100vw - 32px); max-width: 420px;
  background: #334a89; /* Strict Palette: Primary 90% */
  border-radius: 28px;
  z-index: 9999; /* HIGHEST Z-INDEX, ABOVE NAVBAR */
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  
  /* Slide in animation */
  transform: translateY(20px) scale(0.98);
  opacity: 0;
  visibility: hidden;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease, visibility 400ms ease;
}

.mobile-app-drawer.is-open {
  transform: translateY(0) scale(1);
  opacity: 1;
  visibility: visible;
}

/* Drawer Header */
.mobile-drawer-header {
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* No curves or filters on logo per request */
.mobile-drawer-logo {
  height: 40px;
  width: auto;
  border-radius: 0 !important;
}

.mobile-close-btn {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; background: rgba(255, 255, 255, 0.1); border: none;
  border-radius: 50%; color: #FFFFFF; cursor: pointer; transition: background 200ms ease, transform 200ms ease;
}

.mobile-close-btn:hover { background: rgba(255, 255, 255, 0.2); transform: rotate(90deg); }

.mobile-drawer-scroll-area {
  flex: 1; overflow-y: auto; padding: 24px 32px 32px;
  display: flex; flex-direction: column; justify-content: space-between;
}

/* Staggered Items Class */
.mobile-anim-item {
  opacity: 0; transform: translateY(16px);
  transition: opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0ms; 
}

.mobile-app-drawer.is-open .mobile-anim-item {
  opacity: 1; transform: translateY(0); transition-delay: var(--anim-delay);
}

/* Huge Links Section */
.mobile-drawer-links { display: flex; flex-direction: column; gap: 8px; }

.mobile-huge-link {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 12px 0; background: none; border: none; text-align: left;
  font-family: 'Quicksand', sans-serif; font-size: 36px; font-weight: 700; letter-spacing: -0.03em;
  color: #FFFFFF; text-decoration: none; cursor: pointer; transition: color 200ms ease;
}

.mobile-huge-link:hover, .mobile-huge-link:active { color: #ffc715; /* Yellow 70% */ }
.mobile-huge-icon { color: rgba(255, 255, 255, 0.5); }

/* Sublinks inside Accordion */
.mobile-huge-accordion { overflow: hidden; transition: max-height 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease; }

.mobile-huge-accordion-inner {
  display: flex; flex-direction: column; gap: 16px; padding: 12px 0 24px 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.2); margin-left: 8px; margin-top: 8px;
}

.mobile-huge-sublink {
  font-family: 'Quicksand', sans-serif; font-size: 18px; font-weight: 500;
  color: #FFFFFF; opacity: 0.8; text-decoration: none; transition: all 200ms ease;
}

.mobile-huge-sublink:hover { color: #ffc715; opacity: 1; }

/* Action Cards Section (Bottom) */
.mobile-drawer-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 48px; }

.mobile-action-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-radius: 20px; text-decoration: none;
  transition: transform 250ms ease, box-shadow 250ms ease;
}

.mobile-action-card:active { transform: scale(0.97); }

.card-yellow { background: #ffc715; color: #334a89; }
.card-white { background: #FFFFFF; color: #334a89; }

.mobile-action-content { display: flex; flex-direction: column; gap: 4px; }
.mobile-action-title { font-family: 'Quicksand', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
.mobile-action-desc { font-family: 'Quicksand', sans-serif; font-size: 14px; font-weight: 500; opacity: 0.8; }

.mobile-action-icon {
  display: flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; background: rgba(51, 74, 137, 0.1); border-radius: 12px; color: #334a89;
}
.card-white .mobile-action-icon { background: rgba(51, 74, 137, 0.06); }

/* === RESPONSIVE ALIGNMENT === */
@media (max-width: 1200px) {
  .header-inner { padding: 0 40px; gap: 1rem; }
  .desktop-nav { gap: 24px; }
}

@media (max-width: 1024px) {
  .desktop-nav, .header-actions { display: none; }
  .mobile-menu-toggle { display: flex; }
  .header-inner { height: 72px; padding: 0 24px; }
  .site-header { top: -auto; } /* Adjust for mobile marquee wrap */
}

@media (min-width: 1025px) {
  .mobile-app-drawer, .mobile-overlay { display: none !important; }
}

@media (max-width: 400px) {
  .mobile-huge-link { font-size: 32px; }
  .mobile-action-title { font-size: 18px; }
  .mobile-action-desc { font-size: 13px; }
}
`
