"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Youtube as YoutubeIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    Heading3,
    Minus,
} from "lucide-react";
import { useCallback, useState } from "react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    onImageUpload?: () => void;
}

export function RichTextEditor({
    content,
    onChange,
    placeholder = "Write your content here...",
    onImageUpload,
}: RichTextEditorProps) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [showYoutubeInput, setShowYoutubeInput] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full rounded-lg",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline",
                },
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: "w-full aspect-video rounded-lg",
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-lg max-w-none min-h-[300px] p-4 focus:outline-none",
            },
        },
    });

    const setLink = useCallback(() => {
        if (!linkUrl) {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
        setShowLinkInput(false);
        setLinkUrl("");
    }, [editor, linkUrl]);

    const addImage = useCallback(() => {
        if (imageUrl) {
            editor?.chain().focus().setImage({ src: imageUrl }).run();
        }
        setShowImageInput(false);
        setImageUrl("");
    }, [editor, imageUrl]);

    const addYoutube = useCallback(() => {
        if (youtubeUrl) {
            editor?.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
        }
        setShowYoutubeInput(false);
        setYoutubeUrl("");
    }, [editor, youtubeUrl]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        isActive = false,
        children,
        title,
    }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                isActive ? "bg-gray-200 text-primary" : "text-gray-600"
            }`}
        >
            {children}
        </button>
    );

    const ToolbarDivider = () => <div className="w-px h-6 bg-gray-200 mx-1" />;

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap items-center gap-1">
                {/* History */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title="Undo"
                >
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title="Redo"
                >
                    <Redo className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Headings */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text Formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive("underline")}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                    title="Code"
                >
                    <Code className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    isActive={editor.isActive({ textAlign: "left" })}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    isActive={editor.isActive({ textAlign: "center" })}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    isActive={editor.isActive({ textAlign: "right" })}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <Minus className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Link */}
                <div className="relative">
                    <ToolbarButton
                        onClick={() => setShowLinkInput(!showLinkInput)}
                        isActive={editor.isActive("link")}
                        title="Add Link"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </ToolbarButton>
                    {showLinkInput && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex gap-2">
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://..."
                                className="px-2 py-1 border border-gray-200 rounded text-sm w-48"
                            />
                            <button
                                type="button"
                                onClick={setLink}
                                className="px-2 py-1 bg-primary text-white rounded text-sm"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>

                {/* Image */}
                <div className="relative">
                    <ToolbarButton
                        onClick={() => {
                            if (onImageUpload) {
                                onImageUpload();
                            } else {
                                setShowImageInput(!showImageInput);
                            }
                        }}
                        title="Add Image"
                    >
                        <ImageIcon className="w-4 h-4" />
                    </ToolbarButton>
                    {showImageInput && !onImageUpload && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex gap-2">
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Image URL..."
                                className="px-2 py-1 border border-gray-200 rounded text-sm w-48"
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                className="px-2 py-1 bg-primary text-white rounded text-sm"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>

                {/* YouTube */}
                <div className="relative">
                    <ToolbarButton
                        onClick={() => setShowYoutubeInput(!showYoutubeInput)}
                        title="Add YouTube Video"
                    >
                        <YoutubeIcon className="w-4 h-4" />
                    </ToolbarButton>
                    {showYoutubeInput && (
                        <div className="absolute top-full right-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex gap-2">
                            <input
                                type="url"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                placeholder="YouTube URL..."
                                className="px-2 py-1 border border-gray-200 rounded text-sm w-48"
                            />
                            <button
                                type="button"
                                onClick={addYoutube}
                                className="px-2 py-1 bg-primary text-white rounded text-sm"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}

// Export a function to insert image into the editor
export function insertImageIntoEditor(
    editor: ReturnType<typeof useEditor>,
    imageUrl: string
) {
    if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
    }
}
