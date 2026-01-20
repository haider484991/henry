-- Seasons table for podcast management
CREATE TABLE IF NOT EXISTS seasons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    title VARCHAR(255),
    description TEXT,
    image VARCHAR(500),
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_seasons_number ON seasons(number);

-- Enable RLS
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

-- Allow all operations (adjust based on your auth needs)
CREATE POLICY "Allow all operations on seasons" ON seasons
    FOR ALL USING (true) WITH CHECK (true);

-- Insert default seasons (1-4 based on existing data)
INSERT INTO seasons (number, title, description, published) VALUES
    (1, 'Season 1', 'The beginning of Henry Harrison''s podcast journey', true),
    (2, 'Season 2', 'Continuing conversations with Texas leaders', true),
    (3, 'Season 3', 'Expanding horizons and new perspectives', true),
    (4, 'Season 4', 'The latest episodes and conversations', true)
ON CONFLICT (number) DO NOTHING;
