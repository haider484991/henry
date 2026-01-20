"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin, Mail, Clock, Linkedin, Twitter } from "lucide-react";

// Register once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function ContactForm() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate left side content
            gsap.fromTo(".contact-info > *", {
                x: -60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".contact-info",
                    start: "top 80%",
                    once: true,
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Animate form
            gsap.fromTo(".contact-form", {
                x: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".contact-form",
                    start: "top 80%",
                    once: true,
                },
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            });

            // Animate form fields individually
            gsap.fromTo(".form-field", {
                y: 30,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".contact-form",
                    start: "top 75%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.3,
                ease: "power3.out",
            });

            // Background pattern animation
            gsap.to(".contact-pattern", {
                backgroundPosition: "100% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
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
        <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 bg-[#0B3E50] text-white overflow-hidden">
            {/* Background Pattern */}
            <div
                className="contact-pattern absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundPosition: "0% 0%",
                }}
            />

            <div className="w-full px-8 md:px-16 lg:px-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Side - Info */}
                    <div className="contact-info">
                        <p className="text-sm uppercase tracking-widest text-white/50 mb-4">Get in Touch</p>
                        <h2 className="text-4xl md:text-5xl font-medium mb-8">
                            Let's Start a
                            <br />
                            Conversation
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
                            Have a question, want to discuss business opportunities, or interested in being a guest on the podcast? Reach out and let's connect.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-medium uppercase tracking-widest mb-2 text-white/50">
                                        Location
                                    </h3>
                                    <p className="text-lg">
                                        17290 Preston Road #300 B2
                                        <br />
                                        Dallas, Texas 75252
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-medium uppercase tracking-widest mb-2 text-white/50">
                                        Email
                                    </h3>
                                    <a href="mailto:info@henryharrison.com" className="text-lg hover:text-white/80 transition-colors">
                                        info@henryharrison.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-medium uppercase tracking-widest mb-2 text-white/50">
                                        Hours
                                    </h3>
                                    <p className="text-lg">
                                        Monday - Sunday
                                        <br />
                                        9:00 AM - 5:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-xs font-medium uppercase tracking-widest mb-4 text-white/50">
                                    Connect
                                </h3>
                                <div className="flex gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/henryharrisondallas/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="contact-form">
                        <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12">
                            <form className="space-y-8">
                                <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-widest text-white/50">
                                            First Name
                                        </label>
                                        <Input
                                            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-lg py-3 text-white placeholder:text-white/30"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-widest text-white/50">
                                            Last Name
                                        </label>
                                        <Input
                                            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-lg py-3 text-white placeholder:text-white/30"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="form-field space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-widest text-white/50">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-lg py-3 text-white placeholder:text-white/30"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-field space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-widest text-white/50">
                                        Subject
                                    </label>
                                    <Input
                                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-lg py-3 text-white placeholder:text-white/30"
                                        placeholder="Business Inquiry"
                                    />
                                </div>

                                <div className="form-field space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-widest text-white/50">
                                        Message
                                    </label>
                                    <Textarea
                                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-lg py-3 min-h-[120px] text-white resize-none placeholder:text-white/30"
                                        placeholder="How can Henry help you?"
                                    />
                                </div>

                                <div className="form-field pt-4">
                                    <button
                                        type="submit"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0B3E50] font-medium hover:bg-white/90 transition-all duration-300"
                                    >
                                        Send Message
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
