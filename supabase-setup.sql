-- Create a function to create the waitlist table if it doesn't exist
CREATE OR REPLACE FUNCTION create_waitlist_table()
RETURNS void AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'waitlist'
  ) THEN
    -- Create the waitlist table
    CREATE TABLE public.waitlist (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Set up RLS (Row Level Security)
    ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

    -- Create policy for inserting (anyone can insert)
    CREATE POLICY "Allow public inserts to waitlist" 
      ON public.waitlist 
      FOR INSERT 
      TO anon, authenticated 
      WITH CHECK (true);

    -- Create policy for selecting (only authenticated users can view)
    CREATE POLICY "Allow authenticated to select from waitlist" 
      ON public.waitlist 
      FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;
END;
$$ LANGUAGE plpgsql;

