import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DMCAPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">DMCA Policy</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">DMCA Policy</h2>
                        <p className="text-muted-foreground mb-6">
                            This Digital Millennium Copyright Act policy ("Policy") applies to the https://henryharrison.com/ website ("Website" or "Service") and any of its related products and services (collectively, "Services") and outlines how HenryHarrison.com ("HenryHarrison.com", "we", "us" or "our") addresses copyright infringement notifications and how you ("you" or "your") may submit a copyright infringement complaint.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act ("DMCA") of 1998, the text of which can be found at the U.S. Copyright Office website.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">What to Consider Before Submitting a Copyright Complaint</h2>
                        <p className="text-muted-foreground mb-6">
                            Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            Please note that under 17 U.S.C. § 512(f), you may be liable for any damages, including costs and attorneys' fees incurred by us or our users, if you knowingly misrepresent that the material or activity is infringing. If you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            We may, at our discretion or as required by law, share a copy of your notification or counter-notification with third parties. This may include sharing the information with the account holder engaged in the allegedly infringing activity or for publication. If you are concerned about your information being forwarded, you may wish to use an agent to report infringing material for you.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Notifications of Infringement</h2>
                        <p className="text-muted-foreground mb-6">
                            If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification ("Notification") using the contact details below pursuant to the DMCA by providing us with the following information:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                            <li>Identification of the copyrighted work claimed to have been infringed</li>
                            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled</li>
                            <li>Information reasonably sufficient to permit us to locate the material</li>
                            <li>Your contact information, including your address, telephone number, and email address</li>
                            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Changes and Amendments</h2>
                        <p className="text-muted-foreground mb-6">
                            We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Reporting Copyright Infringement</h2>
                        <p className="text-muted-foreground">
                            If you would like to notify us of the infringing material or activity, we encourage you to contact us using the details below:<br /><br />
                            <a href="mailto:hoharrison@sbcglobal.net" className="text-primary hover:underline">hoharrison@sbcglobal.net</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
