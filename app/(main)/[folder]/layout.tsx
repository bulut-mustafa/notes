"use client";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import CardList from "@/components/card-list";
import Image from "next/image";

const sidebarItems = [
  { name: "All Notes", link: "/notes" },
  { name: "Favorites", link: "/favorites" },
  { name: "Archived", link: "/archived" },
  { name: "Recently Deleted", link: "/deleted" },
];

export default function FolderLayout({ children }: { children: React.ReactNode }) {
  const { noteId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the folder name based on the path
  const currentFolder = sidebarItems.find((item) => item.link === pathname)?.name || "All Notes";

  return (
    <div className="flex w-full h-full">
      {/* Sidebar + CardList */}
      <div className={`${noteId ? "hidden md:flex" : "flex"} flex-col w-full md:w-2/5 lg:w-1/4 md:border-r border-slate-200 h-full p-2 overflow-y-auto bg-white`}>

        {/* Search and Add Note Button */}
        <div className="flex gap-2 items-center border-b border-slate-200 pb-2 pt-0">
          <input
            type="text"
            className="w-full border border-slate-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#956e60]"
            placeholder="Search"
          />

          <button className="cursor-pointer rounded bg-[#956e60] p-2 border border-[#956e60]" onClick={() => router.push("/notes/new-note")}>
            <Image src={`/buttons/new-note.svg`} width={24} height={24} alt="New Note" className="min-w-[24px] min-h-[24px]" />
          </button>
        </div>
        <h1 className="text-3xl font-bold text-[#0e0e0e] p-2 m-2">{currentFolder}</h1>
        {/* CardList */}
        <aside className={`${noteId ? "hidden md:block" : "block"}`}>
          <CardList />
        </aside>
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${noteId ? "block" : "hidden md:block"}`}>
        {children}
      </main>
    </div>
  );
}
