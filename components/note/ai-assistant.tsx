// components/note/ai-assistant.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import '@/components/new-note/text-editor-styles.scss';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export default function AIAssistant({
    noteContent,
    notes,
}: {
    noteContent: string;
    notes: string;
}) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [allNotes, setAllNotes] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/ask-ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question,
                    allNotes: allNotes,
                    context: noteContent,
                    notes: notes,
                }),
            });
            const data = await res.json();
            setQuestion("");
            setAnswer(data.answer || "No response from AI.");
        } catch (error) {
            setAnswer("Something went wrong.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-5/6 py-1  space-y-2 rounded-b-lg border-x border-b border-slate-200 bg-white shadow-lg">
            {answer && (
                <div
                    className="text-sm p-2 ml-4 max-h-80 rounded tiptap overflow-auto"
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            )}

            <div className="flex items-center gap-2">
                {loading ? <p className="text-sm text-gray-500 p-2 ml-2">Thinking...</p> :
                    <form className="flex items-start gap-2 w-full px-2" onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Ask AI anything..."
                            className="flex-1 transition-all duration-200 ease-in-out px-3 py-2 w-full text-sm   focus:outline-none focus:ring-none resize-none overflow-hidden"
                            value={question}
                            rows={1}
                            onChange={(e) => {
                                setQuestion(e.target.value);
                                e.target.style.height = 'auto'; // Reset height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Set to scrollHeight
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // Prevent newline
                                    handleSubmit(e);    // Trigger submit
                                }
                            }}
                        />
                        <div className="flex items-center gap-1 shrink-0">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="rounded-lg hover:bg-gray-200 p-1 px-2 align-center text-nowrap">
                                        <span className="text-xs text-gray-400">{allNotes ? "All Notes" : "Current Note"}</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-32">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <div
                                                className="flex text-sm items-center gap-2 rounded-md"
                                                onClick={() => setAllNotes(true)}
                                            >
                                                All Notes
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div
                                                className="flex text-sm items-center gap-2 rounded-md"
                                                onClick={() => setAllNotes(false)}
                                            >
                                                Current Note
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <button
                                type='submit'
                                className={`p-2 hover:bg-gray-200 rounded-full`}
                            >
                                <Image
                                    src={`/buttons/send-uparrow.svg`}
                                    width={24}
                                    height={24}
                                    alt={'send-uparrow'}
                                />
                            </button>
                        </div>
                    </form>

                }
            </div>

        </div>
    );
}
