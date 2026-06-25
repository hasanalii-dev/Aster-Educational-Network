import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

type NavItem = { label: string; path: string; icon: string; end?: boolean };
type NavSection = { title: string; items: NavItem[] };

const navSections: NavSection[] = [
    { title: 'Overview', items: [{ label: 'Dashboard', path: '/admin', icon: '◫', end: true }] },
    { title: 'Content', items: [
        { label: 'Site Settings', path: '/admin/settings', icon: '⚙' },
        { label: 'Journal', path: '/admin/journal', icon: '✎' },
        { label: 'Testimonials', path: '/admin/testimonials', icon: '❝' },
        { label: 'FAQs', path: '/admin/faqs', icon: '?' },
    ]},
    { title: 'Engagement', items: [{ label: 'Inquiries', path: '/admin/inquiries', icon: '✉' }] },
]

export default function AdminLayout() {
    const { user, loading, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) navigate('/admin/login', { replace: true })
    }, [user, loading, navigate])

    if (loading) return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#F3F4F6'}}><div className="adm-spin" /></div>)
    if (!user) return null

    const currentTitle = navSections.flatMap(s => s.items).find(i => i.end ? location.pathname === i.path : location.pathname.startsWith(i.path))?.label || 'Dashboard'

    return (
        <>
            <style>{styles}</style>
            <div className="adm-shell">
                {sidebarOpen && <div className="adm-sov" onClick={() => setSidebarOpen(false)} />}
                <aside className={`adm-sb ${sidebarOpen ? 'open' : ''}`}>
                    <div className="adm-sb-hd"><img src="/logo.jpg" alt="Aster" className="adm-sb-logo" /><div><span className="adm-sb-brand">Aster CMS</span><span className="adm-sb-ver">v1.0</span></div></div>
                    <nav className="adm-sb-nav">
                        {navSections.map(s => (
                            <div key={s.title} className="adm-ns"><span className="adm-nst">{s.title}</span>
                                {s.items.map(i => (<NavLink key={i.path} to={i.path} end={i.end} className={({isActive}) => `adm-ni ${isActive?'active':''}`} onClick={() => setSidebarOpen(false)}><span className="adm-nic">{i.icon}</span><span>{i.label}</span></NavLink>))}
                            </div>
                        ))}
                    </nav>
                    <div className="adm-sb-ft"><button className="adm-ni adm-so" onClick={async()=>{await signOut();navigate('/admin/login')}}><span className="adm-nic">⏻</span><span>Sign Out</span></button></div>
                </aside>
                <div className="adm-main">
                    <header className="adm-tb">
                        <div className="adm-tb-l"><button className="adm-hb" onClick={()=>setSidebarOpen(!sidebarOpen)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button><h1 className="adm-tb-t">{currentTitle}</h1></div>
                        <div className="adm-tb-r"><span className="adm-tb-em">{user.email}</span><div className="adm-tb-av">{user.email?.[0]?.toUpperCase()||'A'}</div></div>
                    </header>
                    <div className="adm-ct"><Outlet /></div>
                </div>
            </div>
        </>
    )
}

const styles = `
.adm-shell{display:flex;min-height:100vh;font-family:'Quicksand',sans-serif;background:#F3F4F6}
.adm-spin{width:36px;height:36px;border:3px solid #E7E5E4;border-top-color:#394da1;border-radius:50%;animation:aspin .6s linear infinite}
@keyframes aspin{to{transform:rotate(360deg)}}
.adm-sb{width:260px;background:#1C1F37;display:flex;flex-direction:column;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto;z-index:100}
.adm-sb-hd{display:flex;align-items:center;gap:12px;padding:24px 24px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
.adm-sb-logo{width:36px;height:36px;border-radius:0!important}
.adm-sb-brand{display:block;font-size:16px;font-weight:700;color:#FFF;letter-spacing:-.01em}
.adm-sb-ver{display:block;font-size:11px;color:rgba(255,255,255,.35);font-weight:500}
.adm-sb-nav{flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:8px}
.adm-ns{display:flex;flex-direction:column;gap:2px}
.adm-nst{font-size:11px;font-weight:600;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;padding:12px 12px 6px}
.adm-ni{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:500;color:rgba(255,255,255,.6);text-decoration:none;transition:all 200ms;cursor:pointer;border:none;background:none;width:100%;text-align:left;font-family:'Quicksand',sans-serif}
.adm-ni:hover{color:#FFF;background:rgba(255,255,255,.06)}
.adm-ni.active{color:#ffc715;background:rgba(255,199,21,.08);font-weight:600;border-left:3px solid #ffc715;padding-left:9px}
.adm-nic{font-size:16px;width:20px;text-align:center;flex-shrink:0}
.adm-sb-ft{padding:12px;border-top:1px solid rgba(255,255,255,.08)}
.adm-so{color:rgba(255,255,255,.4)!important}.adm-so:hover{color:#e97f7b!important;background:rgba(233,127,123,.08)!important}
.adm-main{flex:1;display:flex;flex-direction:column;min-width:0}
.adm-tb{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 32px;background:#FFF;border-bottom:1px solid #E7E5E4;flex-shrink:0}
.adm-tb-l{display:flex;align-items:center;gap:16px}
.adm-hb{display:none;align-items:center;justify-content:center;width:40px;height:40px;border:none;background:none;color:#44403C;cursor:pointer;border-radius:8px;transition:background 200ms}.adm-hb:hover{background:#F3F4F6}
.adm-tb-t{font-size:20px;font-weight:700;color:#1C1917;margin:0;letter-spacing:-.02em}
.adm-tb-r{display:flex;align-items:center;gap:12px}
.adm-tb-em{font-size:13px;color:#78716C;font-weight:500}
.adm-tb-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#394da1,#334a89);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
.adm-ct{flex:1;padding:32px;overflow-y:auto}
.adm-sov{display:none}
@media(max-width:900px){
.adm-sb{position:fixed;left:0;top:0;bottom:0;transform:translateX(-100%);transition:transform 300ms cubic-bezier(.16,1,.3,1);z-index:200}
.adm-sb.open{transform:translateX(0)}
.adm-sov{display:block;position:fixed;inset:0;background:rgba(28,31,55,.5);backdrop-filter:blur(4px);z-index:199}
.adm-hb{display:flex}.adm-tb{padding:0 20px}.adm-ct{padding:20px}.adm-tb-em{display:none}
}
/* Shared admin UI */
.adm-card{background:#FFF;border-radius:16px;border:1px solid #E7E5E4;padding:24px}
.adm-card-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.adm-card-t{font-size:16px;font-weight:700;color:#1C1917;margin:0}
.adm-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#394da1;color:#FFF;border:none;border-radius:10px;font-family:'Quicksand',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 200ms}.adm-btn:hover{background:#2e4091;transform:translateY(-1px)}
.adm-btn-s{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#FFF;color:#44403C;border:1.5px solid #E7E5E4;border-radius:10px;font-family:'Quicksand',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 200ms}.adm-btn-s:hover{background:#F3F4F6}
.adm-btn-d{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:#FEF2F2;color:#DC2626;border:1px solid #FCA5A5;border-radius:8px;font-family:'Quicksand',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 200ms}.adm-btn-d:hover{background:#FEE2E2}
.adm-inp{width:100%;height:44px;padding:0 14px;border:1.5px solid #E7E5E4;border-radius:10px;font-family:'Quicksand',sans-serif;font-size:14px;color:#1C1917;background:#FFF;outline:none;transition:border-color 200ms,box-shadow 200ms;box-sizing:border-box}.adm-inp:focus{border-color:#394da1;box-shadow:0 0 0 3px rgba(57,77,161,.1)}
.adm-ta{width:100%;min-height:120px;padding:12px 14px;border:1.5px solid #E7E5E4;border-radius:10px;font-family:'Quicksand',sans-serif;font-size:14px;color:#1C1917;background:#FFF;outline:none;resize:vertical;transition:border-color 200ms,box-shadow 200ms;box-sizing:border-box}.adm-ta:focus{border-color:#394da1;box-shadow:0 0 0 3px rgba(57,77,161,.1)}
.adm-lbl{display:block;font-size:13px;font-weight:600;color:#44403C;margin-bottom:6px}
.adm-tbl{width:100%;border-collapse:collapse}
.adm-tbl th{text-align:left;font-size:12px;font-weight:600;color:#78716C;text-transform:uppercase;letter-spacing:.05em;padding:12px 16px;border-bottom:1px solid #E7E5E4}
.adm-tbl td{padding:14px 16px;font-size:14px;color:#44403C;border-bottom:1px solid #F3F4F6}
.adm-tbl tr:hover td{background:#FAFAF9}
.adm-bdg{display:inline-flex;align-items:center;padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:600}
.adm-bdg-g{background:#DCFCE7;color:#16A34A}.adm-bdg-y{background:#FEF9C3;color:#CA8A04}.adm-bdg-gr{background:#F3F4F6;color:#6B7280}.adm-bdg-b{background:#DBEAFE;color:#2563EB}
.adm-empty{text-align:center;padding:48px 24px;color:#A8A29E;font-size:14px}
.adm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.adm-stat{background:#FFF;border-radius:16px;border:1px solid #E7E5E4;padding:24px;display:flex;flex-direction:column;gap:8px}
.adm-stat-v{font-size:32px;font-weight:800;color:#1C1917;letter-spacing:-.02em}
.adm-stat-l{font-size:13px;font-weight:500;color:#78716C}
`
