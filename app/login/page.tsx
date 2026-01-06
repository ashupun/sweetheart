"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "email is required ♡";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "please enter a valid email ♡";
    if (!password) newErrors.password = "password is required ♡";
    else if (password.length < 6) newErrors.password = "password must be 6+ characters ♡";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login:", { email, password });
    }
  };

  return (
    <div className="min-h-screen flex font-mono">
      <div className="hidden lg:flex lg:w-1/2 bg-[#fdf5f3] dark:bg-[#1a1a1a] relative overflow-hidden transition-colors">
        <div className="absolute inset-0">
          <div className="grid-pattern absolute inset-0 opacity-20" />

          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"
              style={{
                left: `${10 + i * 8}%`,
                height: `${30 + Math.random() * 40}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-8 bg-pink-500 blur-sm animate-fall"
                style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${2 + Math.random() * 2}s` }}
              />
            </div>
          ))}

          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-pink-500/20 rounded-full animate-spin-slow" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-pink-500/10 rounded-full animate-spin-slow-reverse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-pink-500/20 rounded-full animate-spin-slow" />
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

        <div className="w-full max-w-xs">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
              sign in<span className="text-pink-500">.</span>
            </h1>
            <p className="text-sm text-gray-500">
              welcome back to sweethe.art
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                className={`w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b ${errors.email ? "border-pink-500" : "border-gray-300 dark:border-gray-700"} text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                placeholder="email"
              />
              {errors.email && (
                <span className="absolute -top-2 right-0 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                className={`w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b ${errors.password ? "border-pink-500" : "border-gray-300 dark:border-gray-700"} text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                placeholder="password"
              />
              {errors.password && (
                <span className="absolute -top-2 right-0 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors"
            >
              continue →
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            new here?{" "}
            <Link href="/signup" className="text-pink-500 hover:text-pink-400 transition-colors">
              create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
