import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6 px-6">
      <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-gray-400">
        <span>© {new Date().getFullYear()} sweetheart</span>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-pink-500 transition-colors">docs</Link>
          <Link href="/pricing" className="hover:text-pink-500 transition-colors">pricing</Link>
          <a href="https://discord.gg/ZxK7XmHyBG" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">discord</a>
        </div>
      </div>
    </footer>
  );
}

