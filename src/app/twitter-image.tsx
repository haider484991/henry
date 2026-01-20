import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Henry Harrison - Entrepreneur, Investor & Philanthropist';
export const size = {
    width: 1200,
    height: 600,
};
export const contentType = 'image/png';

export default async function TwitterImage() {
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
                {/* Logo */}
                <svg
                    width="180"
                    height="180"
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

                {/* Tagline */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 28,
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginTop: 16,
                        letterSpacing: '0.05em',
                    }}
                >
                    Entrepreneur • Investor • Philanthropist
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
