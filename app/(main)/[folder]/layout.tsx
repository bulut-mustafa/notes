import { ReactNode } from "react";
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
      <div className="flex w-full h-screen overflow-hidden">
        {/* Sidebar (conditionally visible based on route) */}
        <SidebarVisibility currentFolder={currentFolder} />

        {/* Main Content */}
        <main className="flex-1 h-full overflow-hidden">{children}</main>
      </div>
  );
}
