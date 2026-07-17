import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'
import {
    Quote, Plus, Edit2, Trash2, X, User,
    GraduationCap, CheckCircle2, Loader2, Sparkles
} from 'lucide-react'

interface Testimonial {
    id: string;
    parent_name: string;
    child_program: string;
    quote: string;
    is_featured: boolean;
}

// =========================================================
// CUSTOM SAAS TOGGLE SWITCH
// =========================================================
function CustomToggle({ enabled, onChange, label }: { enabled: boolean, onChange: (val: boolean) => void, label: string }) {
    return (
        <div className="flex items-center justify-between cursor-pointer select-none bg-[#F4F6F8] p-4 rounded-[20px] border border-[#E5E7EB] transition-colors hover:border-[#334a89]/30" onClick={() => onChange(!enabled)}>
            <div className="flex items-center gap-3">
                <Sparkles className={`w-5 h-5 ${enabled ? 'text-[#ffc715]' : 'text-[#A0AEC0]'}`} />
                <div>
                    <span className="block font-['Quicksand'] font-bold text-[14px] text-[#15283D]">{label}</span>
                    <span className="block font-['Quicksand'] font-medium text-[12px] text-[#5C5C61]">Display on the public homepage</span>
                </div>
            </div>
            <div className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ease-in-out ${enabled ? 'bg-[#334a89]' : 'bg-[#E5E7EB]'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow-sm ${enabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </div>
        </div>
    )
}

// =========================================================
// MAIN MANAGER COMPONENT
// =========================================================
export default function TestimonialsManager() {
    const [items, setItems] = useState<Testimonial[]>([])
    const [ed, setEd] = useState<Partial<Testimonial> | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const tableRef = useRef<HTMLTableSectionElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
        if (data) setItems(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    // GSAP Table Stagger Animation
    useEffect(() => {
        if (!loading && items.length > 0 && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, tableRef)
            return () => ctx.revert()
        }
    }, [items, loading])

    // GSAP Modal Animation
    useEffect(() => {
        if (ed && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' }
            )
        }
    }, [ed])

    const save = async () => {
        if (!ed?.parent_name || !ed?.quote) return
        setSaving(true)

        // Modal Exit Animation Hook
        const exitAndRefresh = async () => {
            gsap.to(modalRef.current, {
                opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in',
                onComplete: () => {
                    setEd(null)
                    setSaving(false)
                    fetchItems()
                }
            })
        }

        if (ed.id) {
            await supabase.from('testimonials').update(ed).eq('id', ed.id)
        } else {
            await supabase.from('testimonials').insert(ed)
        }

        exitAndRefresh()
    }

    const del = async (id: string) => {
        if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) return
        await supabase.from('testimonials').delete().eq('id', id)
        fetchItems()
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
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Testimonials</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Curate and manage parent stories displayed across the platform.</p>
                </div>
                <button
                    onClick={() => setEd({ parent_name: '', child_program: '', quote: '', is_featured: false })}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_15px_30px_rgba(51,74,137,0.25)] group"
                >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    New Story
                </button>
            </div>

            {/* =========================================================
                MAIN DATA TABLE
            ========================================================= */}
            <div
                className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2 min-h-[400px]"
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
                                    <div className="w-32 h-8 rounded-full bg-[#F4F6F8]" />
                                    <div className="w-40 h-10 rounded-full bg-[#F4F6F8]" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <Quote className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No testimonials found</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed mb-6">
                            You haven't added any parent stories yet. Start building trust by adding your first testimonial.
                        </p>
                        <button
                            onClick={() => setEd({ parent_name: '', child_program: '', quote: '', is_featured: false })}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F4F6F8] text-[#15283D] hover:bg-[#E5E7EB] rounded-full font-bold text-[13px] uppercase tracking-widest transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Testimonial
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead className="sticky top-0 z-30 shadow-sm">
                            <tr>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Author</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Quote Snippet</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] whitespace-nowrap">Status</th>
                                <th className="bg-[#F8F9FA] px-8 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right whitespace-nowrap">Actions</th>
                            </tr>
                            </thead>
                            <tbody ref={tableRef} className="bg-white relative z-0">
                            {items.map((t) => (
                                <tr key={t.id} className="adm-row group hover:bg-[#F8F9FA]/50 transition-colors border-b border-[#F4F6F8] last:border-0 relative">

                                    {/* Author & Program Info */}
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[14px] bg-[#334a89]/5 border border-[#334a89]/10 flex items-center justify-center text-[#334a89] shrink-0">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[16px] text-[#15283D] mb-1">{t.parent_name}</p>
                                                <p className="flex items-center gap-1.5 font-bold text-[12px] uppercase tracking-wider text-[#A0AEC0]">
                                                    <GraduationCap className="w-3.5 h-3.5 text-[#334a89]" />
                                                    {t.child_program || 'General'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Truncated Quote */}
                                    <td className="px-6 py-6">
                                        <div className="flex items-start gap-3">
                                            <Quote className="w-4 h-4 text-[#A0AEC0] shrink-0 mt-1" />
                                            <p className="text-[14px] font-medium text-[#5C5C61] max-w-[320px] truncate leading-relaxed">
                                                "{t.quote}"
                                            </p>
                                        </div>
                                    </td>

                                    {/* Featured Pill */}
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        {t.is_featured ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffc715]/10 text-[#b38b0f] font-bold text-[11px] uppercase tracking-widest border border-[#ffc715]/30">
                                                    <Sparkles className="w-3 h-3" /> Featured
                                                </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 font-bold text-[11px] uppercase tracking-widest border border-gray-200">
                                                    Hidden
                                                </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-8 py-6 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEd(t)}
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#334a89]/10 hover:text-[#334a89] transition-colors"
                                                title="Edit Story"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => del(t.id)}
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-50/50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                                                title="Delete Story"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
            {ed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#15283D]/40 backdrop-blur-md">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setEd(null)} />

                    <div ref={modalRef} className="relative w-full max-w-xl bg-white rounded-[40px] shadow-[0_40px_80px_rgba(21,40,61,0.2)] border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="px-10 py-8 border-b border-[#F4F6F8] flex items-center justify-between bg-[#F8F9FA] shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[16px] bg-[#334a89]/10 border border-[#334a89]/10 flex items-center justify-center">
                                    <Quote className="w-5 h-5 text-[#334a89]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[18px] text-[#15283D] tracking-tight mb-0.5">{ed.id ? 'Edit Story' : 'New Story'}</h3>
                                    <p className="font-bold text-[11px] uppercase tracking-widest text-[#A0AEC0]">Parent Testimonial</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEd(null)}
                                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#A0AEC0] hover:text-[#15283D] hover:border-[#15283D] hover:bg-[#F8F9FA] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-10 overflow-y-auto custom-scrollbar space-y-6">

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Parent Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="text"
                                        value={ed.parent_name || ''}
                                        onChange={e => setEd({ ...ed, parent_name: e.target.value })}
                                        placeholder="E.g. Sarah Ahmed"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Child Program / Detail</label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="text"
                                        value={ed.child_program || ''}
                                        onChange={e => setEd({ ...ed, child_program: e.target.value })}
                                        placeholder="E.g. Parent of Grade 3 Student"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Testimonial Quote</label>
                                <textarea
                                    value={ed.quote || ''}
                                    onChange={e => setEd({ ...ed, quote: e.target.value })}
                                    placeholder="Their story..."
                                    className="w-full h-32 bg-[#F4F6F8] rounded-[24px] p-6 font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300 resize-none custom-scrollbar leading-relaxed"
                                />
                            </div>

                            <CustomToggle
                                enabled={ed.is_featured || false}
                                onChange={(val) => setEd({ ...ed, is_featured: val })}
                                label="Featured Story"
                            />

                        </div>

                        {/* Modal Footer */}
                        <div className="px-10 py-6 border-t border-[#F4F6F8] bg-[#F8F9FA] flex items-center justify-end gap-4 shrink-0">
                            <button
                                className="px-6 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest text-[#5C5C61] hover:bg-[#E5E7EB] hover:text-[#15283D] transition-colors"
                                onClick={() => setEd(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex items-center gap-2 px-8 py-4 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all group"
                                onClick={save}
                                disabled={saving || !ed.parent_name || !ed.quote}
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />}
                                {saving ? 'Saving...' : 'Save Story'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}