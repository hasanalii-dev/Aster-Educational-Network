import { useEffect, useState, Fragment } from 'react'
import { supabase } from '@/lib/supabase'
import type { JobOpening } from '@/types'
import { useToast } from '@/components/admin/ToastProvider'
import { AdminSelect } from '@/components/admin/AdminSelect'
import { motion } from 'framer-motion'
import { FileText, Mail, Phone, ChevronDown } from 'lucide-react'

export default function JobApplicationsManager() {
    const [applications, setApplications] = useState<any[]>([])
    const [jobsMap, setJobsMap] = useState<Record<string, JobOpening>>({})
    const [filter, setFilter] = useState('all')
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const { showToast } = useToast()

    const fetchData = async () => {
        const { data: jobsData } = await supabase.from('job_openings').select('*')
        if (jobsData) {
            const map: Record<string, JobOpening> = {}
            jobsData.forEach(j => map[j.id] = j)
            setJobsMap(map)
        }

        let q = supabase.from('job_applications').select('*').order('created_at', { ascending: false })
        if (filter !== 'all') q = q.eq('status', filter)
        const { data: appsData } = await q
        if (appsData) setApplications(appsData)
    }

    useEffect(() => { fetchData() }, [filter])

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('job_applications').update({ status }).eq('id', id)
        if (error) {
            showToast('Failed to update status', 'error')
        } else {
            showToast('Status updated successfully', 'success')
            fetchData()
        }
    }

    const STATUS_OPTIONS = [
        { label: 'New', value: 'New' },
        { label: 'Reviewed', value: 'Reviewed' },
        { label: 'Interviewing', value: 'Interviewing' },
        { label: 'Rejected', value: 'Rejected' }
    ]

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
            <div className="flex flex-wrap gap-2 mb-6">
                {['all', 'New', 'Reviewed', 'Interviewing', 'Rejected'].map(s => (
                    <button 
                        key={s} 
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                            filter === s 
                                ? 'bg-[#394ea2] text-white shadow-md transform scale-105' 
                                : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
                        }`} 
                        onClick={() => setFilter(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>
            
            <div className="bg-white rounded-[20px] border border-[#E7E5E4] shadow-sm overflow-visible">
                {applications.length === 0 ? (
                    <div className="p-16 text-center text-[#A8A29E] font-medium">No applications found.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Applicant</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Position</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Contact</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => {
                                const job = jobsMap[app.job_id]
                                return (
                                    <Fragment key={app.id}>
                                        <motion.tr 
                                            variants={itemVariants}
                                            className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${index === applications.length - 1 && expandedId !== app.id ? 'border-b-0' : ''} ${expandedId === app.id ? 'bg-[#F8FAFC]' : ''}`}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-[#1E293B] mb-1">{app.first_name} {app.last_name}</div>
                                                <button 
                                                    className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-1 transition-colors mt-2 ${expandedId === app.id ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A]' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'}`}
                                                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                                                >
                                                    Cover Letter & Resume
                                                    <ChevronDown size={12} className={`transform transition-transform ${expandedId === app.id ? 'rotate-180' : ''}`} />
                                                </button>
                                            </td>
                                            <td className="py-4 px-6">
                                                {!app.job_id ? (
                                                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                                                        General Application
                                                    </div>
                                                ) : job ? (
                                                    <div className="flex flex-col gap-1">
                                                        <div className="text-[13px] font-bold text-[#394ea2]">{job.title}</div>
                                                        <div className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded w-fit">{job.location}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-[12px] font-bold text-[#DC2626] bg-[#FEF2F2] px-2 py-1 rounded">Deleted Job</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <a href={`mailto:${app.email}`} className="text-[13px] text-[#394ea2] hover:underline flex items-center gap-1.5"><Mail size={12} /> {app.email}</a>
                                                    <a href={`tel:${app.phone}`} className="text-[12px] text-[#64748B] hover:text-[#1E293B] flex items-center gap-1.5"><Phone size={12} /> {app.phone}</a>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6" style={{ width: 180 }}>
                                                <AdminSelect 
                                                    value={app.status} 
                                                    options={STATUS_OPTIONS} 
                                                    onChange={(val) => updateStatus(app.id, val)} 
                                                />
                                            </td>
                                            <td className="py-4 px-6 text-right text-[#64748B] text-sm whitespace-nowrap">
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </td>
                                        </motion.tr>
                                        {expandedId === app.id && (
                                            <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                                                <td colSpan={5} className="py-4 px-6">
                                                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
                                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F1F5F9]">
                                                            <h5 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider m-0">Cover Letter</h5>
                                                            <a href={app.resume_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-[#EFF6FF] text-[#394ea2] hover:bg-[#DBEAFE] font-bold text-xs rounded-lg transition-colors">
                                                                <FileText size={14} /> Open Resume / CV
                                                            </a>
                                                        </div>
                                                        <p className="text-[#334155] whitespace-pre-wrap text-[14px] leading-relaxed">
                                                            {app.cover_letter || <span className="italic text-[#94A3B8]">No cover letter provided.</span>}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    )
}
