"use client";

import { useRouter, usePathname } from "next/navigation";
import DateTag from "./date-tag";
import FavoriteTag from "./favorite-tag";
import { Note } from "@/lib/types";
import NoteActionCard from "./note-action-card";
import PinTag from "./pinned-tag";

function getFirstTagContent(html: string): string {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;

    const firstChild = div.firstChild as HTMLElement | null;
    if (firstChild && firstChild.textContent) {
      return firstChild.textContent.trim();
    }

    return div.textContent?.trim() || "";
  }
  return "";
}

export default function NoteCard({
  id,
  note,
}: {
  id: string;
  note: Note;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const folder = pathname.split("/")[1];
  const isActive = pathname.includes(id);

  const handleClick = () => {
    router.push(`/${folder}/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex group rounded-lg flex-col gap-2 p-2 text-xs cursor-pointer transition-all 
      border bg-[#fafafa] hover:bg-[#fef6f4] dark:bg-muted dark:hover:bg-[#2b1e1a] 
      ${isActive 
        ? "border-2 border-[#d6c2bc] bg-[#fef6f4] dark:border-[#956e60] dark:bg-[#3a2721]" 
        : "border border-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <p
          className={`text-base font-semibold truncate 
            ${isActive 
              ? "text-[#4b4744] dark:text-foreground" 
              : "text-[#a9a9a9] dark:text-muted-foreground"
            }`}
        >
          {getFirstTagContent(note.content)}
        </p>
        <NoteActionCard isActive={isActive} note={note} folder={folder} />
      </div>

      <div className="flex gap-2">
        {note.isPinned && <PinTag isActive={isActive} />}
        <DateTag isActive={isActive} date={note.updatedAt} />
        {note.isFavorite && <FavoriteTag isActive={isActive} />}
      </div>
    </div>
  );
}
