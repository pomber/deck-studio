import React from "react";
import {
  CodeMirror,
  SandpackProvider,
  TranspiledCodeView
} from "react-smooshpack";
import CodeEditor from "./components/code-editor";
import SplitPane from "react-split-pane";
import BrowserPreview from "./components/browser-preview";
import { dependencies, files, entry } from "./sandbox";

import "react-smooshpack/dist/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false
    };
  }

  render() {
    return (
      <SandpackProvider
        files={files}
        dependencies={dependencies}
        entry={entry}
        template="custom"
        bundlerURL="https://sandpack-0-0-51.codesandbox.io/"
        style={{ height: "100%" }}
      >
        <SplitPane
          split="vertical"
          defaultSize="60%"
          onDragStarted={() => {
            this.setState({
              isDragging: true
            });
          }}
          onDragFinished={() => {
            this.setState({
              isDragging: false
            });
          }}
        >
          <BrowserPreview
            style={{
              overflow: "hidden",
              height: "100%",
              pointerEvents: this.state.isDragging && "none"
            }}
          />
          <CodeEditor
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
              pointerEvents: this.state.isDragging && "none"
            }}
          />
        </SplitPane>
      </SandpackProvider>
    );
  }
}

export default App;
