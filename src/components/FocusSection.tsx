"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Wealth Management",
        description: "Comprehensive wealth management strategies tailored to your unique financial goals. We help you grow, protect, and transfer your wealth effectively.",
    },
    {
        title: "Investment Advisory",
        description: "Expert investment guidance to help you navigate market complexities and build a portfolio that aligns with your risk tolerance and objectives.",
    },
    {
        title: "Retirement Planning",
        description: "Strategic retirement planning to ensure you can maintain your lifestyle and achieve your goals throughout your retirement years.",
    },
    {
        title: "Estate Planning",
        description: "Thoughtful estate planning solutions to protect your legacy and ensure your assets are distributed according to your wishes.",
    },
];

export function FocusSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress within the section
            const scrollProgress = Math.max(0, Math.min(1,
                (viewportHeight - sectionTop) / (sectionHeight + viewportHeight)
            ));

            // Map progress to service index
            const newIndex = Math.min(
                services.length - 1,
                Math.floor(scrollProgress * services.length * 1.5)
            );

            setActiveIndex(newIndex);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
            <div className="container px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-muted-foreground leading-relaxed">
                        We offer a wide range of financial services to meet your unique needs. Our expertise ensures that every aspect of your financial life is managed with care and precision.
                    </p>
                </div>

                {/* Services Grid - Sticky Layout like Ascent Wealth */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Sticky Image */}
                    <div className="lg:sticky lg:top-32 lg:h-fit">
                        <div className="aspect-square overflow-hidden">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('/hero-city.png')` }}
                            />
                        </div>
                    </div>

                    {/* Right: Scrolling Services List */}
                    <div className="space-y-12">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "py-8 border-t border-border transition-opacity duration-500",
                                    index === activeIndex ? "opacity-100" : "opacity-50"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full mt-2 transition-colors duration-300",
                                        index === activeIndex ? "bg-primary" : "bg-border"
                                    )} />
                                    <div>
                                        <h3 className="text-xl font-medium text-foreground mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
