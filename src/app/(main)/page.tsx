import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PodcastSection } from "@/components/PodcastSection";
import { ContactForm } from "@/components/ContactForm";
import { LocalBusinessJsonLd, PodcastJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Henry Harrison | Entrepreneur, Investor & Philanthropist | Dallas, Texas",
    description: "Henry Harrison is a Dallas-based entrepreneur, investor, and philanthropist with over 30 years of experience in waste-to-energy, real estate, and technology. Host of the Henry Harrison Podcast.",
    alternates: {
        canonical: "https://henryharrison.com",
    },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <PodcastJsonLd />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-black selection:text-white">
        <Hero />
        <AboutSection />
        <PodcastSection />
        <ContactForm />
      </main>
    </>
  );
}
