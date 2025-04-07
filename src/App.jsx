import { useState } from "react";
import Editor from "./components/Editor";

const App = () => {
  const [view, setView] = useState(null);

  const executeCode = () => {
    if (view === null) return;

    const code = view.state.doc.toString();

    // try {
    //   new Function(code)();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "300",
          width: "700px",
          border: "1px solid grey",
        }}
      >
        <Editor setView={setView} style={{ height: "500px" }} />
      </div>
    </>
  );
};

export default App;
