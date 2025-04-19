// components/TextEditorToolbar.tsx
"use client";

import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Code,
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Highlighter,
    ListTodo,
    MessageSquareQuote
} from "lucide-react";
import clsx from "clsx";
import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor;
};

export default function TextEditorToolbar({ editor }: Props) {
    if (!editor) return null;

    return (
        <div className="flex gap-2 flex-wrap border border-slate-200 p-2 rounded-md">
            <ToolbarButton
                isActive={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'left' })}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'center' })}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'right' })}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'justify' })}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
                <AlignJustify size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("highlight")}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
                <Highlighter size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <Code size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <MessageSquareQuote size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("taskList")}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
                <ListTodo size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("heading", { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("heading", { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered size={16} />
            </ToolbarButton>
        </div>
    );
}

type ToolbarButtonProps = {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
};

function ToolbarButton({ isActive, onClick, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "p-1 rounded hover:bg-slate-100 transition",
                isActive && "bg-slate-200"
            )}
        >
            {children}
        </button>
    );
}
