"use client";

import Link from "next/link";
import Image from "next/image";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono flex items-center justify-center px-6">
      <div className="text-center">
        <Image
          src="/sweethearticon.png"
          alt=""
          width={48}
          height={48}
          className="mx-auto mb-8 opacity-20"
        />
        <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">something went wrong</h1>
        <p className="text-gray-400 mb-8">don&apos;t worry, it&apos;s not you ♡</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
          >
            try again
          </button>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            go home
          </Link>
        </div>
      </div>
    </div>
  );
}

