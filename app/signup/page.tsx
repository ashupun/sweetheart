"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "../components/layouts";
import { joinWaitlist } from "../waitlist/actions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await joinWaitlist(email);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xs">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
            coming soon<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm text-gray-500">join the waitlist</p>
        </div>

        {success ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">you&apos;re on the list ♡</p>
            <p className="text-pink-500 mb-8">{email}</p>
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-pink-500 transition-colors"
            >
              ← back to home
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b ${error ? "border-pink-500" : "border-gray-300 dark:border-gray-700"} text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                  placeholder="email"
                />
                {error && (
                  <span className="absolute -top-2 right-0 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">
                    {error}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "joining..." : "notify me →"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
              already have an account?{" "}
              <Link href="/login" className="text-pink-500 hover:text-pink-400 transition-colors">
                sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
