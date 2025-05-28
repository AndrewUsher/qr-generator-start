import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const serverEnv = createEnv({
	server: {
		SUPABASE_URL: z.string().url(),
		SUPABASE_ANON_KEY: z.string(),
	},
	runtimeEnv: process.env,
})
