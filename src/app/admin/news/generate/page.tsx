"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, RefreshCw, Save, Edit, Loader2 } from "lucide-react";
import { categories } from "@/data/articles";
import { generateArticleFromTopic, createArticle } from "@/lib/actions";

export default function GenerateArticlePage() {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [category, setCategory] = useState("Texas News");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedArticle, setGeneratedArticle] = useState<{
        title: string;
        excerpt: string;
        content: string;
    } | null>(null);

    const suggestedTopics = [
        "Dallas real estate market trends 2024",
        "Texas business growth statistics",
        "Green energy investments in Texas",
        "Dallas entrepreneurship success stories",
        "Texas economic outlook",
        "DFW commercial development news",
    ];

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        setGeneratedArticle(null);

        try {
            // Simulate AI generation (in production, this would call an AI API)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const result = await generateArticleFromTopic(topic);
            if (result.success && result.article) {
                setGeneratedArticle({
                    title: result.article.title,
                    excerpt: result.article.excerpt,
                    content: result.article.content || "",
                });
            }
        } catch (error) {
            console.error("Error generating article:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!generatedArticle) return;

        try {
            const slug = generatedArticle.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            await createArticle({
                slug,
                title: generatedArticle.title,
                excerpt: generatedArticle.excerpt,
                content: generatedArticle.content,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                category,
                image: "/images/news/placeholder.jpg",
                author: "Henry Harrison",
                tags: topic.split(" ").slice(0, 5),
                published: false,
                featured: false,
            });

            router.push("/admin/news");
        } catch (error) {
            console.error("Error saving article:", error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/news"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Auto Generate Article</h1>
                        <p className="text-gray-500 mt-1">Generate articles automatically from topics.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                            Generate from Topic
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Topic or Title
                                </label>
                                <textarea
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Enter a topic or title for the article..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !topic.trim()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        Generate Article
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Suggested Topics */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Topics</h2>
                        <div className="flex flex-wrap gap-2">
                            {suggestedTopics.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setTopic(suggestion)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
                        <h2 className="text-lg font-semibold text-purple-900 mb-2">How It Works</h2>
                        <ul className="text-sm text-purple-700 space-y-2">
                            <li>• Enter a topic or article idea</li>
                            <li>• AI generates title, excerpt, and content</li>
                            <li>• Review and edit the generated content</li>
                            <li>• Save as draft or publish directly</li>
                        </ul>
                        <p className="text-xs text-purple-600 mt-4">
                            Note: Generated content is saved as draft for review before publishing.
                        </p>
                    </div>
                </div>

                {/* Preview Section */}
                <div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Generated Preview</h2>
                            {generatedArticle && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleGenerate}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Regenerate
                                    </button>
                                </div>
                            )}
                        </div>

                        {isGenerating ? (
                            <div className="aspect-[4/3] flex items-center justify-center">
                                <div className="text-center">
                                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                                    <p className="text-gray-500">Generating your article...</p>
                                    <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
                                </div>
                            </div>
                        ) : generatedArticle ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Title
                                    </label>
                                    <p className="text-xl font-semibold text-gray-900">
                                        {generatedArticle.title}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Excerpt
                                    </label>
                                    <p className="text-gray-600">{generatedArticle.excerpt}</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Content
                                    </label>
                                    <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-auto">
                                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                                            {generatedArticle.content}
                                        </pre>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save as Draft
                                    </button>
                                    <Link
                                        href={{
                                            pathname: "/admin/news/new",
                                            query: {
                                                title: generatedArticle.title,
                                                excerpt: generatedArticle.excerpt,
                                                content: generatedArticle.content,
                                            },
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit & Publish
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-[4/3] flex items-center justify-center bg-gray-50 rounded-lg">
                                <div className="text-center text-gray-400">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4" />
                                    <p>Enter a topic and click generate</p>
                                    <p className="text-sm mt-1">Your article preview will appear here</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
