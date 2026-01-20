"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, GraduationCap, Building2, Users, Leaf, Mic, Award } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".about-hero-content > *", {
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

            gsap.fromTo(".bio-section", {
                y: 60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".bio-section",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            });

            gsap.fromTo(".timeline-item", {
                x: -60,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 75%",
                    once: true,
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            gsap.fromTo(".achievement-card", {
                y: 40,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: ".achievements-section",
                    start: "top 85%",
                    once: true,
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, pageRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="about-hero-content max-w-4xl">
                        <p className="text-sm uppercase tracking-widest opacity-70 mb-4">About</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                            Henry Harrison
                        </h1>
                        <p className="text-xl md:text-2xl opacity-80 leading-relaxed max-w-2xl">
                            A seasoned entrepreneur with over 30 years of experience, from Northern Virginia roots to Dallas, Texas endeavors, spanning diverse industries with a passion for sustainable technologies.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="bio-section py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Image */}
                        <div className="relative">
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src="https://henryharrison.com/wp-content/uploads/2024/06/henry-harrison-dallas-linkedin-profile.png"
                                    alt="Henry Harrison - Dallas Texas Entrepreneur"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 max-w-[200px]">
                                <p className="text-3xl font-light mb-1">30+</p>
                                <p className="text-xs uppercase tracking-wider opacity-70">Years of Experience</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
                                    The Journey
                                </h2>
                                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                    <p>
                                        Henry Harrison of Dallas Texas is a dedicated entrepreneur who has founded and acquired over fifty companies across various sectors.
                                    </p>
                                    <p>
                                        Originally from Northern Virginia/Washington DC, Henry laid the groundwork for his future endeavors with a Bachelor's degree in Economics from Emory University. He later pursued further education, earning a Master's Degree in Business Administration (MBA) from Southern Methodist University (SMU).
                                    </p>
                                    <p>
                                        From starting his first company at age 25 to becoming a successful repeat entrepreneur, Henry's journey is a testament to passion, perseverance, and a keen eye for opportunity. His entrepreneurial spirit led him on a journey that saw him found and acquire over fifty companies, spanning a wide array of industries, from Private Equity to Internet Marketing.
                                    </p>
                                    <p>
                                        Henry has developed a niche in promoting environmentally friendly technologies, especially in the waste-to-energy sector. His expertise in this area allows him to contribute to businesses that seek to reduce environmental impact while maintaining profitability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education & Timeline */}
            <section className="timeline-section py-24 md:py-32 bg-secondary/30">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16 text-center">
                        Education & Career
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="timeline-item flex gap-6">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-foreground mb-2">Emory University</h3>
                                <p className="text-muted-foreground">Bachelor of Arts (BA) in Economics</p>
                            </div>
                        </div>
                        <div className="timeline-item flex gap-6">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-foreground mb-2">Southern Methodist University (SMU)</h3>
                                <p className="text-muted-foreground">Master of Business Administration (MBA)</p>
                            </div>
                        </div>
                        <div className="timeline-item flex gap-6">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-foreground mb-2">First Company at Age 25</h3>
                                <p className="text-muted-foreground">Started entrepreneurial journey in Northern Virginia</p>
                            </div>
                        </div>
                        <div className="timeline-item flex gap-6">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-foreground mb-2">EO Dallas Chapter President</h3>
                                <p className="text-muted-foreground">Member and Past President of the Entrepreneurs Organization Dallas Chapter</p>
                            </div>
                        </div>
                        <div className="timeline-item flex gap-6">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-foreground mb-2">YPO Member</h3>
                                <p className="text-muted-foreground">Active participation in The Young Presidents Organization (YPO)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="achievements-section py-24 md:py-32">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16 text-center">
                        Areas of Expertise
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="achievement-card p-8 bg-secondary/50 hover:bg-secondary transition-colors">
                            <Building2 className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-medium text-foreground mb-3">50+ Companies</h3>
                            <p className="text-muted-foreground">Founded and acquired companies across Private Equity, Internet Marketing, and more.</p>
                        </div>
                        <div className="achievement-card p-8 bg-secondary/50 hover:bg-secondary transition-colors">
                            <Leaf className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-medium text-foreground mb-3">Sustainable Tech</h3>
                            <p className="text-muted-foreground">Specializing in waste-to-energy and solar energy technologies for environmental impact.</p>
                        </div>
                        <div className="achievement-card p-8 bg-secondary/50 hover:bg-secondary transition-colors">
                            <Mic className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-medium text-foreground mb-3">Podcast Host</h3>
                            <p className="text-muted-foreground">Host of the Entrepreneurs, Business & Finance Podcast sharing insights and interviews.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-medium mb-8">
                            Leadership & Impact
                        </h2>
                        <p className="text-lg opacity-80 leading-relaxed mb-8">
                            Beyond his entrepreneurial pursuits, Henry has served as a strategic advisor, notably contributing to a solar energy company with aspirations to revolutionize global solar efficiency. His leadership acumen shines through his roles as a member and past President of the Entrepreneurs Organization (EO) Dallas Chapter and active participation in The Young Presidents Organization (YPO).
                        </p>
                        <p className="text-lg opacity-80 leading-relaxed mb-12">
                            As a professional speaker and certified NLP Master Practitioner, Henry's passion is making the world a better place by starting and growing businesses along with helping other entrepreneurs succeed.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
                        >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
