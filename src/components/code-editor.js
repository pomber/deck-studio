import React from "react";
import MonacoEditor from "react-monaco-editor";
import { KeyCode, KeyMod } from "monaco-editor";

import withSandpack from "./withSandpack";
import getLanguage from "./language-detector";

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
    const { sandpack, resizeEmitter, onSave, onAction, actions } = this.props;
    const { openedPath, files } = sandpack;
    const openedFile = files[openedPath];
    const language = getLanguage(openedPath).lang;
    return (
      <MonacoEditor
        height="100%"
        options={options}
        value={openedFile.code}
        onChange={this.onChange}
        language={language === "mdx" ? "markdown" : language}
        editorDidMount={editor => {
          resizeEmitter.subscribe(() => editor.layout());
          editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () =>
            onSave(this.props.sandpack)
          );
          editor.addCommand(KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_N, () =>
            onAction("NEW_FILE")
          );
          editor.addCommand(KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_P, () =>
            onAction("SHOW_OPEN_FILE")
          );
          actions.forEach(action => editor.addAction(action));
        }}
      />
    );
  }
}

export default withSandpack(CodeEditor);
