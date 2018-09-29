import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const pathname = window.location.pathname;

if (pathname !== "/publish") {
  import("./app").then(m => {
    const App = m.default;
    ReactDOM.render(<App />, document.getElementById("root"));
  });
}
