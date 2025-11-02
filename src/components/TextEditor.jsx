import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { lowlight } from "lowlight/lib/common.js";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import "highlight.js/styles/github-dark.css";

export default function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // disable default
      }),
      Underline,
      Highlight,
      Link.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: "Write content here..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),

      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,

      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Image URL?");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="overflow-hidden bg-white border rounded">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 text-sm border-b bg-gray-50">

        {/* Undo / Redo */}
        <button onClick={() => editor.chain().focus().undo().run()}>↶</button>
        <button onClick={() => editor.chain().focus().redo().run()}>↷</button>

        {/* Text */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>i</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>HL</button>

        {/* Headings */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>

        {/* Lists */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</button>

        {/* Align */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</button>

        {/* Media */}
        <button onClick={addImage}>🖼</button>
        <button onClick={addTable}>📊</button>

        {/* Code */}
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>

        {/* Link */}
        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
      </div>

      {/* Editor window */}
      <EditorContent editor={editor} className="p-4 min-h-[300px]" />
    </div>
  );
}
