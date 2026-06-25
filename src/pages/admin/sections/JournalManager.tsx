import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Article { id: string; title: string; slug: string; excerpt: string; content: string; cover_image_url: string; author_name: string; is_published: boolean; published_at: string | null; created_at: string }

const emptyArticle: Omit<Article, 'id' | 'created_at'> = { title: '', slug: '', excerpt: '', content: '', cover_image_url: '', author_name: '', is_published: false, published_at: null }

export default function JournalManager() {
    const [articles, setArticles] = useState<Article[]>([])
    const [editing, setEditing] = useState<Partial<Article> | null>(null)
    const [saving, setSaving] = useState(false)

    const fetchArticles = async () => {
        const { data } = await supabase.from('journal_articles').select('*').order('created_at', { ascending: false })
        if (data) setArticles(data)
    }

    useEffect(() => { fetchArticles() }, [])

    const handleSave = async () => {
        if (!editing?.title || !editing?.content) return
        setSaving(true)
        const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const payload = { ...editing, slug, updated_at: new Date().toISOString() }
        if (editing.is_published && !editing.published_at) payload.published_at = new Date().toISOString()

        if (editing.id) {
            await supabase.from('journal_articles').update(payload).eq('id', editing.id)
        } else {
            await supabase.from('journal_articles').insert(payload)
        }
        setSaving(false)
        setEditing(null)
        fetchArticles()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this article?')) return
        await supabase.from('journal_articles').delete().eq('id', id)
        fetchArticles()
    }

    if (editing) {
        return (
            <div style={{ maxWidth: 720 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1C1917' }}>{editing.id ? 'Edit Article' : 'New Article'}</h3>
                    <button className="adm-btn-s" onClick={() => setEditing(null)}>← Back</button>
                </div>
                <div className="adm-card">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div><label className="adm-lbl">Title</label><input className="adm-inp" value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
                        <div><label className="adm-lbl">Slug</label><input className="adm-inp" value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated-from-title" /></div>
                        <div><label className="adm-lbl">Excerpt</label><textarea className="adm-ta" style={{ minHeight: 80 }} value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
                        <div><label className="adm-lbl">Content</label><textarea className="adm-ta" style={{ minHeight: 240 }} value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div><label className="adm-lbl">Author</label><input className="adm-inp" value={editing.author_name || ''} onChange={e => setEditing({ ...editing, author_name: e.target.value })} /></div>
                            <div><label className="adm-lbl">Cover Image URL</label><input className="adm-inp" value={editing.cover_image_url || ''} onChange={e => setEditing({ ...editing, cover_image_url: e.target.value })} /></div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: editing.is_published ? '#16A34A' : '#78716C' }}>
                            <input type="checkbox" checked={editing.is_published || false} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} /> Published
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <button className="adm-btn" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Article'}</button>
                        <button className="adm-btn-s" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ margin: 0, color: '#78716C', fontSize: 14 }}>{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
                <button className="adm-btn" onClick={() => setEditing({ ...emptyArticle })}>+ New Article</button>
            </div>
            <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
                {articles.length === 0 ? (
                    <div className="adm-empty">No articles yet. Create your first one!</div>
                ) : (
                    <table className="adm-tbl">
                        <thead><tr><th>Title</th><th>Status</th><th>Author</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                            {articles.map(a => (
                                <tr key={a.id}>
                                    <td style={{ fontWeight: 600, color: '#1C1917' }}>{a.title}</td>
                                    <td><span className={`adm-bdg ${a.is_published ? 'adm-bdg-g' : 'adm-bdg-gr'}`}>{a.is_published ? 'Published' : 'Draft'}</span></td>
                                    <td>{a.author_name || '—'}</td>
                                    <td style={{ fontSize: 13, color: '#78716C' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                            <button className="adm-btn-s" style={{ padding: '6px 12px' }} onClick={() => setEditing(a)}>Edit</button>
                                            <button className="adm-btn-d" style={{ padding: '6px 12px' }} onClick={() => handleDelete(a.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
