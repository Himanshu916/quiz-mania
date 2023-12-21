import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jcjjqbuahamoknevbpvt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjampxYnVhaGFtb2tuZXZicHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNjkyNzIsImV4cCI6MjAxODc0NTI3Mn0.xOsIxmPO-xslQgfi4KtHfua62D8wvhkgWrTPB7L-vQU";
export const supabase = createClient(supabaseUrl, supabaseKey);
