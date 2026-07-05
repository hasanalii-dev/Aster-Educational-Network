import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

/**
 * useAuth — Supabase Authentication Hook
 *
 * Tracks the current authenticated user and loading state.
 * Listens for auth state changes (login, logout, token refresh).
 */
export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<'super_admin' | 'moderator' | 'content_writer' | 'user' | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchRole = async (userId: string) => {
        const { data } = await supabase.from('profiles').select('role').eq('id', userId).single()
        setRole(data?.role || 'user')
    }

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                fetchRole(currentUser.id).finally(() => setLoading(false))
            } else {
                setRole(null)
                setLoading(false)
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                setLoading(true)
                fetchRole(currentUser.id).finally(() => setLoading(false))
            } else {
                setRole(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setRole(null)
    }

    return { user, role, loading, signOut }
}
