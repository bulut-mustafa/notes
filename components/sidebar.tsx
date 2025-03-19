"use client";
import { useState } from "react";
import FolderButton from "./folder-button";
import Image from "next/image";
const sidebarItems = [
  { name: "All Notes", icon: "📄", link: "/notes", count: 24 },
  { name: "Favorites", icon: "⭐", link: "/favorites", count: 24 },
  { name: "Archived", icon: "📂", link: "/archived" },
  { name: "Recently Deleted", icon: "🗑️", link: "/deleted" },
];

const tags = [
  "School Related",
  "Church Sermons",
  "Movies and Games",
  "Family Trip",
  "Love Life",
];


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  // Detect if the screen is small
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;

  const handleSelect = () => {
    console.log(isSmallScreen);
    if (isSmallScreen) {
      
      setIsOpen(false);
    }
  };
  return (
    <aside
      className={`h-screen p-2 bg-white border-r border-slate-200 transition-all ${isOpen ? "w-full sm:w-64" : "w-16"
        }`}
    >
      {/* Header */}
      <div className="flex gap-4 items-center border-b border-slate-200 pb-[12px]">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-2 active:border-[#9f857a] rounded-lg p-1">
          <Image
            src={`/buttons/sidebar.svg`}
            width={28}
            height={28}
            alt={`sidebar`}
            className="min-w-[28px] min-h-[28px]"
          />
        </button>
        <h2 className={`${!isOpen && 'hidden'} text-lg font-bold text-[#856559]`}>
          Note<span className="text-black">App</span>
        </h2>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 py-2 border-b border-slate-200">
        <div className="min-w-12 min-h-12 rounded-full bg-gray-300"></div>
        {isOpen && (
          <div>
            <h3 className="font-semibold">Mustafa Bulut</h3>
            <p className="text-sm text-gray-500">mustafaiste@outlook.com</p>
          </div>
        )}
      </div>
      <ul className="mt-2 last:mb-0">
        {sidebarItems.map((item) => (
          <FolderButton key={item.link} name={item.name} icon="all-notes" count={24} link={item.link} isOpen={isOpen} onSelect={handleSelect} />
        ))}
      </ul>

      {/* Tags */}
      <h4 className="text-xs text-gray-500 mt-6">TAGS</h4>
      <ul className="mt-2">
        {tags.map((tag) => (
          <li key={tag} className="flex items-center gap-2 p-2 text-gray-500">
            🏷️ {isOpen && <span className="text-nowrap">{tag}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
