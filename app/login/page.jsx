'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession()
    if (session) {
      // User is logged in
      setUser(session.then((res) => res.user))
    } else {
      // User is not logged in
      setUser(null)
    }
  }, [supabase])

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button
            onClick={handleSignOut}
            className="p-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:bg-red-300"
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
          />
          <button
            onClick={handleSignUp}
            className="p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-300"
          >
            Sign up
          </button>
          <button
            onClick={handleSignIn}
            className="p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-300"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  )
}
