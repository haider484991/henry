"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Headphones, ExternalLink } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const episodes = [
    {
        season: "Season 4",
        title: "Interview with Chloe Smith, CEO of Mercator AI",
        description: "Henry Harrison sits down with Chloe Smith to discuss AI innovation and entrepreneurship.",
        image: "https://henryharrison.com/wp-content/uploads/2024/06/Henry-Harrison-Dallas-Texas-Podcast-Featured.jpg",
        link: "https://henryharrison.com/chloe-smith/",
    },
    {
        season: "Season 4",
        title: "Shark Tank's 'Hire Santa' Owner Mitch Allen",
        description: "Dallas' Henry Harrison interviews Shark Tank's 'Hire Santa' owner about building a seasonal empire.",
        image: "https://henryharrison.com/wp-content/uploads/2024/06/Henry-Harrison-Dallas-Texas-Podcast-Featured.jpg",
        link: "https://henryharrison.com/dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen/",
    },
    {
        season: "Season 4",
        title: "Don Williams of Don Williams Global",
        description: "Henry Harrison chats with Don Williams about global business strategies and growth.",
        image: "https://henryharrison.com/wp-content/uploads/2024/06/Henry-Harrison-Dallas-Texas-Podcast-Featured.jpg",
        link: "https://henryharrison.com/don-williams/",
    },
];

export function PodcastSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header
            gsap.from(".podcast-header", {
                scrollTrigger: {
                    trigger: ".podcast-header",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Animate featured podcast with scale and fade
            gsap.from(".podcast-featured", {
                scrollTrigger: {
                    trigger: ".podcast-featured",
                    start: "top 75%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Animate episode cards
            gsap.from(".episode-card", {
                scrollTrigger: {
                    trigger: ".episodes-grid",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Horizontal line animation
            gsap.from(".podcast-line", {
                scrollTrigger: {
                    trigger: ".podcast-line",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                scaleX: 0,
                duration: 1.5,
                ease: "power3.inOut",
                transformOrigin: "left center",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="podcast" ref={sectionRef} className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
            <div className="container px-6">
                {/* Section Header */}
                <div className="podcast-header max-w-3xl mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Headphones className="w-6 h-6" />
                        <p className="text-sm uppercase tracking-widest opacity-70">Podcast</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                        Entrepreneurs, Business
                        <br />
                        <span className="opacity-70">& Finance Podcast</span>
                    </h2>
                    <p className="text-lg opacity-70 leading-relaxed max-w-2xl mb-8">
                        Your go-to destination for insightful conversations and expert advice on all things related to entrepreneurship, business, and finance. Henry and his guests dive deep into business strategies, investment opportunities, market trends, and personal development.
                    </p>
                    {/* Podcast Platforms */}
                    <div className="flex flex-wrap gap-4">
                        <a href="https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm transition-colors">
                            Spotify
                        </a>
                        <a href="https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm transition-colors">
                            Apple Podcasts
                        </a>
                        <a href="https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm transition-colors">
                            Amazon
                        </a>
                        <a href="https://soundcloud.com/henry-harrison-podcast" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm transition-colors">
                            SoundCloud
                        </a>
                    </div>
                </div>

                {/* Featured Episode */}
                <div className="podcast-featured relative mb-16 group cursor-pointer">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                            <img
                                src="https://henryharrison.com/wp-content/uploads/2024/06/Henry-Harrison-Dallas-Texas-Podcast-Featured.jpg"
                                alt="Henry Harrison Podcast"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 p-8 lg:p-12 flex flex-col justify-center">
                            <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Latest Episode</p>
                            <h3 className="text-2xl md:text-3xl font-medium mb-4">
                                From Dallas Henry Harrison Interviews James Benham
                            </h3>
                            <p className="opacity-70 leading-relaxed mb-6">
                                Henry Harrison interviews James Benham about entrepreneurship, business strategies, and the journey of building successful companies.
                            </p>
                            <Link
                                href="https://henryharrison.com/dallas-henry-harrison-james-benham/"
                                target="_blank"
                                className="link-arrow text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground inline-flex w-fit"
                            >
                                Watch Episode
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="podcast-line h-[1px] bg-white/20 mb-16" />

                {/* Episodes Grid */}
                <div className="episodes-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    {episodes.map((episode, index) => (
                        <Link
                            href={episode.link}
                            target="_blank"
                            key={index}
                            className="episode-card group block"
                        >
                            <div className="aspect-video overflow-hidden mb-6 relative">
                                <img
                                    src={episode.image}
                                    alt={episode.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs uppercase tracking-wider">
                                        {episode.season}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-lg font-medium mb-2 group-hover:opacity-70 transition-opacity line-clamp-2">
                                {episode.title}
                            </h3>
                            <p className="text-sm opacity-60 line-clamp-2">
                                {episode.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="https://henryharrison.com/podcast/"
                        target="_blank"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
                    >
                        View All Episodes
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
