import React from "react";
import withSandpack from "./withSandpack";

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

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

        <Menu>
          <MenuButton
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4.075 17.949"
              style={{ height: "16px", width: "16px", display: "block" }}
            >
              <circle
                cx="2.038"
                cy="2.668"
                r="1.852"
                style={{ fill: "currentcolor" }}
              />
              <circle
                cx="2.038"
                cy="8.974"
                r="1.852"
                style={{ fill: "currentcolor" }}
              />
              <circle
                cx="2.038"
                cy="15.28"
                r="1.852"
                style={{ fill: "currentcolor" }}
              />
            </svg>
          </MenuButton>
          <MenuList style={{ padding: 0, marginTop: 6 }}>
            <MenuItem
              onSelect={() =>
                setTimeout(() => this.props.onAction("NEW_FILE"), 0)
              }
            >
              New File...
            </MenuItem>
            <MenuItem
              onSelect={() =>
                setTimeout(() => this.props.onAction("SHOW_OPEN_FILE"), 0)
              }
            >
              Go to File...
            </MenuItem>
            <MenuItem onSelect={() => this.props.onFormat(this.props.sandpack)}>
              Run Prettier
            </MenuItem>
            <MenuItem
              onSelect={() => {
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
              Publish
            </MenuItem>
            <div style={{ borderTop: "1px solid hsla(0, 0%, 0%, 0.25)" }} />
            <MenuLink
              component="a"
              href="https://github.com/pomber/deck-studio"
            >
              GitHub
            </MenuLink>
          </MenuList>
        </Menu>
      </div>
    );
  }
}

export default withSandpack(Toolbar);
