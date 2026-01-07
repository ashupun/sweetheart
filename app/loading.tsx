export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
        </div>
        <p className="text-gray-400 text-xs">loading</p>
      </div>
    </div>
  );
}

