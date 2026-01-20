import { Metadata } from "next";

// Site configuration
export const siteConfig = {
    name: "Henry Harrison",
    title: "Henry Harrison | Entrepreneur, Investor & Philanthropist | Dallas, Texas",
    description: "Henry Harrison is a Dallas-based entrepreneur, investor, and philanthropist with over 30 years of experience in waste-to-energy, real estate, and technology. Host of the Henry Harrison Podcast featuring business leaders and innovators.",
    url: "https://henryharrison.com",
    ogImage: "https://henryharrison.com/images/og-image.jpg",
    locale: "en_US",
    type: "website",
    creator: "Henry Harrison",
    keywords: [
        "Henry Harrison",
        "Dallas entrepreneur",
        "Texas businessman",
        "waste to energy",
        "real estate investor",
        "philanthropist",
        "business podcast",
        "Henry Harrison Podcast",
        "Dallas Texas",
        "green energy",
        "sustainable business",
        "entrepreneurship",
        "business leader",
        "investor Dallas",
    ],
    authors: [{ name: "Henry Harrison", url: "https://henryharrison.com" }],
    social: {
        linkedin: "https://linkedin.com/in/henryharrison",
        youtube: "https://youtube.com/@henryharrisonpodcast",
        spotify: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN",
        apple: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178",
        soundcloud: "https://soundcloud.com/henry-harrison-podcast",
    },
    contact: {
        email: "hoharrison@sbcglobal.net",
        phone: "(214) 555-0100",
        address: "17290 Preston Road #300 B2, Dallas, Texas 75252",
    },
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@henryharrison",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: siteConfig.url,
    },
    verification: {
        // Add your verification codes here
        // google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
        // bing: "your-bing-verification-code",
    },
    category: "business",
};

// Generate metadata for article pages
export function generateArticleMetadata(article: {
    title: string;
    excerpt: string;
    slug: string;
    image: string;
    author?: string;
    date: string;
    category: string;
    tags?: string[];
}): Metadata {
    const url = `${siteConfig.url}/${article.slug}`;
    const image = article.image.startsWith("http")
        ? article.image
        : `${siteConfig.url}${article.image}`;

    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.tags || [],
        authors: [{ name: article.author || "Henry Harrison" }],
        openGraph: {
            type: "article",
            locale: siteConfig.locale,
            url,
            title: article.title,
            description: article.excerpt,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            publishedTime: article.date,
            authors: [article.author || "Henry Harrison"],
            section: article.category,
            tags: article.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    };
}

// Generate metadata for episode pages
export function generateEpisodeMetadata(episode: {
    title: string;
    guest: string;
    description: string;
    slug: string;
    image?: string;
    youtube?: string;
    season: number;
    episode: number;
}): Metadata {
    const url = `${siteConfig.url}/podcast/${episode.slug}`;
    const image = episode.youtube
        ? `https://img.youtube.com/vi/${episode.youtube}/maxresdefault.jpg`
        : episode.image
            ? episode.image.startsWith("http")
                ? episode.image
                : `${siteConfig.url}${episode.image}`
            : siteConfig.ogImage;

    const title = `${episode.guest} - S${episode.season} E${episode.episode}`;
    const description = episode.description || `Interview with ${episode.guest} on the Henry Harrison Podcast`;

    return {
        title,
        description,
        openGraph: {
            type: "video.episode",
            locale: siteConfig.locale,
            url,
            title: `${episode.guest} | Henry Harrison Podcast`,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${episode.guest} on Henry Harrison Podcast`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${episode.guest} | Henry Harrison Podcast`,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    };
}

// Generate metadata for category pages
export function generateCategoryMetadata(category: {
    name: string;
    slug: string;
    description?: string;
}): Metadata {
    const url = `${siteConfig.url}/category/${category.slug}`;
    const title = `${category.name} News & Articles`;
    const description = category.description || `Latest ${category.name} news, insights, and articles from Henry Harrison.`;

    return {
        title,
        description,
        openGraph: {
            type: "website",
            locale: siteConfig.locale,
            url,
            title,
            description,
            siteName: siteConfig.name,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
        alternates: {
            canonical: url,
        },
    };
}
