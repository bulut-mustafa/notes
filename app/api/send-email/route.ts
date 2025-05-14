import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mustafaistela@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD, // store securely in .env
        },
    });

    const mailOptions = {
        from: "mustafaistela@gmail.com",
        to: "mustafaiste@outlook.com",
        subject: `[SUPPORT] ${subject}`,
        html: `
            <div style="font-family:sans-serif; padding:10px;">
                <h2 style="color:#937b70;">New Support Request</h2>
                <p><strong>From:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background:#f9f9f9; padding:10px; border-left:4px solid #937b70;">
                    ${message.replace(/\n/g, "<br/>")}
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
