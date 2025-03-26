"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import CardList from "@/components/note/card-list";
import Image from "next/image";

const sidebarItems = [
  { name: "Notes", link: "/notes" },
  { name: "Favorites", link: "/favorites" },
  { name: "Archived", link: "/archived" },
  { name: "Recently Deleted", link: "/deleted" },
];

export default function FolderLayout({ children }: { children: React.ReactNode }) {
  const { noteId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const isNewNotePage = pathname.includes("/notes/new-note"); // Check if on new note page
  const currentFolder = sidebarItems.find((item) => pathname.includes(item.link))?.name;

  return (
    <div className="flex w-full h-full">
      {/* Sidebar + CardList */}
      <div
        className={`${noteId || isNewNotePage ? "hidden md:flex" : "flex"} flex-col w-full md:w-2/5 lg:w-1/4 md:border-r border-slate-200 h-full p-2 overflow-y-auto bg-white`}
      >
        {/* Search and Add Note Button */}
        <div className="flex gap-2 items-center border-b border-slate-200 pb-2">
          <input
            type="text"
            className="w-full border border-slate-200 p-2 rounded-lg focus:outline-none focus:ring focus:ring-[#956e60]"
            placeholder="Search"
          />
          <button
            className="cursor-pointer rounded bg-[#956e60] p-2 border border-[#956e60]"
            onClick={() => router.push("/notes/new-note")}
          >
            <Image src={`/buttons/new-note.svg`} width={24} height={24} alt="New Note" className="min-w-[24px] min-h-[24px]" />
          </button>
        </div>

        <h1 className="text-3xl font-bold text-[#0e0e0e] p-2 m-2">{currentFolder}</h1>

        {/* CardList */}
        <aside className={`${noteId || isNewNotePage ? "hidden md:block" : "block"}`}>
          <CardList />
        </aside>
      </div>

      {/* Main Content (Notes / New Note) */}
      <main className={`flex-1 ${noteId || isNewNotePage ? "block" : "hidden md:block"}`}>
        {children}
      </main>
    </div>
  );
}
