"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X, ArrowRight, Play, Headphones, ChevronRight, Building2, Leaf, Mic, Calendar, MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { getSeasons, getEpisodes } from "@/lib/actions";

// Featured news for mega menu
const featuredNews = [
    {
        slug: "dallas-black-chamber-of-commerce-grants-minority",
        title: "Dallas Black Chamber Distributes $30K in Grants",
        image: "/images/news/dbcc-minority-grants.jpg",
        category: "Texas News",
        date: "Jul 2, 2024",
    },
    {
        slug: "dallas-fort-worth-commercial-real-estate-2024",
        title: "DFW Dominates Commercial Real Estate in 2024",
        image: "/images/news/dallas-fort-worth-commercial-real-estate.jpg",
        category: "Real Estate",
        date: "Jun 26, 2024",
    },
    {
        slug: "celina-texas-americas-fastest-growing-city",
        title: "Celina: America's Fastest-Growing City",
        image: "/images/news/celina-texas-fastest-growing.jpg",
        category: "Growth",
        date: "Jun 18, 2024",
    },
];

interface Episode {
    id: string;
    slug: string;
    guest: string;
    season: number;
    episode: number;
}

interface Season {
    id: string;
    number: number;
    title: string;
    published: boolean;
}

const podcastPlatforms = [
    { name: "Spotify", href: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" },
    { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" },
    { name: "Amazon", href: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([]);
    const navRef = useRef<HTMLElement>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    // Fetch seasons and episodes
    useEffect(() => {
        async function loadData() {
            const [seasonsData, episodesData] = await Promise.all([
                getSeasons(),
                getEpisodes()
            ]);
            setSeasons(seasonsData.filter((s: Season) => s.published));
            // Get latest 3 episodes
            setLatestEpisodes(episodesData.slice(0, 3));
        }
        loadData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP entrance animation
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".nav-item", {
                y: -20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3,
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    // Animate mega menu
    useEffect(() => {
        if (activeMegaMenu && megaMenuRef.current) {
            gsap.fromTo(megaMenuRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(".mega-menu-item",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.1 }
            );
        }
    }, [activeMegaMenu]);

    const handleMouseEnter = (menuName: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMegaMenu(menuName);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMegaMenu(null);
        }, 150);
    };

    const closeMenus = () => {
        setActiveMegaMenu(null);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/", hasMegaMenu: false },
        { name: "About", href: "/about", hasMegaMenu: true },
        { name: "Podcast", href: "/podcast", hasMegaMenu: true },
        { name: "News", href: "/news", hasMegaMenu: true },
        { name: "Contact", href: "/contact", hasMegaMenu: false },
    ];

    return (
        <nav
            ref={navRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/98 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="w-full px-8 md:px-16 lg:px-24 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className={cn(
                        "nav-item flex items-center gap-3 text-lg font-semibold transition-colors",
                        isScrolled ? "text-primary" : "text-white"
                    )}
                    onClick={closeMenus}
                >
                    <div className={cn(
                        "w-10 h-10 flex items-center justify-center border-2 rounded-sm transition-colors",
                        isScrolled ? "border-primary" : "border-white"
                    )}>
                        <span className="text-sm font-bold">HH</span>
                    </div>
                    <span className="hidden sm:inline uppercase tracking-[0.2em] text-xs font-medium">
                        Henry Harrison
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => link.hasMegaMenu && handleMouseEnter(link.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    "nav-item text-sm font-medium transition-colors relative group uppercase tracking-wider py-2 inline-flex items-center gap-1",
                                    isScrolled
                                        ? "text-foreground/80 hover:text-foreground"
                                        : "text-white/80 hover:text-white",
                                    activeMegaMenu === link.name && "text-foreground"
                                )}
                                onClick={closeMenus}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full",
                                    isScrolled ? "bg-primary" : "bg-white",
                                    activeMegaMenu === link.name && "w-full"
                                )} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="/book"
                    className={cn(
                        "nav-item hidden lg:inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 hover:gap-3",
                        isScrolled
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-white text-primary hover:bg-white/90"
                    )}
                    onClick={closeMenus}
                >
                    Book a Meeting
                    <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "lg:hidden p-2",
                        isScrolled ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mega Menu */}
            {activeMegaMenu && (
                <div
                    ref={megaMenuRef}
                    className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100"
                    onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* About Mega Menu */}
                    {activeMegaMenu === "About" && (
                        <div className="w-full px-8 md:px-16 lg:px-24 py-12">
                            <div className="grid grid-cols-12 gap-12">
                                {/* Main About Section */}
                                <div className="col-span-5 mega-menu-item">
                                    <div className="flex gap-8">
                                        <div className="w-48 h-60 relative overflow-hidden flex-shrink-0">
                                            <Image
                                                src="https://henryharrison.com/wp-content/uploads/2024/06/henry-harrison-dallas-linkedin-profile.png"
                                                alt="Henry Harrison"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-medium text-foreground mb-3">Henry Harrison</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                                A seasoned Dallas entrepreneur with 30+ years experience, founder of 50+ companies across Private Equity, sustainable tech, and more.
                                            </p>
                                            <Link
                                                href="/about"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                                                onClick={closeMenus}
                                            >
                                                Full Biography
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Expertise */}
                                <div className="col-span-4 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Areas of Expertise</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-foreground">50+ Companies</h5>
                                                <p className="text-sm text-muted-foreground">Private Equity & Business</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Leaf className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-foreground">Sustainable Tech</h5>
                                                <p className="text-sm text-muted-foreground">Solar & Waste-to-Energy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Mic className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-foreground">Speaker & Host</h5>
                                                <p className="text-sm text-muted-foreground">NLP Master Practitioner</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="col-span-3 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Get in Touch</h4>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-sm">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span className="text-muted-foreground">Dallas, Texas</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail className="w-4 h-4 text-primary" />
                                            <span className="text-muted-foreground">info@henryharrison.com</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                                        onClick={closeMenus}
                                    >
                                        Contact
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Podcast Mega Menu */}
                    {activeMegaMenu === "Podcast" && (
                        <div className="w-full px-8 md:px-16 lg:px-24 py-12">
                            <div className="grid grid-cols-12 gap-12">
                                {/* Featured Episodes */}
                                <div className="col-span-5 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Latest Episodes</h4>
                                    <div className="space-y-4">
                                        {latestEpisodes.map((ep) => (
                                            <Link
                                                key={ep.slug}
                                                href={`/podcast/${ep.slug}`}
                                                className="flex items-center gap-4 p-3 -mx-3 hover:bg-gray-50 transition-colors group"
                                                onClick={closeMenus}
                                            >
                                                <div className="w-14 h-14 bg-primary text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                                    <Play className="w-6 h-6 ml-0.5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-primary font-medium mb-1">S{ep.season} E{ep.episode}</p>
                                                    <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">{ep.guest}</h5>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/podcast"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all mt-6"
                                        onClick={closeMenus}
                                    >
                                        View All Episodes
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Seasons */}
                                <div className="col-span-3 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Browse Seasons</h4>
                                    <div className="space-y-1">
                                        {seasons
                                            .sort((a, b) => b.number - a.number)
                                            .map((season) => (
                                            <Link
                                                key={season.id}
                                                href={`/podcast?season=${season.number}`}
                                                className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 -mx-3 px-3 transition-colors group"
                                                onClick={closeMenus}
                                            >
                                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{season.title || `Season ${season.number}`}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Listen On */}
                                <div className="col-span-4 mega-menu-item">
                                    <div className="bg-primary p-8 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Headphones className="w-8 h-8 text-white" />
                                            <div>
                                                <h4 className="text-white font-medium">Entrepreneurs, Business</h4>
                                                <p className="text-white/70 text-sm">& Finance Podcast</p>
                                            </div>
                                        </div>
                                        <p className="text-white/80 text-sm mb-6 leading-relaxed">
                                            Insightful conversations with entrepreneurs, business leaders, and finance experts from Dallas and beyond.
                                        </p>
                                        <div className="space-y-2">
                                            {podcastPlatforms.map((platform) => (
                                                <a
                                                    key={platform.name}
                                                    href={platform.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                                                    onClick={closeMenus}
                                                >
                                                    {platform.name}
                                                    <ChevronRight className="w-4 h-4" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* News Mega Menu */}
                    {activeMegaMenu === "News" && (
                        <div className="w-full px-8 md:px-16 lg:px-24 py-12">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Featured News */}
                                <div className="col-span-9 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Latest News</h4>
                                    <div className="grid grid-cols-3 gap-6">
                                        {featuredNews.map((news) => (
                                            <Link
                                                key={news.slug}
                                                href={`/${news.slug}`}
                                                className="group"
                                                onClick={closeMenus}
                                            >
                                                <div className="aspect-[16/10] bg-gray-100 mb-4 overflow-hidden relative">
                                                    <Image
                                                        src={news.image}
                                                        alt={news.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-medium text-primary">{news.category}</span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {news.date}
                                                    </span>
                                                </div>
                                                <h5 className="font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                                                    {news.title}
                                                </h5>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories & CTA */}
                                <div className="col-span-3 mega-menu-item">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Categories</h4>
                                    <div className="space-y-1 mb-8">
                                        {[
                                            { name: "All News", href: "/news" },
                                            { name: "Texas News", href: "/news" },
                                            { name: "Henry Harrison", href: "/news" },
                                            { name: "Real Estate", href: "/news" },
                                            { name: "Business", href: "/news" },
                                        ].map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.href}
                                                className="flex items-center justify-between py-2 hover:text-primary transition-colors group"
                                                onClick={closeMenus}
                                            >
                                                <span className="text-sm font-medium">{cat.name}</span>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-6">
                                        <h5 className="font-medium text-foreground mb-2">Stay Updated</h5>
                                        <p className="text-sm text-muted-foreground mb-4">Get the latest news and insights from Henry Harrison.</p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                                            onClick={closeMenus}
                                        >
                                            Subscribe
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-2xl border-t max-h-[80vh] overflow-y-auto">
                    <div className="p-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center justify-between text-lg font-medium text-foreground py-4 border-b border-gray-100"
                                onClick={closeMenus}
                            >
                                {link.name}
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </Link>
                        ))}

                        {/* Mobile Podcast Platforms */}
                        <div className="mt-8 mb-6">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Listen to Podcast</h4>
                            <div className="flex flex-wrap gap-2">
                                {podcastPlatforms.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors"
                                        onClick={closeMenus}
                                    >
                                        {platform.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/book"
                            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary text-white font-medium"
                            onClick={closeMenus}
                        >
                            Book a Meeting
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
