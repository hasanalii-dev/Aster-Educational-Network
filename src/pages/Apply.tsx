import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Apply() {
    const { user, loading: authLoading } = useAuth()
    const navigate = useNavigate()
    
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', msg: string }>({ type: 'idle', msg: '' })

    const [formData, setFormData] = useState({
        parent_name: '',
        parent_email: '',
        parent_phone: '',
        child_full_name: '',
        child_dob: '',
        grade_applying_for: 'Preschool (Early Years)',
        current_school: ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                parent_email: user.email || '',
                parent_name: user.user_metadata?.full_name || ''
            }))
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!user) {
            setStatus({ type: 'error', msg: 'You must be signed in to submit an admission application.' })
            return
        }

        setSubmitting(true)
        setStatus({ type: 'idle', msg: '' })

        const { error } = await supabase.from('admissions').insert([
            {
                user_id: user.id,
                parent_name: formData.parent_name,
                parent_email: formData.parent_email,
                parent_phone: formData.parent_phone,
                child_full_name: formData.child_full_name,
                child_dob: formData.child_dob,
                grade_applying_for: formData.grade_applying_for,
                current_school: formData.current_school,
                status: 'submitted'
            }
        ])

        setSubmitting(false)

        if (error) {
            setStatus({ type: 'error', msg: error.message || 'Something went wrong.' })
        } else {
            setStatus({ type: 'success', msg: 'Application submitted successfully! Redirecting to your dashboard...' })
            setTimeout(() => navigate('/profile'), 2000)
        }
    }

    if (authLoading) return null

    return (
        <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
                    <div className="bg-[#15283D] px-8 py-10 text-center">
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.2em] text-[#ffc715] uppercase block mb-3">
                            The Aster School
                        </span>
                        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-medium">
                            Admission Application
                        </h1>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        {!user ? (
                            <div className="text-center py-8">
                                <h2 className="font-['Quicksand'] text-2xl font-bold text-[#15283D] mb-4">
                                    Sign In Required
                                </h2>
                                <p className="font-['Quicksand'] text-[#5C5C61] mb-8">
                                    To protect your family's data, you must create an account or sign in to submit an application.
                                </p>
                                <button 
                                    onClick={() => navigate('/admin/login')}
                                    className="px-8 py-4 bg-[#394EA2] text-white font-['Quicksand'] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#15283D] transition-colors shadow-md"
                                >
                                    Sign In / Sign Up
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {status.msg && (
                                    <div className={`p-4 rounded-xl font-['Quicksand'] font-medium text-sm ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                        {status.msg}
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-['Playfair_Display'] text-2xl text-[#15283D] font-medium border-b border-[#E5E7EB] pb-3 mb-6">Parent Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Full Name *</label>
                                            <input required type="text" value={formData.parent_name} onChange={e => setFormData({...formData, parent_name: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Email Address *</label>
                                            <input required type="email" value={formData.parent_email} disabled className="px-4 py-3 rounded-xl border border-[#E5E7EB] bg-gray-50 text-gray-500 font-['Quicksand']" />
                                        </div>
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Phone Number *</label>
                                            <input required type="tel" value={formData.parent_phone} onChange={e => setFormData({...formData, parent_phone: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-['Playfair_Display'] text-2xl text-[#15283D] font-medium border-b border-[#E5E7EB] pb-3 mb-6">Child Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Child's Full Name *</label>
                                            <input required type="text" value={formData.child_full_name} onChange={e => setFormData({...formData, child_full_name: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Date of Birth *</label>
                                            <input required type="date" value={formData.child_dob} onChange={e => setFormData({...formData, child_dob: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Grade Applying For *</label>
                                            <select required value={formData.grade_applying_for} onChange={e => setFormData({...formData, grade_applying_for: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all bg-white">
                                                <option>Preschool (Early Years)</option>
                                                <option>Kindergarten</option>
                                                <option>Grade 1</option>
                                                <option>Grade 2</option>
                                                <option>Grade 3</option>
                                                <option>Grade 4</option>
                                                <option>Grade 5</option>
                                                <option>Grade 6</option>
                                                <option>Grade 7</option>
                                                <option>Grade 8</option>
                                                <option>O Levels</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Current School (Optional)</label>
                                            <input type="text" value={formData.current_school} onChange={e => setFormData({...formData, current_school: e.target.value})} className="px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#394EA2] focus:ring-1 focus:ring-[#394EA2] font-['Quicksand'] transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={submitting}
                                    type="submit" 
                                    className="w-full px-8 py-4 bg-[#394EA2] text-white font-['Quicksand'] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#15283D] transition-colors shadow-md disabled:opacity-50 mt-4"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
