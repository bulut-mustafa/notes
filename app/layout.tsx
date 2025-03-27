import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteMaster - AI-Powered Notes App",
  description: "Organize, write, and get real-time insights with NoteMaster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>

          {children}
        </main>
      </body>
    </html>
  );
}
