import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { login, isLoggedIn, forkDeck, getFiles } from "./storage";

const pathname = window.location.pathname;
const urlParams = new URLSearchParams(window.location.search);

const renderApp = async gistId => {
  if (!gistId && isLoggedIn()) {
    forkLocalDeck();
  }

  const filesPromise = getFiles(gistId);
  const { default: App } = await import("./app");
  const files = await filesPromise;

  ReactDOM.render(<App files={files} />, document.getElementById("root"));
};

const forkLocalDeck = async () => {
  const gistId = await forkDeck();
  window.history.replaceState(null, null, `/x/${gistId}`);
};

if (pathname === "/cb/gh") {
  const ghCode = urlParams.get("code");
  login(ghCode).then(() => (window.location = "/"));
} else if (pathname === "/" || pathname.startsWith("/x/")) {
  const gistId = pathname.startsWith("/x/") && pathname.slice(3);
  renderApp(gistId);
}
