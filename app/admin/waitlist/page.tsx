import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 0 // disable cache for this route

// Create a Supabase client with the service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing Supabase environment variables for admin operations")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export default async function AdminWaitlistPage() {
  try {
    const { data: waitlistEntries, error } = await supabaseAdmin
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Waitlist Entries</h1>
              <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                ← Back to home
              </Link>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
              <p>The waitlist table doesn't exist yet. You need to set up the database first.</p>
            </div>
            <Link href="/admin/setup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Setup Page</Button>
            </Link>
          </div>
        )
      }

      console.error("Error fetching waitlist entries:", error)
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Waitlist Entries</h1>
            <Link href="/" className="text-indigo-600 hover:text-indigo-800">
              ← Back to home
            </Link>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading waitlist entries: {error.message}</p>
            <p className="text-sm mt-2">
              Make sure your Supabase credentials are correct and the waitlist table exists.
            </p>
          </div>
          <div className="mt-4">
            <Link href="/admin/setup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Setup Page</Button>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Waitlist Entries</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to home
          </Link>
        </div>

        {waitlistEntries && waitlistEntries.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    Joined At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waitlistEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">No waitlist entries yet.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error in waitlist page:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Waitlist Entries</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to home
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>An unexpected error occurred. Please check your Supabase configuration.</p>
        </div>
        <div className="mt-4">
          <Link href="/admin/setup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Setup Page</Button>
          </Link>
        </div>
      </div>
    )
  }
}

