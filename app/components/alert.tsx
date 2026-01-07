interface AlertProps {
  type: "error" | "success";
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  if (type === "success") {
    return (
      <div className="p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg">
        <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 rounded-lg">
      <p className="text-sm text-pink-600 dark:text-pink-400">{message}</p>
    </div>
  );
}

