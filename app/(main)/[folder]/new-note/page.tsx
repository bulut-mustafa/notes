import dynamic from "next/dynamic";

export const metadata = {
  title: "Create New Note – Wrytrai",
  description: "Compose a new note in Wrytrai with images, tags, and rich text.",
};

const NewNotePageClient = dynamic(() => import("./client-page"), { ssr: false });

export default function NewNotePageWrapper() {
  return <NewNotePageClient />;
}
