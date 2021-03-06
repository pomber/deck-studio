import React from "react";
import MonacoEditor from "react-monaco-editor";

import withSandpack from "./utils/withSandpack";
import getLanguage from "./utils/language-detector";

import actions from "./actions";

const options = {
  minimap: { enabled: false },
  lineNumbers: "on",
  scrollBeyondLastLine: false,
  theme: "vs-dark"
};

class CodeEditor extends React.Component {
  onChange = value => {
    const newFiles = {
      ...this.props.sandpack.files,
      [this.props.sandpack.openedPath]: {
        code: value
      }
    };

    this.props.sandpack.updateFiles(newFiles);
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { sandpack, resizeEmitter, dispatch } = this.props;
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
          this.editor = editor;
          editor.focus();
          resizeEmitter.subscribe(() => editor.layout());
          actions
            .filter(action => action.keybindings)
            .forEach(action =>
              editor.addCommand(action.keybindings[0], () => dispatch(action))
            );
          // actions.forEach(action => editor.addAction(action));
        }}
      />
    );
  }
}

export default withSandpack(CodeEditor);
