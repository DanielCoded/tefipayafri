import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the anon key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if the waitlist table exists
    const { error: tableCheckError } = await supabase.from("waitlist").select("count").limit(1)

    if (tableCheckError && tableCheckError.code === "42P01") {
      // Table doesn't exist
      return NextResponse.json(
        {
          success: false,
          error: "The waitlist database hasn't been set up yet. Please visit /admin/setup to set up the database.",
        },
        { status: 500 },
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .maybeSingle()

    if (checkError && checkError.code !== "42P01") {
      console.error("Error checking for existing user:", checkError)
      return NextResponse.json({ success: false, error: "Error checking for existing user" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ success: false, error: "This email is already on our waitlist" }, { status: 400 })
    }

    // Insert new waitlist entry
    const { data, error } = await supabase.from("waitlist").insert([{ name, email }]).select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

