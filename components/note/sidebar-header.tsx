"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNotes } from "@/context/notes-context";

export default function SidebarHeader() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useNotes();

  return (
    <div className="flex gap-2 items-center border-b border-slate-200 pb-2">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // ✅
        className="w-full border border-slate-200 p-2 rounded-lg focus:outline-none focus:ring focus:ring-[#956e60]"
      />
      <button
        onClick={() => router.push("/notes/new-note")}
        className="rounded bg-[#956e60] p-2 border border-[#956e60] hover:opacity-90"
      >
        <Image
          src="/buttons/new-note.svg"
          width={24}
          height={24}
          alt="New Note"
          className="min-w-[24px] min-h-[24px]"
        />
      </button>
    </div>
  );
}
