import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getEpisodeBySlug } from "@/lib/actions";
import { generateArticleMetadata, generateEpisodeMetadata } from "@/lib/seo";
import { ArticleJsonLd, BreadcrumbJsonLd, EpisodeJsonLd } from "@/components/JsonLd";
import { ArticleContent } from "./ArticleContent";
import { EpisodeContent } from "./EpisodeContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const [article, episode] = await Promise.all([
        getArticleBySlug(slug),
        getEpisodeBySlug(slug),
    ]);

    if (article) {
        return generateArticleMetadata({
            title: article.title,
            excerpt: article.excerpt,
            slug: article.slug,
            image: article.image,
            author: article.author,
            date: article.date,
            category: article.category,
            tags: article.tags,
        });
    }

    if (episode) {
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

    return {
        title: "Not Found",
    };
}

export default async function SlugPage({ params }: Props) {
    const { slug } = await params;

    const [article, episode] = await Promise.all([
        getArticleBySlug(slug),
        getEpisodeBySlug(slug),
    ]);

    if (article) {
        return (
            <>
                <ArticleJsonLd
                    title={article.title}
                    description={article.excerpt}
                    slug={article.slug}
                    image={article.image}
                    author={article.author}
                    datePublished={article.date}
                    category={article.category}
                    tags={article.tags}
                />
                <BreadcrumbJsonLd
                    items={[
                        { name: "Home", url: "/" },
                        { name: "News", url: "/news" },
                        { name: article.title, url: `/${article.slug}` },
                    ]}
                />
                <ArticleContent article={article} />
            </>
        );
    }

    if (episode) {
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
                        { name: episode.guest, url: `/${episode.slug}` },
                    ]}
                />
                <EpisodeContent episode={episode} />
            </>
        );
    }

    notFound();
}
