import React from "react";
import withSandpack from "./withSandpack";

const apiUrl = "https://deck-studio-publish.now.sh";
// const apiUrl = "http://localhost:3000";

const getFiles = sandpack =>
  Object.keys(sandpack.files)
    .map(file => ({
      file: file.slice(1),
      data: sandpack.files[file].code
    }))
    .filter(
      item =>
        !item.file.startsWith(".codesandbox") &&
        !["package.json", "Dockerfile", ".babelrc"].includes(item.file)
    );

class Toolbar extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          padding: "0.5rem",
          borderRadius: "2px",
          borderBottom: "1px solid #ddd",
          alignItems: "center",
          minHeight: "43px",
          background: "whitesmoke"
        }}
      >
        <div style={{ flex: 1 }} />
        <div>
          <button
            style={{
              transition: "0.3s ease background-color",
              padding: "2px",
              margin: "0 0.25rem",
              backgroundColor: "transparent",
              border: "0",
              outline: "0",
              display: "flex",
              alignItems: "center",
              color: "#555",
              verticalAlign: "middle",
              cursor: "pointer"
            }}
            onClick={() => {
              const files = getFiles(this.props.sandpack);
              const popup = window.open("publish");
              fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(files)
              })
                .then(res => res.text())
                .then(url => {
                  popup.location = url;
                  popup.focus();
                });
            }}
          >
            PUBLISH
          </button>
        </div>
      </div>
    );
  }
}

export default withSandpack(Toolbar);
