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
import { deleteTagAndRemoveFromNotes } from "@/lib/actions";
import ConfirmationModal from "./confirmation-modal";
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
  const { tags, loading: tagsLoading, addTag, fetchTags } = useTags();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [removingTag, setRemovingTag] = useState<string | null>(null);


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


  const handleRemoveTag = async (tagId: string) => {
    if (!user) return { success: false, message: "No user" };

    const result = await deleteTagAndRemoveFromNotes(tagId);
    if (result.success) {

      fetchTags(); // Ensure it's awaited if async
      toast.success("Tag removed successfully!", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
    } else {
      toast.error(result.message || "Failed to remove tag", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      });
    }
  };

  return (
    <aside
      className={`h-screen p-2 bg-white dark:bg-[#1e1e1e] border-r border-slate-200 dark:border-border transition-all ${isOpen ? "w-full sm:w-58" : "w-12"
        }`}
    >
      {/* Header */}
      <div className="flex gap-4 items-center border-b dark:border-border border-slate-200 pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-lg border border-slate-200 dark:border-border active:bg-[#fff5f2] dark:active:bg-[#575757] active:border-[#9f857a] p-1"
        >
          <Image
            src={`/buttons/sidebar.svg`}
            width={20}
            height={20}
            alt="sidebar"
            className="min-w-[20px] min-h-[20px]"
          />
        </button>
        <p className={`${!isOpen && "hidden"} text-base font-bold text-[#856559] dark:text-[#e9cfc5]`}>
          Note<span className="text-black dark:text-white">App</span>
        </p>
      </div>

      {/* User Section */}
      {user ? (
        <div className="flex items-center gap-3 py-2 border-b dark:border-border border-slate-200">
          <UserDropdown
            user={user}
            loading={loading}
            isOpen={isOpen}
            logOut={() => auth.signOut()}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-2 animate-pulse">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      )}

      {/* Folder Buttons */}
      <ul className="mt-2">

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
        <h4 className="text-xs text-gray-500 dark:text-gray-400 py-2">TAGS</h4>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${isOpen ? "flex" : "hidden"
            } cursor-pointer dark:border-gray-600 rounded-lg text-xs border border-slate-200 active:bg-[#fff5f2] active:border-[#9f857a] p-1 px-2`}
        >
          +
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute dark:bg-[#2a2a2a] dark:border-gray-600 bg-white shadow-lg rounded-lg p-2 mt-1 w-full sm:w-58 border border-gray-200">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="w-full text-xs p-1 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-white rounded-md focus:outline-none focus:ring focus:ring-[#9f857a]"
          />
          <button
            onClick={handleAddTag}
            className="w-full mt-1 p-1 bg-[#9f857a] text-xs text-white rounded-md hover:bg-[#8e7469]"
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
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              {isOpen && <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>}
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
              className={`${
                  selectedTag === tag.id ? "bg-[#fff2ee] dark:bg-[#35241f]" : ""
                } group flex items-center gap-2 p-1 text-gray-500 dark:text-gray-300 rounded-md`}
            >
              <Image
                src={`/tag.svg`}
                width={24}
                height={24}
                alt="sidebar"
                className="min-w-[20px] min-h-[20px]"
              />
              {isOpen &&
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-nowrap">{tag.name}</span>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      setRemovingTag(tag.id);
                      setShowConfirmModal(true);
                    }}
                    className="hidden group-hover:flex cursor-pointer rounded-md text-xs border border-slate-200 dark:border-slate-600 hover:bg-[#fff5f2] dark:hover:bg-[#3a2c27] active:border-[#9f857a] px-2"
                  >
                    -
                  </button>
                </div>}

            </li>
          ))}
      </ul>
      {showConfirmModal && <ConfirmationModal
        onClose={() => {
          setShowConfirmModal(false);
          setRemovingTag(null);
        }}
        onConfirm={() => {
          if (removingTag) {
            handleRemoveTag(removingTag);
          }
          setSelectedTag(null);
        }
        }
        text="Are you sure you want to delete this tag? This action will remove the tag from all notes."
      />}

    </aside>
  );
}
