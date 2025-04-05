import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

function Editor({ setView }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef === null) return;

    const state = EditorState.create({
      doc: 'console.log("Hello world")',
      extensions: [
        basicSetup,
        javascript(),
        EditorView.theme({
          ".cm-content": { color: "#2b80bb", backgroundColor: "#fef2e9" },
          "&.cm-focused .cm-content": {
            color: "green",
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(null);
    };
  }, [editorRef.current]);

  return (
    <>
      <section ref={editorRef} style={{ margin: "1rem" }}></section>
    </>
  );
}

export default Editor;
