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
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            This disclaimer ("Disclaimer") sets forth the general guidelines, disclosures, and terms of your use of the website https://henryharrison.com/ ("Website" or "Service") and any of its related products and services (collectively, "Services"). This Disclaimer is a legally binding agreement between you ("User", "you" or "your") and HenryHarrison.com ("HenryHarrison.com", "we", "us" or "our"). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms "User", "you" or "your" shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Disclaimer. You acknowledge that this Disclaimer is a contract between you and HenryHarrison.com, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Representation</h2>
                        <p className="text-muted-foreground mb-6">
                            Any views or opinions represented on the Website belong solely to HenryHarrison.com, its content creators and employees, and do not represent those of people, institutions or organizations that HenryHarrison.com may or may not be associated with in professional or personal capacity unless explicitly stated. Any views or opinions are not intended to malign any religion, ethnic group, club, organization, company, or individual.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Content and Postings</h2>
                        <p className="text-muted-foreground mb-6">
                            You may not modify, print or copy any part of the Website and Services. Inclusion of any part of the Website and Services in another work, whether in printed or electronic or another form or inclusion of any part of the Website and Services on another resource by embedding, framing or otherwise without the express permission of HenryHarrison.com is prohibited.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Compensation and Sponsorship</h2>
                        <p className="text-muted-foreground mb-6">
                            The Website and Services may contain forms of advertising, sponsorship, paid insertions or other forms of compensation. On certain occasions HenryHarrison.com may be compensated to provide opinions on products, services, or various other topics. Even though HenryHarrison.com receives compensation for advertisements, the opinions, findings, beliefs, or experiences on those topics or products are honest and not influenced by the advertiser or sponsor. The views and opinions expressed on the Website are purely of HenryHarrison.com. Any product claims, statistics, quotes or other representations about products or services should be verified with the manufacturer, provider or the party in question. Sponsored content and advertising space will always be identified as such. Some of the links on the Website may be affiliate links. This means if you click on the link and purchase an item, HenryHarrison.com will receive an affiliate commission. Furthermore, HenryHarrison.com is a participant in the Amazon Associates program, an affiliate advertising program designed to provide a means to earn advertising fees by advertising and linking to Amazon properties.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Not Financial Advice</h2>
                        <p className="text-muted-foreground mb-6">
                            The information on the Website is provided for your convenience only and is not intended to be treated as financial, investment, tax, or other advice. Nothing contained on the Website constitutes a solicitation, recommendation, endorsement, or offer by HenryHarrison.com, its agents, employees, contractors, and any affiliated companies to buy or sell any securities or other financial instruments.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Reviews and Testimonials</h2>
                        <p className="text-muted-foreground mb-6">
                            Testimonials are received in various forms through a variety of submission methods. The testimonials are not necessarily representative of all of those who will use Website and Services, and HenryHarrison.com is not responsible for the opinions or comments available on the Website, and does not necessarily share them. All opinions expressed are strictly the views of the reviewers.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Indemnification and Warranties</h2>
                        <p className="text-muted-foreground mb-6">
                            While we have made every attempt to ensure that the information contained on the Website is correct, HenryHarrison.com is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information on the Website is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied. In no event will HenryHarrison.com, or its partners, employees or agents, be liable to you or anyone else for any decision made or action taken in reliance on the information on the Website, or for any consequential, special or similar damages, even if advised of the possibility of such damages.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Changes and Amendments</h2>
                        <p className="text-muted-foreground mb-6">
                            We reserve the right to modify this Disclaimer or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Acceptance of This Disclaimer</h2>
                        <p className="text-muted-foreground mb-6">
                            You acknowledge that you have read this Disclaimer and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Disclaimer. If you do not agree to abide by the terms of this Disclaimer, you are not authorized to access or use the Website and Services.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contacting Us</h2>
                        <p className="text-muted-foreground">
                            If you have any questions, concerns, or complaints regarding this Disclaimer, we encourage you to contact us using the details below:<br /><br />
                            <a href="mailto:hoharrison@sbcglobal.net" className="text-primary hover:underline">hoharrison@sbcglobal.net</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
