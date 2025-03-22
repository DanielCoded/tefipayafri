-- Create the contact_submissions table
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
  USING (true);

