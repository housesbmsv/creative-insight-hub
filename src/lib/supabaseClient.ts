import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqojrbgjrhwphxqzkuzf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxb2pyYmdqcmh3cGh4cXprdXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NzgzMTMsImV4cCI6MjA3ODA1NDMxM30.GuLEJMDYHkX97hIzw3HtIp-RnmZIyitlU1R13qgL-d0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
