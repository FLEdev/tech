import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $createParagraphNode } from "lexical";
type Props = { initialContent?: string }

export  const LoadInitialContent = ({ initialContent }: Props) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialContent) { return; }
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialContent, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      nodes.forEach(n => root.append(n));
    });
  }, []);
  return null;
};
