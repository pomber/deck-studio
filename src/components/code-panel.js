import React from "react";
import CodeEditor from "./code-editor";
import Toolbar from "./toolbar";
import QuickInput from "./quick-input";
import withSandpack from "./withSandpack";

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

const options = {
  NEW_FILE: {
    items: [
      { action: "NEW_COMPONENT", label: "Component" },
      { action: "NEW_CODE_SAMPLE", label: "Code sample (for Code Surfer)" },
      { action: "NEW_IMAGE", label: "Image" }
    ]
  },
  NEW_COMPONENT: {
    items: [
      { action: "CREATE_COMPONENT", label: "foo.js" },
      { action: "CREATE_COMPONENT", label: "bar.js" }
    ]
  }
};

class CodePanel extends React.Component {
  state = {
    action: null
  };

  onAction = (action, payload) => {
    if (action === "CANCEL") {
      this.setState({ action: null });
    } else if (action === "CREATE_COMPONENT") {
      const sandpack = this.props.sandpack;
      sandpack.files["/components/" + payload.label] = { code: "" };
      sandpack.openFile("/components/" + payload.label);
      this.setState({ action: null });
    } else {
      this.setState({ action });
    }
  };

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
        {this.state.action && (
          <QuickInput
            key={this.state.action}
            dispatch={this.onAction}
            options={options[this.state.action]}
          />
        )}
        <Toolbar onFormat={formatCode} onAction={this.onAction} />
        <div style={{ flex: 1 }}>
          <CodeEditor
            resizeEmitter={resizeEmitter}
            onSave={formatCode}
            onAction={this.onAction}
          />
        </div>
      </div>
    );
  }
}

export default withSandpack(CodePanel);
