import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

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
        <main className={inter.className}>

          {children}
        </main>
      </body>
    </html>
  );
}
