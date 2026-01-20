-- HENRY HARRISON DATABASE SETUP
-- Copy this entire file and paste into Supabase SQL Editor, then click RUN

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Episodes table
CREATE TABLE IF NOT EXISTS episodes (
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    date DATE DEFAULT CURRENT_DATE,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500) DEFAULT '/images/news/placeholder.jpg',
    author VARCHAR(100) DEFAULT 'Henry Harrison',
    tags TEXT[],
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow all access
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all episodes" ON episodes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all articles" ON articles FOR ALL USING (true) WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
    ('Henry Harrison', 'henry-harrison', 'News and updates about Henry Harrison'),
    ('Texas News', 'texas-news', 'Business news from Texas'),
    ('Real Estate', 'real-estate', 'Real estate market updates'),
    ('Energy', 'energy', 'Energy industry news'),
    ('Technology', 'technology', 'Technology and innovation news')
ON CONFLICT (slug) DO NOTHING;

SELECT 'Tables created successfully!' as status;
