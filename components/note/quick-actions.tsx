// components/QuickActionButton.tsx
"use client";
import React from "react";

type QuickActionButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

export default function QuickActionButton({
  children,
  onClick,
  disabled,
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs rounded-full px-3 py-1 shadow-lg border border-slate-200 dark:border-[#444] transition ${disabled
          ? "bg-gray-200 dark:bg-[#333] text-gray-400 cursor-not-allowed opacity-60"
          : "bg-white dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-[#333] text-black dark:text-gray-100"
        }`}
    >
      {children}
    </button>
  );
}
