// components/note/ai-assistant.tsx
"use client";
import { useState } from "react";
import Button from "@/components/button";
export default function AIAssistant({
    onClose = () => {}, // Default to an empty function if onClose is not passed
    noteContent,
    notes,
}: {
    onClose?: () => void;  // Mark onClose as optional
    noteContent: string;
    notes: string;
}) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");

    const askAI = async () => {
        if (!question.trim()) return;
        setLoading(true);
        setAnswer("");
        try {
          const res = await fetch("/api/ask-ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: question,
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
        <div className="py-1 px-4 space-y-2">
            <div className="flex items-center gap-2">
                <Button icon="cancel" onClick={onClose} />
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Ask AI anything..."
                        className="border border-gray-300 rounded-md px-3 py-2 w-full pr-20 shadow-lg"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button
                        className="absolute right-1 top-1 bottom-1"
                        icon="send-uparrow"
                        onClick={askAI}
                    />
                </div>
            </div>
            {loading && <p className="text-sm text-gray-500 px-2">Thinking...</p>}
            {answer && (
                <div
                    className="text-sm bg-gray-100 p-2 rounded shadow"
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            )}
        </div>
    );
}
