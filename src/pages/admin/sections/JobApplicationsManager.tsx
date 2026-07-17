import { useEffect, useState, useRef, Fragment } from 'react'
import { supabase } from '@/lib/supabase'
import type { JobOpening } from '@/types'
import { useToast } from '@/components/admin/ToastProvider'
import gsap from 'gsap'
import {
    FileText, Mail, Phone, ChevronDown, Check,
    SlidersHorizontal, FileBadge
} from 'lucide-react'

// =========================================================
// CUSTOM SAAS DROPDOWN COMPONENT (Z-Index Optimized for Tables)
// =========================================================
function CustomStatusSelect({ value, onChange, rowZIndex }: { value: string, onChange: (val: string) => void, rowZIndex: number }) {
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

    const config: Record<string, { label: string, color: string, dot: string }> = {
        'New': { label: 'New Arrival', color: 'bg-[#ffc715]/10 text-[#b38b0f] border-[#ffc715]/30', dot: 'bg-[#ffc715] animate-pulse' },
        'Reviewed': { label: 'Reviewed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
        'Interviewing': { label: 'Interviewing', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        'Rejected': { label: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' }
    }

    // Default to 'New' if the status is somehow missing
    const activeConfig = config[value] || config['New']

    return (
        <div className="relative w-48" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : rowZIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 font-['Quicksand'] font-bold text-[11px] uppercase tracking-widest outline-none ${activeConfig.color} ${isOpen ? 'ring-4 ring-[#334a89]/10 shadow-none' : 'hover:shadow-none'}`}
            >
                <div className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeConfig.dot}`} />
                    {activeConfig.label}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-[#111111] border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="py-2 flex flex-col max-h-[240px] overflow-y-auto custom-scrollbar">
                    {Object.entries(config).map(([key, item]) => {
                        const isSelected = value === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => { onChange(key); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 font-['Quicksand'] text-[12px] font-bold uppercase tracking-widest transition-colors ${
                                    isSelected ? 'bg-[#F8F9FA] text-[#15283D]' : 'text-[#A0AEC0] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot} ${isSelected ? '' : 'opacity-50'}`} />
                                    {item.label}
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#334a89]" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// MAIN MANAGER COMPONENT
// =========================================================
export default function JobApplicationsManager() {
    const [applications, setApplications] = useState<any[]>([])
    const [jobsMap, setJobsMap] = useState<Record<string, JobOpening>>({})
    const [filter, setFilter] = useState('all')
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    const tableRef = useRef<HTMLTableSectionElement>(null)

    const filters = [
        { id: 'all', label: 'All Applications' },
        { id: 'New', label: 'New Arrivals' },
        { id: 'Reviewed', label: 'Reviewed' },
        { id: 'Interviewing', label: 'Interviewing' },
        { id: 'Rejected', label: 'Rejected' }
    ]

    const fetchData = async () => {
        setLoading(true)

        // Fetch jobs map
        const { data: jobsData } = await supabase.from('job_openings').select('*')
        if (jobsData) {
            const map: Record<string, JobOpening> = {}
            jobsData.forEach(j => map[j.id] = j)
            setJobsMap(map)
        }

        // Fetch applications based on filter
        let q = supabase.from('job_applications').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data: appsData } = await q

        if (appsData) setApplications(appsData)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [filter])

    // GSAP Row Stagger Animation
    useEffect(() => {
        if (!loading && applications.length > 0 && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, tableRef)
            return () => ctx.revert()
        }
    }, [applications, loading])

    const updateStatus = async (id: string, status: string) => {
        // Optimistic UI update
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app))

        const { error } = await supabase.from('job_applications').update({ status }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
            // Revert on error
            fetchData()
        }
    }

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
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Job Applications</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Review resumes, track hiring progress, and manage talent pipelines.</p>
                </div>
            </div>

            {/* Filter Command Bar */}
            <div className="bg-[#111111] p-2 rounded-[20px] shadow-[0_8px_30px_rgba(21,40,61,0.03)] border border-[#E5E7EB] mb-8 flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide">
                <div className="px-5 border-r border-[#E5E7EB] hidden lg:flex items-center gap-2 text-[#A0AEC0] shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Pipeline</span>
                </div>
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-5 py-2.5 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-300 shrink-0 whitespace-nowrap ${
                            filter === f.id
                                ? 'bg-[#334a89] text-white shadow-none'
                                : 'bg-transparent text-[#5C5C61] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* =========================================================
                MAIN DATA TABLE
            ========================================================= */}
            <div
                className="bg-[#111111] rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2 min-h-[500px]"
                style={{ clipPath: 'inset(0 round 32px)' }}
            >
                {loading ? (
                    <div className="w-full overflow-x-auto scrollbar-hide p-6 min-h-[500px]">
                        <div className="min-w-[1000px] space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
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
                ) : applications.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center min-h-[500px]">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <FileBadge className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No applications found</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed">
                            There are currently no candidates in the "{filters.find(f => f.id === filter)?.label}" pipeline.
                        </p>
                    </div>
                ) : (

                    <div className="w-full max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1100px]">

                            {/* Sticky Header */}
                            <thead className="sticky top-0 z-30 shadow-none">
                            <tr>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Candidate</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Role Applied For</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Contact Data</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Pipeline Status</th>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right whitespace-nowrap">Submission Date</th>
                            </tr>
                            </thead>

                            <tbody ref={tableRef} className="bg-[#111111] relative z-0">
                            {applications.map((app, index) => {
                                const job = jobsMap[app.job_id]
                                const isExpanded = expandedId === app.id

                                return (
                                    <Fragment key={app.id}>
                                        <tr className={`adm-row group transition-colors relative ${isExpanded ? 'bg-[#F8F9FA]' : 'hover:bg-[#F8F9FA]/50'} ${index === applications.length - 1 && !isExpanded ? '' : 'border-b border-[#F4F6F8]'}`}>

                                            {/* Candidate Profile */}
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15283D] to-[#334a89] text-white flex items-center justify-center font-bold text-[14px] shadow-none shrink-0">
                                                        {app.first_name?.[0]}{app.last_name?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[16px] text-[#15283D] mb-1">{app.first_name} {app.last_name}</p>
                                                        <button
                                                            onClick={() => setExpandedId(isExpanded ? null : app.id)}
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all duration-300 ${isExpanded ? 'bg-[#334a89] text-white shadow-none' : 'bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D]'}`}
                                                        >
                                                            Cover Letter & CV
                                                            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role Applied For */}
                                            <td className="px-6 py-6">
                                                {!app.job_id ? (
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600 border border-white/5">
                                                            General Application
                                                        </span>
                                                ) : job ? (
                                                    <div className="space-y-1.5">
                                                        <div className="font-bold text-[14px] text-[#334a89] truncate max-w-[250px]">{job.title}</div>
                                                        <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#334a89]/10 text-[#334a89]">
                                                            {job.location}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-200">
                                                            Deleted Job Listing
                                                        </span>
                                                )}
                                            </td>

                                            {/* Contact Information */}
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="space-y-2">
                                                    <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-[#5C5C61] hover:text-[#334a89] font-medium text-[13px] transition-colors group/link">
                                                        <Mail className="w-3.5 h-3.5 text-[#A0AEC0] group-hover/link:text-[#334a89]" />
                                                        {app.email}
                                                    </a>
                                                    <a href={`tel:${app.phone}`} className="flex items-center gap-2 text-[#5C5C61] hover:text-[#15283D] font-medium text-[13px] transition-colors group/link">
                                                        <Phone className="w-3.5 h-3.5 text-[#A0AEC0] group-hover/link:text-[#15283D]" />
                                                        {app.phone}
                                                    </a>
                                                </div>
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="px-6 py-6 relative">
                                                <CustomStatusSelect
                                                    value={app.status}
                                                    onChange={(newStatus) => updateStatus(app.id, newStatus)}
                                                    rowZIndex={applications.length - index}
                                                />
                                            </td>

                                            {/* Date */}
                                            <td className="px-8 py-6 text-right whitespace-nowrap">
                                                    <span className="font-bold text-[13px] text-[#A0AEC0]">
                                                        {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                            </td>

                                        </tr>

                                        {/* Expandable Cover Letter Drawer */}
                                        {isExpanded && (
                                            <tr className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                                                <td colSpan={5} className="p-0">
                                                    <div className="px-8 py-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                                        <div className="bg-[#111111] border border-[#E5E7EB] rounded-[24px] p-8 shadow-none">
                                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F4F6F8]">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-[#334a89]/10 flex items-center justify-center text-[#334a89]">
                                                                        <FileText className="w-4 h-4" />
                                                                    </div>
                                                                    <h5 className="text-[13px] font-bold text-[#15283D] uppercase tracking-[0.15em] m-0">Cover Letter</h5>
                                                                </div>

                                                                {app.resume_link ? (
                                                                    <a
                                                                        href={app.resume_link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#15283D] text-white hover:bg-[#334a89] font-bold text-[12px] uppercase tracking-widest rounded-full transition-all shadow-none hover:shadow-none"
                                                                    >
                                                                        <FileBadge className="w-4 h-4" />
                                                                        Open Resume File
                                                                    </a>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white/40 font-bold text-[11px] uppercase tracking-widest rounded-full border border-white/5">
                                                                            No Resume Attached
                                                                        </span>
                                                                )}
                                                            </div>

                                                            <div className="prose prose-sm max-w-none">
                                                                {app.cover_letter ? (
                                                                    <p className="text-[#5C5C61] font-medium text-[15px] leading-[1.8] whitespace-pre-wrap">
                                                                        {app.cover_letter}
                                                                    </p>
                                                                ) : (
                                                                    <div className="py-8 text-center bg-[#F4F6F8] rounded-[16px] border border-dashed border-[#E5E7EB]">
                                                                        <span className="italic font-medium text-[#A0AEC0]">Applicant did not provide a cover letter.</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}