import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Henry Harrison - Entrepreneurs, Business & Finance Podcast';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function OGImage() {
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
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)',
                        display: 'flex',
                    }}
                />

                {/* Logo - HH Monogram */}
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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

                {/* Name */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 64,
                        fontWeight: 700,
                        color: 'white',
                        marginTop: 30,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Henry Harrison
                </div>

                {/* Podcast Title */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 36,
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginTop: 16,
                        letterSpacing: '0.02em',
                    }}
                >
                    Entrepreneurs, Business & Finance Podcast
                </div>

                {/* Tagline */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 22,
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: 24,
                        textAlign: 'center',
                        maxWidth: '800px',
                    }}
                >
                    In-depth interviews with CEOs, founders, and business leaders
                </div>

                {/* Location Badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: 18,
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginTop: 30,
                        padding: '8px 20px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                    }}
                >
                    Dallas/Plano, Texas
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
