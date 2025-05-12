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
      className={`text-xs rounded-full px-3 py-1 shadow-lg border border-slate-200 transition ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
          : "bg-white hover:bg-gray-100 text-black"
      }`}
    >
      {children}
    </button>
  );
}
