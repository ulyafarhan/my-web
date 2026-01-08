import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 rounded-lg border bg-white outline-none transition-all focus:ring-2 focus:ring-blue-500/20 ${
          error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};