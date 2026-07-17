import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'
import {
    Settings as SettingsIcon, Megaphone, Link as LinkIcon,
    Mail, Phone, Save, Loader2, CheckCircle2
} from 'lucide-react'

interface Settings {
    marquee_text: string;
    marquee_link: string;
    marquee_is_active: boolean;
    contact_email: string;
    contact_phone: string;
}

// =========================================================
// CUSTOM SAAS TOGGLE SWITCH
// =========================================================
function CustomToggle({ enabled, onChange }: { enabled: boolean, onChange: (val: boolean) => void, label?: string }) {
    return (
        <div className="flex items-center gap-4 cursor-pointer select-none" onClick={() => onChange(!enabled)}>
            <div className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ease-in-out ${enabled ? 'bg-[#334a89]' : 'bg-[#E5E7EB]'}`}>
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow-sm ${enabled ? 'translate-x-8' : 'translate-x-1'}`}
                />
            </div>
            <span className={`font-['Quicksand'] font-bold text-[13px] tracking-wide uppercase transition-colors duration-300 ${enabled ? 'text-[#334a89]' : 'text-[#A0AEC0]'}`}>
                {enabled ? 'Active' : 'Inactive'}
            </span>
        </div>
    )
}

// =========================================================
// MAIN SETTINGS COMPONENT
// =========================================================
export default function SiteSettings() {
    const [settings, setSettings] = useState<Settings>({
        marquee_text: '', marquee_link: '', marquee_is_active: true, contact_email: '', contact_phone: ''
    })
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)

    // Fetch Data
    useEffect(() => {
        supabase.from('global_settings').select('*').eq('id', 1).single().then(({ data }) => {
            if (data) setSettings(data as Settings)
            setFetching(false)
        })
    }, [])

    // GSAP Entrance Animation
    useEffect(() => {
        if (!fetching && containerRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo('.settings-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', clearProps: 'transform' }
                )
            }, containerRef)
            return () => ctx.revert()
        }
    }, [fetching])

    // GSAP Success Toast Animation
    useEffect(() => {
        if (saved && successRef.current) {
            gsap.fromTo(successRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.5)' }
            )
        }
    }, [saved])

    const handleSave = async () => {
        setSaving(true)
        setSaved(false)

        await supabase.from('global_settings').update({
            ...settings, updated_at: new Date().toISOString()
        }).eq('id', 1)

        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 4000)
    }

    return (
        <div ref={containerRef} className="font-['Quicksand'] selection:bg-[#334a89]/20 selection:text-[#334a89] pb-24 max-w-3xl">

            {/* Header Area */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-[14px] bg-[#334a89]/10 border border-[#334a89]/10 flex items-center justify-center text-[#334a89]">
                        <SettingsIcon className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#15283D] tracking-tight">Global Settings</h1>
                </div>
                <p className="text-[#5C5C61] font-medium text-[15px] ml-[64px]">Manage site-wide configurations, banners, and public contact information.</p>
            </div>

            {fetching ? (
                /* Premium Skeleton Loader */
                <div className="space-y-8">
                    <div className="bg-white rounded-[32px] border border-[#F4F6F8] p-8 md:p-10 animate-pulse">
                        <div className="h-6 bg-[#F4F6F8] rounded-full w-48 mb-8" />
                        <div className="space-y-6">
                            <div className="h-14 bg-[#F4F6F8] rounded-[20px] w-full" />
                            <div className="h-14 bg-[#F4F6F8] rounded-[20px] w-full" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] border border-[#F4F6F8] p-8 md:p-10 animate-pulse">
                        <div className="h-6 bg-[#F4F6F8] rounded-full w-48 mb-8" />
                        <div className="space-y-6">
                            <div className="h-14 bg-[#F4F6F8] rounded-[20px] w-full" />
                            <div className="h-14 bg-[#F4F6F8] rounded-[20px] w-full" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">

                    {/* =========================================================
                        CARD 1: ANNOUNCEMENT BANNER
                    ========================================================= */}
                    <div className="settings-card bg-white rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] p-8 md:p-10 transition-all hover:shadow-[0_30px_80px_rgba(21,40,61,0.06)]">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#F4F6F8]">
                            <div>
                                <h3 className="text-xl font-bold text-[#15283D] mb-1">Announcement Banner</h3>
                                <p className="text-[13px] font-medium text-[#A0AEC0]">Controls the scrolling marquee at the top of the website.</p>
                            </div>
                            <CustomToggle
                                enabled={settings.marquee_is_active}
                                onChange={(val) => setSettings({ ...settings, marquee_is_active: val })}
                                label="Status"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Display Text</label>
                                <div className="relative group">
                                    <Megaphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="text"
                                        value={settings.marquee_text}
                                        onChange={e => setSettings({ ...settings, marquee_text: e.target.value })}
                                        placeholder="E.g. Admissions for 2026 are now open!"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Redirection Link (Optional)</label>
                                <div className="relative group">
                                    <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="text"
                                        value={settings.marquee_link}
                                        onChange={e => setSettings({ ...settings, marquee_link: e.target.value })}
                                        placeholder="/admissions"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-medium text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================================================
                        CARD 2: CONTACT INFORMATION
                    ========================================================= */}
                    <div className="settings-card bg-white rounded-[32px] shadow-[0_20px_60px_rgba(21,40,61,0.04)] border border-[#E5E7EB] p-8 md:p-10 transition-all hover:shadow-[0_30px_80px_rgba(21,40,61,0.06)]">

                        <div className="mb-8 pb-6 border-b border-[#F4F6F8]">
                            <h3 className="text-xl font-bold text-[#15283D] mb-1">Public Contact Info</h3>
                            <p className="text-[13px] font-medium text-[#A0AEC0]">Displayed in the footer and contact pages.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Primary Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="email"
                                        value={settings.contact_email || ''}
                                        onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
                                        placeholder="info@aster.edu.pk"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-[11px] text-[#15283D]/60 uppercase tracking-[0.15em] pl-1">Support Phone</label>
                                <div className="relative group">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0] transition-colors group-focus-within:text-[#334a89]" />
                                    <input
                                        type="tel"
                                        value={settings.contact_phone || ''}
                                        onChange={e => setSettings({ ...settings, contact_phone: e.target.value })}
                                        placeholder="+92 300 1234567"
                                        className="w-full pl-14 pr-5 py-4 bg-[#F4F6F8] rounded-[20px] font-bold text-[15px] text-[#15283D] placeholder-[#A0AEC0]/50 border border-transparent focus:bg-white focus:border-[#334a89]/30 focus:ring-4 focus:ring-[#334a89]/10 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================================================
                        ACTION BAR
                    ========================================================= */}
                    <div className="settings-card flex items-center gap-6 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-3 bg-[#334a89] text-white px-10 py-5 rounded-[20px] font-bold text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-[#15283D] hover:shadow-[0_15px_30px_rgba(51,74,137,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Save className="w-5 h-5 transition-transform group-hover:scale-110" />
                            )}
                            {saving ? 'Syncing...' : 'Save Configuration'}
                        </button>

                        {/* Animated Success Toast */}
                        <div
                            ref={successRef}
                            className={`flex items-center gap-3 px-6 py-4 bg-emerald-50 border border-emerald-100 rounded-[20px] text-emerald-700 ${saved ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span className="font-bold text-[13px] uppercase tracking-widest">Live</span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}