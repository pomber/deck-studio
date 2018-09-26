import React from "react";
import { render } from "react-dom";
import { SlideDeck } from "mdx-deck";
import { injectGlobal } from "styled-components";

injectGlobal`
  *{box-sizing:border-box}
  body{font-family:system-ui,sans-serif;margin:0}
  html,body{overflow:hidden}
  /* TODO use showOpenInCodeSandbox: false */
  iframe {display: none}
`;

const mod = require("./deck.mdx");
const slides = mod.default;
const { theme, components, Provider } = mod;

export default class App extends React.Component {
  render() {
    return (
      <SlideDeck
        {...this.props}
        slides={slides}
        theme={theme}
        components={components}
        Provider={Provider}
      />
    );
  }
}

if (typeof document !== "undefined") {
  render(<App />, document.getElementById("root"));
}

if (module.hot) module.hot.accept();
