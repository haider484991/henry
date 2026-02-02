import { ImageResponse } from 'next/og';
import { getArticleBySlug, getEpisodeBySlug } from '@/lib/actions';

export const runtime = 'edge';
export const alt = 'Henry Harrison';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check for article first
    const article = await getArticleBySlug(slug);
    if (article) {
        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'linear-gradient(135deg, #0B3E50 0%, #0a2f3d 50%, #071f28 100%)',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '60px',
                        position: 'relative',
                    }}
                >
                    {/* Category Badge */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 18,
                            color: 'rgba(255, 255, 255, 0.6)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: 20,
                        }}
                    >
                        {article.category} • News
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 56,
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.2,
                            maxWidth: '900px',
                        }}
                    >
                        {article.title}
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 'auto',
                            gap: 20,
                        }}
                    >
                        {/* Logo */}
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 512 512"
                            fill="none"
                        >
                            <g fill="white">
                                <rect x="80" y="120" width="40" height="272" />
                                <rect x="80" y="236" width="120" height="40" />
                                <rect x="160" y="120" width="40" height="272" />
                                <rect x="272" y="120" width="40" height="272" />
                                <rect x="272" y="236" width="120" height="40" />
                                <rect x="352" y="120" width="40" height="272" />
                            </g>
                        </svg>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
                                Henry Harrison
                            </div>
                            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>
                                henryharrison.com
                            </div>
                        </div>
                    </div>
                </div>
            ),
            { ...size }
        );
    }

    // Check for episode
    const episode = await getEpisodeBySlug(slug);
    if (episode) {
        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'linear-gradient(135deg, #0B3E50 0%, #0a2f3d 50%, #071f28 100%)',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '60px',
                        position: 'relative',
                    }}
                >
                    {/* Podcast Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 30,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                padding: '8px 16px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: 4,
                                fontSize: 16,
                                color: 'rgba(255,255,255,0.8)',
                                fontWeight: 500,
                            }}
                        >
                            Season {episode.season} • Episode {episode.episode}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 16,
                                color: 'rgba(255,255,255,0.5)',
                            }}
                        >
                            Entrepreneurs, Business & Finance Podcast
                        </div>
                    </div>

                    {/* Guest Name */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 72,
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}
                    >
                        {episode.guest}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 24,
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.4,
                            maxWidth: '800px',
                        }}
                    >
                        {episode.description.length > 150
                            ? episode.description.substring(0, 150) + '...'
                            : episode.description}
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 'auto',
                            gap: 20,
                        }}
                    >
                        {/* Logo */}
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 512 512"
                            fill="none"
                        >
                            <g fill="white">
                                <rect x="80" y="120" width="40" height="272" />
                                <rect x="80" y="236" width="120" height="40" />
                                <rect x="160" y="120" width="40" height="272" />
                                <rect x="272" y="120" width="40" height="272" />
                                <rect x="272" y="236" width="120" height="40" />
                                <rect x="352" y="120" width="40" height="272" />
                            </g>
                        </svg>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
                                Henry Harrison
                            </div>
                            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>
                                Dallas/Plano, Texas
                            </div>
                        </div>
                    </div>
                </div>
            ),
            { ...size }
        );
    }

    // Default fallback
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0B3E50 0%, #0a2f3d 50%, #071f28 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px',
                }}
            >
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 512 512"
                    fill="none"
                >
                    <g fill="white">
                        <rect x="80" y="120" width="40" height="272" />
                        <rect x="80" y="236" width="120" height="40" />
                        <rect x="160" y="120" width="40" height="272" />
                        <rect x="272" y="120" width="40" height="272" />
                        <rect x="272" y="236" width="120" height="40" />
                        <rect x="352" y="120" width="40" height="272" />
                    </g>
                </svg>
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: 'white',
                        marginTop: 30,
                    }}
                >
                    Henry Harrison
                </div>
                <div
                    style={{
                        fontSize: 28,
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: 16,
                    }}
                >
                    Entrepreneurs, Business & Finance Podcast
                </div>
            </div>
        ),
        { ...size }
    );
}
