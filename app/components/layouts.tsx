"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
            <nav className="h-[57px] px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/sweethearticon.png" alt="" width={18} height={18} />
                    <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                        sweethe<span className="text-pink-500">.</span>art
                    </span>
                </Link>
                <ThemeToggle />
            </nav>
            <main className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-57px)]">
                {children}
            </main>
        </div>
    );
}

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
            {children}
        </div>
    );
}
