import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'
import {
    SlidersHorizontal, MessageSquare,
    Mail, Phone, Calendar, MapPin, User, X,
    ChevronDown, CheckCircle2, Check, Clock, Download
} from 'lucide-react'

// =========================================================
// CUSTOM SAAS DROPDOWN COMPONENT (Spatial Awareness)
// =========================================================
function CustomStatusSelect({ value, onChange, rowZIndex, dropUp }: { value: string, onChange: (val: string) => void, rowZIndex: number, dropUp: boolean }) {
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
        pending: { label: 'Pending', color: 'bg-[#ffc715]/10 text-[#b38b0f] border-[#ffc715]/30', dot: 'bg-[#ffc715] animate-pulse' },
        scheduled: { label: 'Scheduled', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
        completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        cancelled: { label: 'Cancelled', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' }
    }

    const activeConfig = config[value] || config['pending']
    const originClasses = dropUp ? 'bottom-[calc(100%+8px)] origin-bottom' : 'top-[calc(100%+8px)] origin-top'

    return (
        <div className="relative w-full max-w-[160px]" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : rowZIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 font-['Quicksand'] font-bold text-[10px] uppercase tracking-widest outline-none ${activeConfig.color} ${isOpen ? 'ring-4 ring-[#334a89]/10 shadow-none' : 'hover:shadow-none'}`}
            >
                <div className="flex items-center gap-2.5 truncate pr-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeConfig.dot}`} />
                    <span className="truncate">{activeConfig.label}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isOpen ? (dropUp ? 'rotate-0' : 'rotate-180') : (dropUp ? 'rotate-180' : '')}`} />
            </button>

            <div
                className={`absolute left-0 right-0 ${originClasses} bg-[#111111] border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="py-2 flex flex-col">
                    {Object.entries(config).map(([key, item]) => {
                        const isSelected = value === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => { onChange(key); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 font-['Quicksand'] text-[11px] font-bold uppercase tracking-widest transition-colors ${
                                    isSelected ? 'bg-[#F8F9FA] text-[#15283D]' : 'text-[#A0AEC0] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                                }`}
                            >
                                {item.label}
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#334a89] shrink-0" />}
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
export default function CampusToursManager() {
    const [tours, setTours] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const [selectedTour, setSelectedTour] = useState<any | null>(null)
    const [note, setNote] = useState('')
    const [loading, setLoading] = useState(true)

    const tableRef = useRef<HTMLTableSectionElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const filters = [
        { id: 'all', label: 'All Tours' },
        { id: 'pending', label: 'Pending' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' }
    ]

    const fetchTours = async () => {
        setLoading(true)
        let q = supabase.from('campus_tours').select('*').order('preferred_date', { ascending: true })
        if (filter !== 'all') q = q.eq('status', filter)

        const { data } = await q
        if (data) setTours(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchTours()
    }, [filter])

    useEffect(() => {
        if (!loading && tours.length > 0 && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, tableRef)
            return () => ctx.revert()
        }
    }, [tours, loading])

    useEffect(() => {
        if (selectedTour && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' }
            )
        }
    }, [selectedTour])

    const updateStatus = async (id: string, status: string) => {
        setTours(prev => prev.map(tour => tour.id === id ? { ...tour, status } : tour))
        await supabase.from('campus_tours').update({ status }).eq('id', id)
    }

    const saveNote = async () => {
        if (!selectedTour) return
        gsap.to(modalRef.current, {
            opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in',
            onComplete: async () => {
                await supabase.from('campus_tours').update({ admin_outcome_note: note }).eq('id', selectedTour.id)
                setSelectedTour(null)
                fetchTours()
            }
        })
    }

    const exportToCSV = () => {
        if (tours.length === 0) return

        const headers = [
            "ID",
            "Parent Name",
            "Email",
            "Phone",
            "Preferred Date",
            "Preferred Time",
            "Status",
            "Created At",
            "Admin Note"
        ]

        const csvContent = [
            headers.join(','),
            ...tours.map(tour => [
                `"${tour.id}"`,
                `"${tour.parent_name || ''}"`,
                `"${tour.email || ''}"`,
                `"${tour.phone || ''}"`,
                `"${tour.preferred_date || ''}"`,
                `"${tour.preferred_time_slot || ''}"`,
                `"${tour.status || ''}"`,
                `"${new Date(tour.created_at).toLocaleString()}"`,
                `"${(tour.admin_outcome_note || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `campus_tours_export_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
                .custom-scrollbar::-webkit-scrollbar-track { 
                    background: rgba(244, 246, 248, 0.4); 
                    border-radius: 20px;
                    margin-top: 32px; 
                    margin-bottom: 32px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                    transition: background-color 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Campus Tours Queue</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Manage, schedule, and review prospective parent campus visits.</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-[#334a89]/10 text-[#334a89] rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#334a89]/20 transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <div className="bg-[#111111] p-2 rounded-[20px] shadow-[0_8px_30px_rgba(21,40,61,0.03)] border border-[#E5E7EB] mb-8 flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide">
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
                                ? 'bg-[#334a89] text-white shadow-none'
                                : 'bg-transparent text-[#5C5C61] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div
                className="bg-[#111111] rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2 min-h-[500px]"
                style={{ clipPath: 'inset(0 round 32px)' }}
            >
                {loading ? (
                    <div className="w-full flex-1 overflow-x-auto scrollbar-hide p-6 min-h-[500px]">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-[20px] border border-[#F4F6F8] animate-pulse">
                                    <div className="w-12 h-12 rounded-[12px] bg-[#F4F6F8]" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-[#F4F6F8] rounded-full w-1/3" />
                                        <div className="h-3 bg-[#F4F6F8] rounded-full w-1/4" />
                                    </div>
                                    <div className="w-40 h-10 rounded-full bg-[#F4F6F8] hidden md:block" />
                                    <div className="w-32 h-10 rounded-full bg-[#F4F6F8]" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : tours.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center min-h-[500px]">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <MapPin className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No tours found</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed">
                            There are currently no records matching the "{filters.find(f => f.id === filter)?.label}" queue.
                        </p>
                    </div>
                ) : (
                    /* MASTERCLASS FIX: Added flex-1 and min-h-[500px] to force the scroll container to be deep enough for dropdowns */
                    <div className="w-full flex-1 min-h-[500px] max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">

                            <thead className="sticky top-0 z-30 shadow-none">
                            <tr>
                                <th className="bg-[#F8F9FA] px-6 md:px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB]">Parent Contact</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden md:table-cell">Tour Schedule</th>
                                <th className="bg-[#F8F9FA] px-4 md:px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB]">Status</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden lg:table-cell">Received</th>
                                <th className="bg-[#F8F9FA] px-6 md:px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right">Actions</th>
                            </tr>
                            </thead>

                            <tbody ref={tableRef} className="bg-[#111111] relative z-0">
                            {tours.map((tour, index) => {
                                // Only drop up if the table is crowded (5+ items) AND it's in the last 3 rows
                                const shouldDropUp = tours.length >= 5 && index >= tours.length - 3;

                                return (
                                    <tr key={tour.id} className="adm-row group hover:bg-[#F8F9FA]/50 transition-colors border-b border-[#F4F6F8] last:border-0 relative">

                                        <td className="px-6 md:px-8 py-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-[#15283D] font-bold text-[15px]">
                                                    <User className="w-4 h-4 text-[#A0AEC0] shrink-0" />
                                                    <span className="truncate max-w-[120px] md:max-w-[200px]">{tour.parent_name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[13px]">
                                                    <Mail className="w-3.5 h-3.5 text-[#A0AEC0] shrink-0" />
                                                    <span className="truncate max-w-[120px] md:max-w-[200px]">{tour.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[13px]">
                                                    <Phone className="w-3.5 h-3.5 text-[#A0AEC0] shrink-0" />
                                                    {tour.phone}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 hidden md:table-cell">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-[14px] bg-[#ffc715]/10 border border-[#ffc715]/20 flex items-center justify-center text-[#b38b0f] shrink-0 transition-transform group-hover:scale-105">
                                                    <MapPin className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[15px] text-[#15283D] mb-1">
                                                        {new Date(tour.preferred_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <p className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-[#A0AEC0]">
                                                        <Clock className="w-3.5 h-3.5 text-[#334a89]" />
                                                        {tour.preferred_time_slot}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-6 relative">
                                            <CustomStatusSelect
                                                value={tour.status}
                                                onChange={(newStatus) => updateStatus(tour.id, newStatus)}
                                                rowZIndex={tours.length - index}
                                                dropUp={shouldDropUp}
                                            />
                                        </td>

                                        <td className="px-6 py-6 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-[#5C5C61] font-medium text-[13px]">
                                                <Calendar className="w-4 h-4 text-[#A0AEC0]" />
                                                {new Date(tour.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>

                                        <td className="px-6 md:px-8 py-6 text-right">
                                            <button
                                                onClick={() => { setSelectedTour(tour); setNote(tour.admin_outcome_note || '') }}
                                                className={`inline-flex items-center justify-center gap-2 p-2.5 md:px-5 md:py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${
                                                    tour.admin_outcome_note
                                                        ? 'bg-[#334a89]/10 text-[#334a89] hover:bg-[#334a89]/20 border border-[#334a89]/20'
                                                        : 'bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] border border-transparent'
                                                }`}
                                            >
                                                <MessageSquare className="w-4 h-4 md:w-3.5 md:h-3.5" />
                                                <span className="hidden md:inline">{tour.admin_outcome_note ? 'Edit Note' : 'Add Note'}</span>
                                            </button>
                                        </td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* =========================================================
                GLASSMORPHIC FEEDBACK MODAL
            ========================================================= */}
            {selectedTour && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#15283D]/40 backdrop-blur-md">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedTour(null)} />
                    <div ref={modalRef} className="relative w-full max-w-lg bg-[#111111] rounded-[40px] shadow-[0_40px_80px_rgba(21,40,61,0.2)] border border-[#E5E7EB] overflow-hidden">

                        <div className="px-10 py-8 border-b border-[#F4F6F8] flex items-center justify-between bg-[#F8F9FA]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[16px] bg-[#334a89]/10 border border-[#334a89]/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-[#334a89]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[18px] text-[#15283D] tracking-tight mb-0.5">Tour Note</h3>
                                    <p className="font-bold text-[11px] uppercase tracking-widest text-[#A0AEC0]">For {selectedTour.parent_name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTour(null)}
                                className="w-10 h-10 rounded-full bg-[#111111] border border-[#E5E7EB] flex items-center justify-center text-[#A0AEC0] hover:text-[#15283D] hover:border-[#15283D] hover:bg-[#F8F9FA] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-10">
                            <p className="text-[15px] font-medium text-[#5C5C61] mb-6 leading-relaxed">
                                This note will be instantly visible to <span className="font-bold text-[#334a89] px-2 py-1 bg-[#334a89]/5 rounded-md">{selectedTour.parent_name}</span> on their secure portal dashboard.
                            </p>
                            <textarea
                                className="w-full h-40 bg-[#F4F6F8] rounded-[24px] p-6 font-medium text-[16px] text-[#15283D] placeholder-[#A0AEC0] border border-[#E5E7EB] focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300 resize-none custom-scrollbar leading-relaxed"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="E.g. We have confirmed your tour for 10:00 AM. Please bring..."
                            />
                        </div>

                        <div className="px-10 py-6 border-t border-[#F4F6F8] bg-[#F8F9FA] flex items-center justify-end gap-4">
                            <button
                                className="px-6 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] transition-colors"
                                onClick={() => setSelectedTour(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex items-center gap-2 px-8 py-4 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] transition-all group"
                                onClick={saveNote}
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