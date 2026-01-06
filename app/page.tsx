"use client";

import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blob top right */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full blur-3xl opacity-60 animate-float-slow" />

        {/* Medium blob left */}
        <div className="absolute top-1/3 -left-32 w-72 h-72 bg-gradient-to-tr from-pink-200 to-pink-300 rounded-full blur-2xl opacity-50 animate-float" />

        {/* Small blob bottom right */}
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-bl from-pink-300 to-pink-400 rounded-full blur-2xl opacity-40 animate-float-delayed" />

        {/* Tiny decorative circles */}
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-float" />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-300 rounded-full opacity-50 animate-float-delayed" />
        <div className="absolute bottom-1/3 right-1/2 w-5 h-5 bg-pink-400 rounded-full opacity-40 animate-float-slow" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link
          href="/"
          className="text-2xl font-bold gradient-text font-display"
        >
          sweetheart
        </Link>

        <div className="hidden md:flex items-center gap-8 text-pink-800">
          <Link
            href="/"
            className="hover:text-pink-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="hover:text-pink-600 transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-pink-600 transition-colors font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="hover:text-pink-600 transition-colors font-medium"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden sm:block px-5 py-2 text-pink-700 font-medium hover:text-pink-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 btn-primary text-white font-medium rounded-full"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-900 leading-tight mb-6 font-display">
            Share Your
            <span className="block gradient-text">Sweet Links</span>
          </h1>

          <p className="text-lg md:text-xl text-pink-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create your dreamy link-in-bio page in minutes. Perfect for content
            creators, gamers, small business owners, and anyone who loves pink!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 btn-primary text-white font-semibold rounded-full text-lg flex items-center gap-2"
            >
              Get Started Free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <Link
              href="#demo"
              className="px-8 py-4 btn-secondary text-pink-700 font-semibold rounded-full text-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Quick Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="glass rounded-3xl p-6 link-card">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-pink-900 mb-2 font-display">
              Cute Themes
            </h3>
            <p className="text-pink-700">
              Choose from adorable pink themes, kawaii styles, and aesthetic
              designs made just for you.
            </p>
          </div>

          <div className="glass rounded-3xl p-6 link-card">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-pink-900 mb-2 font-display">
              Super Easy
            </h3>
            <p className="text-pink-700">
              Set up your page in under 5 minutes. No coding required, just
              drag, drop, and customize!
            </p>
          </div>

          <div className="glass rounded-3xl p-6 link-card">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-pink-900 mb-2 font-display">
              Stand Out
            </h3>
            <p className="text-pink-700">
              Analytics, custom domains, and special effects to make your
              profile shine bright!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4 font-display">
              Everything You Need to Shine
            </h2>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto">
              Packed with features designed for creators who want their profile
              to be as unique as they are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Custom Themes
              </h3>
              <p className="text-pink-700">
                Choose from 20+ adorable themes or create your own with custom
                colors, fonts, and backgrounds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Analytics Dashboard
              </h3>
              <p className="text-pink-700">
                Track clicks, views, and engagement with beautiful charts. Know
                your audience better!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Custom Domain
              </h3>
              <p className="text-pink-700">
                Use your own domain name for a professional look. yourname.com
                instead of our link!
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Video & Music Embeds
              </h3>
              <p className="text-pink-700">
                Embed YouTube videos, Spotify playlists, and TikToks directly on
                your page.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Mobile Optimized
              </h3>
              <p className="text-pink-700">
                Your page looks perfect on any device. Optimized for the
                platforms your audience uses most.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-3 font-display">
                Animations & Effects
              </h3>
              <p className="text-pink-700">
                Add sparkles, floating hearts, and cute animations to make your
                page magical!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-4">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4 font-display">
              Simple, Sweet Pricing
            </h2>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto">
              Start free and upgrade when you&apos;re ready. No hidden fees,
              cancel anytime!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-pink-900 mb-2 font-display">
                  Starter
                </h3>
                <p className="text-pink-600 mb-4">Perfect for trying out</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-pink-900 font-display">
                    $0
                  </span>
                  <span className="text-pink-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Up to 5 links
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  3 basic themes
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Basic analytics
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sweetheart branding
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full py-3 text-center btn-secondary rounded-xl font-semibold text-pink-700"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative pt-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-white text-sm font-medium shadow-lg">
                Most Popular
              </div>
              <div className="glass rounded-3xl p-8 link-card border-2 border-pink-400 bg-white/40">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-pink-900 mb-2 font-display">
                    Pro
                  </h3>
                  <p className="text-pink-600 mb-4">For serious creators</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-pink-900 font-display">
                      $9
                    </span>
                    <span className="text-pink-600">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited links
                  </li>
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    All 20+ themes
                  </li>
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove branding
                  </li>
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Animations & effects
                  </li>
                  <li className="flex items-center gap-3 text-pink-800">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority support
                  </li>
                </ul>

                <Link
                  href="/signup"
                  className="block w-full py-3 text-center btn-primary rounded-xl font-semibold text-white"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div className="glass rounded-3xl p-8 link-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-pink-900 mb-2 font-display">
                  Business
                </h3>
                <p className="text-pink-600 mb-4">For teams & brands</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-pink-900 font-display">
                    $29
                  </span>
                  <span className="text-pink-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Custom domain
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Team collaboration
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  API access
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  White-label option
                </li>
                <li className="flex items-center gap-3 text-pink-800">
                  <svg
                    className="w-5 h-5 text-pink-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dedicated support
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full py-3 text-center btn-secondary rounded-xl font-semibold text-pink-700"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About/CTA Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-6 font-display">
            Ready to Create Your Dream Page?
          </h2>
          <p className="text-lg text-pink-700 mb-10 max-w-2xl mx-auto">
            Join over 10,000+ creators, gamers, and business owners who&apos;ve
            made their link-in-bio absolutely adorable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 btn-primary text-white font-semibold rounded-full text-lg flex items-center gap-2"
            >
              Start for Free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <p className="text-pink-600 text-sm">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-pink-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="text-2xl font-bold gradient-text font-display"
              >
                sweetheart
              </Link>
              <p className="text-pink-600 mt-2 text-sm">
                The cutest link-in-bio for dreamers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-pink-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#about"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-pink-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-pink-200 text-center text-pink-600 text-sm">
            <p>&copy; 2025 Sweetheart. Made with love for dreamers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
