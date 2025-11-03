"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState, useEffect, createContext, useContext } from 'react'

const SupabaseContext = createContext(null)

export function SupabaseProvider({children}) {
  const [supabaseClient] = useState(() => createClientComponentClient())
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function getActiveSession() {
      const { data: { session } } = await supabaseClient.auth.getSession()
      setSession(session)
    }

    getActiveSession()

    supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  }, [supabaseClient])

  return (
    <SupabaseContext.Provider value={{ supabaseClient, session }}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={session}
      >
        {children}
      </SessionContextProvider>
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)