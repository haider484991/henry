import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getArticlesByCategory } from "@/lib/actions";
import { generateCategoryMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CategoryContent } from "./CategoryContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    return generateCategoryMetadata({
        name: category.name,
        slug: category.slug,
        description: category.description,
    });
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const [category, articles] = await Promise.all([
        getCategoryBySlug(slug),
        getArticlesByCategory(slug)
    ]);

    if (!category) {
        notFound();
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "News", url: "/news" },
                    { name: category.name, url: `/category/${category.slug}` },
                ]}
            />
            <CategoryContent category={category} articles={articles} />
        </>
    );
}
