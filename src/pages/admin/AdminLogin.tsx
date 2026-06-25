import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        navigate('/admin')
    }

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault()
        // Here we could implement forgot password logic
        alert("Password reset instructions will be sent to your email if it exists in our system.");
    }

    return (
        <>
            <style>{loginStyles}</style>
            <div className="admin-login-container">
                <div className="admin-login-left">
                    <div className="admin-login-form-wrapper">
                        <div className="admin-login-brand">
                            <img src="/logo.jpg" alt="Aster School" className="admin-login-logo" />
                            <h1 className="admin-login-title">Welcome Back</h1>
                            <p className="admin-login-subtitle">Sign in to Aster CMS to manage your content.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="admin-login-form">
                            {error && (
                                <div className="admin-login-error">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="admin-login-field group">
                                <label htmlFor="admin-email">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@asterschool.pk"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="admin-login-field group">
                                <div className="password-header">
                                    <label htmlFor="admin-password">Password</label>
                                    <button type="button" onClick={handleForgotPassword} className="forgot-password-link">
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input
                                        id="admin-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="admin-login-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="admin-login-spinner" />
                                ) : (
                                    'Sign In to Dashboard'
                                )}
                            </button>
                        </form>

                        <p className="admin-login-footer">
                            &copy; {new Date().getFullYear()} Aster School. Protected area.
                        </p>
                    </div>
                </div>
                <div className="admin-login-right">
                    <div className="admin-login-image-overlay"></div>
                    <img src="/admin-login-bg.png" alt="Aster Architecture" className="admin-login-bg-img" />
                    <div className="admin-login-quote-container">
                        <div className="admin-login-quote">
                            "Empowering education through seamless digital experiences."
                        </div>
                        <div className="admin-login-quote-author">— Aster CMS Team</div>
                    </div>
                </div>
            </div>
        </>
    )
}

const loginStyles = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.admin-login-container {
  min-height: 100vh;
  display: flex;
  font-family: 'Quicksand', sans-serif;
  background: #ffffff;
}

.admin-login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  background: #ffffff;
  z-index: 10;
}

.admin-login-form-wrapper {
  width: 100%;
  max-width: 440px;
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.admin-login-brand {
  margin-bottom: 48px;
}

.admin-login-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.admin-login-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.admin-login-subtitle {
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
  font-weight: 400;
}

.admin-login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-login-error {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 12px;
  color: #B91C1C;
  font-size: 14px;
  font-weight: 500;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.admin-login-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.admin-login-field label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #394da1;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.forgot-password-link:hover {
  color: #2e4091;
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

.admin-login-field:focus-within .input-icon {
  color: #394da1;
}

.admin-login-field input {
  width: 100%;
  height: 56px;
  padding: 0 16px 0 48px;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
  color: #1F2937;
  background: #F9FAFB;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.admin-login-field input:focus {
  border-color: #394da1;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(57, 77, 161, 0.1);
}

.admin-login-field input::placeholder {
  color: #9CA3AF;
}

.admin-login-btn {
  height: 56px;
  background: linear-gradient(135deg, #394da1 0%, #2e4091 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  box-shadow: 0 10px 25px -5px rgba(57, 77, 161, 0.4);
}

.admin-login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(57, 77, 161, 0.5);
}

.admin-login-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 5px 15px -5px rgba(57, 77, 161, 0.4);
}

.admin-login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.admin-login-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: admin-spin 0.8s linear infinite;
}

@keyframes admin-spin {
  to { transform: rotate(360deg); }
}

.admin-login-footer {
  text-align: center;
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 48px;
}

.admin-login-right {
  flex: 1.2;
  position: relative;
  overflow: hidden;
  display: none;
}

@media (min-width: 1024px) {
  .admin-login-right {
    display: block;
  }
}

.admin-login-bg-img {
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

.admin-login-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(28, 31, 55, 0.4) 0%, rgba(57, 77, 161, 0.2) 100%);
  z-index: 1;
}

.admin-login-quote-container {
  position: absolute;
  bottom: 60px;
  left: 60px;
  right: 60px;
  z-index: 2;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 32px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateY(30px);
  opacity: 0;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.admin-login-quote {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 16px;
  font-style: italic;
  letter-spacing: -0.01em;
}

.admin-login-quote-author {
  font-size: 15px;
  font-weight: 600;
  opacity: 0.9;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
`

