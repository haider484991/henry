import { Metadata } from "next";
import { PodcastJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Henry Harrison Podcast | Business & Entrepreneurship Interviews",
    description: "Listen to the Henry Harrison Podcast featuring interviews with entrepreneurs, business leaders, and innovators from Dallas, Texas and beyond. Available on Spotify, Apple Podcasts, and YouTube.",
    keywords: ["Henry Harrison Podcast", "business podcast", "entrepreneur interviews", "Dallas podcast", "Texas business", "leadership podcast"],
    openGraph: {
        title: "Henry Harrison Podcast | Business & Entrepreneurship Interviews",
        description: "Interviews with entrepreneurs, business leaders, and innovators from Dallas, Texas and beyond.",
        url: "https://henryharrison.com/podcast",
        type: "website",
        images: [
            {
                url: "https://henryharrison.com/images/podcast-cover.jpg",
                width: 1200,
                height: 630,
                alt: "Henry Harrison Podcast",
            },
        ],
    },
    alternates: {
        canonical: "https://henryharrison.com/podcast",
    },
};

export default function PodcastLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PodcastJsonLd />
            {children}
        </>
    );
}
