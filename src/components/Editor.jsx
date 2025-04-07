import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";

function Editor({ setView }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef === null) return;

    const state = EditorState.create({
      doc: 'console.log("Hello world");',
      extensions: [basicSetup, javascript(), autocompletion()],
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
