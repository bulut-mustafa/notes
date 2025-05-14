"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface FolderButtonProps {
  name: string;
  icon: string;
  link: string;
  isOpen: boolean;
  onSelect: () => void;
}

export default function FolderButton({
  name,
  icon,
  link,
  isOpen,
  onSelect,
}: FolderButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname.includes(link);

  const handleClick = () => {
    onSelect();
    router.push(link);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`group flex w-full items-center gap-2 p-1 rounded-lg text-sm transition-colors
          ${
            isActive
              ? "bg-[#fff2ee] font-semibold text-[#856559] dark:bg-[#2f2422] dark:text-[#e6d4cb]"
              : "text-[#a9a9a9] hover:bg-gray-100 dark:text-[#888888] dark:hover:bg-[#1e1e1e]"
          }
        `}
      >
        <Image
          src={`/folders/${icon}${isActive ? "-active" : ""}.svg`}
          width={24}
          height={24}
          alt={name}
          className="min-w-[24px] min-h-[24px]"
        />
        {isOpen && <p className="text-nowrap text-sm">{name}</p>}
      </button>
    </li>
  );
}
  