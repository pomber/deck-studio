import React from "react";
import withSandpack from "./withSandpack";
import monaco from "monaco-editor";

class CodeEditor extends React.Component {
  render() {
    return (
      <div
        ref={container =>
          monaco.editor.create(container, {
            value: "console.log('hello')",
            language: "javascript"
          })
        }
      />
    );
  }
}

export default withSandpack(CodeEditor);
