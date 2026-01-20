import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read parsed WordPress data
const dataPath = join(__dirname, '..', 'supabase', 'parsed-wordpress-data.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

// Helper to clean HTML content
function cleanHtml(html, isNews = false) {
    if (!html) return '';

    let cleaned = html
        // Remove WordPress shortcodes (rank_math, etc.)
        .replace(/\[rank_math[^\]]*\]/g, '')
        .replace(/\[\/rank_math[^\]]*\]/g, '')
        // Remove Divi/ET builder shortcodes
        .replace(/\[et_pb[^\]]*\]/g, '')
        .replace(/\[\/et_pb[^\]]*\]/g, '')
        // Remove HTML comments
        .replace(/<!--[\s\S]*?-->/g, '')
        // Remove iframes (YouTube, SoundCloud, etc.)
        .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
        // Remove script tags
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        // Remove style tags
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        // Remove noscript tags
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
        // Remove date headers like <h4>12/28/2023</h4>
        .replace(/<h4[^>]*>\s*\d{1,2}\/\d{1,2}\/\d{4}\s*<\/h4>/gi, '')
        // Remove episode title headers like <h1>Episode 02: Doug Hardwick</h1>
        .replace(/<h1[^>]*>\s*Episode\s+\d+[^<]*<\/h1>/gi, '')
        // Remove SoundCloud attribution divs
        .replace(/<div[^>]*style="[^"]*font-size:\s*10px[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
        // Remove "Start Listening Today!" section
        .replace(/<h2[^>]*>\s*Start Listening Today!\s*<\/h2>/gi, '')
        // Remove season navigation links
        .replace(/<p[^>]*>\s*<a[^>]*href="[^"]*henryharrison\.com[^"]*"[^>]*>[\s\S]*?<\/a>\s*<\/p>/gi, '')
        // Remove empty paragraphs
        .replace(/<p[^>]*>\s*<\/p>/gi, '')
        // Remove multiple line breaks
        .replace(/(<br\s*\/?>\s*){3,}/gi, '<br><br>')
        // Remove empty divs
        .replace(/<div[^>]*>\s*<\/div>/gi, '')
        .trim();

    // Remove "Dallas Texas:" prefix from paragraph starts
    cleaned = cleaned.replace(/<p[^>]*>\s*Dallas,?\s*Texas:?\s*/gi, '<p>');

    // Remove any standalone date patterns
    cleaned = cleaned.replace(/^\s*\d{1,2}\/\d{1,2}\/\d{4}\s*/g, '');

    // For news articles, wrap unwrapped text in paragraphs
    if (isNews) {
        // Split by headings and process each section
        const parts = cleaned.split(/(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)/gi);
        cleaned = parts.map(part => {
            // If it's a heading, keep it as is
            if (part.match(/^<h[1-6]/i)) return part;
            // If text isn't already wrapped in a block element, wrap it
            const trimmed = part.trim();
            if (trimmed && !trimmed.match(/^<(p|div|ul|ol|blockquote|figure)/i)) {
                // Wrap in paragraph if it has content
                if (trimmed.length > 0) {
                    return `<p>${trimmed}</p>`;
                }
            }
            return part;
        }).join('\n');

        // Clean up any double paragraph wrapping
        cleaned = cleaned.replace(/<p>\s*<p>/g, '<p>').replace(/<\/p>\s*<\/p>/g, '</p>');
    }

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\s{3,}/g, ' ').trim();

    return cleaned;
}

// Episode mapping with correct season and episode numbers
const episodeMapping = {
    // Season 1 (Episodes 1-11)
    'henry-harrison-podcast-rick-kersey-episode-01': { season: 1, episode: 1, guest: 'Rick Kersey' },
    'henry-harrison-doug-hardwick-dallas-texas': { season: 1, episode: 2, guest: 'Doug Hardwick' },
    'henry-harrison-podcast-billy-gee': { season: 1, episode: 3, guest: 'Billy Gee' },
    'henry-harrison-podcast-jonathon-ringler': { season: 1, episode: 4, guest: 'Jonathon Ringler' },
    'henry-harrison-podcast-larry-rau': { season: 1, episode: 5, guest: 'Larry Rau' },
    'henry-harrison-dallas-texas-john-voigt': { season: 1, episode: 6, guest: 'John Voigt' },
    'henry-harrison-dallas-texas-podcast-gary-burrows': { season: 1, episode: 7, guest: 'Gary Burrows' },
    'dallas-henry-harrison-wilene-dunn': { season: 1, episode: 8, guest: 'Wilene Dunn' },
    'henry-harrison-dallas-jeff-vernon-of-mineral-royalties-group-episode-09': { season: 1, episode: 9, guest: 'Jeff Vernon' },
    'henry-harrison-dallas-podcast-alex-vantarakis-episode-10': { season: 1, episode: 10, guest: 'Alex Vantarakis' },
    'henry-harrison-dallas-tx-courtland-kilpatrick': { season: 1, episode: 11, guest: 'Courtland Kilpatrick' },

    // Season 2 (Episodes 1-11)
    'dallas-tx-henry-harrison-podcast-s2-ep1-david-wang': { season: 2, episode: 1, guest: 'David Wang' },
    'dallas-tx-tom-motlow': { season: 2, episode: 2, guest: 'Tom Motlow' },
    'dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen': { season: 2, episode: 3, guest: 'Mitch Allen' },
    'karl-chiao': { season: 2, episode: 4, guest: 'Karl Chiao' },
    'chloe-smith': { season: 2, episode: 5, guest: 'Chloe Smith' },
    'dallas-henry-harrison-liam-coakley': { season: 2, episode: 6, guest: 'Liam Coakley' },
    'dallas-henry-harrison-james-benham': { season: 2, episode: 7, guest: 'James Benham' },
    'dallas-henry-harrison-steve-dellorto': { season: 2, episode: 8, guest: "Steve Dell'Orto" },
    'advancing-cancer-treatments-paul-romness': { season: 2, episode: 9, guest: 'Paul Romness' },
    'real-estate-entrepreneurship-jeremy-brandt': { season: 2, episode: 10, guest: 'Jeremy Brandt' },
    'bob-mccarthys-entrepreneurial-journey': { season: 2, episode: 11, guest: 'Bob McCarthy' },

    // Season 3 (Episodes 1-10)
    'chris-mckee': { season: 3, episode: 1, guest: 'Chris McKee' },
    'don-williams': { season: 3, episode: 2, guest: 'Don Williams' },
    'subbase-ceo-eric-helitzer': { season: 3, episode: 3, guest: 'Eric Helitzer' },
    'josh-levy-document-crunch': { season: 3, episode: 4, guest: 'Josh Levy' },
    'private-jeweler-carter-malouf': { season: 3, episode: 5, guest: 'Carter Malouf' },
    'henry-harrison-tim-goeglein': { season: 3, episode: 6, guest: 'Tim Goeglein' },
    'new-artisan-distillery-don-short': { season: 3, episode: 7, guest: 'Don Short' },
    'john-cornelsen-evolving-texas-indigo-yoga-juggle': { season: 3, episode: 8, guest: 'John Cornelsen' },
    'bob-fox': { season: 3, episode: 9, guest: 'Bob Fox' },
    'low-voltage-switchgear-manufacturer-jeff-strong-corr-solutions-electrical': { season: 3, episode: 10, guest: 'Jeff Strong' },

    // Season 4 (Episodes 1-17)
    'hugh-massie-dna-behavior': { season: 4, episode: 1, guest: 'Hugh Massie' },
    'burt-copeland-new-life-cfo': { season: 4, episode: 2, guest: 'Burt Copeland' },
    'glenn-poulos': { season: 4, episode: 3, guest: 'Glenn Poulos' },
    'chaitanya-nk-ceo-of-track-3d': { season: 4, episode: 4, guest: 'Chaitanya NK' },
    'henry-harrison-sits-down-with-jack-carrere-of-prokeep': { season: 4, episode: 5, guest: 'Jack Carrere' },
    'james-poen-richardson-saw-and-lawn-mower': { season: 4, episode: 6, guest: 'James Poen' },
    'albert-bou-fadel-with-smartbarrel': { season: 4, episode: 7, guest: 'Albert Bou-Fadel' },
    'alexandre-teplitxky-smart-pm-technologies': { season: 4, episode: 8, guest: 'Alexandre Teplitxky' },
    'harry-hunsicker': { season: 4, episode: 9, guest: 'Harry Hunsicker' },
    'chris-brown-rj-byrd-search-group': { season: 4, episode: 10, guest: 'Chris Brown & RJ Byrd' },
    'james-dickey': { season: 4, episode: 11, guest: 'James Dickey' },
    'leise-sandeman': { season: 4, episode: 12, guest: 'Leise Sandeman' },
    'dianna-booher': { season: 4, episode: 13, guest: 'Dianna Booher' },
    'clark-neily-of-the-cato-institute': { season: 4, episode: 14, guest: 'Clark Neily' },
    'neeti-khaitan': { season: 4, episode: 15, guest: 'Neeti Khaitan' },
    'dida-clifton-theofficesquad': { season: 4, episode: 16, guest: 'Dida Clifton' },
    'marcolivia': { season: 4, episode: 17, guest: 'Marc Ollivier' },

    // Season 5 (Episodes 1+)
    'anthony-franco': { season: 5, episode: 1, guest: 'Anthony Franco' },
};

// Skip certain pages that aren't episodes
const skipSlugs = ['contact', 'podcast', 'henry-harrison-dallas-tx-podcast-season-2',
                   'entrepreneurs-business-and-finance-season-3', 'season-4'];

async function syncData() {
    console.log('Starting WordPress data sync to Supabase...\n');

    // First, ensure seasons exist
    console.log('Syncing seasons...');
    for (let i = 1; i <= 5; i++) {
        const { error } = await supabase
            .from('seasons')
            .upsert({
                number: i,
                title: `Season ${i}`,
                published: true
            }, { onConflict: 'number' });

        if (error) {
            console.error(`Error syncing season ${i}:`, error.message);
        } else {
            console.log(`  ✓ Season ${i}`);
        }
    }

    // Sync podcasts
    console.log('\nSyncing podcast episodes...');
    let podcastCount = 0;
    let podcastErrors = 0;
    let skippedCount = 0;

    for (const podcast of data.podcasts) {
        // Skip non-episode pages
        if (skipSlugs.includes(podcast.slug)) {
            console.log(`  - Skipping: ${podcast.title}`);
            skippedCount++;
            continue;
        }

        // Get episode info from mapping
        const mapping = episodeMapping[podcast.slug];
        if (!mapping) {
            console.log(`  ? Unknown episode: ${podcast.slug}`);
            skippedCount++;
            continue;
        }

        const content = cleanHtml(podcast.content);

        // Clean the excerpt or create one from content
        let description = podcast.excerpt || '';
        // Strip HTML tags and clean up
        description = description
            .replace(/<[^>]*>/g, '')
            .replace(/\d{1,2}\/\d{1,2}\/\d{4}/g, '')
            .replace(/Episode\s+\d+[:\s]+[^\n]+/gi, '')
            .replace(/Dallas,?\s*Texas:?\s*/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

        // If no excerpt, extract from content
        if (!description || description.length < 50) {
            description = content
                .replace(/<[^>]*>/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim()
                .substring(0, 500);
        }

        // Ensure description isn't too long
        if (description.length > 500) {
            description = description.substring(0, 497) + '...';
        }

        // Use guest bio if available, otherwise use cleaned content
        const fullDesc = podcast.guestBio || content;

        // Format key insights as HTML if available
        let keyInsightsHtml = null;
        if (podcast.keyInsights && podcast.keyInsights.length > 0) {
            keyInsightsHtml = '<ul>' + podcast.keyInsights.map(i => `<li>${i}</li>`).join('') + '</ul>';
        }

        // Determine website - prefer actual website over LinkedIn
        const guestWebsite = podcast.website && !podcast.website.includes('linkedin')
            ? podcast.website
            : (podcast.linkedin || null);

        const episodeData = {
            slug: podcast.slug,
            title: podcast.title,
            guest: mapping.guest,
            season: mapping.season,
            episode: mapping.episode,
            description: description,
            youtube: podcast.youtube,
            soundcloud: podcast.soundcloud,
            image: podcast.guestImage || null,
            headline: podcast.headline || null,
            subheadline: podcast.subheadline || null,
            full_description: fullDesc,
            key_insights: keyInsightsHtml,
            guest_website: guestWebsite,
            guest_website_label: podcast.linkedin ? 'LinkedIn' : null,
            published: true
        };

        const { error } = await supabase
            .from('episodes')
            .upsert(episodeData, { onConflict: 'slug' });

        if (error) {
            console.error(`  ✗ Error S${mapping.season}E${mapping.episode} ${mapping.guest}:`, error.message);
            podcastErrors++;
        } else {
            console.log(`  ✓ S${mapping.season}E${mapping.episode}: ${mapping.guest}`);
            podcastCount++;
        }
    }

    // Sync news articles
    console.log('\nSyncing news articles...');
    let newsCount = 0;
    let newsErrors = 0;

    // News article image mapping
    const newsImageMapping = {
        'henry-harrison-debt-financing-preliminary-approval-for-asic-network': '/images/news/asic-network-debt-financing.jpg',
        'henry-harrison-invested-into-the-future-of-green-energy': '/images/news/green-energy-investment.jpg',
        'debt-fi-energy-projects': '/images/news/debt-fi-energy-projects.jpg',
        'economic-and-environmental-impact-of-texas-heat-waves': '/images/news/texas-heat-waves-impact.jpg',
        'texas-ranked-1-in-america-for-best-business-climate': '/images/news/texas-best-business-climate.jpg',
        'governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights': '/images/news/tab-summit-highlights.jpg',
        'texas-legislation-defines-ownership-of-geothermal-energy': '/images/news/geothermal-energy-legislation.jpg',
        'alamo-drafthouse-locations-in-north-texas-close-abruptly': '/images/news/alamo-drafthouse-closing.jpg',
        'celina-texas-americas-fastest-growing-city': '/images/news/celina-texas-fastest-growing.jpg',
        'dallas-fort-worth-commercial-real-estate-2024': '/images/news/dallas-fort-worth-commercial-real-estate.jpg',
        'dallas-black-chamber-of-commerce-grants-minority': '/images/news/dbcc-minority-grants.jpg',
    };

    for (const article of data.news) {
        const content = cleanHtml(article.content, true); // true = isNews for better formatting
        const dateFormatted = article.date.split(' ')[0]; // Get just the date part

        // Get the correct image for this article
        const articleImage = newsImageMapping[article.slug] || '/images/news/default.jpg';

        const articleData = {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt || content.substring(0, 300).replace(/<[^>]*>/g, ''),
            content: content,
            date: dateFormatted,
            category: article.categories[0] || 'Henry Harrison',
            image: articleImage,
            author: 'Henry Harrison',
            tags: article.tags.length > 0 ? article.tags : null,
            published: true
        };

        const { error } = await supabase
            .from('articles')
            .upsert(articleData, { onConflict: 'slug' });

        if (error) {
            console.error(`  ✗ Error: ${article.title}:`, error.message);
            newsErrors++;
        } else {
            console.log(`  ✓ ${article.title}`);
            newsCount++;
        }
    }

    console.log('\n========================================');
    console.log('Sync complete!');
    console.log(`  Podcasts: ${podcastCount} synced, ${podcastErrors} errors, ${skippedCount} skipped`);
    console.log(`  News: ${newsCount} synced, ${newsErrors} errors`);
    console.log('========================================');
}

syncData().catch(console.error);
