import React from "react";
import { SandpackProvider, FileExplorer } from "react-smooshpack";
import BrowserPreview from "./browser-preview";
import CodePanel from "./code-panel";
import { files, entry } from "./sandbox";
import TripleVerticalSplit from "./utils/triple-vertical-split";

class App extends React.Component {
  render() {
    return (
      <SandpackProvider
        files={files}
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
