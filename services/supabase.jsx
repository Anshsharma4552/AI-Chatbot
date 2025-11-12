import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzinedkmszioejrsshri.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aW5lZGttc3ppb2VqcnNzaHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyODEyNjcsImV4cCI6MjA2Mjg1NzI2N30.PvA8KOu_HCdirJzprKWBYps5dlOg21PP_jZmvx3XKZ4'

export const supabase = createClient(supabaseUrl, supabaseKey)