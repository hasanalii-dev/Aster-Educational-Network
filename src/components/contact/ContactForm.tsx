import { useState, useEffect, useRef } from 'react'
import { Info, CheckCircle2, ChevronDown, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

// =========================================================
// CUSTOM DROPDOWN COMPONENT
// =========================================================
function CustomSelect({
    label,
    value,
    onChange,
    options,
    placeholder
}: {
    label: string,
    value: string,
    onChange: (val: string) => void,
    options: { label: string, value: string }[],
    placeholder: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedLabel = options.find(o => o.value === value)?.label || ''

    return (
        <div className="flex flex-col gap-2 relative" ref={selectRef}>
            <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-5 py-4 bg-transparent rounded-xl border transition-all cursor-pointer select-none ${
                    isOpen ? 'border-[#ffc715] ring-1 ring-[#ffc715]' : 'border-white/20 hover:border-white/40'
                }`}
            >
                <span className={`font-['Quicksand'] text-white block truncate ${value ? '' : 'text-white/40'}`}>
                    {selectedLabel || placeholder}
                </span>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-[#15283D] border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="max-h-[240px] overflow-y-auto py-2">
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onChange(opt.value)
                                setIsOpen(false)
                            }}
                            className={`px-5 py-3 font-['Quicksand'] font-medium text-[15px] cursor-pointer transition-colors hover:bg-white/5 hover:text-white ${
                                value === opt.value ? 'bg-[#ffc715]/10 text-[#ffc715] font-bold' : 'text-white/70'
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

export function ContactForm() {
    const sectionRef = useRef<HTMLElement>(null)
    const { user } = useAuth()
    
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        parent_name: '',
        child_name: '',
        email: '',
        phone: '',
        child_age_grade: '',
        campus: '',
        message: ''
    })

    const campusOptions = [
        { label: "PECHS Junior Campus", value: "pechs-junior" },
        { label: "PECHS Senior Campus", value: "pechs-senior" },
        { label: "Clifton Campus", value: "clifton" },
        { label: "Riyadh Campus", value: "riyadh" },
        { label: "Undecided", value: "undecided" }
    ]

    // Pre-fill user data
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                parent_name: user.user_metadata?.full_name || ''
            }))
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const { error } = await supabase.from('inquiries').insert([
            {
                user_id: user ? user.id : null,
                parent_name: formData.parent_name,
                child_name: formData.child_name,
                email: formData.email,
                phone: formData.phone,
                child_age_grade: formData.child_age_grade,
                campus: formData.campus,
                message: formData.message,
                status: 'pending'
            }
        ])

        setSubmitting(false)

        if (error) {
            setStatus({ type: 'error', msg: error.message || 'Something went wrong. Please try again later.' })
        } else {
            setStatus({ type: 'success', msg: 'Your message has been sent successfully! Our team will get back to you shortly.' })
            setFormData({
                parent_name: user?.user_metadata?.full_name || '',
                child_name: '',
                email: user?.email || '',
                phone: '',
                child_age_grade: '',
                campus: '',
                message: ''
            })
            
            // Auto-hide success message after 6 seconds
            setTimeout(() => {
                setStatus({ type: 'idle', msg: '' })
            }, 6000)
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const fadeElements = gsap.utils.toArray<HTMLElement>('.gsap-fade-up')
            fadeElements.forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        ease: 'power3.out', 
                        scrollTrigger: { trigger: el, start: 'top 85%' } 
                    }
                )
            })

            gsap.fromTo('.form-container',
                { opacity: 0, x: 40 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1.2, 
                    ease: 'power3.out', 
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const admissionsTopics = [
        "Admissions requirements",
        "Campus visits",
        "Program information",
        "Grade placement",
        "Application procedures",
        "Waitlist enquiries"
    ]

    return (
        <section ref={sectionRef} className="form-section relative bg-[#334a89] pt-24 pb-32 md:pt-36 md:pb-48 px-6 md:px-12 z-10 border-t border-white/10">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
                
                {/* Left Column: Gradient Card (Admissions Info) */}
                <div className="lg:col-span-5 flex flex-col p-8 md:p-10 relative z-10 bg-gradient-to-b from-[#ffc715] via-[#ffe373] to-[#fff8d6] rounded-2xl shadow-xl overflow-hidden h-full">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#15283D]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex-1 flex flex-col">
                        <div className="gsap-fade-up flex items-center gap-3 mb-6">
                            <Info className="w-5 h-5 text-[#334a89] shrink-0" strokeWidth={2.5} />
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.2em] text-[#334a89] uppercase mt-0.5">
                                GET IN TOUCH
                            </span>
                        </div>
                        <h2 className="gsap-fade-up font-['Quicksand'] text-4xl md:text-[44px] font-bold text-[#334a89] leading-[1.1] mb-8 tracking-tight">
                            Find the <span className="text-white">Right Fit.</span>
                        </h2>
                        
                        <p className="gsap-fade-up font-['Quicksand'] text-[#334a89]/90 text-[17px] font-medium leading-[1.65] mb-8">
                            Our Admissions Team is available to guide you through:
                        </p>
                        <ul className="gsap-fade-up space-y-4 mb-auto">
                            {admissionsTopics.map((topic, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-[#334a89]/80 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="font-['Quicksand'] font-bold text-[17px] text-[#334a89] leading-[1.4]">
                                        {topic}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="gsap-fade-up mt-12 pt-8 border-t border-[#334a89]/10">
                            <h3 className="font-['Quicksand'] font-bold text-[17px] mb-4 tracking-wide text-[#334a89]">Social media</h3>
                            <div className="flex gap-4">
                                <a href="#" className="text-[#334a89] hover:text-[#334a89]/70 transition-all transform hover:scale-105">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="#" className="text-[#334a89] hover:text-[#334a89]/70 transition-all transform hover:scale-105">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="#" className="text-[#334a89] hover:text-[#334a89]/70 transition-all transform hover:scale-105">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Transparent Form */}
                <div className="lg:col-span-7 w-full relative z-20 mt-12 lg:mt-0 pl-0 lg:pl-12 flex flex-col justify-center form-container">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Status Messages */}
                        <AnimatePresence>
                            {status.msg && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-4 md:p-5 rounded-2xl flex items-start gap-3 border ${
                                        status.type === 'error'
                                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                            : 'bg-green-500/10 text-green-400 border-green-500/20'
                                    }`}>
                                    {status.type === 'error' ? (
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    ) : (
                                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                    )}
                                    <p className="font-['Quicksand'] font-bold text-sm md:text-base leading-relaxed">
                                        {status.msg}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Parent Name *</label>
                                <input value={formData.parent_name} onChange={e => setFormData({...formData, parent_name: e.target.value})} type="text" className="bg-transparent border border-white/20 rounded-xl px-5 py-4 font-['Quicksand'] text-white focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] transition-all placeholder-white/40" placeholder="Enter your name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Child's Name</label>
                                <input value={formData.child_name} onChange={e => setFormData({...formData, child_name: e.target.value})} type="text" className="bg-transparent border border-white/20 rounded-xl px-5 py-4 font-['Quicksand'] text-white focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] transition-all placeholder-white/40" placeholder="Enter child's name" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Email Address *</label>
                                <input disabled={!!user} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className={`rounded-xl px-5 py-4 font-['Quicksand'] transition-all focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] ${user ? 'bg-black/10 border border-white/10 text-white/60 cursor-not-allowed' : 'bg-transparent border border-white/20 text-white placeholder-white/40'}`} placeholder="Enter your email" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Phone Number *</label>
                                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="bg-transparent border border-white/20 rounded-xl px-5 py-4 font-['Quicksand'] text-white focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] transition-all placeholder-white/40" placeholder="Enter your phone number" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-40">
                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Child's Age / Grade</label>
                                <input value={formData.child_age_grade} onChange={e => setFormData({...formData, child_age_grade: e.target.value})} type="text" className="bg-transparent border border-white/20 rounded-xl px-5 py-4 font-['Quicksand'] text-white focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] transition-all placeholder-white/40" placeholder="e.g. 5 years old / Grade 1" />
                            </div>
                            <div className="relative z-50">
                                <CustomSelect
                                    label="Campus of Interest"
                                    value={formData.campus}
                                    onChange={(val) => setFormData({...formData, campus: val})}
                                    options={campusOptions}
                                    placeholder="Select a campus"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 relative z-30">
                            <label className="font-['Quicksand'] font-bold text-sm text-white/80 uppercase tracking-wider">Message *</label>
                            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="bg-transparent border border-white/20 rounded-xl px-5 py-4 font-['Quicksand'] text-white focus:outline-none focus:border-[#ffc715] focus:ring-1 focus:ring-[#ffc715] transition-all resize-none placeholder-white/40" placeholder="How can we help you?" required></textarea>
                        </div>
                        <button disabled={submitting} type="submit" className="relative z-20 w-fit group flex items-center justify-center gap-3 bg-[#ffc715] text-[#15283D] px-10 py-3 rounded-full font-['Quicksand'] font-bold text-base tracking-[0.1em] transition-all duration-300 hover:-translate-y-1 hover:brightness-105 shadow-[0_10px_25px_rgba(255,199,21,0.2)] hover:shadow-[0_15px_35px_rgba(255,199,21,0.4)] mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>
                                        Sending...
                                    </span>
                                </>
                            ) : (
                                <span>
                                    Send Message
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
