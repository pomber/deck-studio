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

// function logProps(Component) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log("old props:", prevProps);
//       console.log("new props:", this.props);
//     }

//     render() {
//       const { forwardedRef, ...rest } = this.props;

//       // Assign the custom prop "forwardedRef" as a ref
//       return <Component ref={forwardedRef} {...rest} />;
//     }
//   }

//   // Note the second param "ref" provided by React.forwardRef.
//   // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
//   // And it can then be attached to the Component.
//   return React.forwardRef((props, ref) => {
//     return <LogProps {...props} forwardedRef={ref} />;
//   });
// }
