export const dependencies = {
  "@mdx-js/mdx": "latest",
  "@mdx-js/tag": "latest",
  "mdx-deck": "latest",
  "mdx-deck-code-surfer": "latest",
  "normalize-newline": "latest",
  "gray-matter": "latest",
  react: "latest",
  "react-dom": "latest"
};

const config = {
  templateName: "mdx-deck",
  templateColor: "#222",
  sandpack: {
    defaultExtensions: ["js", "jsx", "ts", "tsx", "json"],
    aliases: {},
    preInstalledDependencies: [],
    transpilers: {
      "\\.mdx$": ["./transpilers/mdx-deck-transpiler", "codesandbox:babel"],
      "\\.jsx?$": ["codesandbox:babel"],
      "\\.json$": ["codesandbox:json"],
      ".*": ["codesandbox:raw"]
    }
  }
};

/* eslint import/no-webpack-loader-syntax: off */
export const files = {
  "/.codesandbox/template.json": {
    code: JSON.stringify(config)
  },
  "/.codesandbox/transpilers/mdx-deck-transpiler.js": {
    code: require("raw-loader!./mdx-deck-transpiler.js")
  },
  "/deck.mdx": {
    code: require("!raw-loader!./default-deck.mdx")
  },
  "/components/my-component.js": {
    code: require("!raw-loader!./my-component.js")
  },
  "/.babelrc": {
    code: `
    {
      "presets": ["@babel/preset-react", "@babel/preset-env"]
    }
    `
  }
};

export const entry = "/deck.mdx";
