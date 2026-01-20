"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Mic,
    FileText,
    Settings,
    Plus,
    ArrowLeft,
    Home,
    LogOut,
    Layers
} from "lucide-react";
import { signOut } from "@/lib/auth-actions";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Podcasts", href: "/admin/podcasts", icon: Mic },
    { name: "Seasons", href: "/admin/seasons", icon: Layers },
    { name: "News", href: "/admin/news", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show admin layout for login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-primary text-white">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <Link href="/admin" className="text-xl font-semibold">
                        Admin Dashboard
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-3 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        View Website
                    </Link>
                    <div className="flex gap-2 mb-3">
                        <Link
                            href="/admin/podcasts/new"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Episode
                        </Link>
                        <Link
                            href="/admin/news/new"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Article
                        </Link>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white rounded-lg text-sm transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            View Site
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Admin
                        </span>
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
