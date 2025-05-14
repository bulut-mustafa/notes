'use client';
import Image from "next/image";

type ButtonProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
  asLabel?: boolean;
  htmlFor?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  icon,
  onClick,
  className = "",
  asLabel = false,
  htmlFor,
  type,
}: ButtonProps) {
  const common = (
    <Image
      src={`/buttons/${icon}.svg`}
      width={20}
      height={20}
      alt={icon}
    />
  );

  const baseClasses = "rounded-md border p-1";

  if (asLabel && htmlFor) {
    return (
      <label htmlFor={htmlFor} className={`${baseClasses} cursor-pointer ${className}`}>
        {common}
      </label>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      type={type}
    >
      {common}
    </button>
  );
}
