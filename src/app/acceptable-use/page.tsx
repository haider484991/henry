import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AcceptableUsePage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">Acceptable Use Policy</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container px-6">
                    <div className="max-w-3xl">
                        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Overview</h2>
                        <p className="text-muted-foreground mb-6">
                            This Acceptable Use Policy outlines the terms under which you may access and use henryharrison.com. By using our website, you agree to comply with this policy.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Prohibited Uses</h2>
                        <p className="text-muted-foreground mb-6">
                            You may not use the website:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>In any way that violates any applicable law or regulation</li>
                            <li>To transmit any unsolicited advertising or promotional material</li>
                            <li>To impersonate or attempt to impersonate Henry Harrison or any other person</li>
                            <li>To engage in any conduct that restricts or inhibits anyone's use of the website</li>
                            <li>To introduce any viruses, trojans, or other malicious code</li>
                            <li>To attempt to gain unauthorized access to any portion of the website</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Content Standards</h2>
                        <p className="text-muted-foreground mb-6">
                            Any content you submit to the website must not:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Be defamatory, obscene, or offensive</li>
                            <li>Infringe any patent, trademark, or copyright</li>
                            <li>Promote discrimination or illegal activity</li>
                            <li>Be misleading or deceptive</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Enforcement</h2>
                        <p className="text-muted-foreground mb-6">
                            We reserve the right to take any action we deem appropriate if you violate this policy, including but not limited to removing content, suspending access, or reporting the violation to law enforcement.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have questions about this Acceptable Use Policy, please contact us at info@henryharrison.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
