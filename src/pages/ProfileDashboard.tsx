import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Link, Navigate } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import gsap from 'gsap'
import { GraduationCap, Map, ArrowRight, FileText, CheckCircle2, Clock, XCircle, MessageSquareQuote, LayoutDashboard, ChevronRight, RefreshCw } from 'lucide-react'

// Avatar Style Generator based on account name
const getAvatarStyle = (char: string) => {
    if (!char) return { bg: "bg-gradient-to-br from-[#ffc715] to-[#f09d00]", text: "text-[#15283D]" }
    const charCode = char.toUpperCase().charCodeAt(0)
    const styles = [
        { bg: "bg-gradient-to-br from-[#ffc715] to-[#f09d00]", text: "text-[#15283D]" }, // Aster Yellow
        { bg: "bg-gradient-to-br from-[#334a89] to-[#15283D]", text: "text-white" }, // Aster Blue
        { bg: "bg-gradient-to-br from-[#10B981] to-[#047857]", text: "text-white" }, // Emerald
        { bg: "bg-gradient-to-br from-[#8B5CF6] to-[#4c1d95]", text: "text-white" }, // Violet
        { bg: "bg-gradient-to-br from-[#F43F5E] to-[#9f1239]", text: "text-white" }, // Rose
    ]
    return styles[charCode % styles.length]
}

export default function ProfileDashboard() {
  const { user, role, loading } = useAuth()
  const [tours, setTours] = useState<any[]>([])
  const [admissions, setAdmissions] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
        setAvatarUrl(user.user_metadata?.custom_avatar_url || user.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`)
    }
  }, [user])

  const handleRandomizeAvatar = async () => {
      setIsUpdatingAvatar(true)
      const newSeed = Math.random().toString(36).substring(7)
      
      // Randomly select a color from Aster's primary and secondary palette
      const colors = ['ffc715', 'ffe373', '334a89', '6080cf', '15283D']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      const newUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${newSeed}&backgroundColor=${randomColor}`
      setAvatarUrl(newUrl)
      
      await supabase.auth.updateUser({
          data: { custom_avatar_url: newUrl }
      })
      setIsUpdatingAvatar(false)
  }

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

  // Entry GSAP Animations
  useEffect(() => {
    if (!loading && !fetching && containerRef.current) {
        // Banner animation
        gsap.fromTo('.gsap-banner', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform' }
        )

        // Action Tiles staggered pop-in
        gsap.fromTo('.gsap-action-tile',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.15, clearProps: 'transform' }
        )

        // Vault cards animation
        gsap.fromTo('.gsap-vault-card',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3, clearProps: 'transform' }
        )
    }
  }, [loading, fetching])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
            <SEO title="Parent Portal" />
        <div className="w-10 h-10 border-4 border-[#F4F6F8] border-t-[#334a89] rounded-full animate-spin"></div>
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  const isAdmin = (role && role !== 'user') || (user?.email && (user.email.includes('admin') || user.email.includes('hasan')))
  const userInitial = user.email?.[0]?.toUpperCase() || 'U'
  const avatarStyle = getAvatarStyle(userInitial)

  return (
    <div ref={containerRef} id="page-profile-dashboard" className="bg-[#FAFAF9] min-h-screen pt-32 pb-24 font-['Quicksand'] selection:bg-[#ffc715]/30 selection:text-[#15283D]">
      <div className="container-default max-w-[1280px]">
        
        {/* ==========================================================
            HERO HEADER
        ========================================================== */}
        <div className="gsap-banner relative w-full rounded-[32px] md:rounded-[40px] bg-gradient-to-b from-[#ffc715] via-[#ffe373] to-[#fff8d6] overflow-hidden shadow-[0_30px_60px_rgba(255,199,21,0.2)] mb-12 border border-[#e6b313]/30 opacity-0">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffc715]/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Custom Profile Icon with Hash Gradient */}
                <div className="shrink-0 relative group perspective-1000">
                    <div className={`w-28 h-28 md:w-32 md:h-32 ${avatarStyle.bg} rounded-3xl flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/20 transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-105 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] rotate-3 overflow-hidden`}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-[120%] h-[120%] object-cover object-bottom" />
                        ) : (
                            <span className={`${avatarStyle.text} text-5xl md:text-6xl font-extrabold font-['Quicksand'] tracking-tight`}>
                                {userInitial}
                            </span>
                        )}
                    </div>
                    {/* Randomize Button */}
                    <button 
                        onClick={handleRandomizeAvatar}
                        disabled={isUpdatingAvatar}
                        className="absolute -bottom-3 -right-3 bg-white text-[#15283D] p-2.5 rounded-full shadow-lg border border-[#E5E7EB] hover:bg-[#F4F6F8] transition-all duration-300 z-20 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:rotate-12"
                        title="Randomize Avatar"
                    >
                        <RefreshCw className={`w-5 h-5 ${isUpdatingAvatar ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                
                <div className="text-center md:text-left flex-1 flex flex-col justify-center pt-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#15283D] mb-3 font-['Quicksand'] tracking-tight">
                        Welcome to your portal
                    </h1>
                    <div className="inline-flex items-center justify-center md:justify-start gap-2.5 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 w-fit mx-auto md:mx-0">
                        <span className="text-[#15283D] font-bold text-[14px] tracking-wide">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* ==========================================================
            QUICK ACTIONS GRID (Linear Gradients Applied Here)
        ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Action Tile 1: Start Application */}
            <Link to="/apply" className="gsap-action-tile opacity-0 group bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(21,40,61,0.03)] border border-[#E5E7EB] hover:border-[#334a89]/20 hover:shadow-[0_12px_30px_rgba(51,74,137,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex items-start gap-5">
                <div className="w-14 h-14 bg-[#F4F6F8] group-hover:bg-[#334a89]/5 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                    <GraduationCap className="w-7 h-7 text-[#334a89]" />
                </div>
                <div className="flex-1 pt-1">
                    <h3 className="font-extrabold text-[#15283D] text-[17px] mb-1">Start Application</h3>
                    <p className="text-[14px] text-[#5C5C61] font-bold leading-snug">Begin an admission application for your child.</p>
                </div>
            </Link>

            {/* Action Tile 2: Book Tour (White glass card) */}
            <Link to="/book-tour" className="gsap-action-tile opacity-0 group bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(21,40,61,0.03)] border border-[#E5E7EB] hover:border-[#334a89]/30 hover:shadow-[0_20px_40px_rgba(51,74,137,0.08)] transition-all duration-500 hover:-translate-y-1.5 flex items-start gap-5">
                <div className="w-14 h-14 bg-[#F4F6F8] group-hover:bg-[#334a89]/10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500">
                    <Map className="w-7 h-7 text-[#334a89]" />
                </div>
                <div className="flex-1 pt-1">
                    <h3 className="font-extrabold text-[#15283D] text-[17px] mb-1">Book a Tour</h3>
                    <p className="text-[14px] text-[#5C5C61] font-bold leading-snug">Schedule a visit to one of our campuses.</p>
                </div>
            </Link>

            {/* Action Tile 3: Conditional Admin/Upcoming */}
            {isAdmin ? (
                <Link to="/admin" className="gsap-action-tile opacity-0 group bg-[#15283D] rounded-[24px] p-6 shadow-[0_8px_20px_rgba(21,40,61,0.1)] border border-[#15283D] hover:shadow-[0_12px_30px_rgba(21,40,61,0.2)] transition-all duration-300 hover:-translate-y-1.5 flex items-start gap-5">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                        <LayoutDashboard className="w-7 h-7 text-[#ffc715]" />
                    </div>
                    <div className="flex-1 pt-1">
                        <h3 className="font-extrabold text-white text-[17px] mb-1">CMS Admin Panel</h3>
                        <p className="text-[14px] text-white/60 font-bold leading-snug">Manage applications, tours, and site content.</p>
                    </div>
                </Link>
            ) : (
                <div className="gsap-action-tile opacity-0 group bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(21,40,61,0.03)] border border-[#E5E7EB] flex items-start gap-5 opacity-70 cursor-not-allowed">
                     <div className="w-14 h-14 bg-[#F4F6F8] rounded-2xl flex items-center justify-center shrink-0">
                        <FileText className="w-7 h-7 text-[#A0AEC0]" />
                    </div>
                    <div className="flex-1 pt-1">
                        <h3 className="font-extrabold text-[#15283D] text-[17px] mb-1">Upcoming Forms</h3>
                        <p className="text-[14px] text-[#5C5C61] font-bold leading-snug">Medical and consent forms will appear here.</p>
                    </div>
                </div>
            )}
        </div>

        {/* ==========================================================
            APPLICATIONS & TOURS VAULT
        ========================================================== */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_10px_40px_rgba(21,40,61,0.03)] border border-[#E5E7EB] p-8 md:p-12 relative overflow-hidden">
            {/* Decorative background logo watermark */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 opacity-[0.02] pointer-events-none">
                <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale" />
            </div>

            <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#F4F6F8] relative z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#15283D] font-['Quicksand'] tracking-tight">Active Submissions</h2>
            </div>
            
            {fetching ? (
                <div className="py-24 flex flex-col items-center justify-center relative z-10">
                    <div className="w-10 h-10 border-4 border-[#F4F6F8] border-t-[#334a89] rounded-full animate-spin mb-4"></div>
                    <p className="text-[#5C5C61] font-bold text-[15px]">Retrieving your records...</p>
                </div>
            ) : tours.length === 0 && admissions.length === 0 ? (
                <div className="gsap-vault-card opacity-0 bg-gradient-to-br from-[#FAFAF9] to-[#F4F6F8] rounded-[32px] py-24 px-8 text-center border border-dashed border-[#A0AEC0]/40 flex flex-col items-center justify-center max-w-3xl mx-auto relative z-10">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-md mb-8 border border-[#E5E7EB] transform rotate-3">
                        <FileText className="w-10 h-10 text-[#334a89]/40" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#15283D] mb-4 font-['Quicksand'] tracking-tight">Your Vault is Empty</h3>
                    <p className="text-[#5C5C61] font-bold text-[17px] leading-relaxed mb-10 max-w-xl">
                        You haven't submitted any admission applications or booked any campus tours yet. When you do, you'll be able to track their progress securely right here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link to="/apply" className="px-8 py-4 bg-[#334a89] text-white rounded-full font-extrabold text-[15px] tracking-wide hover:bg-[#15283D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                            Start Application <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/book-tour" className="px-8 py-4 bg-white text-[#334a89] border-2 border-[#E5E7EB] rounded-full font-extrabold text-[15px] tracking-wide hover:border-[#334a89]/30 hover:bg-[#F4F6F8] transition-all duration-300 flex items-center justify-center gap-2">
                            Book a Tour <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                    {/* ADMISSIONS CARDS */}
                    {admissions.map(adm => {
                        const isAccepted = adm.status === 'accepted'
                        const isRejected = adm.status === 'rejected'
                        const isPending = !isAccepted && !isRejected
                        
                        return (
                            <div key={adm.id} className="gsap-vault-card opacity-0 group relative bg-white rounded-[32px] border-2 border-[#E5E7EB] p-8 hover:border-[#334a89]/40 hover:shadow-[0_20px_40px_rgba(51,74,137,0.08)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#334a89]/[0.04] to-transparent rounded-tr-[32px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                                
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F4F6F8] group-hover:bg-[#334a89]/10 rounded-2xl flex items-center justify-center transition-colors duration-500">
                                            <GraduationCap className="w-6 h-6 text-[#334a89]" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#334a89] block mb-1">Admission</span>
                                            <h3 className="text-xl font-extrabold text-[#15283D] leading-none">{adm.child_full_name}</h3>
                                        </div>
                                    </div>
                                    
                                    <span className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-extrabold uppercase tracking-wider
                                        ${isAccepted ? 'bg-[#10B981]/15 text-[#047857]' : 
                                          isRejected ? 'bg-red-500/15 text-[#9f1239]' : 
                                          'bg-[#ffc715]/25 text-[#b38b0f]'}`}>
                                        {isAccepted && <CheckCircle2 className="w-4 h-4" />}
                                        {isRejected && <XCircle className="w-4 h-4" />}
                                        {isPending && <Clock className="w-4 h-4" />}
                                        {adm.status.replace('_', ' ')}
                                    </span>
                                </div>
                                
                                <div className="bg-[#FAFAF9] rounded-[20px] p-5 border border-[#E5E7EB] relative z-10">
                                    <p className="text-[14px] text-[#5C5C61] font-bold flex items-center justify-between">
                                        <span>Grade Applying For:</span>
                                        <strong className="text-[#15283D] text-[15px]">{adm.grade_applying_for}</strong>
                                    </p>
                                    <p className="text-[14px] text-[#5C5C61] font-bold flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                                        <span>Submitted Date:</span>
                                        <strong className="text-[#15283D] text-[15px]">{new Date(adm.created_at).toLocaleDateString()}</strong>
                                    </p>
                                </div>

                                {adm.admin_feedback && (
                                    <div className="mt-5 p-5 bg-[#334a89]/[0.03] rounded-[20px] border border-[#334a89]/20 relative z-10 flex gap-4 items-start shadow-inner">
                                        <MessageSquareQuote className="w-6 h-6 text-[#334a89] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#334a89] mb-1.5 block">Admissions Update</span>
                                            <p className="text-[14.5px] text-[#15283D] font-bold leading-relaxed">{adm.admin_feedback}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* TOURS CARDS */}
                    {tours.map(tour => {
                        const isCompleted = tour.status === 'completed'
                        const isCancelled = tour.status === 'cancelled'
                        const isPending = !isCompleted && !isCancelled

                        return (
                            <div key={tour.id} className="gsap-vault-card opacity-0 group relative bg-white rounded-[32px] border-2 border-[#E5E7EB] p-8 hover:border-[#ffc715]/60 hover:shadow-[0_20px_40px_rgba(255,199,21,0.12)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ffc715]/[0.06] to-transparent rounded-tr-[32px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                                
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F4F6F8] group-hover:bg-[#ffc715]/20 rounded-2xl flex items-center justify-center transition-colors duration-500">
                                            <Map className="w-6 h-6 text-[#b38b0f]" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#b38b0f] block mb-1">Campus Tour</span>
                                            <h3 className="text-xl font-extrabold text-[#15283D] leading-none">{new Date(tour.preferred_date).toLocaleDateString()}</h3>
                                        </div>
                                    </div>
                                    
                                    <span className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-extrabold uppercase tracking-wider
                                        ${isCompleted ? 'bg-[#10B981]/15 text-[#047857]' : 
                                          isCancelled ? 'bg-red-500/15 text-[#9f1239]' : 
                                          'bg-[#334a89]/10 text-[#334a89]'}`}>
                                        {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                        {isCancelled && <XCircle className="w-4 h-4" />}
                                        {isPending && <Clock className="w-4 h-4" />}
                                        {tour.status}
                                    </span>
                                </div>
                                
                                <div className="bg-[#FAFAF9] rounded-[20px] p-5 border border-[#E5E7EB] relative z-10">
                                    <p className="text-[14px] text-[#5C5C61] font-bold flex items-center justify-between">
                                        <span>Time Slot:</span>
                                        <strong className="text-[#15283D] text-[15px]">{tour.preferred_time_slot}</strong>
                                    </p>
                                    <p className="text-[14px] text-[#5C5C61] font-bold flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                                        <span>Campus:</span>
                                        <strong className="text-[#15283D] text-[15px]">{tour.campus_preference || 'Any Campus'}</strong>
                                    </p>
                                </div>

                                {tour.admin_outcome_note && (
                                    <div className="mt-5 p-5 bg-[#ffc715]/10 rounded-[20px] border border-[#ffc715]/30 relative z-10 flex gap-4 items-start shadow-inner">
                                        <MessageSquareQuote className="w-6 h-6 text-[#b38b0f] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#b38b0f] mb-1.5 block">Tour Update</span>
                                            <p className="text-[14.5px] text-[#15283D] font-bold leading-relaxed">{tour.admin_outcome_note}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
