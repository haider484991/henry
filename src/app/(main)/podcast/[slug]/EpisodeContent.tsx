"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, Headphones, ExternalLink, Phone, Mail, MapPin } from "lucide-react";

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

export function EpisodeContent({ episode }: { episode: Episode }) {
    const thumbnailUrl = episode.youtube
        ? `https://img.youtube.com/vi/${episode.youtube}/maxresdefault.jpg`
        : episode.image || "/images/podcast/podcast-cover.jpg";

    return (
        <article className="min-h-screen bg-background">
            {/* Hero Section */}
            <header className="relative py-24 md:py-32 bg-primary text-primary-foreground">
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
                        <figure className="aspect-video bg-black/20 rounded-lg overflow-hidden relative">
                            <Image
                                src={thumbnailUrl}
                                alt={`${episode.guest} on Henry Harrison Podcast`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </figure>
                    </div>
                </div>
            </header>

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
                                    title={`${episode.guest} - Henry Harrison Podcast`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                    loading="lazy"
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
                                    title={`${episode.guest} on SoundCloud`}
                                    loading="lazy"
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
                                className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary"
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
                                className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary"
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
                            <address className="bg-white p-8 rounded-lg border border-border space-y-4 not-italic">
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
                            </address>
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
                    <nav className="flex flex-wrap justify-center gap-4" aria-label="Podcast platforms">
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
                    </nav>
                </div>
            </section>
        </article>
    );
}
