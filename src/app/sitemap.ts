import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const baseUrl = "https://henryharrison.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all published articles
    const { data: articles } = await supabase
        .from("articles")
        .select("slug, updated_at, created_at")
        .eq("published", true)
        .order("date", { ascending: false });

    // Fetch all published episodes
    const { data: episodes } = await supabase
        .from("episodes")
        .select("slug, updated_at, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

    // Fetch all categories
    const { data: categories } = await supabase
        .from("categories")
        .select("slug, created_at");

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/podcast`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/book`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
        // Season pages
        {
            url: `${baseUrl}/season-4`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/entrepreneurs-business-and-finance-season-3`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/henry-harrison-dallas-tx-podcast-season-2`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        // Legal pages
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/user-agreement`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/dmca`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/acceptable-use`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Article pages
    const articlePages: MetadataRoute.Sitemap = (articles || []).map((article) => ({
        url: `${baseUrl}/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Episode pages
    const episodePages: MetadataRoute.Sitemap = (episodes || []).map((episode) => ({
        url: `${baseUrl}/podcast/${episode.slug}`,
        lastModified: new Date(episode.updated_at || episode.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = (categories || []).map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(category.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...articlePages, ...episodePages, ...categoryPages];
}
