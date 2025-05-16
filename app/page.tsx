import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      {/* Header */}
      <header className="w-full max-w-6xl py-8 flex justify-between items-center">
        <Link href={'/'}
          className="text-2xl md:text-5xl font-extrabold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Wrytrai
        </Link>
        <nav className="">
          <Link href="#features" className="text-gray-700 hover:text-[#937b70] hover:text-[#7f675f] mx-2 md:mx-4">
            Features
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-[#937b70] hover:text-[#7f675f] mx-2 md:mx-4">
            About
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-[#937b70] hover:text-[#7f675f] mx-2 md:mx-4">
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center max-w-6xl my-12 gap-10">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Write smarter.<br /> Organize better.
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
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mt-2 text-lg text-gray-600">
            Everything you need to write, think, and stay focused—all in one place.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-[#f8c89d] rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">AI-Powered Writing</h4>
              <p className="mt-2 text-gray-600">
                Get intelligent suggestions and structure your thoughts with the help of AI.
              </p>
            </div>
            <div className="p-8 bg-[#f8c89d] rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">Distraction-Free Focus Mode</h4>
              <p className="mt-2 text-gray-600">
                Enter a clean workspace designed to minimize interruptions and help you stay in the flow.
              </p>
            </div>
            <div className="p-8 bg-[#f8c89d] rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-[#937b70] hover:text-[#7f675f]">Smart Organization</h4>
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
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Wrytrai?</h3>
            <p className="text-lg text-gray-600">
              I built Wrytrai to help creators, thinkers, and lifelong learners write faster and think deeper. Whether you’re jotting down thoughts or drafting full articles, Wrytrai has your back—with AI support and seamless structure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#f8c89d] py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Wrytrai. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
