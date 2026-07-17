import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/layout/Header'
import { User, Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Loader2, AlertCircle, CheckCircle2, Fingerprint, Bot, Eye, EyeOff } from 'lucide-react'

export default function UnifiedAuth() {
    const containerRef = useRef<HTMLDivElement>(null)
    const formStageRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // State Engine
    const [isSignUp, setIsSignUp] = useState(false)
    const [authStep, setAuthStep] = useState<'credentials' | 'otp' | 'forgot_password' | 'update_password'>('credentials')
    const [welcomeScreen, setWelcomeScreen] = useState<{type: 'new' | 'existing' | 'admin', name: string} | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Form Payload
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otpCode, setOtpCode] = useState('')

    // Feedback Engine
    const [error, setError] = useState('')
    const [statusMsg, setStatusMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    useEffect(() => {
        // Intercept password recovery hash
        if (window.location.hash.includes('type=recovery')) {
            setAuthStep('update_password')
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setAuthStep('update_password')
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    // =========================================================
    // INITIAL GSAP PAGE ENTRANCE
    // =========================================================
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Form Element Cascade Stagger
            gsap.fromTo(
                '.gsap-auth-elem',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.08,
                    ease: 'expo.out',
                    delay: 0.1
                }
            )

            // Full-Bleed Video Plinth Slide-In
            gsap.fromTo(
                '.gsap-video-panel',
                { opacity: 0, x: 40, scale: 0.98 },
                { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: 'expo.out' }
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

        const elements = formStageRef.current?.children

        gsap.to(elements || [], {
            opacity: 0,
            y: -15,
            duration: 0.25,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: () => {
                setIsSignUp(targetMode)
                setTimeout(() => {
                    gsap.fromTo(
                        formStageRef.current?.children || [],
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out' }
                    )
                }, 10)
            }
        })
    }

    // =========================================================
    // ANIMATED VIEW CHANGE
    // =========================================================
    const animateStepChange = (nextStep: 'credentials' | 'otp' | 'forgot_password') => {
        if (!formStageRef.current) {
            setAuthStep(nextStep)
            return
        }

        gsap.to(formStageRef.current.children, {
            opacity: 0,
            x: -30,
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: () => {
                setAuthStep(nextStep)
                setTimeout(() => {
                    gsap.fromTo(
                        formStageRef.current?.children || [],
                        { opacity: 0, x: 30 },
                        { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out' }
                    )
                }, 10)
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
            if (password !== confirmPassword) {
                setError("Passwords do not match.")
                setLoading(false)
                return
            }
            if (password.length < 6) {
                setError("Password must be at least 6 characters long.")
                setLoading(false)
                return
            }

            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: fullName } },
            })

            if (signUpError) {
                if (signUpError.message.toLowerCase().includes('already registered')) {
                    setError('An account with this email address already exists. Please sign in instead.')
                } else {
                    setError(signUpError.message)
                }
                setLoading(false)
                return
            }

            // Supabase returns an empty identities array if the user already exists and email confirmations are enabled
            if (signUpData?.user && (!signUpData.user.identities || signUpData.user.identities.length === 0)) {
                setError('An account with this email address already exists. Please sign in instead.')
                setLoading(false)
                return
            }

            animateStepChange('otp')
            setStatusMsg(`Verification code dispatched to ${email}. Please also check your spam/junk folder.`)
            setResendTimer(30)
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
            setError('Invalid verification code. Please check your inbox and try again.')
            setLoading(false)
            return
        }

        if (data.user) {
            await routeUser(data.user.id)
        }
    }

    const handleResendOtp = async () => {
        setError('')
        setStatusMsg('')
        setLoading(true)

        const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
        })

        if (resendError) {
            setError(resendError.message)
        } else {
            setStatusMsg('Verification code resent! Please check your junk/spam folder as it often lands there.')
            setResendTimer(30)
        }
        setLoading(false)
    }

    const handleForgotPasswordSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setStatusMsg('')
        setLoading(true)

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/admin/login',
        })

        if (resetError) {
            setError(resetError.message)
            setLoading(false)
            return
        }

        setStatusMsg(`Password reset link sent to ${email}.`)
        setLoading(false)
    }

    const handleUpdatePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setStatusMsg('')
        setLoading(true)

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            setLoading(false)
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.")
            setLoading(false)
            return
        }

        const { error: updateError } = await supabase.auth.updateUser({
            password: password
        })

        if (updateError) {
            setError(updateError.message)
            setLoading(false)
            return
        }

        setStatusMsg('Password successfully updated! Redirecting...')
        
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await routeUser(user.id)
        } else {
            setLoading(false)
        }
    }

    const routeUser = async (userId: string) => {
        let isAdmin = false
        let userName = fullName || email.split('@')[0]

        if (email === 'hasanalijaffe@gmail.com') {
            isAdmin = true
            userName = 'Admin'
        } else {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role, full_name')
                .eq('id', userId)
                .single()

            if (profile) {
                if (profile.role === 'admin' || profile.role === 'super_admin') {
                    isAdmin = true
                }
                if (profile.full_name) userName = profile.full_name
            }
        }

        const type = isAdmin ? 'admin' : isSignUp ? 'new' : 'existing'
        setWelcomeScreen({ type, name: userName })

        setTimeout(() => {
            if (isAdmin) {
                navigate('/admin')
            } else {
                navigate('/profile')
            }
        }, 3200)
    }

    useEffect(() => {
        if (welcomeScreen) {
            // IN Animation
            gsap.fromTo('.gsap-welcome-chat', 
                { opacity: 0, y: 30, scale: 0.9, transformOrigin: "bottom right" }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)' }
            )
            
            // OUT Animation
            gsap.to('.gsap-welcome-chat', { opacity: 0, scale: 0.95, y: 20, duration: 0.4, delay: 2.7, ease: 'power2.in' })
        }
    }, [welcomeScreen])

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-white flex flex-col font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] overflow-x-hidden">
            <Header />

            {/* Master Split Layout */}
            <div className="flex-1 flex w-full pt-[80px]">

                {/* =========================================================
                    LEFT SHEET: THE MINIMALIST FORM PLINTH
                ========================================================= */}
                <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative z-10">
                    <div className="w-full max-w-[420px] mx-auto lg:mx-0">

                        {/* Dynamic Header Block */}
                        <div className="gsap-auth-elem mb-10 text-center lg:text-left">

                            {/* Un-curved Logo as strictly requested */}
                            {authStep === 'credentials' ? (
                                <img src="/logo.jpg" alt="Aster School" className="w-[50px] h-[50px] object-contain rounded-none mb-8 mx-auto lg:mx-0" />
                            ) : (
                                <div className="w-[50px] h-[50px] bg-[#334a89]/5 rounded-none flex items-center justify-center mb-8 mx-auto lg:mx-0 border border-[#334a89]/10">
                                    <ShieldCheck className="w-6 h-6 text-[#334a89]" />
                                </div>
                            )}

                            <h1 className="font-['Quicksand'] text-3xl md:text-[34px] font-bold tracking-tight text-[#15283D] mb-3">
                                {authStep === 'otp'
                                    ? 'Confirm Email'
                                    : authStep === 'forgot_password'
                                    ? 'Reset Password'
                                    : isSignUp ? 'Create an Account' : 'Sign In'
                                }
                            </h1>
                            <p className="font-['Quicksand'] text-[15px] font-medium text-[#5C5C61] leading-relaxed">
                                {authStep === 'otp'
                                    ? 'Provide the 6-digit verification code token sent to your email address. (Check your spam/junk folder if you don\'t see it)'
                                    : authStep === 'forgot_password'
                                        ? 'Enter your email address and we will send you a link to reset your password.'
                                        : isSignUp
                                            ? 'Create an account to securely track your applications, forms, and admission updates.'
                                            : 'Sign in to access your portal, forms, and events.'
                                }
                            </p>
                        </div>

                        {/* SaaS Segmented Switcher Tabs */}
                        {authStep === 'credentials' && (
                            <div className="gsap-auth-elem flex bg-[#F4F6F8] p-1.5 rounded-[20px] mb-10 w-full max-w-[320px] mx-auto lg:mx-0 border border-[#E5E7EB]">
                                <button
                                    type="button"
                                    onClick={() => toggleAuthMode(false)}
                                    className={`flex-1 py-2.5 rounded-[16px] font-['Quicksand'] font-bold text-[13px] tracking-wide transition-all duration-300 ${!isSignUp ? 'bg-white text-[#334a89] shadow-[0_4px_12px_rgba(21,40,61,0.06)]' : 'bg-transparent text-[#5C5C61] hover:text-[#15283D]'}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleAuthMode(true)}
                                    className={`flex-1 py-2.5 rounded-[16px] font-['Quicksand'] font-bold text-[13px] tracking-wide transition-all duration-300 ${isSignUp ? 'bg-white text-[#334a89] shadow-[0_4px_12px_rgba(21,40,61,0.06)]' : 'bg-transparent text-[#5C5C61] hover:text-[#15283D]'}`}
                                >
                                    Create Account
                                </button>
                            </div>
                        )}

                        {/* Form Payload Core Stage */}
                        <div ref={formStageRef} className="w-full">
                            {authStep === 'credentials' ? (
                                <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-6">

                                    {/* Error Alert Box */}
                                    {error && (
                                        <div className="p-4 bg-red-50/80 border border-red-100 rounded-2xl flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] text-sm font-bold text-red-700 leading-relaxed">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
                                        </div>
                                    )}

                                    {isSignUp && (
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Parent / Guardian Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Syed Ali"
                                                    className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="parent@example.com"
                                                className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className={`w-full pl-14 pr-14 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300 ${!showPassword ? 'tracking-[0.2em]' : 'tracking-normal'}`}
                                                required
                                                minLength={6}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#334a89] transition-colors focus:outline-none"
                                            >
                                                <div className="relative w-5 h-5">
                                                    <div className={`absolute inset-0 transition-all duration-300 ${showPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
                                                        <EyeOff className="w-5 h-5" />
                                                    </div>
                                                    <div className={`absolute inset-0 transition-all duration-300 ${!showPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                                                        <Eye className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {isSignUp && (
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Confirm Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`w-full pl-14 pr-14 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300 ${!showConfirmPassword ? 'tracking-[0.2em]' : 'tracking-normal'}`}
                                                    required
                                                    minLength={6}
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#334a89] transition-colors focus:outline-none"
                                                >
                                                    <div className="relative w-5 h-5">
                                                        <div className={`absolute inset-0 transition-all duration-300 ${showConfirmPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
                                                            <EyeOff className="w-5 h-5" />
                                                        </div>
                                                        <div className={`absolute inset-0 transition-all duration-300 ${!showConfirmPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                                                            <Eye className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-2 flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[20px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                {isSignUp ? 'Sign Up' : 'Sign In'}
                                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </>
                                        )}
                                    </button>

                                    {!isSignUp && (
                                        <div className="text-center mt-2">
                                            <button
                                                type="button"
                                                onClick={() => animateStepChange('forgot_password')}
                                                className="font-['Quicksand'] text-[13px] font-bold text-[#5C5C61] hover:text-[#334a89] transition-colors underline underline-offset-4"
                                            >
                                                Forgot your password?
                                            </button>
                                        </div>
                                    )}
                                </form>
                            ) : authStep === 'otp' ? (

                                /* ── VIEW B: 6-DIGIT OTP VAULT ── */
                                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">

                                    {error && (
                                        <div className="p-4 bg-red-50/80 border border-red-100 rounded-2xl flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] text-sm font-bold text-red-700 leading-relaxed">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
                                        </div>
                                    )}
                                    {statusMsg && (
                                        <div className="p-4 bg-[#334a89]/5 border border-[#334a89]/20 rounded-2xl flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#334a89] shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] text-sm font-bold text-[#334a89] leading-relaxed">{statusMsg}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2 mt-2">
                                        <label className="font-['Quicksand'] text-center font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.2em] mb-2">
                                            Verification Token
                                        </label>
                                        <div className="relative group">
                                            <KeyRound className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                                placeholder="000000"
                                                className="w-full pl-16 pr-6 py-5 bg-[#F4F6F8] rounded-[24px] font-['Quicksand'] text-center text-3xl tracking-[0.5em] font-extrabold text-[#15283D] placeholder-[#A0AEC0]/30 border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || otpCode.length < 6}
                                        className="w-full mt-2 flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[24px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Confirm Code
                                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex flex-col items-center gap-3 mt-2">
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={resendTimer > 0 || loading}
                                            className="font-['Quicksand'] text-[13px] font-bold text-[#5C5C61] hover:text-[#334a89] transition-colors underline underline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[#5C5C61]"
                                        >
                                            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => animateStepChange('credentials')}
                                            className="font-['Quicksand'] text-[13px] font-bold text-[#5C5C61] hover:text-[#334a89] transition-colors underline underline-offset-4"
                                        >
                                            ← Modify Email Address
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* ── VIEW C: FORGOT PASSWORD ── */
                                <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-6">
                                    {error && (
                                        <div className="p-4 bg-red-50/80 border border-red-100 rounded-2xl flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] text-sm font-bold text-red-700 leading-relaxed">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
                                        </div>
                                    )}
                                    {statusMsg && (
                                        <div className="p-4 bg-[#334a89]/5 border border-[#334a89]/20 rounded-2xl flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#334a89] shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] text-sm font-bold text-[#334a89] leading-relaxed">{statusMsg}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="parent@example.com"
                                                className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !email}
                                        className="w-full mt-2 flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[20px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Send Reset Link
                                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </>
                                        )}
                                    </button>

                                        <button
                                            type="button"
                                            onClick={() => animateStepChange('credentials')}
                                            className="mt-4 font-['Quicksand'] text-[13px] font-bold text-[#5C5C61] hover:text-[#334a89] transition-colors text-center underline underline-offset-4"
                                        >
                                            ← Back to Sign In
                                        </button>
                                    </form>
                                )}

                                {/* =========================================================
                                    STEP 4: UPDATE PASSWORD
                                ========================================================= */}
                                {authStep === 'update_password' && (
                                    <form onSubmit={handleUpdatePasswordSubmit} className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">New Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`w-full pl-14 pr-14 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300 ${!showPassword ? 'tracking-[0.2em]' : 'tracking-normal'}`}
                                                    required
                                                    minLength={6}
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#334a89] transition-colors focus:outline-none"
                                                >
                                                    <div className="relative w-5 h-5">
                                                        <div className={`absolute inset-0 transition-all duration-300 ${showPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
                                                            <EyeOff className="w-5 h-5" />
                                                        </div>
                                                        <div className={`absolute inset-0 transition-all duration-300 ${!showPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                                                            <Eye className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Confirm New Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`w-full pl-14 pr-14 py-4 bg-[#F4F6F8] rounded-[20px] font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 outline-none transition-all duration-300 ${!showConfirmPassword ? 'tracking-[0.2em]' : 'tracking-normal'}`}
                                                    required
                                                    minLength={6}
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#334a89] transition-colors focus:outline-none"
                                                >
                                                    <div className="relative w-5 h-5">
                                                        <div className={`absolute inset-0 transition-all duration-300 ${showConfirmPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
                                                            <EyeOff className="w-5 h-5" />
                                                        </div>
                                                        <div className={`absolute inset-0 transition-all duration-300 ${!showConfirmPassword ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                                                            <Eye className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading || !password || !confirmPassword}
                                            className="w-full mt-2 flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[20px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Update Password
                                                    <CheckCircle2 className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>

                    </div>
                </div>

                {/* =========================================================
                    RIGHT SHEET: ARCHITECTURAL MEDIA COVER
                ========================================================= */}
                <div className="gsap-video-panel hidden lg:flex flex-1 relative m-6 ml-0 rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(21,40,61,0.12)] bg-[#15283D]">
                    <video
                        src="https://alpha.edu.pk/img/hero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />

                    {/* Dark gradient mapping to push focus to the quote */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15283D]/90 via-[#15283D]/20 to-transparent pointer-events-none" />

                    {/* Glassmorphic Quote Dossier (Preserving Client Content) */}
                    <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[32px] shadow-2xl">
                        <div className="w-10 h-[3px] bg-[#ffc715] mb-6" />
                        <blockquote className="font-['Cormorant_Garamond'] text-[28px] xl:text-[34px] italic font-normal text-white leading-[1.3] tracking-tight mb-8">
                            "Education should not simply prepare children for the next grade. It should prepare them for tomorrow."
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-inner">
                                <img src="/logo.jpg" alt="Aster School" className="w-full h-full object-contain rounded-full" />
                            </div>
                            <div>
                                <p className="font-['Quicksand'] font-bold text-white text-[15px]">The Aster School</p>
                                <p className="font-['Quicksand'] font-medium text-white/70 text-[13px]">Karachi, Pakistan</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* =========================================================
                CHATBOT STYLE WELCOME NOTIFICATION
            ========================================================= */}
            {welcomeScreen && (
                <div className="gsap-welcome-chat fixed bottom-6 right-6 z-[999] opacity-0 flex items-end gap-3 pointer-events-none">
                    
                    {/* Speech Bubble */}
                    <div className="bg-white rounded-2xl rounded-br-sm shadow-[0_10px_40px_rgba(21,40,61,0.12)] border border-gray-100 p-5 max-w-[320px] mb-2 relative">
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45 z-[-1]"></div>
                        
                        {welcomeScreen.type === 'new' && (
                            <>
                                <h3 className="font-['Quicksand'] text-[15px] font-bold text-[#15283D] mb-1">
                                    Welcome to Aster, <span className="text-[#ffc715]">{welcomeScreen.name}</span>!
                                </h3>
                                <p className="font-['Quicksand'] text-[13px] font-medium text-[#5C5C61] leading-snug">
                                    We are thrilled to have you here. Setting up your family profile...
                                </p>
                            </>
                        )}

                        {welcomeScreen.type === 'existing' && (
                            <>
                                <h3 className="font-['Quicksand'] text-[15px] font-bold text-[#15283D] mb-1">
                                    Welcome back, <span>{welcomeScreen.name}</span>!
                                </h3>
                                <p className="font-['Quicksand'] text-[13px] font-medium text-[#5C5C61] leading-snug">
                                    Great to see you again. Preparing your portal...
                                </p>
                            </>
                        )}

                        {welcomeScreen.type === 'admin' && (
                            <>
                                <h3 className="font-['Quicksand'] text-[15px] font-bold text-red-600 mb-1 flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4" /> System Auth Complete
                                </h3>
                                <p className="font-['Quicksand'] text-[13px] font-medium text-[#5C5C61] leading-snug">
                                    Welcome, {welcomeScreen.name}. Initializing secure admin console...
                                </p>
                            </>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            <Loader2 className={`w-4 h-4 animate-spin ${welcomeScreen.type === 'new' ? 'text-[#ffc715]' : welcomeScreen.type === 'admin' ? 'text-red-500' : 'text-[#334a89]'}`} />
                            <span className="font-['Quicksand'] text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider">Redirecting</span>
                        </div>
                    </div>

                    {/* Chatbot Avatar */}
                    <div className="w-14 h-14 bg-[#394EA2] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(57,78,162,0.4)] shrink-0 border-2 border-white">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                </div>
            )}
        </div>
    )
}