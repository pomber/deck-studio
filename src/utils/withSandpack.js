import React from "react";
import { SandpackConsumer } from "react-smooshpack";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withSandpack(Component) {
  const WrappedComponent = ({ forwardedRef, ...rest }) => (
    <SandpackConsumer>
      {sandpack => (
        <Component {...rest} sandpack={sandpack} ref={forwardedRef} />
      )}
    </SandpackConsumer>
  );

  WrappedComponent.displayName = `WithSandpack(${getDisplayName(Component)})`;

  return React.forwardRef((props, ref) => (
    <WrappedComponent {...props} forwardedRef={ref} />
  ));
}
