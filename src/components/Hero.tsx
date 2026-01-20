"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance animation
            const tl = gsap.timeline();

            tl.from(".hero-badge", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(".hero-title", {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                }, "-=0.4")
                .from(".hero-subtitle", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.6")
                .from(".hero-description", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.5")
                .from(".hero-cta", {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                }, "-=0.4")
                .from(".hero-stats > *", {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                }, "-=0.3");

            // Parallax effect on scroll
            gsap.to(".hero-bg-video", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Fade out hero content on scroll
            gsap.to(".hero-content", {
                opacity: 0,
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "center center",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Smooth loop with quick crossfade
    useEffect(() => {
        const video = videoRef.current;
        const overlay = overlayRef.current;
        if (!video || !overlay) return;

        video.muted = true;
        video.loop = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }

        // Crossfade at loop point
        let hasFaded = false;
        const handleTimeUpdate = () => {
            const timeLeft = video.duration - video.currentTime;

            if (timeLeft <= 0.4 && !hasFaded) {
                hasFaded = true;
                // Fade overlay in
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.in",
                });
            }

            // Reset after loop
            if (video.currentTime < 0.5 && hasFaded) {
                hasFaded = false;
                // Fade overlay out
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-[#0B3E50]"
        >
            {/* Background Video */}
            <div className="hero-bg-video absolute inset-0 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/henry-harrison.webm" type="video/webm" />
                </video>
                {/* Crossfade overlay for smooth loop */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-[#0B3E50] opacity-0 pointer-events-none"
                />
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B3E50]/90 via-[#0B3E50]/70 to-[#0B3E50]/50" />
            </div>

            <div className="container px-6 py-32 hero-content">
                <div className="max-w-3xl text-white">
                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full mb-8">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs uppercase tracking-widest text-white/80">
                            Dallas, Texas Entrepreneur
                        </span>
                    </div>

                    <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-4">
                        Henry Harrison
                    </h1>
                    <p className="hero-subtitle text-2xl md:text-3xl text-white/70 font-light mb-8">
                        Entrepreneur • Investor • Speaker
                    </p>
                    <p className="hero-description text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
                        A dedicated entrepreneur who has founded and acquired over fifty companies across various sectors. With three decades of innovation in Dallas/Fort Worth, from Private Equity to waste-to-energy and solar technologies, Henry is passionate about making the world a better place through business.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Link
                            href="#about"
                            className="hero-cta link-arrow text-white border-white/50 hover:border-white"
                        >
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="#podcast"
                            className="hero-cta inline-flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Play className="w-4 h-4 ml-0.5" />
                            </div>
                            Watch Podcast
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                        <div>
                            <p className="text-4xl md:text-5xl font-light text-white mb-1">50+</p>
                            <p className="text-sm text-white/50 uppercase tracking-wider">Companies</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-light text-white mb-1">30+</p>
                            <p className="text-sm text-white/50 uppercase tracking-wider">Years Experience</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-light text-white mb-1">EO/YPO</p>
                            <p className="text-sm text-white/50 uppercase tracking-wider">Member</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
        </section>
    );
}
