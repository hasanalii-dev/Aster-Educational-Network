import { supabase } from '@/lib/supabase'

export interface SiteSettings {
    marquee_text: string
    marquee_link: string
}

export const settingsService = {
    getMarqueeSettings: async (): Promise<SiteSettings | null> => {
        const { data, error } = await supabase
            .from('site_settings')
            .select('marquee_text, marquee_link')
            .eq('id', 1)
            .single()

        if (error) {
            console.error('Error fetching marquee settings:', error)
            return null
        }

        return data
    }
}
