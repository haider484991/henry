import { notFound } from "next/navigation";
import { episodes, getEpisodeBySlug } from "@/data/episodes";
import EpisodePage from "@/components/EpisodePage";
import ArticlePage from "@/components/ArticlePage";

// Articles data
const articles = [
    { slug: "dallas-black-chamber-of-commerce-grants-minority", title: "Dallas Black Chamber of Commerce Distributes $30,000 in Grants to Minority Enterprises", content: "The Dallas Black Chamber of Commerce has distributed grants to support minority-owned businesses in the Dallas area, continuing its mission to empower local entrepreneurs.", date: "July 2, 2024", category: "Texas News", image: "/images/news/dbcc-minority-grants.jpg" },
    { slug: "henry-harrison-invested-into-the-future-of-green-energy", title: "Henry Harrison Invested Into the Future of Green Energy", content: "Henry Harrison continues his commitment to sustainable technologies with new investments in green energy, focusing on waste-to-energy and solar technologies.", date: "July 1, 2024", category: "Henry Harrison", image: "/images/news/green-energy-investment.jpg" },
    { slug: "henry-harrison-debt-financing-preliminary-approval-for-asic-network", title: "Henry Harrison Debt Financing Preliminary Approval for ASIC Network", content: "Preliminary approval has been secured for debt financing to support ASIC Network expansion and growth initiatives.", date: "June 30, 2024", category: "Henry Harrison", image: "/images/news/asic-network-debt-financing.jpg" },
    { slug: "dallas-fort-worth-commercial-real-estate-2024", title: "Dallas-Fort Worth Dominates Commercial Real Estate in 2024", content: "Dallas-Fort Worth continues to reign supreme in the commercial real estate market, holding its top position for the third consecutive year according to CBRE Research's U.S. Investor Intentions Survey. Despite challenges such as high interest rates and tight credit conditions, investor sentiment has improved, with over 60% planning to purchase more real estate. The most sought-after investments include multifamily properties, industrial and logistics spaces, and grocery-anchored retail centers.", date: "June 26, 2024", category: "Texas News", image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg" },
    { slug: "celina-texas-americas-fastest-growing-city", title: "Celina, Texas: America's Fastest-Growing City", content: "Celina, Texas has been named America's fastest-growing city, reflecting the continued explosive growth in the Dallas-Fort Worth metroplex and surrounding areas.", date: "June 18, 2024", category: "Texas News", image: "/images/news/celina-texas-fastest-growing.jpg" },
    { slug: "alamo-drafthouse-locations-in-north-texas-close-abruptly", title: "Alamo Drafthouse Locations in North Texas Close Abruptly", content: "Multiple Alamo Drafthouse cinema locations in North Texas have closed their doors abruptly, impacting movie-goers and employees in the region.", date: "June 15, 2024", category: "Texas News", image: "/images/news/alamo-drafthouse-closing.jpg" },
    { slug: "texas-legislation-defines-ownership-of-geothermal-energy", title: "Texas Legislation Defines Ownership of Geothermal Energy", content: "New Texas legislation clarifies the ownership rights for geothermal energy resources, providing a framework for the growing renewable energy sector.", date: "June 12, 2024", category: "Texas News", image: "/images/news/geothermal-energy-legislation.jpg" },
    { slug: "governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights", title: "Governor Abbott's Role in Texas Economic Triumph - TAB Summit Highlights", content: "Governor Abbott discusses Texas's economic success at the TAB Summit, highlighting the state's business-friendly policies and continued growth.", date: "June 10, 2024", category: "Texas News", image: "/images/news/tab-summit-highlights.jpg" },
    { slug: "texas-ranked-1-in-america-for-best-business-climate", title: "Texas Ranked #1 in America for Best Business Climate", content: "Texas has been ranked as the best state in America for business climate, attracting companies and entrepreneurs from across the nation.", date: "June 8, 2024", category: "Texas News", image: "/images/news/texas-best-business-climate.jpg" },
    { slug: "economic-and-environmental-impact-of-texas-heat-waves", title: "Economic and Environmental Impact of Texas Heat Waves", content: "An analysis of how heat waves are affecting Texas's economy and environment, with implications for businesses and residents.", date: "June 5, 2024", category: "Texas News", image: "/images/news/texas-heat-waves-impact.jpg" },
    { slug: "debt-fi-energy-projects", title: "Debt Financing for Energy Projects", content: "Understanding debt financing options for energy projects in Texas, including opportunities in renewable energy and sustainable technologies.", date: "June 1, 2024", category: "Henry Harrison", image: "/images/news/debt-fi-energy-projects.jpg" },
];

export async function generateStaticParams() {
    const episodeSlugs = episodes.map((ep) => ({ slug: ep.slug }));
    const articleSlugs = articles.map((article) => ({ slug: article.slug }));
    return [...episodeSlugs, ...articleSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const episode = getEpisodeBySlug(slug);
    const article = articles.find(a => a.slug === slug);

    if (episode) {
        return {
            title: `${episode.guest} | Henry Harrison Podcast`,
            description: episode.description,
        };
    }

    if (article) {
        return {
            title: `${article.title} | Henry Harrison`,
            description: article.content.substring(0, 160),
        };
    }

    return {
        title: "Henry Harrison",
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const episode = getEpisodeBySlug(slug);
    const article = articles.find(a => a.slug === slug);

    if (episode) {
        return <EpisodePage episode={episode} />;
    }

    if (article) {
        return <ArticlePage article={article} />;
    }

    notFound();
}
