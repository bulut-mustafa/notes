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
        className="w-full border border-slate-200 p-1 text-sm rounded-md focus:outline-none focus:ring focus:ring-[#956e60]"
      />
      <button
        onClick={() => router.push("/notes/new-note")}
        className="rounded bg-[#956e60] p-1 border border-[#956e60] hover:opacity-90"
      >
        <Image
          src="/buttons/new-note.svg"
          width={20}
          height={20}
          alt="New Note"
          className="min-w-[20px] min-h-[20px]"
        />
      </button>
    </div>
  );
}
