import { useState } from "react";
import Editor from "./Editor";
import { EditorView } from "@codemirror/view";

const App = () => {
  const [view, setView] = useState(null);

  const formatCode = () => {
    if (view === null) return;

    const code = view.state.doc.toString();

    try {
      new Function(code)();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Editor setView={setView} />
    </>
  );
};

export default App;
