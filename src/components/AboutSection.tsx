"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building2, Leaf, Users, Mic } from "lucide-react";
import Link from "next/link";

// Register once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
    {
        icon: Mic,
        title: "In-Depth Interviews",
        description: "Conversations with visionary entrepreneurs, CEOs, founders, industry experts, and financial leaders.",
    },
    {
        icon: Building2,
        title: "Real Business Insights",
        description: "Topics covering growth strategies, innovation, fundraising, AI, sales mastery, and financial decision-making.",
    },
    {
        icon: Users,
        title: "Notable Guests",
        description: "From Shark Tank alumni and venture-backed founders to sales legends and senior entrepreneurs.",
    },
    {
        icon: Leaf,
        title: "Available Everywhere",
        description: "Listen on Spotify, Apple Podcasts, YouTube, Amazon, and more major podcast platforms.",
    },
];

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate section header
            gsap.fromTo(".about-header", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".about-header",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            });

            // Animate image with reveal effect
            gsap.fromTo(".about-image", {
                clipPath: "inset(100% 0 0 0)",
            }, {
                scrollTrigger: {
                    trigger: ".about-image",
                    start: "top 80%",
                    once: true,
                },
                clipPath: "inset(0% 0 0 0)",
                duration: 1.2,
                ease: "power3.inOut",
            });

            // Animate bio text
            gsap.fromTo(".about-bio > *", {
                y: 40,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".about-bio",
                    start: "top 80%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Animate highlight cards with stagger
            gsap.fromTo(".highlight-card", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".highlights-grid",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Parallax effect on image
            gsap.to(".about-image img", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-image",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 md:py-40 bg-background overflow-hidden">
            <div className="w-full px-8 md:px-16 lg:px-24">
                {/* Section Header */}
                <div className="about-header max-w-3xl mb-20">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">About</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight mb-6">
                        Entrepreneurs, Business
                        <br />
                        <span className="text-muted-foreground">& Finance Podcast</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
                    {/* Image Side */}
                    <div className="relative about-image-wrapper">
                        <div className="about-image relative overflow-hidden bg-secondary/30" style={{ clipPath: "inset(0)" }}>
                            <img
                                src="/Henry Harrison Dallas Texas (1).png"
                                alt="Henry Harrison - Dallas Texas Entrepreneur"
                                className="w-full h-auto object-contain"
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 max-w-[200px]">
                            <p className="text-3xl font-light mb-1">50+</p>
                            <p className="text-xs uppercase tracking-wider opacity-70">Episodes & Guests</p>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="about-bio space-y-6 lg:pt-12">
                        <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                            The Henry Harrison Entrepreneurs, Business & Finance Podcast is an engaging and insightful show hosted by Dallas, Texas-based entrepreneur Henry Harrison.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            With over 30 years of hands-on experience starting and growing businesses across various industries, Henry brings real-world perspective to every conversation. The podcast serves as a terrific destination for in-depth interviews with visionary entrepreneurs, CEOs, founders, industry experts, and financial leaders.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Episodes dive into the raw realities of building and scaling companies—covering topics like business growth strategies, innovation, resilience through failures and comebacks, fundraising, AI&apos;s role in modern operations, sales mastery, financial decision-making, and the personal side of entrepreneurship.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you&apos;re an aspiring founder, a seasoned executive, or simply passionate about business and finance, you&apos;ll find actionable insights, candid stories, and motivational lessons from guests who have been there—from Shark Tank alumni and venture-backed founders to sales legends and senior entrepreneurs.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Join Henry Harrison from Dallas/Plano, Texas, as he uncovers the strategies, challenges, and triumphs shaping today&apos;s business landscape. Subscribe now for your regular dose of real entrepreneurial talk!
                        </p>
                        <Link
                            href="/podcast"
                            className="link-arrow text-foreground border-foreground/30 hover:border-foreground inline-flex"
                        >
                            Browse Episodes
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Highlights Grid */}
                <div className="highlights-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="highlight-card group p-8 bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                        >
                            <item.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                            <h3 className="text-lg font-medium text-foreground mb-3">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
