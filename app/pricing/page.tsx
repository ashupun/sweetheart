"use client";

import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

const features = {
  free: [
    "unlimited links",
    "6 templates",
    "9 color themes",
    "custom bio & display name",
    "social icons",
    "basic analytics",
  ],
  pro: [
    "everything in free",
    "custom background images",
    "profile music player",
    "animated backgrounds",
    "priority support",
    "early access to new templates",
    "custom fonts",
    "remove sweetheart branding",
  ],
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#fdf5f3]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between max-w-5xl mx-auto text-xs tracking-wide">
          <Link href="/" className="font-medium text-[#1a1a1a] dark:text-white">
            sweethe<span className="text-pink-500">.</span>art
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-gray-500 hover:text-pink-500 transition-colors">docs</Link>
            <Link href="/login" className="text-gray-500 hover:text-pink-500 transition-colors">login</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white mb-4">
              simple pricing
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              start free, upgrade when you need more ♡
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#252525]">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-white mb-1">free</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">perfect to get started</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#1a1a1a] dark:text-white">$0</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/forever</span>
              </div>

              <ul className="space-y-3 mb-8">
                {features.free.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="block w-full py-3 text-center text-sm border border-gray-200 dark:border-gray-700 text-[#1a1a1a] dark:text-white rounded-xl hover:border-pink-500 hover:text-pink-500 transition-colors"
              >
                get started free
              </Link>
            </div>

            <div className="p-8 border-2 border-pink-500 rounded-2xl bg-white dark:bg-[#252525] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-500 text-white text-[10px] font-medium rounded-full">
                most popular
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-white mb-1">pro</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">for the girlies who want more</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-pink-500">$5</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {features.pro.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 text-center text-sm bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors">
                upgrade to pro ♡
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              questions? reach out at <a href="mailto:hi@sweethe.art" className="text-pink-500 hover:text-pink-400">hi@sweethe.art</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <span>© 2025 sweetheart</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-pink-500 transition-colors">docs</Link>
            <Link href="/pricing" className="hover:text-pink-500 transition-colors">pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

