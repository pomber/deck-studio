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
    ],
    placeholder: "New ..."
  },
  NEW_COMPONENT: {
    type: "input",
    label: name => (
      <span>
        Pick a name for the file: ./components/
        <strong style={{ whiteSpace: "nowrap" }}>
          {name || "my-component"}
        </strong>
        .js
      </span>
    ),
    placeholder: "my-component",
    doneAction: "CREATE_COMPONENT"
  },
  NEW_CODE_SAMPLE: {
    type: "input",
    label: name => (
      <span>
        Pick a name for the file: ./samples/
        <strong style={{ whiteSpace: "nowrap" }}>
          {name || "my-sample.js"}
        </strong>
      </span>
    ),
    placeholder: "my-sample",
    doneAction: "CREATE_CODE_SAMPLE"
  },
  SHOW_OPEN_FILE: {
    items: [
      { action: "OPEN_FILE", label: "deck.mdx" },
      { action: "NEW_CODE_SAMPLE", label: "Code sample (for Code Surfer)" },
      { action: "NEW_IMAGE", label: "Image" }
    ],
    placeholder: "New ..."
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
      sandpack.files["/components/" + payload + ".js"] = { code: "" };
      sandpack.openFile("/components/" + payload + ".js");
      this.setState({ action: null });
    } else if (action === "CREATE_CODE_SAMPLE") {
      const sandpack = this.props.sandpack;
      sandpack.files["/samples/" + payload] = { code: "" };
      sandpack.openFile("/samples/" + payload);
      this.setState({ action: null });
    } else if (action === "OPEN_FILE") {
      const sandpack = this.props.sandpack;
      sandpack.openFile("/" + payload.label);
      this.setState({ action: null });
    } else {
      this.setState({ action });
    }
  };

  getAction = () => {
    const type = this.state.action;
    if (!type) {
      return null;
    } else if (type === "SHOW_OPEN_FILE") {
      return {
        items: Object.keys(this.props.sandpack.files)
          .map(path => path.slice(1))
          .filter(path => !path.startsWith(".") && path !== "package.json")
          .map(path => ({
            label: path,
            action: "OPEN_FILE"
          }))
      };
    } else {
      return options[this.state.action];
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
            options={this.getAction()}
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
