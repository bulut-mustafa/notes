import Image from "next/image";

function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true, 
  };

  const formatted = new Date(date).toLocaleDateString("en-US", options);
  const parts = formatted.split(", ");
  
  const datePart = parts[0]?.trim();
  const timePart = parts[1]?.trim();
  
  return `${datePart}, ${timePart}`;
}

export default function DateTag({ isActive, date }: { isActive: boolean, date: string }) {

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
      <Image src="/tags/date-active.svg" width={12} height={12} alt="Date" />
      <p className="text-xs ml-1">{formatDate(date)}</p>
    </div>
  );
}
