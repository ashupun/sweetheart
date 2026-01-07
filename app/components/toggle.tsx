"use client";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-10 h-5 rounded-full transition-colors relative ${enabled ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${enabled ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

