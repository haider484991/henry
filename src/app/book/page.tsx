"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".book-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".booking-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="book-hero max-w-4xl">
                        <p className="text-sm uppercase tracking-widest opacity-70 mb-4">Book a Meeting</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Schedule Time with Henry
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Whether you're looking to discuss business opportunities, seek entrepreneurial advice, or explore collaboration, Henry is available to connect.
                        </p>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section className="py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="booking-card grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Info */}
                            <div>
                                <h2 className="text-3xl font-medium text-foreground mb-6">
                                    What to Expect
                                </h2>
                                <div className="space-y-6 text-muted-foreground">
                                    <p>
                                        Henry Harrison welcomes conversations with entrepreneurs, business leaders, and those passionate about making a positive impact through business.
                                    </p>
                                    <p>
                                        Topics can include:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Entrepreneurship and business strategy</li>
                                        <li>Sustainable technologies and green energy</li>
                                        <li>Private equity and investment opportunities</li>
                                        <li>Podcast guest opportunities</li>
                                        <li>Mentorship and business coaching</li>
                                    </ul>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-medium text-foreground">30-60 minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Availability</p>
                                            <p className="font-medium text-foreground">Monday - Sunday, 9 AM - 5 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking CTA */}
                            <div className="bg-secondary/50 p-8 md:p-12">
                                <h3 className="text-2xl font-medium text-foreground mb-4">
                                    Ready to Connect?
                                </h3>
                                <p className="text-muted-foreground mb-8">
                                    Fill out the contact form to request a meeting. Henry or his team will get back to you to schedule a time that works.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors w-full justify-center"
                                >
                                    Request a Meeting
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <div className="mt-8 pt-8 border-t border-border">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Prefer to reach out directly?
                                    </p>
                                    <a
                                        href="mailto:info@henryharrison.com"
                                        className="text-primary hover:underline"
                                    >
                                        info@henryharrison.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
