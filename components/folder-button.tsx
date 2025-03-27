"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface FolderButtonProps {
  name: string;
  icon: string;
  count: number;
  link: string;
  isOpen: boolean;
  onSelect: () => void;
}

export default function FolderButton({
  name,
  icon,
  count,
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
        className={`group flex w-full items-center gap-2 p-2 rounded-xl text-sm transition-colors
          ${isActive ? "bg-[#fff2ee] font-semibold text-[#856559]" : "text-[#a9a9a9] hover:bg-gray-100"}
        `}
      >
        <Image
          src={`/folders/${icon}${isActive ? "-active" : ""}.svg`}
          width={28}
          height={28}
          alt={name}
          className="min-w-[32px] min-h-[32px]"
        />
        {isOpen && <p className="text-nowrap">{name}</p>}
        {isOpen && (
          <span
            className={`ml-auto text-xs rounded-xl px-2 py-1 transition-colors
              ${isActive ? "bg-[#fce4dc] text-[#856559]" : "bg-[#f3f3f3] text-[#a9a9a9]"}
            `}
          >
            {count}
          </span>
        )}
      </button>
    </li>
  );
}
