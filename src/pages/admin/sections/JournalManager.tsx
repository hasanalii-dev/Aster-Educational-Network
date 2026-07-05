import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus, Edit2, Trash2, Image as ImageIcon, Check } from 'lucide-react'
import Toast, { type ToastType } from '@/components/ui/Toast'
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

export default function JournalManager() {
    const { role } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [editing, setEditing] = useState<Partial<Article> | null>(null)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    // Toast state
    const [toast, setToast] = useState<{ message: string, type: ToastType, isVisible: boolean }>({
        message: '', type: 'success', isVisible: false
    })

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type, isVisible: true })
    }

    const fetchArticles = async () => {
        const { data } = await supabase.from('journal_articles').select('*').order('created_at', { ascending: false })
        if (data) setArticles(data)
    }

    useEffect(() => { fetchArticles() }, [])

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
            setEditing(null)
            fetchArticles()
        } catch (error: any) {
            showToast(error.message || 'Error saving article', 'error')
        } finally {
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

    if (editing) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 840 }}>
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    isVisible={toast.isVisible} 
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1C1917', letterSpacing: '-0.02em' }}>
                        {editing.id ? 'Edit Article' : 'Create New Article'}
                    </h3>
                    <button className="adm-btn-s" onClick={() => setEditing(null)}>← Back to List</button>
                </div>
                <div className="bg-white rounded-[24px] border border-[#E7E5E4] p-8 shadow-sm">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                            <label className="adm-lbl">Article Title</label>
                            <input className="adm-inp !h-12 !text-lg !font-medium" value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Enter an engaging title..." />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div>
                                <label className="adm-lbl">URL Slug</label>
                                <input className="adm-inp" value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated-from-title" />
                            </div>
                            <div className="relative">
                                <label className="adm-lbl">Category</label>
                                <div 
                                    className="adm-inp flex items-center justify-between cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>{editing.category || CATEGORIES[0]}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute z-50 w-full mt-2 bg-white border border-[#E7E5E4] rounded-xl shadow-lg overflow-hidden py-2"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <div 
                                                    key={cat} 
                                                    className="px-4 py-2 hover:bg-[#F3F4F6] cursor-pointer text-sm font-medium text-[#44403C] flex items-center justify-between"
                                                    onClick={() => {
                                                        setEditing({ ...editing, category: cat })
                                                        setIsDropdownOpen(false)
                                                    }}
                                                >
                                                    {cat}
                                                    {editing.category === cat && <Check size={14} className="text-[#394EA2]" />}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        
                        <div>
                            <label className="adm-lbl">Cover Image</label>
                            {editing.cover_image_url && (
                                <div className="relative group rounded-xl overflow-hidden mb-4 border border-[#E7E5E4]">
                                    <img src={editing.cover_image_url} alt="Cover" className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="adm-btn" onClick={() => fileInputRef.current?.click()}>
                                            <ImageIcon size={16} /> Change Image
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 12 }}>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    ref={fileInputRef} 
                                    onChange={handleImageUpload} 
                                    style={{ display: 'none' }} 
                                />
                                {!editing.cover_image_url && (
                                    <button 
                                        className="adm-btn-s" 
                                        onClick={() => fileInputRef.current?.click()} 
                                        disabled={uploadingImage}
                                    >
                                        <ImageIcon size={16} />
                                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                    </button>
                                )}
                                <input 
                                    className="adm-inp" 
                                    placeholder="Or paste image URL directly"
                                    style={{ flex: 1 }}
                                    value={editing.cover_image_url || ''} 
                                    onChange={e => setEditing({ ...editing, cover_image_url: e.target.value })} 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="adm-lbl">Excerpt (Short description)</label>
                            <textarea className="adm-ta" style={{ minHeight: 80 }} value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} placeholder="Write a brief summary to hook readers..." />
                        </div>
                        <div>
                            <label className="adm-lbl">Content</label>
                            <div className="bg-white text-black border border-[#E7E5E4] rounded-xl overflow-hidden" style={{ minHeight: 400, marginBottom: 20 }}>
                                <ReactQuill 
                                    theme="snow" 
                                    value={editing.content || ''} 
                                    onChange={(val) => setEditing({ ...editing, content: val })} 
                                    style={{ height: 360 }}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'color': [] }, { 'background': [] }],
                                            [{ 'script': 'sub'}, { 'script': 'super' }],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                            [{ 'indent': '-1'}, { 'indent': '+1' }],
                                            [{ 'align': [] }],
                                            ['link', 'image', 'video'],
                                            ['clean']
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="adm-lbl">Author Name</label>
                            <input className="adm-inp" value={editing.author_name || ''} onChange={e => setEditing({ ...editing, author_name: e.target.value })} placeholder="e.g. John Doe" />
                        </div>
                        
                        <div className="pt-4 border-t border-[#E7E5E4]">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${editing.is_published ? 'bg-[#16A34A]' : 'bg-[#D6D3D1]'}`}>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${editing.is_published ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={editing.is_published || false} 
                                    onChange={e => setEditing({ ...editing, is_published: e.target.checked })} 
                                /> 
                                <span className="font-semibold text-sm text-[#44403C] group-hover:text-[#1C1917]">Publish Article</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-8 pt-6 border-t border-[#E7E5E4]">
                        <button className="adm-btn !px-8 !py-3 !text-sm" onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Article'}
                        </button>
                        <button className="adm-btn-s !px-8 !py-3 !text-sm" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </div>
            </motion.div>
        )
    }

// Force Vite reload timestamp: 2026-07-03
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Toast 
                message={toast.message} 
                type={toast.type} 
                isVisible={toast.isVisible} 
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ margin: 0, color: '#78716C', fontSize: 15, fontWeight: 500 }}>
                    {articles.length} article{articles.length !== 1 ? 's' : ''} published
                </p>
                <button className="adm-btn !py-2.5 !px-5" onClick={() => setEditing({ ...emptyArticle })}>
                    <Plus size={16} /> New Article
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.length === 0 ? (
                    <div className="col-span-full adm-card text-center py-16 text-[#A8A29E]">
                        No articles found. Click "New Article" to get started!
                    </div>
                ) : (
                    articles.map(a => (
                        <motion.div 
                            key={a.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group"
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md ${a.is_published ? 'bg-[#DCFCE7]/90 text-[#16A34A] border border-[#16A34A]/20' : 'bg-white/90 text-[#6B7280] border border-[#E7E5E4]'}`}>
                                    {a.is_published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            
                            {a.cover_image_url ? (
                                <div className="h-48 w-full overflow-hidden">
                                    <img src={a.cover_image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={a.title} />
                                </div>
                            ) : (
                                <div className="h-48 w-full bg-[#F3F4F6] flex items-center justify-center text-[#A8A29E]">
                                    <ImageIcon size={32} />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-[#394EA2] px-3 py-1.5 rounded-md inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap shadow-sm">
                                        {a.category || 'General'}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-[#1C1917] mb-2 line-clamp-2 leading-tight">
                                    {a.title}
                                </h4>
                                <p className="text-sm text-[#78716C] mb-6 flex-1 line-clamp-2">
                                    {a.excerpt || 'No excerpt provided.'}
                                </p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
                                    <span className="text-xs text-[#A8A29E] font-medium">
                                        {new Date(a.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            className="p-2 text-[#78716C] hover:text-[#394EA2] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                                            onClick={() => setEditing(a)}
                                            title="Edit Article"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        {role !== 'moderator' && (
                                            <button 
                                                className="p-2 text-[#78716C] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                                                onClick={() => handleDelete(a.id)}
                                                title="Delete Article"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    )
}

