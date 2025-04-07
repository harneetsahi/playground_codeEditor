import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import { EditorView } from "@codemirror/view";
import CustomMenu from "./components/CustomMenu";

const App = () => {
  const [view, setView] = useState(null);
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const executeCode = () => {
    if (view === null) return;

    const code = view.state.doc.toString();

    try {
      new Function(code)();
    } catch (error) {
      console.error(error);
    }
  };

  function handleAction() {
    console.log("handle clicked action");
  }

  function handleContextMenu(e) {
    if (e.shiftKey) {
      e.preventDefault();

      const contextMenuProps = contextMenuRef.current.getBoundingClientRect();

      console.log(contextMenuProps);
      console.log(e.clientX);

      const leftPosition = e.clientX < 500 / 2; // because I set the editor width to 500

      const topPosition = e.clientY < 300 / 2;

      let x;
      let y;

      if (leftPosition) {
        x = e.clientX;
      } else {
        x = e.clientX - contextMenuProps.width;
      }

      if (topPosition) {
        y = e.clientY;
      } else {
        y = e.clientY - contextMenuProps.height;
      }

      setContextMenu({
        position: {
          x: x,
          y: y,
        },
        toggled: true,
      });
    }
  }

  useEffect(() => {
    function handler(e) {
      console.log(e.target);
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          setContextMenu({
            position: {
              x: 0,
              y: 0,
            },
            toggled: false,
          });
        }
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      <CustomMenu
        onAction={handleAction}
        isToggled={contextMenu.toggled}
        contextMenuRef={contextMenuRef}
        mouseX={contextMenu.position.x}
        mouseY={contextMenu.position.y}
      />
      <div
        style={{
          position: "relative",
          height: "300px",
          width: "500px",
          border: "1px solid grey",
        }}
        onContextMenu={(e) => handleContextMenu(e)}
      >
        <Editor setView={setView} style={{ height: "100px" }} />
      </div>
    </>
  );
};

export default App;
