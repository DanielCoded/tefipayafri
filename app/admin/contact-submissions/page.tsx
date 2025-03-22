"use client"

import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export const revalidate = 0 // disable cache for this route

// Create a Supabase client with the service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing Supabase environment variables for admin operations")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export default async function ContactSubmissionsPage() {
  try {
    const { data: contactSubmissions, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
              <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">
                ← Back to dashboard
              </Link>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
              <p>The contact_submissions table doesn't exist yet. You need to set up the database first.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto mb-4">
              <pre className="text-sm text-gray-800">
                {`-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL,
email TEXT NOT NULL,
subject TEXT NOT NULL,
message TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can insert)
CREATE POLICY "Allow anyone to insert to contact_submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Create policy for selecting (only authenticated users can view)
CREATE POLICY "Allow authenticated to select from contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);`}
              </pre>
            </div>
          </div>
        )
      }

      console.error("Error fetching contact submissions:", error)
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
            <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">
              ← Back to dashboard
            </Link>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading contact submissions: {error.message}</p>
            <p className="text-sm mt-2">
              Make sure your Supabase credentials are correct and the contact_submissions table exists.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print()
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 print:hidden"
            >
              <Printer className="w-4 h-4" />
              Print Submissions
            </Button>
            <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800 print:hidden">
              ← Back to dashboard
            </Link>
          </div>
        </div>

        {contactSubmissions && contactSubmissions.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg print:shadow-none">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:hidden">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contactSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:hidden">
                      <details className="cursor-pointer">
                        <summary className="text-indigo-600 hover:text-indigo-800">View Message</summary>
                        <div className="mt-2 p-3 bg-gray-50 rounded-md">
                          <p className="whitespace-pre-wrap">{submission.message}</p>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Print-only message details */}
            <div className="hidden print:block mt-8">
              <h2 className="text-xl font-bold mb-4">Message Details</h2>
              {contactSubmissions.map((submission) => (
                <div key={`print-${submission.id}`} className="mb-8 pb-8 border-b">
                  <h3 className="font-bold">{submission.subject}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    From: {submission.name} ({submission.email}) - {new Date(submission.created_at).toLocaleString()}
                  </p>
                  <p className="whitespace-pre-wrap">{submission.message}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">No contact form submissions yet.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error in contact submissions page:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
          <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">
            ← Back to dashboard
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>An unexpected error occurred. Please check your Supabase configuration.</p>
        </div>
      </div>
    )
  }
}

