"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/client";
import { AuthLayout } from "../components/layouts";
import { Alert } from "../components/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("please enter a valid email ♡");
      return;
    }

    setLoading(true);
    setError("");

    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset",
    });

    setSuccess(true);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xs">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
            forgot<span className="text-pink-500">?</span>
          </h1>
          <p className="text-sm text-gray-500">we&apos;ll send you a reset link</p>
        </div>

        {error && <div className="mb-6"><Alert type="error" message={error} /></div>}
        
        {success ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">if an account exists for</p>
            <p className="text-pink-500 mb-2">{email}</p>
            <p className="text-sm text-gray-500 mb-8">you&apos;ll receive a reset link</p>
            <Link 
              href="/login" 
              className="text-xs text-gray-500 hover:text-pink-500 transition-colors"
            >
              ← back to login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="email"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "sending..." : "send reset link →"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
              <Link href="/login" className="hover:text-pink-500 transition-colors">
                ← back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

