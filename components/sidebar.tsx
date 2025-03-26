"use client";
import { useState, useEffect } from "react";
import FolderButton from "./folder-button";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import UserDropdown from "./avatar-dropdown";
import { auth } from '@/firebase';

const sidebarItems = [
  { name: "Notes", icon: "📄", link: "/notes", count: 24 },
  { name: "Favorites", icon: "⭐", link: "/favorites", count: 24 },
  { name: "Archived", icon: "📂", link: "/archived" },
  { name: "Recently Deleted", icon: "🗑️", link: "/deleted" },
];



export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [tags, setTags] = useState([
    "School Related",
    "Church Sermons",
    "Movies and Games",
    "Family Trip",
    "Love Life",
  ]);
  // Detect if the screen is small
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  const handleSelect = () => {
    if (isSmallScreen) {

      setIsOpen(false);
    }
  };

  const addTag = () => {
    if (newTag.trim()) {
      
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setIsDropdownOpen(false);
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
      {user ?
        <div className="flex items-center gap-3 py-2 border-b border-slate-200">
          <UserDropdown user={user} loading={loading} isOpen={isOpen} logOut={() => auth.signOut()} />
        </div> :
        <div className="flex items-center space-x-3 p-2 animate-pulse">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>}

      <ul className="mt-2 last:mb-0">
        {sidebarItems.map((item) => (
          <FolderButton key={item.link} name={item.name} icon="all-notes" count={24} link={item.link} isOpen={isOpen} onSelect={handleSelect} />
        ))}
      </ul>

      {/* Tags */}
      <div className="flex justify-between mt-6 items-center relative">
        <h4 className="text-xs text-gray-500">TAGS</h4>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${isOpen ? 'flex' : 'hidden'} cursor-pointer rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-2 active:border-[#9f857a] p-1 px-2`}>+</button>
      </div>
      
      {isDropdownOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-2 w-full border border-gray-200">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#9f857a]"
          />
          <button onClick={addTag} className="w-full mt-2 p-1 bg-[#9f857a] text-white rounded-md">Add</button>
        </div>
      )}
      <ul className="mt-2">
        {tags.map((tag) => (
          <li key={tag} className="flex items-center gap-2 p-2 text-gray-500">
            🏷️ {isOpen && <span className="text-nowrap">{tag}</span>}
          </li>
        ))}
      </ul>
    </aside >
  );
}
