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
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white font-mono transition-colors">
      <nav className="h-[57px] px-6 flex items-center justify-between border-b border-transparent">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sweethearticon.png" alt="" width={18} height={18} />
            <span className="text-sm font-medium hidden sm:inline">sweethe.art</span>
          </Link>
          <Link href="/pricing" className="text-xs text-gray-400 hover:text-pink-500 transition-colors hidden sm:block">pricing</Link>
          <Link href="/docs" className="text-xs text-gray-400 hover:text-pink-500 transition-colors hidden sm:block">docs</Link>
        </div>
        <div className="flex items-center gap-6">
          {session?.user ? (
            <Link href="/dashboard" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
              @{session.user.name} ↗
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">login</Link>
              <Link href="/signup" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">waitlist</Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </nav>

      <main className="h-[calc(100vh-57px)] flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-6">
            once upon a time, she needed
          </p>

          <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter mb-8">
            <span>ONE</span>
            <br />
            <span>LINK</span>
          </h1>

          <div className="h-20">
            {!entered ? (
              <button
                onClick={() => setEntered(true)}
                className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
              >
                press <span className="px-1.5 py-0.5 bg-pink-100 dark:bg-pink-500/20 text-pink-500 rounded text-[10px]">enter</span> to continue
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  <span className="text-pink-500">→</span> {typed}
                  <span className="animate-pulse">_</span>
                </p>

                {typed === fullText && (
                  <div className="animate-fade-in">
                    {session?.user ? (
                      <Link href="/dashboard" className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
                        go to dashboard ↗
                      </Link>
                    ) : (
                      <Link href="/signup" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                        join the waitlist ♡
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 px-6 py-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <p className="hidden sm:block">the link-in-bio for girls who code (and girls who don&apos;t)</p>
          <div className="flex items-center gap-4">
            <span className="text-pink-500">coming soon</span>
            <a href="https://x.com/ashubun" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              twitter ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
