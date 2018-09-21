import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
  <div
    style={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <p>Loading...</p>
  </div>,
  document.getElementById("root")
);

const pathname = window.location.pathname;

if (pathname !== "/publish") {
  import("./app").then(m => {
    const App = m.default;
    ReactDOM.render(<App />, document.getElementById("root"));
  });
}
