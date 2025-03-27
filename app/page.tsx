import Link from "next/link";
import Image from "next/image";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-6">
      {/* Header */}
      <header className="w-full max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">NoteMaster</h1>
        <nav className="mt-4 md:mt-0">
          <Link href="#features" className="text-gray-700 hover:text-indigo-600 mx-4">Features</Link>
          <Link href="#download" className="text-gray-700 hover:text-indigo-600 mx-4">Download</Link>
          <Link href="#contact" className="text-gray-700 hover:text-indigo-600 mx-4">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center max-w-6xl my-12">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Take Your Notes to the Next Level
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A smart, AI-powered notes app that integrates real-time news and helps you stay organized effortlessly.
          </p>
          <Link href={'/signup'} className="mt-8 px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition">
            Get Started
          </Link>
        </div>
        <div className="flex-1 mt-8 md:mt-0">
          <Image
            src="/images/notes-app-mockup.png"
            alt="Notes app mockup"
            width={600}
            height={400}
            className="w-full rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800">Features</h3>
          <p className="mt-2 text-lg text-gray-600">
            Everything you need to stay organized, inspired, and in the loop.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-indigo-600">AI-Powered Insights</h4>
              <p className="mt-2 text-gray-600">
                Intelligent suggestions to help you write and organize smarter.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-indigo-600">Real-Time News</h4>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest news directly integrated into your workflow.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-indigo-600">Seamless Organization</h4>
              <p className="mt-2 text-gray-600">
                Tag, categorize, and search your notes with an intuitive, modern interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} NoteMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
