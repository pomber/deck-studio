import React from "react";
import { SandpackConsumer } from "react-smooshpack";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withSandpack(Component) {
  const WrappedComponent = props => (
    <SandpackConsumer>
      {sandpack => <Component {...props} sandpack={sandpack} />}
    </SandpackConsumer>
  );

  WrappedComponent.displayName = `WithSandpack(${getDisplayName(Component)})`;

  return WrappedComponent;
}
