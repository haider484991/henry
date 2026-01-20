"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { getArticles, getCategories } from "@/lib/actions";

gsap.registerPlugin(ScrollTrigger);

interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function NewsPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [articlesData, categoriesData] = await Promise.all([
                getArticles(),
                getCategories()
            ]);
            setArticles(articlesData);
            setCategories(categoriesData);
            setIsLoading(false);
        }
        loadData();
    }, []);

    useLayoutEffect(() => {
        if (isLoading || !pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".news-hero > *", {
                y: 60,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.fromTo(".news-card", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".news-grid",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, pageRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

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
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
