import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(request: NextRequest) {
    try {
        const { path, bucket = "media" } = await request.json();

        if (!path) {
            return NextResponse.json(
                { success: false, error: "No file path provided" },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.error("Delete error:", error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete file" },
            { status: 500 }
        );
    }
}

// Slugify filename for SEO-friendly URLs
function slugifyFilename(name: string): string {
    const ext = name.split(".").pop() || "";
    const base = name.replace(/\.[^/.]+$/, ""); // remove extension
    const slug = base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return `${slug}.${ext}`;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const bucket = (formData.get("bucket") as string) || "media";
        const folder = (formData.get("folder") as string) || "";

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        // Preserve original filename (slugified) with timestamp prefix for uniqueness
        const timestamp = Date.now();
        const seoFilename = slugifyFilename(file.name);
        const filename = `${timestamp}-${seoFilename}`;
        const path = folder ? `${folder}/${filename}` : filename;

        // Convert File to ArrayBuffer for server-side upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload using the admin client (bypasses RLS)
        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type,
            });

        if (error) {
            console.error("Upload error:", error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            filename: seoFilename,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
