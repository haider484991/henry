"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const episodes = [
    { guest: "David Wang", slug: "dallas-tx-henry-harrison-podcast-s2-ep1-david-wang", description: "Season 2 kicks off with David Wang discussing entrepreneurship." },
    { guest: "Tom Motlow", slug: "dallas-tx-tom-motlow", description: "Tom Motlow shares his business journey and insights." },
    { guest: "Mitch Allen", slug: "dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen", description: "Shark Tank's Mitch Allen of Hire Santa on seasonal business." },
    { guest: "Karl Chiao", slug: "karl-chiao", description: "Karl Chiao on his journey from real estate to the Dallas Historical Society." },
    { guest: "Chloe Smith", slug: "chloe-smith", description: "Chloe Smith, CEO of Mercator AI on technology and innovation." },
    { guest: "Liam Coakley", slug: "dallas-henry-harrison-liam-coakley", description: "Liam Coakley shares entrepreneurial wisdom." },
    { guest: "James Benham", slug: "dallas-henry-harrison-james-benham", description: "James Benham on business strategies and growth." },
    { guest: "Steve Dell'Orto", slug: "dallas-henry-harrison-steve-dellorto", description: "Steve Dell'Orto on his entrepreneurial journey." },
    { guest: "Paul Romness", slug: "advancing-cancer-treatments-paul-romness", description: "Paul Romness on advancing cancer treatments and healthcare innovation." },
    { guest: "Jeremy Brandt", slug: "real-estate-entrepreneurship-jeremy-brandt", description: "Jeremy Brandt on real estate entrepreneurship." },
    { guest: "Bob McCarthy", slug: "bob-mccarthys-entrepreneurial-journey", description: "Bob McCarthy's entrepreneurial journey and lessons learned." },
];

export default function Season2Page() {
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
                <div className="container px-6">
                    <div className="season-hero max-w-4xl">
                        <Link href="/podcast" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                            <Headphones className="w-4 h-4" />
                            Back to Podcast
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Season 2
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Henry Harrison Dallas TX Podcast Season 2 featuring conversations with entrepreneurs and business leaders.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container px-6">
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
                <div className="container px-6">
                    <h2 className="text-2xl font-medium text-foreground mb-8">Other Seasons</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/season-4" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 4
                        </Link>
                        <Link href="/entrepreneurs-business-and-finance-season-3" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 3
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
