import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">Disclaimer</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-3xl">
                        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Website Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            The information provided by Henry Harrison ("we," "us," or "our") on henryharrison.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">External Links Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Professional Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            The Site cannot and does not contain financial, legal, or investment advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Testimonials Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            The Site may contain testimonials by users of our services. These testimonials reflect the real-life experiences and opinions of such users. The experiences are personal to those particular users and may not necessarily be representative of all users.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have questions about this Disclaimer, please contact us at info@henryharrison.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
