"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Youtube, Music, Loader2 } from "lucide-react";
import { createEpisode, getSeasons } from "@/lib/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { FileUpload } from "@/components/admin/FileUpload";

interface Season {
    id: string;
    number: number;
    title: string;
    published: boolean;
}

export default function NewEpisodePage() {
    const router = useRouter();
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        guest: "",
        season: 4,
        episode: 1,
        description: "",
        youtube: "",
        soundcloud: "",
        image: "",
        headline: "",
        subheadline: "",
        fullDescription: "",
        keyInsights: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        websiteLabel: "",
        published: true,
    });

    useEffect(() => {
        async function loadSeasons() {
            const data = await getSeasons();
            setSeasons(data.filter((s: Season) => s.published));
            if (data.length > 0) {
                const maxSeason = Math.max(...data.map((s: Season) => s.number));
                setFormData(prev => ({ ...prev, season: maxSeason }));
            }
            setIsLoading(false);
        }
        loadSeasons();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const slug = formData.guest
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const episodeData = {
                slug,
                title: formData.title || formData.guest,
                guest: formData.guest,
                season: formData.season,
                episode: formData.episode,
                description: formData.description,
                youtube: formData.youtube || undefined,
                soundcloud: formData.soundcloud || undefined,
                image: formData.image || undefined,
                headline: formData.headline || undefined,
                subheadline: formData.subheadline || undefined,
                fullDescription: formData.fullDescription || undefined,
                keyInsights: formData.keyInsights || undefined,
                guestContact: (formData.phone || formData.email || formData.website) ? {
                    phone: formData.phone || undefined,
                    email: formData.email || undefined,
                    address: formData.address || undefined,
                    website: formData.website || undefined,
                    websiteLabel: formData.websiteLabel || undefined,
                } : undefined,
                published: formData.published,
            };

            await createEpisode(episodeData);
            router.push("/admin/podcasts");
        } catch (error) {
            console.error("Error creating episode:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/podcasts"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">New Episode</h1>
                        <p className="text-gray-500 mt-1">Add a new podcast episode.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? "Saving..." : "Save Episode"}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Guest Name *
                                </label>
                                <input
                                    type="text"
                                    name="guest"
                                    value={formData.guest}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="e.g., John Smith"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Episode Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Leave blank to use guest name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Season *
                                    </label>
                                    <select
                                        name="season"
                                        value={formData.season}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    >
                                        {seasons.map((season) => (
                                            <option key={season.id} value={season.number}>
                                                {season.title || `Season ${season.number}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Episode Number *
                                    </label>
                                    <input
                                        type="number"
                                        name="episode"
                                        value={formData.episode}
                                        onChange={handleChange}
                                        min={1}
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Brief description of the episode..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Links */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Links</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="flex items-center gap-2">
                                        <Youtube className="w-4 h-4 text-red-500" />
                                        YouTube Video ID
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="youtube"
                                    value={formData.youtube}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="e.g., dQw4w9WgXcQ"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    The video ID from the YouTube URL (youtube.com/watch?v=VIDEO_ID)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="flex items-center gap-2">
                                        <Music className="w-4 h-4 text-orange-500" />
                                        SoundCloud Track Slug
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="soundcloud"
                                    value={formData.soundcloud}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="e.g., episode-name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Custom Episode Image
                                </label>
                                <FileUpload
                                    type="image"
                                    currentUrl={formData.image}
                                    onUpload={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                                    onRemove={() => setFormData((prev) => ({ ...prev, image: "" }))}
                                />
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="Or enter image URL manually..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extended Content */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Extended Content</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Episode headline..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subheadline
                                </label>
                                <input
                                    type="text"
                                    name="subheadline"
                                    value={formData.subheadline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Episode subheadline..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Description
                                </label>
                                <RichTextEditor
                                    content={formData.fullDescription}
                                    onChange={(content) => setFormData((prev) => ({ ...prev, fullDescription: content }))}
                                    placeholder="Detailed episode description with rich formatting..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Key Insights
                                </label>
                                <RichTextEditor
                                    content={formData.keyInsights}
                                    onChange={(content) => setFormData((prev) => ({ ...prev, keyInsights: content }))}
                                    placeholder="Key insights and takeaways from the episode..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Guest Contact */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="guest@example.com"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="123 Main St, City, State 12345"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Website Label
                                </label>
                                <input
                                    type="text"
                                    name="websiteLabel"
                                    value={formData.websiteLabel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Visit Website"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publish Settings */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Publish</h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-gray-700">Publish immediately</span>
                            </label>
                        </div>
                    </div>

                    {/* Preview */}
                    {formData.youtube && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail Preview</h2>
                            <img
                                src={`https://img.youtube.com/vi/${formData.youtube}/maxresdefault.jpg`}
                                alt="Video thumbnail"
                                className="w-full rounded-lg"
                            />
                        </div>
                    )}

                    {/* Tips */}
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                        <h2 className="text-lg font-semibold text-blue-900 mb-2">Tips</h2>
                        <ul className="text-sm text-blue-700 space-y-2">
                            <li>- Guest name is used to generate the URL slug</li>
                            <li>- YouTube thumbnail is auto-generated from video ID</li>
                            <li>- Extended content appears on the episode detail page</li>
                            <li>- Upload custom images for episodes without YouTube</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}
