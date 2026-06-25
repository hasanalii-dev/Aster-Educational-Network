import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface FAQ { id: string; category: string; question: string; answer: string; sort_order: number }

export default function FAQManager() {
    const [items, setItems] = useState<FAQ[]>([])
    const [ed, setEd] = useState<Partial<FAQ> | null>(null)
    const [sv, setSv] = useState(false)

    const fetch_ = async () => {
        const { data } = await supabase.from('faqs').select('*').order('category').order('sort_order')
        if (data) setItems(data)
    }
    useEffect(() => { fetch_() }, [])

    const save = async () => {
        if (!ed?.question || !ed?.answer || !ed?.category) return
        setSv(true)
        if (ed.id) await supabase.from('faqs').update(ed).eq('id', ed.id)
        else await supabase.from('faqs').insert(ed)
        setSv(false); setEd(null); fetch_()
    }

    const del = async (id: string) => {
        if (!confirm('Delete this FAQ?')) return
        await supabase.from('faqs').delete().eq('id', id)
        fetch_()
    }

    if (ed) return (
        <div style={{ maxWidth: 600 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{ed.id ? 'Edit' : 'New'} FAQ</h3>
                <button className="adm-btn-s" onClick={() => setEd(null)}>← Back</button>
            </div>
            <div className="adm-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label className="adm-lbl">Category</label>
                        <input className="adm-inp" value={ed.category || ''} onChange={e => setEd({ ...ed, category: e.target.value })} placeholder="Admissions, Academics, Campus Life..." />
                    </div>
                    <div>
                        <label className="adm-lbl">Question</label>
                        <input className="adm-inp" value={ed.question || ''} onChange={e => setEd({ ...ed, question: e.target.value })} />
                    </div>
                    <div>
                        <label className="adm-lbl">Answer</label>
                        <textarea className="adm-ta" value={ed.answer || ''} onChange={e => setEd({ ...ed, answer: e.target.value })} />
                    </div>
                    <div>
                        <label className="adm-lbl">Sort Order</label>
                        <input className="adm-inp" type="number" style={{ width: 100 }} value={ed.sort_order || 0} onChange={e => setEd({ ...ed, sort_order: +e.target.value })} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <button className="adm-btn" onClick={save} disabled={sv}>{sv ? 'Saving...' : 'Save'}</button>
                    <button className="adm-btn-s" onClick={() => setEd(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )

    const grouped = items.reduce<Record<string, FAQ[]>>((acc, faq) => {
        if (!acc[faq.category]) acc[faq.category] = []
        acc[faq.category].push(faq)
        return acc
    }, {})

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <p style={{ margin: 0, color: '#78716C', fontSize: 14 }}>{items.length} FAQ{items.length !== 1 ? 's' : ''}</p>
                <button className="adm-btn" onClick={() => setEd({ category: '', question: '', answer: '', sort_order: 0 })}>+ New FAQ</button>
            </div>
            {Object.keys(grouped).length === 0 ? (
                <div className="adm-card"><div className="adm-empty">No FAQs yet. Create your first one!</div></div>
            ) : (
                Object.entries(grouped).map(([cat, faqs]) => (
                    <div key={cat} className="adm-card" style={{ marginBottom: 16, padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '14px 20px', background: '#FAFAF9', borderBottom: '1px solid #E7E5E4' }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#394da1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat}</span>
                        </div>
                        <table className="adm-tbl">
                            <tbody>
                                {faqs.map(faq => (
                                    <tr key={faq.id}>
                                        <td style={{ fontWeight: 600, color: '#1C1917' }}>{faq.question}</td>
                                        <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#78716C', fontSize: 13 }}>{faq.answer}</td>
                                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                                <button className="adm-btn-s" style={{ padding: '6px 12px' }} onClick={() => setEd(faq)}>Edit</button>
                                                <button className="adm-btn-d" style={{ padding: '6px 12px' }} onClick={() => del(faq.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    )
}
