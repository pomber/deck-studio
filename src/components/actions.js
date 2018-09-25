import { KeyCode, KeyMod } from "monaco-editor";
export default [
  {
    id: "open-file",
    label: "Go to File",
    keybindings: [KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_X],
    contextMenuGroupId: "deck-studio",

    // Method that will be executed when the action is triggered.
    // @param editor The editor instance is passed in as a convinience
    run: function(ed) {
      alert("i'm running => " + ed.getPosition());
      return null;
    }
  }
];
