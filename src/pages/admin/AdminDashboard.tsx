import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
    const [stats, setStats] = useState({ articles: 0, testimonials: 0, faqs: 0, inquiries: 0, newInquiries: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            const [a, t, f, i, ni] = await Promise.all([
                supabase.from('journal_articles').select('id', { count: 'exact', head: true }),
                supabase.from('testimonials').select('id', { count: 'exact', head: true }),
                supabase.from('faqs').select('id', { count: 'exact', head: true }),
                supabase.from('inquiries').select('id', { count: 'exact', head: true }),
                supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
            ])
            setStats({
                articles: a.count || 0, testimonials: t.count || 0, faqs: f.count || 0,
                inquiries: i.count || 0, newInquiries: ni.count || 0,
            })
        }
        fetchStats()
    }, [])

    return (
        <div>
            <div className="adm-grid" style={{ marginBottom: 32 }}>
                <div className="adm-stat" style={{ borderLeft: '4px solid #394da1' }}>
                    <span className="adm-stat-v">{stats.articles}</span>
                    <span className="adm-stat-l">Journal Articles</span>
                </div>
                <div className="adm-stat" style={{ borderLeft: '4px solid #ffc715' }}>
                    <span className="adm-stat-v">{stats.newInquiries}</span>
                    <span className="adm-stat-l">New Inquiries</span>
                </div>
                <div className="adm-stat" style={{ borderLeft: '4px solid #6ab39d' }}>
                    <span className="adm-stat-v">{stats.testimonials}</span>
                    <span className="adm-stat-l">Testimonials</span>
                </div>
                <div className="adm-stat" style={{ borderLeft: '4px solid #9765d1' }}>
                    <span className="adm-stat-v">{stats.faqs}</span>
                    <span className="adm-stat-l">FAQ Items</span>
                </div>
            </div>
            <div className="adm-card">
                <h3 className="adm-card-t" style={{ marginBottom: 12 }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a href="/admin/journal" className="adm-btn" style={{ textDecoration: 'none' }}>+ New Article</a>
                    <a href="/admin/inquiries" className="adm-btn-s" style={{ textDecoration: 'none' }}>View Inquiries ({stats.newInquiries} new)</a>
                    <a href="/admin/settings" className="adm-btn-s" style={{ textDecoration: 'none' }}>Site Settings</a>
                </div>
            </div>
        </div>
    )
}
