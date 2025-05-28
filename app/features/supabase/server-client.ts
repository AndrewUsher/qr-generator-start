import { parseCookies, setCookie } from '@tanstack/react-start/server'
import { createServerClient } from '@supabase/ssr'
import { serverEnv } from '@/env/server'

export function getSupabaseServerClient() {
	return createServerClient(
		serverEnv.SUPABASE_URL,
		serverEnv.SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return Object.entries(parseCookies()).map(([name, value]) => ({
						name,
						value,
					}))
				},
				setAll(cookies) {
					for (const cookie of cookies) {
						setCookie(cookie.name, cookie.value)
					}
				},
			},
		},
	)
}
