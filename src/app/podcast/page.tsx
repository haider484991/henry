"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const seasons = [
    {
        name: "Season 4",
        href: "/season-4",
        episodes: [
            { guest: "Marc Ollivier", slug: "marcolivia", title: "Marc Ollivier" },
            { guest: "Dida Clifton", slug: "dida-clifton-theofficesquad", title: "Dida Clifton - TheOfficeSquad" },
            { guest: "Neeti Khaitan", slug: "neeti-khaitan", title: "Neeti Khaitan" },
            { guest: "Clark Neily", slug: "clark-neily-of-the-cato-institute", title: "Clark Neily of the Cato Institute" },
            { guest: "Dianna Booher", slug: "dianna-booher", title: "Dianna Booher" },
            { guest: "Leise Sandeman", slug: "leise-sandeman", title: "Leise Sandeman" },
            { guest: "James Dickey", slug: "james-dickey", title: "James Dickey" },
            { guest: "Chris Brown & RJ Byrd", slug: "chris-brown-rj-byrd-search-group", title: "Chris Brown & RJ Byrd - Search Group" },
            { guest: "Harry Hunsicker", slug: "harry-hunsicker", title: "Harry Hunsicker" },
            { guest: "Alexandre Teplitxky", slug: "alexandre-teplitxky-smart-pm-technologies", title: "Alexandre Teplitxky - Smart PM Technologies" },
            { guest: "Albert Bou-Fadel", slug: "albert-bou-fadel-with-smartbarrel", title: "Albert Bou-Fadel with SmartBarrel" },
            { guest: "James Poen", slug: "james-poen-richardson-saw-and-lawn-mower", title: "James Poen - Richardson Saw and Lawn Mower" },
            { guest: "Jack Carrere", slug: "henry-harrison-sits-down-with-jack-carrere-of-prokeep", title: "Jack Carrere of Prokeep" },
            { guest: "Chaitanya NK", slug: "chaitanya-nk-ceo-of-track-3d", title: "Chaitanya NK - CEO of Track 3D" },
            { guest: "Glenn Poulos", slug: "glenn-poulos", title: "Glenn Poulos" },
            { guest: "Burt Copeland", slug: "burt-copeland-new-life-cfo", title: "Burt Copeland - New Life CFO" },
            { guest: "Hugh Massie", slug: "hugh-massie-dna-behavior", title: "Hugh Massie - DNA Behavior" },
        ]
    },
    {
        name: "Season 3",
        href: "/entrepreneurs-business-and-finance-season-3",
        episodes: [
            { guest: "Chris McKee", slug: "chris-mckee", title: "Chris McKee - Founder Venturity Financial" },
            { guest: "Don Williams", slug: "don-williams", title: "Don Williams - Don Williams Global" },
            { guest: "Eric Helitzer", slug: "subbase-ceo-eric-helitzer", title: "Eric Helitzer - SubBase CEO" },
            { guest: "Josh Levy", slug: "josh-levy-document-crunch", title: "Josh Levy - Document Crunch" },
            { guest: "Carter Malouf", slug: "private-jeweler-carter-malouf", title: "Carter Malouf - Private Jeweler" },
            { guest: "Tim Goeglein", slug: "henry-harrison-tim-goeglein", title: "Tim Goeglein" },
            { guest: "Don Short", slug: "new-artisan-distillery-don-short", title: "Don Short - New Artisan Distillery" },
            { guest: "John Cornelsen", slug: "john-cornelsen-evolving-texas-indigo-yoga-juggle", title: "John Cornelsen - Evolving Texas & Indigo Yoga" },
            { guest: "Bob Fox", slug: "bob-fox", title: "Bob Fox" },
            { guest: "Jeff Strong", slug: "low-voltage-switchgear-manufacturer-jeff-strong-corr-solutions-electrical", title: "Jeff Strong - Corr Solutions Electrical" },
        ]
    },
    {
        name: "Season 2",
        href: "/henry-harrison-dallas-tx-podcast-season-2",
        episodes: [
            { guest: "David Wang", slug: "dallas-tx-henry-harrison-podcast-s2-ep1-david-wang", title: "David Wang" },
            { guest: "Tom Motlow", slug: "dallas-tx-tom-motlow", title: "Tom Motlow" },
            { guest: "Mitch Allen", slug: "dallas-henry-harrison-shark-tanks-hire-santa-mitch-allen", title: "Shark Tank's Mitch Allen - Hire Santa" },
            { guest: "Karl Chiao", slug: "karl-chiao", title: "Karl Chiao" },
            { guest: "Chloe Smith", slug: "chloe-smith", title: "Chloe Smith - CEO of Mercator AI" },
            { guest: "Liam Coakley", slug: "dallas-henry-harrison-liam-coakley", title: "Liam Coakley" },
            { guest: "James Benham", slug: "dallas-henry-harrison-james-benham", title: "James Benham" },
            { guest: "Steve Dell'Orto", slug: "dallas-henry-harrison-steve-dellorto", title: "Steve Dell'Orto" },
            { guest: "Paul Romness", slug: "advancing-cancer-treatments-paul-romness", title: "Paul Romness - Advancing Cancer Treatments" },
            { guest: "Jeremy Brandt", slug: "real-estate-entrepreneurship-jeremy-brandt", title: "Jeremy Brandt - Real Estate Entrepreneurship" },
            { guest: "Bob McCarthy", slug: "bob-mccarthys-entrepreneurial-journey", title: "Bob McCarthy's Entrepreneurial Journey" },
        ]
    },
    {
        name: "Season 1",
        href: "/podcast",
        episodes: [
            { guest: "Rick Kersey", slug: "henry-harrison-podcast-rick-kersey-episode-01", title: "Rick Kersey - Episode 01" },
            { guest: "Doug Hardwick", slug: "henry-harrison-doug-hardwick-dallas-texas", title: "Doug Hardwick" },
            { guest: "Billy Gee", slug: "henry-harrison-podcast-billy-gee", title: "Billy Gee" },
            { guest: "Jonathon Ringler", slug: "henry-harrison-podcast-jonathon-ringler", title: "Jonathon Ringler" },
            { guest: "Larry Rau", slug: "henry-harrison-podcast-larry-rau", title: "Larry Rau" },
            { guest: "John Voigt", slug: "henry-harrison-dallas-texas-john-voigt", title: "John Voigt" },
            { guest: "Gary Burrows", slug: "henry-harrison-dallas-texas-podcast-gary-burrows", title: "Gary Burrows" },
            { guest: "Wilene Dunn", slug: "dallas-henry-harrison-wilene-dunn", title: "Wilene Dunn" },
            { guest: "Jeff Vernon", slug: "henry-harrison-dallas-jeff-vernon-of-mineral-royalties-group-episode-09", title: "Jeff Vernon - Mineral Royalties Group" },
            { guest: "Alex Vantarakis", slug: "henry-harrison-dallas-podcast-alex-vantarakis-episode-10", title: "Alex Vantarakis" },
            { guest: "Courtland Kilpatrick", slug: "henry-harrison-dallas-tx-courtland-kilpatrick", title: "Courtland Kilpatrick" },
        ]
    },
];

const platforms = [
    { name: "Spotify", href: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" },
    { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" },
    { name: "Amazon", href: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4" },
    { name: "SoundCloud", href: "https://soundcloud.com/henry-harrison-podcast" },
];

export default function PodcastPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".podcast-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".platform-link", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.5,
                ease: "power3.out",
            });

            // Simple hover effect for episode cards - no scroll animation to ensure visibility
            gsap.utils.toArray(".episode-card").forEach((card) => {
                const el = card as HTMLElement;
                el.addEventListener("mouseenter", () => {
                    gsap.to(el, { scale: 1.02, duration: 0.2 });
                });
                el.addEventListener("mouseleave", () => {
                    gsap.to(el, { scale: 1, duration: 0.2 });
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
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
                            {platforms.map((platform, index) => (
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
                <div className="container px-6">
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
                                    Through insightful interviews, thought-provoking discussions, and actionable tips, Season 2 promises to be a resource for aspiring entrepreneurs and seasoned business minds alike. From innovative startups to established entrepreneurs, we&apos;ll uncover the strategies that drive success in today&apos;s competitive landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seasons */}
            {seasons.map((season, seasonIndex) => (
                <section key={season.name} className={`season-${seasonIndex} py-16 md:py-24 ${seasonIndex % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}>
                    <div className="container px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                                {season.name}
                            </h2>
                            {season.href !== "/podcast" && (
                                <Link
                                    href={season.href}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                                >
                                    View Season
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {season.episodes.map((episode, index) => (
                                <Link
                                    key={episode.slug}
                                    href={`/${episode.slug}`}
                                    className="episode-card group block p-6 bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center flex-shrink-0 transition-colors">
                                            <Play className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                                Episode {index + 1}
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
                <div className="container px-6 text-center">
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
