import Image from "next/image";
import { Metadata } from "next";

const folderTitles: Record<string, { title: string; description: string }> = {
  notes: {
    title: "Notes – Wrytrai",
    description: "View and manage all your personal notes in Wrytrai.",
  },
  archived: {
    title: "Archived – Wrytrai",
    description: "Access your archived notes here in Wrytrai.",
  },
  deleted: {
    title: "Recently Deleted – Wrytrai",
    description: "Recover or permanently delete your removed notes.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { folder: string };
}): Promise<Metadata> {
  const folder = params.folder;
  const meta = folderTitles[folder];

  if (!meta) {
    return {
      title: "Wrytrai",
      description: "Your notes, reimagined.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://wrytrai.vercel.app/${folder}`,
      siteName: "Wrytrai",
      
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function FolderPage() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full space-y-4 text-center">
      <Image
        src="/select-note.svg"
        alt="Select note"
        width={200}
        height={200}
        className="opacity-80"
      />
      <h1 className="text-gray-400 text-lg">Select a note to view</h1>
    </div>
  );
}
