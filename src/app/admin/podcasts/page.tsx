"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Play, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { getEpisodes, deleteEpisode } from "@/lib/actions";

interface Episode {
    id: string;
    slug: string;
    title: string;
    guest: string;
    season: number;
    episode: number;
    description: string;
    youtube?: string;
    soundcloud?: string;
    published: boolean;
}

export default function PodcastsAdminPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSeason, setSelectedSeason] = useState<number | "all">("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string; guest: string } | null>(null);

    useEffect(() => {
        async function loadData() {
            const data = await getEpisodes();
            setEpisodes(data);
            setIsLoading(false);
        }
        loadData();
    }, []);

    const handleDeleteClick = (id: string, guest: string) => {
        setConfirmDelete({ id, guest });
    };

    const handleDeleteConfirm = async () => {
        if (!confirmDelete) return;

        const { id } = confirmDelete;
        setConfirmDelete(null);
        setDeletingId(id);

        const result = await deleteEpisode(id);

        if (result.success) {
            setEpisodes(prev => prev.filter(e => e.id !== id));
        } else {
            console.error("Delete failed:", result.error);
        }

        setDeletingId(null);
    };

    // Get unique seasons
    const seasons = [...new Set(episodes.map(ep => ep.season))].sort((a, b) => b - a);

    const filteredEpisodes = episodes.filter((episode) => {
        const matchesSearch =
            episode.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSeason = selectedSeason === "all" || episode.season === selectedSeason;

        return matchesSearch && matchesSeason;
    });

    // Sort by season and episode (newest first)
    const sortedEpisodes = [...filteredEpisodes].sort((a, b) => {
        if (a.season !== b.season) return b.season - a.season;
        return b.episode - a.episode;
    });

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
                    <h1 className="text-2xl font-semibold text-gray-900">Podcast Episodes</h1>
                    <p className="text-gray-500 mt-1">Manage your podcast episodes across all seasons.</p>
                </div>
                <Link
                    href="/admin/podcasts/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Episode
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search episodes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    {/* Season Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value === "all" ? "all" : Number(e.target.value))}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Seasons</option>
                            {seasons.map((season) => (
                                <option key={season} value={season}>
                                    Season {season}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-4">
                Showing {sortedEpisodes.length} of {episodes.length} episodes
            </p>

            {/* Episodes Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Episode</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Guest</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Season</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Media</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedEpisodes.map((episode) => (
                            <tr key={episode.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {episode.youtube ? (
                                            <img
                                                src={`https://img.youtube.com/vi/${episode.youtube}/default.jpg`}
                                                alt={episode.guest}
                                                className="w-16 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                <Play className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 line-clamp-1">{episode.title}</p>
                                            <p className="text-sm text-gray-500 line-clamp-1">{episode.description.slice(0, 50)}...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-900">{episode.guest}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                                        S{episode.season} E{episode.episode}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        {episode.youtube && (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">YouTube</span>
                                        )}
                                        {episode.soundcloud && (
                                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">SoundCloud</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        episode.published
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {episode.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/podcast/${episode.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/podcasts/${episode.id}`}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(episode.id, episode.guest)}
                                            disabled={deletingId === episode.id}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                            title="Delete"
                                        >
                                            {deletingId === episode.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sortedEpisodes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No episodes found matching your search.</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Episode</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the episode with <strong>{confirmDelete.guest}</strong>? This action cannot be undone.
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
