import React from "react";
import MonacoEditor from "react-monaco-editor";

import withSandpack from "./withSandpack";

const options = {
  minimap: { enabled: false },
  lineNumbers: "on",
  scrollBeyondLastLine: false
  // theme: "vs-dark"
};

class CodeEditor extends React.Component {
  onChange = value => {
    this.props.sandpack.updateFiles({
      ...this.props.sandpack.files,
      [this.props.sandpack.openedPath]: {
        code: value
      }
    });
  };

  render() {
    const { openedPath, files } = this.props.sandpack;
    return (
      <MonacoEditor
        height="100%"
        options={options}
        value={files[openedPath].code}
        onChange={this.onChange}
        language="markdown"
      />
    );
  }
}

export default withSandpack(CodeEditor);
