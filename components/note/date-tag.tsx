import Image from "next/image";
function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short", // "Apr" instead of "April"
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 7:30 PM instead of 19:30
  };

  
  const formatted = new Date(date).toLocaleDateString("en-US", options);
  const parts = formatted.split(", ");
  console.log(formatted)
  // Combine into a tighter format: Apr 18, 2025 - 7:30 PM
  const datePart = parts[0]?.trim();
  const timePart = parts[1]?.trim();
  
  return `${datePart}, ${timePart}`;
}

export default function DateTag({ isActive, date }: { isActive: boolean, date: string }) {
  return (
    <div
      className={`rounded-md p-1 bg-[#f3f3f3] truncate  group-hover:bg-[#fce4dc] group-hover:text-[#856559] flex items-center
      ${isActive ? "bg-[#fce4dc] text-[#856559]" : "text-[#a4a4a4]"}`}
    >
      <Image
        src="/tags/date-active.svg"
        width={12}
        height={12}
        alt="Last Updated"
      />
      <p className="text-xs ml-1">{formatDate(date)}</p>
    </div>
  );
}
