import { files as templateFiles } from "./sandbox";

const getToken = () => localStorage["gh-token"];
const setToken = token => (localStorage["gh-token"] = token);
export const isLoggedIn = () => !!getToken();

export const login = async ghCode => {
  const response = await fetch("/.netlify/functions/gh-token?code=" + ghCode);
  const { access_token } = await response.json();
  setToken(access_token);
};

const escapePath = path => path.replace(/\//g, "__");
const unescapePath = path => path.replace(/__/g, "/");
const rIC = requestIdleCallback || (cb => setTimeout(cb, 10));
const getKey = path => `file:${path}`;

const saveFileAtPath = (path, content) => {
  const paths = localStorage.getItem("paths").split(",");
  if (!paths.includes(path)) {
    paths.push(path);
    localStorage.setItem("paths", paths);
  }
  localStorage.setItem(getKey(path), content);
};

const getFilesFromTemplate = async () => templateFiles;

const getFilesFromLocalStorage = async () => {
  const ls = localStorage.getItem("paths");

  if (!ls) {
    const files = getFilesFromTemplate();
    rIC(() => {
      const paths = Object.keys(files);
      localStorage.setItem("paths", paths);
      paths.forEach(path => saveFileAtPath(path, files[path].code));
    });
    return files;
  }

  const paths = ls.split(",");
  const fileList = paths.map(path => ({
    [path]: { code: localStorage.getItem(getKey(path)) }
  }));
  const storedFiles = Object.assign({}, ...fileList);
  return storedFiles;
};

const getFilesFromGist = async gistId => {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);
  const result = await response.json();
  const { owner, files } = result;
  const sandpackFiles = Object.assign(
    {},
    ...Object.keys(files).map(path => ({
      [unescapePath(path)]: { code: files[path].content }
    }))
  );
  localStorage["currentGistId"] = gistId;
  return sandpackFiles;
};

export const getFiles = async gistId => {
  return gistId ? getFilesFromGist(gistId) : getFilesFromLocalStorage();
};

export const forkDeck = async () => {
  //TODO handle forking gist (instead of local storage)
  const files = await getFiles();
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
      // TODO name this
      description: "deck-run",
      public: true,
      files: gistFiles
    })
  });
  const json = await response.json();
  const gistId = json.id;
  localStorage["currentGistId"] = gistId;
  return gistId;
};

export const saveFile = async (sandpack, content) => {
  //TODO save gist
  const path = sandpack.openedPath;
  rIC(() => {
    saveFileAtPath(path, content);
  });
};
