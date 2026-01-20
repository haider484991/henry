"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin, Mail, Clock, Phone, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-hero > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".contact-info-item", {
                scrollTrigger: {
                    trigger: ".contact-info",
                    start: "top 80%",
                },
                x: -40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });

            gsap.from(".contact-form-wrapper", {
                scrollTrigger: {
                    trigger: ".contact-form-wrapper",
                    start: "top 80%",
                },
                x: 40,
                opacity: 0,
                duration: 1,
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
                    <div className="contact-hero max-w-4xl">
                        <p className="text-sm uppercase tracking-widest opacity-70 mb-4">Contact</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                            Have a question, want to discuss business opportunities, or interested in being a guest on the podcast? Reach out and let's connect.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2 className="text-3xl font-medium text-foreground mb-12">
                                Contact Information
                            </h2>
                            <div className="space-y-8">
                                <div className="contact-info-item flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">
                                            Address
                                        </h3>
                                        <p className="text-lg text-foreground">
                                            17290 Preston Road #300 B2
                                            <br />
                                            Dallas, Texas 75252
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">
                                            Email
                                        </h3>
                                        <a href="mailto:info@henryharrison.com" className="text-lg text-foreground hover:text-primary transition-colors">
                                            info@henryharrison.com
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-info-item flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">
                                            Hours
                                        </h3>
                                        <p className="text-lg text-foreground">
                                            Monday - Sunday
                                            <br />
                                            9:00 AM - 5:00 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item pt-4">
                                    <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
                                        Connect
                                    </h3>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://www.linkedin.com/in/henryharrisondallas/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <div className="bg-secondary/50 p-8 md:p-12">
                                <h2 className="text-2xl font-medium text-foreground mb-8">
                                    Send a Message
                                </h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                First Name *
                                            </label>
                                            <Input
                                                className="bg-white border-border"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Last Name *
                                            </label>
                                            <Input
                                                className="bg-white border-border"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Email *
                                        </label>
                                        <Input
                                            type="email"
                                            className="bg-white border-border"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Phone
                                        </label>
                                        <Input
                                            type="tel"
                                            className="bg-white border-border"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Subject
                                        </label>
                                        <Input
                                            className="bg-white border-border"
                                            placeholder="Business Inquiry"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Message *
                                        </label>
                                        <Textarea
                                            className="bg-white border-border min-h-[150px] resize-none"
                                            placeholder="How can Henry help you?"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Send Message
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] bg-secondary">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.7234567890123!2d-96.8019!3d32.9987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c21234567890%3A0x1234567890abcdef!2s17290%20Preston%20Rd%2C%20Dallas%2C%20TX%2075252!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Henry Harrison Office Location"
                />
            </section>
        </div>
    );
}
