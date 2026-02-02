import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://henryharrison.com";

    return {
        rules: [
            // Default rule for all crawlers
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
            // Google Images
            {
                userAgent: "Googlebot-Image",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // Bing
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // Yahoo
            {
                userAgent: "Slurp",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // DuckDuckGo
            {
                userAgent: "DuckDuckBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // Yandex
            {
                userAgent: "YandexBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - OpenAI GPT
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - OpenAI ChatGPT
            {
                userAgent: "ChatGPT-User",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Google AI / Gemini
            {
                userAgent: "Google-Extended",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Anthropic Claude
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
            {
                userAgent: "Claude-Web",
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
            // AI Crawlers - Meta AI
            {
                userAgent: "FacebookBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            {
                userAgent: "meta-externalagent",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Apple
            {
                userAgent: "Applebot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            {
                userAgent: "Applebot-Extended",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - You.com
            {
                userAgent: "YouBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Brave Search
            {
                userAgent: "Bytespider",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Amazon / Alexa
            {
                userAgent: "Amazonbot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
            // AI Crawlers - Microsoft Copilot
            {
                userAgent: "bingbot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/private/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
