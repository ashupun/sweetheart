import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
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
        <h1 className="text-6xl font-bold text-[#1a1a1a] dark:text-white mb-2">404</h1>
        <p className="text-gray-400 mb-8">this page doesn&apos;t exist ♡</p>
        <Link
          href="/"
          className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
        >
          ← go home
        </Link>
      </div>
    </div>
  );
}

