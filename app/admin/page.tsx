"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { verifyAdmin, getWaitlistEmails, type WaitlistEntry } from "./actions";

function hasToken() {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem("admin-token");
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(hasToken);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emails, setEmails] = useState<WaitlistEntry[]>([]);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const loadEmails = useCallback(async (token: string) => {
        const data = await getWaitlistEmails(token);
        if (data) setEmails(data);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("admin-token");
        if (!token) return;

        let mounted = true;
        verifyAdmin(token).then((valid) => {
            if (!mounted) return;
            if (valid) {
                setAuthenticated(true);
                loadEmails(token);
            }
            setLoading(false);
        });

        return () => { mounted = false; };
    }, [loadEmails]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const valid = await verifyAdmin(password);
        if (valid) {
            sessionStorage.setItem("admin-token", password);
            setAuthenticated(true);
            loadEmails(password);
        } else {
            setError("invalid password");
        }
        setLoading(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin-token");
        setAuthenticated(false);
        setEmails([]);
        router.refresh();
    };

    const copyAllEmails = () => {
        const emailList = emails.map(e => e.email).join("\n");
        navigator.clipboard.writeText(emailList);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const exportCSV = () => {
        const csv = "email,joined\n" + emails.map(e => `${e.email},${e.createdAt}`).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] flex items-center justify-center font-mono">
                <p className="text-gray-400">loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
            <nav className="h-[57px] px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/sweethearticon.png" alt="" width={18} height={18} />
                    <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                        sweethe<span className="text-pink-500">.</span>art
                    </span>
                    <span className="text-gray-300 dark:text-gray-700 mx-2">/</span>
                    <span className="text-sm text-pink-500">admin</span>
                </Link>
                <div className="flex items-center gap-4">
                    {authenticated && (
                        <button
                            onClick={handleLogout}
                            className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
                        >
                            logout
                        </button>
                    )}
                    <ThemeToggle />
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6 py-12">
                {!authenticated ? (
                    <div className="max-w-xs mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">
                                admin<span className="text-pink-500">.</span>
                            </h1>
                            <p className="text-sm text-gray-400">restricted access</p>
                        </div>

                        {error && (
                            <p className="text-xs text-pink-500 text-center mb-4">{error}</p>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400"
                                placeholder="password"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={loading || !password}
                                className="w-full py-3 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50"
                            >
                                {loading ? "verifying..." : "access →"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-xl font-bold text-[#1a1a1a] dark:text-white">waitlist</h1>
                                <p className="text-sm text-gray-400">{emails.length} people signed up</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyAllEmails}
                                    className="px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-pink-500 hover:border-pink-500 transition-colors"
                                >
                                    {copied ? "copied!" : "copy all"}
                                </button>
                                <button
                                    onClick={exportCSV}
                                    className="px-3 py-1.5 text-xs bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                                >
                                    export csv
                                </button>
                            </div>
                        </div>

                        {emails.length === 0 ? (
                            <div className="text-center py-16 border border-dashed border-gray-200 dark:border-gray-800">
                                <p className="text-gray-400 text-sm">no signups yet</p>
                            </div>
                        ) : (
                            <div className="border border-gray-200 dark:border-gray-800">
                                <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 bg-gray-50 dark:bg-[#252525] text-xs text-gray-400 border-b border-gray-200 dark:border-gray-800">
                                    <span>email</span>
                                    <span>joined</span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {emails.map((entry) => (
                                        <div key={entry.id} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 text-sm">
                                            <span className="text-[#1a1a1a] dark:text-white truncate">{entry.email}</span>
                                            <span className="text-gray-400 text-xs">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
