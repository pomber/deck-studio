import normalizeNewline from "normalize-newline";
import mdx from "@mdx-js/mdx";
import matter from "gray-matter";

const template = (slides, modules, hasTheme) => `
import React from "react";
import ReactDOM from "react-dom";
import { MDXTag } from '@mdx-js/tag';
import { SlideDeck } from "mdx-deck";
import { injectGlobal } from "styled-components";

${modules.join("\n")}

class App extends React.Component {
  render () {
    return (
      <SlideDeck
        {...this.props}
        slides={[${slides}]}        
        ${hasTheme && "theme={theme}"}
      />
    )
  }
}

injectGlobal\`
  *{box-sizing:border-box}
  body{font-family:system-ui,sans-serif;margin:0}
  html,body{overflow:hidden}
\`

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

  const { data, content } = matter(code);

  console.log("data", data);

  let modules = [];
  const slides = normalizeNewline(content)
    .split(SLIDEREG)
    .map(str => {
      const code = mdx.sync(str, { skipExport: true });
      const lines = code.split("\n");
      const tagIndex = lines.findIndex(str => /^</.test(str));
      modules.push(...lines.slice(0, tagIndex).filter(Boolean));
      const jsx = lines.slice(tagIndex).join("\n");

      return `({ components, ...props }) => ${jsx}`;
    })
    .map(str => str.trim());

  console.log("modules", modules);

  // TODO snapshot test exports
  const hasTheme = modules.some(
    m => m.startsWith("export") && m.includes(" theme ")
  );
  modules = modules.map(m => m.replace(/^export/, "import"));

  console.log("post", modules);

  return {
    transpiledCode: template(slides, modules, hasTheme)
  };
}
