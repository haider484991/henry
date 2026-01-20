import { Article, Category } from "@/types";

export const categories: Category[] = [
    { id: "1", name: "Henry Harrison", slug: "henry-harrison", description: "News and updates about Henry Harrison" },
    { id: "2", name: "Texas News", slug: "texas-news", description: "Business news from Texas" },
    { id: "3", name: "Real Estate", slug: "real-estate", description: "Real estate market updates" },
    { id: "4", name: "Energy", slug: "energy", description: "Energy industry news" },
    { id: "5", name: "Technology", slug: "technology", description: "Technology and innovation news" },
];

export const articles: Article[] = [
    {
        id: "1",
        slug: "dallas-black-chamber-of-commerce-grants-minority",
        title: "Dallas Black Chamber of Commerce Distributes $30,000 in Grants to Minority Enterprises",
        excerpt: "The Dallas Black Chamber of Commerce has distributed grants to support minority-owned businesses in the Dallas area.",
        content: `
The Dallas Black Chamber of Commerce has announced the distribution of $30,000 in grants to minority-owned enterprises in the Dallas metropolitan area. This initiative aims to support small business growth and economic empowerment in underserved communities.

## Grant Distribution

The grants were distributed among ten minority-owned businesses, each receiving $3,000 to support their operations and growth initiatives. The funding comes from a combination of corporate sponsorships and community donations.

## Impact on Local Economy

These grants are expected to help stimulate the local economy by providing crucial capital to businesses that often face barriers in accessing traditional financing. The Chamber has emphasized its commitment to fostering entrepreneurship within minority communities.

## Looking Forward

The Dallas Black Chamber of Commerce plans to continue this initiative, with hopes of expanding the grant program in the coming years. Applications for the next round of grants will open in early 2025.
        `,
        date: "July 2, 2024",
        category: "Texas News",
        image: "/images/news/dbcc-minority-grants.jpg",
        author: "Henry Harrison",
        tags: ["grants", "minority business", "dallas", "economic development"],
        createdAt: "2024-07-02T10:00:00Z",
        updatedAt: "2024-07-02T10:00:00Z",
        published: true,
        featured: true,
    },
    {
        id: "2",
        slug: "henry-harrison-invested-into-the-future-of-green-energy",
        title: "Henry Harrison Invested Into the Future of Green Energy",
        excerpt: "Henry Harrison continues his commitment to sustainable technologies with new investments in green energy.",
        content: `
Henry Harrison has announced significant new investments in green energy technologies, furthering his commitment to sustainable business practices and environmental stewardship.

## Investment Strategy

The investments focus on renewable energy sources including solar, wind, and emerging green technologies. Harrison believes these sectors represent the future of energy production and offer substantial growth opportunities.

## Partnership Opportunities

Through these investments, Harrison is seeking partnerships with innovative companies that are developing breakthrough technologies in the clean energy space. His focus is on scalable solutions that can make a meaningful impact on global energy consumption.

## Long-term Vision

"The transition to green energy is not just an environmental necessity, it's an economic opportunity," Harrison stated. "We're positioning ourselves at the forefront of this transformation."
        `,
        date: "July 1, 2024",
        category: "Henry Harrison",
        image: "/images/news/green-energy-investment.jpg",
        author: "Henry Harrison",
        tags: ["green energy", "investment", "sustainability", "clean tech"],
        createdAt: "2024-07-01T09:00:00Z",
        updatedAt: "2024-07-01T09:00:00Z",
        published: true,
        featured: true,
    },
    {
        id: "3",
        slug: "henry-harrison-debt-financing-preliminary-approval-for-asic-network",
        title: "Henry Harrison Debt Financing Preliminary Approval for ASIC Network",
        excerpt: "Preliminary approval secured for debt financing to support ASIC Network expansion.",
        date: "June 30, 2024",
        category: "Henry Harrison",
        image: "/images/news/asic-network-debt-financing.jpg",
        author: "Henry Harrison",
        tags: ["debt financing", "ASIC", "technology", "expansion"],
        createdAt: "2024-06-30T14:00:00Z",
        updatedAt: "2024-06-30T14:00:00Z",
        published: true,
    },
    {
        id: "4",
        slug: "dallas-fort-worth-commercial-real-estate-2024",
        title: "Dallas-Fort Worth Dominates Commercial Real Estate in 2024",
        excerpt: "Dallas-Fort Worth continues to reign supreme in the commercial real estate market, holding its top position for the third consecutive year.",
        content: `
Dallas-Fort Worth has maintained its position as the nation's top commercial real estate market for the third consecutive year, according to new industry reports.

## Market Performance

The DFW metroplex saw over $50 billion in commercial real estate transactions in 2024, surpassing all other U.S. markets. Industrial, office, and multifamily sectors all showed strong performance.

## Key Drivers

Several factors contribute to DFW's dominance:
- Strong population growth
- Business-friendly regulatory environment
- Strategic geographic location
- Diverse economic base

## Future Outlook

Analysts predict continued growth in the DFW commercial real estate market through 2025, with particular strength expected in industrial and data center developments.
        `,
        date: "June 26, 2024",
        category: "Real Estate",
        image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg",
        author: "Henry Harrison",
        tags: ["real estate", "commercial", "dallas", "fort worth", "market trends"],
        createdAt: "2024-06-26T11:00:00Z",
        updatedAt: "2024-06-26T11:00:00Z",
        published: true,
    },
    {
        id: "5",
        slug: "celina-texas-americas-fastest-growing-city",
        title: "Celina, Texas: America's Fastest-Growing City",
        excerpt: "Celina, Texas has been named America's fastest-growing city, reflecting the continued growth in the Dallas-Fort Worth metroplex.",
        date: "June 18, 2024",
        category: "Texas News",
        image: "/images/news/celina-texas-fastest-growing.jpg",
        author: "Henry Harrison",
        tags: ["celina", "texas", "growth", "development"],
        createdAt: "2024-06-18T10:00:00Z",
        updatedAt: "2024-06-18T10:00:00Z",
        published: true,
    },
    {
        id: "6",
        slug: "alamo-drafthouse-locations-in-north-texas-close-abruptly",
        title: "Alamo Drafthouse Locations in North Texas Close Abruptly",
        excerpt: "Multiple Alamo Drafthouse cinema locations in North Texas have closed their doors abruptly.",
        date: "June 15, 2024",
        category: "Texas News",
        image: "/images/news/alamo-drafthouse-closing.jpg",
        author: "Henry Harrison",
        tags: ["alamo drafthouse", "cinema", "business closure", "north texas"],
        createdAt: "2024-06-15T08:00:00Z",
        updatedAt: "2024-06-15T08:00:00Z",
        published: true,
    },
    {
        id: "7",
        slug: "texas-legislation-defines-ownership-of-geothermal-energy",
        title: "Texas Legislation Defines Ownership of Geothermal Energy",
        excerpt: "New Texas legislation clarifies the ownership rights for geothermal energy resources.",
        date: "June 12, 2024",
        category: "Energy",
        image: "/images/news/geothermal-energy-legislation.jpg",
        author: "Henry Harrison",
        tags: ["geothermal", "energy", "legislation", "texas law"],
        createdAt: "2024-06-12T13:00:00Z",
        updatedAt: "2024-06-12T13:00:00Z",
        published: true,
    },
    {
        id: "8",
        slug: "governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights",
        title: "Governor Abbott's Role in Texas Economic Triumph - TAB Summit Highlights",
        excerpt: "Governor Abbott discusses Texas's economic success at the TAB Summit.",
        date: "June 10, 2024",
        category: "Texas News",
        image: "/images/news/tab-summit-highlights.jpg",
        author: "Henry Harrison",
        tags: ["governor abbott", "texas economy", "TAB summit", "business"],
        createdAt: "2024-06-10T15:00:00Z",
        updatedAt: "2024-06-10T15:00:00Z",
        published: true,
    },
    {
        id: "9",
        slug: "texas-ranked-1-in-america-for-best-business-climate",
        title: "Texas Ranked #1 in America for Best Business Climate",
        excerpt: "Texas has been ranked as the best state in America for business climate.",
        date: "June 8, 2024",
        category: "Texas News",
        image: "/images/news/texas-best-business-climate.jpg",
        author: "Henry Harrison",
        tags: ["texas", "business climate", "rankings", "economic development"],
        createdAt: "2024-06-08T09:00:00Z",
        updatedAt: "2024-06-08T09:00:00Z",
        published: true,
    },
    {
        id: "10",
        slug: "economic-and-environmental-impact-of-texas-heat-waves",
        title: "Economic and Environmental Impact of Texas Heat Waves",
        excerpt: "An analysis of how heat waves are affecting Texas's economy and environment.",
        date: "June 5, 2024",
        category: "Texas News",
        image: "/images/news/texas-heat-waves-impact.jpg",
        author: "Henry Harrison",
        tags: ["heat waves", "climate", "texas economy", "environment"],
        createdAt: "2024-06-05T12:00:00Z",
        updatedAt: "2024-06-05T12:00:00Z",
        published: true,
    },
    {
        id: "11",
        slug: "debt-fi-energy-projects",
        title: "Debt Financing for Energy Projects",
        excerpt: "Understanding debt financing options for energy projects in Texas.",
        date: "June 1, 2024",
        category: "Energy",
        image: "/images/news/debt-fi-energy-projects.jpg",
        author: "Henry Harrison",
        tags: ["debt financing", "energy", "investment", "texas"],
        createdAt: "2024-06-01T10:00:00Z",
        updatedAt: "2024-06-01T10:00:00Z",
        published: true,
    },
];

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return articles.filter(article => article.category === category.name && article.published);
}

export function getFeaturedArticles(): Article[] {
    return articles.filter(article => article.featured && article.published);
}

export function getPublishedArticles(): Article[] {
    return articles.filter(article => article.published);
}

export function getLatestArticles(count: number = 3): Article[] {
    return getPublishedArticles()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.slug === slug);
}
