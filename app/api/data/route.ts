import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('blogs')
    .insert([
      {
        title: 'My First Blog Post',
        content: 'This is the content of my first blog post.',
      },
    ])
    .select()
  if (error) {
    return NextResponse.json({ error })
  }
  return NextResponse.json({ data })
}