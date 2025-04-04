import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

function App() {
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: 'console.log("Hello world")',
      extensions: [basicSetup, javascript()],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [editorRef.current]);

  return (
    <>
      <div ref={editorRef} style={{ margin: "1rem" }}></div>;
    </>
  );
}

export default App;
