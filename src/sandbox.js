import preval from "babel-plugin-preval/macro";

// export const files = preval.require("./sandbox-files");
export const files = preval`
const fs = require("fs");
const path = require("path");

const walk = (root, dir, files = {}) => {
  dir = dir || root;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(root, filePath, files);
    } else {
      const sandboxPath =
        "/" + path.relative(root, filePath).replace(/\\\\/g, "/");
      files[sandboxPath] = {
        code: fs.readFileSync(filePath, "utf8")
      };
    }
  });
  return files;
};

module.exports = walk("src/sandbox");
`;

export const entry = "/.entry.js";
