import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserAgreementPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">User Agreement</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container px-6">
                    <div className="max-w-3xl">
                        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Agreement to Terms</h2>
                        <p className="text-muted-foreground mb-6">
                            By accessing and using henryharrison.com, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Use License</h2>
                        <p className="text-muted-foreground mb-6">
                            Permission is granted to temporarily view the materials on Henry Harrison's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">User Responsibilities</h2>
                        <p className="text-muted-foreground mb-6">
                            As a user of this website, you agree to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Use the website only for lawful purposes</li>
                            <li>Not attempt to interfere with the website's operation</li>
                            <li>Not collect information about other users</li>
                            <li>Not use automated systems to access the website</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Intellectual Property</h2>
                        <p className="text-muted-foreground mb-6">
                            All content on this website, including text, graphics, logos, images, and software, is the property of Henry Harrison and is protected by intellectual property laws.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Limitation of Liability</h2>
                        <p className="text-muted-foreground mb-6">
                            Henry Harrison shall not be liable for any damages arising from the use or inability to use the materials on this website.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Governing Law</h2>
                        <p className="text-muted-foreground mb-6">
                            These terms shall be governed by and construed in accordance with the laws of the State of Texas.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            Questions about this User Agreement should be sent to info@henryharrison.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
