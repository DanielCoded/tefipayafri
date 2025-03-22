"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the anon key for client-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default function BlogSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const setupDatabase = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      // Check if the table exists
      const { error } = await supabaseClient.from("blog_posts").select("count").limit(1)

      if (error && error.code === "42P01") {
        // Table doesn't exist, show manual instructions
        setResult({
          success: false,
          message:
            "The blog_posts table doesn't exist. Please run the SQL script manually in your Supabase SQL Editor.",
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
          message: "The blog_posts table already exists. Your database is ready to use!",
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
        <h1 className="text-2xl font-bold">Blog Setup</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Blog Database Setup</h2>
        <p className="mb-4">
          This page will help you set up the necessary database tables for the TefiPay blog. Click the button below to
          check if the blog_posts table exists in your Supabase database.
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
        <p className="mb-4">To set up your blog database, run the following SQL in your Supabase SQL Editor:</p>

        <div className="bg-gray-50 p-4 rounded-md overflow-x-auto mb-4">
          <pre className="text-sm text-gray-800">
            {`-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time TEXT DEFAULT '5 min read',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting (anyone can view published posts)
CREATE POLICY "Allow anyone to view published blog posts" 
ON public.blog_posts 
FOR SELECT 
TO anon, authenticated 
USING (published = true);

-- Create policy for CRUD operations (only authenticated users)
CREATE POLICY "Allow authenticated users to manage blog posts" 
ON public.blog_posts 
FOR ALL 
TO authenticated 
USING (true);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();`}
          </pre>
        </div>

        <div className="flex space-x-4">
          <Link href="/admin/blog">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">Manage Blog Posts</Button>
          </Link>
          <Link href="/blog">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">View Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

