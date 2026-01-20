"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mic, FileText, Eye, TrendingUp, Plus, ArrowRight, Loader2 } from "lucide-react";
import { getEpisodes, getArticles, getSeasons } from "@/lib/actions";

interface Episode {
    id: string;
    slug: string;
    guest: string;
    season: number;
    episode: number;
    published: boolean;
}

interface Article {
    id: string;
    slug: string;
    title: string;
    date: string;
    published: boolean;
}

interface Season {
    id: string;
    number: number;
}

export default function AdminDashboard() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [episodesData, articlesData, seasonsData] = await Promise.all([
                getEpisodes(),
                getArticles(),
                getSeasons()
            ]);
            setEpisodes(episodesData);
            setArticles(articlesData);
            setSeasons(seasonsData);
            setIsLoading(false);
        }
        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const latestEpisodes = [...episodes]
        .sort((a, b) => {
            if (a.season !== b.season) return b.season - a.season;
            return b.episode - a.episode;
        })
        .slice(0, 5);

    const latestArticles = [...articles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    const stats = [
        {
            name: "Total Episodes",
            value: episodes.length,
            icon: Mic,
            href: "/admin/podcasts",
            color: "bg-blue-500",
        },
        {
            name: "Total Articles",
            value: articles.length,
            icon: FileText,
            href: "/admin/news",
            color: "bg-green-500",
        },
        {
            name: "Seasons",
            value: seasons.length,
            icon: TrendingUp,
            href: "/admin/seasons",
            color: "bg-purple-500",
        },
        {
            name: "Published",
            value: articles.filter(a => a.published).length + episodes.filter(e => e.published).length,
            icon: Eye,
            href: "/admin",
            color: "bg-orange-500",
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here&apos;s an overview of your content.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/podcasts/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Episode
                    </Link>
                    <Link
                        href="/admin/news/new"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Article
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <div className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-gray-500 text-sm">{stat.name}</div>
                    </Link>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Latest Episodes */}
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Latest Episodes</h2>
                        <Link
                            href="/admin/podcasts"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {latestEpisodes.map((episode) => (
                            <Link
                                key={episode.id}
                                href={`/admin/podcasts/${episode.id}`}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mic className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{episode.guest}</p>
                                    <p className="text-sm text-gray-500">S{episode.season} E{episode.episode}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Latest Articles */}
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Latest Articles</h2>
                        <Link
                            href="/admin/news"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {latestArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/admin/news/${article.id}`}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{article.title}</p>
                                    <p className="text-sm text-gray-500">{article.date}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    article.published
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {article.published ? "Published" : "Draft"}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Auto Blog Generator</h2>
                        <p className="text-white/80 max-w-xl">
                            Generate new blog posts automatically from topics or RSS feeds. Perfect for keeping your content fresh and engaging.
                        </p>
                    </div>
                    <Link
                        href="/admin/news/generate"
                        className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                    >
                        Generate Article
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
