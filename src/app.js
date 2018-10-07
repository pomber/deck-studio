import React from "react";
import { SandpackProvider, FileExplorer } from "react-smooshpack";
import BrowserPreview from "./browser-preview";
import CodePanel from "./code-panel";
import { entry } from "./sandbox";
import TripleVerticalSplit from "./utils/triple-vertical-split";
import { getFiles, saveFile } from "./files";
import styled from "styled-components";

// TODO this breaks with webpack 4 because of "sideEffects: false" (https://github.com/facebook/create-react-app/issues/5140)
// PR: https://github.com/CompuIves/codesandbox-client/pull/1133
// import "react-smooshpack/dist/styles.css";
import "./react-smooshpack/styles.css";
import MessageBar from "./message-bar";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

class App extends React.Component {
  render() {
    return (
      <SandpackProvider
        files={getFiles()}
        onFileChange={(files, sandpack) =>
          saveFile(sandpack, files[sandpack.openedPath].code)
        }
        entry={entry}
        template="custom"
        bundlerURL="https://sandpack-0-0-51.codesandbox.io/"
        style={{ height: "100%" }}
      >
        <FlexColumn>
          <div style={{ flex: 1, position: "relative" }}>
            <TripleVerticalSplit
              left={BrowserPreview}
              middle={CodePanel}
              right={FileExplorer}
              leftSize="60%"
              middleSize="100%"
            />
          </div>
          <MessageBar />
        </FlexColumn>
      </SandpackProvider>
    );
  }
}

export default App;
