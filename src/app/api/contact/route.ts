import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Zoho SMTP configuration
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});

// Beautiful branded thank you email template
const getThankYouEmailHTML = (firstName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Henry Harrison</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B3E50 0%, #164E63 100%); padding: 50px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                Henry Harrison
                            </h1>
                            <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                                Entrepreneurs • Business • Finance
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px; color: #0B3E50; font-size: 28px; font-weight: 600;">
                                Thank You, ${firstName}! 🎉
                            </h2>
                            <p style="margin: 0 0 20px; color: #4a5568; font-size: 16px; line-height: 1.7;">
                                We've received your message and truly appreciate you reaching out. Your interest in connecting with us means a lot.
                            </p>
                            <p style="margin: 0 0 30px; color: #4a5568; font-size: 16px; line-height: 1.7;">
                                We'll review your message and get back to you within <strong style="color: #0B3E50;">24-48 hours</strong>. In the meantime, feel free to explore our podcast episodes!
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://henryharrison.com/podcast" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0B3E50 0%, #164E63 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 50px; letter-spacing: 0.5px;">
                                            Listen to the Podcast →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;">
                        </td>
                    </tr>
                    
                    <!-- Social Links -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 15px; color: #718096; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                Connect With Us
                            </p>
                            <table role="presentation" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 8px;">
                                        <a href="https://www.youtube.com/@HenryHarrison-DallasTexas" style="display: inline-block; width: 40px; height: 40px; background-color: #0B3E50; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 14px;">
                                            ▶
                                        </a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="https://www.linkedin.com/in/henryharrisondallas/" style="display: inline-block; width: 40px; height: 40px; background-color: #0B3E50; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 14px;">
                                            in
                                        </a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN" style="display: inline-block; width: 40px; height: 40px; background-color: #0B3E50; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 14px;">
                                            ♪
                                        </a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178" style="display: inline-block; width: 40px; height: 40px; background-color: #0B3E50; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 14px;">
                                            🎧
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 5px; color: #0B3E50; font-weight: 600; font-size: 14px;">
                                Henry Harrison | Dallas, Texas
                            </p>
                            <p style="margin: 0 0 15px; color: #718096; font-size: 13px;">
                                17290 Preston Road #300 B2, Dallas, TX 75252
                            </p>
                            <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                © ${new Date().getFullYear()} Henry Harrison. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// Plain text version of thank you email
const getThankYouEmailText = (firstName: string) => `
Thank You, ${firstName}!

We've received your message and truly appreciate you reaching out. Your interest in connecting with us means a lot.

We'll review your message and get back to you within 24-48 hours. In the meantime, feel free to explore our podcast episodes!

Visit our podcast: https://henryharrison.com/podcast

Connect with us:
- YouTube: https://www.youtube.com/@HenryHarrison-DallasTexas
- LinkedIn: https://www.linkedin.com/in/henryharrisondallas/
- Spotify: https://open.spotify.com/show/06nY21wPva7YHFoYr9KtYN
- Apple Podcasts: https://podcasts.apple.com/us/podcast/henry-harrison-podcast-dallas-texas/id1777477178

---
Henry Harrison | Dallas, Texas
17290 Preston Road #300 B2, Dallas, TX 75252

© ${new Date().getFullYear()} Henry Harrison. All rights reserved.
`;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, subject, message } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Email to Henry (notification)
        const notificationEmail = {
            from: process.env.ZOHO_EMAIL,
            to: "podcast@henryharrison.com",
            replyTo: email,
            subject: subject || `New Contact Form Submission from ${firstName} ${lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0B3E50; border-bottom: 2px solid #0B3E50; padding-bottom: 10px;">📬 New Contact Form Submission</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; width: 120px;">Name</td>
                            <td style="padding: 12px; background: #f8f9fa;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold;">Email</td>
                            <td style="padding: 12px;"><a href="mailto:${email}" style="color: #0B3E50;">${email}</a></td>
                        </tr>
                        ${phone ? `
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold;">Phone</td>
                            <td style="padding: 12px; background: #f8f9fa;"><a href="tel:${phone}" style="color: #0B3E50;">${phone}</a></td>
                        </tr>
                        ` : ""}
                        ${subject ? `
                        <tr>
                            <td style="padding: 12px; font-weight: bold;">Subject</td>
                            <td style="padding: 12px;">${subject}</td>
                        </tr>
                        ` : ""}
                    </table>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <h3 style="margin: 0 0 15px; color: #0B3E50;">Message:</h3>
                        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; font-size: 12px; text-align: center;">
                        Sent from henryharrison.com contact form • ${new Date().toLocaleString()}
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${subject ? `Subject: ${subject}` : ""}

Message:
${message}

---
Sent from henryharrison.com contact form
            `,
        };

        // Thank you email to the user
        const thankYouEmail = {
            from: process.env.ZOHO_EMAIL,
            to: email,
            subject: `Thank You for Reaching Out, ${firstName}! 🎙️`,
            html: getThankYouEmailHTML(firstName),
            text: getThankYouEmailText(firstName),
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(notificationEmail),
            transporter.sendMail(thankYouEmail),
        ]);

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
