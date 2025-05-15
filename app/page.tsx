import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      {/* Header */}
      <header className="w-full max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Wrytrai
        </h1>
        <nav className="mt-4 md:mt-0">
          <Link href="#features" className="text-gray-700 hover:text-indigo-600 mx-4">
            Features
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-indigo-600 mx-4">
            About
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-indigo-600 mx-4">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center max-w-6xl my-12 gap-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Write smarter.<br /> Organize better.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Wrytrai is your AI-powered note-taking companion—combining seamless organization with intelligent suggestions and real-time news insights.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Placeholder for Hero Illustration */}
        <div className="flex-1 bg-gray-100 w-full h-64 md:h-96 rounded-lg shadow-inner flex items-center justify-center">
          <span className="text-gray-400 text-xl">[ Hero Illustration Placeholder ]</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900">Powerful Features</h3>
          <p className="mt-2 text-lg text-gray-600">
            Everything you need to write, think, and stay informed—all in one place.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-indigo-600">AI-Powered Writing</h4>
              <p className="mt-2 text-gray-600">
                Get intelligent suggestions and structure your thoughts with the help of AI.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-indigo-600">Real-Time News Feed</h4>
              <p className="mt-2 text-gray-600">
                Stay up to date without leaving your notes—news and insights in one place.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-indigo-600">Smart Organization</h4>
              <p className="mt-2 text-gray-600">
                Intuitively tag, sort, archive, and search notes for a clutter-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Placeholder */}
      <section id="about" className="w-full max-w-6xl py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 bg-gray-100 w-full h-64 md:h-96 rounded-lg shadow-inner flex items-center justify-center">
            <span className="text-gray-400 text-xl">[ About Illustration Placeholder ]</span>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Wrytrai?</h3>
            <p className="text-lg text-gray-600">
              We built Wrytrai to help creators, thinkers, and lifelong learners write faster and think deeper. Whether you’re jotting down thoughts or drafting full articles, Wrytrai has your back—with AI support and seamless structure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Wrytrai. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
