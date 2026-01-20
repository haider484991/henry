import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News & Insights | Henry Harrison",
    description: "Latest news, insights, and articles on Texas business, entrepreneurship, real estate, energy, and technology from Henry Harrison.",
    keywords: ["Texas business news", "Dallas news", "entrepreneurship articles", "real estate news Texas", "energy industry updates"],
    openGraph: {
        title: "News & Insights | Henry Harrison",
        description: "Latest news and insights on Texas business, entrepreneurship, and innovation.",
        url: "https://henryharrison.com/news",
        type: "website",
    },
    alternates: {
        canonical: "https://henryharrison.com/news",
    },
};

export default function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
