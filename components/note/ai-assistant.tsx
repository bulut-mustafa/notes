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
import DOMPurify from "dompurify";
export default function AIAssistant({
    noteContent,
    notes,
    onClose,
}: {
    noteContent: string;
    notes: string;
    onClose?: () => void;
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
        <div className="absolute md:fixed bottom-4 right-4 w-[90%] max-w-md lg:max-w-xl z-50 rounded-lg shadow-2xl border border-gray-200 bg-white">
            <div className="p-1 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
                <p className="text-xs ml-1 font-medium text-gray-700">AI Assistant</p>
                {onClose && (
                    <button onClick={onClose} className="text-xs p-1 rounded hover:bg-gray-200">
                        ✕
                    </button>
                )}
            </div>

            <div className="max-h-[80vh] overflow-auto p-2 space-y-2">
                {answer && (
                    <div
                        className="text-sm p-2 ml-4 max-h-80 rounded tiptap overflow-auto"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer),  }}
                        />
                )}

                <div className="flex items-center gap-2">
                    {loading ? <p className="text-sm text-gray-500 p-2 ml-2">Thinking...</p> :
                        <form className="flex items-start gap-2 w-full px-2" onSubmit={handleSubmit}>
                            <textarea
                                placeholder="Ask AI anything..."
                                className="flex-1 transition-all duration-200 ease-in-out px-3 py-2 w-full text-xs   focus:outline-none focus:ring-none resize-none overflow-hidden"
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
                                        handleSubmit(e); 
                                    }
                                }}
                            />
                            <div className="flex items-center gap-1 shrink-0">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-lg hover:bg-gray-200 p-1 px-2 align-center text-nowrap">
                                            <span className="text-xs text-gray-400">{allNotes ? "All" : "Current"}</span>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-32">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div
                                                    className="flex text-xs items-center gap-2 rounded-md"
                                                    onClick={() => setAllNotes(true)}
                                                >
                                                    All Notes
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div
                                                    className="flex text-xs items-center gap-2 rounded-md"
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
                                        width={20}
                                        height={20}
                                        alt={'send-uparrow'}
                                    />
                                </button>
                            </div>
                        </form>

                    }
                </div>
            </div>
        </div>
    );
}


