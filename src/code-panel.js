import React from "react";
import styled from "styled-components";
import CodeEditor from "./code-editor";
import Toolbar from "./toolbar";
import QuickInput from "./quick-input";
import withSandpack from "./utils/withSandpack";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

class CodePanel extends React.Component {
  state = {
    userOptions: null
  };

  editorRef = React.createRef();

  componentDidMount() {
    this.props.sandpack.openFile("/deck.mdx");
  }

  dispatch = (action, payload) => {
    const { sandpack } = this.props;
    const actionContext = {
      sandpack,
      editor: this.editorRef.current,
      setUserOptions: (userOptions, callback) =>
        setTimeout(() => this.setState({ userOptions }, callback), 0)
    };
    action.run(actionContext, payload);
  };

  render() {
    const { dispatch, props, state } = this;
    const { className, resizeEmitter } = props;
    const { userOptions } = state;
    return (
      <FlexColumn className={className}>
        <QuickInput dispatch={dispatch} options={userOptions} />
        <Toolbar dispatch={dispatch} />
        <CodeEditor
          dispatch={dispatch}
          resizeEmitter={resizeEmitter}
          style={{ flex: 1 }}
          ref={this.editorRef}
        />
      </FlexColumn>
    );
  }
}

export default withSandpack(CodePanel);
