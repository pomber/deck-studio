import { getFiles } from "./files";

export const login = async ghCode => {
  const response = await fetch("/.netlify/functions/gh-token?code=" + ghCode);
  const { access_token } = await response.json();
  localStorage["gh-token"] = access_token;
  return;
};

const escapePath = path => path.replace(/\//g, "__");
const unescapePath = path => path.replace(/__/g, "/");

export const isLoggedIn = () => !!localStorage["gh-token"];

export const forkDeck = async () => {
  const files = getFiles();
  const gistFiles = Object.assign(
    {},
    ...Object.keys(files).map(path => ({
      [escapePath(path)]: { content: files[path].code }
    }))
  );
  const response = await fetch("https://api.github.com/gists", {
    method: "post",
    headers: new Headers({
      authorization: "Bearer " + localStorage["gh-token"]
    }),
    body: JSON.stringify({
      description: "deck-run: Foo Bar",
      public: true,
      files: gistFiles
    })
  });
  const json = await response.json();
  return json;
};

export const getFilesFromGist = async gistId => {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);
  const { owner, files } = await response.json();
  const sandpackFiles = Object.assign(
    {},
    ...Object.keys(files).map(path => ({
      [unescapePath(path)]: { code: files[path].content }
    }))
  );
  return sandpackFiles;
};
