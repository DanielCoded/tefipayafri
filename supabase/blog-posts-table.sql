-- Create the blog_posts table
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
EXECUTE FUNCTION update_updated_at_column();

