import React from "react";
import {
  FileExplorer,
  CodeMirror,
  TranspiledCodeView,
  SandpackProvider
} from "react-smooshpack";
import BrowserPreview from "./components/browser-preview";
import { dependencies, files, entry } from "./sandbox";

import "react-smooshpack/dist/styles.css";

const App = () => (
  <SandpackProvider
    files={files}
    dependencies={dependencies}
    entry={entry}
    template="custom"
    bundlerURL="https://sandpack-0-0-51.codesandbox.io/"
    style={{ height: "100%" }}
  >
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <FileExplorer style={{ width: 150 }} />
      <CodeMirror
        style={{
          flex: 1,
          overflow: "hidden"
        }}
      />
      <BrowserPreview style={{ flex: 2, overflow: "hidden" }} />
    </div>
  </SandpackProvider>
);
export default App;
