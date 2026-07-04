import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, MapPin, Navigation } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// =========================================================
// CUSTOM DROPDOWN COMPONENT
// =========================================================
function MinimalSelect({ label, value, onChange, options, placeholder }: { label: string, value: string, onChange: (val: string) => void, options: string[], placeholder: string }) {
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
            <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">{label}</label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 cursor-pointer select-none ${
                    isOpen ? 'ring-4 ring-[#334a89]/15 bg-white' : 'hover:bg-[#EDF0F3]'
                }`}
            >
                <span className={`font-['Quicksand'] font-bold text-[15px] block truncate pr-8 ${value ? 'text-[#334a89]' : 'text-[#15283D]/40'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334a89] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] z-[999] bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0_24px_48px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="max-h-[260px] overflow-y-auto py-2 custom-scrollbar">
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
// INTERACTIVE MAP COMPONENT
// =========================================================
function InteractiveMap({ selectedCampus, onSelectCampus }: { selectedCampus: string, onSelectCampus: (val: string) => void }) {

    // Abstract Topology Coordinates
    const campusData = [
        { id: "Riyadh Campus", x: 20, y: 35, region: "Saudi Arabia", address: "Opening Soon in Riyadh" },
        { id: "PECHS Junior Campus", x: 70, y: 25, region: "Karachi, PK", address: "Plot 37 C, Block-6 PECHS" },
        { id: "PECHS Senior Campus", x: 80, y: 38, region: "Karachi, PK", address: "33-D, Block 6, PECHS" },
        { id: "Clifton Campus", x: 65, y: 55, region: "Karachi, PK", address: "Plot D, 97, Block 4, Clifton" }
    ]

    const activeData = campusData.find(c => c.id === selectedCampus)

    return (
        <div className="media-element relative w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(21,40,61,0.12)] bg-[#15283D]">

            {/* High-Tech Dot Matrix Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            {/* Ambient Lighting */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#334a89] rounded-full filter blur-[100px] opacity-40 mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ffc715] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />

            {/* SVG Flight Line (Riyadh to Karachi) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                    d="M 20% 35% Q 45% 15% 70% 25%"
                    fill="none"
                    stroke="rgba(255,199,21,0.3)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-[dash_20s_linear_infinite]"
                />
            </svg>
            <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>

            {/* Render Pins */}
            {campusData.map((campus, i) => {
                const isActive = selectedCampus === campus.id;
                return (
                    <div
                        key={i}
                        onClick={() => onSelectCampus(campus.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                        style={{ left: `${campus.x}%`, top: `${campus.y}%` }}
                    >
                        {/* Hover Tooltip (Desktop Only) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max z-30 hidden md:block">
                            <span className="font-['Quicksand'] font-bold text-[13px] text-[#15283D]">{campus.id}</span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
                        </div>

                        {/* Outer Pulse Ring */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive ? 'bg-[#ffc715] animate-ping opacity-60 scale-150' : 'bg-white/20 group-hover:scale-150'}`} />

                        {/* Core Pin */}
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-300 ${isActive ? 'bg-[#ffc715] scale-110' : 'bg-white group-hover:bg-[#ffc715]'}`}>
                            <MapPin className={`w-4 h-4 ${isActive ? 'text-[#15283D]' : 'text-[#334a89]'}`} />
                        </div>
                    </div>
                )
            })}

            {/* Dynamic Info Dossier (Slides up when a campus is selected) */}
            <div className={`absolute bottom-6 left-6 right-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeData ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-6 text-white shadow-2xl">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                            <span className="font-['Quicksand'] font-bold text-[10px] tracking-[0.2em] text-[#ffc715] uppercase block mb-1">
                                {activeData?.region}
                            </span>
                            <h4 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight">
                                {activeData?.id}
                            </h4>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#ffc715] flex items-center justify-center shrink-0">
                            <Navigation className="w-5 h-5 text-[#15283D]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 font-['Quicksand'] text-[14px] text-white/80 font-medium">
                        <MapPin className="w-4 h-4" />
                        {activeData?.address}
                    </div>
                </div>
            </div>

            {/* Default State Instructions (Shows when no campus is selected) */}
            <div className={`absolute bottom-12 left-10 right-10 pointer-events-none transition-opacity duration-500 ${activeData ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="font-['Quicksand'] text-2xl text-white font-bold mb-2 drop-shadow-md">
                    Global Network
                </h3>
                <p className="font-['Quicksand'] text-white/80 text-[15px] font-medium leading-relaxed max-w-xs">
                    Select a pin on the map to explore our campuses and secure your tour slot.
                </p>
            </div>

        </div>
    )
}


// =========================================================
// MAIN PAGE COMPONENT
// =========================================================
export default function BookTour() {
    const { user, loading: authLoading } = useAuth()

    const containerRef = useRef<HTMLDivElement>(null)
    const formTopRef = useRef<HTMLDivElement>(null)

    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        parent_name: '',
        email: '',
        country_code: '+92',
        phone: '',
        campus: '',
        preferred_date: '',
        preferred_time_slot: ''
    })

    const campusOptions = [
        "PECHS Junior Campus", "PECHS Senior Campus", "Clifton Campus", "Riyadh Campus"
    ]

    const timeOptions = [
        "Morning (9:00 AM - 11:00 AM)", "Midday (11:00 AM - 1:00 PM)", "Afternoon (1:00 PM - 3:00 PM)"
    ]

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                parent_name: user.user_metadata?.full_name || ''
            }))
        }
    }, [user])

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
        if (!formData.campus || !formData.preferred_time_slot) {
            return setStatus({ type: 'error', msg: 'Please select a campus and time slot on the map or form.' })
        }

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const fullPhone = `${formData.country_code} ${formData.phone}`

        const { error } = await supabase.from('campus_tours').insert([
            {
                user_id: user ? user.id : null,
                parent_name: formData.parent_name,
                email: formData.email,
                phone: fullPhone,
                campus: formData.campus,
                preferred_date: formData.preferred_date,
                preferred_time_slot: formData.preferred_time_slot,
                status: 'pending'
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
            setStatus({ type: 'success', msg: 'Tour requested successfully!' })
            setFormData({ parent_name: user?.user_metadata?.full_name || '', email: user?.email || '', country_code: '+92', phone: '', campus: '', preferred_date: '', preferred_time_slot: '' })
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
                    LEFT COLUMN: INTERACTIVE MAP
                ========================================================= */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col z-10 pt-8">
                    <div className="media-element flex items-center gap-3 mb-6">
                        <span className="w-8 h-[2px] bg-[#334a89]" />
                        <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.2em] text-[#334a89] uppercase">
                            EXPLORE CAMPUSES
                        </span>
                    </div>

                    <h1 className="media-element font-['Quicksand'] text-5xl md:text-[56px] text-[#15283D] font-bold leading-[1.1] tracking-tight mb-8">
                        Select a <span className="text-[#334a89]">location.</span>
                    </h1>

                    <p className="media-element font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium leading-[1.7] mb-12 max-w-md">
                        Explore our global footprint. Interact with the map below to choose the campus you'd like to visit.
                    </p>

                    <InteractiveMap
                        selectedCampus={formData.campus}
                        onSelectCampus={(val) => setFormData({...formData, campus: val})}
                    />
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
                                    Tour Requested!
                                </h2>
                                <p className="font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium max-w-md mx-auto leading-relaxed mb-10">
                                    Thank you for your interest in The Aster School. We have received your request and our admissions team will contact you shortly to confirm your visit.
                                </p>
                                <button
                                    onClick={() => setStatus({type: 'idle', msg: ''})}
                                    className="bg-[#F4F6F8] hover:bg-[#E5E7EB] text-[#15283D] px-10 py-4 rounded-full font-['Quicksand'] font-bold text-[13px] tracking-[0.15em] uppercase transition-colors"
                                >
                                    Book Another Tour
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="form-stagger mb-12 border-b border-[#F4F6F8] pb-8">
                                    <h2 className="font-['Quicksand'] text-3xl md:text-[34px] text-[#15283D] font-bold tracking-tight mb-4">
                                        Secure Your Slot
                                    </h2>
                                    <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[16px]">
                                        Fill out the details below to complete your booking.
                                    </p>
                                    {!user && (
                                        <p className="font-['Quicksand'] text-[#334a89] font-bold text-[13px] mt-4 bg-[#334a89]/5 inline-block px-4 py-2 rounded-lg">
                                            Tip: Log in to save this tour to your dashboard.
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

                                    {/* --- SECTION 1: CONTACT DETAILS --- */}
                                    <div className="relative z-[50]">
                                        <div className="form-stagger grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Full Name *</label>
                                                <input required type="text" value={formData.parent_name} onChange={e => setFormData({...formData, parent_name: e.target.value})} placeholder="Jane Doe" className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Email Address *</label>
                                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!!user} placeholder="jane@example.com" className={`w-full px-5 py-4 rounded-[20px] font-['Quicksand'] font-bold text-[15px] transition-all duration-300 ${user ? 'bg-gray-50 text-[#15283D]/40 cursor-not-allowed border border-gray-100' : 'bg-[#F4F6F8] text-[#15283D] focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 placeholder-[#15283D]/30'}`} />
                                            </div>

                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Phone Number *</label>
                                                <div className="flex gap-3">
                                                    <CountryCodeSelect value={formData.country_code} onChange={(val) => setFormData({...formData, country_code: val})} />
                                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="300 1234567" className="flex-1 min-w-0 px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] placeholder-[#15283D]/30" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- SECTION 2: TOUR DETAILS --- */}
                                    <div className="relative z-[40]">
                                        <div className="form-stagger grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

                                            <div className="relative z-[100] md:col-span-2">
                                                <MinimalSelect
                                                    label="Campus to Visit *"
                                                    value={formData.campus}
                                                    onChange={(val) => setFormData({...formData, campus: val})}
                                                    options={campusOptions}
                                                    placeholder="Select from map or dropdown"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 relative z-30">
                                                <label className="font-['Quicksand'] font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Preferred Date *</label>
                                                <div className="relative">
                                                    <input required type="date" value={formData.preferred_date} onChange={e => setFormData({...formData, preferred_date: e.target.value})} className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] transition-all duration-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#334a89]/15 font-['Quicksand'] font-bold text-[15px] text-[#15283D] cursor-pointer" />
                                                </div>
                                            </div>

                                            <div className="relative z-30">
                                                <MinimalSelect
                                                    label="Preferred Time *"
                                                    value={formData.preferred_time_slot}
                                                    onChange={(val) => setFormData({...formData, preferred_time_slot: val})}
                                                    options={timeOptions}
                                                    placeholder="Select time slot"
                                                />
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
                                                    Processing Request...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={2.5} />
                                                    Confirm Booking
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