import { supabase } from "./supabase";

export type UploadResult = {
    success: boolean;
    url?: string;
    error?: string;
};

export async function uploadFile(
    file: File,
    bucket: string = "media",
    folder: string = ""
): Promise<UploadResult> {
    try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split(".").pop();
        const filename = `${timestamp}-${randomStr}.${extension}`;
        const path = folder ? `${folder}/${filename}` : filename;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("Upload error:", error);
            return { success: false, error: error.message };
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error("Upload error:", error);
        return { success: false, error: "Failed to upload file" };
    }
}

export async function uploadImage(file: File): Promise<UploadResult> {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
        return { success: false, error: "Invalid file type. Please upload an image." };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { success: false, error: "File too large. Maximum size is 5MB." };
    }

    return uploadFile(file, "media", "images");
}

export async function uploadVideo(file: File): Promise<UploadResult> {
    // Validate file type
    const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!validTypes.includes(file.type)) {
        return { success: false, error: "Invalid file type. Please upload a video." };
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
        return { success: false, error: "File too large. Maximum size is 100MB." };
    }

    return uploadFile(file, "media", "videos");
}

export async function deleteFile(
    path: string,
    bucket: string = "media"
): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.storage.from(bucket).remove([path]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete error:", error);
        return { success: false, error: "Failed to delete file" };
    }
}

export function getPublicUrl(path: string, bucket: string = "media"): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}
