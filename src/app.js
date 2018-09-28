import React from "react";
import { SandpackProvider, FileExplorer } from "react-smooshpack";
import BrowserPreview from "./components/browser-preview";
import CodePanel from "./components/code-panel";
import { dependencies, files, entry } from "./sandbox/sandbox";
import TripleVerticalSplit from "./utils/triple-vertical-split";

import "react-smooshpack/dist/styles.css";

class App extends React.Component {
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
        <TripleVerticalSplit
          left={BrowserPreview}
          middle={CodePanel}
          right={FileExplorer}
          leftSize="60%"
          middleSize="100%"
        />
      </SandpackProvider>
    );
  }
}

export default App;
