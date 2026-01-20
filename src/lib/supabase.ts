import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client for read operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for write/delete operations (server-side only)
export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : supabase;

// Database types
export interface DbEpisode {
    id: string;
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    topics: string[] | null;
    image: string | null;
    soundcloud: string | null;
    youtube: string | null;
    headline: string | null;
    subheadline: string | null;
    full_description: string | null;
    key_insights: string | null;
    guest_phone: string | null;
    guest_email: string | null;
    guest_address: string | null;
    guest_website: string | null;
    guest_website_label: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string | null;
    date: string;
    category: string;
    image: string;
    author: string | null;
    tags: string[] | null;
    published: boolean;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}

// Helper to convert DB episode to app format
export function dbEpisodeToEpisode(dbEpisode: DbEpisode) {
    return {
        id: dbEpisode.id,
        slug: dbEpisode.slug,
        title: dbEpisode.title,
        guest: dbEpisode.guest,
        season: dbEpisode.season,
        episode: dbEpisode.episode,
        description: dbEpisode.description,
        topics: dbEpisode.topics || undefined,
        image: dbEpisode.image || undefined,
        soundcloud: dbEpisode.soundcloud || undefined,
        youtube: dbEpisode.youtube || undefined,
        headline: dbEpisode.headline || undefined,
        subheadline: dbEpisode.subheadline || undefined,
        fullDescription: dbEpisode.full_description || undefined,
        keyInsights: dbEpisode.key_insights || undefined,
        guestContact: (dbEpisode.guest_phone || dbEpisode.guest_email || dbEpisode.guest_website) ? {
            phone: dbEpisode.guest_phone || undefined,
            email: dbEpisode.guest_email || undefined,
            address: dbEpisode.guest_address || undefined,
            website: dbEpisode.guest_website || undefined,
            websiteLabel: dbEpisode.guest_website_label || undefined,
        } : undefined,
        published: dbEpisode.published,
        createdAt: dbEpisode.created_at,
        updatedAt: dbEpisode.updated_at,
    };
}

// Helper to convert DB article to app format
export function dbArticleToArticle(dbArticle: DbArticle) {
    return {
        id: dbArticle.id,
        slug: dbArticle.slug,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content || undefined,
        date: dbArticle.date,
        category: dbArticle.category,
        image: dbArticle.image,
        author: dbArticle.author || undefined,
        tags: dbArticle.tags || undefined,
        published: dbArticle.published,
        featured: dbArticle.featured,
        createdAt: dbArticle.created_at,
        updatedAt: dbArticle.updated_at,
    };
}
