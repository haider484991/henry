// Create tables via Supabase HTTP API
// Run with: npx tsx supabase/create-tables-http.ts

const SUPABASE_URL = 'https://lgmwdrpbnphqngxhmgoj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnbXdkcnBibnBocW5neGhtZ29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MjkyMzksImV4cCI6MjA4NDQwNTIzOX0.eQay-l8eO57Sx5tcnbD53tS_xBEVhAc9UjeAuQS8IfA';

// SQL commands to run
const sqlCommands = [
    // Categories table
    `CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Episodes table
    `CREATE TABLE IF NOT EXISTS episodes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        guest VARCHAR(255) NOT NULL,
        season INTEGER NOT NULL,
        episode INTEGER NOT NULL,
        description TEXT NOT NULL,
        topics TEXT[],
        image VARCHAR(500),
        soundcloud VARCHAR(255),
        youtube VARCHAR(50),
        headline VARCHAR(500),
        subheadline VARCHAR(500),
        full_description TEXT,
        key_insights TEXT,
        guest_phone VARCHAR(50),
        guest_email VARCHAR(255),
        guest_address TEXT,
        guest_website VARCHAR(500),
        guest_website_label VARCHAR(100),
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Articles table
    `CREATE TABLE IF NOT EXISTS articles (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        category VARCHAR(100) NOT NULL,
        image VARCHAR(500) NOT NULL DEFAULT '/images/news/placeholder.jpg',
        author VARCHAR(100) DEFAULT 'Henry Harrison',
        tags TEXT[],
        published BOOLEAN DEFAULT true,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
];

async function executeSQL(sql: string): Promise<boolean> {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({ query: sql }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Error:', error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function createTables() {
    console.log('🚀 Creating tables via Supabase API...\n');

    // First, we need to check if we can run raw SQL
    // Supabase doesn't allow raw SQL via REST API by default
    // We'll need to use the database connection or the Dashboard

    console.log('❌ Cannot run raw SQL via Supabase REST API.');
    console.log('');
    console.log('📋 Please run the following SQL in your Supabase Dashboard:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/lgmwdrpbnphqngxhmgoj/sql');
    console.log('   2. Copy and paste the SQL from: supabase/schema.sql');
    console.log('   3. Click "Run" to execute');
    console.log('');
    console.log('After creating tables, run: npx tsx supabase/setup.ts');
}

createTables();
