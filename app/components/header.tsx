"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
    title: string;
    username?: string;
}

export function Header({ title, username }: HeaderProps) {
    return (
        <header className="sticky top-0 z-20 h-[57px] bg-[#fdf5f3]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 flex items-center">
            <div className="flex items-center justify-between w-full">
                <div className="lg:hidden">
                    <Link href="/" className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                        sweethe<span className="text-pink-500">.</span>art
                    </Link>
                </div>
                <p className="text-sm text-gray-400 hidden lg:block">{title}</p>
                <div className="flex items-center gap-4">
                    {username && (
                        <a href={`/${username}`} target="_blank" className="text-xs text-pink-500 hover:text-pink-400 transition-colors hidden sm:block">
                            preview ↗
                        </a>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
