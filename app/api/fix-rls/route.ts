import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing Supabase environment variables for admin operations")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
  try {
    // SQL to fix RLS policies
    const fixRLSQuery = `
      -- Drop existing policies if they exist
      DROP POLICY IF EXISTS "Allow public inserts to waitlist" ON public.waitlist;
      DROP POLICY IF EXISTS "Allow authenticated to select from waitlist" ON public.waitlist;
      DROP POLICY IF EXISTS "Allow anyone to insert to waitlist" ON public.waitlist;
      DROP POLICY IF EXISTS "Allow anyone to select from waitlist" ON public.waitlist;
      
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

    // Execute the SQL directly if possible
    const { error } = await supabaseAdmin.rpc("exec_sql", { query: fixRLSQuery }).catch(() => {
      return { error: new Error("Failed to execute SQL directly") }
    })

    if (error) {
      // If direct execution fails, we'll provide instructions
      return NextResponse.json({
        success: false,
        message: "Could not automatically fix RLS policies. Please run the SQL manually in your Supabase SQL Editor.",
        sql: fixRLSQuery,
      })
    }

    return NextResponse.json({
      success: true,
      message: "RLS policies have been fixed successfully!",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please run the SQL manually in your Supabase SQL Editor.",
      },
      { status: 500 },
    )
  }
}

