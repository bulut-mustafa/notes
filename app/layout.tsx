import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wrytrai - AI-Powered Notes App",
  description: "Write, organize, and get smarter with Wrytrai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Importing Poppins font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
