import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : undefined

    if (slug) {
      // Get a specific blog post by slug
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single()

      if (error) {
        console.error("Error fetching blog post:", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      if (!data) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data })
    } else {
      // Get all published blog posts
      let query = supabase.from("blog_posts").select("*").eq("published", true).order("date", { ascending: false })

      // Apply limit if provided
      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching blog posts:", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      // If no posts in Supabase, return empty array
      if (!data || data.length === 0) {
        return NextResponse.json({ success: true, data: [] })
      }

      return NextResponse.json({ success: true, data })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

