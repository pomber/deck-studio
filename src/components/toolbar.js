import React from "react";
import withSandpack from "./withSandpack";

class Toolbar extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          padding: "0.5rem",
          borderRadius: "2px",
          borderBottom: "1px solid #ddd",
          alignItems: "center",
          minHeight: "43px",
          background: "whitesmoke"
        }}
      >
        <div style={{ flex: 1 }} />
        <div>
          <button
            style={{
              transition: "0.3s ease background-color",
              padding: "2px",
              margin: "0 0.25rem",
              backgroundColor: "transparent",
              border: "0",
              outline: "0",
              display: "flex",
              alignItems: "center",
              color: "#555",
              verticalAlign: "middle",
              cursor: "pointer"
            }}
            onClick={() => {
              console.log(this.props.sandpack.files);
              alert("soon...");
            }}
          >
            PUBLISH
          </button>
        </div>
      </div>
    );
  }
}

export default withSandpack(Toolbar);
