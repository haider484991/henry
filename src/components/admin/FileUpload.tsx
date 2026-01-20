"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Video } from "lucide-react";
import { uploadImage, uploadVideo } from "@/lib/storage";

interface FileUploadProps {
    type: "image" | "video";
    onUpload: (url: string) => void;
    currentUrl?: string;
    onRemove?: () => void;
}

export function FileUpload({ type, onUpload, currentUrl, onRemove }: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(currentUrl || null);
    const inputRef = useRef<HTMLInputElement>(null);

    const acceptTypes = type === "image"
        ? "image/jpeg,image/png,image/gif,image/webp"
        : "video/mp4,video/webm,video/ogg";

    const maxSize = type === "image" ? "5MB" : "100MB";

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading(true);

        // Show local preview for images
        if (type === "image") {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }

        try {
            const result = type === "image"
                ? await uploadImage(file)
                : await uploadVideo(file);

            if (result.success && result.url) {
                onUpload(result.url);
                setPreview(result.url);
            } else {
                setError(result.error || "Upload failed");
                setPreview(null);
            }
        } catch (err) {
            setError("Upload failed. Please try again.");
            setPreview(null);
        } finally {
            setIsUploading(false);
        }
    }

    function handleRemove() {
        setPreview(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onRemove?.();
    }

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    {type === "image" ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <video
                            src={preview}
                            controls
                            className="w-full h-48 object-cover"
                        />
                    )}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isUploading
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-primary hover:bg-gray-50"
                }`}>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={acceptTypes}
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="hidden"
                    />
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2 text-primary">
                            <Loader2 className="w-10 h-10 animate-spin" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            {type === "image" ? (
                                <ImageIcon className="w-10 h-10" />
                            ) : (
                                <Video className="w-10 h-10" />
                            )}
                            <span className="text-sm font-medium">
                                Click to upload {type}
                            </span>
                            <span className="text-xs text-gray-400">
                                Max size: {maxSize}
                            </span>
                        </div>
                    )}
                </label>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

// Inline image upload for rich text editor
export function InlineImageUpload({ onUpload, onClose }: { onUpload: (url: string) => void; onClose: () => void }) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading(true);

        try {
            const result = await uploadImage(file);
            if (result.success && result.url) {
                onUpload(result.url);
                onClose();
            } else {
                setError(result.error || "Upload failed");
            }
        } catch (err) {
            setError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Upload Image</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isUploading
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-primary hover:bg-gray-50"
            }`}>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="hidden"
                />
                {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-500">
                        <Upload className="w-6 h-6" />
                        <span className="text-xs">Click to upload</span>
                    </div>
                )}
            </label>

            {error && (
                <p className="text-xs text-red-500 mt-2">{error}</p>
            )}
        </div>
    );
}
