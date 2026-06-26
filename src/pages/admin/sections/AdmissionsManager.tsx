import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdmissionsManager() {
    const [admissions, setAdmissions] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const [selectedAdmission, setSelectedAdmission] = useState<any | null>(null)
    const [feedback, setFeedback] = useState('')

    const fetchAdmissions = async () => {
        let q = supabase.from('admissions').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data } = await q
        if (data) setAdmissions(data)
    }

    useEffect(() => { fetchAdmissions() }, [filter])

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('admissions').update({ status }).eq('id', id)
        fetchAdmissions()
    }

    const saveFeedback = async () => {
        if (!selectedAdmission) return
        await supabase.from('admissions').update({ admin_feedback: feedback }).eq('id', selectedAdmission.id)
        setSelectedAdmission(null)
        fetchAdmissions()
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {['all', 'submitted', 'under_review', 'assessment_booked', 'accepted', 'rejected'].map(s => (
                    <button key={s} className={filter === s ? 'adm-btn' : 'adm-btn-s'} style={{ padding: '8px 16px', textTransform: 'capitalize' }} onClick={() => setFilter(s)}>{s.replace('_', ' ')}</button>
                ))}
            </div>
            
            <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
                {admissions.length === 0 ? (
                    <div className="adm-empty">No admissions found.</div>
                ) : (
                    <table className="adm-tbl">
                        <thead><tr><th>Child Name</th><th>Grade</th><th>Parent</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {admissions.map(adm => (
                                <tr key={adm.id}>
                                    <td style={{ fontWeight: 600, color: '#1C1917' }}>{adm.child_full_name}</td>
                                    <td>{adm.grade_applying_for}</td>
                                    <td>
                                        <div style={{ fontSize: 13, color: '#44403C' }}>{adm.parent_name}</div>
                                        <div style={{ fontSize: 12, color: '#78716C' }}>{adm.parent_email}</div>
                                    </td>
                                    <td>
                                        <select style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #E7E5E4', fontSize: 12, fontFamily: 'Quicksand' }} value={adm.status} onChange={e => updateStatus(adm.id, e.target.value)}>
                                            <option value="submitted">Submitted</option>
                                            <option value="under_review">Under Review</option>
                                            <option value="assessment_booked">Assessment Booked</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td style={{ fontSize: 13, color: '#78716C' }}>{new Date(adm.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button className="adm-btn-s" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => { setSelectedAdmission(adm); setFeedback(adm.admin_feedback || '') }}>
                                            Add Feedback
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedAdmission && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
                    <div className="adm-card" style={{ width: '100%', maxWidth: 500 }}>
                        <div className="adm-card-hd">
                            <h3 className="adm-card-t">Feedback for {selectedAdmission.child_full_name}</h3>
                            <button className="adm-btn-s" style={{ padding: '4px 8px' }} onClick={() => setSelectedAdmission(null)}>✕</button>
                        </div>
                        <p style={{ fontSize: 13, color: '#5C5C61', marginBottom: 16 }}>This feedback will be visible to the parent on their dashboard.</p>
                        <textarea className="adm-ta" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="E.g. We would love to invite you for an assessment next week..." />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                            <button className="adm-btn-s" onClick={() => setSelectedAdmission(null)}>Cancel</button>
                            <button className="adm-btn" onClick={saveFeedback}>Save Feedback</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
