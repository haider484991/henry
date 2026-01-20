import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the WordPress XML file
const xmlPath = join(__dirname, '..', 'supabase', 'henryharrison.WordPress.2026-01-20.xml');
const xml = readFileSync(xmlPath, 'utf-8');

// Helper to extract CDATA content
function extractCDATA(str) {
    if (!str) return '';
    const match = str.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
    return match ? match[1] : str.replace(/<[^>]*>/g, '').trim();
}

// Helper to extract tag content
function extractTag(xml, tag) {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(xml)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

// Extract all items
const items = [];
const pages = [];
const itemRegex = /<item>([\s\S]*?)<\/item>/g;
let itemMatch;

while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1];

    // Extract post type
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';

    // Process both posts and pages
    if (postType !== 'post' && postType !== 'page') continue;

    // Extract status
    const statusMatch = itemXml.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
    const status = statusMatch ? statusMatch[1] : '';

    // Only published posts
    if (status !== 'publish') continue;

    // Extract basic fields
    const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    const slugMatch = itemXml.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
    const slug = slugMatch ? slugMatch[1] : '';

    const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
    const content = contentMatch ? contentMatch[1] : '';

    const excerptMatch = itemXml.match(/<excerpt:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/excerpt:encoded>/);
    const excerpt = excerptMatch ? excerptMatch[1] : '';

    const dateMatch = itemXml.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/);
    const date = dateMatch ? dateMatch[1] : '';

    // Extract categories
    const categoryMatches = itemXml.matchAll(/<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g);
    const categories = [...categoryMatches].map(m => m[1]);

    // Extract tags
    const tagMatches = itemXml.matchAll(/<category domain="post_tag"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g);
    const tags = [...tagMatches].map(m => m[1]);

    // Extract post meta
    const postMeta = {};
    const metaRegex = /<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>\s*<\/wp:postmeta>/g;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(itemXml)) !== null) {
        postMeta[metaMatch[1]] = metaMatch[2];
    }

    items.push({
        title,
        slug,
        content,
        excerpt,
        date,
        categories,
        tags,
        postMeta,
        postType
    });
}

console.log(`Found ${items.length} published items (posts + pages)\n`);

// Separate into podcasts and news
const podcasts = [];
const news = [];

items.forEach(item => {
    // Check if it's a podcast episode (has YouTube embed or specific patterns)
    const isPodcast = item.content.includes('youtube.com/embed') ||
                      item.content.includes('soundcloud.com') ||
                      item.title.toLowerCase().includes('episode') ||
                      item.slug.includes('henry-harrison-podcast') ||
                      item.slug.includes('dallas-henry-harrison') ||
                      item.slug.includes('dallas-tx-henry-harrison') ||
                      item.slug.includes('dallas-tx-') ||
                      item.slug.includes('-s2-ep') ||
                      item.slug.includes('-s3-ep') ||
                      item.slug.includes('-s4-ep') ||
                      (item.postType === 'page' && item.content.includes('youtube'));

    if (isPodcast) {
        podcasts.push(item);
    } else if (item.postType === 'post') {
        // Only add to news if it's a post (not a page)
        news.push(item);
    }
});

console.log(`Podcasts: ${podcasts.length}`);
console.log(`News: ${news.length}\n`);

// Output podcasts
console.log('=== PODCAST EPISODES ===\n');
podcasts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title}`);
    console.log(`   Slug: ${p.slug}`);
    console.log(`   Date: ${p.date}`);
    console.log(`   Categories: ${p.categories.join(', ')}`);

    // Extract YouTube ID
    const ytMatch = p.content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (ytMatch) console.log(`   YouTube: ${ytMatch[1]}`);

    // Extract SoundCloud
    const scMatch = p.content.match(/soundcloud\.com\/henry-harrison-podcast\/([a-zA-Z0-9_-]+)/);
    if (scMatch) console.log(`   SoundCloud: ${scMatch[1]}`);

    console.log('');
});

console.log('\n=== NEWS ARTICLES ===\n');
news.forEach((n, i) => {
    console.log(`${i + 1}. ${n.title}`);
    console.log(`   Slug: ${n.slug}`);
    console.log(`   Date: ${n.date}`);
    console.log(`   Categories: ${n.categories.join(', ')}`);
    console.log('');
});

// Helper to extract structured data from Divi content
function extractPodcastData(content) {
    // Extract YouTube ID - check both embed and watch formats
    let youtube = null;
    const ytEmbedMatch = content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    const ytWatchMatch = content.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (ytEmbedMatch) youtube = ytEmbedMatch[1];
    else if (ytWatchMatch) youtube = ytWatchMatch[1];

    // Extract SoundCloud
    let soundcloud = null;
    const scMatch = content.match(/soundcloud\.com\/henry-harrison-podcast\/([a-zA-Z0-9_-]+)/);
    if (scMatch) soundcloud = scMatch[1];

    // Extract guest image from et_pb_image
    let guestImage = null;
    const imgMatch = content.match(/et_pb_image[^[]*src="([^"]+)"/);
    if (imgMatch && !imgMatch[1].includes('unsplash')) {
        guestImage = imgMatch[1];
    }

    // Extract guest bio - look for text after "Meet" heading
    let guestBio = null;
    const bioMatch = content.match(/Meet\s+[^"]+"\s*\][^[]*\[\/et_pb_heading\][^[]*\[et_pb_text[^\]]*\]([^[]+)\[\/et_pb_text\]/i);
    if (bioMatch) {
        guestBio = bioMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    // Alternative: look for longer text blocks that aren't navigation
    if (!guestBio) {
        const textBlocks = content.match(/\[et_pb_text[^\]]*\]([^[]{200,})\[\/et_pb_text\]/g);
        if (textBlocks) {
            for (const block of textBlocks) {
                const textMatch = block.match(/\]([^[]+)\[/);
                if (textMatch) {
                    const text = textMatch[1].replace(/<[^>]*>/g, '').trim();
                    if (text.length > 100 && !text.includes('Season') && !text.includes('Start Listening')) {
                        guestBio = text;
                        break;
                    }
                }
            }
        }
    }

    // Extract key insights
    let keyInsights = [];
    const insightsIdx = content.indexOf('Key Insights');
    if (insightsIdx > -1) {
        const insightsSection = content.substring(insightsIdx, insightsIdx + 5000);
        const insightTexts = insightsSection.match(/\[et_pb_text[^\]]*\]<p>([^<]+)<\/p>\[\/et_pb_text\]/g);
        if (insightTexts) {
            keyInsights = insightTexts.map(t => {
                const m = t.match(/<p>([^<]+)<\/p>/);
                return m ? m[1].trim() : null;
            }).filter(Boolean);
        }
    }

    // Extract LinkedIn
    let linkedin = null;
    const linkedinMatch = content.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
    if (linkedinMatch) {
        linkedin = `https://www.linkedin.com/in/${linkedinMatch[1]}/`;
    }

    // Extract website from Connect section
    let website = null;
    const connectIdx = content.indexOf('Connect with');
    if (connectIdx > -1) {
        const connectSection = content.substring(connectIdx, connectIdx + 2000);
        const websiteMatch = connectSection.match(/button_url="(https?:\/\/(?!linkedin)[^"]+)"/);
        if (websiteMatch) {
            website = websiteMatch[1];
        }
    }

    // Extract headline/subheadline
    let headline = null;
    let subheadline = null;
    const headlineMatch = content.match(/title="([^"]+,\s*(?:CEO|Founder|President|Owner|Chairman|Director)[^"]+)"/i);
    if (headlineMatch) {
        headline = headlineMatch[1];
    }
    const subMatch = content.match(/\[et_pb_text[^\]]*\]<p>([^<]{10,100})<\/p>\[\/et_pb_text\][^\[]*\[et_pb_button/);
    if (subMatch) {
        subheadline = subMatch[1].trim();
    }

    return {
        youtube,
        soundcloud,
        guestImage,
        guestBio,
        keyInsights: keyInsights.length > 0 ? keyInsights : null,
        linkedin,
        website,
        headline,
        subheadline
    };
}

// Save parsed data to JSON for further processing
const outputData = {
    podcasts: podcasts.map(p => {
        const extracted = extractPodcastData(p.content);

        return {
            title: p.title,
            slug: p.slug,
            content: p.content,
            excerpt: p.excerpt,
            date: p.date,
            categories: p.categories,
            tags: p.tags,
            youtube: extracted.youtube,
            soundcloud: extracted.soundcloud,
            guestImage: extracted.guestImage,
            guestBio: extracted.guestBio,
            keyInsights: extracted.keyInsights,
            linkedin: extracted.linkedin,
            website: extracted.website,
            headline: extracted.headline,
            subheadline: extracted.subheadline,
            postMeta: p.postMeta
        };
    }),
    news: news.map(n => ({
        title: n.title,
        slug: n.slug,
        content: n.content,
        excerpt: n.excerpt,
        date: n.date,
        categories: n.categories,
        tags: n.tags
    }))
};

const outputPath = join(__dirname, '..', 'supabase', 'parsed-wordpress-data.json');
writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
console.log(`\nData saved to: ${outputPath}`);
