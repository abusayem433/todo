// Supabase Configuration
const SUPABASE_URL = 'https://opzonawvmxrftaommxsp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wem9uYXd2bXhyZnRhb21teHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDAxOTMsImV4cCI6MjA2MzUxNjE5M30.T5uvSbcHnSQ8cNkMO0LeIro3ghwOLxcakC_bgDEvPbA';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

