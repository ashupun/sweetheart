"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { authClient } from "@/lib/client";
import { AuthLayout } from "../components/layout";
import { Alert } from "../components/alert";

function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || password.length < 6) {
      setError("password must be 6+ characters ♡");
      return;
    }
    if (password !== confirm) {
      setError("passwords don't match ♡");
      return;
    }
    if (!token) {
      setError("invalid reset link");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (error) {
      setError(error.message || "something went wrong");
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <Alert type="error" message="invalid or expired reset link" />
        <p className="text-xs text-gray-500 mt-6">
          <Link href="/forgot" className="text-pink-500 hover:text-pink-400 transition-colors">
            request a new link
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {error && <div className="mb-6"><Alert type="error" message={error} /></div>}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
          placeholder="new password"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
          placeholder="confirm password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "resetting..." : "reset password →"}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-8">
        <Link href="/login" className="hover:text-pink-500 transition-colors">
          ← back to login
        </Link>
      </p>
    </>
  );
}

export default function ResetPassword() {
  return (
    <AuthLayout>
      <div className="w-full max-w-xs">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
            new password<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm text-gray-500">make it a good one</p>
        </div>

        <Suspense fallback={<div className="text-center text-gray-500 text-sm">loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </AuthLayout>
  );
}

