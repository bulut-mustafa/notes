import { ReactNode } from "react";
import { NotesProvider } from "@/context/notes-context";
import SidebarVisibility from "@/components/note/sidebar-visibility";

const sidebarItems = [
  { name: "Notes", link: "/notes" },
  { name: "Favorites", link: "/favorites" },
  { name: "Archived", link: "/archived" },
  { name: "Recently Deleted", link: "/deleted" },
];

export default function FolderLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { folder: string };
}) {
  const currentFolder = sidebarItems.find((item) =>
    item.link.includes(params.folder)
  )?.name;

  return (
    <NotesProvider>
      <div className="flex w-full h-full">
        {/* Sidebar (conditionally visible based on route) */}
        <SidebarVisibility currentFolder={currentFolder} />

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </NotesProvider>
  );
}
