import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Categories data
const categories = [
    { name: "Henry Harrison", slug: "henry-harrison", description: "News and updates about Henry Harrison" },
    { name: "Texas News", slug: "texas-news", description: "Business news from Texas" },
    { name: "Real Estate", slug: "real-estate", description: "Real estate market updates" },
    { name: "Energy", slug: "energy", description: "Energy industry news" },
    { name: "Technology", slug: "technology", description: "Technology and innovation news" },
];

// Articles data
const articles = [
    {
        slug: "dallas-black-chamber-of-commerce-grants-minority",
        title: "Dallas Black Chamber of Commerce Distributes $30,000 in Grants to Minority Enterprises",
        excerpt: "The Dallas Black Chamber of Commerce has distributed grants to support minority-owned businesses in the Dallas area.",
        content: `<p>The Dallas Black Chamber of Commerce has announced the distribution of $30,000 in grants to minority-owned enterprises in the Dallas metropolitan area. This initiative aims to support small business growth and economic empowerment in underserved communities.</p>

<h2>Grant Distribution</h2>

<p>The grants were distributed among ten minority-owned businesses, each receiving $3,000 to support their operations and growth initiatives. The funding comes from a combination of corporate sponsorships and community donations.</p>

<h2>Impact on Local Economy</h2>

<p>These grants are expected to help stimulate the local economy by providing crucial capital to businesses that often face barriers in accessing traditional financing. The Chamber has emphasized its commitment to fostering entrepreneurship within minority communities.</p>

<h2>Looking Forward</h2>

<p>The Dallas Black Chamber of Commerce plans to continue this initiative, with hopes of expanding the grant program in the coming years. Applications for the next round of grants will open in early 2025.</p>`,
        date: "2024-07-02",
        category: "Texas News",
        image: "/images/news/dbcc-minority-grants.jpg",
        author: "Henry Harrison",
        tags: ["grants", "minority business", "dallas", "economic development"],
        published: true,
        featured: true,
    },
    {
        slug: "henry-harrison-invested-into-the-future-of-green-energy",
        title: "Henry Harrison Invested Into the Future of Green Energy",
        excerpt: "Henry Harrison continues his commitment to sustainable technologies with new investments in green energy.",
        content: `<p>Henry Harrison has announced significant new investments in green energy technologies, furthering his commitment to sustainable business practices and environmental stewardship.</p>

<h2>Investment Strategy</h2>

<p>The investments focus on renewable energy sources including solar, wind, and emerging green technologies. Harrison believes these sectors represent the future of energy production and offer substantial growth opportunities.</p>

<h2>Partnership Opportunities</h2>

<p>Through these investments, Harrison is seeking partnerships with innovative companies that are developing breakthrough technologies in the clean energy space. His focus is on scalable solutions that can make a meaningful impact on global energy consumption.</p>

<h2>Long-term Vision</h2>

<p>"The transition to green energy is not just an environmental necessity, it's an economic opportunity," Harrison stated. "We're positioning ourselves at the forefront of this transformation."</p>`,
        date: "2024-07-01",
        category: "Henry Harrison",
        image: "/images/news/green-energy-investment.jpg",
        author: "Henry Harrison",
        tags: ["green energy", "investment", "sustainability", "clean tech"],
        published: true,
        featured: true,
    },
    {
        slug: "henry-harrison-debt-financing-preliminary-approval-for-asic-network",
        title: "Henry Harrison Debt Financing Preliminary Approval for ASIC Network",
        excerpt: "Preliminary approval secured for debt financing to support ASIC Network expansion.",
        date: "2024-06-30",
        category: "Henry Harrison",
        image: "/images/news/asic-network-debt-financing.jpg",
        author: "Henry Harrison",
        tags: ["debt financing", "ASIC", "technology", "expansion"],
        published: true,
    },
    {
        slug: "dallas-fort-worth-commercial-real-estate-2024",
        title: "Dallas-Fort Worth Dominates Commercial Real Estate in 2024",
        excerpt: "Dallas-Fort Worth continues to reign supreme in the commercial real estate market, holding its top position for the third consecutive year.",
        content: `<p>Dallas-Fort Worth has maintained its position as the nation's top commercial real estate market for the third consecutive year, according to new industry reports.</p>

<h2>Market Performance</h2>

<p>The DFW metroplex saw over $50 billion in commercial real estate transactions in 2024, surpassing all other U.S. markets. Industrial, office, and multifamily sectors all showed strong performance.</p>

<h2>Key Drivers</h2>

<p>Several factors contribute to DFW's dominance:</p>
<ul>
<li>Strong population growth</li>
<li>Business-friendly regulatory environment</li>
<li>Strategic geographic location</li>
<li>Diverse economic base</li>
</ul>

<h2>Future Outlook</h2>

<p>Analysts predict continued growth in the DFW commercial real estate market through 2025, with particular strength expected in industrial and data center developments.</p>`,
        date: "2024-06-26",
        category: "Real Estate",
        image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg",
        author: "Henry Harrison",
        tags: ["real estate", "commercial", "dallas", "fort worth", "market trends"],
        published: true,
    },
    {
        slug: "celina-texas-americas-fastest-growing-city",
        title: "Celina, Texas: America's Fastest-Growing City",
        excerpt: "Celina, Texas has been named America's fastest-growing city, reflecting the continued growth in the Dallas-Fort Worth metroplex.",
        date: "2024-06-18",
        category: "Texas News",
        image: "/images/news/celina-texas-fastest-growing.jpg",
        author: "Henry Harrison",
        tags: ["celina", "texas", "growth", "development"],
        published: true,
    },
    {
        slug: "alamo-drafthouse-locations-in-north-texas-close-abruptly",
        title: "Alamo Drafthouse Locations in North Texas Close Abruptly",
        excerpt: "Multiple Alamo Drafthouse cinema locations in North Texas have closed their doors abruptly.",
        date: "2024-06-15",
        category: "Texas News",
        image: "/images/news/alamo-drafthouse-closing.jpg",
        author: "Henry Harrison",
        tags: ["alamo drafthouse", "cinema", "business closure", "north texas"],
        published: true,
    },
    {
        slug: "texas-legislation-defines-ownership-of-geothermal-energy",
        title: "Texas Legislation Defines Ownership of Geothermal Energy",
        excerpt: "New Texas legislation clarifies the ownership rights for geothermal energy resources.",
        date: "2024-06-12",
        category: "Energy",
        image: "/images/news/geothermal-energy-legislation.jpg",
        author: "Henry Harrison",
        tags: ["geothermal", "energy", "legislation", "texas law"],
        published: true,
    },
    {
        slug: "governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights",
        title: "Governor Abbott's Role in Texas Economic Triumph - TAB Summit Highlights",
        excerpt: "Governor Abbott discusses Texas's economic success at the TAB Summit.",
        date: "2024-06-10",
        category: "Texas News",
        image: "/images/news/tab-summit-highlights.jpg",
        author: "Henry Harrison",
        tags: ["governor abbott", "texas economy", "TAB summit", "business"],
        published: true,
    },
    {
        slug: "texas-ranked-1-in-america-for-best-business-climate",
        title: "Texas Ranked #1 in America for Best Business Climate",
        excerpt: "Texas has been ranked as the best state in America for business climate.",
        date: "2024-06-08",
        category: "Texas News",
        image: "/images/news/texas-best-business-climate.jpg",
        author: "Henry Harrison",
        tags: ["texas", "business climate", "rankings", "economic development"],
        published: true,
    },
    {
        slug: "economic-and-environmental-impact-of-texas-heat-waves",
        title: "Economic and Environmental Impact of Texas Heat Waves",
        excerpt: "An analysis of how heat waves are affecting Texas's economy and environment.",
        date: "2024-06-05",
        category: "Texas News",
        image: "/images/news/texas-heat-waves-impact.jpg",
        author: "Henry Harrison",
        tags: ["heat waves", "climate", "texas economy", "environment"],
        published: true,
    },
    {
        slug: "debt-fi-energy-projects",
        title: "Debt Financing for Energy Projects",
        excerpt: "Understanding debt financing options for energy projects in Texas.",
        date: "2024-06-01",
        category: "Energy",
        image: "/images/news/debt-fi-energy-projects.jpg",
        author: "Henry Harrison",
        tags: ["debt financing", "energy", "investment", "texas"],
        published: true,
    },
];

async function syncData() {
    console.log('Starting articles sync to Supabase...\n');

    // First, sync categories
    console.log('Syncing categories...');
    for (const category of categories) {
        const { error } = await supabase
            .from('categories')
            .upsert({
                name: category.name,
                slug: category.slug,
                description: category.description
            }, {
                onConflict: 'slug'
            });

        if (error) {
            console.error(`Error syncing category ${category.name}:`, error.message);
        } else {
            console.log(`  ✓ ${category.name} synced`);
        }
    }

    console.log('\nSyncing articles...');
    let successCount = 0;
    let errorCount = 0;

    for (const article of articles) {
        const articleData = {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content || null,
            date: article.date,
            category: article.category,
            image: article.image,
            author: article.author || 'Henry Harrison',
            tags: article.tags || null,
            published: article.published !== false,
            featured: article.featured || false
        };

        const { error } = await supabase
            .from('articles')
            .upsert(articleData, {
                onConflict: 'slug'
            });

        if (error) {
            console.error(`  ✗ Error syncing "${article.title}":`, error.message);
            errorCount++;
        } else {
            console.log(`  ✓ ${article.title}`);
            successCount++;
        }
    }

    console.log(`\n========================================`);
    console.log(`Sync complete!`);
    console.log(`  Successful: ${successCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`========================================`);
}

syncData().catch(console.error);
