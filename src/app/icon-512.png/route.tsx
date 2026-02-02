import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0B3E50',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '64px',
                }}
            >
                <svg
                    width="380"
                    height="380"
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
            </div>
        ),
        {
            width: 512,
            height: 512,
        }
    );
}
