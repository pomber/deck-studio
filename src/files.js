import { files } from "./sandbox";

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

export const getFiles = () => {
  const ls = localStorage.getItem("paths");

  if (!ls) {
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

export const saveFile = (sandpack, content) => {
  const path = sandpack.openedPath;
  rIC(() => {
    saveFileAtPath(path, content);
  });
};
