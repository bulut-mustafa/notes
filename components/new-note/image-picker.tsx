"use client";
import { useRef } from "react";
import Image from "next/image";

interface ImagePickerProps {
  name: string;
  value: File | null;
  onChange: (value: File | null) => void;
}

export default function ImagePicker({ name, value, onChange }: ImagePickerProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      onChange(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange(file);
    };
    reader.readAsDataURL(file);
  }

  function handleClearImage() {
    onChange(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id={name}
        accept=".jpg,.jpeg,.png"
        name={name}
        ref={imageInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      <div
        onClick={!value ? handlePickClick : undefined}
        className="relative w-full max-w-lg border border-dotted rounded-lg border-[#956e60] flex justify-center items-center text-gray-400 cursor-pointer overflow-hidden"
      >
        {value ? (
          <>
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>

            <Image
              src={URL.createObjectURL(value)}
              alt="Preview"
              width={700} // ✅ Specify width
              height={700} // ✅ Specify height
              className="w-full h-auto"
            />
          </>
        ) : (
          <p className="p-4 text-center">No image picked yet.</p>
        )}
      </div>
    </div>
  );
}

