import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
    GraduationCap, Mail, MapPin, Quote,
    Plus, Settings, Activity
} from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'

export default function AdminDashboard() {
    const [stats, setStats] = useState({ articles: 0, testimonials: 0, admissions: 0, inquiries: 0, campusTours: 0 })
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            const [a, t, ad, i, ct] = await Promise.all([
                supabase.from('journal_articles').select('id', { count: 'exact', head: true }),
                supabase.from('testimonials').select('id', { count: 'exact', head: true }),
                supabase.from('admissions').select('id', { count: 'exact', head: true }),
                supabase.from('inquiries').select('id', { count: 'exact', head: true }),
                supabase.from('campus_tours').select('id', { count: 'exact', head: true }),
            ])
            setStats({
                articles: a.count || 0,
                testimonials: t.count || 0,
                admissions: ad.count || 0,
                inquiries: i.count || 0,
                campusTours: ct.count || 0,
            })
            setLoading(false)
        }
        fetchStats()
    }, [])

    // GSAP Entrance Cascade
    useEffect(() => {
        if (!loading && containerRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline()

                // Header animation
                tl.fromTo('.dash-header',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
                )
                // Stat cards stagger
                .fromTo('.stat-card',
                    { opacity: 0, y: 40, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: 'expo.out', clearProps: 'transform' },
                    "-=0.6"
                )
                // Action plinth slide up
                .fromTo('.action-plinth',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1, ease: 'expo.out', clearProps: 'transform' },
                    "-=0.8"
                )
            }, containerRef)
            return () => ctx.revert()
        }
    }, [loading])

    const statCards = [
        {
            label: 'Admission Forms',
            value: stats.admissions,
            icon: GraduationCap,
            color: 'text-[#334a89]',
            bg: 'bg-[#334a89]/10',
            border: 'hover:border-[#334a89]/30',
            glow: '224 46 37',
            hex: '#334a89'
        },
        {
            label: 'Contact Inquiries',
            value: stats.inquiries,
            icon: Mail,
            color: 'text-[#ffc715]',
            bg: 'bg-[#ffc715]/10',
            border: 'hover:border-[#ffc715]/40',
            glow: '46 100 54',
            hex: '#ffc715'
        },
        {
            label: 'Campus Tours',
            value: stats.campusTours,
            icon: MapPin,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'hover:border-emerald-200',
            glow: '161 94 30',
            hex: '#10b981'
        },
        {
            label: 'Testimonials',
            value: stats.testimonials,
            icon: Quote,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'hover:border-purple-200',
            glow: '271 81 56',
            hex: '#9333ea'
        }
    ]

    return (
        <div ref={containerRef} className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            {/* Header */}
            <div className="dash-header mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-['Quicksand'] text-[#15283D] tracking-tight mb-2">Overview</h1>
                    <p className="text-[#5C5C61] font-medium text-[15px] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#334a89]" />
                        Live system metrics and fast actions.
                    </p>
                </div>
            </div>

            {/* Main Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-[32px] p-8 border border-[#E5E7EB] animate-pulse h-[200px] flex flex-col justify-between">
                            <div className="w-14 h-14 bg-[#F4F6F8] rounded-[16px]" />
                            <div>
                                <div className="w-20 h-10 bg-[#F4F6F8] rounded-xl mb-3" />
                                <div className="w-32 h-4 bg-[#F4F6F8] rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon
                        return (
                            <div key={idx} className="h-full">
                                <BorderGlow 
                                    className={`stat-card w-full h-full group hover:-translate-y-1 transition-transform duration-500 !shadow-[0_20px_60px_rgba(21,40,61,0.03)] hover:!shadow-[0_30px_80px_rgba(21,40,61,0.08)] !border !border-[#E5E7EB] ${stat.border}`}
                                    borderRadius={32}
                                    backgroundColor="white"
                                    glowColor={stat.glow}
                                >
                                    <div className="p-8 relative overflow-hidden h-full flex flex-col justify-between">
                                        {/* Decorative Abstract Icon Bleed */}
                                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                            <Icon className={`w-32 h-32 ${stat.color} -rotate-12 translate-x-8 -translate-y-8`} />
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-4xl md:text-5xl font-extrabold text-[#15283D] tracking-tight mb-2">
                                                    {stat.value}
                                                </h3>
                                                <p className="font-bold text-[12px] uppercase tracking-widest text-[#A0AEC0]">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </BorderGlow>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Quick Actions Command Plinth */}
            <div className="action-plinth bg-[#15283D] rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-[0_40px_80px_rgba(21,40,61,0.15)]">

                {/* Cinematic Ambient Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#334a89] rounded-full filter blur-[80px] opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ffc715] rounded-full filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                    <div className="max-w-md">
                        <h2 className="text-2xl md:text-3xl font-bold font-['Quicksand'] text-white mb-3">Command Center</h2>
                        <p className="text-white/60 font-medium text-[15px] leading-relaxed">
                            Access your most frequent CMS modules instantly. Update journal articles or modify global configurations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full lg:w-[320px] shrink-0">
                        <Link
                            to="/admin/journal"
                            className="col-span-2 flex items-center justify-center gap-2 px-6 py-4 bg-[#ffc715] hover:bg-white text-[#15283D] rounded-xl font-bold text-[13px] uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(255,199,21,0.2)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.3)] group"
                        >
                            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                            New Article
                        </Link>

                        <Link
                            to="/admin/inquiries"
                            className="col-span-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md border border-white/10 group"
                        >
                            <Mail className="w-4 h-4" />
                            Inbox
                        </Link>

                        <Link
                            to="/admin/settings"
                            className="col-span-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md border border-white/10 group"
                        >
                            <Settings className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                            Settings
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}