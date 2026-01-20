import { siteConfig } from "@/lib/seo";

// Organization Schema
export function OrganizationJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/images/logo.png`,
            width: 512,
            height: 512,
        },
        description: siteConfig.description,
        address: {
            "@type": "PostalAddress",
            streetAddress: "17290 Preston Road #300 B2",
            addressLocality: "Dallas",
            addressRegion: "TX",
            postalCode: "75252",
            addressCountry: "US",
        },
        contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.contact.email,
            contactType: "customer service",
        },
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.youtube,
            siteConfig.social.spotify,
            siteConfig.social.apple,
            siteConfig.social.soundcloud,
        ].filter(Boolean),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Person Schema for Henry Harrison
export function PersonJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Henry Harrison",
        url: siteConfig.url,
        image: `${siteConfig.url}/images/henry-harrison.jpg`,
        description: "Dallas-based entrepreneur, investor, and philanthropist with over 30 years of experience in business.",
        jobTitle: "Entrepreneur & Investor",
        worksFor: {
            "@type": "Organization",
            name: "Henry Harrison Enterprises",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Dallas",
            addressRegion: "Texas",
            addressCountry: "US",
        },
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.youtube,
        ].filter(Boolean),
        knowsAbout: [
            "Entrepreneurship",
            "Real Estate Investment",
            "Waste to Energy",
            "Green Energy",
            "Business Development",
            "Philanthropy",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Website Schema
export function WebsiteJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
        inLanguage: "en-US",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Podcast Schema
export function PodcastJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        "@id": `${siteConfig.url}/podcast/#podcast`,
        name: "Henry Harrison Podcast",
        description: "Join Henry Harrison as he interviews entrepreneurs, business leaders, and innovators from Dallas, Texas and beyond.",
        url: `${siteConfig.url}/podcast`,
        webFeed: siteConfig.social.spotify,
        author: {
            "@type": "Person",
            name: "Henry Harrison",
            url: siteConfig.url,
        },
        image: `${siteConfig.url}/images/podcast-cover.jpg`,
        inLanguage: "en-US",
        genre: ["Business", "Entrepreneurship", "Interviews"],
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Article Schema
interface ArticleJsonLdProps {
    title: string;
    description: string;
    slug: string;
    image: string;
    author?: string;
    datePublished: string;
    dateModified?: string;
    category?: string;
    tags?: string[];
}

export function ArticleJsonLd({
    title,
    description,
    slug,
    image,
    author = "Henry Harrison",
    datePublished,
    dateModified,
    category,
    tags = [],
}: ArticleJsonLdProps) {
    const url = `${siteConfig.url}/${slug}`;
    const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}/#article`,
        headline: title,
        description: description,
        url: url,
        image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
        },
        author: {
            "@type": "Person",
            name: author,
            url: siteConfig.url,
        },
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        articleSection: category,
        keywords: tags.join(", "),
        inLanguage: "en-US",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Podcast Episode Schema
interface EpisodeJsonLdProps {
    title: string;
    guest: string;
    description: string;
    slug: string;
    image?: string;
    youtube?: string;
    soundcloud?: string;
    season: number;
    episode: number;
    datePublished?: string;
}

export function EpisodeJsonLd({
    title,
    guest,
    description,
    slug,
    image,
    youtube,
    soundcloud,
    season,
    episode,
    datePublished,
}: EpisodeJsonLdProps) {
    const url = `${siteConfig.url}/podcast/${slug}`;
    const imageUrl = youtube
        ? `https://img.youtube.com/vi/${youtube}/maxresdefault.jpg`
        : image?.startsWith("http")
            ? image
            : image
                ? `${siteConfig.url}${image}`
                : `${siteConfig.url}/images/podcast-cover.jpg`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        "@id": `${url}/#episode`,
        name: `${guest} - ${title}`,
        description: description,
        url: url,
        image: imageUrl,
        episodeNumber: episode,
        partOfSeason: {
            "@type": "PodcastSeason",
            seasonNumber: season,
            partOfSeries: {
                "@id": `${siteConfig.url}/podcast/#podcast`,
            },
        },
        partOfSeries: {
            "@type": "PodcastSeries",
            name: "Henry Harrison Podcast",
            url: `${siteConfig.url}/podcast`,
        },
        author: {
            "@type": "Person",
            name: "Henry Harrison",
        },
        datePublished: datePublished,
        associatedMedia: youtube ? {
            "@type": "VideoObject",
            name: `${guest} - Henry Harrison Podcast`,
            description: description,
            thumbnailUrl: imageUrl,
            embedUrl: `https://www.youtube.com/embed/${youtube}`,
            uploadDate: datePublished,
        } : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema
interface FAQItem {
    question: string;
    answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Local Business Schema
export function LocalBusinessJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/henry-harrison.jpg`,
        address: {
            "@type": "PostalAddress",
            streetAddress: "17290 Preston Road #300 B2",
            addressLocality: "Dallas",
            addressRegion: "TX",
            postalCode: "75252",
            addressCountry: "US",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 32.9756,
            longitude: -96.8011,
        },
        areaServed: {
            "@type": "City",
            name: "Dallas",
        },
        priceRange: "$$$$",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
