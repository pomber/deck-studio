import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const pathname = window.location.pathname;

if (pathname === "/cb/gh") {
  const urlParams = new URLSearchParams(window.location.search);
  const ghCode = urlParams.get("code");
  fetch("/.netlify/functions/gh-token?code=" + ghCode)
    .then(response => response.json())
    .then(({ access_token }) => {
      localStorage["gh-token"] = access_token;
      window.location = "/";
    });
} else if (pathname !== "/publish") {
  import("./app").then(m => {
    const App = m.default;
    ReactDOM.render(<App />, document.getElementById("root"));
  });
}
