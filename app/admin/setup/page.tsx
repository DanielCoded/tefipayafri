"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Create a Supabase client with the anon key for client-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const setupDatabase = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      // Check if the table exists
      const { error } = await supabaseClient.from("waitlist").select("count").limit(1)

      if (error && error.code === "42P01") {
        // Table doesn't exist, show manual instructions
        setResult({
          success: false,
          message: "The waitlist table doesn't exist. Please run the SQL script manually in your Supabase SQL Editor.",
        })
      } else if (error) {
        console.error("Error checking table:", error)
        setResult({
          success: false,
          message: `Error checking table: ${error.message}. Please run the SQL script manually.`,
        })
      } else {
        // Table already exists
        setResult({
          success: true,
          message: "The waitlist table already exists. Your database is ready to use!",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      setResult({
        success: false,
        message: `An unexpected error occurred. Please run the SQL script manually.`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supabase Setup</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Database Setup</h2>
        <p className="mb-4">
          This page will help you set up the necessary database tables for the TefiPay waitlist. Click the button below
          to check if the waitlist table exists in your Supabase database.
        </p>

        <div className="mb-6">
          <Button onClick={setupDatabase} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking database...
              </>
            ) : (
              "Check Database"
            )}
          </Button>
        </div>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-yellow-50 text-yellow-800 border border-yellow-200"
            }`}
          >
            <p>{result.message}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manual Setup Instructions</h2>
        <p className="mb-4">To set up your database, run the following SQL in your Supabase SQL Editor:</p>

        <div className="bg-gray-50 p-4 rounded-md overflow-x-auto mb-4">
          <pre className="text-sm text-gray-800">
            {`-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can insert)
CREATE POLICY "Allow anyone to insert to waitlist" 
  ON public.waitlist 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Create policy for selecting (anyone can view)
CREATE POLICY "Allow anyone to select from waitlist" 
  ON public.waitlist 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);`}
          </pre>
        </div>

        <div className="flex space-x-4">
          <Link href="/admin/waitlist">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">View Waitlist</Button>
          </Link>
          <Link href="/waitlist">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Waitlist Form</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

