import React from "react";
import {
  SandpackProvider,
  FileExplorer,
  TranspiledCodeView
} from "react-smooshpack";
import SplitPane from "react-split-pane";
import BrowserPreview from "./components/browser-preview";
import CodePanel from "./components/code-panel";
import { dependencies, files, entry } from "./sandbox";

import "react-smooshpack/dist/styles.css";

const resizeEmitter = {
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
  },
  trigger() {
    this.listeners.forEach(cb => cb());
  }
};

window.addEventListener("resize", () => resizeEmitter.trigger());

class App extends React.Component {
  state = {
    isDragging: false
  };

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
            resizeEmitter.trigger();
          }}
        >
          <BrowserPreview
            style={{
              overflow: "hidden",
              height: "100%",
              pointerEvents: this.state.isDragging && "none"
            }}
          />
          <SplitPane
            split="vertical"
            defaultSize="100%"
            onDragStarted={() => {
              this.setState({
                isDragging: true
              });
            }}
            onDragFinished={() => {
              this.setState({
                isDragging: false
              });
              resizeEmitter.trigger();
            }}
          >
            <CodePanel
              resizeEmitter={resizeEmitter}
              style={{
                overflow: "hidden",
                width: "100%",
                height: "100%",
                pointerEvents: this.state.isDragging && "none"
              }}
            />
            <FileExplorer style={{ height: "100%" }} />
          </SplitPane>
        </SplitPane>
      </SandpackProvider>
    );
  }
}

export default App;
