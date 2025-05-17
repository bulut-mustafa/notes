// app/api/signup-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Missing email or name" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP config
      auth: {
        user: "mustafaistela@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // store securely in .env
      },
    });

    const mailOptions = {
      from: `"Wrytrai" <mustafaistela@gmail.com>`,
      to: email,
      subject: "Welcome to Wrytrai!",
      html: `
        <table style="max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; font-family: 'Segoe UI', sans-serif; background-color: #f9fafb;">
            <tr><td style="padding: 20px; text-align: center;">
            <h1 style="color: #3b82f6;">Welcome to <span style="color: #111827;">Wrytrai</span>, ${
                name.split(" ")[0]
            }!</h1>
            <p style="font-size: 16px; color: #374151;">
                You’re all set to start taking smart notes, organize your ideas, and let our AI assistant help you stay on track.
            </p>
            <a href="https://notes-app-8ee43.firebaseapp.com/notes" style="display: inline-block; margin-top: 20px; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                Go to Dashboard
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                If you have any questions or feedback, just reply to this email. We're happy to help!
            </p>
            <p style="font-size: 12px; color: #9ca3af;">– The Wrytrai Team</p>
            </td></tr>
        </table>
        `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
