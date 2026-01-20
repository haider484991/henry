import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">Privacy Policy</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-3xl prose prose-lg">
                        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Introduction</h2>
                        <p className="text-muted-foreground mb-6">
                            Henry Harrison ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website henryharrison.com.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Information We Collect</h2>
                        <p className="text-muted-foreground mb-6">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Fill out a contact form</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Request information about our services</li>
                            <li>Interact with our website</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-6">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Respond to your inquiries</li>
                            <li>Send you relevant information and updates</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Data Security</h2>
                        <p className="text-muted-foreground mb-6">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Your Rights</h2>
                        <p className="text-muted-foreground mb-6">
                            You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@henryharrison.com.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contact Us</h2>
                        <p className="text-muted-foreground mb-6">
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-muted-foreground">
                            Henry Harrison<br />
                            17290 Preston Road #300 B2<br />
                            Dallas, Texas 75252<br />
                            Email: info@henryharrison.com
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
