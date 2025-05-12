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
import QuickActionButton from "./quick-actions";
export default function AIAssistant({
    noteContent,
    notes,
    onClose,
    onUpdateNote,
}: {
    noteContent: string;
    notes: string;
    onClose?: () => void;
    onUpdateNote?: (newContent: string) => void;
}) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [allNotes, setAllNotes] = useState(false);
    const [currentAction, setCurrentAction] = useState<"continue" | "summarize" | "improve" | null>(null);

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

    const handleQuickAction = async (action: "continue" | "summarize" | "improve") => {
        setLoading(true);
        setCurrentAction(action);
        let prompt = "";

        if (action === "continue") {
            prompt = "Please continue writing the following text where I left naturally and expand the ideas.";
        } else if (action === "summarize") {
            prompt = "Summarize this note in a clear, concise way.";
        } else if (action === "improve") {
            prompt = "Edit this text to improve grammar, clarity, and style, keeping the meaning the same.";
        }

        try {
            const res = await fetch("/api/ask-ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: prompt,
                    allNotes: allNotes,
                    context: noteContent,
                    notes: notes,
                }),
            });
            const data = await res.json();
            setAnswer(data.answer || "No response from AI.");
        } catch (error) {
            setAnswer("Something went wrong.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative">
            {/* AI Assistant Box */}
            <div className="fixed bottom-4 right-4 w-[90%] max-w-md lg:max-w-xl z-50 rounded-lg shadow-2xl border border-gray-200 bg-white">

                <div className="absolute -top-10 flex gap-2 z-50">
                    <QuickActionButton onClick={() => handleQuickAction("continue")} disabled={loading}>
                        Continue Writing
                    </QuickActionButton>
                    <QuickActionButton onClick={() => handleQuickAction("summarize")} disabled={loading}>
                        Summarize
                    </QuickActionButton>
                    <QuickActionButton onClick={() => handleQuickAction("improve")} disabled={loading}>
                        Improve
                    </QuickActionButton>
                </div>


                {/* Top bar */}
                <div className="flex items-center justify-between border-b rounded-t-lg bg-gray-50 px-2 py-1">
                    <p className="text-xs font-medium text-gray-700">AI Assistant</p>
                    {onClose && (
                        <button onClick={onClose} className="text-xs p-1 rounded hover:bg-gray-200">
                            ✕
                        </button>
                    )}
                </div>

                {/* Main content */}
                <div className="max-h-[80vh] overflow-auto p-2 space-y-2">
                    {answer && (
                        <div
                            className="text-sm p-2 max-h-80 rounded tiptap overflow-auto"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}
                        />
                    )}
                    {answer && currentAction && onUpdateNote && (
                        <button
                            className="text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                            onClick={() => {
                                let updatedNote = noteContent;

                                if (currentAction === "continue") {
                                    updatedNote = noteContent + "\n\n" + answer;
                                } else if (currentAction === "summarize") {
                                    updatedNote = noteContent + answer;
                                } else if (currentAction === "improve") {
                                    updatedNote = answer;  // Replace
                                }

                                onUpdateNote(updatedNote);
                                setAnswer("");
                                setCurrentAction(null);
                            }}
                        >
                            Add to Note
                        </button>
                    )}

                    <div className="flex items-center gap-2">
                        {loading ? (
                            <p className="text-sm text-gray-500 p-2 ml-2">Thinking...</p>
                        ) : (
                            <form className="flex items-start gap-2 w-full px-2" onSubmit={handleSubmit}>
                                <textarea
                                    placeholder="Ask AI anything..."
                                    className="flex-1 transition-all duration-200 ease-in-out px-3 py-2 w-full text-xs focus:outline-none resize-none overflow-hidden"
                                    value={question}
                                    rows={1}
                                    onChange={(e) => {
                                        setQuestion(e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-1 shrink-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="rounded-lg hover:bg-gray-200 p-1 px-2 text-nowrap">
                                                <span className="text-xs text-gray-400">
                                                    {allNotes ? "All" : "Current"}
                                                </span>
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
                                        type="submit"
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
