import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, Briefcase } from 'lucide-react'
import type { JobOpening } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// =========================================================
// CUSTOM DROPDOWN
// =========================================================
function MinimalSelect({ label, value, onChange, options, placeholder }: { label: string, value: string, onChange: (val: string) => void, options: {id: string, label: string}[], placeholder: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedOption = options.find(opt => opt.id === value)

    return (
        <div className="flex flex-col gap-2 relative w-full" ref={selectRef}>
            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">{label}</label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 cursor-pointer select-none ${
                    isOpen ? 'ring-4 ring-[#334a89]/15 bg-white' : 'hover:bg-[#EDF0F3]'
                }`}
            >
                <span className={`font-['Quicksand'] font-bold text-[15px] block truncate pr-8 ${value ? 'text-[#334a89]' : 'text-[#15283D]/40'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334a89] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] z-[999] bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0_24px_48px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="max-h-[260px] overflow-y-auto py-2 custom-scrollbar">
                    {options.length === 0 && (
                        <div className="px-6 py-3.5 font-['Quicksand'] text-[15px] text-[#15283D]/50 italic">
                            No open positions at this time.
                        </div>
                    )}
                    {options.map((opt) => (
                        <div
                            key={opt.id}
                            onClick={() => { onChange(opt.id); setIsOpen(false); }}
                            className={`px-6 py-3.5 font-['Quicksand'] text-[15px] cursor-pointer transition-colors hover:bg-[#334a89]/5 hover:text-[#334a89] ${
                                value === opt.id ? 'bg-[#334a89]/10 text-[#334a89] font-bold' : 'font-medium text-[#15283D]/80'
                            }`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function CountryCodeSelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    const codes = [
        { code: "+92", label: "PK (+92)" }, { code: "+1", label: "US/CA (+1)" },
        { code: "+44", label: "UK (+44)" }, { code: "+971", label: "UAE (+971)" },
        { code: "+966", label: "SA (+966)" }, { code: "+61", label: "AU (+61)" }
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
export default function JobOpenings() {
    const { user, loading: authLoading } = useAuth()
    // navigate removed
    const containerRef = useRef<HTMLDivElement>(null)
    const formTopRef = useRef<HTMLDivElement>(null)

    const [jobs, setJobs] = useState<JobOpening[]>([])
    const [loadingJobs, setLoadingJobs] = useState(true)

    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country_code: '+92',
        phone: '',
        job_id: '',
        resume_link: '',
        cover_letter: ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || ''
            }))
        }
    }, [user])

    useEffect(() => {
        const fetchJobs = async () => {
            const { data, error } = await supabase
                .from('job_openings')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
            
            if (!error && data) {
                setJobs(data as JobOpening[])
            }
            setLoadingJobs(false)
        }
        fetchJobs()
    }, [])

    useEffect(() => {
        if (authLoading || loadingJobs) return;
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
    }, [authLoading, loadingJobs])

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

        if (!formData.job_id) return setStatus({ type: 'error', msg: 'Please select a position to apply for.' })
        if (!formData.resume_link) return setStatus({ type: 'error', msg: 'Please provide a link to your resume or LinkedIn profile.' })

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const fullPhone = `${formData.country_code} ${formData.phone}`

        const { error } = await supabase.from('job_applications').insert([
            {
                job_id: formData.job_id === 'general' ? null : formData.job_id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: fullPhone,
                resume_link: formData.resume_link,
                cover_letter: formData.cover_letter,
                status: 'New'
            }
        ])

        setSubmitting(false)

        if (error) {
            setStatus({ type: 'error', msg: error.message || 'Something went wrong.' })
        } else {
            if (formTopRef.current) {
                const yOffset = formTopRef.current.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: yOffset, behavior: 'smooth' });
            }
            setStatus({ type: 'success', msg: 'Application submitted successfully! Our hiring team will review it shortly.' })
            setFormData({ 
                first_name: user?.user_metadata?.full_name?.split(' ')[0] || '', 
                last_name: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '', 
                email: user?.email || '', 
                country_code: '+92', phone: '', job_id: '', resume_link: '', cover_letter: '' 
            })
        }
    }

    const jobOptions = [
        ...jobs.map(j => ({ id: j.id, label: `${j.title} (${j.location})` })),
        { id: 'general', label: 'General Application' }
    ]

    if (authLoading || loadingJobs) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
            <Loader2 className="w-8 h-8 text-[#334a89] animate-spin" />
        </div>
    )

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8F9FA] pt-24 pb-24 border-t border-[#E5E7EB] select-none selection:bg-[#334a89]/20 selection:text-[#334a89]">

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
            `}</style>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                {/* =========================================================
                    LEFT COLUMN: JOB BOARD
                ========================================================= */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col z-10 pt-8">
                    <div className="media-element flex items-center gap-3 mb-6">
                        <span className="w-8 h-[2px] bg-[#334a89]" />
                        <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.2em] text-[#334a89] uppercase">
                            CAREERS AT ASTER
                        </span>
                    </div>

                    <h1 className="media-element font-['Quicksand'] text-5xl md:text-[56px] text-[#15283D] font-bold leading-[1.1] tracking-tight mb-8">
                        Join our <span className="text-[#334a89]">mission.</span>
                    </h1>

                    <p className="media-element font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium leading-[1.7] mb-8 max-w-md">
                        We are always looking for passionate educators, leaders, and professionals to join our growing community across all campuses.
                    </p>

                    <div className="media-element w-full max-h-[60vh] overflow-y-auto custom-scrollbar pr-4 flex flex-col gap-4">
                        {jobs.length === 0 ? (
                            <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] text-center">
                                <Briefcase className="w-10 h-10 text-[#334a89]/30 mx-auto mb-4" />
                                <h3 className="font-['Quicksand'] text-lg font-bold text-[#15283D] mb-2">No Open Roles</h3>
                                <p className="font-['Quicksand'] text-[15px] text-[#5C5C61] font-medium">
                                    We don't have any specific openings at the moment, but you can still submit a general application using the form!
                                </p>
                            </div>
                        ) : (
                            jobs.map(job => (
                                <div key={job.id} onClick={() => {
                                    setFormData({...formData, job_id: job.id});
                                    if(formTopRef.current) formTopRef.current.scrollIntoView({behavior: 'smooth'});
                                }} className={`bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-lg ${formData.job_id === job.id ? 'border-[#334a89] shadow-[0_10px_30px_rgba(51,74,137,0.15)] scale-[1.02]' : 'border-[#E5E7EB] hover:border-[#334a89]/30'}`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-['Quicksand'] text-xl font-bold text-[#15283D]">{job.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-[#F4F6F8] text-[#334a89] font-['Quicksand'] font-bold text-[11px] px-3 py-1.5 rounded-full tracking-wider uppercase">{job.department}</span>
                                        <span className="bg-[#F4F6F8] text-[#334a89] font-['Quicksand'] font-bold text-[11px] px-3 py-1.5 rounded-full tracking-wider uppercase">{job.type}</span>
                                        <span className="bg-[#F4F6F8] text-[#334a89] font-['Quicksand'] font-bold text-[11px] px-3 py-1.5 rounded-full tracking-wider uppercase">{job.location}</span>
                                    </div>
                                    <p className="font-['Quicksand'] text-[#5C5C61] text-[14px] font-medium leading-relaxed line-clamp-2">
                                        {job.description}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: MINIMALIST SAAS FORM
                ========================================================= */}
                <div className="lg:col-span-7 w-full z-20 pt-8 lg:pt-0" ref={formTopRef}>
                    <div className="bg-white rounded-[48px] p-10 md:p-14 shadow-[0_20px_60px_rgba(21,40,61,0.04)] min-h-[700px] flex flex-col justify-center">

                        {status.type === 'success' ? (
                            <div className="success-state flex flex-col items-center justify-center text-center py-10 w-full h-full">
                                <div className="w-28 h-28 bg-[#334a89]/5 rounded-full flex items-center justify-center mb-8 relative">
                                    <div className="absolute inset-0 bg-[#334a89]/10 rounded-full animate-ping opacity-50" />
                                    <CheckCircle2 className="w-14 h-14 text-[#334a89]" strokeWidth={2.5} />
                                </div>
                                <h2 className="font-['Quicksand'] text-[34px] font-bold text-[#15283D] mb-4">
                                    Application Submitted!
                                </h2>
                                <p className="font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium max-w-md mx-auto leading-relaxed mb-10">
                                    {status.msg}
                                </p>
                                <button
                                    onClick={() => setStatus({type: 'idle', msg: ''})}
                                    className="bg-[#F4F6F8] hover:bg-[#E5E7EB] text-[#15283D] px-10 py-4 rounded-full font-['Quicksand'] font-bold text-[13px] tracking-[0.15em] uppercase transition-colors"
                                >
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="form-stagger mb-12 border-b border-[#F4F6F8] pb-8">
                                    <h2 className="font-['Quicksand'] text-3xl md:text-[34px] text-[#15283D] font-bold tracking-tight mb-4">
                                        Submit Your Profile
                                    </h2>
                                    <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[16px]">
                                        Tell us about yourself and provide a link to your resume or portfolio.
                                    </p>
                                    {!user && (
                                        <p className="font-['Quicksand'] text-[#334a89] font-bold text-[13px] mt-4 bg-[#334a89]/5 inline-block px-4 py-2 rounded-lg">
                                            Tip: Log in to auto-fill your details.
                                        </p>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-10 flex flex-col">

                                    {status.type === 'error' && (
                                        <div className="form-stagger p-5 rounded-2xl flex items-start gap-4 border bg-red-50/50 border-red-100 text-red-700">
                                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                            <p className="font-['Quicksand'] font-bold text-[14px] leading-relaxed">
                                                {status.msg}
                                            </p>
                                        </div>
                                    )}

                                    {/* --- SECTION 1: PERSONAL DETAILS --- */}
                                    <div className="relative z-[50]">
                                        <div className="form-stagger grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">First Name *</label>
                                                <input required type="text" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} placeholder="Jane" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Last Name *</label>
                                                <input required type="text" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} placeholder="Doe" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Email Address *</label>
                                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!!user} placeholder="jane@example.com" className={`w-full px-5 py-4 rounded-[20px] font-['Quicksand'] font-bold text-[15px] transition-all duration-300 ${user ? 'bg-gray-50 text-[#15283D]/40 cursor-not-allowed border border-gray-100' : 'bg-[#F4F6F8] text-[#15283D] focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 placeholder-[#15283D]/30'}`} />
                                            </div>

                                            <div className="flex flex-col gap-2 md:col-span-1">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Phone Number *</label>
                                                <div className="flex gap-3">
                                                    <CountryCodeSelect value={formData.country_code} onChange={(val) => setFormData({...formData, country_code: val})} />
                                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="300 1234567" className="flex-1 min-w-0 px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- SECTION 2: APPLICATION DETAILS --- */}
                                    <div className="relative z-[40]">
                                        <div className="form-stagger grid grid-cols-1 gap-x-6 gap-y-8">

                                            <div className="relative z-[100]">
                                                <MinimalSelect
                                                    label="Position Applying For *"
                                                    value={formData.job_id}
                                                    onChange={(val) => setFormData({...formData, job_id: val})}
                                                    options={jobOptions}
                                                    placeholder="Select a role"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 relative z-30">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Resume / LinkedIn Profile URL *</label>
                                                <input required type="url" value={formData.resume_link} onChange={e => setFormData({...formData, resume_link: e.target.value})} placeholder="https://linkedin.com/in/yourprofile or Google Drive link" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                            </div>

                                            <div className="flex flex-col gap-2 relative z-20">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Cover Letter (Optional)</label>
                                                <textarea rows={4} value={formData.cover_letter} onChange={e => setFormData({...formData, cover_letter: e.target.value})} placeholder="Tell us why you'd be a great fit for Aster..." className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30 resize-none custom-scrollbar" />
                                            </div>

                                        </div>
                                    </div>

                                    {/* --- SUBMIT BUTTON --- */}
                                    <div className="form-stagger relative z-0 pt-6">
                                        <button
                                            disabled={submitting}
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-3 bg-[#334a89] text-white px-8 py-5 rounded-[24px] font-['Quicksand'] font-bold text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_20px_40px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting...
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
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
