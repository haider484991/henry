import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Henry Harrison | Entrepreneur & Philanthropist",
  description: "Henry Harrison is a Dallas-based entrepreneur, investor, and philanthropist with over 30 years of experience building businesses and communities.",
  keywords: ["Henry Harrison", "Entrepreneur", "Dallas", "Philanthropy", "Waste to Energy", "Real Estate"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://henryharrison.com/",
    title: "Henry Harrison | Entrepreneur & Philanthropist",
    description: "Building the future through innovation, sustainability, and community.",
    siteName: "Henry Harrison",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSans.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
