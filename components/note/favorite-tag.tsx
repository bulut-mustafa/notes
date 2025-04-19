import Image from "next/image";

export default function FavoriteTag({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`rounded-md p-1 bg-[#f3f3f3] text-[#a4a4a4] group-hover:bg-[#fce4dc] group-hover:text-[#856559] flex items-center
      ${isActive ? "bg-[#fce4dc] text-[#856559]" : ""}`}
    >
      <Image
        src="/buttons/heart.svg"
        width={16}
        height={16}
        alt="Favorite"
      />
    </div>
  );
}
