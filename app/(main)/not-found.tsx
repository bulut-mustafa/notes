// app/not-found.tsx

"use client";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9f9f9] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#956e60] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => router.push("/notes")}
        className="bg-[#956e60] hover:bg-[#7a574d] text-white px-6 py-3 rounded-lg transition-colors"
      >
        Go back to Notes
      </button>
    </div>
  );
}
