import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AcceptableUsePage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-32 md:py-40 bg-primary text-primary-foreground">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium">Acceptable Use Policy</h1>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="w-full px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Acceptable Use Policy</h2>
                        <p className="text-muted-foreground mb-6">
                            This acceptable use policy ("Policy") sets forth the general guidelines and acceptable and prohibited uses of the https://henryharrison.com/ website ("Website" or "Service") and any of its related products and services (collectively, "Services"). This Policy is a legally binding agreement between you ("User", "you" or "your") and HenryHarrison.com ("HenryHarrison.com", "we", "us" or "our"). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms "User", "you" or "your" shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and HenryHarrison.com, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Prohibited Activities and Uses</h2>
                        <p className="text-muted-foreground mb-6">
                            You may not use the Website and Services to engage in activity that is illegal under applicable law, that is harmful to others, or that would subject us to liability, including, without limitation, in connection with any of the following, each of which is prohibited under this Policy:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Distributing malware or other malicious code</li>
                            <li>Disclosing sensitive personal information about others</li>
                            <li>Collecting personal information about third parties without their consent</li>
                            <li>Engaging in any activity that interferes with or disrupts the Services</li>
                            <li>Attempting to gain unauthorized access to any portion of the Website</li>
                        </ul>
                        <p className="text-muted-foreground mb-6">
                            Any User in violation of the Website and Services security is subject to criminal and civil liability, as well as immediate account termination.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            You may not consume excessive amounts of the resources of the Website and Services or use the Website and Services in any way which results in performance issues or which interrupts the Services for other Users.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">No Spam Policy</h2>
                        <p className="text-muted-foreground mb-6">
                            You may not use the Website and Services to send spam or bulk unsolicited messages. We maintain a zero-tolerance policy for use of the Website and Services in any manner associated with the transmission, distribution or delivery of any bulk e-mail, including unsolicited bulk or unsolicited commercial e-mail, or the sending, assisting, or commissioning the transmission of commercial e-mail that does not comply with the U.S. CAN-SPAM Act of 2003 ("SPAM").
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Copyright Infringement</h2>
                        <p className="text-muted-foreground mb-6">
                            Copyrighted material must not be published via the Website and Services without the explicit permission of the copyright owner or a person explicitly authorized to give such permission by the copyright owner. Upon receipt of a claim for copyright infringement, or a notice of such violation, we may, at our discretion, run an investigation and, upon confirmation, may remove the infringing material from the Website and Services. We may terminate the Service of Users with repeated copyright infringements. Further procedures may be carried out if necessary. We will assume no liability to any User of the Website and Services for the removal of any such material. If you believe your copyright is being infringed by a person or persons using the Website and Services, please get in touch with us to report copyright infringement.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Enforcement</h2>
                        <p className="text-muted-foreground mb-6">
                            We reserve the right to be the sole arbiter in determining the seriousness of each infringement and to immediately take corrective actions, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                            <li>Suspending or terminating your Service with or without notice upon any violation of this Policy. Any violations may also result in the immediate suspension or termination of your account.</li>
                            <li>Disabling or removing any content which is prohibited by this Policy, including to prevent harm to others or to us or the Website and Services, as determined by us in our sole discretion.</li>
                        </ul>
                        <p className="text-muted-foreground mb-6">
                            Suspended and terminated User accounts due to violations will not be re-activated.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            Nothing contained in this Policy shall be construed to limit our actions or remedies in any way with respect to any of the prohibited activities. We reserve the right to take any and all additional actions we may deem appropriate with respect to such activities, including without limitation taking action to recover the costs and expenses of identifying offenders and removing them from the Website and Services, and levying cancellation charges to cover our costs. In addition, we reserve at all times all rights and remedies available to us with respect to such activities at law or in equity.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Reporting Violations</h2>
                        <p className="text-muted-foreground mb-6">
                            If you have discovered and would like to report a violation of this Policy, please contact us immediately. We will investigate the situation and provide you with full assistance.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Changes and Amendments</h2>
                        <p className="text-muted-foreground mb-6">
                            We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided. An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Acceptance of This Policy</h2>
                        <p className="text-muted-foreground mb-6">
                            You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services.
                        </p>

                        <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">Contacting Us</h2>
                        <p className="text-muted-foreground">
                            If you have any questions, concerns, or complaints regarding this Policy, we encourage you to contact us using the details below:<br /><br />
                            <a href="mailto:hoharrison@sbcglobal.net" className="text-primary hover:underline">hoharrison@sbcglobal.net</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
