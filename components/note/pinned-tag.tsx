import Image from "next/image";

export default function PinTag({ isActive }: { isActive: boolean }) {
  const baseTagClasses = "rounded-md p-1 flex items-center transition-colors";
  const activeClasses =
    "bg-[#fce4dc] text-[#856559] dark:bg-[#3a2721] dark:text-[#e6d4cb]";
  const hoverClasses =
    "group-hover:bg-[#fce4dc] group-hover:text-[#856559]";
  const inactiveClasses =
    "bg-[#f3f3f3] text-[#a4a4a4] dark:bg-muted dark:text-muted-foreground";

  return (
    <div
      className={`${baseTagClasses} ${isActive ? activeClasses : inactiveClasses} ${hoverClasses}`}
    >
      <Image src="/buttons/pinned.svg" width={16} height={16} alt="Pinned" />
    </div>
  );
}
