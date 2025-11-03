"use client";

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useState } from 'react';

export default function Home() {
  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function loadBlogs() {
      const { data, error } = await supabaseClient.from('blogs').select('*');
      if (data) {
        setBlogs(data);
      }
    }

    loadBlogs()
  }, [supabaseClient])


  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={['github']}
        />
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => supabaseClient.auth.signOut()}>
            Sign out
          </button>
          <h1>Blogs</h1>
          {blogs && blogs.map(blog => (
            <div key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </div>
          ))}


        </>
      )}
    </div>
  )
}