// Placeholder - can be extended for custom auth logic if needed
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const type = String(formData.get('type'))
  const supabase = createRouteHandlerClient<Database>({ cookies })

  if (type === 'signup') {
    const { error } = await supabase.auth.signUp({email, password, options: {emailRedirectTo: `${requestUrl.origin}/auth/callback`}})

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate`,
        {status: 301}
      )
    }

    return NextResponse.redirect(
      `${requestUrl.origin}/login?message=Check email to continue sign in process`,
      {status: 301}
    )
  }

  if (type === 'signin') {
    const { error } = await supabase.auth.signInWithPassword({email, password})

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate`,
        {status: 301}
      )
    }

    return NextResponse.redirect(requestUrl.origin, {status: 301})
  }

  return NextResponse.redirect(requestUrl.origin, {status: 301})
}