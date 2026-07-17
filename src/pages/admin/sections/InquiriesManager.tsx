import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/admin/ToastProvider'
import gsap from 'gsap'
import {
    Mail, Phone, ChevronDown, Check
} from 'lucide-react'

interface Inquiry {
    id: string;
    parent_name: string;
    email: string;
    phone: string;
    program_interest: string;
    message: string;
    status: string;
    created_at: string
}

// =========================================================
// CUSTOM STATUS DROPDOWN (Spatial Awareness)
// =========================================================
function CustomStatusSelect({ value, onChange, rowZIndex, dropUp }: { value: string, onChange: (val: string) => void, rowZIndex: number, dropUp: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const config: Record<string, { label: string, color: string, dot: string }> = {
        'new': { label: 'New', color: 'bg-[#ffc715]/10 text-[#b38b0f] border-[#ffc715]/30', dot: 'bg-[#ffc715] animate-pulse' },
        'contacted': { label: 'Contacted', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
        'enrolled': { label: 'Enrolled', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        'archived': { label: 'Archived', color: 'bg-white/5 text-gray-700 border-white/5', dot: 'bg-gray-400' }
    }

    const activeConfig = config[value] || config['new']

    // Dynamically calculate orientation based on table position
    const originClasses = dropUp ? 'bottom-[calc(100%+8px)] origin-bottom' : 'top-[calc(100%+8px)] origin-top'

    return (
        <div className="relative w-full max-w-[160px]" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : rowZIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 font-['Quicksand'] font-bold text-[10px] uppercase tracking-widest outline-none ${activeConfig.color} ${isOpen ? 'ring-4 ring-[#334a89]/10 shadow-none' : 'hover:shadow-none'}`}
            >
                <div className="flex items-center gap-2 truncate pr-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeConfig.dot}`} />
                    <span className="truncate">{activeConfig.label}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isOpen ? (dropUp ? 'rotate-0' : 'rotate-180') : (dropUp ? 'rotate-180' : '')}`} />
            </button>

            <div className={`absolute left-0 right-0 ${originClasses} bg-[#111111] border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                <div className="py-2 flex flex-col">
                    {Object.entries(config).map(([key, item]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => { onChange(key); setIsOpen(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3 font-['Quicksand'] text-[11px] font-bold uppercase tracking-widest transition-colors ${value === key ? 'bg-[#F8F9FA] text-[#15283D]' : 'text-[#A0AEC0] hover:bg-[#F4F6F8] hover:text-[#15283D]'}`}
                        >
                            {item.label}
                            {value === key && <Check className="w-3.5 h-3.5 text-[#334a89] shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// MAIN MANAGER COMPONENT
// =========================================================
export default function InquiriesManager() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const { showToast } = useToast()
    const tableRef = useRef<HTMLTableSectionElement>(null)

    const fetchInquiries = async () => {
        setLoading(true)
        let q = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data } = await q
        if (data) setInquiries(data)
        setLoading(false)
    }

    useEffect(() => { fetchInquiries() }, [filter])

    useEffect(() => {
        if (!loading && inquiries.length > 0 && tableRef.current) {
            gsap.fromTo('.adm-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power2.out', clearProps: 'transform' })
        }
    }, [inquiries, loading])

    const updateStatus = async (id: string, status: string) => {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq))
        const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
            fetchInquiries()
        } else {
            showToast('Status updated', 'success')
        }
    }

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'new', label: 'New' },
        { id: 'contacted', label: 'Contacted' },
        { id: 'enrolled', label: 'Enrolled' },
        { id: 'archived', label: 'Archived' }
    ]

    return (
        <div className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
                .custom-scrollbar::-webkit-scrollbar-track { 
                    background: transparent; 
                    margin-top: 32px; 
                    margin-bottom: 32px; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#15283D] tracking-tight mb-2">Inquiries</h1>
                <p className="text-[#5C5C61] font-medium text-[15px]">Manage incoming parent inquiries and status updates.</p>
            </div>

            {/* Filter Pill Bar */}
            <div className="bg-[#111111] p-2 rounded-[20px] shadow-[0_8px_30px_rgba(21,40,61,0.03)] border border-[#E5E7EB] mb-8 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-6 py-3 rounded-[14px] text-[12px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                            filter === f.id ? 'bg-[#334a89] text-white shadow-none' : 'text-[#5C5C61] hover:bg-[#F4F6F8]'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="bg-[#111111] rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] overflow-hidden flex flex-col relative transform-gpu" style={{ clipPath: 'inset(0 round 32px)' }}>
                {loading ? (
                    <div className="p-16 text-center animate-pulse text-[#A0AEC0] min-h-[450px]">Loading inquiries...</div>
                ) : inquiries.length === 0 ? (
                    <div className="p-16 text-center text-[#A0AEC0] min-h-[450px]">No inquiries found.</div>
                ) : (
                    <div className="w-full overflow-x-auto custom-scrollbar min-h-[450px]">
                        {/* Removed the strict min-w-[900px].
                            The table now natively flows within the container width.
                        */}
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8F9FA] sticky top-0 z-30 shadow-none">
                            <tr>
                                <th className="px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB]">Parent</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden md:table-cell">Contact</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden lg:table-cell">Program</th>
                                <th className="px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB]">Status</th>
                                <th className="px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right hidden sm:table-cell">Date</th>
                            </tr>
                            </thead>
                            <tbody ref={tableRef}>
                            {inquiries.map((inq, index) => {
                                // Drop Up Logic: If it's one of the last two rows AND we have at least 4 items, open upwards.
                                const shouldDropUp = inquiries.length >= 4 && index >= inquiries.length - 2;

                                return (
                                    <tr key={inq.id} className="adm-row opacity-0 hover:bg-[#F8F9FA]/50 border-b border-[#F4F6F8] last:border-0 relative">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-[#15283D] text-[15px]">{inq.parent_name}</div>
                                            <div className="text-[12px] text-[#A0AEC0] md:hidden mt-1">{inq.email}</div>
                                        </td>
                                        <td className="px-6 py-6 hidden md:table-cell">
                                            <div className="flex flex-col gap-1.5 text-[13px] text-[#5C5C61]">
                                                <a href={`mailto:${inq.email}`} className="hover:text-[#334a89] flex items-center gap-2 transition-colors"><Mail size={14} className="text-[#A0AEC0]" /> {inq.email}</a>
                                                <a href={`tel:${inq.phone}`} className="hover:text-[#334a89] flex items-center gap-2 transition-colors"><Phone size={14} className="text-[#A0AEC0]" /> {inq.phone}</a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 hidden lg:table-cell text-[13px] text-[#5C5C61] font-medium">{inq.program_interest || '—'}</td>
                                        <td className="px-6 py-6 relative">
                                            <CustomStatusSelect
                                                value={inq.status}
                                                onChange={(s) => updateStatus(inq.id, s)}
                                                rowZIndex={inquiries.length - index}
                                                dropUp={shouldDropUp}
                                            />
                                        </td>
                                        <td className="px-8 py-6 text-right font-bold text-[13px] text-[#A0AEC0] hidden sm:table-cell">
                                            {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                    </tr>
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