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
  MessageSquareQuote,
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
    <div className="flex gap-2 overflow-x-auto mx-1 border border-slate-200 dark:border-slate-700 p-2 rounded-md z-10 bg-white dark:bg-slate-900 shadow-sm">
      {[
        { cmd: "bold", icon: <Bold size={16} />, action: () => editor.chain().focus().toggleBold().run() },
        { cmd: "italic", icon: <Italic size={16} />, action: () => editor.chain().focus().toggleItalic().run() },
        { cmd: "strike", icon: <Strikethrough size={16} />, action: () => editor.chain().focus().toggleStrike().run() },
        { cmd: "highlight", icon: <Highlighter size={16} />, action: () => editor.chain().focus().toggleHighlight().run() },
        { cmd: "codeBlock", icon: <Code size={16} />, action: () => editor.chain().focus().toggleCodeBlock().run() },
        { cmd: "blockquote", icon: <MessageSquareQuote size={16} />, action: () => editor.chain().focus().toggleBlockquote().run() },
        { cmd: "taskList", icon: <ListTodo size={16} />, action: () => editor.chain().focus().toggleTaskList().run() },
      ].map(({ cmd, icon, action }) => (
        <ToolbarButton
          key={cmd}
          isActive={editor.isActive(cmd)}
          onClick={() => {
            onAction();
            action();
          }}
        >
          {icon}
        </ToolbarButton>
      ))}

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

      <ToolbarButton
        isActive={editor.isActive({ textAlign: "left" })}
        onClick={() => {
          onAction();
          editor.chain().focus().setTextAlign("left").run();
        }}
      >
        <AlignLeft size={16} />
      </ToolbarButton>

      <ToolbarButton
        isActive={editor.isActive({ textAlign: "center" })}
        onClick={() => {
          onAction();
          editor.chain().focus().setTextAlign("center").run();
        }}
      >
        <AlignCenter size={16} />
      </ToolbarButton>

      <ToolbarButton
        isActive={editor.isActive({ textAlign: "right" })}
        onClick={() => {
          onAction();
          editor.chain().focus().setTextAlign("right").run();
        }}
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <ToolbarButton
        isActive={editor.isActive({ textAlign: "justify" })}
        onClick={() => {
          onAction();
          editor.chain().focus().setTextAlign("justify").run();
        }}
      >
        <AlignJustify size={16} />
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
        "p-1 rounded transition hover:bg-slate-100 dark:hover:bg-slate-700",
        isActive && "bg-slate-200 dark:bg-slate-600"
      )}
    >
      {children}
    </button>
  );
}


