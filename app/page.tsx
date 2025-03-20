export default function LandingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900 flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <header className="text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-800 drop-shadow-md">
            Organize Smarter, <span className="text-indigo-600">Think Better</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your AI-powered notes app that keeps you updated with real-time news insights and smart organization.
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition">
            Get Started
          </button>
        </header>
        
        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-indigo-700">AI-Powered Notes</h2>
            <p className="text-gray-600 mt-2">Get AI-driven suggestions and organization for seamless note-taking.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-indigo-700">News Integration</h2>
            <p className="text-gray-600 mt-2">Stay informed with real-time news insights directly in your workspace.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-indigo-700">Smart Organization</h2>
            <p className="text-gray-600 mt-2">Easily categorize and retrieve notes with an intuitive UI.</p>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-16 text-gray-500 text-sm">
          Made with ❤️ by Mustafa Bulut
        </footer>
      </div>
    );
  }
  