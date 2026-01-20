import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/actions";
import { generateArticleMetadata } from "@/lib/seo";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { ArticleContent } from "./ArticleContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

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

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

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
