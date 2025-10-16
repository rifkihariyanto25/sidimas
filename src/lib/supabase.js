import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cijfaqnzywjrbzqvgrnd.supabase.co'
const supabaseAnonKey = 'sb_publishable_ogAQ6-Y9lRcoqH_irzplQQ_n_v7BS5m'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
