"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, Sparkles, Loader2 } from "lucide-react";
import { getArticles, getCategories, deleteArticle } from "@/lib/actions";

interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    category: string;
    image: string;
    author: string;
    tags?: string[];
    published: boolean;
    featured: boolean;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function NewsAdminPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

    useEffect(() => {
        async function loadData() {
            const [articlesData, categoriesData] = await Promise.all([
                getArticles(),
                getCategories()
            ]);
            setArticles(articlesData);
            setCategories(categoriesData);
            setIsLoading(false);
        }
        loadData();
    }, []);

    const handleDeleteClick = (id: string, title: string) => {
        setConfirmDelete({ id, title });
    };

    const handleDeleteConfirm = async () => {
        if (!confirmDelete) return;

        const { id } = confirmDelete;
        setConfirmDelete(null);
        setDeletingId(id);

        const result = await deleteArticle(id);

        if (result.success) {
            setArticles(prev => prev.filter(a => a.id !== id));
        } else {
            console.error("Delete failed:", result.error);
        }

        setDeletingId(null);
    };

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Sort by date (newest first)
    const sortedArticles = [...filteredArticles].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">News Articles</h1>
                    <p className="text-gray-500 mt-1">Manage your news and blog articles.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/news/generate"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        Auto Generate
                    </Link>
                    <Link
                        href="/admin/news/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Article
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-4">
                Showing {sortedArticles.length} of {articles.length} articles
            </p>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedArticles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:border-gray-300 transition-colors"
                    >
                        {/* Thumbnail */}
                        <div className="aspect-[16/10] bg-gray-100 relative">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                            {article.featured && (
                                <div className="absolute top-3 left-3">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded">
                                        <Star className="w-3 h-3" fill="currentColor" />
                                        Featured
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-medium text-primary">{article.category}</span>
                                <span className="text-gray-300">-</span>
                                <span className="text-xs text-gray-500">{article.date}</span>
                            </div>
                            <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                {article.excerpt}
                            </p>

                            {/* Status & Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className={`px-2 py-1 text-xs rounded ${
                                    article.published
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {article.published ? "Published" : "Draft"}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={`/${article.slug}`}
                                        target="_blank"
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/news/${article.id}`}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(article.id, article.title)}
                                        disabled={deletingId === article.id}
                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                        title="Delete"
                                    >
                                        {deletingId === article.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {sortedArticles.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-500">No articles found matching your search.</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Article</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>&quot;{confirmDelete.title}&quot;</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
