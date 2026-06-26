import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/layout/Header'

export default function UnifiedAuth() {
    const containerRef = useRef<HTMLDivElement>(null)
    const formStageRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // State Engine
    const [isSignUp, setIsSignUp] = useState(false)
    const [authStep, setAuthStep] = useState<'credentials' | 'otp'>('credentials')

    // Form Payload
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otpCode, setOtpCode] = useState('')

    // Feedback Engine
    const [error, setError] = useState('')
    const [statusMsg, setStatusMsg] = useState('')
    const [loading, setLoading] = useState(false)

    // =========================================================
    // INITIAL GSAP PAGE ENTRANCE
    // =========================================================
    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. (Removed broken navbar animation)

            // 2. Form Element Cascade Stagger
            gsap.fromTo(
                '.gsap-auth-elem',
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.06,
                    ease: 'power3.out',
                    clearProps: 'transform' // Preserves structural focus positions
                }
            )

            // 3. Field Stagger Initialization
            gsap.fromTo(
                '.gsap-auth-field',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
            )

            // 4. Full-Bleed Video Plinth Slide-In
            gsap.fromTo(
                '.gsap-video-panel',
                { opacity: 0, scale: 1.02 },
                { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // =========================================================
    // ANIMATED SWITCH BETWEEN SIGN IN & SIGN UP
    // =========================================================
    const toggleAuthMode = (targetMode: boolean) => {
        if (isSignUp === targetMode) return
        setError('')
        setStatusMsg('')

        const fields = formStageRef.current?.querySelectorAll('.gsap-auth-field')
        const header = containerRef.current?.querySelector('.gsap-header-text')

        const tl = gsap.timeline({
            onComplete: () => {
                setIsSignUp(targetMode)
                // Wait for React to re-render DOM with new state
                setTimeout(() => {
                    gsap.fromTo(
                        containerRef.current?.querySelectorAll('.gsap-header-text, .gsap-auth-field, .gsap-submit-trigger'),
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
                    )
                }, 0)
            }
        })

        // Compress outgoing architecture smoothly
        tl.to([fields, header], { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
    }

    // =========================================================
    // ANIMATED VIEW CHANGE (Credentials <-> OTP)
    // =========================================================
    const animateStepChange = (nextStep: 'credentials' | 'otp') => {
        if (!formStageRef.current) {
            setAuthStep(nextStep)
            return
        }

        gsap.to(formStageRef.current.children, {
            opacity: 0,
            x: -20,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setAuthStep(nextStep)
                gsap.fromTo(
                    formStageRef.current!.children,
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                )
            }
        })
    }

    // =========================================================
    // AUTH EXECUTION HANDLERS
    // =========================================================
    const handleCredentialsSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setStatusMsg('')
        setLoading(true)

        if (isSignUp) {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: fullName } },
            })

            if (signUpError) {
                setError(signUpError.message)
                setLoading(false)
                return
            }

            animateStepChange('otp')
            setStatusMsg(`Verification code dispatched to ${email}`)
            setLoading(false)
        } else {
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signInError) {
                setError(signInError.message)
                setLoading(false)
                return
            }

            await routeUser(authData.user.id)
        }
    }

    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { data, error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: 'signup',
        })

        if (verifyError) {
            setError('Invalid code block. Check your inbox and try again.')
            setLoading(false)
            return
        }

        if (data.user) {
            await routeUser(data.user.id)
        }
    }

    const routeUser = async (userId: string) => {
        if (email === 'hasanalijaffe@gmail.com') {
            navigate('/admin')
            return
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single()

        if (profile && (profile.role === 'admin' || profile.role === 'super_admin')) {
            navigate('/admin')
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <>
            <style>{authStyles}</style>
            <div ref={containerRef} className="auth-master-plinth">

                <Header />

                {/* Master Shell Split Layout */}
                <div className="auth-split-wrapper" style={{ paddingTop: '80px' }}>

                    {/* =========================================================
              LEFT SHEET: THE CONTROLS PLINTH
          ========================================================= */}
                    <div className="auth-left-sheet">
                        <div className="auth-form-max">

                            {/* Dynamic Header Copy Block */}
                            <div className="gsap-auth-elem gsap-header-text mb-8">
                                <h1 className="font-['Quicksand'] text-3xl font-extrabold tracking-tight !text-[#15283D] m-0">
                                    {authStep === 'otp'
                                        ? 'Confirm Email'
                                        : isSignUp ? 'Create an Account' : 'Sign In'
                                    }
                                </h1>
                                <p className="font-['Quicksand'] text-sm font-medium leading-relaxed !text-[#5C5C61] mt-2.5 m-0">
                                    {authStep === 'otp'
                                        ? 'Provide the 6-digit verification code token sent directly to your email address.'
                                        : isSignUp
                                            ? 'Create an account to securely track your applications, forms, and admission updates.'
                                            : 'Sign in to access your portal, forms, and events.'
                                    }
                                </p>
                            </div>

                            {/* Mode Switcher Tabs */}
                            {authStep === 'credentials' && (
                                <div className="gsap-auth-elem switcher-capsule mb-8">
                                    <button
                                        type="button"
                                        onClick={() => toggleAuthMode(false)}
                                        className={`switcher-tab-link ${!isSignUp ? 'is-active' : ''}`}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleAuthMode(true)}
                                        className={`switcher-tab-link ${isSignUp ? 'is-active' : ''}`}
                                    >
                                        Create Account
                                    </button>
                                </div>
                            )}

                            {/* Form Payload Core Stage */}
                            <div ref={formStageRef} className="w-full">
                                {authStep === 'credentials' ? (
                                    <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4.5">

                                        {error && <div className="auth-alert-error">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

                                        {isSignUp && (
                                            <div className="gsap-auth-field flex flex-col gap-1.5 input-motion-group">
                                                <label htmlFor="full-name" className="auth-label-node">Parent / Guardian Full Name</label>
                                                <input
                                                    id="full-name"
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Syed Ali"
                                                    className="auth-field-input"
                                                    required
                                                />
                                            </div>
                                        )}

                                        <div className="gsap-auth-field flex flex-col gap-1.5 input-motion-group">
                                            <label htmlFor="auth-email" className="auth-label-node">Email Address</label>
                                            <input
                                                id="auth-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="parent@example.com"
                                                className="auth-field-input"
                                                required
                                            />
                                        </div>

                                        <div className="gsap-auth-field flex flex-col gap-1.5 input-motion-group">
                                            <label htmlFor="auth-password" className="auth-label-node">Password</label>
                                            <input
                                                id="auth-password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="auth-field-input"
                                                required
                                                minLength={6}
                                            />
                                        </div>

                                        <button type="submit" className="gsap-submit-trigger auth-master-button mt-2" disabled={loading}>
                                            {loading ? <span className="auth-loading-spinner" /> : isSignUp ? 'Sign Up' : 'Sign In'}
                                        </button>
                                    </form>
                                ) : (

                                    /* ── VIEW B: 6-DIGIT OTP FIELD ── */
                                    <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">

                                        {error && <div className="auth-alert-error">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
                                        {statusMsg && <div className="auth-alert-success">{statusMsg}</div>}

                                        <div className="flex flex-col gap-2 mt-1">
                                            <label htmlFor="otp-input" className="text-center font-['Quicksand'] text-xs font-bold tracking-[0.2em] uppercase !text-[#334a89]">
                                                Verification Token
                                            </label>
                                            <input
                                                id="otp-input"
                                                type="text"
                                                maxLength={6}
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                                placeholder="000000"
                                                className="auth-field-input !text-center !text-3xl !tracking-[0.4em] !font-extrabold !h-16"
                                                required
                                                autoFocus
                                            />
                                        </div>

                                        <button type="submit" className="auth-master-button mt-2" disabled={loading || otpCode.length < 6}>
                                            {loading ? <span className="auth-loading-spinner" /> : 'Confirm Code'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => animateStepChange('credentials')}
                                            className="!bg-transparent !border-none font-['Quicksand'] !text-xs font-semibold !text-[#5C5C61] hover:!text-[#334a89] !cursor-pointer text-center underline"
                                        >
                                            ← Modify Email Address
                                        </button>
                                    </form>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* =========================================================
              RIGHT SHEET: KINETIC ARCHITECTURAL COVER
          ========================================================= */}
                    <div className="gsap-video-panel auth-right-sheet">
                        <video
                            src="https://alpha.edu.pk/img/hero.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15283D] via-[#15283D]/40 to-transparent pointer-events-none" />

                        <div className="gsap-auth-quote relative z-10 p-12 lg:p-16 max-w-lg mb-8">
                            <div className="w-10 h-[3px] bg-[#ffc715] mb-6" />
                            <blockquote className="font-['Cormorant_Garamond'] text-3xl md:text-4xl italic font-normal text-white !text-white leading-[1.35] m-0">
                                "Education should not simply prepare children for the next grade. It should prepare them for tomorrow."
                            </blockquote>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

const authStyles = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

/* Bulletproof Structural Reset to guarantee absolutely 0 horizontal bleed */
.auth-master-plinth {
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  overflow-x: hidden !important;
  position: relative;
  box-sizing: border-box;
}

/* =========================================================
    INTEGRATED NAVBAR RULES
========================================================= */
.auth-navbar-node {
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 50;
  padding: 0 24px;
  box-sizing: border-box;
}

.navbar-bounds {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand-group {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
}

.navbar-logo-sharp {
  width: 38px;
  height: 38px;
  border-radius: 0px !important; /* Strict geometry */
  object-fit: cover;
}

.navbar-brand-text {
  font-family: 'Quicksand', sans-serif;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.15em;
  color: #15283D;
  margin-top: 2px;
}

.navbar-links-desktop {
  display: none;
  gap: 28px;
}

@media (min-width: 768px) {
  .navbar-links-desktop { display: flex; }
}

.nav-node {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  color: #5C5C61;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-node:hover {
  color: #334a89;
}

/* =========================================================
    SPLIT PAGE ARCHITECTURE
========================================================= */
.auth-split-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  flex-grow: 1;
  width: 100%;
  position: relative;
}

@media (min-width: 1024px) {
  .auth-split-wrapper { grid-template-columns: 480px 1fr; }
}
@media (min-width: 1280px) {
  .auth-split-wrapper { grid-template-columns: 540px 1fr; }
}

.auth-left-sheet {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: #FFFFFF;
}

.auth-form-max {
  width: 100%;
  max-width: 380px;
}

.switcher-capsule {
  display: flex;
  background: #F4F7FB;
  padding: 5px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
}

.switcher-tab-link {
  flex: 1;
  padding: 11px 0;
  border: none;
  background: transparent;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13.5px;
  font-weight: 700;
  color: #6B7280;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.switcher-tab-link.is-active {
  background: #FFFFFF;
  color: #334a89;
  box-shadow: 0 4px 10px rgba(21, 40, 61, 0.06);
}

.auth-label-node {
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13px;
  font-weight: 700;
  color: #15283D !important;
}

.auth-field-input {
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 14.5px;
  font-weight: 600;
  color: #15283D !important;
  background: #FAFAFA;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fluid scale input animation upon cursor active bounds */
.auth-field-input:focus {
  border-color: #334a89;
  background: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(51, 74, 137, 0.06);
}

.auth-master-button {
  height: 52px;
  width: 100%;
  background: #334a89;
  color: #FFFFFF !important;
  border: none;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px -4px rgba(51, 74, 137, 0.3);
}

.auth-master-button:hover:not(:disabled) {
  background: #253766;
  transform: translateY(-1px);
  box-shadow: 0 12px 26px -4px rgba(51, 74, 137, 0.4);
}

.auth-master-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.auth-alert-error {
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13px;
  font-weight: 600;
  color: #B91C1C !important;
}

.auth-alert-success {
  padding: 12px 16px;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13px;
  font-weight: 600;
  color: #065F46 !important;
}

.auth-loading-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: auth-spin-loop 0.8s linear infinite;
}

@keyframes auth-spin-loop { to { transform: rotate(360deg); } }

/* ── RIGHT COLUMN: FULL BLEED ARCHITECTURAL SCREEN ── */
.auth-right-sheet {
  position: relative;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #15283D;
}

@media (min-width: 1024px) {
  .auth-right-sheet {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
}
`