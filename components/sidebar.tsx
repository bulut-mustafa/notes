"use client";
import { useState, useEffect } from "react";
import FolderButton from "./folder-button";
import Image from "next/image";
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import AvatarDropdown from "./avatar-dropdown";


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
  const {user, loading} = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  // Detect if the screen is small
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;


  useEffect(() => {
    console.log("User in Sidebar:", user);
    console.log("Loading state in Sidebar:", loading);
    if (!loading && !user) {
        router.replace('/login');
    }
}, [user, loading, router]);
  const handleSelect = () => {
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
      {user && <AvatarDropdown user={user} loading={loading} logOut={() => auth.signOut()} />}
      
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
