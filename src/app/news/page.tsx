"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const articles = [
    {
        slug: "dallas-black-chamber-of-commerce-grants-minority",
        title: "Dallas Black Chamber of Commerce Distributes $30,000 in Grants to Minority Enterprises",
        excerpt: "The Dallas Black Chamber of Commerce has distributed grants to support minority-owned businesses in the Dallas area.",
        date: "July 2, 2024",
        category: "Texas News",
        image: "/images/news/dbcc-minority-grants.jpg",
    },
    {
        slug: "henry-harrison-invested-into-the-future-of-green-energy",
        title: "Henry Harrison Invested Into the Future of Green Energy",
        excerpt: "Henry Harrison continues his commitment to sustainable technologies with new investments in green energy.",
        date: "July 1, 2024",
        category: "Henry Harrison",
        image: "/images/news/green-energy-investment.jpg",
    },
    {
        slug: "henry-harrison-debt-financing-preliminary-approval-for-asic-network",
        title: "Henry Harrison Debt Financing Preliminary Approval for ASIC Network",
        excerpt: "Preliminary approval secured for debt financing to support ASIC Network expansion.",
        date: "June 30, 2024",
        category: "Henry Harrison",
        image: "/images/news/asic-network-debt-financing.jpg",
    },
    {
        slug: "dallas-fort-worth-commercial-real-estate-2024",
        title: "Dallas-Fort Worth Dominates Commercial Real Estate in 2024",
        excerpt: "Dallas-Fort Worth continues to reign supreme in the commercial real estate market, holding its top position for the third consecutive year.",
        date: "June 26, 2024",
        category: "Texas News",
        image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg",
    },
    {
        slug: "celina-texas-americas-fastest-growing-city",
        title: "Celina, Texas: America's Fastest-Growing City",
        excerpt: "Celina, Texas has been named America's fastest-growing city, reflecting the continued growth in the Dallas-Fort Worth metroplex.",
        date: "June 18, 2024",
        category: "Texas News",
        image: "/images/news/celina-texas-fastest-growing.jpg",
    },
    {
        slug: "alamo-drafthouse-locations-in-north-texas-close-abruptly",
        title: "Alamo Drafthouse Locations in North Texas Close Abruptly",
        excerpt: "Multiple Alamo Drafthouse cinema locations in North Texas have closed their doors abruptly.",
        date: "June 15, 2024",
        category: "Texas News",
        image: "/images/news/alamo-drafthouse-closing.jpg",
    },
    {
        slug: "texas-legislation-defines-ownership-of-geothermal-energy",
        title: "Texas Legislation Defines Ownership of Geothermal Energy",
        excerpt: "New Texas legislation clarifies the ownership rights for geothermal energy resources.",
        date: "June 12, 2024",
        category: "Texas News",
        image: "/images/news/geothermal-energy-legislation.jpg",
    },
    {
        slug: "governor-abbotts-role-in-texas-economic-triumph-tab-summit-highlights",
        title: "Governor Abbott's Role in Texas Economic Triumph - TAB Summit Highlights",
        excerpt: "Governor Abbott discusses Texas's economic success at the TAB Summit.",
        date: "June 10, 2024",
        category: "Texas News",
        image: "/images/news/tab-summit-highlights.jpg",
    },
    {
        slug: "texas-ranked-1-in-america-for-best-business-climate",
        title: "Texas Ranked #1 in America for Best Business Climate",
        excerpt: "Texas has been ranked as the best state in America for business climate.",
        date: "June 8, 2024",
        category: "Texas News",
        image: "/images/news/texas-best-business-climate.jpg",
    },
    {
        slug: "economic-and-environmental-impact-of-texas-heat-waves",
        title: "Economic and Environmental Impact of Texas Heat Waves",
        excerpt: "An analysis of how heat waves are affecting Texas's economy and environment.",
        date: "June 5, 2024",
        category: "Texas News",
        image: "/images/news/texas-heat-waves-impact.jpg",
    },
    {
        slug: "debt-fi-energy-projects",
        title: "Debt Financing for Energy Projects",
        excerpt: "Understanding debt financing options for energy projects in Texas.",
        date: "June 1, 2024",
        category: "Henry Harrison",
        image: "/images/news/debt-fi-energy-projects.jpg",
    },
];

export default function NewsPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".news-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".news-card", {
                scrollTrigger: {
                    trigger: ".news-grid",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="news-hero max-w-4xl">
                        <p className="text-sm uppercase tracking-widest opacity-70 mb-4">News</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Latest Updates
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Stay informed with the latest news, insights, and developments from Henry Harrison and the Texas business community.
                        </p>
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/${article.slug}`}
                                className="news-card group block"
                            >
                                <div className="aspect-[16/10] bg-secondary mb-6 overflow-hidden relative">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="text-xs uppercase tracking-widest text-primary font-medium">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {article.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-secondary/30">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <h2 className="text-2xl font-medium text-foreground mb-8">Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/category/henry-harrison"
                            className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                            Henry Harrison
                        </Link>
                        <Link
                            href="/category/texas-news"
                            className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                            Texas News
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
