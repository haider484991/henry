"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const episodes = [
    { guest: "Marc Ollivier", slug: "marcolivia", description: "Henry Harrison interviews Marc Ollivier about entrepreneurship and business." },
    { guest: "Dida Clifton", slug: "dida-clifton-theofficesquad", description: "Dida Clifton of TheOfficeSquad shares insights on business operations." },
    { guest: "Neeti Khaitan", slug: "neeti-khaitan", description: "Neeti Khaitan discusses her entrepreneurial journey." },
    { guest: "Clark Neily", slug: "clark-neily-of-the-cato-institute", description: "Clark Neily of the Cato Institute on policy and business." },
    { guest: "Dianna Booher", slug: "dianna-booher", description: "Author Dianna Booher on communication and leadership." },
    { guest: "Leise Sandeman", slug: "leise-sandeman", description: "Leise Sandeman shares her business expertise." },
    { guest: "James Dickey", slug: "james-dickey", description: "James Dickey on entrepreneurship in Texas." },
    { guest: "Chris Brown & RJ Byrd", slug: "chris-brown-rj-byrd-search-group", description: "Chris Brown and RJ Byrd of Search Group Partners." },
    { guest: "Harry Hunsicker", slug: "harry-hunsicker", description: "Author and entrepreneur Harry Hunsicker." },
    { guest: "Alexandre Teplitxky", slug: "alexandre-teplitxky-smart-pm-technologies", description: "Alexandre Teplitxky of Smart PM Technologies." },
    { guest: "Albert Bou-Fadel", slug: "albert-bou-fadel-with-smartbarrel", description: "Albert Bou-Fadel with SmartBarrel on construction tech." },
    { guest: "James Poen", slug: "james-poen-richardson-saw-and-lawn-mower", description: "James Poen of Richardson Saw and Lawn Mower." },
    { guest: "Jack Carrere", slug: "henry-harrison-sits-down-with-jack-carrere-of-prokeep", description: "Jack Carrere of Prokeep on technology solutions." },
    { guest: "Chaitanya NK", slug: "chaitanya-nk-ceo-of-track-3d", description: "Chaitanya NK, CEO of Track 3D on innovation." },
    { guest: "Glenn Poulos", slug: "glenn-poulos", description: "Glenn Poulos shares entrepreneurial insights." },
    { guest: "Burt Copeland", slug: "burt-copeland-new-life-cfo", description: "Burt Copeland of New Life CFO on financial leadership." },
    { guest: "Hugh Massie", slug: "hugh-massie-dna-behavior", description: "Hugh Massie of DNA Behavior on understanding people." },
];

export default function Season4Page() {
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
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
                    <div className="season-hero max-w-4xl">
                        <Link href="/podcast" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                            <Headphones className="w-4 h-4" />
                            Back to Podcast
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Season 4
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            The latest season of the Henry Harrison Entrepreneurs, Business & Finance Podcast featuring inspiring conversations with business leaders and innovators.
                        </p>
                    </div>
                </div>
            </section>

            {/* Episodes Grid */}
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
                                            Episode {episodes.length - index}
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

            {/* Other Seasons */}
            <section className="py-16 bg-secondary/30">
                <div className="container px-6">
                    <h2 className="text-2xl font-medium text-foreground mb-8">Other Seasons</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/entrepreneurs-business-and-finance-season-3" className="px-6 py-3 bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                            Season 3
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
