import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl) {
  console.warn("Missing Supabase URL environment variable")
}

// Create a Supabase client
let supabase

if (supabaseServiceKey) {
  // If we have a service role key, use it (bypasses RLS)
  supabase = createClient(supabaseUrl, supabaseServiceKey)
} else {
  // Fallback to anon key if service key is not available
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  if (!supabaseAnonKey) {
    console.warn("Missing Supabase anon key environment variable")
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.warn("Using anon key for Supabase client. This may cause RLS policy issues.")
}

// GET all blog posts (including unpublished ones)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Get a specific blog post by ID
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching blog post:", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      if (!data) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data })
    } else {
      // Get all blog posts
      const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

      if (error) {
        console.error("Error fetching blog posts:", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// POST a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "slug", "excerpt", "content", "author", "role"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if slug already exists
    const { data: existingPost, error: checkError } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("slug", body.slug)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking for existing post:", checkError)
      return NextResponse.json({ success: false, error: checkError.message }, { status: 500 })
    }

    if (existingPost) {
      return NextResponse.json({ success: false, error: "A post with this slug already exists" }, { status: 400 })
    }

    // Insert new blog post
    const { data, error } = await supabase.from("blog_posts").insert([body]).select()

    if (error) {
      console.error("Error creating blog post:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// PUT (update) an existing blog post
export async function PUT(request: Request) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 })
    }

    // Update blog post
    const { data, error } = await supabase.from("blog_posts").update(body).eq("id", body.id).select()

    if (error) {
      console.error("Error updating blog post:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// DELETE a blog post
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 })
    }

    // Delete blog post
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting blog post:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

