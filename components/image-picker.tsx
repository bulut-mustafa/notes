"use client";
import { useRef, useState } from "react";
import Image from "next/image";

interface ImagePickerProps {
  name: string;
}

export default function ImagePicker({ name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hidden file input */}
      <input
        type="file"
        id={name}
        accept=".jpg,.jpeg,.png"
        name={name}
        ref={imageInputRef}
        required
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Image Preview Container */}
      <div
        onClick={handlePickClick}
        className="w-full max-w-lg border-2 rounded-lg border-slate-400 flex justify-center items-center text-gray-400 cursor-pointer overflow-hidden"
      >
        {pickedImage ? (
          <Image 
            src={pickedImage} 
            alt="Preview" 
            layout="intrinsic" 
            width={700} 
            height={700} 
            className="w-full h-auto"
          />
        ) : (
          <p className="p-4 text-center">No image picked yet.</p>
        )}
      </div>
    </div>
  );
}
