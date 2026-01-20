"use server";

import { revalidatePath } from "next/cache";
import { supabase, supabaseAdmin, dbEpisodeToEpisode, dbArticleToArticle, DbEpisode, DbArticle } from "./supabase";

// Episode Actions
export async function createEpisode(data: {
    slug?: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    topics?: string[];
    image?: string;
    soundcloud?: string;
    youtube?: string;
    headline?: string;
    subheadline?: string;
    fullDescription?: string;
    keyInsights?: string;
    guestContact?: {
        phone?: string;
        email?: string;
        address?: string;
        website?: string;
        websiteLabel?: string;
    };
    published?: boolean;
}) {
    const slug = data.slug || generateSlug(data.guest);

    const episodeData = {
        slug,
        title: data.title,
        guest: data.guest,
        season: data.season,
        episode: data.episode,
        description: data.description,
        topics: data.topics || null,
        image: data.image || null,
        soundcloud: data.soundcloud || null,
        youtube: data.youtube || null,
        headline: data.headline || null,
        subheadline: data.subheadline || null,
        full_description: data.fullDescription || null,
        key_insights: data.keyInsights || null,
        guest_phone: data.guestContact?.phone || null,
        guest_email: data.guestContact?.email || null,
        guest_address: data.guestContact?.address || null,
        guest_website: data.guestContact?.website || null,
        guest_website_label: data.guestContact?.websiteLabel || null,
        published: data.published ?? true,
    };

    const { data: episode, error } = await supabaseAdmin
        .from('episodes')
        .insert(episodeData)
        .select()
        .single();

    if (error) {
        console.error('Error creating episode:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/podcasts");
    revalidatePath("/podcast");
    revalidatePath("/");

    return { success: true, episode: dbEpisodeToEpisode(episode) };
}

export async function updateEpisode(id: string, data: Partial<{
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    topics: string[];
    image: string;
    soundcloud: string;
    youtube: string;
    headline: string;
    subheadline: string;
    fullDescription: string;
    keyInsights: string;
    guestContact: {
        phone?: string;
        email?: string;
        address?: string;
        website?: string;
        websiteLabel?: string;
    };
    published: boolean;
}>) {
    const updateData: Record<string, unknown> = {};

    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.guest !== undefined) updateData.guest = data.guest;
    if (data.season !== undefined) updateData.season = data.season;
    if (data.episode !== undefined) updateData.episode = data.episode;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.topics !== undefined) updateData.topics = data.topics;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.soundcloud !== undefined) updateData.soundcloud = data.soundcloud;
    if (data.youtube !== undefined) updateData.youtube = data.youtube;
    if (data.headline !== undefined) updateData.headline = data.headline;
    if (data.subheadline !== undefined) updateData.subheadline = data.subheadline;
    if (data.fullDescription !== undefined) updateData.full_description = data.fullDescription;
    if (data.keyInsights !== undefined) updateData.key_insights = data.keyInsights;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.guestContact) {
        if (data.guestContact.phone !== undefined) updateData.guest_phone = data.guestContact.phone;
        if (data.guestContact.email !== undefined) updateData.guest_email = data.guestContact.email;
        if (data.guestContact.address !== undefined) updateData.guest_address = data.guestContact.address;
        if (data.guestContact.website !== undefined) updateData.guest_website = data.guestContact.website;
        if (data.guestContact.websiteLabel !== undefined) updateData.guest_website_label = data.guestContact.websiteLabel;
    }

    const { error } = await supabaseAdmin
        .from('episodes')
        .update(updateData)
        .eq('id', id);

    if (error) {
        console.error('Error updating episode:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/podcasts");
    revalidatePath("/podcast");
    revalidatePath("/");

    return { success: true };
}

export async function deleteEpisode(id: string) {
    console.log('deleteEpisode called with id:', id);

    try {
        const { error, count } = await supabaseAdmin
            .from('episodes')
            .delete()
            .eq('id', id);

        console.log('Delete result - error:', error, 'count:', count);

        if (error) {
            console.error('Error deleting episode:', error);
            return { success: false, error: error.message };
        }

        revalidatePath("/admin/podcasts");
        revalidatePath("/podcast");
        revalidatePath("/");

        return { success: true };
    } catch (err) {
        console.error('Unexpected error in deleteEpisode:', err);
        return { success: false, error: 'Unexpected error occurred' };
    }
}

export async function getEpisodes() {
    const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('season', { ascending: false })
        .order('episode', { ascending: false });

    if (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }

    return data.map((ep: DbEpisode) => dbEpisodeToEpisode(ep));
}

export async function getEpisodeBySlug(slug: string) {
    const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching episode:', error);
        return null;
    }

    return dbEpisodeToEpisode(data);
}

export async function getEpisodeById(id: string) {
    const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching episode:', error);
        return null;
    }

    return { ...dbEpisodeToEpisode(data), id: data.id };
}

// Article Actions
export async function createArticle(data: {
    slug?: string;
    title: string;
    excerpt: string;
    content?: string;
    date?: string;
    category: string;
    image: string;
    author?: string;
    tags?: string[];
    published?: boolean;
    featured?: boolean;
}) {
    const slug = data.slug || generateSlug(data.title);

    const articleData = {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content || null,
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category,
        image: data.image,
        author: data.author || 'Henry Harrison',
        tags: data.tags || null,
        published: data.published ?? true,
        featured: data.featured ?? false,
    };

    const { data: article, error } = await supabaseAdmin
        .from('articles')
        .insert(articleData)
        .select()
        .single();

    if (error) {
        console.error('Error creating article:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    return { success: true, article: dbArticleToArticle(article) };
}

export async function updateArticle(id: string, data: Partial<{
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    image: string;
    author: string;
    tags: string[];
    published: boolean;
    featured: boolean;
}>) {
    const { error } = await supabaseAdmin
        .from('articles')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating article:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    return { success: true };
}

export async function deleteArticle(id: string) {
    console.log('deleteArticle called with id:', id);

    try {
        const { error } = await supabaseAdmin
            .from('articles')
            .delete()
            .eq('id', id);

        console.log('Delete article result - error:', error);

        if (error) {
            console.error('Error deleting article:', error);
            return { success: false, error: error.message };
        }

        revalidatePath("/admin/news");
        revalidatePath("/news");
        revalidatePath("/");

        return { success: true };
    } catch (err) {
        console.error('Unexpected error in deleteArticle:', err);
        return { success: false, error: 'Unexpected error occurred' };
    }
}

export async function getArticles() {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        return [];
    }

    return data.map((article: DbArticle) => dbArticleToArticle(article));
}

export async function getArticleBySlug(slug: string) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching article:', error);
        return null;
    }

    return dbArticleToArticle(data);
}

export async function getArticleById(id: string) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching article:', error);
        return null;
    }

    return { ...dbArticleToArticle(data), id: data.id };
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data;
}

// Season Actions
export async function getSeasons() {
    const { data, error } = await supabase
        .from('seasons')
        .select('*')
        .order('number', { ascending: true });

    if (error) {
        console.error('Error fetching seasons:', error);
        return [];
    }

    return data;
}

export async function getSeasonById(id: string) {
    const { data, error } = await supabase
        .from('seasons')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching season:', error);
        return null;
    }

    return data;
}

export async function createSeason(data: {
    number: number;
    title?: string;
    description?: string;
    image?: string;
    published?: boolean;
}) {
    const seasonData = {
        number: data.number,
        title: data.title || `Season ${data.number}`,
        description: data.description || null,
        image: data.image || null,
        published: data.published ?? true,
    };

    const { data: season, error } = await supabaseAdmin
        .from('seasons')
        .insert(seasonData)
        .select()
        .single();

    if (error) {
        console.error('Error creating season:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/seasons");
    revalidatePath("/admin/podcasts");
    revalidatePath("/podcast");

    return { success: true, season };
}

export async function updateSeason(id: string, data: Partial<{
    number: number;
    title: string;
    description: string;
    image: string;
    published: boolean;
}>) {
    const { error } = await supabaseAdmin
        .from('seasons')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating season:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/seasons");
    revalidatePath("/admin/podcasts");
    revalidatePath("/podcast");

    return { success: true };
}

export async function deleteSeason(id: string) {
    const { error } = await supabaseAdmin
        .from('seasons')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting season:', error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/seasons");
    revalidatePath("/admin/podcasts");
    revalidatePath("/podcast");

    return { success: true };
}

// Utility functions
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Auto-blog functionality (placeholder for AI integration)
export async function generateArticleFromTopic(topic: string) {
    // This would integrate with an AI service to generate content
    // For now, return a template
    const now = new Date().toISOString();

    return {
        success: true,
        article: {
            id: `art-${Date.now()}`,
            slug: generateSlug(topic),
            title: topic,
            excerpt: `An article about ${topic}...`,
            content: `# ${topic}\n\nContent will be generated here...`,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            category: "Texas News",
            image: "/images/news/placeholder.jpg",
            author: "Henry Harrison",
            tags: [],
            createdAt: now,
            updatedAt: now,
            published: false,
            featured: false,
        },
    };
}
