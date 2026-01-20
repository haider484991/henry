"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Twitter, Youtube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate footer columns
            gsap.from(".footer-col", {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Animate bottom bar
            gsap.from(".footer-bottom", {
                scrollTrigger: {
                    trigger: ".footer-bottom",
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
            });

            // Animate divider line
            gsap.from(".footer-divider", {
                scrollTrigger: {
                    trigger: ".footer-divider",
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                },
                scaleX: 0,
                duration: 1,
                ease: "power3.inOut",
                transformOrigin: "left center",
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#001C25] text-white py-24">
            <div className="w-full px-8 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Logo & Description */}
                    <div className="footer-col lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 flex items-center justify-center border-2 border-white rounded-sm">
                                <span className="text-sm font-bold">HH</span>
                            </div>
                            <span className="uppercase tracking-[0.2em] text-xs font-medium">
                                Henry Harrison
                            </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
                            Dallas, Texas entrepreneur with over 30 years of experience building businesses and helping entrepreneurs succeed. Passionate about sustainable technologies.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/henryharrisondallas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/20 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border border-white/20 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://henryharrison.com/podcast/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/20 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="footer-col">
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6 text-white/40">
                            Menu
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Home
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    About
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    News
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Contact
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/podcast" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Podcasts
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Terms */}
                    <div className="footer-col">
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6 text-white/40">
                            Terms
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Privacy / Cookie
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/user-agreement" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    User Agreement
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Disclaimer
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/dmca" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    DMCA
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/acceptable-use" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Acceptable Use
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Podcast */}
                    <div className="footer-col">
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6 text-white/40">
                            Podcast
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/podcast" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    All Episodes
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/season-4" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Season 4
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/entrepreneurs-business-and-finance-season-3" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Season 3
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/henry-harrison-dallas-tx-podcast-season-2" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    Season 2
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div className="footer-col">
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6 text-white/40">
                            Location
                        </h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li>17290 Preston Road #300 B2</li>
                            <li>Dallas, Texas 75252</li>
                            <li className="pt-2">
                                <span className="text-white/40 text-xs block mb-1">Phone</span>
                                <a href="tel:+14693745934" className="hover:text-white transition-colors">
                                    (469) 374-5934
                                </a>
                            </li>
                            <li className="pt-2">
                                <span className="text-white/40 text-xs block mb-1">Email</span>
                                <a href="mailto:podcast@henryharrison.com" className="hover:text-white transition-colors">
                                    podcast@henryharrison.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider h-[1px] bg-white/10 mb-8" />

                {/* Bottom Bar */}
                <div className="footer-bottom flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
                    <p>&copy; {new Date().getFullYear()} Henry Harrison. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
