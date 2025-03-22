"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        router.push("/admin/dashboard")
      }
    } catch (error: any) {
      console.error("Error logging in:", error)
      setError(error.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/favicon.png" alt="TefiPay Logo" width={80} height={80} className="rounded-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-white/60">Sign in to access the admin dashboard</p>
        </div>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-lg">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

