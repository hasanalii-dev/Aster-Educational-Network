import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import {
    LayoutDashboard, Settings, PenTool, MessageSquareQuote,
    HelpCircle, Map, GraduationCap, Mail, LogOut, Menu,
    Briefcase, FileText, X, ChevronRight, Sparkles, Users, Globe
} from 'lucide-react'
import { LogoutModal } from '@/components/ui/LogoutModal'
import { ToastProvider } from '@/components/admin/ToastProvider'

type NavItem = { label: string; path: string; icon: React.ReactNode; end?: boolean };
type NavSection = { title: string; items: NavItem[] };

const navSections: NavSection[] = [
    { title: 'Overview', items: [
        { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} />, end: true },
        { label: 'Return to Website', path: '/', icon: <Globe size={18} /> }
    ]},
    { title: 'Content Management', items: [
            { label: 'Site Settings', path: '/admin/settings', icon: <Settings size={18} /> },
            { label: 'Journal & News', path: '/admin/journal', icon: <PenTool size={18} /> },
            { label: 'Parent Stories', path: '/admin/parent-stories', icon: <MessageSquareQuote size={18} /> },
            { label: 'Newsletter', path: '/admin/newsletter', icon: <Mail size={18} /> },
            { label: 'Job Openings', path: '/admin/job-openings', icon: <Briefcase size={18} /> },
            { label: 'Job Applications', path: '/admin/job-applications', icon: <FileText size={18} /> },
            { label: 'FAQs', path: '/admin/faqs', icon: <HelpCircle size={18} /> },
        ]},
    { title: 'Admissions & Engagement', items: [
            { label: 'Campus Tours', path: '/admin/campus-tours', icon: <Map size={18} /> },
            { label: 'Admissions', path: '/admin/admissions', icon: <GraduationCap size={18} /> },
            { label: 'Inquiries', path: '/admin/inquiries', icon: <Mail size={18} /> }
        ] },
    { title: 'System', items: [
            { label: 'User Management', path: '/admin/users', icon: <Users size={18} /> }
        ] }
]

export default function AdminLayout() {
    const { user, role, loading, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    useEffect(() => {
        if (!loading && (!user || role === 'user')) navigate('/admin/login', { replace: true })
    }, [user, role, loading, navigate])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (sidebarOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
        return () => { document.body.style.overflow = 'unset' }
    }, [sidebarOpen])

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] gap-4">
            <div className="w-12 h-12 border-[3px] border-[#334a89]/20 border-t-[#334a89] rounded-full animate-spin" />
            <p className="font-['Quicksand'] font-bold text-[12px] tracking-widest text-[#334a89] uppercase">Authenticating...</p>
        </div>
    )
    if (!user || role === 'user') return null

    const filteredSections = navSections.map(section => {
        if (role === 'content_writer') {
            if (section.title === 'Overview') return section
            if (section.title === 'Content Management') {
                return {
                    ...section,
                    items: section.items.filter(item => item.label !== 'Site Settings')
                }
            }
            return null
        }
        if (role === 'moderator' || role === 'super_admin') {
            if (section.title === 'System' && role !== 'super_admin') return null
            return section
        }
        return null
    }).filter(Boolean) as NavSection[]

    const currentTitle = filteredSections.flatMap(s => s.items).find(i => i.end ? location.pathname === i.path : location.pathname.startsWith(i.path))?.label || 'Dashboard'

    return (
        <ToastProvider>

            {/* Global Legacy Class Overrides & Scrollbars */}
            <style>{styles}</style>

            <div className={`admin-container flex min-h-screen font-['Quicksand'] selection:bg-[#ffc715]/20 selection:text-[#ffc715] ${location.pathname === '/admin' ? 'bg-[#050505]' : 'bg-[#F8F9FA]'}`}>

                {/* =========================================================
                    MOBILE OVERLAY
                ========================================================= */}
                <div
                    className={`fixed inset-0 bg-[#15283D]/40 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setSidebarOpen(false)}
                />

                {/* =========================================================
                    OBSIDIAN SIDEBAR
                ========================================================= */}
                <aside className={`fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-[#0A0A0A] border-r border-white/5 flex flex-col shrink-0 z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-8 py-8 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                                <img src="https://aster.edu.pk/logo.jpg" alt="Aster" className="w-full h-full object-cover opacity-90" />
                            </div>
                            <div>
                                <span className="block font-bold text-[16px] text-white tracking-tight">Aster CMS</span>
                                <span className="block font-bold text-[10px] uppercase tracking-widest text-[#ffc715]">System v2.0</span>
                            </div>
                        </div>
                        <button className="lg:hidden text-white/50 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar-sidebar">
                        {filteredSections.map((s) => (
                            <div key={s.title} className="flex flex-col gap-1">
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 pl-4 mb-2">
                                    {s.title}
                                </span>
                                {s.items.map(i => (
                                    <NavLink
                                        key={i.path}
                                        to={i.path}
                                        end={i.end}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({isActive}) => `
                                            flex items-center justify-between px-4 py-3 rounded-[14px] font-bold text-[13px] tracking-wide transition-all duration-300 group
                                            ${isActive
                                            ? 'bg-[#ffc715]/10 text-[#ffc715] shadow-[0_8px_16px_rgba(255,199,21,0.05)]'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`transition-transform duration-300 ${/* isActive logic handled by react-router implicitly via class string */ ''} group-hover:scale-110`}>
                                                {i.icon}
                                            </span>
                                            <span>{i.label}</span>
                                        </div>
                                        {/* Subtle active indicator arrow */}
                                        <ChevronRight className="w-4 h-4 opacity-0 -ml-4 transition-all duration-300 group-[.active]:opacity-100 group-[.active]:ml-0 group-[.active]:text-[#ffc715] text-white/20" />
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 shrink-0 border-t border-white/5 bg-black/10">
                        <button
                            className="w-full flex items-center justify-between px-4 py-3 rounded-[14px] font-bold text-[13px] tracking-wide text-rose-400/70 hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-300 group"
                            onClick={() => setShowLogoutModal(true)}
                        >
                            <div className="flex items-center gap-3">
                                <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
                                <span>Terminate Session</span>
                            </div>
                        </button>
                    </div>
                </aside>

                {/* =========================================================
                    MAIN CANVAS
                ========================================================= */}
                <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar relative ${location.pathname === '/admin' ? 'bg-[#050505]' : 'bg-[#F8F9FA]'}`}>

                    {/* Glassmorphic Topbar */}
                    <header className={`sticky top-0 z-40 h-[80px] backdrop-blur-xl border-b flex items-center justify-between shrink-0 px-6 md:px-12 transition-colors duration-300 ${location.pathname === '/admin' ? 'bg-[#0A0A0A]/80 border-white/5' : 'bg-white/80 border-[#E5E7EB]'}`}>
                        <div className="flex items-center gap-4">
                            <button
                                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${location.pathname === '/admin' ? 'bg-[#141414] hover:bg-[#1f1f1f] text-white' : 'bg-[#F4F6F8] hover:bg-[#E5E7EB] text-[#15283D]'}`}
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={20} />
                            </button>
                            <div className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-full border ${location.pathname === '/admin' ? 'bg-[#141414] border-white/10' : 'bg-[#F4F6F8] border-[#E5E7EB]'}`}>
                                <Sparkles className={`w-4 h-4 ${location.pathname === '/admin' ? 'text-[#ffc715]' : 'text-[#334a89]'}`} />
                                <span className={`font-bold text-[12px] uppercase tracking-widest ${location.pathname === '/admin' ? 'text-white/60' : 'text-[#5C5C61]'}`}>
                                    {currentTitle}
                                </span>
                            </div>
                        </div>

                        {/* Admin Profile Pill */}
                        <div className={`flex items-center gap-3 pl-4 py-2 pr-2 rounded-full border shadow-sm hover:shadow-md transition-shadow cursor-default ${location.pathname === '/admin' ? 'bg-[#141414] border-white/10' : 'bg-white border-[#E5E7EB]'}`}>
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className={`font-bold text-[13px] leading-tight capitalize ${location.pathname === '/admin' ? 'text-white' : 'text-[#15283D]'}`}>{role?.replace('_', ' ') || 'Admin'}</span>
                                <span className={`font-medium text-[11px] ${location.pathname === '/admin' ? 'text-white/50' : 'text-[#A0AEC0]'}`}>{user.user_metadata?.full_name || user.email}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#15283D] flex items-center justify-center overflow-hidden shadow-inner shrink-0 border border-white/10">
                                <img src={user.user_metadata?.custom_avatar_url || user.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`} alt="Admin Avatar" className="w-[120%] h-[120%] object-cover object-bottom" />
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 p-6 md:p-12">
                        <div className="max-w-[1600px] mx-auto">
                            <Outlet />
                        </div>
                    </main>

                </div>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={async () => {
                    await signOut();
                    setShowLogoutModal(false);
                    navigate('/admin/login');
                }}
            />
        </ToastProvider>
    )
}

// =========================================================
// GLOBAL FALLBACK STYLES (For Legacy Pages) & SCROLLBARS
// =========================================================
const styles = `
/* Custom Premium Scrollbars */
.custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
    background-color: #CBD5E1; 
    border-radius: 100px; 
    border: 4px solid #F8F9FA; /* Matches the canvas background to float */
    background-clip: padding-box; 
    transition: background-color 0.3s ease;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; border-width: 3px; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Custom Sidebar Scrollbar */
.custom-scrollbar-sidebar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar-sidebar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar-sidebar::-webkit-scrollbar-thumb { 
    background-color: rgba(255,255,255,0.2); 
    border-radius: 100px; 
}
.custom-scrollbar-sidebar::-webkit-scrollbar-thumb:hover { background-color: rgba(255,255,255,0.4); }

/* Force Quicksand on all headings in Admin Panel */
.admin-container h1, .admin-container h2, .admin-container h3, .admin-container h4, .admin-container h5, .admin-container h6 {
    font-family: 'Quicksand', sans-serif !important;
}

/* 
   LEGACY .adm-* CLASSES 
   (Upgraded to match the new Awwwards-tier design so older pages don't look broken)
*/
.adm-card { background: #FFF; border-radius: 32px; border: 1px solid #E5E7EB; padding: 32px; box-shadow: 0 20px 40px rgba(21,40,61,0.04); }
.adm-card-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.adm-card-t { font-size: 20px; font-weight: 800; color: #15283D; margin: 0; letter-spacing: -0.02em; }

.adm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; background: #334a89; color: #FFF; border: none; border-radius: 100px; font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 300ms; }
.adm-btn:hover { background: #15283D; box-shadow: 0 10px 20px rgba(51,74,137,0.2); transform: translateY(-1px); }

.adm-btn-s { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; background: #F4F6F8; color: #5C5C61; border: border: transparent; border-radius: 100px; font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 300ms; }
.adm-btn-s:hover { background: #E5E7EB; color: #15283D; }

.adm-btn-d { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(244, 63, 94, 0.1); color: #F43F5E; border: none; border-radius: 100px; font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 300ms; }
.adm-btn-d:hover { background: rgba(244, 63, 94, 0.15); color: #E11D48; }

.adm-inp { width: 100%; height: 52px; padding: 0 20px; border: 1px solid transparent; border-radius: 20px; font-family: 'Quicksand', sans-serif; font-size: 15px; font-weight: 500; color: #15283D; background: #F4F6F8; outline: none; transition: all 300ms; box-sizing: border-box; }
.adm-inp:focus { background: #FFF; border-color: rgba(51,74,137,0.3); box-shadow: 0 0 0 4px rgba(51,74,137,0.1); }

.adm-ta { width: 100%; min-height: 140px; padding: 20px; border: 1px solid transparent; border-radius: 24px; font-family: 'Quicksand', sans-serif; font-size: 15px; font-weight: 500; color: #15283D; background: #F4F6F8; outline: none; resize: vertical; transition: all 300ms; box-sizing: border-box; }
.adm-ta:focus { background: #FFF; border-color: rgba(51,74,137,0.3); box-shadow: 0 0 0 4px rgba(51,74,137,0.1); }

.adm-lbl { display: block; font-size: 11px; font-weight: 700; color: rgba(21,40,61,0.6); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px; padding-left: 4px; }

.adm-tbl { width: 100%; border-collapse: collapse; min-width: 800px; }
.adm-tbl th { text-align: left; font-size: 11px; font-weight: 700; color: #A0AEC0; text-transform: uppercase; letter-spacing: 0.15em; padding: 20px 24px; border-bottom: 1px solid #E5E7EB; background: #F8F9FA; }
.adm-tbl td { padding: 20px 24px; font-size: 14px; font-weight: 500; color: #5C5C61; border-bottom: 1px solid #F4F6F8; transition: background 200ms; }
.adm-tbl tr:hover td { background: rgba(248,249,250,0.5); }

.adm-bdg { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.adm-bdg-g { background: #DCFCE7; color: #16A34A; }
.adm-bdg-y { background: rgba(255,199,21,0.1); color: #b38b0f; }
.adm-bdg-gr { background: #F4F6F8; color: #A0AEC0; }
.adm-bdg-b { background: #DBEAFE; color: #2563EB; }

.adm-empty { text-align: center; padding: 64px 24px; color: #A0AEC0; font-size: 15px; font-weight: 500; }
`