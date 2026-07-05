import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { JobOpening } from '@/types'
import { useToast } from '@/components/admin/ToastProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, Plus, Power, PowerOff, X } from 'lucide-react'

export default function JobOpeningsManager() {
    const [jobs, setJobs] = useState<JobOpening[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [currentJob, setCurrentJob] = useState<Partial<JobOpening> | null>(null)
    const { showToast } = useToast()

    const fetchJobs = async () => {
        const { data } = await supabase.from('job_openings').select('*').order('created_at', { ascending: false })
        if (data) setJobs(data as JobOpening[])
    }

    useEffect(() => { fetchJobs() }, [])

    const toggleActive = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase.from('job_openings').update({ is_active: !currentStatus }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
        } else {
            showToast(`Job opening ${!currentStatus ? 'activated' : 'deactivated'} successfully`, 'success')
            fetchJobs()
        }
    }

    const saveJob = async () => {
        if (!currentJob?.title || !currentJob?.department) {
            showToast('Please fill in all required fields', 'error')
            return
        }

        const { error } = currentJob.id 
            ? await supabase.from('job_openings').update(currentJob).eq('id', currentJob.id)
            : await supabase.from('job_openings').insert([currentJob])
            
        if (error) {
            showToast('Failed to save job opening', 'error')
        } else {
            showToast(`Job opening ${currentJob.id ? 'updated' : 'created'} successfully`, 'success')
            setIsEditing(false)
            setCurrentJob(null)
            fetchJobs()
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

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[24px] border border-[#E7E5E4] shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-[#1E293B] m-0">Job Openings</h2>
                    <p className="text-sm text-[#64748B] mt-1">Manage career opportunities and open positions</p>
                </div>
                <button 
                    className="adm-btn flex items-center gap-2" 
                    onClick={() => { setCurrentJob({ is_active: true, type: 'Full-time', location: 'PECHS Junior Campus', department: 'Teachers and Educators' }); setIsEditing(true); }}
                >
                    <Plus size={18} />
                    New Opening
                </button>
            </div>
            
            <div className="bg-white rounded-[24px] border border-[#E7E5E4] shadow-sm overflow-hidden">
                {jobs.length === 0 ? (
                    <div className="p-16 text-center text-[#94A3B8] font-medium">No job openings found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Job Title</th>
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Details</th>
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job, index) => (
                                    <motion.tr 
                                        variants={itemVariants}
                                        key={job.id}
                                        className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${index === jobs.length - 1 ? 'border-b-0' : ''}`}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-[#1E293B] mb-1">{job.title}</div>
                                            <div className="text-[13px] text-[#64748B]">{job.department}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[12px] font-semibold text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded w-fit">{job.type}</span>
                                                <span className="text-[12px] text-[#64748B]">{job.location}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                job.is_active 
                                                    ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20' 
                                                    : 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20'
                                            }`}>
                                                {job.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${job.is_active ? 'text-[#DC2626] hover:bg-[#FEE2E2]' : 'text-[#16A34A] hover:bg-[#DCFCE7]'}`}
                                                    onClick={() => toggleActive(job.id, job.is_active)}
                                                    title={job.is_active ? "Deactivate" : "Activate"}
                                                >
                                                    {job.is_active ? <PowerOff size={16} /> : <Power size={16} />}
                                                    <span className="text-xs font-bold uppercase tracking-wide sr-only">Toggle</span>
                                                </button>
                                                <button 
                                                    className="p-2 text-[#64748B] hover:text-[#394ea2] hover:bg-[#EFF6FF] rounded-lg transition-colors flex items-center gap-2" 
                                                    onClick={() => { setCurrentJob(job); setIsEditing(true); }}
                                                    title="Edit Job"
                                                >
                                                    <Edit2 size={16} />
                                                    <span className="text-xs font-bold uppercase tracking-wide sr-only">Edit</span>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isEditing && currentJob && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} 
                            animate={{ scale: 1, y: 0 }} 
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[24px] shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            <div className="px-6 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
                                <h3 className="m-0 text-lg font-bold text-[#1E293B]">{currentJob.id ? 'Edit' : 'Create'} Job Opening</h3>
                                <button className="p-2 text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] rounded-full transition-colors" onClick={() => setIsEditing(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#475569] mb-2">Job Title <span className="text-[#DC2626]">*</span></label>
                                    <input 
                                        className="adm-in w-full bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white focus:border-[#394ea2] focus:ring-4 focus:ring-[#394ea2]/10 transition-all rounded-xl" 
                                        type="text" 
                                        value={currentJob.title || ''} 
                                        onChange={e => setCurrentJob({...currentJob, title: e.target.value})} 
                                        placeholder="E.g. Lead Math Teacher" 
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#475569] mb-2">Department <span className="text-[#DC2626]">*</span></label>
                                        <select 
                                            className="adm-in w-full bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white focus:border-[#394ea2] transition-all rounded-xl" 
                                            value={currentJob.department || 'Teachers and Educators'} 
                                            onChange={e => setCurrentJob({...currentJob, department: e.target.value})}
                                        >
                                            <option value="Teachers and Educators">Teachers and Educators</option>
                                            <option value="Academic Leaders and Coordinators">Academic Leaders and Coordinators</option>
                                            <option value="Sports Coaches">Sports Coaches</option>
                                            <option value="Specialists and Subject Experts">Specialists and Subject Experts</option>
                                            <option value="Student Support Professionals">Student Support Professionals</option>
                                            <option value="Admissions and Marketing Professionals">Admissions and Marketing Professionals</option>
                                            <option value="Operations and Administrative Teams">Operations and Administrative Teams</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#475569] mb-2">Type</label>
                                        <select 
                                            className="adm-in w-full bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white focus:border-[#394ea2] transition-all rounded-xl" 
                                            value={currentJob.type || 'Full-time'} 
                                            onChange={e => setCurrentJob({...currentJob, type: e.target.value})}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#475569] mb-2">Location</label>
                                        <select 
                                            className="adm-in w-full bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white focus:border-[#394ea2] transition-all rounded-xl" 
                                            value={currentJob.location || 'PECHS Junior Campus'} 
                                            onChange={e => setCurrentJob({...currentJob, location: e.target.value})}
                                        >
                                            <option value="PECHS Junior Campus">PECHS Junior Campus</option>
                                            <option value="PECHS Senior Campus">PECHS Senior Campus</option>
                                            <option value="Clifton Campus">Clifton Campus</option>
                                            <option value="Riyadh Campus">Riyadh Campus</option>
                                            <option value="Multiple Campuses">Multiple Campuses</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#475569] mb-2">Description</label>
                                    <textarea 
                                        className="adm-ta w-full min-h-[160px] bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white focus:border-[#394ea2] focus:ring-4 focus:ring-[#394ea2]/10 transition-all rounded-xl" 
                                        value={currentJob.description || ''} 
                                        onChange={e => setCurrentJob({...currentJob, description: e.target.value})} 
                                        placeholder="Role overview, responsibilities, qualifications..." 
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-5 border-t border-[#F1F5F9] bg-[#F8FAFC] flex justify-end gap-3 mt-auto">
                                <button className="adm-btn-sec" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button className="adm-btn" onClick={saveJob}>Save Job</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
