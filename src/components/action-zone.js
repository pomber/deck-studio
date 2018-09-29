import React from "react";
import withSandpack from "./withSandpack";

class ActionZone extends React.Component {
  state = {
    userOptions: null
  };

  dispatch = (action, payload) => {
    const { sandpack } = this.props;
    const actionContext = {
      sandpack,
      setUserOptions: userOptions => this.setState({ userOptions })
    };
    action.run(actionContext, payload);
  };

  render() {
    return <CodePanel dispatch={dispatch} />;
  }
}

export default withSandpack(ActionZone);
