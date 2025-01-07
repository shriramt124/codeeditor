import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to CodeRun Pro</h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Empowering developers to write, test, and execute code seamlessly from your browser.
          Explore a variety of programming languages and dive into the world of coding.
        </p>
      </header>

      {/* Call-to-Action Section */}
      <div className="flex flex-col items-center gap-6">
        <Link href="/editor" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/50">
           
            Start Coding Now
           
        </Link>

        <p className="text-gray-400 text-sm">
          No setup required. Just code and execute instantly.
        </p>
      </div>

      {/* Features Section */}
      <section className="mt-20 grid gap-8 sm:grid-cols-3 text-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Multi-Language Support</h3>
          <p className="text-gray-400 text-sm">
            Write and run code in Python, Java, C++, JavaScript, and more.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Real-Time Execution</h3>
          <p className="text-gray-400 text-sm">
            Execute your code in real-time with our fast and reliable engine.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Beginner-Friendly</h3>
          <p className="text-gray-400 text-sm">
            Simple and intuitive interface designed for all skill levels.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CodeRun Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
