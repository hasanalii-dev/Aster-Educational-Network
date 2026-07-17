import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { JobOpening } from '@/types'
import { useToast } from '@/components/admin/ToastProvider'
import gsap from 'gsap'
import {
    Briefcase, Plus, Edit2, X, Power, PowerOff,
    ChevronDown, Check, Loader2, CheckCircle2,
    MapPin, Sparkles, Briefcase as TypeIcon
} from 'lucide-react'

// =========================================================
// CUSTOM SAAS DROPDOWN COMPONENT
// =========================================================
function CustomSelect({ value, onChange, options, zIndex, placeholder = 'Select...' }: { value: string, onChange: (val: string) => void, options: { label: string, value: string }[], zIndex: number, placeholder?: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedOption = options.find(o => o.value === value)

    return (
        <div className="relative w-full" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : zIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between pl-4 pr-3 py-3.5 bg-[#F4F6F8] rounded-[20px] border transition-all duration-300 font-['Quicksand'] font-medium text-[15px] outline-none ${
                    isOpen
                        ? 'bg-[#111111] border-[#334a89]/30 ring-4 ring-[#334a89]/10 text-[#15283D]'
                        : 'border-transparent text-[#15283D] hover:bg-[#E5E7EB]'
                }`}
            >
                <span className={selectedOption ? 'text-[#15283D]' : 'text-[#A0AEC0]'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#A0AEC0] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#334a89]' : ''}`} />
            </button>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-[#111111] border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="py-2 flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar">
                    {options.map((option) => {
                        const isSelected = value === option.value;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => { onChange(option.value); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 font-['Quicksand'] text-[14px] font-medium transition-colors ${
                                    isSelected
                                        ? 'bg-[#F8F9FA] text-[#334a89] font-bold'
                                        : 'text-[#5C5C61] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                                }`}
                            >
                                {option.label}
                                {isSelected && <Check className="w-4 h-4 text-[#334a89]" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// CUSTOM SAAS TOGGLE SWITCH
// =========================================================
function CustomToggle({ enabled, onChange, label, description }: { enabled: boolean, onChange: (val: boolean) => void, label: string, description: string }) {
    return (
        <div className="flex items-center justify-between cursor-pointer select-none bg-[#F4F6F8] p-4 rounded-[20px] border border-[#E5E7EB] transition-colors hover:border-[#334a89]/30" onClick={() => onChange(!enabled)}>
            <div className="flex items-center gap-3">
                <Sparkles className={`w-5 h-5 ${enabled ? 'text-[#ffc715]' : 'text-[#A0AEC0]'}`} />
                <div>
                    <span className="block font-['Quicksand'] font-bold text-[14px] text-[#15283D]">{label}</span>
                    <span className="block font-['Quicksand'] font-medium text-[12px] text-[#5C5C61]">{description}</span>
                </div>
            </div>
            <div className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ease-in-out ${enabled ? 'bg-[#334a89]' : 'bg-[#E5E7EB]'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-[#111111] transition-transform duration-300 ease-in-out shadow-none ${enabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </div>
        </div>
    )
}


// =========================================================
// MAIN COMPONENT
// =========================================================
export default function JobOpeningsManager() {
    const [jobs, setJobs] = useState<JobOpening[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [currentJob, setCurrentJob] = useState<Partial<JobOpening> | null>(null)
    const [saving, setSaving] = useState(false)
    const { showToast } = useToast()

    const tableRef = useRef<HTMLTableSectionElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const fetchJobs = async () => {
        setLoading(true)
        const { data } = await supabase.from('job_openings').select('*').order('created_at', { ascending: false })
        if (data) setJobs(data as JobOpening[])
        setLoading(false)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    // GSAP Table Stagger Animation
    useEffect(() => {
        if (!loading && jobs.length > 0 && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, tableRef)
            return () => ctx.revert()
        }
    }, [jobs, loading])

    // GSAP Modal Animation
    useEffect(() => {
        if (isEditing && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' }
            )
        }
    }, [isEditing])

    const toggleActive = async (id: string, currentStatus: boolean) => {
        // Optimistic UI update
        setJobs(prev => prev.map(job => job.id === id ? { ...job, is_active: !currentStatus } : job))

        const { error } = await supabase.from('job_openings').update({ is_active: !currentStatus }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
            // Revert on error
            setJobs(prev => prev.map(job => job.id === id ? { ...job, is_active: currentStatus } : job))
        } else {
            showToast(`Position ${!currentStatus ? 'activated' : 'deactivated'}`, 'success')
        }
    }

    const saveJob = async () => {
        if (!currentJob?.title || !currentJob?.department) {
            showToast('Title and Department are required', 'error')
            return
        }

        setSaving(true)

        // Modal Exit Animation Hook
        const exitAndRefresh = async () => {
            gsap.to(modalRef.current, {
                opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in',
                onComplete: () => {
                    setIsEditing(false)
                    setCurrentJob(null)
                    setSaving(false)
                    fetchJobs()
                }
            })
        }

        const { error } = currentJob.id
            ? await supabase.from('job_openings').update(currentJob).eq('id', currentJob.id)
            : await supabase.from('job_openings').insert([currentJob])

        if (error) {
            showToast('Failed to save job opening', 'error')
            setSaving(false)
        } else {
            showToast(`Opening ${currentJob.id ? 'updated' : 'created'} successfully`, 'success')
            exitAndRefresh()
        }
    }

    const departmentOptions = [
        { label: 'Teachers and Educators', value: 'Teachers and Educators' },
        { label: 'Academic Leaders and Coordinators', value: 'Academic Leaders and Coordinators' },
        { label: 'Sports Coaches', value: 'Sports Coaches' },
        { label: 'Specialists and Subject Experts', value: 'Specialists and Subject Experts' },
        { label: 'Student Support Professionals', value: 'Student Support Professionals' },
        { label: 'Admissions and Marketing', value: 'Admissions and Marketing Professionals' },
        { label: 'Operations and Admin', value: 'Operations and Administrative Teams' },
        { label: 'Other', value: 'Other' }
    ]

    const typeOptions = [
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Part-time', value: 'Part-time' },
        { label: 'Contract', value: 'Contract' }
    ]

    const locationOptions = [
        { label: 'PECHS Junior Campus', value: 'PECHS Junior Campus' },
        { label: 'PECHS Senior Campus', value: 'PECHS Senior Campus' },
        { label: 'Clifton Campus', value: 'Clifton Campus' },
        { label: 'Riyadh Campus', value: 'Riyadh Campus' },
        { label: 'Multiple Campuses', value: 'Multiple Campuses' }
    ]

    return (
        <div className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            {/* =========================================================
                PREMIUM FLOATING SCROLLBAR ENGINE
            ========================================================= */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(244, 246, 248, 0.4); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                    transition: background-color 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; border: 3px solid #FFFFFF; }
                .custom-scrollbar::-webkit-scrollbar-corner { background: transparent; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Job Openings</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Manage career opportunities and open positions.</p>
                </div>
                <button
                    onClick={() => { setCurrentJob({ is_active: true, type: 'Full-time', location: 'PECHS Junior Campus', department: 'Teachers and Educators' }); setIsEditing(true); }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_15px_30px_rgba(51,74,137,0.25)] group"
                >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    New Opening
                </button>
            </div>

            {/* =========================================================
                MAIN DATA TABLE
            ========================================================= */}
            <div
                className="bg-[#111111] rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2 min-h-[400px]"
                style={{ clipPath: 'inset(0 round 32px)' }}
            >
                {loading ? (
                    <div className="w-full overflow-x-auto scrollbar-hide p-6 min-h-[400px]">
                        <div className="min-w-[1000px] space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-[20px] border border-[#F4F6F8] animate-pulse">
                                    <div className="w-12 h-12 rounded-[12px] bg-[#F4F6F8]" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-[#F4F6F8] rounded-full w-1/3" />
                                        <div className="h-3 bg-[#F4F6F8] rounded-full w-1/4" />
                                    </div>
                                    <div className="w-48 h-10 rounded-full bg-[#F4F6F8]" />
                                    <div className="w-32 h-10 rounded-full bg-[#F4F6F8]" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <Briefcase className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No active jobs</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed mb-6">
                            There are currently no job openings listed. Click below to create your first listing.
                        </p>
                        <button
                            onClick={() => { setCurrentJob({ is_active: true, type: 'Full-time', location: 'PECHS Junior Campus', department: 'Teachers and Educators' }); setIsEditing(true); }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F4F6F8] text-[#15283D] hover:bg-[#E5E7EB] rounded-full font-bold text-[13px] uppercase tracking-widest transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Opening
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead className="sticky top-0 z-30 shadow-none">
                            <tr>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Role</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Details</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Status</th>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right whitespace-nowrap">Actions</th>
                            </tr>
                            </thead>
                            <tbody ref={tableRef} className="bg-[#111111] relative z-0">
                            {jobs.map((job) => (
                                <tr key={job.id} className="adm-row group hover:bg-[#F8F9FA]/50 transition-colors border-b border-[#F4F6F8] last:border-0 relative">

                                    {/* Role Info */}
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[14px] bg-[#334a89]/5 border border-[#334a89]/10 flex items-center justify-center text-[#334a89] shrink-0">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[16px] text-[#15283D] mb-1">{job.title}</p>
                                                <p className="font-bold text-[12px] text-[#A0AEC0]">{job.department}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Details */}
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <TypeIcon className="w-3.5 h-3.5 text-[#334a89]" />
                                                <span className="font-bold text-[12px] uppercase tracking-wider text-[#334a89] bg-[#334a89]/10 px-2 py-0.5 rounded-md">
                                                        {job.type}
                                                    </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[13px]">
                                                <MapPin className="w-3.5 h-3.5 text-[#A0AEC0]" />
                                                {job.location}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Pill */}
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        {job.is_active ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase tracking-widest border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                                                </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] uppercase tracking-widest border border-rose-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Inactive
                                                </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-8 py-6 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleActive(job.id, job.is_active)}
                                                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                                                    job.is_active
                                                        ? 'bg-rose-50/50 text-rose-400 hover:bg-rose-100 hover:text-rose-600'
                                                        : 'bg-emerald-50/50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-700'
                                                }`}
                                                title={job.is_active ? "Deactivate Job" : "Activate Job"}
                                            >
                                                {job.is_active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => { setCurrentJob(job); setIsEditing(true); }}
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#334a89]/10 hover:text-[#334a89] transition-colors"
                                                title="Edit Job"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* =========================================================
                GLASSMORPHIC EDIT / CREATE MODAL
            ========================================================= */}
            {isEditing && currentJob && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#15283D]/40 backdrop-blur-md">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setIsEditing(false)} />

                    <div ref={modalRef} className="relative w-full max-w-2xl bg-[#111111] rounded-[40px] shadow-[0_40px_80px_rgba(21,40,61,0.2)] border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="px-8 sm:px-10 py-6 sm:py-8 border-b border-[#F4F6F8] flex items-center justify-between bg-[#F8F9FA] shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[16px] bg-[#334a89]/10 border border-[#334a89]/10 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-[#334a89]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[18px] text-[#15283D] tracking-tight mb-0.5">{currentJob.id ? 'Edit Job Opening' : 'New Job Opening'}</h3>
                                    <p className="font-bold text-[11px] uppercase tracking-widest text-[#A0AEC0]">Career Portal</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="w-10 h-10 rounded-full bg-[#111111] border border-[#E5E7EB] flex items-center justify-center text-[#A0AEC0] hover:text-[#15283D] hover:border-[#15283D] hover:bg-[#F8F9FA] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar flex flex-col gap-8">

                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Job Title <span className="text-rose-500">*</span></label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="text"
                                        value={currentJob.title || ''}
                                        onChange={e => setCurrentJob({ ...currentJob, title: e.target.value })}
                                        placeholder="E.g. Lead Math Teacher"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Dropdowns Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-2 relative z-30">
                                    <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Department</label>
                                    <CustomSelect
                                        value={currentJob.department || ''}
                                        onChange={(val) => setCurrentJob({...currentJob, department: val})}
                                        options={departmentOptions}
                                        zIndex={30}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 relative z-20">
                                    <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Type</label>
                                    <CustomSelect
                                        value={currentJob.type || ''}
                                        onChange={(val) => setCurrentJob({...currentJob, type: val})}
                                        options={typeOptions}
                                        zIndex={20}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Location</label>
                                    <CustomSelect
                                        value={currentJob.location || ''}
                                        onChange={(val) => setCurrentJob({...currentJob, location: val})}
                                        options={locationOptions}
                                        zIndex={10}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2 relative z-0">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Description</label>
                                <textarea
                                    value={currentJob.description || ''}
                                    onChange={e => setCurrentJob({ ...currentJob, description: e.target.value })}
                                    placeholder="Role overview, responsibilities, qualifications..."
                                    className="w-full h-40 bg-[#F4F6F8] rounded-[24px] p-6 font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300 resize-none custom-scrollbar leading-relaxed"
                                />
                            </div>

                            {/* Active Toggle */}
                            <CustomToggle
                                enabled={currentJob.is_active || false}
                                onChange={(val) => setCurrentJob({ ...currentJob, is_active: val })}
                                label="Live Listing"
                                description="Make this job visible to applicants on the careers page."
                            />

                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 sm:px-10 py-6 border-t border-[#F4F6F8] bg-[#F8F9FA] flex items-center justify-end gap-4 shrink-0 relative z-0">
                            <button
                                className="px-6 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] transition-colors"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex items-center gap-2 px-8 py-4 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all group"
                                onClick={saveJob}
                                disabled={saving || !currentJob.title || !currentJob.department}
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />}
                                {saving ? 'Saving...' : 'Save Opening'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}