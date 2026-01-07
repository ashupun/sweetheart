"use client";

import Link from "next/link";

export function ProBadge({ small }: { small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full ${
      small ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"
    }`}>
      ✦ pro
    </span>
  );
}

export function ProFeatureCard({ 
  title, 
  description, 
  icon,
  isPro = false 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  isPro?: boolean;
}) {
  if (isPro) {
    return (
      <Link 
        href="/pricing"
        className="block p-5 border border-pink-200 dark:border-pink-900/30 rounded-xl bg-gradient-to-br from-pink-50/50 to-purple-50/50 dark:from-pink-500/5 dark:to-purple-500/5 hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-500/10 dark:hover:to-purple-500/10 transition-all group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white">
            {icon}
          </div>
          <ProBadge />
        </div>
        <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{description}</p>
        <span className="text-xs text-pink-500 group-hover:text-pink-400 transition-colors">
          upgrade to unlock →
        </span>
      </Link>
    );
  }

  return (
    <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

export function ProGate({ 
  children, 
  isPro,
  featureName 
}: { 
  children: React.ReactNode; 
  isPro: boolean;
  featureName: string;
}) {
  if (!isPro) {
    return (
      <div className="relative">
        <div className="opacity-50 pointer-events-none blur-[1px]">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link 
            href="/pricing"
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium rounded-full hover:from-pink-600 hover:to-purple-600 transition-colors shadow-lg"
          >
            unlock {featureName} →
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

