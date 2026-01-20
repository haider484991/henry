import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Henry Harrison | Dallas, Texas",
    description: "Get in touch with Henry Harrison. Contact information for business inquiries, speaking engagements, and podcast guest opportunities in Dallas, Texas.",
    keywords: ["contact Henry Harrison", "Dallas business contact", "speaking engagements", "podcast guest", "business inquiries"],
    openGraph: {
        title: "Contact Henry Harrison | Dallas, Texas",
        description: "Get in touch with Henry Harrison for business inquiries and opportunities.",
        url: "https://henryharrison.com/contact",
        type: "website",
    },
    alternates: {
        canonical: "https://henryharrison.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
