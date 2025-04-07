function CustomMenu({ onAction, mouseX, mouseY, isToggled, contextMenuRef }) {
  return (
    <>
      <div
        ref={contextMenuRef}
        className="custom-menu"
        style={{
          display: `${isToggled ? "flex" : "none"}`,

          flexDirection: "column",
          width: "100px",
          border: "1px solid grey",
          borderRadius: "5px",
          position: "absolute",
          top: mouseY,
          left: mouseX,
        }}
      >
        <button
          onClick={() => onAction("reference")}
          style={{
            border: "1px solid rgb(255, 255, 255)",
            padding: "10px",
            borderRadius: "2px",
          }}
        >
          References
        </button>
        <button
          onClick={() => onAction("cut")}
          style={{
            border: "1px solid rgb(255, 255, 255)",
            padding: "10px",
            borderRadius: "2px",
          }}
        >
          Cut
        </button>
        <button
          onClick={() => onAction("copy")}
          style={{
            border: "1px solid rgb(255, 255, 255)",
            padding: "10px",
            borderRadius: "2px",
          }}
        >
          Copy
        </button>
      </div>
    </>
  );
}

export default CustomMenu;
