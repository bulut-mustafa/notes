// import Button from "@/components/button";
import FolderButton from "@/components/folder-button";
import NoteCard from "@/components/note-card";
export default function Home() {
  return (
    <main className="p-4">
      {/* <Button /> */}
      <FolderButton />
      <FolderButton />
      <FolderButton />
      <NoteCard />
    </main>
  );
}
