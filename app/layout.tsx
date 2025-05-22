import { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/context/theme-context";
export const metadata: Metadata = {
  title: "Wrytrai – AI-Powered Notes App",
  description: "Write smarter, stay focused, and organize your thoughts with Wrytrai – your intelligent note-taking assistant.",
  keywords: ["AI notes", "note taking app", "Wrytrai", "productivity", "writing assistant", "smart notes", "distraction-free writing"],
  authors: [{ name: "Mustafa Bulut", url: "https://wrytrai.vercel.app" }],
  creator: "Mustafa Bulut",
  metadataBase: new URL("https://wrytrai.vercel.app"),
  openGraph: {
    title: "Wrytrai – AI-Powered Notes App",
    description: "Write, organize, and think clearly with AI-enhanced note-taking.",
    url: "https://wrytrai.vercel.app",
    siteName: "Wrytrai",
    images: [
      {
        url: "/og-image.png", // make sure this exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Wrytrai – AI-Powered Notes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrytrai – AI-Powered Notes App",
    description: "Wrytrai helps you write smarter, stay focused, and organize your thoughts with AI.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const saved = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Importing DM Sans font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
