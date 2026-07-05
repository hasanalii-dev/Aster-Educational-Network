const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
supabase.from('testimonials').select('*').limit(1).then(console.log);
// also let's just insert one without sort_order to see what columns it has!
supabase.from('testimonials').insert({ parent_name: "test", quote: "test" }).select().then(console.log);
