'use client';
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  isProcessing?: boolean;
  onClose: () => void;
  onPrimary: () => void;
  primaryLabel: string;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, isProcessing, onClose, onPrimary, primaryLabel, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">
            Cancel
          </button>
          <button disabled={isProcessing} onClick={onPrimary} className="px-4 py-2 text-sm bg-[#937b70] text-white rounded hover:bg-[#7f685f]">
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
