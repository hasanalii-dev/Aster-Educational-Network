import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/admin/ToastProvider'
import { motion } from 'framer-motion'
import { Download, Mail, Users } from 'lucide-react'

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    const fetchData = async () => {
        setLoading(true)
        const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false })
        if (data) setSubscribers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleBroadcast = () => {
        const activeSubscribers = subscribers.filter(s => s.status === 'subscribed').map(s => s.email)
        if (activeSubscribers.length === 0) {
            showToast('No active subscribers to send an email to.', 'error')
            return
        }

        const bccList = activeSubscribers.join(',')
        
        // Fallback: Copy to clipboard just in case mailto doesn't work
        navigator.clipboard.writeText(bccList).then(() => {
            showToast('Emails copied to clipboard! Opening email client...', 'success')
        }).catch(() => {
            showToast('Opening email client...', 'success')
        });

        const subject = encodeURIComponent('Update from The Aster School')
        const mailtoLink = `mailto:?bcc=${bccList}&subject=${subject}`
        
        // Execute mailto in the current window to avoid opening a blank tab
        window.location.href = mailtoLink
    }

    const handleExportCSV = () => {
        if (subscribers.length === 0) {
            showToast('No subscribers to export.', 'error')
            return
        }
        const headers = 'Email,Status,Date\n'
        const rows = subscribers.map(s => `${s.email},${s.status},${new Date(s.created_at).toLocaleDateString()}`).join('\n')
        const csv = headers + rows
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'aster_newsletter_subscribers.csv'
        a.click()
        URL.revokeObjectURL(url)
        showToast('Subscribers exported successfully', 'success')
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
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-6 rounded-[24px] border border-[#E7E5E4] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-full flex items-center justify-center text-[#394ea2]">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-1">Total Subscribers</div>
                        <div className="text-3xl font-black text-[#1E293B]">{subscribers.length}</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button 
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#E2E8F0] text-[#475569] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-colors shadow-sm"
                        onClick={handleExportCSV}
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                    <button 
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#394ea2] text-white font-bold text-sm rounded-xl hover:bg-[#2e3e80] transition-colors shadow-md transform hover:-translate-y-0.5"
                        onClick={handleBroadcast}
                    >
                        <Mail size={18} />
                        Broadcast
                    </button>
                </div>
            </div>
            
            <div className="bg-white rounded-[24px] border border-[#E7E5E4] shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-16 text-center text-[#94A3B8] font-medium flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#E2E8F0] border-t-[#394ea2] rounded-full animate-spin"></div>
                        Loading subscribers...
                    </div>
                ) : subscribers.length === 0 ? (
                    <div className="p-16 text-center text-[#94A3B8] font-medium">No subscribers found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Email Address</th>
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Subscribed Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.map((sub, index) => (
                                    <motion.tr 
                                        variants={itemVariants}
                                        key={sub.id}
                                        className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${index === subscribers.length - 1 ? 'border-b-0' : ''}`}
                                    >
                                        <td className="py-4 px-6 font-semibold text-[#1E293B]">{sub.email}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                                                sub.status === 'subscribed' 
                                                    ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20' 
                                                    : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]/50'
                                            }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-[#64748B] text-sm">
                                            {new Date(sub.created_at).toLocaleDateString()}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
