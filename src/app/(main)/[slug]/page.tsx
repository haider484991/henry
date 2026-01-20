"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag, Loader2 } from "lucide-react";
import { getArticleBySlug } from "@/lib/actions";

interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    category: string;
    image: string;
    author?: string;
    tags?: string[];
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadArticle() {
            const data = await getArticleBySlug(slug);
            setArticle(data);
            setIsLoading(false);
        }
        loadArticle();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium text-foreground mb-4">Article Not Found</h1>
                <Link href="/news" className="text-primary hover:underline">
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm uppercase tracking-widest opacity-70">
                                {article.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm opacity-80">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            {article.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{article.author}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="w-full px-8 md:px-16 lg:px-24 -mt-16">
                <div className="max-w-5xl mx-auto">
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-3xl mx-auto">
                        {article.content ? (
                            <div
                                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        ) : (
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-foreground">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                        Follow Henry Harrison for the latest news and insights on Texas business, entrepreneurship, and finance.
                    </p>
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
                    >
                        View All News
                    </Link>
                </div>
            </section>
        </div>
    );
}
