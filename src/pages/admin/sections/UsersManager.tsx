import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/admin/ToastProvider'
import { motion } from 'framer-motion'
import { ShieldAlert, User, Trash2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: 'super_admin' | 'moderator' | 'content_writer' | 'user';
    created_at: string;
}

export default function UsersManager() {
    const { role: currentUserRole, user: currentUser } = useAuth()
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

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
        fetchProfiles()
    }, [])

    const handleRoleChange = async (userId: string, newRole: Profile['role']) => {
        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
        if (error) {
            showToast('Failed to update user role. Ensure you have super_admin privileges.', 'error')
        } else {
            showToast('User role updated successfully', 'success')
            fetchProfiles()
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

        // We use an RPC function to securely delete the user from auth.users (which cascades to public.profiles)
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
            <div className="p-16 text-center">
                <ShieldAlert className="w-16 h-16 mx-auto text-[#DC2626] mb-4 opacity-80" />
                <h2 className="text-2xl font-bold text-[#1C1917] mb-2">Access Denied</h2>
                <p className="text-[#78716C]">Only Super Admins can access the User Management portal.</p>
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-center mb-6">
                <p className="m-0 text-[#78716C] text-[15px] font-medium">
                    {profiles.length} user{profiles.length !== 1 ? 's' : ''} total
                </p>
            </div>

            <div className="bg-white rounded-[20px] border border-[#E7E5E4] shadow-sm overflow-x-auto">
                {loading ? (
                    <div className="p-16 flex justify-center"><div className="adm-spin" /></div>
                ) : profiles.length === 0 ? (
                    <div className="p-16 text-center text-[#A8A29E] font-medium">No users found.</div>
                ) : (
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">User</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Email</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Joined</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile, index) => (
                                <motion.tr 
                                    variants={itemVariants}
                                    key={profile.id} 
                                    className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${index === profiles.length - 1 ? 'border-b-0' : ''}`}
                                >
                                    <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#E4F0F9] text-[#334a89] flex items-center justify-center font-bold text-sm shrink-0">
                                            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <User size={14} />}
                                        </div>
                                        {profile.full_name || 'Anonymous User'}
                                    </td>
                                    <td className="py-4 px-6 text-[#64748B] text-sm">{profile.email}</td>
                                    <td className="py-4 px-6 text-[#64748B] text-sm">
                                        {new Date(profile.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <select 
                                                className="bg-white border border-[#E2E8F0] text-[#1E293B] text-sm rounded-lg focus:ring-[#394da1] focus:border-[#394da1] p-2 pr-8 appearance-none"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 0.5rem center',
                                                    backgroundSize: '1em 1em'
                                                }}
                                                value={profile.role}
                                                onChange={(e) => handleRoleChange(profile.id, e.target.value as Profile['role'])}
                                            >
                                                <option value="super_admin">Super Admin</option>
                                                <option value="moderator">Moderator</option>
                                                <option value="content_writer">Content Writer</option>
                                                <option value="user">Standard User</option>
                                            </select>
                                            
                                            <button 
                                                className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors flex-shrink-0"
                                                onClick={() => handleDeleteUser(profile.id, profile.email)}
                                                title="Delete User completely"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    )
}
