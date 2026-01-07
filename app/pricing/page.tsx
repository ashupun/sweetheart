"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
      <nav className="h-[57px] px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/sweethearticon.png" alt="" width={18} height={18} />
          <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
            sweethe<span className="text-pink-500">.</span>art
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/docs" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">docs</Link>
          <Link href="/login" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">login</Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">
            pricing
          </h1>
          <p className="text-sm text-gray-400">
            start free, upgrade when you want more ♡
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">free</h2>
                <p className="text-xs text-gray-400">for everyone</p>
              </div>
              <span className="text-2xl font-bold text-[#1a1a1a] dark:text-white">$0</span>
            </div>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <p>• unlimited links</p>
              <p>• 6 templates</p>
              <p>• 9 color themes</p>
              <p>• custom bio & display name</p>
              <p>• social icons</p>
              <p>• basic analytics</p>
            </div>
            <Link
              href="/signup"
              className="block w-full py-3 text-center text-sm border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-pink-500 hover:border-pink-500 transition-colors"
            >
              get started
            </Link>
          </div>

          <div className="p-6 border border-pink-500 relative">
            <span className="absolute -top-2.5 left-4 px-2 bg-[#fdf5f3] dark:bg-[#1a1a1a] text-[10px] text-pink-500">
              recommended
            </span>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-sm font-medium text-pink-500">pro</h2>
                <p className="text-xs text-gray-400">for power users</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-pink-500">$5</span>
                <span className="text-xs text-gray-400">/mo</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <p>• everything in free</p>
              <p>• custom background images</p>
              <p>• profile music player</p>
              <p>• animated backgrounds</p>
              <p>• pro templates</p>
              <p>• custom fonts</p>
              <p>• remove branding</p>
              <p>• priority support</p>
            </div>
            <button className="w-full py-3 text-center text-sm bg-pink-500 text-white hover:bg-pink-600 transition-colors">
              upgrade to pro ♡
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-2">faq</h3>
          </div>
          <details className="group">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-pink-500 transition-colors">
              can i cancel anytime?
            </summary>
            <p className="mt-2 text-xs text-gray-400 pl-4">
              yes! no contracts, cancel whenever you want. you keep pro until the end of your billing period.
            </p>
          </details>
          <details className="group">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-pink-500 transition-colors">
              what payment methods do you accept?
            </summary>
            <p className="mt-2 text-xs text-gray-400 pl-4">
              we accept all major credit cards through stripe. secure and encrypted.
            </p>
          </details>
          <details className="group">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-pink-500 transition-colors">
              is there a yearly plan?
            </summary>
            <p className="mt-2 text-xs text-gray-400 pl-4">
              coming soon! yearly plans will save you 2 months ($50/year instead of $60).
            </p>
          </details>
        </div>

        <p className="text-center text-xs text-gray-400 mt-12">
          questions? <a href="mailto:hi@sweethe.art" className="text-pink-500 hover:text-pink-400">hi@sweethe.art</a>
        </p>
      </main>
    </div>
  );
}
