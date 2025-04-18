"use client";

import './text-editor-styles.scss';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextEditorToolbar from "./text-editor-toolbar";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import BulletList from '@tiptap/extension-bullet-list'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'

type Props = {
  content: string;
  onChange: (html: string) => void;
};




export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing…',
      }),
      Highlight,
      Document,
      Paragraph,
      Text,
      TaskList,
      TaskItem,
      ListItem,
      BulletList,
      TextStyle,
      Color,
      
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap w-full max-w-full min-h-[150px] p-2 border border-slate-200 rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2 w-full">
      <TextEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
