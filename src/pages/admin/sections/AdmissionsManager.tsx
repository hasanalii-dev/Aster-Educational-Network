import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'
import {
    SlidersHorizontal, MessageSquare,
    ChevronDown, Check, FileText, GraduationCap, User, Mail, Calendar, X, CheckCircle2, Download
} from 'lucide-react'

// =========================================================
// CUSTOM SAAS DROPDOWN COMPONENT
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
        submitted: { label: 'Submitted', color: 'bg-gray-50 text-gray-700 border-gray-200', dot: 'bg-gray-400' },
        under_review: { label: 'Under Review', color: 'bg-[#ffc715]/10 text-[#b38b0f] border-[#ffc715]/30', dot: 'bg-[#ffc715] animate-pulse' },
        assessment_booked: { label: 'Assessment Booked', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
        accepted: { label: 'Accepted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        rejected: { label: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' }
    }

    const activeConfig = config[value] || config['submitted']

    return (
        <div className="relative w-48" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : rowZIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 font-['Quicksand'] font-bold text-[11px] uppercase tracking-widest outline-none ${activeConfig.color} ${isOpen ? 'ring-4 ring-[#334a89]/10 shadow-md' : 'hover:shadow-sm'}`}
            >
                <div className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeConfig.dot}`} />
                    {activeConfig.label}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
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
export default function AdmissionsManager() {
    const [admissions, setAdmissions] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const [selectedAdmission, setSelectedAdmission] = useState<any | null>(null)
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(true)

    const tableRef = useRef<HTMLTableSectionElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const filters = [
        { id: 'all', label: 'All Applications' },
        { id: 'submitted', label: 'Submitted' },
        { id: 'under_review', label: 'Under Review' },
        { id: 'assessment_booked', label: 'Assessment Booked' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'rejected', label: 'Rejected' }
    ]

    const fetchAdmissions = async () => {
        setLoading(true)
        let q = supabase.from('admissions').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)

        const { data } = await q
        if (data) setAdmissions(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchAdmissions()
    }, [filter])

    useEffect(() => {
        if (!loading && admissions.length > 0 && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, tableRef)
            return () => ctx.revert()
        }
    }, [admissions, loading])

    useEffect(() => {
        if (selectedAdmission && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' }
            )
        }
    }, [selectedAdmission])

    const updateStatus = async (id: string, status: string) => {
        setAdmissions(prev => prev.map(adm => adm.id === id ? { ...adm, status } : adm))
        await supabase.from('admissions').update({ status }).eq('id', id)
    }

    const saveFeedback = async () => {
        if (!selectedAdmission) return
        gsap.to(modalRef.current, {
            opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in',
            onComplete: async () => {
                await supabase.from('admissions').update({ admin_feedback: feedback }).eq('id', selectedAdmission.id)
                setSelectedAdmission(null)
                fetchAdmissions()
            }
        })
    }

    const exportToCSV = () => {
        if (admissions.length === 0) return

        const headers = [
            "ID",
            "Child Name",
            "Child DOB",
            "Grade Applying For",
            "Current School",
            "Parent Name",
            "Parent Email",
            "Parent Phone",
            "Status",
            "Created At",
            "Admin Feedback"
        ]

        const csvContent = [
            headers.join(','),
            ...admissions.map(adm => [
                `"${adm.id}"`,
                `"${adm.child_full_name || ''}"`,
                `"${adm.child_dob || ''}"`,
                `"${adm.grade_applying_for || ''}"`,
                `"${adm.current_school || ''}"`,
                `"${adm.parent_name || ''}"`,
                `"${adm.parent_email || ''}"`,
                `"${(adm.country_code || '') + (adm.parent_phone || '')}"`,
                `"${adm.status || ''}"`,
                `"${new Date(adm.created_at).toLocaleString()}"`,
                `"${(adm.admin_feedback || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `admissions_export_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            {/* =========================================================
                PREMIUM FLOATING SCROLLBAR ENGINE
            ========================================================= */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { 
                    width: 14px;  /* Vertical Width */
                    height: 14px; /* Horizontal Height */
                }
                .custom-scrollbar::-webkit-scrollbar-track { 
                    background: rgba(244, 246, 248, 0.4); 
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    /* Thick white border makes the thumb look like a floating pill */
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                    transition: background-color 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
                    background-color: #94A3B8; 
                    /* Slightly thinner border on hover for tactile feedback */
                    border: 3px solid #FFFFFF; 
                }
                /* Clean intersection where vertical and horizontal meet */
                .custom-scrollbar::-webkit-scrollbar-corner { 
                    background: #FFFFFF; 
                }
                
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Admissions Queue</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Manage, review, and update prospective student applications.</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-[#334a89]/10 text-[#334a89] rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#334a89]/20 transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Filter Command Bar */}
            <div className="bg-white p-2 rounded-[20px] shadow-[0_8px_30px_rgba(21,40,61,0.03)] border border-[#E5E7EB] mb-8 flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide">
                <div className="px-5 border-r border-[#E5E7EB] hidden lg:flex items-center gap-2 text-[#A0AEC0] shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Filter</span>
                </div>
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-5 py-2.5 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-300 shrink-0 whitespace-nowrap ${
                            filter === f.id
                                ? 'bg-[#334a89] text-white shadow-md'
                                : 'bg-transparent text-[#5C5C61] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Main Data Table Card */}
            <div
                className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2"
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
                ) : admissions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center min-h-[500px]">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <FileText className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No applications found</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed">
                            There are currently no records matching the "{filters.find(f => f.id === filter)?.label}" queue.
                        </p>
                    </div>
                ) : (

                    /* The Inner Scrolling Container with Horizontal & Vertical Custom Scrollbars */
                    <div className="w-full max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">

                            {/* Sticky Header */}
                            <thead className="sticky top-0 z-30 shadow-sm">
                            <tr>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Applicant Data</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Guardian Connect</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Status Workflow</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Received Stamp</th>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right whitespace-nowrap">Admin Actions</th>
                            </tr>
                            </thead>

                            <tbody ref={tableRef} className="bg-white relative z-0">
                            {admissions.map((adm, index) => (
                                <tr key={adm.id} className="adm-row group hover:bg-[#F8F9FA]/50 transition-colors border-b border-[#F4F6F8] last:border-0 relative">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[14px] bg-[#334a89]/5 border border-[#334a89]/10 flex items-center justify-center text-[#334a89] shrink-0 transition-transform group-hover:scale-105">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <p className="font-bold text-[16px] text-[#15283D] mb-1">{adm.child_full_name}</p>
                                                <p className="font-bold text-[12px] uppercase tracking-wider text-[#A0AEC0]">Grade: <span className="text-[#334a89]">{adm.grade_applying_for}</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="space-y-1.5 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-[#15283D] font-bold text-[14px]">
                                                <User className="w-3.5 h-3.5 text-[#A0AEC0]" />
                                                {adm.parent_name}
                                            </div>
                                            <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[13px]">
                                                <Mail className="w-3.5 h-3.5 text-[#A0AEC0]" />
                                                {adm.parent_email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 relative">
                                        <CustomStatusSelect
                                            value={adm.status}
                                            onChange={(newStatus) => updateStatus(adm.id, newStatus)}
                                            rowZIndex={admissions.length - index}
                                        />
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[14px]">
                                            <Calendar className="w-4 h-4 text-[#A0AEC0]" />
                                            {new Date(adm.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right whitespace-nowrap">
                                        <button
                                            onClick={() => { setSelectedAdmission(adm); setFeedback(adm.admin_feedback || '') }}
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${
                                                adm.admin_feedback
                                                    ? 'bg-[#334a89]/10 text-[#334a89] hover:bg-[#334a89]/20 border border-[#334a89]/20'
                                                    : 'bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] border border-transparent'
                                            }`}
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            {adm.admin_feedback ? 'Edit Note' : 'Add Note'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* =========================================================
                GLASSMORPHIC FEEDBACK MODAL
            ========================================================= */}
            {selectedAdmission && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#15283D]/40 backdrop-blur-md">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedAdmission(null)} />
                    <div ref={modalRef} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-[0_40px_80px_rgba(21,40,61,0.2)] border border-[#E5E7EB] overflow-hidden">

                        <div className="px-10 py-8 border-b border-[#F4F6F8] flex items-center justify-between bg-[#F8F9FA]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[16px] bg-[#334a89]/10 border border-[#334a89]/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-[#334a89]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[18px] text-[#15283D] tracking-tight mb-0.5">Parent Feedback</h3>
                                    <p className="font-bold text-[11px] uppercase tracking-widest text-[#A0AEC0]">For {selectedAdmission.child_full_name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAdmission(null)}
                                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#A0AEC0] hover:text-[#15283D] hover:border-[#15283D] hover:bg-[#F8F9FA] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-10">
                            <p className="text-[15px] font-medium text-[#5C5C61] mb-6 leading-relaxed">
                                This note will be instantly visible to <span className="font-bold text-[#334a89] px-2 py-1 bg-[#334a89]/5 rounded-md">{selectedAdmission.parent_name}</span> on their secure portal dashboard.
                            </p>
                            <textarea
                                className="w-full h-40 bg-[#F4F6F8] rounded-[24px] p-6 font-medium text-[16px] text-[#15283D] placeholder-[#A0AEC0] border border-[#E5E7EB] focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300 resize-none custom-scrollbar leading-relaxed"
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                placeholder="E.g. We loved meeting you! We would like to invite you for a formal assessment next week..."
                            />
                        </div>

                        <div className="px-10 py-6 border-t border-[#F4F6F8] bg-[#F8F9FA] flex items-center justify-end gap-4">
                            <button
                                className="px-6 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] transition-colors"
                                onClick={() => setSelectedAdmission(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex items-center gap-2 px-8 py-4 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] transition-all group"
                                onClick={saveFeedback}
                            >
                                <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                                Publish Note
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}