"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/client";
import { createProfile } from "../auth/actions";
import { AuthLayout } from "../components/layouts";
import { Alert } from "../components/alert";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {};
    if (!username) newErrors.username = "username is required ♡";
    else if (username.length < 3) newErrors.username = "3+ characters ♡";
    else if (!/^[a-zA-Z0-9_]+$/.test(username)) newErrors.username = "letters, numbers & underscores only ♡";
    if (!email) newErrors.email = "email is required ♡";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "please enter a valid email ♡";
    if (!password) newErrors.password = "password is required ♡";
    else if (password.length < 6) newErrors.password = "password must be 6+ characters ♡";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    const profileCheck = await createProfile(username, null, true);
    if (profileCheck?.error) {
      setErrors({ form: profileCheck.error });
      setLoading(false);
      return;
    }

    await signUp.email(
      { email, password, name: username },
      {
        onSuccess: async (ctx) => {
          if (ctx.data?.user) {
            await createProfile(username, ctx.data.user.id, false);
          }
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setErrors({ form: ctx.error.message || "signup failed" });
          setLoading(false);
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xs">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
            claim yours<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm text-gray-500">create your sweethe.art page</p>
        </div>

        {errors.form && <div className="mb-6"><Alert type="error" message={errors.form} /></div>}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="relative">
            <div className={`flex items-center border-b ${errors.username ? "border-pink-500" : "border-gray-300 dark:border-gray-700"}`}>
              <span className="py-3 text-sm text-gray-400 dark:text-gray-600">sweethe.art/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: undefined })); }}
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white text-sm focus:outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="you"
              />
            </div>
            {errors.username && (
              <span className="absolute -top-2 right-0 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">
                {errors.username}
              </span>
            )}
          </div>

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
            disabled={loading}
            className="w-full py-3 mt-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "creating account..." : "create account →"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          already have an account?{" "}
          <Link href="/login" className="text-pink-500 hover:text-pink-400 transition-colors">
            sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
