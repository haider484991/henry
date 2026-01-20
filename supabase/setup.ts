// Setup script - Creates tables and seeds data
// Run with: npx tsx supabase/setup.ts

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Episode data
const episodes = [
    // Season 4
    { slug: "marcolivia", title: "Marc Ollivier", guest: "Marc Ollivier", season: 4, episode: 17, description: "Henry Harrison interviews Marc Ollivier about entrepreneurship, business strategies, and his journey in the business world.", image: "/images/podcast/season-4/marc-ollivier.png", youtube: "PBXmyOt4sNU" },
    { slug: "dida-clifton-theofficesquad", title: "Dida Clifton - TheOfficeSquad", guest: "Dida Clifton", season: 4, episode: 16, description: "Dida Clifton of TheOfficeSquad shares insights on business operations and building a successful company.", image: "/images/podcast/season-4/dida-clifton.png", youtube: "roI8VISp7nQ", headline: "The Entrepreneurial Journey of Dida Clifton", subheadline: "Business Success with Dida Clifton of TheOfficeSquad", full_description: "In this episode, Henry Harrison welcomes Dida Clifton, the visionary behind TheOfficeSquad.", key_insights: "Dida Clifton's interview offers invaluable insights into the world of entrepreneurship.", guest_phone: "702-649-3495", guest_email: "flightclub@theofficesquad.com", guest_address: "10501 West Gowan Road, Suite 260, Las Vegas, NV 89129", guest_website: "https://www.theofficesquad.com/", guest_website_label: "Visit TheOfficeSquad" },
    { slug: "neeti-khaitan", title: "Neeti Khaitan", guest: "Neeti Khaitan", season: 4, episode: 15, description: "Neeti Khaitan discusses her entrepreneurial journey and business insights.", image: "/images/podcast/season-4/neeti-khaitan.jpg", youtube: "wBn8I9CdhjY" },
    { slug: "clark-neily-of-the-cato-institute", title: "Clark Neily of the Cato Institute", guest: "Clark Neily", season: 4, episode: 14, description: "Clark Neily of the Cato Institute discusses policy, liberty, and their impact on business.", image: "/images/podcast/season-4/clark-neily.jpg", youtube: "nAIRb8O2-z0" },
    { slug: "dianna-booher", title: "Dianna Booher", guest: "Dianna Booher", season: 4, episode: 13, description: "Author Dianna Booher on communication, leadership, and personal branding.", image: "/images/podcast/season-4/dianna-booher.jpg", youtube: "P88XsdrU2qo" },
    { slug: "leise-sandeman", title: "Leise Sandeman", guest: "Leise Sandeman", season: 4, episode: 12, description: "Leise Sandeman shares her business expertise and entrepreneurial wisdom.", image: "/images/podcast/season-4/leise-sandeman.png", youtube: "I6dHm5AVo6s" },
    { slug: "james-dickey", title: "James Dickey", guest: "James Dickey", season: 4, episode: 11, description: "James Dickey on entrepreneurship and business in Texas.", image: "/images/podcast/season-4/james-dickey.png", youtube: "ybI9Cd2Ed5A" },
    { slug: "chris-brown-rj-byrd-search-group", title: "Chris Brown & RJ Byrd - Search Group Partners", guest: "Chris Brown & RJ Byrd", season: 4, episode: 10, description: "Chris Brown and RJ Byrd of Search Group Partners discuss executive recruiting and talent acquisition.", soundcloud: "from-capitol-hill-to-mountain-peaks-with-chris-brown-of-rj-byrd-search-group", image: "/images/podcast/season-4/chris-brown-rj-byrd.jpg", youtube: "ONt0YPfwVTk" },
    { slug: "harry-hunsicker", title: "Harry Hunsicker", guest: "Harry Hunsicker", season: 4, episode: 9, description: "Author and entrepreneur Harry Hunsicker shares his unique perspective on business and storytelling.", soundcloud: "harry-hunsicker-joins-dallas-henry-harrison-on-entrepreneurs-business-and-finance", image: "/images/podcast/season-4/harry-hunsicker.jpg", youtube: "VEMosvxE-5E" },
    { slug: "alexandre-teplitxky-smart-pm-technologies", title: "Alexandre Teplitxky - Smart PM Technologies", guest: "Alexandre Teplitxky", season: 4, episode: 8, description: "Alexandre Teplitxky of Smart PM Technologies on construction technology and innovation.", soundcloud: "alexandre-teplitxky-marketing-leader-at-smart-pm-technologies", image: "/images/podcast/season-4/alexandre-teplitxky.png", youtube: "6b_5soNnda4" },
    { slug: "albert-bou-fadel-with-smartbarrel", title: "Albert Bou-Fadel with SmartBarrel", guest: "Albert Bou-Fadel", season: 4, episode: 7, description: "Albert Bou-Fadel with SmartBarrel discusses construction technology and workforce management.", soundcloud: "automating-construction-timekeeping-with-smartbarrel-conversation-with-albert-bou-fadel", image: "/images/podcast/season-4/albert-bou-fadel.png", youtube: "KFacHIEzUvQ" },
    { slug: "james-poen-richardson-saw-and-lawn-mower", title: "James Poen - Richardson Saw and Lawn Mower", guest: "James Poen", season: 4, episode: 6, description: "James Poen of Richardson Saw and Lawn Mower on building a family business.", soundcloud: "jamespoen", image: "/images/podcast/season-4/james-poen.png", youtube: "Fnp62F8vG88" },
    { slug: "henry-harrison-sits-down-with-jack-carrere-of-prokeep", title: "Jack Carrere of Prokeep", guest: "Jack Carrere", season: 4, episode: 5, description: "Jack Carrere of Prokeep on technology solutions for distributors.", soundcloud: "jack-carrere-of-prokeep-with-henry-harrison-from-dallas-tx", image: "/images/podcast/season-4/jack-carrere.png", youtube: "BICFUukxXfU" },
    { slug: "chaitanya-nk-ceo-of-track-3d", title: "Chaitanya NK - CEO of Track 3D", guest: "Chaitanya NK", season: 4, episode: 4, description: "Chaitanya NK, CEO of Track 3D on innovation and 3D technology.", soundcloud: "chaitanya-nk-track-3d-ceo-joins-henry-harrison-on-the-entrepreneurs-business-finance", image: "/images/podcast/season-4/chaitanya-nk.jpg", youtube: "FsMtQjAbG74" },
    { slug: "glenn-poulos", title: "Glenn Poulos", guest: "Glenn Poulos", season: 4, episode: 3, description: "Glenn Poulos shares entrepreneurial insights and business strategies.", soundcloud: "glenn-poulos-on-henry-harrison-podcast-entrepreneurs-business-finance", image: "/images/podcast/season-4/glenn-poulos.jpg", youtube: "BEskMJ6w7J4" },
    { slug: "burt-copeland-new-life-cfo", title: "Burt Copeland - New Life CFO", guest: "Burt Copeland", season: 4, episode: 2, description: "Burt Copeland of New Life CFO on financial leadership and fractional CFO services.", soundcloud: "burt-copeland-on-henry", image: "/images/podcast/season-4/burt-copeland.png", youtube: "McrjpKBnBDw" },
    { slug: "hugh-massie-dna-behavior", title: "Hugh Massie - DNA Behavior", guest: "Hugh Massie", season: 4, episode: 1, description: "Hugh Massie of DNA Behavior on understanding behavioral patterns in business.", soundcloud: "hugh-massie-executive-chairman-founder-dna-behavior", image: "/images/podcast/season-4/hugh-massie.png", youtube: "ng7RPPw32mU" },
    // Season 3
    { slug: "chris-mckee", title: "Chris McKee - Founder Venturity Financial", guest: "Chris McKee", season: 3, episode: 10, description: "Chris McKee of Founder Venturity Financial discusses entrepreneurial finance and supporting business growth.", image: "/images/podcast/season-3/chris-mckee.jpg", youtube: "YwKwaDsbFlM" },
    { slug: "don-williams", title: "Don Williams - Don Williams Global", guest: "Don Williams", season: 3, episode: 9, description: "Don Williams of Don Williams Global shares insights on global business strategies.", image: "/images/podcast/season-3/don-williams.jpg", youtube: "F-ZiTha5zXY" },
    { slug: "subbase-ceo-eric-helitzer", title: "Eric Helitzer - SubBase CEO", guest: "Eric Helitzer", season: 3, episode: 8, description: "Eric Helitzer, CEO of SubBase on construction technology and subcontractor management.", image: "/images/podcast/season-3/eric-helitzer.jpg", youtube: "8CUQXXVBv90" },
    { slug: "josh-levy-document-crunch", title: "Josh Levy - Document Crunch", guest: "Josh Levy", season: 3, episode: 7, description: "Josh Levy of Document Crunch on legal tech innovation in construction.", youtube: "zOIrLIiMPow" },
    { slug: "private-jeweler-carter-malouf", title: "Carter Malouf - Private Jeweler", guest: "Carter Malouf", season: 3, episode: 6, description: "Private jeweler Carter Malouf on the luxury business and craftsmanship.", youtube: "M2YTPDYRIdo" },
    { slug: "henry-harrison-tim-goeglein", title: "Tim Goeglein", guest: "Tim Goeglein", season: 3, episode: 5, description: "Tim Goeglein shares insights on leadership and public service.", image: "/images/podcast/season-3/tim-goeglein.jpg", youtube: "MaJE7L2vAnI" },
    { slug: "new-artisan-distillery-don-short", title: "Don Short - New Artisan Distillery", guest: "Don Short", season: 3, episode: 4, description: "Don Short of New Artisan Distillery on craft spirits and entrepreneurship.", youtube: "gVe8y6iQDps" },
    { slug: "john-cornelsen-evolving-texas-indigo-yoga-juggle", title: "John Cornelsen - Evolving Texas & Indigo Yoga", guest: "John Cornelsen", season: 3, episode: 3, description: "John Cornelsen of Evolving Texas and Indigo Yoga on diversified entrepreneurship.", youtube: "a6pXbONw94g" },
    { slug: "bob-fox", title: "Bob Fox", guest: "Bob Fox", season: 3, episode: 2, description: "Bob Fox shares his entrepreneurial experience and business wisdom.", youtube: "6vUWfCUkkAQ" },
    { slug: "low-voltage-switchgear-manufacturer-jeff-strong-corr-solutions-electrical", title: "Jeff Strong - Corr Solutions Electrical", guest: "Jeff Strong", season: 3, episode: 1, description: "Jeff Strong of Corr Solutions Electrical on manufacturing and electrical solutions.", youtube: "ay-hBKTnENU" },
    // Season 2
    { slug: "dallas-tx-henry-harrison-podcast-s2-ep1-david-wang", title: "David Wang", guest: "David Wang", season: 2, episode: 1, description: "Season 2 kicks off with David Wang discussing entrepreneurship and business.", youtube: "xmZ8DlSWUNs" },
    { slug: "dallas-tx-tom-motlow", title: "Tom Motlow", guest: "Tom Motlow", season: 2, episode: 2, description: "Tom Motlow shares his business journey and entrepreneurial insights.", youtube: "OV5Q2QL5mbg" },
    { slug: "dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen", title: "Shark Tank's Mitch Allen - Hire Santa", guest: "Mitch Allen", season: 2, episode: 3, description: "Shark Tank's Mitch Allen of Hire Santa on building a seasonal business empire.", youtube: "VEx7EM9W7JE" },
    { slug: "karl-chiao", title: "Karl Chiao", guest: "Karl Chiao", season: 2, episode: 4, description: "Karl Chiao on his journey from real estate developer to Executive Director at the Dallas Historical Society.", image: "/images/podcast/season-2/karl-chiao.jpg", youtube: "782IGL5Hyug" },
    { slug: "chloe-smith", title: "Chloe Smith - CEO of Mercator AI", guest: "Chloe Smith", season: 2, episode: 5, description: "Chloe Smith, CEO of Mercator AI discusses AI innovation and entrepreneurship.", youtube: "BUHJE4ZOMUo" },
    { slug: "dallas-henry-harrison-liam-coakley", title: "Liam Coakley", guest: "Liam Coakley", season: 2, episode: 6, description: "Liam Coakley shares entrepreneurial wisdom and business insights.", youtube: "D_FRfxtk7tk" },
    { slug: "dallas-henry-harrison-james-benham", title: "James Benham", guest: "James Benham", season: 2, episode: 7, description: "James Benham on business strategies and entrepreneurial growth.", youtube: "8uitwKnsq6A" },
    { slug: "dallas-henry-harrison-steve-dellorto", title: "Steve Dell'Orto", guest: "Steve Dell'Orto", season: 2, episode: 8, description: "Steve Dell'Orto on his entrepreneurial journey and business lessons.", youtube: "C2H1uroIqwY" },
    { slug: "advancing-cancer-treatments-paul-romness", title: "Paul Romness - Advancing Cancer Treatments", guest: "Paul Romness", season: 2, episode: 9, description: "Paul Romness on advancing cancer treatments and healthcare innovation.", image: "/images/podcast/season-2/paul-romness.png", youtube: "Zikzs6hwsRM" },
    { slug: "real-estate-entrepreneurship-jeremy-brandt", title: "Jeremy Brandt - Real Estate Entrepreneurship", guest: "Jeremy Brandt", season: 2, episode: 10, description: "Jeremy Brandt on real estate entrepreneurship and building successful businesses.", youtube: "TCap0fmPPO8" },
    { slug: "bob-mccarthys-entrepreneurial-journey", title: "Bob McCarthy's Entrepreneurial Journey", guest: "Bob McCarthy", season: 2, episode: 11, description: "Bob McCarthy shares his entrepreneurial journey and lessons learned.", image: "/images/podcast/season-2/bob-mccarthy.jpg", youtube: "irdVT_MuX3g" },
    // Season 1
    { slug: "henry-harrison-podcast-rick-kersey-episode-01", title: "Rick Kersey - Episode 01", guest: "Rick Kersey", season: 1, episode: 1, description: "Dallas Texas: In this episode of the Henry Harrison Entrepreneurs, Business, and Finance Podcast, join us for a captivating conversation as Henry interviews Rick Kersey, the visionary entrepreneur behind Green Tech MENA.", soundcloud: "episode-1-rick-kersey", youtube: "kOvVihQXp8k", headline: "Episode 01: Rick Kersey", subheadline: "The Visionary Entrepreneur Behind Green Tech MENA" },
    { slug: "henry-harrison-doug-hardwick-dallas-texas", title: "Doug Hardwick", guest: "Doug Hardwick", season: 1, episode: 2, description: "Dallas Texas: In this episode, Henry sits down with Doug Hardwick, a seasoned consultant with 20 years of experience in the dynamic world of oil and gas.", soundcloud: "henry-harrison-podcast-episode-2-doug-hardwick", youtube: "ctVtbiiamm0", headline: "Episode 02: Doug Hardwick", subheadline: "20 Years of Experience in Oil and Gas" },
    { slug: "henry-harrison-podcast-billy-gee", title: "Billy Gee", guest: "Billy Gee", season: 1, episode: 3, description: "Dallas Texas: In this edition, Henry engages in a thought-provoking conversation with Billy Gee, the visionary owner and founder of WARank.com.", soundcloud: "henry-harrison-podcast-episode-3-billy-gee", youtube: "9ihxYpqxrzs", headline: "Episode 03: Billy Gee", subheadline: "Visionary Owner and Founder of WARank.com" },
    { slug: "henry-harrison-podcast-jonathon-ringler", title: "Jonathon Ringler", guest: "Jonathon Ringler", season: 1, episode: 4, description: "Dallas Texas' Henry Harrison interviews Jonathon Ringler in this episode of The Entrepreneurs, Business, and Finance Podcast.", soundcloud: "henry-harrison-podcast-episode-04-jonathon-ringler", youtube: "YmKLb42HKZk", headline: "Episode 04: Jonathon Ringler", subheadline: "Entrepreneurship and Business Strategies" },
    { slug: "henry-harrison-podcast-larry-rau", title: "Larry Rau", guest: "Larry Rau", season: 1, episode: 5, description: "Henry Harrison sits down with Larry Rau, an alternative finance strategist and founder of solar technology companies.", soundcloud: "henry-harrison-podcast-episode-05-larry-rau", youtube: "Ix8R2D-2qkc", headline: "Episode 05: Larry Rau", subheadline: "Alternative Finance Strategist and Solar Technology Pioneer" },
    { slug: "henry-harrison-dallas-texas-john-voigt", title: "John Voigt", guest: "John Voigt", season: 1, episode: 6, description: "Join Henry as he chats with John Voigt, a former professional artist turned entrepreneur and owner of Tribute Kitchen and Bath in Dallas, Texas.", soundcloud: "henry-harrison-podcast-episode-06-john-voigt", youtube: "U1vLJb8XVHM", headline: "Episode 06: John Voigt", subheadline: "From Professional Artist to Entrepreneur" },
    { slug: "henry-harrison-dallas-texas-podcast-gary-burrows", title: "Gary Burrows", guest: "Gary Burrows", season: 1, episode: 7, description: "From Dallas, Henry Harrison explores the fascinating journey of Gary Burrows in this episode of the Henry Harrison Entrepreneurs, Business, and Finance Podcast.", soundcloud: "gary-burrows", youtube: "CZ3CsLU0EME", headline: "Episode 07: Gary Burrows", subheadline: "A Fascinating Entrepreneurial Journey" },
    { slug: "dallas-henry-harrison-wilene-dunn", title: "Wilene Dunn", guest: "Wilene Dunn", season: 1, episode: 8, description: "Dallas' Henry Harrison Entrepreneurs, Business, and Finance Podcast - Henry engages in a captivating conversation with Wilene Dunn.", soundcloud: "henry-harrison-podcast-episode-08-wilene-dunn", youtube: "5oeDvXFo8F4", headline: "Episode 08: Wilene Dunn", subheadline: "A Captivating Conversation on Business" },
    { slug: "henry-harrison-dallas-jeff-vernon-of-mineral-royalties-group-episode-09", title: "Jeff Vernon - Mineral Royalties Group", guest: "Jeff Vernon", season: 1, episode: 9, description: "Henry Harrison Dallas | Jeff Vernon of Mineral Royalties Group offers unique insights into the complexities of the oil and gas industry.", soundcloud: "henry-harrison-dallas-episode-09-jeff-vernon", youtube: "3X81jmA9Z2Q", headline: "Episode 09: Jeff Vernon", subheadline: "Mineral Royalties Group - Oil and Gas Industry Insights" },
    { slug: "henry-harrison-dallas-podcast-alex-vantarakis-episode-10", title: "Alex Vantarakis", guest: "Alex Vantarakis", season: 1, episode: 10, description: "Gain invaluable insights into the world of business transfers as Henry Harrison sits down with Alex Vantarakis, an authority and recognized expert in the field!", soundcloud: "henry-harrison-dallas-podcast-alex-vantarakis-episode-10", youtube: "08HfiUin8OA", headline: "Episode 10: Alex Vantarakis", subheadline: "Expert in Business Transfers" },
    { slug: "henry-harrison-dallas-tx-courtland-kilpatrick", title: "Courtland Kilpatrick", guest: "Courtland Kilpatrick", season: 1, episode: 11, description: "Henry Harrison Dallas TX Podcast features Courtland Kilpatrick discussing business and entrepreneurship in Dallas, Texas.", soundcloud: "henry-harrison-dallas-tx-podcast-courtland-kilpatrick-episode-11", youtube: "Rm-QVCUu7b8", headline: "Episode 11: Courtland Kilpatrick", subheadline: "Business and Entrepreneurship in Dallas" },
];

// Articles data
const articles = [
    { slug: "dallas-black-chamber-of-commerce-grants-minority", title: "Dallas Black Chamber of Commerce Distributes $30,000 in Grants to Minority Enterprises", excerpt: "The Dallas Black Chamber of Commerce has distributed grants to support minority-owned businesses in the Dallas area.", content: "The Dallas Black Chamber of Commerce has announced the distribution of $30,000 in grants to minority-owned enterprises in the Dallas metropolitan area.", date: "2024-07-02", category: "Texas News", image: "/images/news/dbcc-minority-grants.jpg", author: "Henry Harrison", tags: ["grants", "minority business", "dallas"], featured: true },
    { slug: "henry-harrison-invested-into-the-future-of-green-energy", title: "Henry Harrison Invested Into the Future of Green Energy", excerpt: "Henry Harrison continues his commitment to sustainable technologies with new investments in green energy.", date: "2024-07-01", category: "Henry Harrison", image: "/images/news/green-energy-investment.jpg", author: "Henry Harrison", tags: ["green energy", "investment"], featured: true },
    { slug: "henry-harrison-debt-financing-preliminary-approval-for-asic-network", title: "Henry Harrison Debt Financing Preliminary Approval for ASIC Network", excerpt: "Preliminary approval secured for debt financing to support ASIC Network expansion.", date: "2024-06-30", category: "Henry Harrison", image: "/images/news/asic-network-debt-financing.jpg", author: "Henry Harrison", tags: ["debt financing", "ASIC"] },
    { slug: "dallas-fort-worth-commercial-real-estate-2024", title: "Dallas-Fort Worth Dominates Commercial Real Estate in 2024", excerpt: "Dallas-Fort Worth continues to reign supreme in the commercial real estate market.", date: "2024-06-26", category: "Real Estate", image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg", author: "Henry Harrison", tags: ["real estate", "commercial"] },
    { slug: "celina-texas-americas-fastest-growing-city", title: "Celina, Texas: America's Fastest-Growing City", excerpt: "Celina, Texas has been named America's fastest-growing city.", date: "2024-06-18", category: "Texas News", image: "/images/news/celina-texas-fastest-growing.jpg", author: "Henry Harrison", tags: ["celina", "texas", "growth"] },
    { slug: "alamo-drafthouse-locations-in-north-texas-close-abruptly", title: "Alamo Drafthouse Locations in North Texas Close Abruptly", excerpt: "Multiple Alamo Drafthouse cinema locations in North Texas have closed their doors abruptly.", date: "2024-06-15", category: "Texas News", image: "/images/news/alamo-drafthouse-closing.jpg", author: "Henry Harrison", tags: ["alamo drafthouse", "cinema"] },
    { slug: "texas-legislation-defines-ownership-of-geothermal-energy", title: "Texas Legislation Defines Ownership of Geothermal Energy", excerpt: "New Texas legislation clarifies the ownership rights for geothermal energy resources.", date: "2024-06-12", category: "Energy", image: "/images/news/geothermal-energy-legislation.jpg", author: "Henry Harrison", tags: ["geothermal", "energy"] },
    { slug: "governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights", title: "Governor Abbott's Role in Texas Economic Triumph - TAB Summit Highlights", excerpt: "Governor Abbott discusses Texas's economic success at the TAB Summit.", date: "2024-06-10", category: "Texas News", image: "/images/news/tab-summit-highlights.jpg", author: "Henry Harrison", tags: ["governor abbott", "texas economy"] },
    { slug: "texas-ranked-1-in-america-for-best-business-climate", title: "Texas Ranked #1 in America for Best Business Climate", excerpt: "Texas has been ranked as the best state in America for business climate.", date: "2024-06-08", category: "Texas News", image: "/images/news/texas-best-business-climate.jpg", author: "Henry Harrison", tags: ["texas", "business climate"] },
    { slug: "economic-and-environmental-impact-of-texas-heat-waves", title: "Economic and Environmental Impact of Texas Heat Waves", excerpt: "An analysis of how heat waves are affecting Texas's economy and environment.", date: "2024-06-05", category: "Texas News", image: "/images/news/texas-heat-waves-impact.jpg", author: "Henry Harrison", tags: ["heat waves", "climate"] },
    { slug: "debt-fi-energy-projects", title: "Debt Financing for Energy Projects", excerpt: "Understanding debt financing options for energy projects in Texas.", date: "2024-06-01", category: "Energy", image: "/images/news/debt-fi-energy-projects.jpg", author: "Henry Harrison", tags: ["debt financing", "energy"] },
];

// Categories data
const categories = [
    { name: "Henry Harrison", slug: "henry-harrison", description: "News and updates about Henry Harrison" },
    { name: "Texas News", slug: "texas-news", description: "Business news from Texas" },
    { name: "Real Estate", slug: "real-estate", description: "Real estate market updates" },
    { name: "Energy", slug: "energy", description: "Energy industry news" },
    { name: "Technology", slug: "technology", description: "Technology and innovation news" },
];

async function setup() {
    console.log('🚀 Starting database setup...\n');

    // Step 1: Insert categories
    console.log('📁 Inserting categories...');
    for (const category of categories) {
        const { error } = await supabase.from('categories').upsert(category, { onConflict: 'slug' });
        if (error) {
            console.error(`  ❌ Error inserting category ${category.name}:`, error.message);
        } else {
            console.log(`  ✓ ${category.name}`);
        }
    }

    // Step 2: Insert episodes
    console.log('\n🎙️ Inserting episodes...');
    let episodeCount = 0;
    for (const episode of episodes) {
        const { error } = await supabase.from('episodes').upsert(episode, { onConflict: 'slug' });
        if (error) {
            console.error(`  ❌ Error inserting episode ${episode.slug}:`, error.message);
        } else {
            episodeCount++;
            console.log(`  ✓ S${episode.season}E${episode.episode}: ${episode.guest}`);
        }
    }

    // Step 3: Insert articles
    console.log('\n📰 Inserting articles...');
    let articleCount = 0;
    for (const article of articles) {
        const { error } = await supabase.from('articles').upsert(article, { onConflict: 'slug' });
        if (error) {
            console.error(`  ❌ Error inserting article ${article.slug}:`, error.message);
        } else {
            articleCount++;
            console.log(`  ✓ ${article.title.substring(0, 50)}...`);
        }
    }

    console.log('\n✅ Database setup complete!');
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Episodes: ${episodeCount}/${episodes.length}`);
    console.log(`   Articles: ${articleCount}/${articles.length}`);
}

setup().catch(console.error);
