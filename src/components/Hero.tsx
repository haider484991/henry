"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

// Register once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            // Silk flow animation for background blobs
            gsap.to(".silk-blob-1", {
                x: 100,
                y: 50,
                scale: 1.1,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".silk-blob-2", {
                x: -80,
                y: -40,
                scale: 0.9,
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".silk-blob-3", {
                x: 60,
                y: -30,
                scale: 1.05,
                duration: 18,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Staggered entrance animation
            const tl = gsap.timeline({ delay: 0.3 });

            tl.fromTo(".hero-line", {
                width: 0,
            }, {
                width: "6rem",
                duration: 1.2,
                ease: "power4.inOut",
            })
                .fromTo(".hero-badge", {
                    y: 20,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.6")
                .fromTo(".hero-title-line", {
                    y: 100,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                }, "-=0.4")
                .fromTo(".hero-subtitle", {
                    y: 30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.5")
                .fromTo(".hero-description", {
                    y: 30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.4")
                .fromTo(".hero-cta", {
                    y: 20,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                }, "-=0.3")
                .fromTo(".hero-stat", {
                    y: 30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                }, "-=0.2")
                .fromTo(".scroll-indicator", {
                    opacity: 0,
                    y: -20,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.2");

            // Parallax effect on scroll
            gsap.to(".hero-bg-video", {
                yPercent: 20,
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
                y: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "40% top",
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
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.in",
                });
            }

            if (video.currentTime < 0.5 && hasFaded) {
                hasFaded = false;
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
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                >
                    <source src="/henry-harrison.webm" type="video/webm" />
                </video>
                {/* Crossfade overlay for smooth loop */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-[#0B3E50] opacity-0 pointer-events-none"
                />
            </div>

            {/* Silk Gradient Overlay */}
            <div className="absolute inset-0">
                {/* Main gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B3E50]/95 via-[#0B3E50]/80 to-[#0B3E50]/60" />

                {/* Silk flowing blobs */}
                <div className="silk-blob-1 absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl" />
                <div className="silk-blob-2 absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-400/10 via-cyan-400/5 to-transparent blur-3xl" />
                <div className="silk-blob-3 absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-teal-400/10 via-emerald-400/5 to-transparent blur-3xl" />

                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }} />
            </div>

            {/* Content */}
            <div className="w-full px-8 md:px-16 lg:px-24 py-32 hero-content relative z-10">
                <div className="max-w-5xl text-white">
                    {/* Decorative line */}
                    <div className="hero-line h-[1px] w-24 bg-gradient-to-r from-white/60 to-transparent mb-10" />

                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-3 mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
                            Dallas, Texas Entrepreneur
                        </span>
                    </div>

                    {/* Title with overflow hidden for animation */}
                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-title-line text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight">
                            Henry
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <h1 className="hero-title-line text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white/80">
                            Harrison
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-xl md:text-2xl text-white/50 font-light tracking-wide mb-8">
                        Entrepreneur <span className="text-white/30 mx-3">—</span> Investor <span className="text-white/30 mx-3">—</span> Speaker
                    </p>

                    {/* Description */}
                    <p className="hero-description text-base md:text-lg text-white/40 leading-relaxed mb-14 max-w-2xl">
                        A dedicated entrepreneur who has founded and acquired over fifty companies across various sectors. With three decades of innovation in Dallas/Fort Worth, Henry is passionate about making the world a better place through business.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-start gap-6 mb-20">
                        <Link
                            href="#about"
                            className="hero-cta group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0B3E50] font-medium overflow-hidden transition-all hover:gap-4"
                        >
                            <span className="relative z-10">Learn More</span>
                            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white to-white/90 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="#podcast"
                            className="hero-cta group inline-flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                        >
                            <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-white/40 transition-all">
                                <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                                <Play className="w-5 h-5 ml-1 relative z-10" />
                            </div>
                            <span className="text-sm font-medium tracking-wide">Watch Podcast</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-12 md:gap-16 pt-10 border-t border-white/10">
                        <div className="hero-stat">
                            <p className="text-5xl md:text-6xl font-light text-white tracking-tight mb-2">50<span className="text-white/40">+</span></p>
                            <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Companies</p>
                        </div>
                        <div className="hero-stat">
                            <p className="text-5xl md:text-6xl font-light text-white tracking-tight mb-2">30<span className="text-white/40">+</span></p>
                            <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Years</p>
                        </div>
                        <div className="hero-stat">
                            <p className="text-5xl md:text-6xl font-light text-white tracking-tight mb-2">EO</p>
                            <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Member</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
                <div className="relative w-[1px] h-16">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                    <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-white/60 to-transparent animate-scroll-line" />
                </div>
            </div>

        </section>
    );
}
