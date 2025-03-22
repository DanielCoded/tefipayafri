"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push("/admin/login")
      }
      setIsLoading(false)
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} className="bg-white/10 hover:bg-white/20">
            Sign Out
          </Button>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <p className="text-white/60">
            This is your admin dashboard. From here, you can manage blog posts, view waitlist entries, and check contact
            form submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/blog" className="block">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors h-full">
              <h3 className="text-xl font-semibold mb-2">Blog Management</h3>
              <p className="text-white/60 mb-4">Create, edit, and manage blog posts</p>
              <Button className="bg-indigo-500 hover:bg-indigo-600">Manage Blog</Button>
            </div>
          </Link>

          <Link href="/admin/waitlist" className="block">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors h-full">
              <h3 className="text-xl font-semibold mb-2">Waitlist Entries</h3>
              <p className="text-white/60 mb-4">View and export waitlist sign-ups</p>
              <Button className="bg-indigo-500 hover:bg-indigo-600">View Waitlist</Button>
            </div>
          </Link>

          <Link href="/admin/contact-submissions" className="block">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors h-full">
              <h3 className="text-xl font-semibold mb-2">Contact Submissions</h3>
              <p className="text-white/60 mb-4">View and respond to contact form submissions</p>
              <Button className="bg-indigo-500 hover:bg-indigo-600">View Submissions</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

