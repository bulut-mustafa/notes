import Image from "next/image";
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}

export default function DateTag({ isActive, date }: { isActive: boolean, date: string }) {
  return (
    <div
      className={`rounded-lg p-2 bg-[#f3f3f3]  group-hover:bg-[#fce4dc] group-hover:text-[#856559] flex items-center
      ${isActive ? "bg-[#fce4dc] text-[#856559]" : "text-[#a4a4a4]"}`}
    >
      <Image
        src="/tags/date-active.svg"
        width={16}
        height={16}
        alt="Last Updated"
      />
      <p className="text-xs ml-1">{formatDate(date)}</p>
    </div>
  );
}
