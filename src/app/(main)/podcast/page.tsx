"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, ArrowRight, Play, Loader2 } from "lucide-react";
import Link from "next/link";
import { getSeasons, getEpisodes } from "@/lib/actions";

gsap.registerPlugin(ScrollTrigger);

interface Episode {
    id: string;
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    youtube?: string;
}

interface Season {
    id: string;
    number: number;
    title: string;
    description?: string;
    published: boolean;
}

interface SeasonWithEpisodes {
    number: number;
    name: string;
    href: string;
    episodes: Episode[];
}

const platforms = [
    { name: "Spotify", href: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" },
    { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" },
    { name: "Amazon", href: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4" },
    { name: "SoundCloud", href: "https://soundcloud.com/henry-harrison-podcast" },
];

export default function PodcastPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [seasons, setSeasons] = useState<SeasonWithEpisodes[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [seasonsData, episodesData] = await Promise.all([
                getSeasons(),
                getEpisodes()
            ]);

            // Group episodes by season
            const seasonMap = new Map<number, Episode[]>();
            episodesData.forEach((ep: Episode) => {
                if (!seasonMap.has(ep.season)) {
                    seasonMap.set(ep.season, []);
                }
                seasonMap.get(ep.season)!.push(ep);
            });

            // Sort episodes within each season by episode number
            seasonMap.forEach((episodes) => {
                episodes.sort((a, b) => a.episode - b.episode);
            });

            // Create season objects with episodes, sorted by season number descending
            const seasonsWithEpisodes: SeasonWithEpisodes[] = seasonsData
                .filter((s: Season) => s.published)
                .map((s: Season) => ({
                    number: s.number,
                    name: s.title || `Season ${s.number}`,
                    href: `/season-${s.number}`,
                    episodes: seasonMap.get(s.number) || []
                }))
                .sort((a: SeasonWithEpisodes, b: SeasonWithEpisodes) => b.number - a.number);

            setSeasons(seasonsWithEpisodes);
            setIsLoading(false);
        }
        loadData();
    }, []);

    useLayoutEffect(() => {
        if (isLoading || !pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".podcast-hero > *", {
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

            gsap.fromTo(".platform-link", {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.8,
                ease: "power3.out",
            });

            // Animate episode cards as they come into view
            gsap.fromTo(".episode-card", {
                y: 30,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".episode-card",
                    start: "top 90%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
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
                    <div className="podcast-hero max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Headphones className="w-8 h-8" />
                            <p className="text-sm uppercase tracking-widest opacity-70">Podcast</p>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Entrepreneurs, Business & Finance Podcast
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl mb-8">
                            Your go-to destination for insightful conversations and expert advice on all things related to entrepreneurship, business, and finance. Henry and his guests dive deep into business strategies, investment opportunities, market trends, and personal development.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {platforms.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="platform-link px-6 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                                >
                                    {platform.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Podcast Trailer Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Video */}
                        <div className="aspect-video bg-black rounded overflow-hidden">
                            <video
                                className="w-full h-full object-cover"
                                controls
                                poster="/images/podcast/podcast-cover.jpg"
                            >
                                <source src="/videos/podcast-trailer.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                                    Podcast Trailer
                                </h2>
                                <p className="text-lg text-primary font-medium mb-4">From Dallas TX</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    This season, we&apos;re diving deeper into entrepreneurs, business strategies, and the world of finance. Join me as we explore the stories behind successful business people and finance experts, dissecting the challenges, triumphs, and strategies that shape their journey.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-medium text-foreground mb-4">
                                    Unveiling Insights
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Through insightful interviews, thought-provoking discussions, and actionable tips, each season promises to be a resource for aspiring entrepreneurs and seasoned business minds alike. From innovative startups to established entrepreneurs, we&apos;ll uncover the strategies that drive success in today&apos;s competitive landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seasons */}
            {seasons.map((season, seasonIndex) => (
                <section key={season.number} className={`season-${seasonIndex} py-16 md:py-24 ${seasonIndex % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}>
                    <div className="w-full px-8 md:px-16 lg:px-24">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                                {season.name}
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {season.episodes.length} episodes
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {season.episodes.map((episode) => (
                                <Link
                                    key={episode.slug}
                                    href={`/podcast/${episode.slug}`}
                                    className="episode-card group block p-6 bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center flex-shrink-0 transition-colors">
                                            <Play className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                                Episode {episode.episode}
                                            </p>
                                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                {episode.guest}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium mb-6">
                        Want to Be a Guest?
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                        Are you an entrepreneur with a story to share? We're always looking for inspiring guests to feature on the podcast.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
                    >
                        Get in Touch
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
