"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { episodes } from "@/data/episodes";

// Register once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Get all episodes with YouTube videos grouped by season
const allEpisodes = episodes.filter(ep => ep.youtube);
const seasons = [
    { id: "all", label: "All" },
    { id: 4, label: "Season 4" },
    { id: 3, label: "Season 3" },
    { id: 2, label: "Season 2" },
    { id: 1, label: "Season 1" },
];

export function PodcastSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeSeason, setActiveSeason] = useState<number | "all">("all");
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const filteredEpisodes = activeSeason === "all"
        ? allEpisodes
        : allEpisodes.filter(ep => ep.season === activeSeason);

    // Get YouTube thumbnail URL
    const getYouTubeThumbnail = (videoId: string) => {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(".podcast-header-content > *", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".podcast-header-content",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Carousel container animation
            gsap.fromTo(".carousel-container", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".carousel-container",
                    start: "top 90%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            });
        }, sectionRef);

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    // Animate cards when season changes
    useEffect(() => {
        if (trackRef.current) {
            gsap.fromTo(
                trackRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: "power2.out"
                }
            );
            // Reset scroll position
            if (carouselRef.current) {
                carouselRef.current.scrollLeft = 0;
            }
        }
    }, [activeSeason]);

    // Smooth scroll navigation
    const scroll = useCallback((direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = 500;
            const newScrollLeft = direction === "left"
                ? carouselRef.current.scrollLeft - scrollAmount
                : carouselRef.current.scrollLeft + scrollAmount;

            carouselRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    }, []);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleSeasonChange = (season: number | "all") => {
        setActiveSeason(season);
    };

    return (
        <section id="podcast" ref={sectionRef} className="py-24 md:py-40 bg-primary text-primary-foreground overflow-hidden relative">
            <div className="w-full px-8 md:px-16 lg:px-24">
                {/* Section Header */}
                <div className="podcast-header-content max-w-4xl mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                            <Headphones className="w-7 h-7" />
                        </div>
                        <p className="text-sm uppercase tracking-widest text-white/60">Podcast</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                        Entrepreneurs, Business
                        <br />
                        <span className="text-white/60">& Finance Podcast</span>
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
                        Your go-to destination for insightful conversations and expert advice on all things related to entrepreneurship, business, and finance.
                    </p>

                    {/* Podcast Platforms */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { name: "Spotify", href: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" },
                            { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" },
                            { name: "Amazon", href: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4" },
                            { name: "SoundCloud", href: "https://soundcloud.com/henry-harrison-podcast" },
                        ].map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-primary text-sm font-medium transition-all hover:bg-white/90 hover:scale-105"
                            >
                                {platform.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Season Filter & Navigation */}
                <div className="carousel-container">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                        {/* Season Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {seasons.map((season) => (
                                <button
                                    key={season.id}
                                    onClick={() => handleSeasonChange(season.id as number | "all")}
                                    className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 ${activeSeason === season.id
                                        ? "bg-white text-primary"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    {season.label}
                                    {season.id !== "all" && (
                                        <span className={`ml-2 ${activeSeason === season.id ? "text-primary/60" : "text-white/50"}`}>
                                            ({allEpisodes.filter(ep => ep.season === season.id).length})
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="w-12 h-12 bg-white text-primary flex items-center justify-center transition-all hover:bg-white/90 active:scale-95"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-12 h-12 bg-white text-primary flex items-center justify-center transition-all hover:bg-white/90 active:scale-95"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Carousel Track */}
                    <div
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className={`flex gap-6 overflow-x-auto scrollbar-hide pb-6 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"
                            }`}
                    >
                        <div ref={trackRef} className="flex gap-6">
                            {filteredEpisodes.map((episode) => (
                                <Link
                                    href={`/${episode.slug}`}
                                    key={episode.slug}
                                    className="episode-card group flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[480px]"
                                    onClick={(e) => isDragging && e.preventDefault()}
                                >
                                    {/* Card */}
                                    <div className="relative bg-[#0a323f] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                                        {/* Thumbnail */}
                                        <div className="relative aspect-video overflow-hidden">
                                            {episode.youtube && (
                                                <img
                                                    src={getYouTubeThumbnail(episode.youtube)}
                                                    alt={episode.guest}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    draggable={false}
                                                />
                                            )}
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a323f] via-transparent to-transparent" />

                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
                                                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                                                </div>
                                            </div>

                                            {/* Season Badge */}
                                            <div className="absolute top-5 left-5">
                                                <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider">
                                                    S{episode.season} E{episode.episode}
                                                </span>
                                            </div>

                                            {/* Duration Badge */}
                                            <div className="absolute bottom-5 right-5">
                                                <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-xs font-medium">
                                                    Full Episode
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white/90 transition-colors">
                                                {episode.guest}
                                            </h3>
                                            <p className="text-sm text-white/50 line-clamp-2 mb-5 leading-relaxed">
                                                {episode.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                                                <span>Watch Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/10">
                    {[
                        { value: "4", label: "Seasons" },
                        { value: `${allEpisodes.length}+`, label: "Episodes" },
                        { value: "50+", label: "Guests" },
                        { value: "1000+", label: "Listeners" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl md:text-6xl font-medium mb-3">{stat.value}</div>
                            <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/podcast"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-semibold transition-all hover:bg-white/90 hover:gap-4"
                    >
                        Browse All Episodes
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
            </div>
        </section>
    );
}
