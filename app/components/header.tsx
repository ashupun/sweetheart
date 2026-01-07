"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
    title: string;
    username?: string;
}

export function Header({ title, username }: HeaderProps) {
    return (
        <header className="sticky top-0 z-20 bg-[#fdf5f3]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
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

