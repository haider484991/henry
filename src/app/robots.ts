import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/private/",
                    "/_next/",
                    "/static/",
                ],
            },
            // Google
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // Bing
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - OpenAI
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Google AI
            {
                userAgent: "Google-Extended",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Anthropic
            {
                userAgent: "anthropic-ai",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Perplexity
            {
                userAgent: "PerplexityBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Common Crawl (used by many AI systems)
            {
                userAgent: "CCBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Cohere
            {
                userAgent: "cohere-ai",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
        ],
        sitemap: "https://henryharrison.com/sitemap.xml",
        host: "https://henryharrison.com",
    };
}
