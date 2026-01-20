import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEpisodeBySlug } from "@/lib/actions";
import { generateEpisodeMetadata } from "@/lib/seo";
import { EpisodeJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { EpisodeContent } from "./EpisodeContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const episode = await getEpisodeBySlug(slug);

    if (!episode) {
        return {
            title: "Episode Not Found",
        };
    }

    return generateEpisodeMetadata({
        title: episode.title,
        guest: episode.guest,
        description: episode.description,
        slug: episode.slug,
        image: episode.image,
        youtube: episode.youtube,
        season: episode.season,
        episode: episode.episode,
    });
}

export default async function EpisodePage({ params }: Props) {
    const { slug } = await params;
    const episode = await getEpisodeBySlug(slug);

    if (!episode) {
        notFound();
    }

    return (
        <>
            <EpisodeJsonLd
                title={episode.title}
                guest={episode.guest}
                description={episode.description}
                slug={episode.slug}
                image={episode.image}
                youtube={episode.youtube}
                soundcloud={episode.soundcloud}
                season={episode.season}
                episode={episode.episode}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "Podcast", url: "/podcast" },
                    { name: episode.guest, url: `/podcast/${episode.slug}` },
                ]}
            />
            <EpisodeContent episode={episode} />
        </>
    );
}
