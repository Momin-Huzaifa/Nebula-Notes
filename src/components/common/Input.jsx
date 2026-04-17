import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Input({ label, className, error, ...props }) {
  return (
    <div className="space-y-1.5 flex flex-col w-full">
      {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
      <input
        className={cn(
          "glass rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-gray-600 focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
          error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
}
