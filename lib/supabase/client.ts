import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

let supabase: ReturnType<typeof createPagesBrowserClient<Database>> | null = null

export const createClient = () => {
  if (supabase) {
    return supabase
  }

  supabase = createPagesBrowserClient<Database>()
  return supabase
}
