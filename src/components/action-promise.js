const Action = () => (
  <Loader placeholder={<ActionPicker />}>
    <Render />
  </Loader>
);

export default () => (
  <div>
    <Action />
    <Toolbar />
    <Editor />
  </div>
);

const state = {
  quickInputOptions: null,
  sandpack: {}
};
