import React from "react";
import CodeEditor from "./code-editor";
import Toolbar from "./toolbar";

class CodePanel extends React.Component {
  render() {
    const { style, ...props } = this.props;
    return (
      <div
        style={{
          heigh: "100%",
          display: "flex",
          flexDirection: "column",
          ...style
        }}
        {...props}
      >
        <Toolbar />
        <div style={{ flex: 1 }}>
          <CodeEditor />
        </div>
      </div>
    );
  }
}

export default CodePanel;
