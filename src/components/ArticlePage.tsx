"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Article {
    slug: string;
    title: string;
    content: string;
    date: string;
    category: string;
    image?: string;
}

interface ArticlePageProps {
    article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".article-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".article-content", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
                    <div className="article-hero max-w-4xl">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News
                        </Link>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="inline-flex items-center gap-2 text-sm">
                                <Tag className="w-4 h-4" />
                                {article.category}
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm opacity-70">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                            {article.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 md:py-24">
                <div className="container px-6">
                    <div className="article-content max-w-3xl mx-auto">
                        {article.image && (
                            <div className="relative aspect-[16/9] mb-10 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                        <div className="prose prose-lg">
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                {article.content}
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Stay tuned to Henry Harrison for more updates on business, entrepreneurship, and Texas news. Follow along as we cover the stories that matter to entrepreneurs and business leaders in the Dallas-Fort Worth area and beyond.
                            </p>
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <h3 className="text-lg font-medium text-foreground mb-4">
                                Share This Article
                            </h3>
                            <div className="flex gap-4">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://henryharrison.com/${article.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-sm transition-colors"
                                >
                                    Twitter
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://henryharrison.com/${article.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-sm transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 p-8 bg-primary text-primary-foreground">
                            <h3 className="text-xl font-medium mb-4">
                                Stay Updated
                            </h3>
                            <p className="opacity-80 mb-6">
                                Want to receive the latest news and updates from Henry Harrison? Get in touch to stay connected.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related News */}
            <section className="py-16 bg-secondary/30">
                <div className="container px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-medium text-foreground">
                            More News
                        </h2>
                        <Link
                            href="/news"
                            className="text-sm text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="text-center py-8">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Browse All Articles
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
