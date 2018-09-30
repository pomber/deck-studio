import React from "react";
import VerticalSplit from "./vertical-split";

const TripleVerticalSplit = ({ left, middle, right, leftSize, middleSize }) => (
  <VerticalSplit
    leftSize={leftSize}
    left={left}
    right={VerticalSplit}
    rightProps={{ left: middle, leftSize: middleSize, right }}
  />
);

export default TripleVerticalSplit;
