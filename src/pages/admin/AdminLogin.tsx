import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { supabase } from '@/lib/supabase'

export default function UnifiedAuth() {
    // Navigation & Animation Refs
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
    // INITIAL GSAP PAGE DEAL
    // =========================================================
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance for the left authentication plinth
            gsap.fromTo(
                '.gsap-auth-elem',
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    stagger: 0.07,
                    ease: 'power3.out',
                    clearProps: 'all' // Clears inline styles after landing so inputs remain clickable!
                }
            )

            // Cinematic quote slide-up on the right column
            gsap.fromTo(
                '.gsap-auth-quote',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power2.out' }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // =========================================================
    // VIEW SWITCHER ANIMATION (Credentials <-> OTP)
    // =========================================================
    const animateStepChange = (nextStep: 'credentials' | 'otp') => {
        if (!formStageRef.current) {
            setAuthStep(nextStep)
            return
        }

        gsap.to(formStageRef.current.children, {
            opacity: 0,
            x: -25,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setAuthStep(nextStep)
                // Pull the next view in from the right
                gsap.fromTo(
                    formStageRef.current!.children,
                    { opacity: 0, x: 25 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                )
            }
        })
    }

    // =========================================================
    // AUTH LOGIC HANDLERS
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
            setStatusMsg(`We sent a 6-digit verification code to ${email}`)
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
            setError('Invalid confirmation code. Please check your inbox and try again.')
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
            <div ref={containerRef} className="auth-master-grid select-none">

                {/* =========================================================
            LEFT COLUMN: THE AUTHENTICATION PLINTH
        ========================================================= */}
                <div className="auth-left-col">
                    <div className="auth-content-max">

                        {/* Brand Header */}
                        <div className="gsap-auth-elem mb-8">
                            <img src="/logo.jpg" alt="Aster School" className="auth-logo-sharp" />
                            <h1 className="font-['Quicksand'] text-3xl md:text-4xl font-extrabold tracking-tight !text-[#15283D] m-0">
                                {authStep === 'otp'
                                    ? 'Confirm Your Email'
                                    : isSignUp ? 'Save Your Aster Forms' : 'Welcome Back'
                                }
                            </h1>
                            <p className="font-['Quicksand'] text-sm md:text-base font-medium leading-relaxed !text-[#5C5C61] mt-2.5 mb-0">
                                {authStep === 'otp'
                                    ? 'Enter the confirmation code sent to your inbox to instantly activate your account.'
                                    : isSignUp
                                        ? 'Submitting a campus tour request or application doesn’t require an account—but creating one saves your submitted forms, tracks your scheduled dates, and lets you view school responses anytime.'
                                        : 'Sign in to access your saved applications and check campus tour updates.'
                                }
                            </p>
                        </div>

                        {/* Mode Switcher Tabs */}
                        {authStep === 'credentials' && (
                            <div className="gsap-auth-elem auth-switcher-bg mb-8">
                                <button
                                    type="button"
                                    onClick={() => { setIsSignUp(false); setError(''); setStatusMsg(''); }}
                                    className={`auth-tab-btn ${!isSignUp ? 'is-active' : ''}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setIsSignUp(true); setError(''); setStatusMsg(''); }}
                                    className={`auth-tab-btn ${isSignUp ? 'is-active' : ''}`}
                                >
                                    Create Account
                                </button>
                            </div>
                        )}

                        {/* Animated Form Stage */}
                        <div ref={formStageRef} className="w-full">
                            {authStep === 'credentials' ? (
                                <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-5">

                                    {error && <div className="gsap-auth-elem auth-alert-error">{error}</div>}

                                    {isSignUp && (
                                        <div className="gsap-auth-elem flex flex-col gap-1.5">
                                            <label htmlFor="full-name" className="auth-label">Parent / Guardian Name</label>
                                            <input
                                                id="full-name"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Syed Ali"
                                                className="auth-input"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="gsap-auth-elem flex flex-col gap-1.5">
                                        <label htmlFor="auth-email" className="auth-label">Email Address</label>
                                        <input
                                            id="auth-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="parent@example.com"
                                            className="auth-input"
                                            required
                                        />
                                    </div>

                                    <div className="gsap-auth-elem flex flex-col gap-1.5">
                                        <div className="flex justify-between items-baseline">
                                            <label htmlFor="auth-password" className="auth-label">Password</label>
                                        </div>
                                        <input
                                            id="auth-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="auth-input"
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <button type="submit" className="gsap-auth-elem auth-submit-btn mt-2" disabled={loading}>
                                        {loading ? <span className="auth-spinner" /> : isSignUp ? 'Verify Email →' : 'Access Dashboard'}
                                    </button>
                                </form>
                            ) : (

                                /* ── VIEW B: 6-DIGIT OTP INPUT ── */
                                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">

                                    {error && <div className="auth-alert-error">{error}</div>}
                                    {statusMsg && <div className="auth-alert-success">{statusMsg}</div>}

                                    <div className="flex flex-col gap-2 mt-2">
                                        <label htmlFor="otp-input" className="text-center font-['Quicksand'] !text-xs font-bold tracking-[0.2em] uppercase !text-[#334a89]">
                                            Confirmation Code
                                        </label>
                                        <input
                                            id="otp-input"
                                            type="text"
                                            maxLength={6}
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                            placeholder="123456"
                                            className="auth-input !text-center !text-3xl !tracking-[0.4em] !font-extrabold !h-16"
                                            required
                                            autoFocus
                                        />
                                    </div>

                                    <button type="submit" className="auth-submit-btn mt-2" disabled={loading || otpCode.length < 6}>
                                        {loading ? <span className="auth-spinner" /> : 'Confirm & Save Forms'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => animateStepChange('credentials')}
                                        className="!bg-transparent !border-none font-['Quicksand'] !text-xs font-semibold !text-[#5C5C61] hover:!text-[#334a89] !cursor-pointer text-center underline mt-1"
                                    >
                                        ← Use a different email address
                                    </button>
                                </form>
                            )}
                        </div>

                        <p className="gsap-auth-elem text-center font-['Quicksand'] !text-xs font-medium !text-[#9CA3AF] mt-12">
                            &copy; {new Date().getFullYear()} The Aster School. Institutional Form Management.
                        </p>
                    </div>
                </div>

                {/* =========================================================
            RIGHT COLUMN: FULL-BLEED HERO VIDEO BACKGROUND
            Strictly covers 100% of the section width & height.
        ========================================================= */}
                <div className="auth-right-col">

                    {/* Natively streaming Alpha Edu Hero Video */}
                    <video
                        src="https://alpha.edu.pk/img/hero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />

                    {/* Rich Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15283D] via-[#15283D]/40 to-transparent pointer-events-none" />

                    {/* Frosted Glass Institutional Quote */}
                    <div className="gsap-auth-quote relative z-10 p-10 md:p-14 max-w-xl mb-6">
                        <div className="w-10 h-[3px] bg-[#ffc715] mb-6" />
                        <blockquote className="font-['Playfair_Display'] text-3xl md:text-4xl italic font-normal text-white !text-white leading-[1.35] m-0">
                            "Education should not simply prepare children for the next grade. It should prepare them for tomorrow."
                        </blockquote>
                        <p className="font-['Quicksand'] text-xs font-bold tracking-[0.25em] uppercase text-[#ffc715] !text-[#ffc715] mt-6 mb-0">
                            — The Aster Philosophy
                        </p>
                    </div>

                </div>

            </div>
        </>
    )
}

const authStyles = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

.auth-master-grid {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  width: 100vw;
  background: #FFFFFF;
  overflow-x: hidden;
}

@media (min-width: 1024px) {
  .auth-master-grid {
    grid-template-columns: 460px 1fr;
  }
}

@media (min-width: 1280px) {
  .auth-master-grid {
    grid-template-columns: 520px 1fr;
  }
}

.auth-left-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 36px;
  background: #FFFFFF;
  z-index: 20;
}

.auth-content-max {
  width: 100%;
  max-width: 400px;
}

/* STRICTLY 0px uncurved logo */
.auth-logo-sharp {
  width: 54px;
  height: 54px;
  margin-bottom: 24px;
  border-radius: 0px !important;
  display: block;
}

.auth-switcher-bg {
  display: flex;
  background: #F4F7FB;
  padding: 5px;
  border-radius: 14px;
  border: 1px solid #E5E7EB;
}

.auth-tab-btn {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 14px;
  font-weight: 700;
  color: #6B7280;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-tab-btn.is-active {
  background: #FFFFFF;
  color: #334a89;
  box-shadow: 0 4px 12px rgba(21, 40, 61, 0.08);
}

.auth-label {
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13.5px;
  font-weight: 700;
  color: #15283D !important;
}

.auth-input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 15px;
  font-weight: 600;
  color: #15283D !important;
  background: #FAFAFA;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.auth-input:focus {
  border-color: #334a89;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(51, 74, 137, 0.1);
}

.auth-input::placeholder {
  color: #9CA3AF;
  font-weight: 400;
}

.auth-submit-btn {
  height: 54px;
  width: 100%;
  background: #334a89;
  color: #FFFFFF !important;
  border: none;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 15.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(51, 74, 137, 0.35);
}

.auth-submit-btn:hover:not(:disabled) {
  background: #263868;
  transform: translateY(-1px);
  box-shadow: 0 15px 30px -5px rgba(51, 74, 137, 0.45);
}

.auth-submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.auth-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-alert-error {
  padding: 14px 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13.5px;
  font-weight: 600;
  color: #B91C1C !important;
}

.auth-alert-success {
  padding: 14px 16px;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 13.5px;
  font-weight: 600;
  color: #065F46 !important;
}

.auth-spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: auth-spin 0.8s linear infinite;
}

@keyframes auth-spin {
  to { transform: rotate(360deg); }
}

/* ── RIGHT COLUMN: FULL BLEED COVER ── */
.auth-right-col {
  position: relative;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #15283D;
}

@media (min-width: 1024px) {
  .auth-right-col {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
}
`