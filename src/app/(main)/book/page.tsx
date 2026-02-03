"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { Mic, FileText } from "lucide-react";

export default function BookPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".booking-hero > *", {
                y: 60,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.fromTo(".calendly-section", {
                y: 40,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.5,
                ease: "power3.out",
            });

            gsap.fromTo(".disclaimer-section", {
                y: 40,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.7,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    // Load Calendly script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="booking-hero max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Mic className="w-8 h-8" />
                            <p className="text-sm uppercase tracking-widest opacity-70">Podcast Guest Booking</p>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Be a Guest on the Podcast
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Schedule your appearance on the Entrepreneurs, Business & Finance Podcast with Henry Harrison. Share your story, insights, and expertise with our audience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calendly Section */}
            <section className="calendly-section py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-medium text-foreground mb-8 text-center">
                            Select a Time
                        </h2>
                        <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                            <div
                                className="calendly-inline-widget"
                                data-url="https://calendly.com/podcast-henryharrison/henry-harrison-podcast"
                                style={{ minWidth: "320px", height: "700px" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="disclaimer-section py-16 md:py-24 bg-secondary/30">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <FileText className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-medium text-foreground">
                                Guest Release & Disclaimer
                            </h2>
                        </div>

                        <div className="bg-white border border-border rounded-lg p-8 md:p-12">
                            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
                                <p>
                                    The undersigned guest (&quot;Guest&quot;) hereby irrevocably consents to the recording and distribution of the Guest&apos;s voice, likeness, image, and performance as part of the media program known as the Entrepreneurs, Business & Finance Podcast, hosted by Henry Harrison (the &quot;Program&quot;). Guest acknowledges and agrees that Henry Harrison and his affiliated entities are the sole owners of all rights, title, and interest in and to the Program and all recordings thereof, including video, audio, transcripts, show notes, promotional materials, graphics, and all derivative works (collectively, the &quot;Materials&quot;). Guest understands that the Program and Materials constitute &quot;works made for hire&quot; under U.S. copyright law (17 U.S.C. &sect;101 et seq.), and that Henry Harrison shall have the exclusive, worldwide, perpetual, royalty-free right to use, reproduce, distribute, publish, display, license, edit, adapt, modify, promote, or otherwise exploit the Program and all Materials in any and all media now known or hereafter devised.
                                </p>

                                <p>
                                    Guest agrees that any and all Materials created in connection with the Program become the exclusive property of Henry Harrison and the Entrepreneurs, Business & Finance Podcast, and that Henry Harrison shall have the sole and unrestricted right to use or not use the Guest&apos;s performance, appearance, or likeness in any manner and for any purpose, without further consent.
                                </p>

                                <p>
                                    Nothing in this Guest Release shall be interpreted as an obligation for Henry Harrison or the Program to use, publish, distribute, or exploit any recording or Material. The Producer retains full discretion regarding editing, publishing, or choosing not to publish a guest&apos;s episode.
                                </p>

                                <p>
                                    Guest understands and agrees that no compensation of any kind shall be provided for participation in the Program, and no payment is owed for the use or distribution of the Program or Materials.
                                </p>

                                <p>
                                    Guest acknowledges that their name, likeness, statements, and biographical information may be used in advertising, marketing, or promotional content related to the Program, provided such usage does not constitute an endorsement of any product or service unless expressly agreed to in writing.
                                </p>

                                <p>
                                    Guest hereby releases, discharges, and holds harmless Henry Harrison, the Entrepreneurs, Business & Finance Podcast, and all associated entities, employees, contractors, assigns, and representatives from any and all claims, demands, causes of action, or liability of any kind — including but not limited to claims related to editing, production, reproduction, distribution, publication, misstatements, errors, omissions, or any perceived reputational, professional, or personal impact resulting from participation in the Program.
                                </p>

                                <p>
                                    Guest affirms that they are fully authorized to participate in the Program, that all statements made during the interview are truthful to the best of their knowledge, and that their participation does not violate any confidentiality obligations or contractual restrictions.
                                </p>

                                <p className="text-xs text-muted-foreground/70 pt-6 border-t border-border mt-8">
                                    By scheduling a booking through this page, you acknowledge that you have read, understood, and agree to the terms outlined in this Guest Release & Disclaimer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
