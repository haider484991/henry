"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, Save, X, Layers } from "lucide-react";
import { getSeasons, createSeason, updateSeason, deleteSeason } from "@/lib/actions";
import { FileUpload } from "@/components/admin/FileUpload";

interface Season {
    id: string;
    number: number;
    title: string;
    description: string | null;
    image: string | null;
    published: boolean;
    created_at: string;
}

export default function SeasonsAdminPage() {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string; number: number } | null>(null);
    const [formData, setFormData] = useState({
        number: 1,
        title: "",
        description: "",
        image: "",
        published: true,
    });

    useEffect(() => {
        loadSeasons();
    }, []);

    async function loadSeasons() {
        const data = await getSeasons();
        setSeasons(data);
        setIsLoading(false);
    }

    function resetForm() {
        setFormData({
            number: seasons.length > 0 ? Math.max(...seasons.map(s => s.number)) + 1 : 1,
            title: "",
            description: "",
            image: "",
            published: true,
        });
        setEditingId(null);
        setShowForm(false);
    }

    function handleEdit(season: Season) {
        setFormData({
            number: season.number,
            title: season.title || "",
            description: season.description || "",
            image: season.image || "",
            published: season.published,
        });
        setEditingId(season.id);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                await updateSeason(editingId, {
                    number: formData.number,
                    title: formData.title || `Season ${formData.number}`,
                    description: formData.description || undefined,
                    image: formData.image || undefined,
                    published: formData.published,
                });
            } else {
                await createSeason({
                    number: formData.number,
                    title: formData.title || `Season ${formData.number}`,
                    description: formData.description || undefined,
                    image: formData.image || undefined,
                    published: formData.published,
                });
            }
            await loadSeasons();
            resetForm();
        } catch (error) {
            console.error("Error saving season:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleDeleteClick(id: string, number: number) {
        setConfirmDelete({ id, number });
    }

    async function handleDeleteConfirm() {
        if (!confirmDelete) return;

        const { id } = confirmDelete;
        setConfirmDelete(null);
        setDeletingId(id);
        try {
            await deleteSeason(id);
            setSeasons(seasons.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error deleting season:", error);
        } finally {
            setDeletingId(null);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked :
                    name === "number" ? parseInt(value) || 1 : value,
        }));
    };

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
                    <h1 className="text-2xl font-semibold text-gray-900">Podcast Seasons</h1>
                    <p className="text-gray-500 mt-1">Manage your podcast seasons.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => {
                            setFormData({
                                number: seasons.length > 0 ? Math.max(...seasons.map(s => s.number)) + 1 : 1,
                                title: "",
                                description: "",
                                image: "",
                                published: true,
                            });
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Season
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {editingId ? "Edit Season" : "New Season"}
                        </h2>
                        <button
                            onClick={resetForm}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Season Number *
                                </label>
                                <input
                                    type="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    min={1}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder={`Season ${formData.number}`}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Optional description for this season..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Season Image (Optional)
                            </label>
                            <FileUpload
                                type="image"
                                currentUrl={formData.image}
                                onUpload={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                                onRemove={() => setFormData((prev) => ({ ...prev, image: "" }))}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-gray-700">Published</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {isSubmitting ? "Saving..." : editingId ? "Update Season" : "Create Season"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Seasons List */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Season</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Description</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {seasons.map((season) => (
                            <tr key={season.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {season.image ? (
                                            <img
                                                src={season.image}
                                                alt={season.title}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <Layers className="w-6 h-6 text-primary" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-primary text-lg">
                                            {season.number}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-900">{season.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-500 text-sm line-clamp-2">
                                        {season.description || "-"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        season.published
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {season.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(season)}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(season.id, season.number)}
                                            disabled={deletingId === season.id}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deletingId === season.id ? (
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

                {seasons.length === 0 && (
                    <div className="text-center py-12">
                        <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No seasons yet. Create your first season to get started.</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Season</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>Season {confirmDelete.number}</strong>? This will NOT delete the episodes in this season.
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
