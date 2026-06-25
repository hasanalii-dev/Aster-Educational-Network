import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Inquiry { id: string; parent_name: string; email: string; phone: string; program_interest: string; message: string; status: string; created_at: string }

const statusColors: Record<string, string> = { new: 'adm-bdg-b', contacted: 'adm-bdg-y', enrolled: 'adm-bdg-g', archived: 'adm-bdg-gr' }

export default function InquiriesManager() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [filter, setFilter] = useState('all')

    const fetchInquiries = async () => {
        let q = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data } = await q
        if (data) setInquiries(data)
    }

    useEffect(() => { fetchInquiries() }, [filter])

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('inquiries').update({ status }).eq('id', id)
        fetchInquiries()
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {['all', 'new', 'contacted', 'enrolled', 'archived'].map(s => (
                    <button key={s} className={filter === s ? 'adm-btn' : 'adm-btn-s'} style={{ padding: '8px 16px', textTransform: 'capitalize' }} onClick={() => setFilter(s)}>{s}</button>
                ))}
            </div>
            <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
                {inquiries.length === 0 ? (
                    <div className="adm-empty">No inquiries found.</div>
                ) : (
                    <table className="adm-tbl">
                        <thead><tr><th>Name</th><th>Email</th><th>Program</th><th>Status</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                            {inquiries.map(inq => (
                                <tr key={inq.id}>
                                    <td style={{ fontWeight: 600, color: '#1C1917' }}>{inq.parent_name}</td>
                                    <td>{inq.email}</td>
                                    <td>{inq.program_interest || '—'}</td>
                                    <td><span className={`adm-bdg ${statusColors[inq.status] || 'adm-bdg-gr'}`}>{inq.status}</span></td>
                                    <td style={{ fontSize: 13, color: '#78716C' }}>{new Date(inq.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <select style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #E7E5E4', fontSize: 12, fontFamily: 'Quicksand' }} value={inq.status} onChange={e => updateStatus(inq.id, e.target.value)}>
                                            <option value="new">New</option><option value="contacted">Contacted</option><option value="enrolled">Enrolled</option><option value="archived">Archived</option>
                                        </select>
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
