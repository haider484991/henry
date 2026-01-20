import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PodcastSection } from "@/components/PodcastSection";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-black selection:text-white">
      <Hero />
      <AboutSection />
      <PodcastSection />
      <ContactForm />
    </main>
  );
}
