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

  function handleClearImage() {
    setPickedImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
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
        onClick={!pickedImage ? handlePickClick : undefined}
        className="relative w-full max-w-lg border border-dotted rounded-lg border-[#956e60] flex justify-center items-center text-gray-400 cursor-pointer overflow-hidden"
      >
        {pickedImage ? (
          <>
            {/* Clear Image Button */}
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>

            <Image 
              src={pickedImage} 
              alt="Preview" 
              layout="intrinsic" 
              width={700} 
              height={700} 
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
