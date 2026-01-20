"use client";

import { useState } from "react";
import { Save, Globe, Mail, MapPin, Phone, Check } from "lucide-react";

export default function SettingsPage() {
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [settings, setSettings] = useState({
        siteName: "Henry Harrison",
        siteUrl: "https://henryharrison.com",
        email: "hoharrison@sbcglobal.net",
        phone: "(214) 555-0100",
        address: "17290 Preston Road #300 B2, Dallas, Texas 75252",
        socialLinks: {
            linkedin: "",
            twitter: "",
            youtube: "",
        },
        podcastLinks: {
            spotify: "https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN",
            apple: "https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178",
            amazon: "https://www.amazon.com/Henry-Harrison-Podcast-Dallas-Texas/dp/B0CRRNLWW4",
            soundcloud: "https://soundcloud.com/henry-harrison-podcast",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setSettings((prev) => {
                const parentKey = parent as keyof typeof prev;
                const parentValue = prev[parentKey];
                if (typeof parentValue === "object" && parentValue !== null) {
                    return {
                        ...prev,
                        [parent]: {
                            ...parentValue,
                            [child]: value,
                        },
                    };
                }
                return prev;
            });
        } else {
            setSettings((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        // In production, save to database
        console.log("Saving settings:", settings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your website settings and configurations.</p>
                </div>
                <div className="flex items-center gap-3">
                    {saveSuccess && (
                        <span className="flex items-center gap-2 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            Settings saved successfully!
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gray-400" />
                        General Settings
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Site Name
                            </label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Site URL
                            </label>
                            <input
                                type="url"
                                name="siteUrl"
                                value={settings.siteUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gray-400" />
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" /> Email
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" /> Phone
                                </span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> Address
                                </span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Podcast Links */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Podcast Platforms</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Spotify
                            </label>
                            <input
                                type="url"
                                name="podcastLinks.spotify"
                                value={settings.podcastLinks.spotify}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apple Podcasts
                            </label>
                            <input
                                type="url"
                                name="podcastLinks.apple"
                                value={settings.podcastLinks.apple}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amazon Music
                            </label>
                            <input
                                type="url"
                                name="podcastLinks.amazon"
                                value={settings.podcastLinks.amazon}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SoundCloud
                            </label>
                            <input
                                type="url"
                                name="podcastLinks.soundcloud"
                                value={settings.podcastLinks.soundcloud}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                name="socialLinks.linkedin"
                                value={settings.socialLinks.linkedin}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter/X
                            </label>
                            <input
                                type="url"
                                name="socialLinks.twitter"
                                value={settings.socialLinks.twitter}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                YouTube
                            </label>
                            <input
                                type="url"
                                name="socialLinks.youtube"
                                value={settings.socialLinks.youtube}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
