"use client";
import { useParams, usePathname } from "next/navigation";
import CardList from "@/components/note/card-list";
import SidebarHeader from "@/components/note/sidebar-header";

export default function SidebarVisibility({ currentFolder }: { currentFolder?: string }) {
  const { noteId } = useParams();
  const pathname = usePathname();

  const isNewNotePage = pathname.includes("/notes/new-note");
  const showSidebar = !noteId && !isNewNotePage;

  return (
    <aside
      className={`w-full md:w-2/6 lg:w-1/4 md:border-r border-slate-200 dark:border-border h-full p-2 bg-white dark:bg-background 
      ${showSidebar ? "block" : "hidden md:block"}`}
    >
      <SidebarHeader />
      <h1 className="text-lg font-semibold text-[#0e0e0e] dark:text-foreground p-1 m-1">
        {currentFolder}
      </h1>
      <CardList />
    </aside>
  );
}
