import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, Lock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// =========================================================
// CUSTOM DROPDOWN: GRADE SELECTOR
// =========================================================
function GradeSelect({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="flex flex-col gap-2 relative w-full" ref={selectRef}>
            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Grade Applying For *</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 cursor-pointer select-none ${
                    isOpen ? 'ring-4 ring-[#334a89]/15 bg-white' : 'hover:bg-[#EDF0F3]'
                }`}
            >
                <span className={`font-['Quicksand'] font-bold text-[15px] block truncate ${value ? 'text-[#334a89]' : 'text-[#15283D]/40'}`}>
                    {value || "Select grade"}
                </span>
                <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334a89] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] z-[999] bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0_24px_48px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="max-h-[280px] overflow-y-auto py-2 custom-scrollbar">
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`px-6 py-3.5 font-['Quicksand'] text-[15px] cursor-pointer transition-colors hover:bg-[#334a89]/5 hover:text-[#334a89] ${
                                value === opt ? 'bg-[#334a89]/10 text-[#334a89] font-bold' : 'font-medium text-[#15283D]/80'
                            }`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// CUSTOM DROPDOWN: COUNTRY CODE
// =========================================================
function CountryCodeSelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const codes = [
        { code: "+92", label: "PK (+92)" },
        { code: "+1", label: "US/CA (+1)" },
        { code: "+44", label: "UK (+44)" },
        { code: "+971", label: "UAE (+971)" },
        { code: "+966", label: "SA (+966)" },
        { code: "+61", label: "AU (+61)" }
    ]

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative w-[110px]" ref={selectRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-4 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 cursor-pointer select-none flex items-center justify-between ${
                    isOpen ? 'ring-4 ring-[#334a89]/15 bg-white' : 'hover:bg-[#EDF0F3]'
                }`}
            >
                <span className="font-['Quicksand'] font-bold text-[15px] text-[#334a89]">{value}</span>
                <ChevronDown className={`w-4 h-4 text-[#334a89] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute left-0 w-[160px] top-[calc(100%+8px)] z-[999] bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0_24px_48px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="max-h-[220px] overflow-y-auto py-2 custom-scrollbar">
                    {codes.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => { onChange(item.code); setIsOpen(false); }}
                            className={`px-5 py-3 font-['Quicksand'] text-[14px] cursor-pointer transition-colors hover:bg-[#334a89]/5 hover:text-[#334a89] ${
                                value === item.code ? 'bg-[#334a89]/10 text-[#334a89] font-bold' : 'font-medium text-[#15283D]/80'
                            }`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// MAIN PAGE COMPONENT
// =========================================================
export default function Apply() {
    const { user, loading: authLoading } = useAuth()
    const navigate = useNavigate()
    const containerRef = useRef<HTMLDivElement>(null)
    const formTopRef = useRef<HTMLDivElement>(null) // Used for auto-scrolling on success

    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        parent_name: '',
        parent_email: '',
        country_code: '+92',
        parent_phone: '',
        child_full_name: '',
        child_dob: '',
        grade_applying_for: '',
        current_school: ''
    })

    const gradeOptions = [
        "Preschool (Early Years)", "Kindergarten", "Grade 1", "Grade 2",
        "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "O Levels"
    ]

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                parent_email: user.email || '',
                parent_name: user.user_metadata?.full_name || ''
            }))
        }
    }, [user])

    // Cinematic GSAP Entrance
    useEffect(() => {
        if (authLoading) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.media-element',
                { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }
            )
            gsap.fromTo('.form-stagger',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out', delay: 0.2 }
            )
        }, containerRef)
        return () => ctx.revert()
    }, [authLoading])

    // Success State Animation
    useEffect(() => {
        if (status.type === 'success') {
            gsap.fromTo('.success-state',
                { opacity: 0, scale: 0.9, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
            )
        }
    }, [status.type])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) return setStatus({ type: 'error', msg: 'You must be signed in to submit an application.' })
        if (!formData.grade_applying_for) return setStatus({ type: 'error', msg: 'Please select the grade you are applying for.' })

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const fullPhone = `${formData.country_code} ${formData.parent_phone}`

        const { error } = await supabase.from('admissions').insert([
            {
                user_id: user.id,
                parent_name: formData.parent_name,
                parent_email: formData.parent_email,
                parent_phone: fullPhone,
                child_full_name: formData.child_full_name,
                child_dob: formData.child_dob,
                grade_applying_for: formData.grade_applying_for,
                current_school: formData.current_school,
                status: 'submitted'
            }
        ])

        setSubmitting(false)

        if (error) {
            setStatus({ type: 'error', msg: error.message || 'Something went wrong.' })
        } else {
            // Smoothly scroll to the top of the form area so the success message isn't cut off
            if (formTopRef.current) {
                const yOffset = formTopRef.current.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: yOffset, behavior: 'smooth' });
            }

            setStatus({ type: 'success', msg: 'Application submitted successfully! Redirecting to your dashboard...' })

            // Wait a bit longer so they can actually read the success message
            setTimeout(() => navigate('/profile'), 3500)
        }
    }

    if (authLoading) return null

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8F9FA] pt-24 pb-24 border-t border-[#E5E7EB] select-none selection:bg-[#334a89]/20 selection:text-[#334a89]">

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
                input[type="date"]::-webkit-calendar-picker-indicator { background: transparent; bottom: 0; color: transparent; cursor: pointer; height: auto; left: 0; position: absolute; right: 0; top: 0; width: auto; }
            `}</style>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                {/* =========================================================
                    LEFT COLUMN: IMMERSIVE MEDIA
                ========================================================= */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col z-10 pt-8">
                    <div className="media-element flex items-center gap-3 mb-6">
                        <span className="w-8 h-[2px] bg-[#334a89]" />
                        <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.2em] text-[#334a89] uppercase">
                            JOIN THE COMMUNITY
                        </span>
                    </div>

                    <h1 className="media-element font-['Quicksand'] text-5xl md:text-[56px] text-[#15283D] font-bold leading-[1.1] tracking-tight mb-8">
                        Begin your child's <span className="text-[#334a89]">journey.</span>
                    </h1>

                    <p className="media-element font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium leading-[1.7] mb-12 max-w-md">
                        We are thrilled you are considering The Aster School. Submitting an application is the first formal step toward joining our vibrant learning community.
                    </p>

                    <div className="media-element relative w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(21,40,61,0.12)] bg-[#15283D]">
                        <video
                            src="https://alpha.edu.pk/img/C5%20LR.mp4"
                            autoPlay loop muted playsInline
                            className="w-full h-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15283D]/90 via-[#15283D]/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-12 left-10 right-10 pointer-events-none">
                            <h3 className="font-['Quicksand'] text-2xl text-white font-bold mb-3 drop-shadow-md">
                                Excellence in Education
                            </h3>
                            <p className="font-['Quicksand'] text-white/80 text-[15px] font-medium leading-relaxed max-w-xs">
                                Nurturing curiosity, resilience, and a lifelong love for learning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: MINIMALIST SAAS FORM
                ========================================================= */}
                <div className="lg:col-span-7 w-full z-20 pt-8 lg:pt-0" ref={formTopRef}>
                    <div className="bg-white rounded-[48px] p-10 md:p-14 shadow-[0_20px_60px_rgba(21,40,61,0.04)] min-h-[700px] flex flex-col justify-center">

                        {/* =========================================================
                            SUCCESS STATE UI (Replaces the entire form)
                        ========================================================= */}
                        {status.type === 'success' ? (
                            <div className="success-state flex flex-col items-center justify-center text-center py-10 w-full h-full">
                                <div className="w-28 h-28 bg-[#334a89]/5 rounded-full flex items-center justify-center mb-8 relative">
                                    <div className="absolute inset-0 bg-[#334a89]/10 rounded-full animate-ping opacity-50" />
                                    <CheckCircle2 className="w-14 h-14 text-[#334a89]" strokeWidth={2.5} />
                                </div>
                                <h2 className="font-['Quicksand'] text-[34px] font-bold text-[#15283D] mb-4">
                                    Application Received!
                                </h2>
                                <p className="font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium max-w-md mx-auto leading-relaxed mb-10">
                                    Thank you for applying to The Aster School. We are securing your child's application and preparing your dashboard.
                                </p>
                                <div className="flex items-center gap-3 bg-[#F4F6F8] px-6 py-4 rounded-full">
                                    <Loader2 className="w-5 h-5 text-[#334a89] animate-spin" />
                                    <span className="font-['Quicksand'] font-bold text-[#15283D] text-[14px] uppercase tracking-widest">Redirecting...</span>
                                </div>
                            </div>
                        ) : (

                            /* =========================================================
                                DEFAULT FORM UI
                            ========================================================= */
                            <>
                                <div className="form-stagger mb-12 border-b border-[#F4F6F8] pb-8">
                                    <h2 className="font-['Quicksand'] text-3xl md:text-[34px] text-[#15283D] font-bold tracking-tight mb-4">
                                        Admission Application
                                    </h2>
                                    <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[16px]">
                                        Please provide accurate details to help us process your application smoothly.
                                    </p>
                                </div>

                                {/* AUTHENTICATION GATE */}
                                {!user ? (
                                    <div className="form-stagger text-center py-16 bg-[#F4F6F8] rounded-[32px]">
                                        <div className="w-16 h-16 bg-[#334a89]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Lock className="w-7 h-7 text-[#334a89]" />
                                        </div>
                                        <h2 className="font-['Quicksand'] text-2xl font-bold text-[#15283D] mb-3">
                                            Secure Sign In Required
                                        </h2>
                                        <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[15px] mb-8 max-w-sm mx-auto leading-relaxed">
                                            To protect your family's data and save your progress, please authenticate.
                                        </p>
                                        <button
                                            onClick={() => navigate('/admin/login')}
                                            className="inline-flex items-center justify-center bg-[#334a89] text-white px-10 py-4 rounded-full font-['Quicksand'] font-bold text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_15px_30px_rgba(51,74,137,0.2)]"
                                        >
                                            Sign In / Sign Up
                                        </button>
                                    </div>
                                ) : (

                                    /* THE APPLICATION FORM */
                                    <form onSubmit={handleSubmit} className="space-y-12 flex flex-col">

                                        {/* Error Message (Only shows errors now, success replaces form) */}
                                        {status.type === 'error' && (
                                            <div className="form-stagger p-5 rounded-2xl flex items-start gap-4 border bg-red-50/50 border-red-100 text-red-700">
                                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p className="font-['Quicksand'] font-bold text-[14px] leading-relaxed">
                                                    {status.msg}
                                                </p>
                                            </div>
                                        )}

                                        {/* --- SECTION 1: PARENT DETAILS (Z-50) --- */}
                                        <div className="relative z-[50]">
                                            <div className="form-stagger grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

                                                <div className="flex flex-col gap-2">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Parent Full Name *</label>
                                                    <input required type="text" value={formData.parent_name} onChange={e => setFormData({...formData, parent_name: e.target.value})} placeholder="Jane Doe" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Email Address *</label>
                                                    <input required type="email" value={formData.parent_email} disabled className="w-full px-5 py-4 bg-gray-50 rounded-[20px] text-[#15283D]/40 font-['Quicksand'] font-bold text-[15px] cursor-not-allowed border border-gray-100" />
                                                </div>

                                                <div className="flex flex-col gap-2 md:col-span-2">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Phone Number *</label>
                                                    <div className="flex gap-3">
                                                        <CountryCodeSelect value={formData.country_code} onChange={(val) => setFormData({...formData, country_code: val})} />
                                                        <input required type="tel" value={formData.parent_phone} onChange={e => setFormData({...formData, parent_phone: e.target.value})} placeholder="300 1234567" className="flex-1 min-w-0 px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* --- SECTION 2: CHILD DETAILS (Z-40) --- */}
                                        <div className="relative z-[40]">
                                            <h3 className="form-stagger font-['Quicksand'] text-xl text-[#15283D] font-bold mb-8 flex items-center gap-4 pt-6 border-t border-[#15283D]/5">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#334a89] text-white text-sm">2</span>
                                                Child Details
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                                                <div className="form-stagger flex flex-col gap-2 md:col-span-2 relative z-40">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Child's Full Name *</label>
                                                    <input required type="text" value={formData.child_full_name} onChange={e => setFormData({...formData, child_full_name: e.target.value})} placeholder="John Doe" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                </div>

                                                {/* Date Picker */}
                                                <div className="form-stagger flex flex-col gap-2 relative z-30">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Date of Birth *</label>
                                                    <div className="relative">
                                                        <input required type="date" value={formData.child_dob} onChange={e => setFormData({...formData, child_dob: e.target.value})} className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] cursor-pointer" />
                                                    </div>
                                                </div>

                                                {/* Custom Grade Dropdown */}
                                                <div className="form-stagger relative z-[100]">
                                                    <GradeSelect value={formData.grade_applying_for} onChange={(val) => setFormData({...formData, grade_applying_for: val})} options={gradeOptions} />
                                                </div>

                                                <div className="form-stagger flex flex-col gap-2 md:col-span-2 relative z-10">
                                                    <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Current School (Optional)</label>
                                                    <input type="text" value={formData.current_school} onChange={e => setFormData({...formData, current_school: e.target.value})} placeholder="E.g. The City School" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                </div>

                                            </div>
                                        </div>

                                        {/* --- SUBMIT BUTTON (Z-0) --- */}
                                        <div className="form-stagger relative z-0 pt-6">
                                            <button
                                                disabled={submitting}
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[24px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Processing Application...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={2.5} />
                                                        Submit Application
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}