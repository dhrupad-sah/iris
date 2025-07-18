import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          description: string | null
          state: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          state?: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          state?: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      // Add more tables as needed
    }
  }
}