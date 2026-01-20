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

// All episodes data from static file
const episodes = [
    // Season 5
    {
        slug: "burt-copeland-new-life-cfo-s5",
        title: "Burt Copeland - New Life CFO",
        guest: "Burt Copeland",
        season: 5,
        episode: 1,
        description: "Burt Copeland of New Life CFO on financial leadership and fractional CFO services.",
        youtube: "McrjpKBnBDw",
        headline: "Burt Copeland - New Life CFO",
        subheadline: "Fractional CFO Services & Financial Leadership",
        fullDescription: "<p>In this episode, Henry Harrison welcomes Burt Copeland, founder of New Life CFO. Burt shares his journey from corporate finance to launching a fractional CFO practice that helps small and mid-sized businesses access top-tier financial leadership without the full-time executive cost.</p><p>The conversation explores how businesses can benefit from strategic financial guidance, the importance of cash flow management, and how fractional CFO services are transforming how companies approach their finances.</p>",
        keyInsights: "<ul><li>Fractional CFO services provide enterprise-level financial expertise at a fraction of the cost</li><li>Cash flow management is critical for business sustainability</li><li>Strategic financial planning helps businesses scale effectively</li><li>Many growing companies need CFO guidance but can't justify a full-time hire</li></ul>",
        guestContact: {
            website: "https://newlifecfo.com",
            websiteLabel: "Visit New Life CFO"
        },
        published: true
    },
    {
        slug: "anthony-franco",
        title: "Anthony Franco",
        guest: "Anthony Franco",
        season: 5,
        episode: 2,
        description: "Anthony Franco shares his entrepreneurial journey and business insights.",
        youtube: "qN0UjDITkeE",
        soundcloud: "anthony-franco-joins-dallas-henry-harrison-on-entrepreneurs-business-and-finance",
        published: true
    },
    // Season 4
    { slug: "marcolivia", title: "Marc Ollivier", guest: "Marc Ollivier", season: 4, episode: 17, description: "Henry Harrison interviews Marc Ollivier about entrepreneurship, business strategies, and his journey in the business world.", image: "/images/podcast/season-4/marc-ollivier.png", youtube: "PBXmyOt4sNU", published: true },
    {
        slug: "dida-clifton-theofficesquad",
        title: "Dida Clifton - TheOfficeSquad",
        guest: "Dida Clifton",
        season: 4,
        episode: 16,
        description: "Dida Clifton of TheOfficeSquad shares insights on business operations and building a successful company.",
        image: "/images/podcast/season-4/dida-clifton.png",
        youtube: "roI8VISp7nQ",
        headline: "The Entrepreneurial Journey of Dida Clifton",
        subheadline: "Business Success with Dida Clifton of TheOfficeSquad",
        fullDescription: "In this episode, Henry Harrison welcomes Dida Clifton, the visionary behind TheOfficeSquad. Dida shares her remarkable journey of building a thriving business that revolutionizes back-office solutions for entrepreneurs. With over two decades of experience, she discusses the unique blend of military precision and entrepreneurial spirit that has driven her success. The conversation explores the evolution of TheOfficeSquad, its innovative approach to operations, and the exciting path to franchising. Discover how Dida's commitment to client relationships and her strategic insights have shaped a business model that empowers entrepreneurs to focus on growth and efficiency.",
        keyInsights: "Dida Clifton's interview offers invaluable insights into the world of entrepreneurship. She emphasizes the importance of consolidating administrative functions to streamline business operations, a strategy that sets TheOfficeSquad apart. Her dedication to building long-term client relationships is evident, with many clients staying for years due to the reliable support and continuity her team provides. Dida's military background plays a crucial role in her business philosophy, fostering a culture of loyalty and preparedness that ensures success. Moreover, Dida shares her journey into franchising, highlighting the benefits of adopting her proven systems to quickly establish a successful business. Her lessons in entrepreneurship underscore the necessity of networking, learning from mentors, and balancing confidence with humility. Dida's story is a testament to the potential for achieving a harmonious work-life balance while pursuing entrepreneurial dreams, offering inspiration and practical advice for aspiring business owners.",
        guestContact: {
            phone: "702-649-3495",
            email: "flightclub@theofficesquad.com",
            address: "10501 West Gowan Road, Suite 260, Las Vegas, NV 89129",
            website: "https://www.theofficesquad.com/",
            websiteLabel: "Visit TheOfficeSquad"
        },
        published: true
    },
    { slug: "neeti-khaitan", title: "Neeti Khaitan", guest: "Neeti Khaitan", season: 4, episode: 15, description: "Neeti Khaitan discusses her entrepreneurial journey and business insights.", image: "/images/podcast/season-4/neeti-khaitan.jpg", youtube: "wBn8I9CdhjY", published: true },
    { slug: "clark-neily-of-the-cato-institute", title: "Clark Neily of the Cato Institute", guest: "Clark Neily", season: 4, episode: 14, description: "Clark Neily of the Cato Institute discusses policy, liberty, and their impact on business.", image: "/images/podcast/season-4/clark-neily.jpg", youtube: "nAIRb8O2-z0", published: true },
    { slug: "dianna-booher", title: "Dianna Booher", guest: "Dianna Booher", season: 4, episode: 13, description: "Author Dianna Booher on communication, leadership, and personal branding.", image: "/images/podcast/season-4/dianna-booher.jpg", youtube: "P88XsdrU2qo", published: true },
    { slug: "leise-sandeman", title: "Leise Sandeman", guest: "Leise Sandeman", season: 4, episode: 12, description: "Leise Sandeman shares her business expertise and entrepreneurial wisdom.", image: "/images/podcast/season-4/leise-sandeman.png", youtube: "I6dHm5AVo6s", published: true },
    { slug: "james-dickey", title: "James Dickey", guest: "James Dickey", season: 4, episode: 11, description: "James Dickey on entrepreneurship and business in Texas.", image: "/images/podcast/season-4/james-dickey.png", youtube: "ybI9Cd2Ed5A", published: true },
    { slug: "chris-brown-rj-byrd-search-group", title: "Chris Brown & RJ Byrd - Search Group Partners", guest: "Chris Brown & RJ Byrd", season: 4, episode: 10, description: "Chris Brown and RJ Byrd of Search Group Partners discuss executive recruiting and talent acquisition.", soundcloud: "from-capitol-hill-to-mountain-peaks-with-chris-brown-of-rj-byrd-search-group", image: "/images/podcast/season-4/chris-brown-rj-byrd.jpg", youtube: "ONt0YPfwVTk", published: true },
    { slug: "harry-hunsicker", title: "Harry Hunsicker", guest: "Harry Hunsicker", season: 4, episode: 9, description: "Author and entrepreneur Harry Hunsicker shares his unique perspective on business and storytelling.", soundcloud: "harry-hunsicker-joins-dallas-henry-harrison-on-entrepreneurs-business-and-finance", image: "/images/podcast/season-4/harry-hunsicker.jpg", youtube: "VEMosvxE-5E", published: true },
    { slug: "alexandre-teplitxky-smart-pm-technologies", title: "Alexandre Teplitxky - Smart PM Technologies", guest: "Alexandre Teplitxky", season: 4, episode: 8, description: "Alexandre Teplitxky of Smart PM Technologies on construction technology and innovation.", soundcloud: "alexandre-teplitxky-marketing-leader-at-smart-pm-technologies", image: "/images/podcast/season-4/alexandre-teplitxky.png", youtube: "6b_5soNnda4", published: true },
    { slug: "albert-bou-fadel-with-smartbarrel", title: "Albert Bou-Fadel with SmartBarrel", guest: "Albert Bou-Fadel", season: 4, episode: 7, description: "Albert Bou-Fadel with SmartBarrel discusses construction technology and workforce management.", soundcloud: "automating-construction-timekeeping-with-smartbarrel-conversation-with-albert-bou-fadel", image: "/images/podcast/season-4/albert-bou-fadel.png", youtube: "KFacHIEzUvQ", published: true },
    { slug: "james-poen-richardson-saw-and-lawn-mower", title: "James Poen - Richardson Saw and Lawn Mower", guest: "James Poen", season: 4, episode: 6, description: "James Poen of Richardson Saw and Lawn Mower on building a family business.", soundcloud: "jamespoen", image: "/images/podcast/season-4/james-poen.png", youtube: "Fnp62F8vG88", published: true },
    { slug: "henry-harrison-sits-down-with-jack-carrere-of-prokeep", title: "Jack Carrere of Prokeep", guest: "Jack Carrere", season: 4, episode: 5, description: "Jack Carrere of Prokeep on technology solutions for distributors.", soundcloud: "jack-carrere-of-prokeep-with-henry-harrison-from-dallas-tx", image: "/images/podcast/season-4/jack-carrere.png", youtube: "BICFUukxXfU", published: true },
    { slug: "chaitanya-nk-ceo-of-track-3d", title: "Chaitanya NK - CEO of Track 3D", guest: "Chaitanya NK", season: 4, episode: 4, description: "Chaitanya NK, CEO of Track 3D on innovation and 3D technology.", soundcloud: "chaitanya-nk-track-3d-ceo-joins-henry-harrison-on-the-entrepreneurs-business-finance", image: "/images/podcast/season-4/chaitanya-nk.jpg", youtube: "FsMtQjAbG74", published: true },
    { slug: "glenn-poulos", title: "Glenn Poulos", guest: "Glenn Poulos", season: 4, episode: 3, description: "Glenn Poulos shares entrepreneurial insights and business strategies.", soundcloud: "glenn-poulos-on-henry-harrison-podcast-entrepreneurs-business-finance", image: "/images/podcast/season-4/glenn-poulos.jpg", youtube: "BEskMJ6w7J4", published: true },
    { slug: "burt-copeland-new-life-cfo", title: "Burt Copeland - New Life CFO", guest: "Burt Copeland", season: 4, episode: 2, description: "Burt Copeland of New Life CFO on financial leadership and fractional CFO services.", soundcloud: "burt-copeland-on-henry", image: "/images/podcast/season-4/burt-copeland.png", youtube: "McrjpKBnBDw", published: true },
    { slug: "hugh-massie-dna-behavior", title: "Hugh Massie - DNA Behavior", guest: "Hugh Massie", season: 4, episode: 1, description: "Hugh Massie of DNA Behavior on understanding behavioral patterns in business.", soundcloud: "hugh-massie-executive-chairman-founder-dna-behavior", image: "/images/podcast/season-4/hugh-massie.png", youtube: "ng7RPPw32mU", published: true },

    // Season 3
    { slug: "chris-mckee", title: "Chris McKee - Founder Venturity Financial", guest: "Chris McKee", season: 3, episode: 10, description: "Chris McKee of Founder Venturity Financial discusses entrepreneurial finance and supporting business growth.", image: "/images/podcast/season-3/chris-mckee.jpg", youtube: "YwKwaDsbFlM", published: true },
    { slug: "don-williams", title: "Don Williams - Don Williams Global", guest: "Don Williams", season: 3, episode: 9, description: "Don Williams of Don Williams Global shares insights on global business strategies.", image: "/images/podcast/season-3/don-williams.jpg", youtube: "F-ZiTha5zXY", published: true },
    { slug: "subbase-ceo-eric-helitzer", title: "Eric Helitzer - SubBase CEO", guest: "Eric Helitzer", season: 3, episode: 8, description: "Eric Helitzer, CEO of SubBase on construction technology and subcontractor management.", image: "/images/podcast/season-3/eric-helitzer.jpg", youtube: "8CUQXXVBv90", published: true },
    { slug: "josh-levy-document-crunch", title: "Josh Levy - Document Crunch", guest: "Josh Levy", season: 3, episode: 7, description: "Josh Levy of Document Crunch on legal tech innovation in construction.", youtube: "zOIrLIiMPow", published: true },
    { slug: "private-jeweler-carter-malouf", title: "Carter Malouf - Private Jeweler", guest: "Carter Malouf", season: 3, episode: 6, description: "Private jeweler Carter Malouf on the luxury business and craftsmanship.", youtube: "M2YTPDYRIdo", published: true },
    { slug: "henry-harrison-tim-goeglein", title: "Tim Goeglein", guest: "Tim Goeglein", season: 3, episode: 5, description: "Tim Goeglein shares insights on leadership and public service.", image: "/images/podcast/season-3/tim-goeglein.jpg", youtube: "MaJE7L2vAnI", published: true },
    { slug: "new-artisan-distillery-don-short", title: "Don Short - New Artisan Distillery", guest: "Don Short", season: 3, episode: 4, description: "Don Short of New Artisan Distillery on craft spirits and entrepreneurship.", youtube: "gVe8y6iQDps", published: true },
    { slug: "john-cornelsen-evolving-texas-indigo-yoga-juggle", title: "John Cornelsen - Evolving Texas & Indigo Yoga", guest: "John Cornelsen", season: 3, episode: 3, description: "John Cornelsen of Evolving Texas and Indigo Yoga on diversified entrepreneurship.", youtube: "a6pXbONw94g", published: true },
    { slug: "bob-fox", title: "Bob Fox", guest: "Bob Fox", season: 3, episode: 2, description: "Bob Fox shares his entrepreneurial experience and business wisdom.", youtube: "6vUWfCUkkAQ", published: true },
    { slug: "low-voltage-switchgear-manufacturer-jeff-strong-corr-solutions-electrical", title: "Jeff Strong - Corr Solutions Electrical", guest: "Jeff Strong", season: 3, episode: 1, description: "Jeff Strong of Corr Solutions Electrical on manufacturing and electrical solutions.", youtube: "ay-hBKTnENU", published: true },

    // Season 2
    { slug: "dallas-tx-henry-harrison-podcast-s2-ep1-david-wang", title: "David Wang", guest: "David Wang", season: 2, episode: 1, description: "Season 2 kicks off with David Wang discussing entrepreneurship and business.", youtube: "xmZ8DlSWUNs", published: true },
    { slug: "dallas-tx-tom-motlow", title: "Tom Motlow", guest: "Tom Motlow", season: 2, episode: 2, description: "Tom Motlow shares his business journey and entrepreneurial insights.", youtube: "OV5Q2QL5mbg", published: true },
    { slug: "dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen", title: "Shark Tank's Mitch Allen - Hire Santa", guest: "Mitch Allen", season: 2, episode: 3, description: "Shark Tank's Mitch Allen of Hire Santa on building a seasonal business empire.", youtube: "VEx7EM9W7JE", published: true },
    { slug: "karl-chiao", title: "Karl Chiao", guest: "Karl Chiao", season: 2, episode: 4, description: "Karl Chiao on his journey from real estate developer to Executive Director at the Dallas Historical Society.", image: "/images/podcast/season-2/karl-chiao.jpg", youtube: "782IGL5Hyug", published: true },
    { slug: "chloe-smith", title: "Chloe Smith - CEO of Mercator AI", guest: "Chloe Smith", season: 2, episode: 5, description: "Chloe Smith, CEO of Mercator AI discusses AI innovation and entrepreneurship.", youtube: "BUHJE4ZOMUo", published: true },
    { slug: "dallas-henry-harrison-liam-coakley", title: "Liam Coakley", guest: "Liam Coakley", season: 2, episode: 6, description: "Liam Coakley shares entrepreneurial wisdom and business insights.", youtube: "D_FRfxtk7tk", published: true },
    { slug: "dallas-henry-harrison-james-benham", title: "James Benham", guest: "James Benham", season: 2, episode: 7, description: "James Benham on business strategies and entrepreneurial growth.", youtube: "8uitwKnsq6A", published: true },
    { slug: "dallas-henry-harrison-steve-dellorto", title: "Steve Dell'Orto", guest: "Steve Dell'Orto", season: 2, episode: 8, description: "Steve Dell'Orto on his entrepreneurial journey and business lessons.", youtube: "C2H1uroIqwY", published: true },
    { slug: "advancing-cancer-treatments-paul-romness", title: "Paul Romness - Advancing Cancer Treatments", guest: "Paul Romness", season: 2, episode: 9, description: "Paul Romness on advancing cancer treatments and healthcare innovation.", image: "/images/podcast/season-2/paul-romness.png", youtube: "Zikzs6hwsRM", published: true },
    { slug: "real-estate-entrepreneurship-jeremy-brandt", title: "Jeremy Brandt - Real Estate Entrepreneurship", guest: "Jeremy Brandt", season: 2, episode: 10, description: "Jeremy Brandt on real estate entrepreneurship and building successful businesses.", youtube: "TCap0fmPPO8", published: true },
    { slug: "bob-mccarthys-entrepreneurial-journey", title: "Bob McCarthy's Entrepreneurial Journey", guest: "Bob McCarthy", season: 2, episode: 11, description: "Bob McCarthy shares his entrepreneurial journey and lessons learned.", image: "/images/podcast/season-2/bob-mccarthy.jpg", youtube: "irdVT_MuX3g", published: true },

    // Season 1
    {
        slug: "henry-harrison-podcast-rick-kersey-episode-01",
        title: "Rick Kersey - Episode 01",
        guest: "Rick Kersey",
        season: 1,
        episode: 1,
        description: "Dallas Texas: In this episode of the Henry Harrison Entrepreneurs, Business, and Finance Podcast, join us for a captivating conversation as Henry interviews Rick Kersey, the visionary entrepreneur behind Green Tech MENA.",
        soundcloud: "episode-1-rick-kersey",
        youtube: "kOvVihQXp8k",
        headline: "Episode 01: Rick Kersey",
        subheadline: "The Visionary Entrepreneur Behind Green Tech MENA",
        fullDescription: "From Dallas Texas: In this episode of the Henry Harrison Entrepreneurs, Business, and Finance Podcast, join us for a captivating conversation as Henry interviews Rick Kersey, the visionary entrepreneur behind Green Tech MENA. With a rich history of transforming companies beyond their initial potential, Rick started with a small Midwest distribution company, turning it into the largest independent distributor in the region, ultimately selling it to a multi-billion-dollar company. Since then, Rick has ventured into various entrepreneurial endeavors, collaborating with over a dozen companies globally. His current focus includes spearheading technology for waste-to-energy solutions across Bangladesh, Egypt, the United Kingdom, and the MENA region.",
        published: true
    },
    {
        slug: "henry-harrison-doug-hardwick-dallas-texas",
        title: "Doug Hardwick",
        guest: "Doug Hardwick",
        season: 1,
        episode: 2,
        description: "Dallas Texas: In this episode, Henry sits down with Doug Hardwick, a seasoned consultant with 20 years of experience in the dynamic world of oil and gas.",
        soundcloud: "henry-harrison-podcast-episode-2-doug-hardwick",
        youtube: "ctVtbiiamm0",
        headline: "Episode 02: Doug Hardwick",
        subheadline: "20 Years of Experience in Oil and Gas",
        published: true
    },
    {
        slug: "henry-harrison-podcast-billy-gee",
        title: "Billy Gee",
        guest: "Billy Gee",
        season: 1,
        episode: 3,
        description: "Dallas Texas: In this edition, Henry engages in a thought-provoking conversation with Billy Gee, the visionary owner and founder of WARank.com.",
        soundcloud: "henry-harrison-podcast-episode-3-billy-gee",
        youtube: "9ihxYpqxrzs",
        headline: "Episode 03: Billy Gee",
        subheadline: "Visionary Owner and Founder of WARank.com",
        published: true
    },
    {
        slug: "henry-harrison-podcast-jonathon-ringler",
        title: "Jonathon Ringler",
        guest: "Jonathon Ringler",
        season: 1,
        episode: 4,
        description: "Dallas Texas' Henry Harrison interviews Jonathon Ringler in this episode of The Entrepreneurs, Business, and Finance Podcast.",
        soundcloud: "henry-harrison-podcast-episode-04-jonathon-ringler",
        youtube: "YmKLb42HKZk",
        headline: "Episode 04: Jonathon Ringler",
        subheadline: "Entrepreneurship and Business Strategies",
        published: true
    },
    {
        slug: "henry-harrison-podcast-larry-rau",
        title: "Larry Rau",
        guest: "Larry Rau",
        season: 1,
        episode: 5,
        description: "Henry Harrison sits down with Larry Rau, an alternative finance strategist and founder of solar technology companies.",
        soundcloud: "henry-harrison-podcast-episode-05-larry-rau",
        youtube: "Ix8R2D-2qkc",
        headline: "Episode 05: Larry Rau",
        subheadline: "Alternative Finance Strategist and Solar Technology Pioneer",
        published: true
    },
    {
        slug: "henry-harrison-dallas-texas-john-voigt",
        title: "John Voigt",
        guest: "John Voigt",
        season: 1,
        episode: 6,
        description: "Join Henry as he chats with John Voigt, a former professional artist turned entrepreneur and owner of Tribute Kitchen and Bath in Dallas, Texas.",
        soundcloud: "henry-harrison-podcast-episode-06-john-voigt",
        youtube: "U1vLJb8XVHM",
        headline: "Episode 06: John Voigt",
        subheadline: "From Professional Artist to Entrepreneur",
        published: true
    },
    {
        slug: "henry-harrison-dallas-texas-podcast-gary-burrows",
        title: "Gary Burrows",
        guest: "Gary Burrows",
        season: 1,
        episode: 7,
        description: "From Dallas, Henry Harrison explores the fascinating journey of Gary Burrows in this episode of the Henry Harrison Entrepreneurs, Business, and Finance Podcast.",
        soundcloud: "gary-burrows",
        youtube: "CZ3CsLU0EME",
        headline: "Episode 07: Gary Burrows",
        subheadline: "A Fascinating Entrepreneurial Journey",
        published: true
    },
    {
        slug: "dallas-henry-harrison-wilene-dunn",
        title: "Wilene Dunn",
        guest: "Wilene Dunn",
        season: 1,
        episode: 8,
        description: "Dallas' Henry Harrison Entrepreneurs, Business, and Finance Podcast - Henry engages in a captivating conversation with Wilene Dunn.",
        soundcloud: "henry-harrison-podcast-episode-08-wilene-dunn",
        youtube: "5oeDvXFo8F4",
        headline: "Episode 08: Wilene Dunn",
        subheadline: "A Captivating Conversation on Business",
        published: true
    },
    {
        slug: "henry-harrison-dallas-jeff-vernon-of-mineral-royalties-group-episode-09",
        title: "Jeff Vernon - Mineral Royalties Group",
        guest: "Jeff Vernon",
        season: 1,
        episode: 9,
        description: "Henry Harrison Dallas | Jeff Vernon of Mineral Royalties Group offers unique insights into the complexities of the oil and gas industry.",
        soundcloud: "henry-harrison-dallas-episode-09-jeff-vernon",
        youtube: "3X81jmA9Z2Q",
        headline: "Episode 09: Jeff Vernon",
        subheadline: "Mineral Royalties Group - Oil and Gas Industry Insights",
        published: true
    },
    {
        slug: "henry-harrison-dallas-podcast-alex-vantarakis-episode-10",
        title: "Alex Vantarakis",
        guest: "Alex Vantarakis",
        season: 1,
        episode: 10,
        description: "Gain invaluable insights into the world of business transfers as Henry Harrison sits down with Alex Vantarakis, an authority and recognized expert in the field!",
        soundcloud: "henry-harrison-dallas-podcast-alex-vantarakis-episode-10",
        youtube: "08HfiUin8OA",
        headline: "Episode 10: Alex Vantarakis",
        subheadline: "Expert in Business Transfers",
        published: true
    },
    {
        slug: "henry-harrison-dallas-tx-courtland-kilpatrick",
        title: "Courtland Kilpatrick",
        guest: "Courtland Kilpatrick",
        season: 1,
        episode: 11,
        description: "Henry Harrison Dallas TX Podcast features Courtland Kilpatrick discussing business and entrepreneurship in Dallas, Texas.",
        soundcloud: "henry-harrison-dallas-tx-podcast-courtland-kilpatrick-episode-11",
        youtube: "Rm-QVCUu7b8",
        headline: "Episode 11: Courtland Kilpatrick",
        subheadline: "Business and Entrepreneurship in Dallas",
        published: true
    }
];

// Seasons data
const seasons = [
    { number: 1, title: "Season 1", description: "The inaugural season of the Henry Harrison Podcast.", published: true },
    { number: 2, title: "Season 2", description: "Continuing the journey with more entrepreneurs and business leaders.", published: true },
    { number: 3, title: "Season 3", description: "Exploring diverse business topics and entrepreneurial stories.", published: true },
    { number: 4, title: "Season 4", description: "More inspiring conversations with business leaders and innovators.", published: true },
    { number: 5, title: "Season 5", description: "The latest season featuring new entrepreneurs and insights.", published: true }
];

async function syncData() {
    console.log('Starting data sync to Supabase...\n');

    // First, sync seasons
    console.log('Syncing seasons...');
    for (const season of seasons) {
        const { error } = await supabase
            .from('seasons')
            .upsert({
                number: season.number,
                title: season.title,
                description: season.description,
                published: season.published
            }, {
                onConflict: 'number'
            });

        if (error) {
            console.error(`Error syncing season ${season.number}:`, error.message);
        } else {
            console.log(`  ✓ Season ${season.number} synced`);
        }
    }

    console.log('\nSyncing episodes...');
    let successCount = 0;
    let errorCount = 0;

    for (const episode of episodes) {
        // Prepare data for upsert
        const episodeData = {
            slug: episode.slug,
            title: episode.title,
            guest: episode.guest,
            season: episode.season,
            episode: episode.episode,
            description: episode.description,
            youtube: episode.youtube || null,
            soundcloud: episode.soundcloud || null,
            image: episode.image || null,
            headline: episode.headline || null,
            subheadline: episode.subheadline || null,
            full_description: episode.fullDescription || null,
            key_insights: episode.keyInsights || null,
            guest_phone: episode.guestContact?.phone || null,
            guest_email: episode.guestContact?.email || null,
            guest_address: episode.guestContact?.address || null,
            guest_website: episode.guestContact?.website || null,
            guest_website_label: episode.guestContact?.websiteLabel || null,
            published: episode.published !== false
        };

        const { error } = await supabase
            .from('episodes')
            .upsert(episodeData, {
                onConflict: 'slug'
            });

        if (error) {
            console.error(`  ✗ Error syncing "${episode.guest}" (S${episode.season}E${episode.episode}):`, error.message);
            errorCount++;
        } else {
            console.log(`  ✓ S${episode.season}E${episode.episode}: ${episode.guest}`);
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
