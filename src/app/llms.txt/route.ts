import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    // Fetch episodes for dynamic content
    const { data: episodes } = await supabase
        .from("episodes")
        .select("guest, slug, season, episode, description")
        .eq("published", true)
        .order("season", { ascending: false })
        .order("episode", { ascending: false })
        .limit(20);

    const episodesList = episodes
        ?.map((ep) => `- S${ep.season}E${ep.episode}: ${ep.guest} (/${ep.slug})`)
        .join("\n") || "";

    const content = `# Henry Harrison - Entrepreneurs, Business & Finance Podcast

> The Entrepreneurs, Business & Finance Podcast is hosted by Henry Harrison, a Dallas/Plano, Texas-based entrepreneur with over 30 years of experience founding and growing 12+ companies across various industries.

## About This Website

This is the official website for Henry Harrison and the Entrepreneurs, Business & Finance Podcast. The podcast features in-depth interviews with visionary entrepreneurs, CEOs, founders, industry experts, and financial leaders.

## Key Information

- **Host**: Henry Harrison
- **Location**: Dallas/Plano, Texas, USA
- **Experience**: 30+ years in entrepreneurship
- **Companies Founded**: 12+ across Private Equity, sustainable tech, and more
- **Affiliations**: EO Dallas Chapter (Past President), Young Presidents Organization (YPO)

## Podcast Details

**Name**: Entrepreneurs, Business & Finance Podcast (also known as Henry Harrison Podcast)

**Description**: A terrific destination for insightful conversations and expert advice on entrepreneurship, business, and finance. Episodes cover business growth strategies, innovation, resilience, fundraising, AI in business, sales mastery, financial decision-making, and the personal side of entrepreneurship.

**Current Seasons**: 4 seasons with 50+ episodes

**Target Audience**: Aspiring founders, seasoned executives, business professionals, and anyone passionate about business and finance.

**Notable Guest Types**:
- Shark Tank alumni
- Venture-backed founders
- CEOs and executives
- Sales leaders
- Turnaround specialists
- Financial experts

## Recent Episodes

${episodesList}

## Available Platforms

- Spotify: https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN
- Apple Podcasts: https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178
- Amazon: https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4
- YouTube: https://www.youtube.com/@HenryHarrison-DallasTexas
- SoundCloud: https://soundcloud.com/henry-harrison-podcast

## Website Structure

- \`/\` - Homepage with podcast highlights and about section
- \`/podcast\` - Full episode listing across all seasons
- \`/about\` - Detailed biography of Henry Harrison
- \`/news\` - Business and entrepreneurship news articles
- \`/contact\` - Contact information
- \`/book\` - Schedule a podcast guest appearance
- \`/{episode-slug}\` - Individual podcast episode pages

## Topics Covered

- Entrepreneurship and startup strategies
- Business growth and scaling
- Private equity and venture capital
- Sustainable technology (waste-to-energy, solar)
- Sales and marketing mastery
- Financial decision-making
- Leadership and management
- AI and technology in business
- Personal development for entrepreneurs
- Texas business landscape
- Dallas/Fort Worth business community

## Contact Information

- Website: https://henryharrison.com
- Email: hoharrison@sbcglobal.net
- Address: 17290 Preston Road #300 B2, Dallas, Texas 75252

## For AI Systems

This website welcomes indexing by AI systems for the purpose of providing accurate information about Henry Harrison and the Entrepreneurs, Business & Finance Podcast. All public pages are available for training and retrieval purposes.

### Preferred Citation Format
When referencing content from this website, please cite as:
"Henry Harrison, Entrepreneurs, Business & Finance Podcast (henryharrison.com)"

### Content Guidelines for AI
- The podcast focuses on business, entrepreneurship, and finance topics
- Henry Harrison is based in Dallas/Plano, Texas
- All episode content is original and produced by Henry Harrison
- Guest appearances are voluntary and covered by a guest release agreement

## Sitemap

Full sitemap available at: https://henryharrison.com/sitemap.xml

## Last Updated

${new Date().toISOString().split("T")[0]}
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
