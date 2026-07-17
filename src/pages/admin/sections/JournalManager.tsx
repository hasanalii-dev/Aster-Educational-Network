import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import gsap from 'gsap'
import {
    ChevronDown, Plus, Edit2, Trash2, Image as ImageIcon,
    Check, Loader2, PenTool, CheckCircle2,
    Sparkles, ArrowLeft
} from 'lucide-react'
import { useToast } from '@/components/admin/ToastProvider'
import { useAuth } from '@/hooks/useAuth'

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    author_name: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string
}

const emptyArticle: Omit<Article, 'id' | 'created_at'> = {
    title: '',
    slug: '',
    category: 'Parenting & Child Development',
    excerpt: '',
    content: '',
    cover_image_url: '',
    author_name: '',
    is_published: false,
    published_at: null
}

const CATEGORIES = [
    'Parenting & Child Development',
    'Education & Learning',
    'Future Skills & Innovation',
    'Character & Wellbeing',
    'School Stories'
];

// =========================================================
// CUSTOM SAAS CATEGORY DROPDOWN
// =========================================================
function CustomCategorySelect({ value, onChange, zIndex }: { value: string, onChange: (val: string) => void, zIndex: number }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative w-full" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : zIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between pl-5 pr-4 py-4 bg-[#F4F6F8] rounded-[20px] border transition-all duration-300 font-['Quicksand'] font-medium text-[15px] outline-none ${
                    isOpen
                        ? 'bg-[#111111] border-[#334a89]/30 ring-4 ring-[#334a89]/10 text-[#15283D]'
                        : 'border-transparent text-[#15283D] hover:bg-[#E5E7EB]'
                }`}
            >
                <span className="truncate pr-2">{value || 'Select Category...'}</span>
                <ChevronDown className={`w-4 h-4 text-[#A0AEC0] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#334a89]' : ''}`} />
            </button>

            <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-[#111111] border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="py-2 flex flex-col max-h-[240px] overflow-y-auto custom-scrollbar">
                    {CATEGORIES.map((cat) => {
                        const isSelected = value === cat;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => { onChange(cat); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-5 py-4 font-['Quicksand'] text-[14px] font-medium transition-colors ${
                                    isSelected
                                        ? 'bg-[#F8F9FA] text-[#334a89] font-bold'
                                        : 'text-[#5C5C61] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                                }`}
                            >
                                {cat}
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
        <div className="flex items-center justify-between cursor-pointer select-none bg-[#F4F6F8] p-5 rounded-[24px] border border-[#E5E7EB] transition-colors hover:border-[#334a89]/30" onClick={() => onChange(!enabled)}>
            <div className="flex items-center gap-4">
                <Sparkles className={`w-6 h-6 ${enabled ? 'text-[#ffc715]' : 'text-[#A0AEC0]'}`} />
                <div>
                    <span className="block font-['Quicksand'] font-bold text-[15px] text-[#15283D]">{label}</span>
                    <span className="block font-['Quicksand'] font-medium text-[13px] text-[#5C5C61]">{description}</span>
                </div>
            </div>
            <div className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ease-in-out ${enabled ? 'bg-[#334a89]' : 'bg-[#E5E7EB]'}`}>
                <span className={`inline-block h-6 w-6 transform rounded-full bg-[#111111] transition-transform duration-300 ease-in-out shadow-none ${enabled ? 'translate-x-9' : 'translate-x-1.5'}`} />
            </div>
        </div>
    )
}

// =========================================================
// MAIN MANAGER COMPONENT
// =========================================================
export default function JournalManager() {
    const { role } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<Partial<Article> | null>(null)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const { showToast } = useToast()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)

    const fetchArticles = async () => {
        setLoading(true)
        const { data } = await supabase.from('journal_articles').select('*').order('created_at', { ascending: false })
        if (data) setArticles(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    // GSAP Grid Animation
    useEffect(() => {
        if (!editing && !loading && articles.length > 0 && gridRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.article-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', clearProps: 'transform' }
                )
            }, gridRef)
            return () => ctx.revert()
        }
    }, [articles, loading, editing])

    // GSAP Editor Entrance Animation
    useEffect(() => {
        if (editing && editorRef.current) {
            gsap.fromTo(editorRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
            )
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [editing])

    const handleSave = async () => {
        if (!editing?.title || !editing?.content) {
            showToast('Title and Content are required.', 'error')
            return
        }

        setSaving(true)
        const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const payload = { ...editing, slug, updated_at: new Date().toISOString() }
        if (editing.is_published && !editing.published_at) payload.published_at = new Date().toISOString()

        try {
            if (editing.id) {
                const { error } = await supabase.from('journal_articles').update(payload).eq('id', editing.id)
                if (error) throw error
                showToast('Article updated successfully!', 'success')
            } else {
                const { error } = await supabase.from('journal_articles').insert(payload)
                if (error) throw error
                showToast('Article created successfully!', 'success')
            }

            // Exit Animation & State Reset
            gsap.to(editorRef.current, {
                opacity: 0, y: 20, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    setEditing(null)
                    setSaving(false)
                    fetchArticles()
                    window.scrollTo({ top: 0, behavior: 'instant' })
                }
            })

        } catch (error: any) {
            showToast(error.message || 'Error saving article', 'error')
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return
        try {
            const { error } = await supabase.from('journal_articles').delete().eq('id', id)
            if (error) throw error
            showToast('Article deleted successfully!', 'success')
            fetchArticles()
        } catch (error: any) {
            showToast(error.message || 'Error deleting article', 'error')
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return;
            const file = e.target.files[0];
            setUploadingImage(true);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('journal-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('journal-images')
                .getPublicUrl(filePath);

            setEditing(prev => prev ? { ...prev, cover_image_url: data.publicUrl } : prev);
            showToast('Image uploaded successfully!', 'success')
        } catch (error: any) {
            console.error("Error uploading image: ", error);
            showToast("Error uploading image. Please check your storage buckets.", 'error')
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24 relative">

            <style>{`
                /* Premium Scrollbar Engine - Solves corner bleed on rounded containers globally */
                .custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
                .custom-scrollbar::-webkit-scrollbar-track { 
                    background: transparent; 
                    margin-top: 32px; /* Prevents scrollbar from bleeding into top right rounded corner */
                    margin-bottom: 32px; /* Prevents bleed into bottom right corner */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                    transition: background-color 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; border-width: 3px; }
                
                /* Full Page Quill Overrides */
                .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #E5E7EB !important; background: #F8F9FA; border-top-left-radius: 24px; border-top-right-radius: 24px; padding: 16px 20px !important; }
                .ql-container.ql-snow { border: none !important; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; font-family: 'Quicksand', sans-serif !important; font-size: 16px !important; }
                .ql-editor { padding: 32px !important; min-height: 500px; line-height: 1.8; color: #15283D; }
                .ql-editor h1, .ql-editor h2 { font-weight: 800; color: #15283D; margin-top: 1em; margin-bottom: 0.5em; }
            `}</style>

            {/* =========================================================
                VIEW 1: GRID MODE
            ========================================================= */}
            {!editing && (
                <div ref={gridRef}>
                    {/* Header Area */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Journal Manager</h1>
                            <p className="text-[#5C5C61] font-medium text-[16px]">Write, edit, and publish school news and educational insights.</p>
                        </div>
                        <button
                            onClick={() => setEditing({ ...emptyArticle })}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_15px_30px_rgba(51,74,137,0.25)] group shrink-0"
                        >
                            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                            New Article
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-[#111111] rounded-[40px] p-4 border border-[#E5E7EB] animate-pulse h-[400px] flex flex-col">
                                    <div className="w-full h-64 bg-[#F4F6F8] rounded-[32px] mb-6" />
                                    <div className="w-32 h-6 bg-[#F4F6F8] rounded-full mb-4 mx-4" />
                                    <div className="w-[80%] h-8 bg-[#F4F6F8] rounded-full mb-3 mx-4" />
                                    <div className="w-[60%] h-6 bg-[#F4F6F8] rounded-full mx-4" />
                                </div>
                            ))}
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="bg-[#111111] rounded-[40px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] p-20 text-center">
                            <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 mx-auto border border-[#E5E7EB] shadow-inner">
                                <PenTool className="w-8 h-8 text-[#A0AEC0]" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#15283D] mb-4">No articles published</h3>
                            <p className="text-[#5C5C61] font-medium text-[16px] max-w-md mx-auto leading-relaxed mb-8">
                                Your journal is currently empty. Start sharing educational insights, stories, and news with the Aster community.
                            </p>
                            <button
                                onClick={() => setEditing({ ...emptyArticle })}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F4F6F8] text-[#15283D] hover:bg-[#E5E7EB] rounded-full font-bold text-[13px] uppercase tracking-widest transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Write First Post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {articles.map((a) => (
                                <div key={a.id} className="article-card opacity-0 bg-[#111111] rounded-[40px] shadow-[0_20px_60px_rgba(21,40,61,0.03)] border border-[#E5E7EB] overflow-hidden hover:shadow-[0_30px_80px_rgba(21,40,61,0.08)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col group">

                                    {/* Image Header */}
                                    <div className="relative h-64 w-full overflow-hidden bg-[#F4F6F8] p-2">
                                        <div className="absolute top-6 right-6 z-10">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-none backdrop-blur-md ${
                                                a.is_published
                                                    ? 'bg-emerald-500/90 text-white border border-emerald-400'
                                                    : 'bg-[#111111]/90 text-[#5C5C61] border border-white'
                                            }`}>
                                                {a.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <div className="w-full h-full rounded-[32px] overflow-hidden">
                                            {a.cover_image_url ? (
                                                <img src={a.cover_image_url} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F9FA] text-[#A0AEC0] border border-[#E5E7EB]">
                                                    <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                                                    <span className="font-bold text-[12px] uppercase tracking-widest opacity-50">No Cover</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="mb-5">
                                            <span className="inline-block px-4 py-1.5 bg-[#334a89]/10 text-[#334a89] font-bold text-[11px] uppercase tracking-widest rounded-lg max-w-full truncate">
                                                {a.category || 'General'}
                                            </span>
                                        </div>
                                        <h4 className="text-[22px] font-extrabold text-[#15283D] mb-4 leading-[1.3] line-clamp-2 group-hover:text-[#334a89] transition-colors">
                                            {a.title}
                                        </h4>
                                        <p className="text-[15px] font-medium text-[#5C5C61] mb-8 line-clamp-3 leading-[1.7] flex-1">
                                            {a.excerpt || 'No excerpt provided for this article.'}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-[#F4F6F8]">
                                            <span className="font-bold text-[13px] text-[#A0AEC0] uppercase tracking-wider">
                                                {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    className="w-12 h-12 rounded-full bg-[#F4F6F8] text-[#5C5C61] hover:bg-[#334a89]/10 hover:text-[#334a89] flex items-center justify-center transition-colors shadow-none"
                                                    onClick={() => setEditing(a)}
                                                    title="Edit Article"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                {role !== 'moderator' && (
                                                    <button
                                                        className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors shadow-none"
                                                        onClick={() => handleDelete(a.id)}
                                                        title="Delete Article"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* =========================================================
                VIEW 2: FULL PAGE EDITOR CANVAS (Document Flow, Z-Index Fixed)
            ========================================================= */}
            {editing && (
                <div ref={editorRef} className="w-full flex flex-col gap-8 opacity-0">

                    {/* Editor Top Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
                        <button
                            onClick={() => { if(confirm('Discard unsaved changes?')) { setEditing(null); window.scrollTo(0,0); } }}
                            className="inline-flex items-center gap-2 text-[#5C5C61] hover:text-[#15283D] font-bold text-[13px] uppercase tracking-widest transition-colors w-fit"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Journal
                        </button>

                        <div className="flex items-center gap-4">
                            {editing.is_published && (
                                <span className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Status
                                </span>
                            )}
                            <button
                                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#334a89] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all group w-full sm:w-auto"
                                onClick={handleSave}
                                disabled={saving || !editing.title || !editing.content}
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />}
                                {saving ? 'Saving...' : 'Save Article'}
                            </button>
                        </div>
                    </div>

                    {/* Editor Main Canvas */}
                    <div className="bg-[#111111] rounded-[40px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] p-8 md:p-12 lg:p-16 flex flex-col gap-10">

                        {/* Title (Massive Input) */}
                        <div className="flex flex-col gap-2 relative z-30">
                            <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">Article Title <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                value={editing.title || ''}
                                onChange={e => setEditing({ ...editing, title: e.target.value })}
                                placeholder="Enter a captivating headline..."
                                className="w-full px-6 py-5 bg-transparent font-extrabold text-[32px] md:text-[48px] text-[#15283D] placeholder-[#E5E7EB] border-b-2 border-[#E5E7EB] focus:border-[#334a89] outline-none transition-colors duration-300"
                            />
                        </div>

                        {/* Two Column Grid: Slug & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">URL Slug</label>
                                <input
                                    type="text"
                                    value={editing.slug || ''}
                                    onChange={e => setEditing({ ...editing, slug: e.target.value })}
                                    placeholder="auto-generated-from-title"
                                    className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                />
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">Category</label>
                                <CustomCategorySelect
                                    value={editing.category || CATEGORIES[0]}
                                    onChange={(val) => setEditing({...editing, category: val})}
                                    zIndex={30}
                                />
                            </div>
                        </div>

                        {/* Cover Image Upload */}
                        <div className="flex flex-col gap-2 relative z-10">
                            <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">Cover Image</label>
                            <div className="relative group w-full h-[400px] bg-[#F4F6F8] rounded-[32px] border-2 border-dashed border-[#E5E7EB] hover:border-[#334a89]/50 overflow-hidden transition-all duration-300">

                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

                                {uploadingImage ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111111]/80 backdrop-blur-sm z-20">
                                        <Loader2 className="w-10 h-10 animate-spin text-[#334a89] mb-4" />
                                        <span className="font-bold text-[13px] uppercase tracking-widest text-[#15283D]">Processing Image...</span>
                                    </div>
                                ) : editing.cover_image_url ? (
                                    <>
                                        <img src={editing.cover_image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" alt="Cover" />
                                        <div className="absolute inset-0 bg-[#15283D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                            <button
                                                className="flex items-center gap-2 px-8 py-4 bg-[#111111]/20 hover:bg-[#111111] text-white hover:text-[#15283D] rounded-full font-bold text-[13px] uppercase tracking-widest backdrop-blur-md transition-all shadow-2xl shadow-black/50"
                                                onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                                            >
                                                <ImageIcon className="w-5 h-5" /> Replace Cover Image
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111] transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-20 h-20 bg-[#111111] rounded-full shadow-none flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                                            <ImageIcon className="w-8 h-8 text-[#A0AEC0] group-hover:text-[#334a89] transition-colors" />
                                        </div>
                                        <span className="font-bold text-[18px] text-[#15283D] mb-2">Click to Upload High-Res Cover</span>
                                        <span className="font-medium text-[14px] text-[#A0AEC0]">JPEG, PNG up to 5MB (16:9 Recommended)</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <input
                                    className="w-full px-5 py-4 bg-[#F4F6F8] rounded-[20px] font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    placeholder="Or paste an external image URL directly here..."
                                    value={editing.cover_image_url || ''}
                                    onChange={e => setEditing({ ...editing, cover_image_url: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="flex flex-col gap-2 relative z-0">
                            <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">Excerpt (Short Preview)</label>
                            <textarea
                                value={editing.excerpt || ''}
                                onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                                placeholder="Write a compelling brief summary to hook readers on the main journal page..."
                                className="w-full h-32 bg-[#F4F6F8] rounded-[24px] p-6 font-medium text-[16px] text-[#15283D] placeholder-[#A0AEC0] border border-transparent focus:bg-[#111111] focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300 resize-none custom-scrollbar leading-[1.8]"
                            />
                        </div>

                        {/* Full Canvas Rich Text Editor */}
                        <div className="flex flex-col gap-2 relative z-0">
                            <label className="font-bold text-[12px] text-[#A0AEC0] uppercase tracking-[0.2em] pl-1">Article Body <span className="text-rose-500">*</span></label>
                            <div className="bg-[#F4F6F8] rounded-[24px] border border-transparent focus-within:bg-[#111111] focus-within:border-[#334a89]/30 focus-within:ring-4 focus-within:ring-[#334a89]/10 transition-all duration-300 overflow-hidden shadow-inner">
                                <ReactQuill
                                    theme="snow"
                                    value={editing.content || ''}
                                    onChange={(val) => setEditing({ ...editing, content: val })}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [2, 3, 4, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'color': [] }, { 'background': [] }],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                            [{ 'align': [] }],
                                            ['link', 'image', 'video'],
                                            ['clean']
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        {/* Publishing Controls & Bottom Save */}
                        <div className="pt-8 border-t border-[#F4F6F8] flex flex-col gap-8">
                            <CustomToggle
                                enabled={editing.is_published || false}
                                onChange={(val) => setEditing({ ...editing, is_published: val })}
                                label="Live Publishing Status"
                                description="Toggling this on will instantly push this article to the public Journal facing parents and students."
                            />

                            <div className="flex items-center justify-end">
                                <button
                                    className="flex items-center justify-center gap-2 px-10 py-5 bg-[#334a89] text-white rounded-[20px] font-bold text-[14px] uppercase tracking-widest hover:bg-[#15283D] shadow-[0_10px_20px_rgba(51,74,137,0.2)] hover:shadow-[0_15px_30px_rgba(21,40,61,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all group w-full sm:w-auto"
                                    onClick={handleSave}
                                    disabled={saving || !editing.title || !editing.content}
                                >
                                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />}
                                    {saving ? 'Saving Changes...' : 'Save Article'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}