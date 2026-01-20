"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building2, Leaf, Users, Mic } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        icon: Building2,
        title: "50+ Companies",
        description: "Founded and acquired across Private Equity, Internet Marketing, waste-to-energy, and solar energy sectors.",
    },
    {
        icon: Users,
        title: "EO Past President",
        description: "Past President of EO Dallas Chapter and active member of The Young Presidents Organization (YPO).",
    },
    {
        icon: Leaf,
        title: "Sustainable Tech",
        description: "Niche expertise in environmentally friendly technologies, especially waste-to-energy and solar energy.",
    },
    {
        icon: Mic,
        title: "Speaker & Host",
        description: "Professional speaker, NLP Master Practitioner, and host of the Entrepreneurs, Business & Finance Podcast.",
    },
];

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
            gsap.from(".about-header", {
                scrollTrigger: {
                    trigger: ".about-header",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Animate image with reveal effect
            gsap.from(".about-image", {
                scrollTrigger: {
                    trigger: ".about-image",
                    start: "top 75%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                clipPath: "inset(100% 0 0 0)",
                duration: 1.2,
                ease: "power3.inOut",
            });

            // Animate image overlay
            gsap.from(".about-image-overlay", {
                scrollTrigger: {
                    trigger: ".about-image",
                    start: "top 75%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                scaleX: 1,
                duration: 1.2,
                ease: "power3.inOut",
            });

            // Animate bio text
            gsap.from(".about-bio > *", {
                scrollTrigger: {
                    trigger: ".about-bio",
                    start: "top 75%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Animate highlight cards with stagger
            gsap.from(".highlight-card", {
                scrollTrigger: {
                    trigger: ".highlights-grid",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
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

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 md:py-40 bg-background overflow-hidden">
            <div className="w-full px-8 md:px-16 lg:px-24">
                {/* Section Header */}
                <div className="about-header max-w-3xl mb-20">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">About</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight mb-6">
                        A Seasoned Entrepreneur
                        <br />
                        <span className="text-muted-foreground">with Northern Virginia Roots</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
                    {/* Image Side */}
                    <div className="relative about-image-wrapper">
                        <div className="about-image relative aspect-[4/5] overflow-hidden" style={{ clipPath: "inset(0)" }}>
                            <img
                                src="https://henryharrison.com/wp-content/uploads/2024/06/henry-harrison-dallas-linkedin-profile.png"
                                alt="Henry Harrison - Dallas Texas Entrepreneur"
                                className="w-full h-full object-cover scale-110"
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 max-w-[200px]">
                            <p className="text-3xl font-light mb-1">30+</p>
                            <p className="text-xs uppercase tracking-wider opacity-70">Years of Experience</p>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="about-bio space-y-6 lg:pt-12">
                        <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                            Henry Harrison of Dallas Texas is a dedicated entrepreneur who has founded and acquired over fifty companies across various sectors.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Originally from Northern Virginia/Washington DC, Henry laid the groundwork for his future endeavors with a Bachelor's degree in Economics from Emory University and later earned his MBA from Southern Methodist University (SMU).
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            From starting his first company at age 25 to becoming a successful repeat entrepreneur, Henry's journey spans three decades of innovation in the Dallas/Fort Worth area. His entrepreneurial spirit led him to found and acquire companies spanning industries from Private Equity to Internet Marketing.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Henry has developed a niche in promoting environmentally friendly technologies, especially in the waste-to-energy and solar energy sectors. His leadership extends to serving as a member and past President of the Entrepreneurs Organization (EO) Dallas Chapter and active participation in The Young Presidents Organization (YPO).
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            As a professional speaker and certified NLP Master Practitioner, Henry's passion is making the world a better place by starting and growing businesses along with helping other entrepreneurs succeed.
                        </p>
                        <Link
                            href="#contact"
                            className="link-arrow text-foreground border-foreground/30 hover:border-foreground inline-flex"
                        >
                            Get in touch
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
