"use client";

import { useState, useEffect } from "react";
import FolderButton from "./folder-button";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import UserDropdown from "./avatar-dropdown";
import { auth } from "@/firebase";
import { useTags } from "@/context/tag-context";
import { useNotes } from "@/context/notes-context";
import toast from "react-hot-toast";
const sidebarItems = [
  { name: "Notes", link: "/notes" },
  { name: "Archived", link: "/archived" },
  { name: "Trash", link: "/deleted" },
];

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { selectedTag, setSelectedTag } = useNotes();
  const { tags, loading: tagsLoading, addTag } = useTags();

  

  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = () => {
    if (isSmallScreen) {
      setIsOpen(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag);
      toast.success("Tag added successfully!");
      setNewTag("");
      setIsDropdownOpen(false);
    }
  };

  return (
    <aside
      className={`h-screen p-2 bg-white border-r border-slate-200 transition-all ${isOpen ? "w-full sm:w-58" : "w-12"
        }`}
    >
      {/* Header */}
      <div className="flex gap-4 items-center border-b border-slate-200 pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-[#9f857a] p-1"
        >
          <Image
            src={`/buttons/sidebar.svg`}
            width={20}
            height={20}
            alt="sidebar"
            className="min-w-[20px] min-h-[20px]"
          />
        </button>
        <p className={`${!isOpen && "hidden"} text-base font-bold text-[#856559]`}>
          Note<span className="text-black">App</span>
        </p>
      </div>

      {/* User Section */}
      {user ? (
        <div className="flex items-center gap-3 py-2 border-b border-slate-200">
          <UserDropdown
            user={user}
            loading={loading}
            isOpen={isOpen}
            logOut={() => auth.signOut()}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-2 animate-pulse">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
          
      {/* Folder Buttons */}
      <ul className="mt-2">
          <FolderButton
            name={"NEWS"}
            icon="all-notes"
            link={"/news"}
            isOpen={isOpen}
            onSelect={handleSelect}
          />
        {sidebarItems.map((item) => (
          <FolderButton
            key={item.link}
            name={item.name}
            icon="all-notes"
            link={item.link}
            isOpen={isOpen}
            onSelect={handleSelect}
          />
        ))}
      </ul>

      {/* Tags */}
      <div className="flex justify-between mt-4 items-center relative">
        <h4 className="text-xs text-gray-500 py-2">TAGS</h4>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${isOpen ? "flex" : "hidden"
            } cursor-pointer rounded-lg text-xs border border-slate-200 active:bg-[#fff5f2] active:border-[#9f857a] p-1 px-2`}
        >
          +
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 w-full sm:w-58 border border-gray-200">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="w-full text-xs p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#9f857a]"
          />
          <button
            onClick={handleAddTag}
            className="w-full mt-1 p-1 bg-[#9f857a] text-xs text-white rounded-md"
          >
            Add
          </button>
        </div>
      )}

      <ul className="mt-1">
        {tagsLoading
          ? Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 animate-pulse"
            >
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              {isOpen && <div className="w-24 h-4 bg-gray-300 rounded"></div>}
            </li>
          ))
          : tags.map((tag) => (
            <li
              key={tag.id}
              onClick={() => {
                if (selectedTag === tag.id) {
                  setSelectedTag(null);
                } else {
                  setSelectedTag(tag.id);
                  handleSelect();
                } // close sidebar on mobile
              }}
              className={`${selectedTag === tag.id && 'bg-[#fff2ee]'} flex items-center gap-2 p-1 text-gray-500 rounded-md`}
            >
              <Image
                src={`/tag.svg`}
                width={24}
                height={24}
                alt="sidebar"
                className="min-w-[20px] min-h-[20px]"
              />
              {isOpen && <span className="text-sm text-nowrap">{tag.name}</span>}
            </li>
          ))}
      </ul>
    </aside>
  );
}
