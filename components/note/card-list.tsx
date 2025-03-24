import NoteCard from "./note-card";

const notes = [
    { id: "1", title: "Meeting Notes", description: "Discussion about project roadmap..." },
    { id: "2", title: "Shopping List", description: "Milk, eggs, and bread..." },
    { id: "3", title: "Workout Plan", description: "Monday: Cardio, Tuesday: Strength..." },
];

export default function CardList() {
    return (
        <div className="flex flex-col gap-2">
            {notes.map((note) => (
                <NoteCard key={note.id} id={note.id} title={note.title} description={note.description} />
            ))}
        </div>
    );
}
 