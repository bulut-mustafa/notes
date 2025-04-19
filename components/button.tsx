'use client';
import Image from "next/image";

type ButtonProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
  asLabel?: boolean;
  htmlFor?: string;
};

export default function Button({ icon, onClick, className = "", asLabel = false, htmlFor }: ButtonProps) {
  const common = (
    <Image
      src={`/buttons/${icon}.svg`}
      width={20}
      height={20}
      alt={icon}
      onClick={asLabel ? undefined : onClick}
    />
  );

  if (asLabel && htmlFor) {
    return (
      <label
        htmlFor={htmlFor}
        className={`rounded-lg border p-1 cursor-pointer ${className}`}
      >
        {common}
      </label>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-md border p-1 active:bg-[#fff5f2] active:border-[#9f857a] ${className}`}
    >
      {common}
    </button>
  );
}
