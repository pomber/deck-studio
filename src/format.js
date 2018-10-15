import prettier from "prettier/standalone";
import markdownPlugin from "prettier/parser-markdown";
import babylonPlugin from "prettier/parser-babylon";

export default async (code, parser, semi) => {
  return prettier.format(code, {
    parser,
    plugins: [markdownPlugin, babylonPlugin],
    semi
  });
};
