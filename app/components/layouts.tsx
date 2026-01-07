"use client";

import Link from "next/link";
import { AnimatedLines, AnimatedCircles } from "./animated";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex font-mono">
            <div className="hidden lg:flex lg:w-1/2 bg-[#fdf5f3] dark:bg-[#1a1a1a] relative overflow-hidden transition-colors">
                <div className="absolute inset-0">
                    <div className="grid-pattern absolute inset-0 opacity-20" />
                    <AnimatedLines />
                    <AnimatedCircles />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/" className="text-xs text-gray-500 dark:text-gray-500 hover:text-pink-500 transition-colors">
                        ← back
                    </Link>
                    <div />
                    <div className="text-xs text-gray-500 dark:text-gray-600">
                        <span className="text-pink-500">sweethe.art</span> — the link-in-bio for girls who code
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 bg-[#fdf5f3] dark:bg-[#1a1a1a] flex items-center justify-center p-8 relative transition-colors">
                <div className="lg:hidden absolute top-6 left-6">
                    <Link href="/" className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
                        ← back
                    </Link>
                </div>
                {children}
            </div>
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

