"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Play, Headphones, ArrowRight, Phone, Mail, MapPin, ExternalLink, Share2, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Episode, episodes } from "@/data/episodes";

gsap.registerPlugin(ScrollTrigger);

interface EpisodePageProps {
    episode: Episode;
}

export default function EpisodePage({ episode }: EpisodePageProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    // Get related episodes from same season
    const relatedEpisodes = episodes
        .filter(ep => ep.season === episode.season && ep.slug !== episode.slug)
        .slice(0, 3);

    const seasonLink = episode.season === 4
        ? "/season-4"
        : episode.season === 3
        ? "/entrepreneurs-business-and-finance-season-3"
        : episode.season === 2
        ? "/henry-harrison-dallas-tx-podcast-season-2"
        : "/podcast";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from(".hero-badge", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            });

            gsap.from(".hero-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
            });

            gsap.from(".hero-subtitle", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.4,
                ease: "power3.out",
            });

            gsap.from(".hero-description", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "power3.out",
            });

            gsap.from(".hero-image", {
                scale: 1.1,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out",
            });

            // Content animations
            gsap.from(".media-container", {
                scrollTrigger: {
                    trigger: ".media-container",
                    start: "top 85%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".content-section", {
                scrollTrigger: {
                    trigger: ".content-section",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".sidebar-item", {
                scrollTrigger: {
                    trigger: ".sidebar-item",
                    start: "top 85%",
                },
                x: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            });

            gsap.from(".related-card", {
                scrollTrigger: {
                    trigger: ".related-episodes",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-end bg-primary overflow-hidden">
                {/* Background Image */}
                {episode.image && (
                    <div className="hero-image absolute inset-0">
                        <Image
                            src={episode.image}
                            alt={episode.guest}
                            fill
                            className="object-cover object-top"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
                    </div>
                )}

                {/* If no image, show gradient background */}
                {!episode.image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
                )}

                <div className="container px-6 pb-16 pt-40 relative z-10">
                    <div className="max-w-4xl">
                        {/* Back Link */}
                        <Link
                            href={seasonLink}
                            className="hero-badge inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Season {episode.season}
                        </Link>

                        {/* Episode Badge */}
                        <div className="hero-badge flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full">
                                <Headphones className="w-4 h-4" />
                                Season {episode.season} • Episode {episode.episode}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-primary-foreground leading-[1.1] mb-4">
                            {episode.headline || episode.guest}
                        </h1>

                        {/* Subtitle */}
                        {episode.subheadline && (
                            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 font-light mb-6">
                                {episode.subheadline}
                            </p>
                        )}

                        {/* Description */}
                        <p className="hero-description text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                            {episode.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Main Content Column */}
                            <div className="lg:col-span-8">
                                {/* Media Container */}
                                <div className="media-container mb-12">
                                    {/* YouTube Embed */}
                                    {episode.youtube && (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${episode.youtube}`}
                                                title={`${episode.guest} - Henry Harrison Podcast`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}

                                    {/* SoundCloud Embed */}
                                    {episode.soundcloud && (
                                        <div className={`${episode.youtube ? 'mt-6' : ''}`}>
                                            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                        <Headphones className="w-5 h-5 text-primary-foreground" />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground">Listen on SoundCloud</span>
                                                </div>
                                                <iframe
                                                    width="100%"
                                                    height="166"
                                                    scrolling="no"
                                                    frameBorder="no"
                                                    allow="autoplay"
                                                    src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/henry-harrison-podcast/${episode.soundcloud}&color=%23001C25&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                                                    className="rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Fallback if no media */}
                                    {!episode.youtube && !episode.soundcloud && (
                                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <Play className="w-10 h-10 ml-1" />
                                                </div>
                                                <p className="text-muted-foreground text-lg">Listen on your favorite platform</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Full Description */}
                                <div className="content-section mb-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-1 h-8 bg-primary rounded-full" />
                                        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                                            About This Episode
                                        </h2>
                                    </div>
                                    <div className="prose prose-lg max-w-none">
                                        {episode.fullDescription ? (
                                            <p className="text-muted-foreground leading-relaxed text-lg">
                                                {episode.fullDescription}
                                            </p>
                                        ) : (
                                            <div className="space-y-4 text-muted-foreground">
                                                <p className="text-lg leading-relaxed">
                                                    In this episode of the Henry Harrison Entrepreneurs, Business & Finance Podcast,
                                                    Henry sits down with {episode.guest} for an insightful conversation about
                                                    entrepreneurship, business strategies, and success.
                                                </p>
                                                <p className="leading-relaxed">{episode.description}</p>
                                                <p className="leading-relaxed">
                                                    Join us as we explore the journey, challenges, and triumphs that have shaped
                                                    {" "}{episode.guest}&apos;s career and learn valuable lessons that can be applied to
                                                    your own entrepreneurial endeavors.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key Insights */}
                                {episode.keyInsights && (
                                    <div className="content-section mb-12">
                                        <div className="bg-gradient-to-br from-primary to-primary/90 p-8 md:p-10 rounded-2xl text-primary-foreground">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                    <span className="text-xl">💡</span>
                                                </div>
                                                <h2 className="text-2xl font-medium">
                                                    Key Insights
                                                </h2>
                                            </div>
                                            <p className="text-lg leading-relaxed opacity-90">
                                                {episode.keyInsights}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Guest Contact */}
                                {episode.guestContact && (
                                    <div className="content-section">
                                        <div className="bg-secondary/50 p-8 md:p-10 rounded-2xl">
                                            <h3 className="text-2xl font-medium text-foreground mb-8">
                                                Connect with {episode.guest}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {episode.guestContact.phone && (
                                                    <a
                                                        href={`tel:${episode.guestContact.phone}`}
                                                        className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                                                    >
                                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                            <Phone className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                                                            <p className="font-medium text-foreground">{episode.guestContact.phone}</p>
                                                        </div>
                                                    </a>
                                                )}
                                                {episode.guestContact.email && (
                                                    <a
                                                        href={`mailto:${episode.guestContact.email}`}
                                                        className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                                                    >
                                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                            <Mail className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                                                            <p className="font-medium text-foreground break-all">{episode.guestContact.email}</p>
                                                        </div>
                                                    </a>
                                                )}
                                                {episode.guestContact.address && (
                                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Address</p>
                                                            <p className="font-medium text-foreground">{episode.guestContact.address}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {episode.guestContact.website && (
                                                    <a
                                                        href={episode.guestContact.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                                                    >
                                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                            <ExternalLink className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Website</p>
                                                            <p className="font-medium text-foreground">{episode.guestContact.websiteLabel || "Visit Website"}</p>
                                                        </div>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-8 space-y-8">
                                    {/* Guest Image Card */}
                                    {episode.image && (
                                        <div className="sidebar-item relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                                            <Image
                                                src={episode.image}
                                                alt={episode.guest}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <p className="text-white/80 text-sm mb-1">Featured Guest</p>
                                                <p className="text-white text-xl font-medium">{episode.guest}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Listen On Card */}
                                    <div className="sidebar-item bg-white border border-border/50 p-6 rounded-2xl shadow-sm">
                                        <h3 className="text-lg font-medium text-foreground mb-5 flex items-center gap-2">
                                            <Headphones className="w-5 h-5 text-primary" />
                                            Listen On
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { name: "Spotify", href: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN", color: "hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954]" },
                                                { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178", color: "hover:bg-[#9933FF] hover:text-white hover:border-[#9933FF]" },
                                                { name: "Amazon", href: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4", color: "hover:bg-[#FF9900] hover:text-white hover:border-[#FF9900]" },
                                                { name: "SoundCloud", href: "https://soundcloud.com/henry-harrison-podcast", color: "hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500]" },
                                            ].map((platform) => (
                                                <a
                                                    key={platform.name}
                                                    href={platform.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-between px-4 py-3 border border-border rounded-xl text-sm font-medium transition-all ${platform.color}`}
                                                >
                                                    {platform.name}
                                                    <ExternalLink className="w-4 h-4 opacity-50" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Be a Guest CTA */}
                                    <div className="sidebar-item bg-gradient-to-br from-primary to-primary/90 p-6 rounded-2xl text-primary-foreground">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                            <Headphones className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-medium mb-3">
                                            Be a Guest
                                        </h3>
                                        <p className="text-sm opacity-80 mb-6 leading-relaxed">
                                            Are you an entrepreneur with a story to share? Join Henry on the podcast.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-colors group"
                                        >
                                            Get in Touch
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Episodes */}
            {relatedEpisodes.length > 0 && (
                <section className="related-episodes py-20 bg-gradient-to-b from-secondary/30 to-background">
                    <div className="container px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <p className="text-sm uppercase tracking-widest text-primary mb-2">Continue Listening</p>
                                    <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                                        More from Season {episode.season}
                                    </h2>
                                </div>
                                <Link
                                    href={seasonLink}
                                    className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                                >
                                    View All Episodes
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedEpisodes.map((ep) => (
                                    <Link
                                        key={ep.slug}
                                        href={`/${ep.slug}`}
                                        className="related-card group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
                                    >
                                        {/* Episode Image or Placeholder */}
                                        <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                                            {ep.image ? (
                                                <Image
                                                    src={ep.image}
                                                    alt={ep.guest}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                                        <Headphones className="w-8 h-8 text-primary/60" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-lg">
                                                <Play className="w-5 h-5 ml-0.5" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">
                                                Episode {ep.episode}
                                            </p>
                                            <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                                                {ep.guest}
                                            </h3>
                                            {ep.description && (
                                                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                                    {ep.description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8 text-center md:hidden">
                                <Link
                                    href={seasonLink}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl"
                                >
                                    View All Episodes
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
