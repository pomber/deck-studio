import React from "react";
import { KeyCode, KeyMod } from "monaco-editor";

import getLanguage from "./utils/language-detector";

const formatPromise = import("./format");

const getFiles = sandpack =>
  Object.keys(sandpack.files)
    .map(file => ({
      file: file.slice(1),
      data: sandpack.files[file].code
    }))
    .filter(
      item =>
        !item.file.startsWith(".codesandbox") &&
        !["package.json", "Dockerfile", ".babelrc"].includes(item.file)
    );

const getById = id => actions.find(action => action.id === id);

const actions = [
  { id: "cancel-options", run: ({ setUserOptions }) => setUserOptions(null) },
  {
    id: "new-file-options",
    label: "New File...",
    showInMenu: true,
    keybindings: [KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_N],
    shortcutLabel: "Ctrl+Alt+N",

    run: ({ setUserOptions }) => {
      setUserOptions({
        items: [
          { action: getById("new-component-options"), label: "Component" },
          {
            action: getById("new-code-sample-options"),
            label: "Code Sample (for Code Surfer)"
          }
          // { action: getById("new-image-options"), label: "Image" }
        ],
        cancelAction: getById("cancel-options"),
        placeholder: "New ..."
      });
    }
  },
  {
    id: "new-component-options",
    label: "New Component ...",
    run: ({ setUserOptions }) => {
      setUserOptions({
        type: "input",
        label: name => (
          <span>
            Pick a name for the file: ./components/
            <strong style={{ whiteSpace: "nowrap" }}>
              {name || "my-component"}
            </strong>
            .js
          </span>
        ),
        placeholder: "my-component",
        cancelAction: getById("cancel-options"),
        doneAction: getById("new-component")
      });
    }
  },
  {
    id: "new-component",
    run: ({ sandpack, setUserOptions, editor }, payload) => {
      const path = "/components/" + payload + ".js";
      sandpack.files[path] = { code: "" };
      sandpack.openFile(path);
      setUserOptions(null, () => editor.focus());
    }
  },
  {
    id: "new-code-sample-options",
    label: "New Code Sample ...",
    run: ({ setUserOptions }) => {
      setUserOptions({
        type: "input",
        label: name => (
          <span>
            Pick a name for the file: ./samples/
            <strong style={{ whiteSpace: "nowrap" }}>
              {name || "my-sample.js"}
            </strong>
          </span>
        ),
        placeholder: "my-sample",
        cancelAction: getById("cancel-options"),
        doneAction: getById("new-code-sample")
      });
    }
  },
  {
    id: "new-code-sample",
    run: ({ sandpack, setUserOptions, editor }, payload) => {
      const path = "/samples/" + payload;
      sandpack.files[path] = { code: "" };
      sandpack.openFile(path);
      setUserOptions(null, () => editor.focus());
    }
  },
  {
    id: "go-to-file-options",
    label: "Go to File...",
    showInMenu: true,
    keybindings: [KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_P],
    shortcutLabel: "Ctrl+Alt+P",
    run: ({ sandpack, setUserOptions }) => {
      setUserOptions({
        cancelAction: getById("cancel-options"),
        items: Object.keys(sandpack.files)
          .map(path => path.slice(1))
          .filter(path => !path.startsWith(".") && path !== "package.json")
          .map(path => ({
            label: path,
            action: getById("go-to-file")
          }))
      });
    }
  },
  {
    id: "go-to-file",
    run: ({ sandpack, setUserOptions, editor }, payload) => {
      sandpack.openFile("/" + payload.label);
      setUserOptions(null, () => editor.focus());
    }
  },
  {
    id: "run-prettier",
    label: "Run Prettier",
    showInMenu: true,
    keybindings: [KeyMod.CtrlCmd | KeyCode.KEY_S],
    shortcutLabel: "Ctrl+S",
    run: async ({ sandpack }) => {
      const { parser } = getLanguage(sandpack.openedPath);
      const currentCode = sandpack.files[sandpack.openedPath].code;
      // semi should be false for mdx (see https://github.com/mdx-js/mdx/issues/277)
      const semi = parser !== "mdx";

      const format = (await formatPromise).default;
      format(currentCode, parser, semi).then(newCode => {
        sandpack.updateFiles({
          ...sandpack.files,
          [sandpack.openedPath]: {
            code: newCode
          }
        });
      });
    }
  },
  {
    id: "publish",
    label: "Publish",
    showInMenu: true,
    run: ({ sandpack }) => {
      const apiUrl = "https://deck-studio-publish.now.sh";
      // const apiUrl = "http://localhost:3000";

      const files = getFiles(sandpack);
      const popup = window.open("publish");
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(files)
      })
        .then(res => res.text())
        .then(url => {
          popup.location = url;
          popup.focus();
        });
    }
  }
];

export default actions;
