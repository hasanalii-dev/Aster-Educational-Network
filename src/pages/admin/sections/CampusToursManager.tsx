import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CampusToursManager() {
    const [tours, setTours] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const [selectedTour, setSelectedTour] = useState<any | null>(null)
    const [note, setNote] = useState('')

    const fetchTours = async () => {
        let q = supabase.from('campus_tours').select('*').order('preferred_date', { ascending: true })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data } = await q
        if (data) setTours(data)
    }

    useEffect(() => { fetchTours() }, [filter])

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('campus_tours').update({ status }).eq('id', id)
        fetchTours()
    }

    const saveNote = async () => {
        if (!selectedTour) return
        await supabase.from('campus_tours').update({ admin_outcome_note: note }).eq('id', selectedTour.id)
        setSelectedTour(null)
        fetchTours()
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {['all', 'pending', 'scheduled', 'completed', 'cancelled'].map(s => (
                    <button key={s} className={filter === s ? 'adm-btn' : 'adm-btn-s'} style={{ padding: '8px 16px', textTransform: 'capitalize' }} onClick={() => setFilter(s)}>{s}</button>
                ))}
            </div>
            
            <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
                {tours.length === 0 ? (
                    <div className="adm-empty">No campus tours found.</div>
                ) : (
                    <table className="adm-tbl">
                        <thead><tr><th>Parent</th><th>Date & Time</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead>
                        <tbody>
                            {tours.map(tour => (
                                <tr key={tour.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#1C1917' }}>{tour.parent_name}</div>
                                        <div style={{ fontSize: 13, color: '#44403C' }}>{tour.email}</div>
                                        <div style={{ fontSize: 12, color: '#78716C' }}>{tour.phone}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#1C1917' }}>{new Date(tour.preferred_date).toLocaleDateString()}</div>
                                        <div style={{ fontSize: 13, color: '#78716C' }}>{tour.preferred_time_slot}</div>
                                    </td>
                                    <td>
                                        <select style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #E7E5E4', fontSize: 12, fontFamily: 'Quicksand' }} value={tour.status} onChange={e => updateStatus(tour.id, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td style={{ fontSize: 13, color: '#78716C' }}>{new Date(tour.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button className="adm-btn-s" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => { setSelectedTour(tour); setNote(tour.admin_outcome_note || '') }}>
                                            Add Note
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedTour && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
                    <div className="adm-card" style={{ width: '100%', maxWidth: 500 }}>
                        <div className="adm-card-hd">
                            <h3 className="adm-card-t">Note for {selectedTour.parent_name}</h3>
                            <button className="adm-btn-s" style={{ padding: '4px 8px' }} onClick={() => setSelectedTour(null)}>✕</button>
                        </div>
                        <p style={{ fontSize: 13, color: '#5C5C61', marginBottom: 16 }}>This note will be visible to the parent on their dashboard.</p>
                        <textarea className="adm-ta" value={note} onChange={e => setNote(e.target.value)} placeholder="E.g. We have confirmed your tour for 10:00 AM..." />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                            <button className="adm-btn-s" onClick={() => setSelectedTour(null)}>Cancel</button>
                            <button className="adm-btn" onClick={saveNote}>Save Note</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
