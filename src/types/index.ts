// Podcast/Episode Types
export interface GuestContact {
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
    websiteLabel?: string;
}

export interface Episode {
    id: string;
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    topics?: string[];
    image?: string;
    soundcloud?: string;
    youtube?: string;
    // Extended content
    headline?: string;
    subheadline?: string;
    fullDescription?: string;
    keyInsights?: string;
    guestContact?: GuestContact;
    // Metadata
    createdAt: string;
    updatedAt: string;
    published: boolean;
}

// News/Article Types
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    category: string;
    image: string;
    author?: string;
    tags?: string[];
    // Metadata
    createdAt: string;
    updatedAt: string;
    published: boolean;
    featured?: boolean;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

// Dashboard Types
export interface DashboardStats {
    totalEpisodes: number;
    totalArticles: number;
    publishedEpisodes: number;
    publishedArticles: number;
    draftEpisodes: number;
    draftArticles: number;
}

// Form Types
export interface EpisodeFormData {
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
    guestContact?: GuestContact;
    published: boolean;
}

export interface ArticleFormData {
    title: string;
    excerpt: string;
    content?: string;
    category: string;
    image: string;
    author?: string;
    tags?: string[];
    published: boolean;
    featured?: boolean;
}
