import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DMCAPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="container px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">DMCA Policy</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container px-6">
                    <div className="max-w-3xl">
                        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Digital Millennium Copyright Act Notice</h2>
                        <p className="text-muted-foreground mb-6">
                            Henry Harrison respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously to claims of copyright infringement committed using our website.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Filing a DMCA Notice</h2>
                        <p className="text-muted-foreground mb-6">
                            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our designated agent with the following information:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                            <li>Identification of the copyrighted work claimed to have been infringed</li>
                            <li>Identification of the material claimed to be infringing and its location on the Site</li>
                            <li>Your contact information (address, telephone number, and email)</li>
                            <li>A statement that you have a good faith belief that the use is not authorized</li>
                            <li>A statement that the information in the notification is accurate, under penalty of perjury</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contact Information</h2>
                        <p className="text-muted-foreground mb-6">
                            DMCA notices should be sent to:
                        </p>
                        <p className="text-muted-foreground">
                            Henry Harrison<br />
                            Attn: DMCA Agent<br />
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
