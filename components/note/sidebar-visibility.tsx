"use client";
import { useParams, usePathname } from "next/navigation";
import CardList from "@/components/note/card-list";
import SidebarHeader from "@/components/note/sidebar-header";

export default function SidebarVisibility({ currentFolder }: { currentFolder?: string }) {
  const { noteId } = useParams(); // Get dynamic noteId
  const pathname = usePathname(); // Get current path

  const isNewNotePage = pathname.includes("/notes/new-note"); // Check if it's the new note page
  const showSidebar = !noteId && !isNewNotePage; // Hide sidebar when a note is selected

  return (
    <aside
      className={`w-full md:w-2/6 lg:w-1/4 md:border-r border-slate-200 h-full p-2 bg-white 
      ${showSidebar ? "block" : "hidden md:block"}`}
    >
      {/* Sidebar Header (Search + Add Button) */}
      <SidebarHeader />

      <h1 className="text-lg font-semibold text-[#0e0e0e] p-1 m-1">
        {currentFolder} 
      </h1>

      {/* Card List */}
      <CardList />
    </aside>
  );
}
