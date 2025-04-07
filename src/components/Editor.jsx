import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import CustomMenu from "./CustomMenu";

function Editor({ setView }) {
  const editorRef = useRef(null);
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  //// editor display code

  useEffect(() => {
    if (editorRef.current === null) return;

    const state = EditorState.create({
      doc: `console.log("Hello world");

Press "shift + right click" within the editor lines 1-6
to access custom context menu

      `,
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

  //// context menu

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
      <section
        onContextMenu={(e) => handleContextMenu(e)}
        ref={editorRef}
        style={{ margin: "1rem" }}
      ></section>
    </>
  );
}

export default Editor;
