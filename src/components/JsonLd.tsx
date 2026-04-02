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
        image: `${siteConfig.url}/opengraph-image`,
        description: "Dallas, Texas-based entrepreneur with 30+ years of experience. Host of the Entrepreneurs, Business & Finance Podcast. Founded 12+ companies across Private Equity, sustainable tech, and more. Past President of EO Dallas Chapter.",
        jobTitle: "Entrepreneur & Podcast Host",
        worksFor: {
            "@type": "Organization",
            name: "Entrepreneurs, Business & Finance Podcast",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Dallas",
            addressRegion: "Texas",
            postalCode: "75252",
            addressCountry: "US",
        },
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.youtube,
            siteConfig.social.spotify,
            siteConfig.social.apple,
            siteConfig.social.soundcloud,
        ].filter(Boolean),
        knowsAbout: [
            "Entrepreneurship",
            "Business Strategy",
            "Podcast Hosting",
            "Private Equity",
            "Sustainable Technology",
            "Waste to Energy",
            "Solar Energy",
            "Business Development",
            "Leadership",
            "Sales",
            "Finance",
        ],
        alumniOf: [
            {
                "@type": "EducationalOrganization",
                name: "Emory University",
            },
            {
                "@type": "EducationalOrganization",
                name: "Southern Methodist University (SMU)",
            },
        ],
        memberOf: [
            {
                "@type": "Organization",
                name: "Entrepreneurs Organization (EO) Dallas Chapter",
            },
            {
                "@type": "Organization",
                name: "Young Presidents Organization (YPO)",
            },
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
        name: "Entrepreneurs, Business & Finance Podcast",
        alternateName: "Henry Harrison Podcast",
        description: "The Entrepreneurs, Business & Finance Podcast hosted by Henry Harrison from Dallas, Texas. In-depth interviews with visionary entrepreneurs, CEOs, founders, Shark Tank alumni, industry experts, and financial leaders sharing insights on business growth, AI, sales mastery, and financial decision-making.",
        url: `${siteConfig.url}/podcast`,
        webFeed: [
            siteConfig.social.spotify,
            siteConfig.social.apple,
            siteConfig.social.soundcloud,
        ],
        author: {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            name: "Henry Harrison",
            url: siteConfig.url,
        },
        image: `${siteConfig.url}/opengraph-image`,
        inLanguage: "en-US",
        genre: [
            "Business",
            "Entrepreneurship",
            "Finance",
            "Interviews",
            "Leadership",
            "Startups",
            "Technology",
        ],
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        contentLocation: {
            "@type": "Place",
            name: "Dallas, Texas",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Dallas",
                addressRegion: "Texas",
                addressCountry: "US",
            },
        },
        keywords: "entrepreneurship, business, finance, podcast, Dallas, Texas, CEO interviews, startup, leadership, AI, sales, venture capital",
        numberOfSeasons: 4,
        numberOfEpisodes: 50,
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
    const url = `${siteConfig.url}/${slug}`;
    const imageUrl = youtube
        ? `https://img.youtube.com/vi/${youtube}/maxresdefault.jpg`
        : image?.startsWith("http")
            ? image
            : image
                ? `${siteConfig.url}${image}`
                : `${siteConfig.url}/images/podcast/podcast-cover.png`;

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
