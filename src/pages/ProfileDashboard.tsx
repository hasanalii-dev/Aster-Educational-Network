import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Link, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'

export default function ProfileDashboard() {
  useDocumentTitle('Profile Dashboard')
  const { user, loading } = useAuth()
  const [tours, setTours] = useState<any[]>([])
  const [admissions, setAdmissions] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      
      const [toursRes, admissionsRes] = await Promise.all([
        supabase.from('campus_tours').select('*').order('created_at', { ascending: false }),
        supabase.from('admissions').select('*').order('created_at', { ascending: false })
      ])

      if (toursRes.data) setTours(toursRes.data)
      if (admissionsRes.data) setAdmissions(admissionsRes.data)
      setFetching(false)
    }
    
    if (user && !loading) {
      fetchData()
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#394da1] rounded-full animate-spin"></div>
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div id="page-profile-dashboard" className="bg-[#FAFAF9] min-h-screen pt-32 pb-20">
      <div className="container-default">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8 flex items-center gap-6">
          <div className="w-20 h-20 bg-[#ffc715] text-[#334a89] rounded-full flex items-center justify-center text-3xl font-bold">
            {user.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#334a89] mb-2">Welcome Back!</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Filled Forms Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#334a89]">My Applications & Tours</h2>
              </div>
              
              {fetching ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : tours.length === 0 && admissions.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-700 mb-1">No forms submitted yet</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">When you fill out admissions or book tours, they will appear here so you can track their status.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {admissions.map(adm => (
                    <div key={adm.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold tracking-wider uppercase text-[#ffc715] mb-1 block">Admissions</span>
                          <h3 className="text-lg font-bold text-[#15283D]">{adm.child_full_name}</h3>
                          <p className="text-sm text-gray-500">Applying for: {adm.grade_applying_for}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${adm.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            adm.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'}`}>
                          {adm.status.replace('_', ' ')}
                        </span>
                      </div>
                      {adm.admin_feedback && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-700 border-l-4 border-[#394EA2]">
                          <strong>Message from Admissions:</strong><br/>{adm.admin_feedback}
                        </div>
                      )}
                    </div>
                  ))}

                  {tours.map(tour => (
                    <div key={tour.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold tracking-wider uppercase text-[#394EA2] mb-1 block">Campus Tour</span>
                          <h3 className="text-lg font-bold text-[#15283D]">{new Date(tour.preferred_date).toLocaleDateString()}</h3>
                          <p className="text-sm text-gray-500">{tour.preferred_time_slot}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${tour.status === 'completed' ? 'bg-green-100 text-green-700' :
                            tour.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-[#ffc715]/20 text-[#b38b0f]'}`}>
                          {tour.status}
                        </span>
                      </div>
                      {tour.admin_outcome_note && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-700 border-l-4 border-[#ffc715]">
                          <strong>Update:</strong><br/>{tour.admin_outcome_note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-8">
            <div className="bg-[#334a89] text-white rounded-3xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/apply" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Start Admission Application
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="/book-tour" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Book Campus Tour
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
