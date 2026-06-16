
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";


const initState = JSON.stringify({
  root: {
    children: [
      {
      /*  children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],*/
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

export default function LoadState() {
  const [editor] = useLexicalComposerContext();
  //
  useEffect(() => {
    const newState = editor.parseEditorState(initState);
    editor.setEditorState(newState);
    editor.setEditable(true);
  }, []);

  return <></>;
}
