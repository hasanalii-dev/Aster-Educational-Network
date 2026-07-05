const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testimonialsData = [
    {
        quote: "The balance between academics, character-building, and practical learning is what truly sets Aster apart. I can’t explain how much joy it brings to see my child working on his own ventures and succeeding in it.",
        parent_name: "Parent of Senior School Student",
        child_program: "Senior School",
        sort_order: 1
    },
    {
        quote: "We’ve seen remarkable growth in our child’s confidence and communication. Aster creates an environment where children genuinely enjoy learning while developing important life skills.",
        parent_name: "Parent of Elementary Student",
        child_program: "Elementary School",
        sort_order: 2
    },
    {
        quote: "Alyan has become far more independent, expressive, and confident since joining Aster. The confidence in doing things on his own and doing it well is definitely the wow factor for me.",
        parent_name: "Parent of Early Years Student",
        child_program: "Early Years",
        sort_order: 3
    }
];

async function seed() {
    const { data: existing, error: checkError } = await supabase.from('testimonials').select('id').limit(1);
    if (existing && existing.length > 0) {
        console.log("Testimonials already exist, skipping seed.");
        return;
    }
    
    const { data, error } = await supabase.from('testimonials').insert(testimonialsData);
    if (error) {
        console.error("Error inserting:", error);
    } else {
        console.log("Successfully seeded testimonials!");
    }
}

seed();
