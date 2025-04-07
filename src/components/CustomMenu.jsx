function CustomMenu({ onAction, mouseX, mouseY, isToggled, contextMenuRef }) {
  return (
    <>
      <div
        ref={contextMenuRef}
        className="custom-menu"
        style={{
          display: `${isToggled ? "flex" : "none"}`,
          zIndex: "10",
          flexDirection: "column",
          width: "100px",
          padding: "2px 10px",
          borderRadius: "5px",
          backgroundColor: "rgba(82, 82, 82, 0.98)",
          position: "absolute",
          top: mouseY,
          left: mouseX,
        }}
      >
        <button
          onClick={() => onAction("reference")}
          style={{
            padding: "8px",
            textAlign: "left",
            border: "none",
            borderBottom: "1px solid rgb(111, 110, 110)",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          References
        </button>
        <button
          onClick={() => onAction("cut")}
          style={{
            padding: "8px",
            textAlign: "left",
            border: "none",
            borderBottom: "1px solid rgb(111, 110, 110)",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          Cut
        </button>
        <button
          onClick={() => onAction("copy")}
          style={{
            padding: "8px",
            textAlign: "left",
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          Copy
        </button>
      </div>
    </>
  );
}

export default CustomMenu;
