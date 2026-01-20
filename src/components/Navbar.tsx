"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".nav-item", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3,
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Podcast", href: "/podcast" },
        { name: "News", href: "/news" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            ref={navRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-sm shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className={cn(
                        "nav-item flex items-center gap-3 text-lg font-semibold transition-colors",
                        isScrolled ? "text-primary" : "text-white"
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 flex items-center justify-center border-2 rounded-sm",
                        isScrolled ? "border-primary" : "border-white"
                    )}>
                        <span className="text-sm font-bold">HH</span>
                    </div>
                    <span className="hidden sm:inline uppercase tracking-[0.2em] text-xs font-medium">
                        Henry Harrison
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "nav-item text-sm font-medium transition-colors relative group uppercase tracking-wider",
                                isScrolled
                                    ? "text-foreground/80 hover:text-foreground"
                                    : "text-white/80 hover:text-white"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute left-0 bottom-[-4px] w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                                isScrolled ? "bg-foreground" : "bg-white"
                            )} />
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="/book"
                    className={cn(
                        "nav-item hidden md:inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 uppercase tracking-wider",
                        isScrolled
                            ? "text-foreground"
                            : "text-white"
                    )}
                >
                    Book a Meeting
                    <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2",
                        isScrolled ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white absolute top-full left-0 w-full p-6 flex flex-col gap-4 border-b shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-foreground py-2 border-b border-border"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/book"
                        className="inline-flex items-center gap-2 text-foreground font-medium mt-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book a Meeting
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </nav>
    );
}
