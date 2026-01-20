import { ImageResponse } from 'next/og';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#0B3E50',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '4px',
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="white">
                        <rect x="5" y="7" width="3" height="18" />
                        <rect x="5" y="14" width="8" height="3" />
                        <rect x="10" y="7" width="3" height="18" />
                        <rect x="17" y="7" width="3" height="18" />
                        <rect x="17" y="14" width="8" height="3" />
                        <rect x="22" y="7" width="3" height="18" />
                    </g>
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
