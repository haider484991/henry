// Create tables script
// Run with: npx tsx supabase/create-tables.ts

import pg from 'pg';
const { Client } = pg;

// Supabase connection via pooler (port 6543)
const client = new Client({
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.lgmwdrpbnphqngxhmgoj',
    password: 'WUlRwlGgTztqhL3E',
    ssl: { rejectUnauthorized: false }
});

const connectionString = 'not-used';

const schema = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Episodes table
CREATE TABLE IF NOT EXISTS episodes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(season, episode)
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_episodes_season ON episodes(season);
CREATE INDEX IF NOT EXISTS idx_episodes_published ON episodes(published);
CREATE INDEX IF NOT EXISTS idx_episodes_youtube ON episodes(youtube);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

-- Function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
DROP TRIGGER IF EXISTS update_episodes_updated_at ON episodes;
CREATE TRIGGER update_episodes_updated_at
    BEFORE UPDATE ON episodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow public read published episodes" ON episodes;
DROP POLICY IF EXISTS "Allow public read published articles" ON articles;
DROP POLICY IF EXISTS "Allow anon full access categories" ON categories;
DROP POLICY IF EXISTS "Allow anon full access episodes" ON episodes;
DROP POLICY IF EXISTS "Allow anon full access articles" ON articles;

-- Create policies for public read
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read published episodes" ON episodes FOR SELECT USING (true);
CREATE POLICY "Allow public read published articles" ON articles FOR SELECT USING (true);

-- Allow anonymous full access (for development)
CREATE POLICY "Allow anon full access categories" ON categories FOR ALL USING (true);
CREATE POLICY "Allow anon full access episodes" ON episodes FOR ALL USING (true);
CREATE POLICY "Allow anon full access articles" ON articles FOR ALL USING (true);
`;

async function createTables() {
    // Using the pre-configured client with SSL

    try {
        console.log('🔌 Connecting to database...');
        await client.connect();
        console.log('✓ Connected!\n');

        console.log('📝 Creating tables and indexes...');
        await client.query(schema);
        console.log('✓ Tables created successfully!\n');

        // Verify tables exist
        const result = await client.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name IN ('categories', 'episodes', 'articles')
        `);

        console.log('📊 Tables in database:');
        result.rows.forEach(row => {
            console.log(`   ✓ ${row.table_name}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.end();
        console.log('\n🔌 Disconnected from database.');
    }
}

createTables();
