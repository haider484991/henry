"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const episodes = [
    { guest: "Chris McKee", slug: "chris-mckee", description: "Chris McKee of Founder Venturity Financial on entrepreneurial finance." },
    { guest: "Don Williams", slug: "don-williams", description: "Don Williams of Don Williams Global on business strategies." },
    { guest: "Eric Helitzer", slug: "subbase-ceo-eric-helitzer", description: "Eric Helitzer, CEO of SubBase on construction technology." },
    { guest: "Josh Levy", slug: "josh-levy-document-crunch", description: "Josh Levy of Document Crunch on legal tech innovation." },
    { guest: "Carter Malouf", slug: "private-jeweler-carter-malouf", description: "Private jeweler Carter Malouf on luxury business." },
    { guest: "Tim Goeglein", slug: "henry-harrison-tim-goeglein", description: "Tim Goeglein shares insights on leadership." },
    { guest: "Don Short", slug: "new-artisan-distillery-don-short", description: "Don Short of New Artisan Distillery on craft spirits." },
    { guest: "John Cornelsen", slug: "john-cornelsen-evolving-texas-indigo-yoga-juggle", description: "John Cornelsen of Evolving Texas and Indigo Yoga." },
    { guest: "Bob Fox", slug: "bob-fox", description: "Bob Fox shares his entrepreneurial experience." },
    { guest: "Jeff Strong", slug: "low-voltage-switchgear-manufacturer-jeff-strong-corr-solutions-electrical", description: "Jeff Strong of Corr Solutions Electrical on manufacturing." },
];

export default function Season3Page() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".season-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".episode-card", {
                scrollTrigger: {
                    trigger: ".episodes-grid",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="season-hero max-w-4xl">
                        <Link href="/podcast" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                            <Headphones className="w-4 h-4" />
                            Back to Podcast
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Season 3
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Entrepreneurs, Business and Finance Podcast Season 3 with more inspiring conversations.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="episodes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {episodes.map((episode, index) => (
                            <Link
                                key={episode.slug}
                                href={`/${episode.slug}`}
                                className="episode-card group block p-6 bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center flex-shrink-0 transition-colors">
                                        <Play className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                                            Episode {index + 1}
                                        </p>
                                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            {episode.guest}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {episode.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-secondary/30">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <h2 className="text-2xl font-medium text-foreground mb-8">Other Seasons</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/season-4" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 4
                        </Link>
                        <Link href="/henry-harrison-dallas-tx-podcast-season-2" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 2
                        </Link>
                        <Link href="/podcast" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 1
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
