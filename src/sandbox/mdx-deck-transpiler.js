import normalizeNewline from "normalize-newline";
import mdx from "@mdx-js/mdx";
import matter from "gray-matter";
import stringifyObject from "stringify-object";

const SLIDEREG = /\n---\n/;

export async function transpile(code, loaderContext) {
  const { data, content } = matter(code);

  const modules = [];
  const slides = normalizeNewline(content)
    .split(SLIDEREG)
    .map(str => {
      console.log("str", str);
      const code = mdx.sync(str, { skipExport: true });
      console.log("code", code);
      const lines = code.split("\n");
      const tagIndex = lines.findIndex(str => /^</.test(str));
      modules.push(...lines.slice(0, tagIndex).filter(Boolean));
      console.log("modules", modules);
      const jsx = lines.slice(tagIndex).join("\n");
      console.log("jsx", jsx);

      return `({ components, ...props }) => ${jsx}`;
    })
    .map(str => str.trim());

  return {
    transpiledCode: `
import React from 'react'
import { MDXTag } from '@mdx-js/tag'
${modules.join("\n")}
export const meta = ${stringifyObject(data)}
export default [
  ${slides.join(",\n\n")}
]`
  };
}
