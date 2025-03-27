import Image from "next/image";

export default function DateTag({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`rounded-lg p-2 bg-[#f3f3f3] text-[#a4a4a4] group-hover:bg-[#fce4dc] group-hover:text-[#856559] flex items-center
      ${isActive ? "bg-[#fce4dc] text-[#856559]" : ""}`}
    >
      <Image
        src="/tags/date-active.svg"
        width={16}
        height={16}
        alt="Last Updated"
      />
      <p className="text-xs ml-1">17, March 2025 - 4:46PM</p>
    </div>
  );
}
