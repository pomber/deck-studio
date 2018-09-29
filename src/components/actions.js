import { KeyCode, KeyMod } from "monaco-editor";
export default [
  {
    id: "show-go-to-file",
    label: "Go to File",
    keybindings: [KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_P],
    run: (sandpack, context) => {
      const preaction = { files: sandpack.files };
      context.show(preaction);
    }
  },
  {
    id: "go-to-file"
  }
];

/*
show_create_file
show_create_component
show_create_sample
create_component path
create_sample path

show_go_to_file sandpack
go_to_file path

run_prettier sandpack

publish 
publish alias

show_files_tree
hide_files_tree

*/
