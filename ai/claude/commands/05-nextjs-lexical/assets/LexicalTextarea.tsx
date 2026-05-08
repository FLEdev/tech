"use client";

import { $getRoot, $createTextNode, $createParagraphNode } from "lexical";
import { $generateHtmlFromNodes } from '@lexical/html';
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

//import { BaseTheme } from "@/components/input/lexical/theme/BaseTheme";
import QissaTheme from "./lexical/theme/QissaTheme";
import "./lexical/style.css";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";

import LoadState from "@/components/lexical/plugins/LoadState";
import { LoadInitialContent } from "@/components/lexical/plugins/LoadInitContent";
import DraggableBlockPlugin from "./lexical/plugins/DraggableBlockPlugin";

import ToolbarPlugin from "./lexical/plugins/ToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./lexical/plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./lexical/plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./lexical/plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export interface LexicalTextareaRef {
  getContent: () => string;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}


function ContentGetter({ ref }: { ref: React.Ref<LexicalTextareaRef> }) {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    getContent: () => {
      let content = '';
      editor.read(() => {
        const root = $getRoot();
        // content = root.getTextContent();
        content = $generateHtmlFromNodes(editor, null);
      });

      return content;
    },
  }));

  return null;
}

const Editor = forwardRef<LexicalTextareaRef, { content?: string }>(
  function Editor({ content }, ref) {
    const initialConfig = {
      namespace: "TextareaLexical",
      theme: QissaTheme,
      onError(error: Error) {
        throw error;
      },
      nodes: [
        HeadingNode,
        CodeHighlightNode,
        CodeNode,
        HeadingNode,
        ListNode,
        ListItemNode,
        CodeNode,
        CodeHighlightNode,
        AutoLinkNode,
        LinkNode,
        MarkNode,
        QuoteNode,

      ],
      editable: true,
    };

    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
      if (_floatingAnchorElem !== null) {
        setFloatingAnchorElem(_floatingAnchorElem);
      }
    };

    // <OnChangeLexical value={content} onChange={() => { }} />
    return (
      <div className="mx-0 bg-white border rounded-lg h-auto w-auto">
        <LexicalComposer initialConfig={initialConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner" ref={onRef}>
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />

              <ListMaxIndentLevelPlugin maxDepth={7} />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

              {floatingAnchorElem && (
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              )}

              <ContentGetter ref={ref} />
              <LoadState />
              <LoadInitialContent initialContent={content} />
            </div>
          </div>
        </LexicalComposer>
      </div>
    );
  }
);

export default Editor;
