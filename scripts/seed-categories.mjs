import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Categories data
const categories = [
    { name: "Henry Harrison", slug: "henry-harrison", description: "News and updates about Henry Harrison" },
    { name: "Texas News", slug: "texas-news", description: "Business news from Texas" },
    { name: "Real Estate", slug: "real-estate", description: "Real estate market updates" },
    { name: "Energy", slug: "energy", description: "Energy industry news" },
    { name: "Technology", slug: "technology", description: "Technology and innovation news" },
];

async function seedCategories() {
    console.log('Checking existing categories...');

    const { data: existing, error: fetchError } = await supabase
        .from('categories')
        .select('*');

    if (fetchError) {
        console.error('Error fetching categories:', fetchError);
        return;
    }

    console.log(`Found ${existing?.length || 0} existing categories`);

    if (existing && existing.length > 0) {
        console.log('Categories already exist:');
        existing.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`));
        return;
    }

    console.log('Seeding categories...');

    for (const category of categories) {
        const { error } = await supabase
            .from('categories')
            .upsert(category, { onConflict: 'slug' });

        if (error) {
            console.error(`Error inserting category ${category.name}:`, error);
        } else {
            console.log(`  + ${category.name}`);
        }
    }

    console.log('Done seeding categories!');
}

seedCategories();
