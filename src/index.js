import React from "react";
import ReactDOM from "react-dom";
import { login, isLoggedIn, forkDeck, getFilesFromGist } from "./github-api";
import "./index.css";
import { getFiles } from "./files";

const pathname = window.location.pathname;
const urlParams = new URLSearchParams(window.location.search);

const renderApp = async files => {
  const { default: App } = await import("./app");
  ReactDOM.render(<App files={files} />, document.getElementById("root"));
};

if (pathname === "/cb/gh") {
  const ghCode = urlParams.get("code");
  login(ghCode).then(() => (window.location = "/"));
} else if (pathname === "/") {
  renderApp(getFiles());
  if (isLoggedIn()) {
    forkDeck().then(({ id }) =>
      window.history.replaceState(null, null, `/x/${id}`)
    );
  }
} else if (pathname.startsWith("/x/")) {
  const id = pathname.slice(3);
  getFilesFromGist(id).then(files => renderApp(files));
}
