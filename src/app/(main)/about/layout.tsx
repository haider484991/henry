import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Henry Harrison | Dallas Entrepreneur & Investor",
    description: "Learn about Henry Harrison, a Dallas-based entrepreneur with over 30 years of experience in waste-to-energy, real estate, technology, and philanthropy. Discover his journey and achievements.",
    keywords: ["Henry Harrison biography", "Dallas entrepreneur", "Texas businessman", "waste to energy pioneer", "real estate investor Dallas"],
    openGraph: {
        title: "About Henry Harrison | Dallas Entrepreneur & Investor",
        description: "Learn about Henry Harrison, a Dallas-based entrepreneur with over 30 years of experience in business and philanthropy.",
        url: "https://henryharrison.com/about",
        type: "profile",
    },
    alternates: {
        canonical: "https://henryharrison.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
