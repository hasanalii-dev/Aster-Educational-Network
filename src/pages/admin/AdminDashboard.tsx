import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
    GraduationCap, Mail, MapPin, Quote,
    Plus, Settings
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
            color: 'text-[#ffc715]',
            bg: 'bg-[#ffc715]/10',
            border: 'hover:border-[#ffc715]/30 border-white/5',
            glow: '255 199 21',
            hex: '#ffc715',
            valueColor: 'text-[#ffc715]'
        },
        {
            label: 'Contact Inquiries',
            value: stats.inquiries,
            icon: Mail,
            color: 'text-white/60',
            bg: 'bg-white/5',
            border: 'hover:border-white/20 border-white/5',
            glow: '255 255 255',
            hex: '#ffffff',
            valueColor: 'text-white'
        },
        {
            label: 'Campus Tours',
            value: stats.campusTours,
            icon: MapPin,
            color: 'text-white/60',
            bg: 'bg-white/5',
            border: 'hover:border-white/20 border-white/5',
            glow: '255 255 255',
            hex: '#ffffff',
            valueColor: 'text-white'
        },
        {
            label: 'Testimonials',
            value: stats.testimonials,
            icon: Quote,
            color: 'text-white/60',
            bg: 'bg-white/5',
            border: 'hover:border-white/20 border-white/5',
            glow: '255 255 255',
            hex: '#ffffff',
            valueColor: 'text-white'
        }
    ]

    return (
        <div ref={containerRef} className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24">

            {/* Header */}
            <div className="dash-header mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-['Quicksand'] text-white tracking-tight mb-2">Welcome back, Admin</h1>
                    <p className="text-white/40 font-medium text-[15px] flex items-center gap-2">
                        Snapshot of System Status
                    </p>
                </div>
            </div>

            {/* Main Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-[#111111] rounded-[24px] p-8 border border-white/5 animate-pulse h-[200px] flex flex-col justify-between">
                            <div className="w-10 h-10 bg-white/5 rounded-[12px]" />
                            <div>
                                <div className="w-20 h-10 bg-white/5 rounded-xl mb-3" />
                                <div className="w-32 h-4 bg-white/5 rounded-full" />
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
                                    className={`stat-card w-full h-full group hover:-translate-y-1 transition-transform duration-500 !shadow-none hover:!shadow-[0_20px_40px_rgba(0,0,0,0.4)] !border ${stat.border}`}
                                    borderRadius={24}
                                    backgroundColor="#111111"
                                    glowColor={stat.glow}
                                >
                                    <div className="p-8 relative overflow-hidden h-full flex flex-col justify-between">
                                        {/* Decorative Abstract Icon Bleed */}
                                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                            <Icon className={`w-32 h-32 ${stat.color} -rotate-12 translate-x-8 -translate-y-8`} />
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div className="flex justify-between items-start w-full mb-8">
                                                <p className="font-bold text-[10px] uppercase tracking-widest text-white/40">
                                                    {stat.label}
                                                </p>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${stat.bg} ${stat.color} border border-white/5`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className={`text-4xl font-semibold tracking-tight ${stat.valueColor}`}>
                                                    {stat.value}
                                                </h3>
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
            <div className="action-plinth bg-[#111111] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">

                {/* Cinematic Ambient Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ffc715] rounded-full filter blur-[120px] opacity-[0.05] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                    <div className="max-w-md">
                        <h2 className="text-2xl md:text-3xl font-bold font-['Quicksand'] text-white mb-3">Command Center</h2>
                        <p className="text-white/40 font-medium text-[15px] leading-relaxed">
                            Access your most frequent CMS modules instantly. Update journal articles or modify global configurations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full lg:w-[320px] shrink-0">
                        <Link
                            to="/admin/journal"
                            className="col-span-2 flex items-center justify-center gap-2 px-6 py-4 bg-[#ffc715]/10 hover:bg-[#ffc715]/20 text-[#ffc715] border border-[#ffc715]/20 rounded-xl font-bold text-[13px] tracking-widest transition-all duration-300 shadow-none group"
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