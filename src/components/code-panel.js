import React from "react";
import CodeEditor from "./code-editor";
import Toolbar from "./toolbar";

import prettier from "prettier/standalone";
import markdownPlugin from "prettier/parser-markdown";
import babylonPlugin from "prettier/parser-babylon";

const formatCode = sandpack => {
  const currentCode = sandpack.files[sandpack.openedPath].code;
  const newCode = prettier.format(currentCode, {
    parser: "mdx",
    plugins: [markdownPlugin, babylonPlugin]
  });
  sandpack.updateFiles({
    ...sandpack.files,
    [sandpack.openedPath]: {
      code: newCode
    }
  });
};

class CodePanel extends React.Component {
  render() {
    const { style, resizeEmitter, ...props } = this.props;
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
        <Toolbar onFormat={formatCode} />
        <div style={{ flex: 1 }}>
          <CodeEditor resizeEmitter={resizeEmitter} onSave={formatCode} />
        </div>
      </div>
    );
  }
}

export default CodePanel;
