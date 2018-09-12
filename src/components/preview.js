import React from "react";
import withSandpack from "./withSandpack";

class Preview extends React.Component {
  setContainerElement = el => {
    this.container = el;
  };

  initializeFrame = () => {
    const { browserFrame } = this.props.sandpack;

    if (browserFrame && this.container) {
      browserFrame.style.width = "100%";
      browserFrame.style.height = "100%";
      browserFrame.style.visibility = "visible";
      browserFrame.style.position = "relative";

      this.container.appendChild(browserFrame);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.sandpack.browserFrame !== this.props.sandpack.browserFrame) {
      this.initializeFrame();
    }
  }

  render() {
    return <div ref={this.setContainerElement} style={this.props.style} />;
  }
}

export default withSandpack(Preview);
