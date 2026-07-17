import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ParentStory } from '@/types'
import { useToast } from '@/components/admin/ToastProvider'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Power } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function ParentStoriesManager() {
    const { role } = useAuth()
    const [stories, setStories] = useState<ParentStory[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [currentStory, setCurrentStory] = useState<Partial<ParentStory> | null>(null)
    const [saving, setSaving] = useState(false)
    const { showToast } = useToast()

    const fetchStories = async () => {
        const { data } = await supabase.from('parent_stories').select('*').order('created_at', { ascending: false })
        if (data) setStories(data as ParentStory[])
    }

    useEffect(() => { fetchStories() }, [])

    const toggleActive = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase.from('parent_stories').update({ is_active: !currentStatus }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
        } else {
            showToast('Status updated', 'success')
            fetchStories()
        }
    }

    const deleteStory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this story?')) return
        const { error } = await supabase.from('parent_stories').delete().eq('id', id)
        if (error) {
            showToast('Failed to delete story', 'error')
        } else {
            showToast('Story deleted successfully', 'success')
            fetchStories()
        }
    }

    const saveStory = async () => {
        if (!currentStory?.name || !currentStory?.role || !currentStory?.quote) {
            showToast("Please fill in all required fields.", 'error')
            return
        }

        setSaving(true)
        const { error } = currentStory.id
            ? await supabase.from('parent_stories').update(currentStory).eq('id', currentStory.id)
            : await supabase.from('parent_stories').insert([currentStory])

        setSaving(false)
        if (error) {
            showToast('Failed to save story', 'error')
        } else {
            showToast(`Story ${currentStory.id ? 'updated' : 'created'} successfully!`, 'success')
            setIsEditing(false)
            setCurrentStory(null)
            fetchStories()
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    if (isEditing && currentStory) return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[700px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="m-0 text-[24px] font-bold text-[#1C1917] tracking-tight">{currentStory.id ? 'Edit' : 'New'} Parent Story</h3>
                <button className="adm-btn-s !py-2" onClick={() => setIsEditing(false)}>← Back to List</button>
            </div>
            <div className="adm-card">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="adm-lbl">Parent Name *</label>
                            <input className="adm-inp" value={currentStory.name || ''} onChange={e => setCurrentStory({...currentStory, name: e.target.value})} placeholder="E.g. Sarah Ahmed" />
                        </div>
                        <div>
                            <label className="adm-lbl">Role / Grade *</label>
                            <input className="adm-inp" value={currentStory.role || ''} onChange={e => setCurrentStory({...currentStory, role: e.target.value})} placeholder="E.g. Parent of Grade 3 Student" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="adm-lbl">Image URL (Optional)</label>
                        <input className="adm-inp" value={currentStory.image || ''} onChange={e => setCurrentStory({...currentStory, image: e.target.value})} placeholder="https://..." />
                    </div>

                    <div>
                        <label className="adm-lbl">Quote *</label>
                        <textarea className="adm-ta" value={currentStory.quote || ''} onChange={e => setCurrentStory({...currentStory, quote: e.target.value})} placeholder="The story content..." />
                    </div>

                    <div className="flex items-center gap-6 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] w-fit">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${currentStory.is_active ? 'bg-[#16A34A]' : 'bg-[#D6D3D1]'}`}>
                                <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${currentStory.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                            <input type="checkbox" className="hidden" checked={currentStory.is_active || false} onChange={e => setCurrentStory({ ...currentStory, is_active: e.target.checked })} />
                            <span className="font-semibold text-sm text-[#44403C] group-hover:text-[#1C1917]">Story Active</span>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-[#E2E8F0]">
                    <button className="adm-btn" onClick={saveStory} disabled={saving}>{saving ? 'Saving...' : 'Save Story'}</button>
                    <button className="adm-btn-sec" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        </motion.div>
    )

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-center mb-6">
                <p className="m-0 text-[#78716C] text-[15px] font-medium">
                    {stories.length} stor{stories.length !== 1 ? 'ies' : 'y'} total
                </p>
                <button className="adm-btn !py-2.5 !px-5" onClick={() => { setCurrentStory({ is_active: true }); setIsEditing(true); }}>
                    <Plus size={16} /> Add Story
                </button>
            </div>
            
            <div className="bg-white rounded-[20px] border border-[#E7E5E4] shadow-sm overflow-x-auto">
                {stories.length === 0 ? (
                    <div className="p-16 text-center text-[#A8A29E] font-medium">No parent stories found. Click "Add Story" to create one.</div>
                ) : (
                    <table className="w-full min-w-[900px] text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Name</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Role</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Quote</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-center">Status</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.map((story, index) => (
                                <motion.tr 
                                    variants={itemVariants}
                                    key={story.id} 
                                    className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${index === stories.length - 1 ? 'border-b-0' : ''}`}
                                >
                                    <td className="py-4 px-6 font-semibold text-[#1E293B] whitespace-nowrap">{story.name}</td>
                                    <td className="py-4 px-6 text-[#64748B] text-sm whitespace-nowrap">{story.role}</td>
                                    <td className="py-4 px-6 text-[#64748B] text-sm">
                                        <div className="max-w-[300px] truncate">{story.quote}</div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {story.is_active 
                                            ? <span className="inline-block px-3 py-1 bg-[#DCFCE7] text-[#16A34A] text-xs font-bold rounded-full">Active</span>
                                            : <span className="inline-block px-3 py-1 bg-[#F1F5F9] text-[#94A3B8] text-xs font-bold rounded-full">Inactive</span>
                                        }
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#64748B] hover:text-[#16A34A] hover:bg-[#DCFCE7] rounded-lg transition-colors" onClick={() => toggleActive(story.id, story.is_active)} title="Toggle Status">
                                                <Power size={16} />
                                            </button>
                                            <button className="p-2 text-[#64748B] hover:text-[#394ea2] hover:bg-[#EFF6FF] rounded-lg transition-colors" onClick={() => { setCurrentStory(story); setIsEditing(true); }} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            {role !== 'moderator' && (
                                                <button className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors" onClick={() => deleteStory(story.id)} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
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
