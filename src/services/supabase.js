import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mnxzakfvwzqueoejbsjs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ueHpha2Z2d3pxdWVvZWpic2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5ODMyMTQsImV4cCI6MjAzOTU1OTIxNH0.JoQJaY4vdVhZQfYZwZj75sgScKC4Ghpm-8gaLBosK7E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
