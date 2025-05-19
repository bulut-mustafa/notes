// app/not-found.tsx
import Link from "next/link";
export default function NotFoundPage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9f9f9] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#956e60] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <Link href={'/notes'}>
        <button
          className="bg-[#956e60] hover:bg-[#7a574d] text-white px-6 py-3 rounded-lg transition-colors"
        >
          Go back to Notes
        </button></Link>

    </div>
  );
}
