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

