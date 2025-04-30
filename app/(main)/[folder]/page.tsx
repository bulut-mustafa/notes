import Image from "next/image";
export default function FolderPage() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full space-y-4 text-center">
      <Image src="/select-note.svg" alt="Select note" width={200} height={200} className="opacity-80" />
      <h1 className="text-gray-400 text-lg">Select a note to view</h1>
    </div>
  );
}
