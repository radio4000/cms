import { createClient } from '@supabase/supabase-js'
import config from 'config'

const {
	SUPABASE_URL,
	SUPABASE_ANON_KEY
} = config

const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
