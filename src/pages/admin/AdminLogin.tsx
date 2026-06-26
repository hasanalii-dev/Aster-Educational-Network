import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function UnifiedAuth() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [statusMsg, setStatusMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleAuthSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setStatusMsg('')
        setLoading(true)

        if (isSignUp) {
            // ── SIGN UP FLOW ──
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (signUpError) {
                setError(signUpError.message)
                setLoading(false)
                return
            }

            // Check if email confirmation is required by Supabase project settings
            if (data.session === null) {
                setStatusMsg('Account created! Please check your email to verify your account before logging in.')
                setLoading(false)
                return
            }

            // Route based on requested Super Admin trapdoor
            if (email === 'hasanalijaffe@gmail.com') {
                navigate('/admin')
            } else {
                navigate('/portal')
            }
        } else {
            // ── SIGN IN FLOW ──
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signInError) {
                setError(signInError.message)
                setLoading(false)
                return
            }

            // Fetch role from profiles table to route correctly
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single()

            if (profile && (profile.role === 'admin' || profile.role === 'super_admin')) {
                navigate('/admin')
            } else {
                navigate('/portal')
            }
        }

        setLoading(false)
    }

    const handleForgotPassword = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!email) {
            setError('Please enter your email address first to reset your password.')
            return
        }
        setLoading(true)
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        setLoading(false)
        if (resetError) {
            setError(resetError.message)
        } else {
            setStatusMsg('Password reset instructions have been sent to your email.')
        }
    }

    return (
        <>
            <style>{authStyles}</style>
            <div className="auth-container select-none">

                {/* =========================================================
            LEFT COLUMN: THE AUTHENTICATION PLINTH
        ========================================================= */}
                <div className="auth-left">
                    <div className="auth-form-wrapper">

                        {/* Brand Header */}
                        <div className="auth-brand">
                            <img src="/logo.jpg" alt="Aster School" className="auth-logo" />
                            <h1 className="auth-title !text-[#111827]">
                                {isSignUp ? 'Join Aster Portal' : 'Welcome Back'}
                            </h1>
                            <p className="auth-subtitle !text-[#6B7280]">
                                {isSignUp
                                    ? 'Create an account to track your campus tours and admissions.'
                                    : 'Sign in to access your dashboard and saved forms.'
                                }
                            </p>
                        </div>

                        {/* Mode Switcher Tabs */}
                        <div className="auth-mode-switcher">
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(false); setError(''); setStatusMsg(''); }}
                                className={`switcher-btn ${!isSignUp ? 'active' : ''}`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(true); setError(''); setStatusMsg(''); }}
                                className={`switcher-btn ${isSignUp ? 'active' : ''}`}
                            >
                                Create Account
                            </button>
                        </div>

                        <form onSubmit={handleAuthSubmit} className="auth-form">

                            {/* Error Feed */}
                            {error && (
                                <div className="auth-error !text-[#B91C1C]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                                        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Success/Status Feed */}
                            {statusMsg && (
                                <div className="auth-status !text-[#065F46]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>{statusMsg}</span>
                                </div>
                            )}

                            {/* Full Name Field (Only visible on Sign Up) */}
                            {isSignUp && (
                                <div className="auth-field group">
                                    <label htmlFor="full-name">Full Name</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            id="full-name"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Syed Ali"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="auth-field group">
                                <label htmlFor="auth-email">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <input
                                        id="auth-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="parent@example.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="auth-field group">
                                <div className="password-header">
                                    <label htmlFor="auth-password">Password</label>
                                    {!isSignUp && (
                                        <button type="button" onClick={handleForgotPassword} className="forgot-password-link">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input
                                        id="auth-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="auth-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="auth-spinner" />
                                ) : (
                                    isSignUp ? 'Create Aster Account' : 'Sign In to Portal'
                                )}
                            </button>
                        </form>

                        <p className="auth-footer !text-[#9CA3AF]">
                            &copy; {new Date().getFullYear()} The Aster School. Secure Institutional Portal.
                        </p>
                    </div>
                </div>

                {/* =========================================================
            RIGHT COLUMN: ARCHITECTURAL VISUAL
        ========================================================= */}
                <div className="auth-right">
                    <div className="auth-image-overlay"></div>
                    <img src="/admin-login-bg.png" alt="Aster Architecture" className="auth-bg-img" />
                    <div className="auth-quote-container">
                        <div className="auth-quote">
                            "Education should not simply prepare children for the next grade. It should prepare them for the future."
                        </div>
                        <div className="auth-quote-author">— The Aster Philosophy</div>
                    </div>
                </div>

            </div>
        </>
    )
}

const authStyles = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.auth-container {
  min-height: 100vh;
  display: flex;
  font-family: 'Quicksand', sans-serif !important;
  background: #ffffff;
}

.auth-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  background: #ffffff;
  z-index: 10;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 440px;
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUpFade {
  to { opacity: 1; transform: translateY(0); }
}

.auth-brand {
  margin-bottom: 32px;
}

.auth-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.auth-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.auth-subtitle {
  font-size: 15px;
  margin: 8px 0 0;
  font-weight: 500;
  line-height: 1.5;
}

.auth-mode-switcher {
  display: flex;
  background: #F3F4F6;
  padding: 4px;
  border-radius: 14px;
  margin-bottom: 28px;
  border: 1px solid #E5E7EB;
}

.switcher-btn {
  flex: 1;
  padding: 10px 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #6B7280;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.switcher-btn.active {
  background: #FFFFFF;
  color: #334a89;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-error {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.auth-field label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #334a89;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: #9CA3AF;
  transition: color 0.3s ease;
}

.auth-field:focus-within .input-icon {
  color: #334a89;
}

.auth-field input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 15px;
  font-weight: 500;
  color: #1F2937;
  background: #F9FAFB;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.auth-field input:focus {
  border-color: #334a89;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(51, 74, 137, 0.1);
}

.auth-field input::placeholder {
  color: #9CA3AF;
  font-weight: 400;
}

.auth-btn {
  height: 54px;
  background: linear-gradient(135deg, #334a89 0%, #253666 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif !important;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  box-shadow: 0 10px 25px -5px rgba(51, 74, 137, 0.35);
}

.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(51, 74, 137, 0.45);
}

.auth-btn:active:not(:disabled) {
  transform: translateY(0);
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.auth-footer {
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  margin-top: 40px;
}

.auth-right {
  flex: 1.2;
  position: relative;
  overflow: hidden;
  display: none;
}

@media (min-width: 1024px) {
  .auth-right { display: block; }
}

.auth-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.auth-image-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(21, 40, 61, 0.6) 0%, rgba(51, 74, 137, 0.3) 100%);
  z-index: 1;
}

.auth-quote-container {
  position: absolute;
  bottom: 60px; left: 60px; right: 60px;
  z-index: 2;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  padding: 36px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.auth-quote {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.45;
  margin-bottom: 16px;
  font-style: italic;
}

.auth-quote-author {
  font-size: 14px;
  font-weight: 700;
  opacity: 0.9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffc715;
}
`