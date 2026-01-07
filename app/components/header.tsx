"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
    title: string;
    username?: string;
    maxWidth?: "2xl" | "4xl";
}

export function Header({ title, username, maxWidth = "2xl" }: HeaderProps) {
    return (
        <header className="sticky top-0 z-20 bg-[#fdf5f3]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className={`flex items-center justify-between mx-auto ${maxWidth === "4xl" ? "max-w-4xl" : "max-w-2xl"}`}>
                <div className="lg:hidden">
                    <Link href="/" className="text-lg font-bold text-[#1a1a1a] dark:text-white">
                        sweethe<span className="text-pink-500">.</span>art
                    </Link>
                </div>
                <h1 className="text-sm text-gray-500 dark:text-gray-400 hidden lg:block">{title}</h1>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {username && (
                        <a href={`/${username}`} target="_blank" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                            preview ↗
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

