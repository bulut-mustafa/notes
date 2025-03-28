import { ReactNode } from "react";
import CardList from "@/components/note/card-list";
import SidebarHeader from "@/components/note/sidebar-header";

const sidebarItems = [
  { name: "Notes", link: "/notes" },
  { name: "Favorites", link: "/favorites" },
  { name: "Archived", link: "/archived" },
  { name: "Recently Deleted", link: "/deleted" },
];

export default function FolderLayout({ children,params,}: {children: ReactNode;params: { folder: string };  }) {
  const currentFolder = sidebarItems.find((item) =>
    item.link.includes(params.folder)
  )?.name;
  
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <aside className="flex-col w-full md:w-2/5 lg:w-1/4 md:border-r border-slate-200 h-full p-2 overflow-y-auto bg-white hidden md:flex">
        {/* Header (Search + Add) */}
        <SidebarHeader />

        <h1 className="text-2xl font-bold text-[#0e0e0e] p-2 m-2">
          {currentFolder}
        </h1>

        <CardList folder={params.folder} />
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
