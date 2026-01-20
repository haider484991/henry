-- Henry Harrison Website Database Schema
-- Run this in Supabase SQL Editor

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_episodes_season ON episodes(season);
CREATE INDEX IF NOT EXISTS idx_episodes_published ON episodes(published);
CREATE INDEX IF NOT EXISTS idx_episodes_youtube ON episodes(youtube);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
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

-- Policies for public read access
CREATE POLICY "Allow public read categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read published episodes" ON episodes
    FOR SELECT USING (published = true);

CREATE POLICY "Allow public read published articles" ON articles
    FOR SELECT USING (published = true);

-- Policies for authenticated users (admin) - full access
CREATE POLICY "Allow authenticated full access categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated full access episodes" ON episodes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated full access articles" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

-- For development: Allow anonymous insert/update/delete (remove in production)
CREATE POLICY "Allow anon full access categories" ON categories
    FOR ALL USING (true);

CREATE POLICY "Allow anon full access episodes" ON episodes
    FOR ALL USING (true);

CREATE POLICY "Allow anon full access articles" ON articles
    FOR ALL USING (true);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
    ('Henry Harrison', 'henry-harrison', 'News and updates about Henry Harrison'),
    ('Texas News', 'texas-news', 'Business news from Texas'),
    ('Real Estate', 'real-estate', 'Real estate market updates'),
    ('Energy', 'energy', 'Energy industry news'),
    ('Technology', 'technology', 'Technology and innovation news')
ON CONFLICT (slug) DO NOTHING;
