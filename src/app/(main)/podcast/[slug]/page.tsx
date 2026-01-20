"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Headphones, ExternalLink, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { getEpisodeBySlug } from "@/lib/actions";

interface Episode {
    id: string;
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    youtube?: string;
    soundcloud?: string;
    image?: string;
    headline?: string;
    subheadline?: string;
    fullDescription?: string;
    keyInsights?: string;
    guestContact?: {
        phone?: string;
        email?: string;
        address?: string;
        website?: string;
        websiteLabel?: string;
    };
}

export default function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadEpisode() {
            const data = await getEpisodeBySlug(slug);
            setEpisode(data);
            setIsLoading(false);
        }
        loadEpisode();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!episode) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium text-foreground mb-4">Episode Not Found</h1>
                <Link href="/podcast" className="text-primary hover:underline">
                    Back to Podcast
                </Link>
            </div>
        );
    }

    const thumbnailUrl = episode.youtube
        ? `https://img.youtube.com/vi/${episode.youtube}/maxresdefault.jpg`
        : episode.image || "/images/podcast/podcast-cover.jpg";

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link
                        href="/podcast"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Podcast
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Headphones className="w-6 h-6" />
                                <span className="text-sm uppercase tracking-widest opacity-70">
                                    Season {episode.season} - Episode {episode.episode}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-4">
                                {episode.guest}
                            </h1>
                            {episode.headline && (
                                <p className="text-xl opacity-90 mb-2">{episode.headline}</p>
                            )}
                            {episode.subheadline && (
                                <p className="text-lg opacity-70 mb-6">{episode.subheadline}</p>
                            )}
                            <p className="text-lg opacity-80 leading-relaxed">
                                {episode.description}
                            </p>
                        </div>

                        {/* Thumbnail */}
                        <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                            <img
                                src={thumbnailUrl}
                                alt={episode.guest}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Video/Audio Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <h2 className="text-2xl font-medium text-foreground mb-8">Watch / Listen</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* YouTube Video */}
                        {episode.youtube && (
                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${episode.youtube}`}
                                    title={episode.guest}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        )}

                        {/* SoundCloud */}
                        {episode.soundcloud && (
                            <div className="bg-gray-100 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Play className="w-6 h-6 text-primary" />
                                    <span className="font-medium text-foreground">Listen on SoundCloud</span>
                                </div>
                                <iframe
                                    width="100%"
                                    height="166"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/henry-harrison-podcast/${episode.soundcloud}&color=%23003366&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Full Description */}
            {episode.fullDescription && (
                <section className="py-16 md:py-24 bg-secondary/30">
                    <div className="w-full px-8 md:px-16 lg:px-24">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl font-medium text-foreground mb-8">About This Episode</h2>
                            <div
                                className="prose prose-lg max-w-none text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: episode.fullDescription }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Key Insights */}
            {episode.keyInsights && (
                <section className="py-16 md:py-24 bg-background">
                    <div className="w-full px-8 md:px-16 lg:px-24">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl font-medium text-foreground mb-8">Key Insights</h2>
                            <div
                                className="prose prose-lg max-w-none text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: episode.keyInsights }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Guest Contact */}
            {episode.guestContact && (
                <section className="py-16 md:py-24 bg-secondary/30">
                    <div className="w-full px-8 md:px-16 lg:px-24">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-medium text-foreground mb-8">Connect with {episode.guest}</h2>
                            <div className="bg-white p-8 rounded-lg border border-border space-y-4">
                                {episode.guestContact.phone && (
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-5 h-5 text-primary" />
                                        <a href={`tel:${episode.guestContact.phone}`} className="text-foreground hover:text-primary transition-colors">
                                            {episode.guestContact.phone}
                                        </a>
                                    </div>
                                )}
                                {episode.guestContact.email && (
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-5 h-5 text-primary" />
                                        <a href={`mailto:${episode.guestContact.email}`} className="text-foreground hover:text-primary transition-colors">
                                            {episode.guestContact.email}
                                        </a>
                                    </div>
                                )}
                                {episode.guestContact.address && (
                                    <div className="flex items-center gap-4">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <span className="text-foreground">{episode.guestContact.address}</span>
                                    </div>
                                )}
                                {episode.guestContact.website && (
                                    <div className="flex items-center gap-4">
                                        <ExternalLink className="w-5 h-5 text-primary" />
                                        <a
                                            href={episode.guestContact.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {episode.guestContact.websiteLabel || episode.guestContact.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium mb-6">
                        Enjoyed This Episode?
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                        Subscribe to the podcast and never miss an episode. Available on all major platforms.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                        >
                            Spotify
                        </a>
                        <a
                            href="https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                        >
                            Apple Podcasts
                        </a>
                        <a
                            href="https://soundcloud.com/henry-harrison-podcast"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                        >
                            SoundCloud
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
