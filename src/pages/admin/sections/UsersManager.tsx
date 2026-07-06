import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/admin/ToastProvider'
import gsap from 'gsap'
import { ShieldAlert, User, Trash2, ChevronDown, Check, Users } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: 'super_admin' | 'moderator' | 'content_writer' | 'user';
    created_at: string;
}

// =========================================================
// CUSTOM SAAS ROLE DROPDOWN
// =========================================================
function CustomRoleSelect({ value, onChange, rowZIndex }: { value: string, onChange: (val: string) => void, rowZIndex: number }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const config: Record<string, { label: string, color: string }> = {
        'super_admin': { label: 'Super Admin', color: 'bg-rose-50 text-rose-700 border-rose-200' },
        'moderator': { label: 'Moderator', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        'content_writer': { label: 'Content Writer', color: 'bg-[#ffc715]/10 text-[#b38b0f] border-[#ffc715]/30' },
        'user': { label: 'Standard User', color: 'bg-gray-50 text-gray-700 border-gray-200' }
    }

    const activeConfig = config[value] || config['user']

    return (
        <div className="relative w-full max-w-[180px]" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : rowZIndex }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 font-['Quicksand'] font-bold text-[11px] uppercase tracking-widest outline-none ${activeConfig.color} ${isOpen ? 'ring-4 ring-[#334a89]/10 shadow-md' : 'hover:shadow-sm'}`}
            >
                <span className="truncate pr-2">{activeConfig.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`absolute right-0 top-[calc(100%+8px)] w-48 bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0_20px_40px_rgba(21,40,61,0.12)] overflow-hidden transition-all duration-300 origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                <div className="py-2 flex flex-col max-h-[240px] overflow-y-auto custom-scrollbar">
                    {Object.entries(config).map(([key, item]) => {
                        const isSelected = value === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => { onChange(key); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 font-['Quicksand'] text-[12px] font-bold uppercase tracking-widest transition-colors ${
                                    isSelected ? 'bg-[#F8F9FA] text-[#15283D]' : 'text-[#A0AEC0] hover:bg-[#F4F6F8] hover:text-[#15283D]'
                                }`}
                            >
                                {item.label}
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#334a89] shrink-0" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// =========================================================
// MAIN MANAGER COMPONENT
// =========================================================
export default function UsersManager() {
    const { role: currentUserRole, user: currentUser } = useAuth()
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    const tableRef = useRef<HTMLTableSectionElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const fetchProfiles = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
        if (error) {
            showToast('Failed to fetch users', 'error')
        } else if (data) {
            setProfiles(data as Profile[])
        }
        setLoading(false)
    }

    useEffect(() => {
        if (currentUserRole === 'super_admin') {
            fetchProfiles()
        }
    }, [currentUserRole])

    // GSAP Entrance & Stagger Animation
    useEffect(() => {
        if (!loading && profiles.length > 0 && containerRef.current && tableRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.users-header',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
                )

                gsap.fromTo('.adm-row',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
                )
            }, containerRef)
            return () => ctx.revert()
        }
    }, [profiles, loading])

    const handleRoleChange = async (userId: string, newRole: Profile['role']) => {
        setProfiles(prev => prev.map(p => p.id === userId ? { ...p, role: newRole } : p))

        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
        if (error) {
            showToast('Failed to update user role. Ensure you have super_admin privileges.', 'error')
            fetchProfiles()
        } else {
            showToast('User role updated successfully', 'success')
        }
    }

    const handleDeleteUser = async (userId: string, email: string) => {
        if (currentUser?.id === userId) {
            showToast("You cannot delete your own account.", "error");
            return;
        }

        if (!window.confirm(`WARNING: This will permanently delete the user account for ${email} from the database. This action cannot be undone.\n\nAre you sure you want to proceed?`)) {
            return;
        }

        const { error } = await supabase.rpc('delete_user_by_admin', { user_id_to_delete: userId });

        if (error) {
            console.error("Delete user error:", error);
            showToast(`Failed to delete user: ${error.message || 'Please ensure you have run the RPC setup script in SQL Editor.'}`, 'error');
        } else {
            showToast('User deleted successfully.', 'success');
            fetchProfiles();
        }
    }

    if (currentUserRole !== 'super_admin') {
        return (
            <div className="min-h-[600px] flex flex-col items-center justify-center p-16 text-center font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89]">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 border-4 border-rose-100 shadow-inner">
                    <ShieldAlert className="w-10 h-10 text-rose-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-[#15283D] mb-3 tracking-tight">Access Denied</h2>
                <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed">
                    Elevated permissions are required. Only Super Admins can access the User Management portal.
                </p>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 14px; height: 14px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(244, 246, 248, 0.4); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background-color: #CBD5E1; 
                    border-radius: 100px; 
                    border: 4px solid #FFFFFF; 
                    background-clip: padding-box; 
                    transition: background-color 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; border: 3px solid #FFFFFF; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header Area */}
            <div className="users-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight mb-2">Team & Users</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px]">Manage system access, assign roles, and secure the portal.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-[#334a89]/5 rounded-full border border-[#334a89]/10">
                    <Users className="w-4 h-4 text-[#334a89]" />
                    <span className="font-bold text-[13px] uppercase tracking-widest text-[#15283D]">
                        {profiles.length} Active Accounts
                    </span>
                </div>
            </div>

            {/* =========================================================
                MAIN DATA TABLE (Zero Horizontal Scroll Forced)
            ========================================================= */}
            <div
                className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] flex flex-col relative transform-gpu pb-2 min-h-[500px]"
                style={{ clipPath: 'inset(0 round 32px)' }}
            >
                {loading ? (
                    <div className="w-full p-6 min-h-[500px]">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-[20px] border border-[#F4F6F8] animate-pulse">
                                    <div className="w-12 h-12 rounded-full bg-[#F4F6F8] shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-[#F4F6F8] rounded-full w-1/4" />
                                    </div>
                                    <div className="w-48 h-4 bg-[#F4F6F8] rounded-full hidden md:block" />
                                    <div className="w-32 h-10 rounded-full bg-[#F4F6F8]" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : profiles.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center min-h-[500px]">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center mb-6 border border-[#E5E7EB] shadow-inner">
                            <Users className="w-8 h-8 text-[#A0AEC0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15283D] mb-3">No users found</h3>
                        <p className="text-[#5C5C61] font-medium text-[16px] max-w-sm leading-relaxed">
                            There are currently no authenticated users in the system.
                        </p>
                    </div>
                ) : (

                    <div className="w-full max-h-[700px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        {/* Removed min-w constraint.
                            Table now natively adapts to parent width without forcing scroll.
                        */}
                        <table className="w-full text-left border-collapse">

                            <thead className="sticky top-0 z-30 shadow-sm">
                            <tr>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB]">User Profile</th>
                                <th className="bg-[#F8F9FA] px-4 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden md:table-cell">Email Address</th>
                                <th className="bg-[#F8F9FA] px-4 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] hidden lg:table-cell">Date Joined</th>
                                <th className="bg-[#F8F9FA] px-6 py-6 text-[11px] font-bold text-[#A0AEC0] uppercase tracking-widest border-b border-[#E5E7EB] text-right">Access Role & Actions</th>
                            </tr>
                            </thead>

                            <tbody ref={tableRef} className="bg-white relative z-0">
                            {profiles.map((profile, index) => (
                                <tr key={profile.id} className="adm-row opacity-0 group hover:bg-[#F8F9FA]/50 transition-colors border-b border-[#F4F6F8] last:border-0 relative">

                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15283D] to-[#334a89] text-white flex items-center justify-center font-bold text-[14px] shadow-sm shrink-0">
                                                {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-[15px] md:text-[16px] text-[#15283D] mb-0.5 truncate">
                                                    {profile.full_name || 'Anonymous User'}
                                                </p>
                                                {/* Email displayed here on mobile, hidden on desktop */}
                                                <p className="text-[13px] text-[#5C5C61] md:hidden truncate">
                                                    {profile.email}
                                                </p>
                                                {currentUser?.id === profile.id && (
                                                    <span className="font-bold text-[10px] uppercase tracking-widest text-[#ffc715] mt-1 block">
                                                            You (Current Session)
                                                        </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-6 hidden md:table-cell">
                                            <span className="font-medium text-[14px] text-[#5C5C61] break-all">
                                                {profile.email}
                                            </span>
                                    </td>

                                    <td className="px-4 py-6 hidden lg:table-cell">
                                            <span className="font-bold text-[13px] text-[#A0AEC0]">
                                                {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                    </td>

                                    <td className="px-6 py-6">
                                        <div className="flex items-center justify-end gap-2 sm:gap-4">
                                            <CustomRoleSelect
                                                value={profile.role}
                                                onChange={(newRole) => handleRoleChange(profile.id, newRole as Profile['role'])}
                                                rowZIndex={profiles.length - index}
                                            />
                                            <button
                                                onClick={() => handleDeleteUser(profile.id, profile.email)}
                                                className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full transition-colors bg-rose-50/50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={currentUser?.id === profile.id}
                                                title={currentUser?.id === profile.id ? "Cannot delete active session" : "Delete User"}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}