import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Settings {
    marquee_text: string; marquee_link: string; marquee_is_active: boolean;
    contact_email: string; contact_phone: string;
}

export default function SiteSettings() {
    const [settings, setSettings] = useState<Settings>({ marquee_text: '', marquee_link: '', marquee_is_active: true, contact_email: '', contact_phone: '' })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        supabase.from('global_settings').select('*').eq('id', 1).single().then(({ data }) => {
            if (data) setSettings(data as Settings)
        })
    }, [])

    const handleSave = async () => {
        setSaving(true)
        setSaved(false)
        await supabase.from('global_settings').update({
            ...settings, updated_at: new Date().toISOString()
        }).eq('id', 1)
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div style={{ maxWidth: 640 }}>
            <div className="adm-card" style={{ marginBottom: 24 }}>
                <div className="adm-card-hd">
                    <h3 className="adm-card-t">Marquee Banner</h3>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: settings.marquee_is_active ? '#16A34A' : '#78716C' }}>
                        <input type="checkbox" checked={settings.marquee_is_active} onChange={e => setSettings({ ...settings, marquee_is_active: e.target.checked })} />
                        {settings.marquee_is_active ? 'Active' : 'Inactive'}
                    </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div><label className="adm-lbl">Marquee Text</label><input className="adm-inp" value={settings.marquee_text} onChange={e => setSettings({ ...settings, marquee_text: e.target.value })} /></div>
                    <div><label className="adm-lbl">Marquee Link</label><input className="adm-inp" value={settings.marquee_link} onChange={e => setSettings({ ...settings, marquee_link: e.target.value })} placeholder="/admissions" /></div>
                </div>
            </div>

            <div className="adm-card" style={{ marginBottom: 24 }}>
                <h3 className="adm-card-t" style={{ marginBottom: 16 }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div><label className="adm-lbl">Email</label><input className="adm-inp" value={settings.contact_email || ''} onChange={e => setSettings({ ...settings, contact_email: e.target.value })} /></div>
                    <div><label className="adm-lbl">Phone</label><input className="adm-inp" value={settings.contact_phone || ''} onChange={e => setSettings({ ...settings, contact_phone: e.target.value })} /></div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="adm-btn" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                {saved && <span style={{ color: '#16A34A', fontSize: 13, fontWeight: 600 }}>✓ Settings saved</span>}
            </div>
        </div>
    )
}
