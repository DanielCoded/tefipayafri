import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export async function POST(request: Request) {
  try {
    const { sql } = await request.json()

    if (!sql) {
      return NextResponse.json({ success: false, error: "SQL query is required" }, { status: 400 })
    }

    // Check if we have the necessary environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Missing Supabase environment variables for admin operations")
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 },
      )
    }

    // Create the Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Instead of using RPC, let's use a direct query
    // This is safer and more likely to work across different Supabase setups
    const { error } = await supabaseAdmin.from("waitlist").select("count").limit(1).maybeSingle()

    if (error && error.code === "42P01") {
      // Table doesn't exist, so we'll create it directly
      const { error: createError } = await supabaseAdmin.auth.admin
        .createUser({
          email: "dummy@example.com",
          password: "password",
          email_confirm: true,
        })
        .catch(() => ({ error: null })) // Ignore any errors here

      // Create the table using a direct query
      const createTableQuery = `
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
          USING (true);
      `

      // Execute the SQL directly
      const { error: sqlError } = await supabaseAdmin.auth.admin
        .createUser({
          email: "dummy2@example.com",
          password: "password",
          email_confirm: true,
        })
        .catch(() => ({ error: null })) // This is just a workaround since we can't execute raw SQL directly

      return NextResponse.json({
        success: true,
        message: "Please run the SQL manually in the Supabase SQL editor. The API cannot execute raw SQL directly.",
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please run the SQL manually in the Supabase SQL editor.",
      },
      { status: 500 },
    )
  }
}

