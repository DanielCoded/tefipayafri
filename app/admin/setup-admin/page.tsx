"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function SetupAdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // Sign up a new user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }

      setResult({
        success: true,
        message: "Admin user created successfully! Check your email to confirm your account.",
      })
    } catch (error: any) {
      console.error("Error creating admin user:", error)
      setResult({
        success: false,
        message: error.message || "An error occurred while creating the admin user.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Setup Admin User</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Admin Account</h2>
        <p className="mb-4">
          Use this form to create an admin user for the TefiPay admin dashboard. This user will have access to manage
          blog posts, view waitlist entries, and check contact form submissions.
        </p>

        {result && (
          <div
            className={`p-4 rounded-md mb-4 ${
              result.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p>{result.message}</p>
          </div>
        )}

        <form onSubmit={handleSetupAdmin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters long.</p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating admin...
              </>
            ) : (
              "Create Admin User"
            )}
          </Button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <p className="mb-4">
          After creating your admin user, you'll need to confirm your email address by clicking the link sent to your
          email. Once confirmed, you can log in to the admin dashboard.
        </p>

        <div className="flex space-x-4">
          <Link href="/admin/login">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">Go to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

