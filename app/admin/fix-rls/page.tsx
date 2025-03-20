"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function FixRLSPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const fixRLS = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      // Try to fix the RLS policies
      const fixRLSQuery = `
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow public inserts to waitlist" ON public.waitlist;
        DROP POLICY IF EXISTS "Allow authenticated to select from waitlist" ON public.waitlist;
        DROP POLICY IF EXISTS "Allow anon to select from waitlist" ON public.waitlist;
        
        -- Create new policies with correct permissions
        CREATE POLICY "Allow anyone to insert to waitlist" 
          ON public.waitlist 
          FOR INSERT 
          TO anon, authenticated 
          WITH CHECK (true);
        
        CREATE POLICY "Allow anyone to select from waitlist" 
          ON public.waitlist 
          FOR SELECT 
          TO anon, authenticated 
          USING (true);
      `

      const { error } = await supabase.rpc("exec_sql", { query: fixRLSQuery })

      if (error) {
        console.error("Error fixing RLS:", error)
        setResult({
          success: false,
          message: `Error fixing RLS: ${error.message}. Please run the SQL script manually.`,
        })
      } else {
        setResult({
          success: true,
          message: "RLS policies have been fixed successfully!",
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
        <h1 className="text-2xl font-bold">Fix RLS Policies</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Fix Row Level Security (RLS) Policies</h2>
        <p className="mb-4">
          This page will help you fix the Row Level Security (RLS) policies for the waitlist table. Click the button
          below to update the RLS policies.
        </p>

        <div className="mb-6">
          <Button onClick={fixRLS} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fixing RLS...
              </>
            ) : (
              "Fix RLS Policies"
            )}
          </Button>
        </div>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p>{result.message}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manual Fix Instructions</h2>
        <p className="mb-4">
          If the automatic fix doesn't work, you can manually fix the RLS policies by running the following SQL in your
          Supabase SQL Editor:
        </p>

        <div className="bg-gray-50 p-4 rounded-md overflow-x-auto mb-4">
          <pre className="text-sm text-gray-800">
            {`-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts to waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated to select from waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Allow anon to select from waitlist" ON public.waitlist;

-- Create new policies with correct permissions
CREATE POLICY "Allow anyone to insert to waitlist" 
  ON public.waitlist 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

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

