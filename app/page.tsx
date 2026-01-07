"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { useSession } from "@/lib/client";

export default function Home() {
  const { data: session } = useSession();
  const [entered, setEntered] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = "sweethe.art/you";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") setEntered(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (entered && typed.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTyped(fullText.slice(0, typed.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [entered, typed]);

  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white font-mono selection:bg-pink-200 dark:selection:bg-pink-500/30 transition-colors">
      <div className="scanlines" />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="grid grid-cols-3 items-center max-w-6xl mx-auto text-xs tracking-wide">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/sweethearticon.png" alt="sweetheart" width={20} height={20} className="rounded" />
              <span className="font-medium hidden sm:inline">sweethe.art</span>
            </Link>
            <Link href="/pricing" className="text-gray-500 hover:text-pink-500 transition-colors hidden sm:block">pricing</Link>
            <Link href="/docs" className="text-gray-500 hover:text-pink-500 transition-colors hidden sm:block">docs</Link>
          </div>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-end gap-6">
            {session?.user ? (
              <Link href="/dashboard" className="text-pink-500 hover:text-pink-400 transition-colors">
                @{session.user.name} ↗
              </Link>
            ) : (
              <>
                <Link href="/login" className="hover:text-pink-500 transition-colors">login</Link>
                <Link href="/signup" className="text-pink-500 hover:text-pink-400 transition-colors">waitlist ✨</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400">
            Once upon a time, she needed
          </p>

          <h1 className="text-[12vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter mb-12">
            <span className="terminal-text">ONE</span>
            <br />
            <span className="terminal-text">LINK</span>
          </h1>

          <div className="h-16">
            {!entered ? (
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="px-2 py-1 bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded text-xs font-medium">enter</span>
                <span className="text-gray-500 dark:text-gray-500">to continue</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-pink-500">→</span> {typed}
                  <span className="animate-pulse">_</span>
                </div>

                {typed === fullText && (
                  <div className="animate-fade-in">
                    {session?.user ? (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm hover:text-pink-500 transition-colors"
                      >
                        go to dashboard ↗
                      </Link>
                    ) : (
                      <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        coming soon ✨
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="flex items-end justify-between max-w-6xl mx-auto">
            <div className="text-xs text-gray-400 dark:text-gray-600 space-y-1">
              <p>the link-in-bio for girls who code</p>
              <p>and girls who don&apos;t</p>
            </div>

            <div className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-3">
              <span className="text-pink-400">coming soon</span>
              <a href="https://x.com/ashubun" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">twitter ↗</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
