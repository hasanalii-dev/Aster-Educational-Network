import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function BookTour() {
    const { user } = useAuth()
    
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        parent_name: '',
        email: '',
        phone: '',
        preferred_date: '',
        preferred_time_slot: 'Morning (9:00 AM - 11:00 AM)'
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                parent_name: user.user_metadata?.full_name || ''
            }))
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const { error } = await supabase.from('campus_tours').insert([
            {
                user_id: user ? user.id : null,
                parent_name: formData.parent_name,
                email: formData.email,
                phone: formData.phone,
                preferred_date: formData.preferred_date,
                preferred_time_slot: formData.preferred_time_slot,
                status: 'pending'
            }
        ])

        setSubmitting(false)

        if (error) {
            setStatus({ type: 'error', msg: error.message || 'Something went wrong.' })
        } else {
            setStatus({ type: 'success', msg: 'Tour requested successfully! We will contact you shortly.' })
            setFormData({
                parent_name: user?.user_metadata?.full_name || '',
                email: user?.email || '',
                phone: '',
                preferred_date: '',
                preferred_time_slot: 'Morning (9:00 AM - 11:00 AM)'
            })
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24">
            <div className="max-w-2xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
                    <div className="bg-[#15283D] px-8 py-10 text-center">
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.2em] text-[#ffc715] uppercase block mb-3">
                            Visit Us
                        </span>
                        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-medium">
                            Book a Campus Tour
                        </h1>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status.msg && (
                                <div className={`p-4 rounded-xl font-['Quicksand'] font-medium text-sm ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                    {status.msg}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Full Name *</label>
                                <input required type="text" value={formData.parent_name} onChange={e => setFormData({...formData, parent_name: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Email Address *</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!!user} className={`px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all ${user ? 'bg-gray-50 text-gray-500' : ''}`} />
                                {!user && <p className="text-xs text-[#5C5C61] font-['Quicksand']">If you create an account later with this email, your tours will be visible in your dashboard.</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Phone Number *</label>
                                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Preferred Date *</label>
                                    <input required type="date" value={formData.preferred_date} onChange={e => setFormData({...formData, preferred_date: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Preferred Time *</label>
                                    <select required value={formData.preferred_time_slot} onChange={e => setFormData({...formData, preferred_time_slot: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all bg-white">
                                        <option>Morning (9:00 AM - 11:00 AM)</option>
                                        <option>Midday (11:00 AM - 1:00 PM)</option>
                                        <option>Afternoon (1:00 PM - 3:00 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                disabled={submitting}
                                type="submit" 
                                className="w-full px-8 py-4 bg-[#394EA2] text-white font-['Quicksand'] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#15283D] transition-colors shadow-md disabled:opacity-50 mt-4"
                            >
                                {submitting ? 'Submitting...' : 'Request Tour'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
