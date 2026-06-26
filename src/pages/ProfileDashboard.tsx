import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'

export default function ProfileDashboard() {
  useDocumentTitle('Profile Dashboard')
  const { user, loading } = useAuth()

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
                <h2 className="text-2xl font-bold text-[#334a89]">My Filled Forms</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No forms submitted yet</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">When you fill out admissions or contact forms, they will appear here so you can track their status.</p>
              </div>
            </div>

            {/* Responses Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#334a89]">School Responses</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No messages</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">Any responses from our admissions team or staff will be shown here.</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-8">
            <div className="bg-[#334a89] text-white rounded-3xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <a href="/admissions" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Start Admission Application
                  </a>
                </li>
                <li>
                  <a href="/contact" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="/campuses" className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">→</span>
                    Book Campus Tour
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
