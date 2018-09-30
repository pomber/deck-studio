import React from "react";
import styled from "styled-components";
import SplitPane from "react-split-pane";

const Pane = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  pointer-events: ${props => props.isDragging && "none"};
`;

const resizeEmitter = {
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
  },
  trigger() {
    this.listeners.forEach(cb => cb());
  }
};

window.addEventListener("resize", () => resizeEmitter.trigger());

class VerticalSplit extends React.Component {
  state = {
    isDragging: false
  };

  render() {
    const { leftSize, left, right, leftProps, rightProps } = this.props;
    const { isDragging } = this.state;

    return (
      <SplitPane
        split="vertical"
        defaultSize={leftSize}
        onDragStarted={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragFinished={() => {
          this.setState({
            isDragging: false
          });
          resizeEmitter.trigger();
        }}
      >
        <Pane
          as={left}
          isDragging={isDragging}
          resizeEmitter={resizeEmitter}
          {...leftProps}
        />
        <Pane
          as={right}
          isDragging={isDragging}
          resizeEmitter={resizeEmitter}
          {...rightProps}
        />
      </SplitPane>
    );
  }
}

export default VerticalSplit;
