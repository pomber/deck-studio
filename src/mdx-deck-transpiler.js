import normalizeNewline from "normalize-newline";
import mdx from "@mdx-js/mdx";

const template = slides => `
import React from "react";
import ReactDOM from "react-dom";
import { MDXTag } from '@mdx-js/tag';
import { SlideDeck } from "mdx-deck";

class App extends React.Component {
  render () {
    return (
      <SlideDeck
        {...this.props}
        slides={[${slides}]}
      />
    )
  }
}

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

if (module.hot) module.hot.accept()
`;

const SLIDEREG = /\n---\n/;

export async function transpile(code, loaderContext) {
  console.log("transpiling", code);

  const content = code;

  const modules = [];
  const slides = normalizeNewline(content)
    .split(SLIDEREG)
    .map(str => {
      const code = mdx.sync(str, { skipExport: true });
      console.log(`${str} ===> ${code}`);
      const lines = code.split("\n");
      const tagIndex = lines.findIndex(str => /^</.test(str));
      modules.push(...lines.slice(0, tagIndex).filter(Boolean));
      const jsx = lines.slice(tagIndex).join("\n");

      return `({ components, ...props }) => ${jsx}`;
    })
    .map(str => str.trim());

  return {
    transpiledCode: template(slides)
  };
}
