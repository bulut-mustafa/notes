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
    onAction: () => void;
};

export default function TextEditorToolbar({ editor, onAction }: Props) {
    if (!editor) return null;

    return (
        <div className="flex gap-2 overflow-x-auto mx-1 border border-slate-200 p-2 rounded-md z-10 bg-white shadow-sm">
            <ToolbarButton
                isActive={editor.isActive("bold")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleBold().run();
                }}
            >
                <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("italic")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleItalic().run();
                }}
            >
                <Italic size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("strike")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleStrike().run();
                }}
            >
                <Strikethrough size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'left' })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().setTextAlign('left').run();
                }}
            >
                <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'center' })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().setTextAlign('center').run();
                }}
            >
                <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'right' })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().setTextAlign('right').run();
                }}
            >
                <AlignRight size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive({ textAlign: 'justify' })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().setTextAlign('justify').run();
                }}
            >
                <AlignJustify size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("highlight")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleHighlight().run();
                }}
            >
                <Highlighter size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("codeBlock")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleCodeBlock().run();
                }}
            >
                <Code size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("blockquote")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleBlockquote().run();
                }}
            >
                <MessageSquareQuote size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("taskList")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleTaskList().run();
                }}
            >
                <ListTodo size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("heading", { level: 1 })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
            >
                <Heading1 size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("heading", { level: 2 })}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
            >
                <Heading2 size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("bulletList")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleBulletList().run();
                }}
            >
                <List size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("orderedList")}
                onClick={() => {
                    onAction();
                    editor.chain().focus().toggleOrderedList().run();
                }}
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
