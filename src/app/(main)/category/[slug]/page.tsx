"use client";

import { useEffect, useLayoutEffect, useRef, useState, use } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/actions";

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
    description?: string;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const pageRef = useRef<HTMLDivElement>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [categoryData, articlesData] = await Promise.all([
                getCategoryBySlug(slug),
                getArticlesByCategory(slug)
            ]);
            setCategory(categoryData);
            setArticles(articlesData);
            setIsLoading(false);
        }
        loadData();
    }, [slug]);

    useLayoutEffect(() => {
        if (isLoading || !pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".category-hero > *", {
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

    if (!category) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-foreground mb-4">Category Not Found</h1>
                    <Link href="/news" className="text-primary hover:underline">
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="category-hero max-w-4xl">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News
                        </Link>
                        <p className="text-sm uppercase tracking-widest opacity-70 mb-4">Category</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    {articles.length > 0 ? (
                        <>
                            <p className="text-muted-foreground mb-8">
                                {articles.length} article{articles.length !== 1 ? 's' : ''} in this category
                            </p>
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
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground mb-4">No articles found in this category.</p>
                            <Link href="/news" className="text-primary hover:underline">
                                Browse all articles
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
