"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/client";
import { getEmailByUsername } from "../auth/actions";
import { AuthLayout } from "../components/layouts";
import { Alert } from "../components/alert";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const validate = () => {
    const newErrors: { identifier?: string; password?: string } = {};
    if (!identifier) newErrors.identifier = "email or username required ♡";
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

    let email = identifier;

    if (!isEmail(identifier)) {
      const foundEmail = await getEmailByUsername(identifier);
      if (!foundEmail) {
        setErrors({ form: "username not found ♡" });
        setLoading(false);
        return;
      }
      email = foundEmail;
    }

    await signIn.email(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setErrors({ form: ctx.error.message || "invalid credentials" });
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
            sign in<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm text-gray-500">welcome back to sweethe.art</p>
        </div>

        {errors.form && <div className="mb-6"><Alert type="error" message={errors.form} /></div>}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setErrors(prev => ({ ...prev, identifier: undefined })); }}
              className={`w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b ${errors.identifier ? "border-pink-500" : "border-gray-300 dark:border-gray-700"} text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600`}
              placeholder="email or username"
            />
            {errors.identifier && (
              <span className="absolute -top-2 right-0 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">
                {errors.identifier}
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
            {loading ? "signing in..." : "continue →"}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-8 space-y-2">
          <p>
            <Link href="/forgot" className="hover:text-pink-500 transition-colors">
              forgot password?
            </Link>
          </p>
          <p>
            new here?{" "}
            <Link href="/signup" className="text-pink-500 hover:text-pink-400 transition-colors">
              create account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
