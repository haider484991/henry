"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Mic, FileText, ShieldCheck } from "lucide-react";

export default function BookPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

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
        }, pageRef);

        return () => ctx.revert();
    }, []);

    // Load Calendly script only after disclaimer is accepted
    useEffect(() => {
        if (!disclaimerAccepted) return;

        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [disclaimerAccepted]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (!disclaimerAccepted) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [disclaimerAccepted]);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Disclaimer Modal */}
            {!disclaimerAccepted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Guest Release & Disclaimer
                                    </h2>
                                    <p className="text-sm text-muted-foreground">Effective: February 6, 2026</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                Please read and accept the following disclaimer before scheduling your podcast appearance.
                            </p>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="px-6 py-5 overflow-y-auto flex-1 text-sm text-muted-foreground space-y-4">
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
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-5 border-t border-border flex-shrink-0 bg-secondary/20 rounded-b-2xl">
                            <p className="text-xs text-muted-foreground mb-4">
                                This disclaimer became effective in its current form on February 6, 2026. By clicking &quot;I Accept&quot; below, you acknowledge that you have read, understood, and agree to the terms outlined in this Guest Release & Disclaimer.
                            </p>
                            <button
                                onClick={() => setDisclaimerAccepted(true)}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                                <ShieldCheck className="w-5 h-5" />
                                I Accept the Guest Release & Disclaimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            {disclaimerAccepted ? (
                                <div
                                    className="calendly-inline-widget"
                                    data-url="https://calendly.com/podcast-henryharrison/henry-harrison-podcast"
                                    style={{ minWidth: "320px", height: "700px" }}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 px-8 text-center" style={{ minHeight: "400px" }}>
                                    <ShieldCheck className="w-12 h-12 text-muted-foreground/40 mb-4" />
                                    <p className="text-lg font-medium text-muted-foreground mb-2">
                                        Disclaimer Acceptance Required
                                    </p>
                                    <p className="text-sm text-muted-foreground/70 max-w-md">
                                        Please accept the Guest Release & Disclaimer to access the scheduling calendar.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
