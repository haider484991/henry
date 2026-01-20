import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NewsSection() {
    const items = [
        {
            label: "Dallas Black Chamber of Commerce",
            title: "Distributes $30,000 in Grants to Minority Enterprises",
            date: "Jul 1, 2024",
            link: "#"
        },
        {
            label: "Real Estate",
            title: "Dominates Commercial Real Estate in 2024",
            date: "Jun 26, 2024",
            link: "#"
        },
        {
            label: "Growth",
            title: "Celina, Texas: America's Fastest-Growing City",
            date: "Jun 18, 2024",
            link: "#"
        }
    ];

    return (
        <section id="news" className="py-24 md:py-32 bg-background">
            <div className="container px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                            Latest Updates
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            Stay informed with the latest news, insights, and developments from Henry Harrison Enterprises.
                        </p>
                    </div>
                    <Link
                        href="/news"
                        className="link-arrow text-foreground border-foreground/30 hover:border-foreground mt-6 md:mt-0"
                    >
                        View all articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <Link
                            href={item.link}
                            key={index}
                            className="group block"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-[4/3] bg-secondary mb-6 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-105 transition-transform duration-500" />
                            </div>

                            {/* Content */}
                            <div>
                                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                                    {item.label}
                                </span>
                                <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                    {item.date}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
