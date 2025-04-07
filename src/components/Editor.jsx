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
      doc: `console.log("custom context menu");

Hold "shift" when right clicking within the editor (lines 1-6)
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

      const contextMenuRect = contextMenuRef.current.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      let x = e.clientX - editorRect.left;
      let y = e.clientY - editorRect.top;

      x = Math.min(Math.max(x, 0), editorRect.width - contextMenuRect.width);
      y = Math.min(Math.max(y, 0), editorRect.height - contextMenuRect.height);

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
        style={{ padding: "1rem" }}
      ></section>
    </>
  );
}

export default Editor;
