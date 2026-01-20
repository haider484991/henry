import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";
import { OrganizationJsonLd, PersonJsonLd, WebsiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <OrganizationJsonLd />
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${inter.variable} ${notoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
