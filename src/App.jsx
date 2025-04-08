import { useState } from "react";
import Editor from "./components/Editor";

const App = () => {
  const [view, setView] = useState(null);

  const executeCode = () => {
    if (view === null) return;

    const code = view.state.doc.toString();

    try {
      console.log("executing code");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          border: "1px solid grey",
        }}
      >
        <Editor setView={setView} />
      </div>
    </>
  );
};

export default App;
