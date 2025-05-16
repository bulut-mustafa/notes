"use client";

import './text-editor-styles.scss';
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
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
import Blockquote from '@tiptap/extension-blockquote';
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
          keepAttributes: false, 
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, 
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing, press '/' for commands…",
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
      Blockquote,
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap w-full max-w-full min-h-[150px] max-h-[700px] lg:max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2 border-y border-slate-200 dark:border-border rounded-md focus:outline-none focus:ring-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  const [isSlashTriggerActive, setIsSlashTriggerActive] = useState(false);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;
  const removeSlashTrigger = () => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.resolve(from).parent;

    if (node.textContent === '/') {
      editor.commands.command(({ tr }) => {
        tr.delete(from - 1, from);
        return true;
      });
    }
  };
  return (
    <div className="space-y-2 w-full">
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ state }) => {
          const { from, to } = state.selection;
          const node = state.doc.resolve(from).parent;
          const text = node.textContent;

          const isSlashTrigger = text === '/' && from === to;
          const isTextSelected = from !== to;

          setIsSlashTriggerActive(isSlashTrigger); 

          return isSlashTrigger || isTextSelected;
        }}
      >
        <TextEditorToolbar onAction={() => {
          if (isSlashTriggerActive) {
            removeSlashTrigger();
            setIsSlashTriggerActive(false);
          }
        }} editor={editor} />
      </BubbleMenu>
      <div
        onKeyDown={(e) => {
          if (e.key === '/') {
            
            setTimeout(() => {
              editor?.commands.focus()
            }, 0)
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
