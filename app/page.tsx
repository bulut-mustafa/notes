import Link from "next/link";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wrytrai – Think Deeper, Write Smarter",
  description: "AI-powered notes app for creators, thinkers, and lifelong learners. Organize your thoughts, write faster, and focus better with Wrytrai.",
  keywords: [
    "Wrytrai", "AI note app", "smart note taking", "productivity tool", "writing assistant", "notes with AI", "organize thoughts", "note-taking app"
  ],
  openGraph: {
    title: "Wrytrai – Think Deeper, Write Smarter",
    description: "Your intelligent writing companion. Write faster, organize better, and think deeper with AI-powered note-taking.",
    url: "https://wrytrai.vercel.app",
    siteName: "Wrytrai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wrytrai App Screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrytrai – AI Note Taking App",
    description: "Wrytrai helps you write smarter and stay focused using AI-enhanced features.",
    images: ["/og-image.png"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      {/* Header */}
      <header className="w-full max-w-6xl py-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-5xl font-extrabold"
          style={{ fontFamily: '"DM Serif Display", serif', color: "#856559" }}
        >
          Wrytrai
        </Link>
        <nav>
          <a href="#features" className="text-gray-700 hover:text-[#7f675f] mx-2 md:mx-4">
            Features
          </a>
          <a href="#about" className="text-gray-700 hover:text-[#7f675f] mx-2 md:mx-4">
            About
          </a>
          <Link href="/login" className="text-gray-700 hover:text-[#7f675f] mx-2 md:mx-4">
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center my-8 gap-10">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Think deeper. Write
            <FlipWords words={['brighter', 'faster', 'clearer', 'smarter', 'bolder', 'better']} />
          </h2>
          <p className="mt-4 text-md md:lg text-gray-600">
            Wrytrai is your AI-powered note-taking companion—combining seamless organization with intelligent suggestions.
          </p>
          <Link
            href="/signup"
            className="mt-4 md:mt-8 inline-block px-4 md:px-8 py-2 md:py-3 bg-[#937b70] text-white text-md md:text-lg font-semibold rounded-lg shadow-md hover:bg-[#7f675f] transition"
          >
            Get Started
          </Link>
        </div>
        <div className="flex-1">
          <Image
            src="/signup-illustration.svg"
            alt="Hero Image"
            className="w-full max-w-md mx-auto"
            width={500}
            height={500}
            priority
          />
        </div>
      </section>

      {/* App Screenshot Display */}
      <section className="w-full my-12">
        <div className="max-w-6xl mx-auto flex items-center gap-10">

          {/* Laptop Screenshot */}
          <div className="w-full shadow-2xl rounded-md overflow-hidden">
            <Image
              src="/laptop-screen.png"
              alt="Laptop Screenshot"
              width={800}
              height={600}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>






      {/* Features Section */}
      <section id="features" className="w-full py-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mt-2 text-lg text-gray-600">
            Everything you need to write, think, and stay focused—all in one place.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/buttons/sparkles.svg"
                  alt="AI Writing"
                  width={32}
                  height={32}
                  className=""
                />
                <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">AI-Powered Writing</h4>
              </div>
              <p className="mt-2 text-gray-600">
                Get intelligent suggestions and structure your thoughts with the help of AI.
              </p>
            </div>
            <div className="p-4 ">
              <div className="flex items-center gap-2">
                <Image
                  src="/tag.svg"
                  alt="Tagging"
                  width={32}
                  height={32}
                  className=""
                />
                <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">Smart Organization</h4>
              </div>
              <p className="mt-2 text-gray-600">
                Intuitively tag, pin, sort, archive, and search notes for a clutter-free experience.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/info.svg"
                  alt="Information"
                  width={32}
                  height={32}
                  className=""
                />
                <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">It&apos;s free</h4>
              </div>
              <p className="mt-2 text-gray-600">
                It&apos;s completely free to use. No hidden fees, no subscriptions, just pure writing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full max-w-6xl py-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why
              <span style={{ fontFamily: '"DM Serif Display", serif', color: "#856559" }}> Wrytrai?</span>
            </h3>
            <p className="text-lg text-gray-600">
              I built Wrytrai to help creators, thinkers, and lifelong learners write faster and think deeper. Whether you’re jotting down thoughts or drafting full articles, Wrytrai has your back—with AI support and seamless structure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 mt-auto">
        <div className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Wrytrai. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
